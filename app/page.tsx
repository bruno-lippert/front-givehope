import Image from "next/image";
import { ButtonLink } from "./components/button-link";
import { ChartUpIcon, EducationIcon, HeartHandIcon, UserPlusIcon, UtensilsIcon } from "./components/icons";
import { InfoCard } from "./components/info-card";
import { SectionHeading } from "./components/section-heading";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { pillars, steps } from "./data/home";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-slate-950">
          <Image
            src="/images/home-hero.jpg"
            alt="Crianças sorrindo em uma sala comunitária"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />

          <div className="relative mx-auto flex min-h-[640px] w-full max-w-6xl items-center px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="max-w-[12ch] font-heading text-4xl font-extrabold leading-tight tracking-normal text-white lg:text-7xl">
                Transformando Vidas Através da Generosidade
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
                Junte-se a nós na missão de erradicar a fome e construir um
                futuro onde cada família tenha dignidade e esperança.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/cadastro">Quero Fazer Parte</ButtonLink>
                <ButtonLink href="#sobre" variant="secondary">
                  Nossa História
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-neutral py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Transparência Total" title="Como Funciona" />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step) => (
                <InfoCard
                  key={step.title}
                  title={step.title}
                  description={step.description}
                  accentClassName={
                    step.icon === "user"
                      ? "border-l-primary"
                      : step.icon === "heart"
                        ? "border-l-tertiary"
                        : "border-l-secondary"
                  }
                  icon={getStepIcon(step.icon, step.color)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="bg-white py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <SectionHeading eyebrow="Sobre Nós" title="A História da GiveHope" />

              <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  A GiveHope nasceu em 2022, na região metropolitana de Porto
                  Alegre, a partir de uma iniciativa de estudantes e voluntários
                  que atuavam em diversas frentes sociais. Durante suas ações, o
                  grupo percebeu um padrão crítico: muitas pessoas queriam ajudar,
                  mas desistiam no caminho devido à burocracia, à falta de canais
                  digitais intuitivos ou à incerteza sobre onde o dinheiro seria
                  aplicado.
                </p>
                <p>
                  O que começou como um pequeno grupo de WhatsApp para arrecadar
                  cestas básicas e agasalhos evoluiu para a necessidade de uma
                  plataforma estruturada. O nome GiveHope representa a crença de
                  que a tecnologia não deve ser uma barreira, mas uma ponte que
                  conecta a vontade de ajudar com quem mais precisa.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-heading text-xl font-extrabold tracking-normal text-slate-950">
                Nossos Pilares
              </h3>

              <div className="mt-7 grid gap-8 md:grid-cols-3">
                {pillars.map((pillar) => (
                  <article key={pillar.title}>
                    <div
                      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-lg ${pillar.background} ${pillar.color}`}
                    >
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <h4 className="font-heading text-lg font-extrabold tracking-normal text-slate-950">
                      {pillar.title}
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {pillar.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <blockquote className="mt-14 max-w-4xl rounded-lg border-l-4 border-l-primary bg-slate-100 px-7 py-6 text-base italic leading-8 text-slate-700">
              A criação deste portal web é o próximo grande passo da organização,
              permitindo que a solidariedade seja tão rápida e eficiente quanto
              um clique, garantindo que a esperança nunca pare de circular.
            </blockquote>
          </div>
        </section>

        <section className="bg-neutral py-20 sm:py-24">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-300">
              <Image
                src="/images/food-donation.jpg"
                alt="Caixa com alimentos frescos sendo entregue"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="max-w-xl">
              <h2 className="font-heading text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl">
                Alimentando a Esperança nas Comunidades
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-600">
                Nossa iniciativa atual foca na distribuição de cestas básicas
                nutricionalmente completas para regiões em situação de
                vulnerabilidade extrema. Sua ajuda pode ser a diferença hoje.
              </p>
              <ButtonLink href="/doacao" className="mt-8">
                Apoiar Este Projeto
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function getStepIcon(icon: (typeof steps)[number]["icon"], colorClassName: string) {
  const className = `h-8 w-8 ${colorClassName}`;

  if (icon === "user") {
    return <UserPlusIcon className={className} />;
  }

  if (icon === "heart") {
    return <HeartHandIcon className={className} />;
  }

  return <ChartUpIcon className={className} />;
}

function getPillarIcon(icon: (typeof pillars)[number]["icon"]) {
  const className = "h-5 w-5";

  if (icon === "utensils") {
    return <UtensilsIcon className={className} />;
  }

  if (icon === "education") {
    return <EducationIcon className={className} />;
  }

  return <ChartUpIcon className={className} />;
}
