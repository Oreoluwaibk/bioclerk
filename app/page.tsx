import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-sidebar text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(22,122,91,0.45),transparent_45%),radial-gradient(ellipse_at_80%_0%,rgba(14,92,69,0.35),transparent_40%),linear-gradient(180deg,rgba(16,43,38,0.2),rgba(16,43,38,0.95))]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl animate-soft-pulse"
          />

          <div className="relative mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:py-16">
            <div className="max-w-xl">
              <p className="animate-rise mb-5 inline-flex items-center gap-2 rounded-full bg-brand-soft/10 px-3 py-1.5 text-xs font-semibold text-brand-soft ring-1 ring-brand/40">
                <Image
                  src="/brand/lock.svg"
                  alt=""
                  width={13}
                  height={13}
                  className="opacity-90"
                />
                Private by design
              </p>
              <h1 className="animate-rise-delay-1 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
                BioClerk
              </h1>
              <p className="animate-rise-delay-2 mt-4 max-w-md text-lg leading-relaxed text-sidebar-muted sm:text-xl">
                Offline clinical dictation. Speak, and BioClerk turns your
                speech into text — entirely on your computer.
              </p>
              <div className="animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://apps.microsoft.com/detail/9PH1DPH465R9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[10px] bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
                >
                  Download for Windows
                </a>
                <Link
                  href="/#privacy"
                  className="rounded-[10px] border border-sidebar-muted/40 bg-transparent px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
                >
                  How privacy works
                </Link>
              </div>
            </div>

            <div className="animate-rise-delay-2 relative lg:justify-self-end">
              <div className="animate-float relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <Image
                  src="/brand/app-live.png"
                  alt="BioClerk live transcription workspace"
                  width={900}
                  height={588}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-background py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Document the way you work
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                Two modes for clinical encounters — capture first, or dictate as
                you speak. Powered by on-device speech recognition.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-border bg-surface p-7 shadow-[0_8px_28px_rgba(24,53,44,0.06)]">
                <div className="flex size-12 items-center justify-center rounded-[10px] bg-brand-soft">
                  <Image
                    src="/brand/activity-square-green.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">
                  Listen first, document later
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Capture the encounter first, then structure the clinical note
                  afterward — without sending audio off your machine.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-surface p-7 shadow-[0_8px_28px_rgba(24,53,44,0.06)]">
                <div className="flex size-12 items-center justify-center rounded-[10px] bg-brand-soft">
                  <Image
                    src="/brand/audio-waveform.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">
                  Document as I speak
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Live dictation with spoken punctuation and commands, so notes
                  keep pace with the conversation.
                </p>
              </article>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_8px_28px_rgba(24,53,44,0.06)]">
              <Image
                src="/brand/app-home.png"
                alt="BioClerk home screen with documentation modes"
                width={900}
                height={588}
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section id="privacy" className="scroll-mt-24 bg-surface py-20 sm:py-24">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-deep">
                <Image
                  src="/brand/shield-check-green.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                Encrypted by default
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                By default, nothing leaves your device
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Audio recordings and transcripts stay local and encrypted at
                rest. Sharing with BioClerk is optional, off by default, and
                only used to improve transcription quality.
              </p>
              <ul className="mt-8 space-y-4 text-[15px] text-muted">
                <li className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
                  On-device speech recognition — MedASR runs locally
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
                  License binding uses a one-way device fingerprint, not your
                  patient data
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
                  Payments handled by Paystack — we never see card details
                </li>
              </ul>
              <Link
                href="/privacy"
                className="mt-8 inline-flex text-sm font-semibold text-brand-deep hover:underline"
              >
                Read the Privacy Policy →
              </Link>
            </div>

            <div className="rounded-2xl bg-sidebar p-8 text-white sm:p-10">
              <div className="flex items-center gap-2">
                <Image
                  src="/brand/shield-check.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
                <p className="text-sm font-semibold">Private by design</p>
              </div>
              <p className="mt-4 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                Your dictation stays with you.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-sidebar-muted">
                The short version: BioClerk never sends your dictation anywhere
                unless you turn on “Share data with BioClerk” in Settings.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/privacy"
                  className="rounded-[10px] bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="rounded-[10px] border border-sidebar-muted/40 px-4 py-2.5 text-sm font-semibold text-white hover:border-white/50"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center shadow-[0_8px_28px_rgba(24,53,44,0.06)] sm:px-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Start documenting offline
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-muted">
                Try BioClerk free for 30 days on one device — no card required.
                Questions? We’re at{" "}
                <a
                  href="mailto:support.bioclerk@gmail.com"
                  className="font-semibold text-brand-deep hover:underline"
                >
                  support.bioclerk@gmail.com
                </a>
                .
              </p>
              <a
                href="https://apps.microsoft.com/detail/9PH1DPH465R9"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-[10px] bg-brand-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand"
              >
                Download for Windows
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
