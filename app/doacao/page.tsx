import type { Metadata } from "next";
import { AmountStep } from "../components/donation/amount-step";
import { DonationLayout } from "../components/donation/donation-layout";

export const metadata: Metadata = {
  title: "Valor da Doacao | GiveHope",
  description: "Escolha o valor da sua doacao para a GiveHope.",
};

export default function DonationValuePage() {
  return (
    <DonationLayout currentStep={1}>
      <AmountStep />
    </DonationLayout>
  );
}
