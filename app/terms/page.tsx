import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing your use of the BioClerk desktop application, including licensing, MedASR notices, and your responsibilities.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 bg-background">
        <div className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
            <p className="text-sm font-semibold text-brand-deep">Legal</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
              BioClerk Terms of Use
            </h1>
            <dl className="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-3">
              <div>
                <dt className="font-semibold text-foreground">Version</dt>
                <dd>0.1</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Applies to</dt>
                <dd>BioClerk desktop app</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Last modified</dt>
                <dd>September 30, 2026</dd>
              </div>
            </dl>
          </div>
        </div>

        <article className="legal-prose mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <p>
            Thank you for choosing BioClerk. These Terms of Use
            (&quot;Terms&quot;) are an agreement between you and the makers of
            BioClerk governing your use of the BioClerk desktop application (the
            &quot;App&quot;). By installing or using BioClerk, you agree to
            these Terms. If you don&apos;t agree, please don&apos;t use the App.
          </p>
          <p>
            We&apos;ve tried to write these Terms in plain language. Where we
            quote or summarize terms from a technology partner, we&apos;ve kept
            the original wording intact and linked to the source, so you can
            always read the full original for yourself.
          </p>

          <h2 id="acceptance">Acceptance</h2>
          <p>
            Installing, activating, or opening BioClerk counts as accepting
            these Terms, whether you&apos;re on a free trial or a paid license.
            If a future version of BioClerk changes what&apos;s covered here,
            we&apos;ll update this document&apos;s version number above and let
            you know inside the App.
          </p>

          <h2 id="about-bioclerk">About BioClerk</h2>
          <p>
            BioClerk is an offline dictation tool. You speak, and BioClerk turns
            your speech into text — entirely on your own computer. Your
            recordings and transcripts are never sent anywhere unless you
            specifically turn on optional sharing (see{" "}
            <a href="#privacy">Privacy</a> below).
          </p>
          <p>
            BioClerk is a transcription aid, not a clinical decision-making
            tool. It does not interpret, diagnose, or recommend anything about a
            patient. It only converts what you say into written text. You, the
            clinician using BioClerk, remain solely responsible for reviewing,
            correcting, and approving every transcript before it becomes part of
            a medical record or is relied on in any way.
          </p>

          <h2 id="speech-recognition-model">
            The Speech Recognition Model Behind BioClerk
          </h2>
          <p>
            BioClerk&apos;s transcription is powered by MedASR, a speech
            recognition model made available by Google. Two sets of terms apply
            to your use of it, and both flow through to your use of BioClerk:
          </p>
          <p>
            <strong className="text-foreground">Apache License 2.0.</strong>{" "}
            Some of the code used to run MedASR is licensed under the Apache
            License, Version 2.0, available in full at{" "}
            <a
              href="https://www.apache.org/licenses/LICENSE-2.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              apache.org/licenses/LICENSE-2.0
            </a>
            . This is a permissive open-source license: it lets us use, adapt,
            and distribute this code, provided the required copyright and
            license notices stay intact — which they do.
          </p>
          <p>
            <strong className="text-foreground">
              Health AI Developer Foundations (HAI-DEF) Terms of Use.
            </strong>{" "}
            The MedASR model itself is made available under Google&apos;s
            HAI-DEF Terms of Use. As required by those terms, here is the notice
            governing it, unedited:
          </p>
          <div className="legal-callout">
            &quot;HAI-DEF is provided under and subject to the Health AI
            Developer Foundations Terms of Use found at{" "}
            <a
              href="https://developers.google.com/health-ai-developer-foundations/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://developers.google.com/health-ai-developer-foundations/terms
            </a>
            &quot;
          </div>
          <p>
            The related Prohibited Use Policy is at{" "}
            <a
              href="https://developers.google.com/health-ai-developer-foundations/prohibited-use-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              developers.google.com/health-ai-developer-foundations/prohibited-use-policy
            </a>
            . Because BioClerk includes MedASR, your use of BioClerk&apos;s
            transcription features is also bound by both documents. In plain
            terms, that means:
          </p>
          <ul>
            <li>
              MedASR is provided &quot;as is,&quot; with no warranty of any
              kind.
            </li>
            <li>
              Google is not providing medical advice, health care, or any
              clinical service through MedASR, and nothing about MedASR should
              be read as Google manufacturing a medical device.
            </li>
            <li>
              MedASR — and by extension, BioClerk — may not be used to make
              fully automated healthcare decisions. It is a tool to assist a
              licensed professional&apos;s own judgment, never a replacement for
              it.
            </li>
            <li>
              You may not use BioClerk in any way Google&apos;s Prohibited Use
              Policy forbids — see <a href="#prohibited-uses">Prohibited Uses</a>{" "}
              below.
            </li>
          </ul>

          <h2 id="your-responsibility">Your Responsibility</h2>
          <p>
            BioClerk transcribes speech. It does not diagnose, treat, or make
            any judgment about a patient&apos;s condition or care. Like any
            transcription — human or machine — it can make mistakes: a misheard
            word, a dropped phrase, a name spelled wrong.
          </p>
          <p>
            Before you sign, finalize, or rely on a BioClerk transcript in any
            way, read it and fix anything that needs fixing. You are solely
            responsible for the accuracy and completeness of any documentation
            you produce using BioClerk, and for exercising your own independent
            clinical judgment. BioClerk does not replace that judgment — it only
            saves you the time of typing.
          </p>

          <h2 id="prohibited-uses">Prohibited Uses</h2>
          <p>By using BioClerk, you agree not to:</p>
          <ul>
            <li>
              Use BioClerk to practice medicine or any other licensed profession
              without the license that profession requires.
            </li>
            <li>
              Let BioClerk&apos;s output make a healthcare decision on its own,
              without a licensed professional reviewing it first.
            </li>
            <li>
              Record or transcribe anyone&apos;s health information without the
              right to do so (for example, without appropriate patient consent).
            </li>
            <li>
              Present BioClerk-generated text as if it were written or reviewed
              by a person, when it hasn&apos;t been.
            </li>
            <li>
              Try to extract, copy, or redistribute the MedASR model files
              bundled with BioClerk, or reverse-engineer, resell, or sublicense
              the App itself.
            </li>
            <li>
              Use BioClerk for anything illegal, or anything forbidden by
              Google&apos;s Prohibited Use Policy (linked above).
            </li>
          </ul>

          <h2 id="privacy">Privacy</h2>
          <p>
            By default, BioClerk does all of its work on your own computer.
            Recordings and transcripts never leave your device unless you turn
            on optional data sharing.
          </p>
          <p>
            If you choose to turn on &quot;Share data to improve BioClerk&quot;
            in Settings, recordings and transcripts you produce afterward are
            uploaded and used only to improve BioClerk&apos;s transcription
            quality. We never sell this data. This setting is off by default,
            and you can switch it off again at any time — doing so stops future
            sharing going forward.
          </p>
          <p>
            For full detail, see our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2 id="license">Your License to Use BioClerk</h2>
          <p>
            When you buy BioClerk, we grant you a license to install and
            activate it on one device at a time — you can deactivate BioClerk on
            one device and activate it on another whenever you like. This
            license doesn&apos;t expire.
          </p>
          <p>
            You can also try BioClerk free for 30 days before buying, once per
            device, with no card or account required to start. At the end of
            your trial, BioClerk keeps every transcript you&apos;ve already made
            on your device and you can view them on the App, but you&apos;ll
            need to buy a license to keep dictating.
          </p>
          <p>
            Either way, this license is for your own use. You may not share,
            resell, or sublicense your copy of BioClerk to anyone else.
          </p>

          <h2 id="model-availability">Model Availability</h2>
          <p>
            MedASR is made available to us by Google under the HAI-DEF terms
            described above. If Google were ever to change or withdraw that
            arrangement, BioClerk&apos;s transcription features could be
            affected. We&apos;ll do our best to give you notice if that ever
            changes anything about how BioClerk works for you.
          </p>

          <h2 id="no-warranty">No Warranty</h2>
          <p>
            BioClerk, including the MedASR model it includes, is provided
            &quot;as is&quot; and &quot;as available,&quot; without warranties
            of any kind, express or implied. We don&apos;t guarantee that
            transcription will be error-free, uninterrupted, or fit for any
            particular purpose. To the fullest extent the law allows, we
            disclaim all other warranties.
          </p>

          <h2 id="limitation-of-liability">Limitation of Liability</h2>
          <p>
            To the fullest extent the law allows, we are not liable for any
            indirect, incidental, or consequential damages arising from your use
            of BioClerk, including any damages resulting from an inaccurate
            transcript. Nothing in these Terms limits liability that can&apos;t
            be limited under applicable law.
          </p>

          <h2 id="changes">Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time, for example if we add a
            feature or our technology partners change their own terms. We&apos;ll
            update the version and date at the top of this page when we do.
            Continuing to use BioClerk after a change means you accept the
            updated Terms.
          </p>

          <h2 id="ending-your-license">Ending Your License</h2>
          <p>
            We may suspend or end your license if you seriously or repeatedly
            break these Terms, including the Prohibited Uses above or
            Google&apos;s Prohibited Use Policy. You can stop using BioClerk and
            deactivate your license from Settings at any time. Either way,
            transcripts you&apos;ve already made stay on your own device —
            ending a license never deletes your existing work.
          </p>

          <h2 id="contact-us">Contact Us</h2>
          <p>
            Questions about these Terms? Reach us at{" "}
            <a href="mailto:support.bioclerk@gmail.com">
              support.bioclerk@gmail.com
            </a>
            .
          </p>

          <h2 id="governing-law">Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Federal Republic of
            Nigeria, without regard to conflict-of-law principles.
          </p>

          <p className="mt-12 text-sm">
            Also see our <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
