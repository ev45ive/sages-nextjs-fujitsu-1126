import { Suspense } from "react";
import { OrderDetailsView } from "./OrderDetailsView";

// Pełna strona: bezpośrednie wejście, F5 lub link z zewnątrz (bez modala)
export default function OrderPage(props: PageProps<"/account/orders/[orderId]">) {
  return (
    <Suspense fallback={<p>Ładowanie zamówienia…</p>}>
      <OrderRoute params={props.params} />
    </Suspense>
  );
}

async function OrderRoute({ params }: { params: Promise<{ orderId: string }> }) {
  // await params: id zamówienia znamy dopiero w runtime
  const { orderId } = await params;
  return <OrderDetailsView orderId={orderId} />;
}
