import { ModalShell } from "@/components/ModalShell";
import { Suspense } from "react";
import { OrderDetailsView } from "../../../orders/[orderId]/OrderDetailsView";

// (.) = ten sam poziom co orders: przechwytuje /account/orders/[orderId] i pokazuje to w modalu
export default function OrderModal({ params }: { params: Promise<{ orderId: string }> }) {
  return (
    <ModalShell>
      <Suspense fallback={<p>Ładowanie zamówienia…</p>}>
        <OrderModalContent params={params} />
      </Suspense>
    </ModalShell>
  );
}

async function OrderModalContent({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return <OrderDetailsView orderId={orderId} />;
}
