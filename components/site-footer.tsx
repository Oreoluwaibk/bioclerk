import Link from "next/link";
import { BrandLogo } from "./brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-mid bg-sidebar text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <BrandLogo tone="light" />
          <p className="max-w-sm text-sm leading-relaxed text-sidebar-muted">
            Offline clinical dictation. Your recordings stay on your device
            unless you choose to share them.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold">Product</p>
          <ul className="space-y-3 text-sm text-sidebar-muted">
            <li>
              <Link href="/#features" className="hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href="/#privacy" className="hover:text-white">
                Private by design
              </Link>
            </li>
            <li>
              <a
                href="mailto:support.bioclerk@gmail.com"
                className="hover:text-white"
              >
                Support
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold">Legal</p>
          <ul className="space-y-3 text-sm text-sidebar-muted">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms of Use
              </Link>
            </li>
            <li>
              <a
                href="mailto:support.bioclerk@gmail.com"
                className="hover:text-white"
              >
                support.bioclerk@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-mid">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-sidebar-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} BioClerk. All rights reserved.</p>
          <p>Desktop app for clinicians · Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
