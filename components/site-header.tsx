"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "./brand-logo";

const links = [
  { href: "/#features", label: "Features", match: "features" as const },
  { href: "/#privacy", label: "Privacy", match: "privacy-section" as const },
  { href: "/privacy", label: "Privacy Policy", match: "privacy" as const },
  { href: "/terms", label: "Terms", match: "terms" as const },
];

function isActive(
  match: (typeof links)[number]["match"],
  pathname: string,
  hash: string,
) {
  if (match === "privacy") return pathname === "/privacy";
  if (match === "terms") return pathname === "/terms";
  if (pathname !== "/") return false;
  if (match === "features") return hash === "#features";
  if (match === "privacy-section") return hash === "#privacy";
  return false;
}

export function SiteHeader({
  variant = "default",
}: {
  variant?: "default" | "solid";
}) {
  const pathname = usePathname() ?? "/";
  const [hash, setHash] = useState("");
  const isSolid = variant === "solid";

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b ${
        isSolid
          ? "border-border bg-surface/95 backdrop-blur-md"
          : "border-transparent bg-sidebar/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <BrandLogo tone={isSolid ? "dark" : "light"} />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = isActive(link.match, pathname, hash);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  if (link.href.includes("#")) {
                    setHash(`#${link.href.split("#")[1]}`);
                  } else {
                    setHash("");
                  }
                }}
                className={`relative text-sm font-medium transition-colors ${
                  active
                    ? isSolid
                      ? "font-semibold text-brand-deep"
                      : "font-semibold text-white"
                    : isSolid
                      ? "text-muted hover:text-foreground"
                      : "text-sidebar-muted hover:text-white"
                }`}
              >
                {link.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="mailto:support.bioclerk@gmail.com"
            className={`hidden text-sm font-semibold sm:inline ${
              isSolid
                ? "text-brand-deep"
                : "text-sidebar-muted hover:text-white"
            }`}
          >
            Support
          </a>
          <a
            href="mailto:support.bioclerk@gmail.com?subject=BioClerk%20license"
            className="rounded-[10px] bg-brand-deep px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
          >
            Buy license
          </a>
        </div>
      </div>
    </header>
  );
}
