import type { Metadata } from "next";
import { Suspense } from "react";
import {
  DonationCardSkeleton,
  DonationLayout,
} from "../../components/donation/donation-layout";
import { PaymentStep } from "../../components/donation/payment-step";

export const metadata: Metadata = {
  title: "Pagamento | GiveHope",
  description: "Finalize sua doacao via PIX demonstrativo.",
};

export default function DonationPaymentPage() {
  return (
    <DonationLayout currentStep={3}>
      <Suspense fallback={<DonationCardSkeleton />}>
        <PaymentStep />
      </Suspense>
    </DonationLayout>
  );
}
