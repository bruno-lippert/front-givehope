import type { Metadata } from "next";
import { Suspense } from "react";
import {
  DonationCardSkeleton,
  DonationLayout,
} from "../../components/donation/donation-layout";
import { IdentificationStep } from "../../components/donation/identification-step";

export const metadata: Metadata = {
  title: "Identificacao | GiveHope",
  description: "Entre na sua conta para continuar a doacao.",
};

export default function DonationIdentificationPage() {
  return (
    <DonationLayout currentStep={2}>
      <Suspense fallback={<DonationCardSkeleton />}>
        <IdentificationStep />
      </Suspense>
    </DonationLayout>
  );
}
