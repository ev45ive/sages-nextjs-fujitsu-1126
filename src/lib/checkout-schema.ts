import { z } from "zod";

// Wspólny schemat: ten sam zestaw reguł działa w formularzu (klient) i w /api/checkout (serwer)
const common = {
  name: z.string().trim().min(2, { error: "Imię i nazwisko: min. 2 znaki" }),
  email: z.email({ error: "Podaj poprawny e-mail" }),
  payment: z.enum(["card", "cod"], { error: "Wybierz sposób płatności" }),
  note: z.string().max(200, { error: "Maks. 200 znaków" }),
  // boolean + refine zamiast literal(true): domyślna wartość formularza to false
  acceptTerms: z.boolean().refine((v) => v === true, { error: "Zaakceptuj regulamin" }),
};

const courier = z.object({
  ...common,
  delivery: z.literal("courier"),
  street: z.string().trim().min(3, { error: "Podaj ulicę i numer" }),
  city: z.string().trim().min(2, { error: "Podaj miasto" }),
  postalCode: z.string().regex(/^\d{2}-\d{3}$/, { error: "Format kodu: 00-000" }),
});

const pickup = z.object({
  ...common,
  delivery: z.literal("pickup"),
  pickupPoint: z.string().min(1, { error: "Wybierz punkt odbioru" }),
});

// discriminatedUnion po delivery: walidowana jest tylko gałąź wybranego sposobu dostawy
export const checkoutSchema = z.discriminatedUnion("delivery", [courier, pickup]);

export type CheckoutInput = z.infer<typeof checkoutSchema>;
