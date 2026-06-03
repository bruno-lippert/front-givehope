import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmationStep } from "../../components/donation/confirmation-step";
import {
  DonationCardSkeleton,
  DonationLayout,
} from "../../components/donation/donation-layout";

export const metadata: Metadata = {
  title: "Confirmacao | GiveHope",
  description: "Confirme seus dados para continuar a doacao.",
};

export default function DonationConfirmationPage() {
  return (
    <DonationLayout currentStep={2}>
      <Suspense fallback={<DonationCardSkeleton />}>
        <ConfirmationStep />
      </Suspense>
    </DonationLayout>
  );
}
