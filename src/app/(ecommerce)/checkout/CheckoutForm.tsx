"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMounted } from "@/hooks/useMounted";
import { checkoutSchema, type CheckoutInput } from "@/lib/checkout-schema";
import { useCartStore } from "@/stores/cartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";

type FieldErrors = Record<string, string[] | undefined>;

// Błąd z /api/checkout: komunikat ogólny i błędy przypisane do pól formularza
class CheckoutError extends Error {
  fieldErrors?: FieldErrors;

  constructor(message: string, fieldErrors?: FieldErrors) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="grid gap-1">
      {label}
      {children}
      {error && <span className="text-sm text-red-600">{error}</span>}
    </label>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mounted = useMounted();
  const ids = useCartStore((s) => s.ids);
  const entities = useCartStore((s) => s.entities);
  const clear = useCartStore((s) => s.clear);

  // zodResolver: reguły z checkoutSchema, błędy wyświetlane przy polach po opuszczeniu pola (onTouched)
  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      payment: "card",
      note: "",
      acceptTerms: false,
      delivery: "courier",
      street: "",
      city: "",
      postalCode: "",
      pickupPoint: "",
    } as CheckoutInput,
  });

  // useWatch: czyta jedno pole reaktywnie, zmiana dostawy pokazuje inne pola bez wysyłania formularza
  const delivery = useWatch({ control: form.control, name: "delivery" });

  const submit = useMutation({
    mutationFn: async (payload: { values: CheckoutInput; items: { productId: string; qty: number }[] }) => {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload.values, items: payload.items }),
      });
      const body = await res.json();
      if (!res.ok) throw new CheckoutError(body.message, body.fieldErrors);
      return body as { orderId: string };
    },
    onSuccess: ({ orderId }) => {
      clear();
      // nowe zamówienie ma pojawić się w liście bez przeładowania (invalidacja klucza ["orders"])
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      router.push(`/account/orders/${orderId}`);
    },
    onError: (err) => {
      if (!(err instanceof CheckoutError)) return;
      // błędy pól z serwera wracają przy odpowiednich polach formularza
      for (const [field, messages] of Object.entries(err.fieldErrors ?? {})) {
        const first = messages?.[0];
        if (first) form.setError(field as keyof CheckoutInput, { message: first });
      }
    },
  });

  if (!mounted) return <p>Ładowanie…</p>;
  if (ids.length === 0 && !submit.isSuccess) {
    return (
      <p>
        Koszyk jest pusty.{" "}
        <Link href="/cart" className="text-blue-600 hover:underline">
          Wróć do koszyka
        </Link>
      </p>
    );
  }

  const errors = form.formState.errors as Record<string, { message?: string } | undefined>;
  const msg = (name: string) => errors[name]?.message;
  const total = ids.reduce((sum, id) => sum + entities[id].price * entities[id].qty, 0);
  const serverFieldErrors = submit.error instanceof CheckoutError && submit.error.fieldErrors;

  const onSubmit = form.handleSubmit((values) => {
    const items = ids.map((id) => ({ productId: id, qty: entities[id].qty }));
    submit.mutate({ values, items });
  });

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_16rem]">
      <form onSubmit={onSubmit} noValidate className="grid max-w-xl gap-4">
        <Field label="Imię i nazwisko" error={msg("name")}>
          <Input {...form.register("name")} />
        </Field>
        <Field label="E-mail" error={msg("email")}>
          <Input type="email" {...form.register("email")} />
        </Field>

        <fieldset className="grid gap-2">
          <legend className="font-medium">Dostawa</legend>
          <label className="flex items-center gap-2">
            <input type="radio" value="courier" {...form.register("delivery")} /> Kurier
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="pickup" {...form.register("delivery")} /> Odbiór w punkcie
          </label>
        </fieldset>

        {delivery === "courier" ? (
          <>
            <Field label="Ulica i numer" error={msg("street")}>
              <Input {...form.register("street")} />
            </Field>
            <Field label="Miasto" error={msg("city")}>
              <Input {...form.register("city")} />
            </Field>
            <Field label="Kod pocztowy" error={msg("postalCode")}>
              <Input placeholder="00-000" {...form.register("postalCode")} />
            </Field>
          </>
        ) : (
          <Field label="Punkt odbioru" error={msg("pickupPoint")}>
            <select className="border px-2 py-1" {...form.register("pickupPoint")}>
              <option value="">Wybierz punkt</option>
              <option value="WA-1">Warszawa, Centrum</option>
              <option value="KR-2">Kraków, Rynek</option>
            </select>
          </Field>
        )}

        <Field label="Płatność" error={msg("payment")}>
          <select className="border px-2 py-1" {...form.register("payment")}>
            <option value="card">Karta</option>
            <option value="cod">Za pobraniem</option>
          </select>
        </Field>

        <Field label="Uwagi (opcjonalnie)" error={msg("note")}>
          <Textarea {...form.register("note")} />
        </Field>

        <label className="flex items-start gap-2">
          <input type="checkbox" {...form.register("acceptTerms")} />
          <span>Akceptuję regulamin</span>
        </label>
        {msg("acceptTerms") && <p className="text-sm text-red-600">{msg("acceptTerms")}</p>}

        {submit.isError && !serverFieldErrors && (
          <p className="text-red-600">{submit.error.message}</p>
        )}

        <Button type="submit" disabled={submit.isPending}>
          {submit.isPending ? "Składanie zamówienia…" : `Zamawiam, ${total} PLN`}
        </Button>
      </form>

      <aside className="grid content-start gap-2 border p-4">
        <h2 className="font-semibold">Podsumowanie</h2>
        <ul className="grid gap-1 text-sm">
          {ids.map((id) => (
            <li key={id}>
              {entities[id].qty} × {entities[id].name}
            </li>
          ))}
        </ul>
        <p className="font-medium">Razem: {total} PLN</p>
      </aside>
    </div>
  );
}
