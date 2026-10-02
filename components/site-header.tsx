"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className={`absolute left-0 block h-0.5 w-5 rounded-full transition-all duration-200 ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
        } bg-current`}
      />
      <span
        className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-5 rounded-full transition-all duration-200 ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
        } bg-current`}
      />
    </span>
  );
}

export function SiteHeader({
  variant = "default",
}: {
  variant?: "default" | "solid";
}) {
  const pathname = usePathname() ?? "/";
  const [hash, setHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const isSolid = variant === "solid";

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    if (href.includes("#")) {
      setHash(`#${href.split("#")[1]}`);
    } else {
      setHash("");
    }
    setMenuOpen(false);
  };

  const linkClass = (active: boolean, mobile = false) => {
    if (mobile) {
      return active
        ? "bg-brand-soft font-semibold text-brand-deep"
        : "text-foreground hover:bg-brand-soft/60";
    }
    return active
      ? isSolid
        ? "font-semibold text-brand-deep"
        : "font-semibold text-white"
      : isSolid
        ? "text-muted hover:text-foreground"
        : "text-sidebar-muted hover:text-white";
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b ${
        isSolid
          ? "border-border bg-surface/95 backdrop-blur-md"
          : "border-transparent bg-sidebar/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <BrandLogo tone={isSolid ? "dark" : "light"} />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = isActive(link.match, pathname, hash);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => handleNavClick(link.href)}
                className={`relative text-sm font-medium transition-colors ${linkClass(active)}`}
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

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="mailto:support.bioclerk@gmail.com"
            className={`hidden text-sm font-semibold md:inline ${
              isSolid
                ? "text-brand-deep"
                : "text-sidebar-muted hover:text-white"
            }`}
          >
            Support
          </a>
          <a
            href="mailto:support.bioclerk@gmail.com?subject=BioClerk%20license"
            className="hidden rounded-[10px] bg-brand-deep px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand sm:inline-flex"
          >
            Buy license
          </a>
          <button
            type="button"
            className={`inline-flex size-10 items-center justify-center rounded-[10px] transition-colors md:hidden ${
              isSolid
                ? "text-foreground hover:bg-brand-soft"
                : "text-white hover:bg-white/10"
            }`}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={`border-t md:hidden ${
          menuOpen ? "block" : "hidden"
        } ${
          isSolid
            ? "border-border bg-surface"
            : "border-brand-mid bg-sidebar"
        }`}
      >
        <nav
          className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8"
          aria-label="Mobile"
        >
          {links.map((link) => {
            const active = isActive(link.match, pathname, hash);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => handleNavClick(link.href)}
                className={`rounded-[10px] px-3 py-3 text-sm transition-colors ${
                  isSolid
                    ? linkClass(active, true)
                    : active
                      ? "bg-brand-mid font-semibold text-white"
                      : "text-sidebar-muted hover:bg-brand-mid/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="mailto:support.bioclerk@gmail.com"
            className={`rounded-[10px] px-3 py-3 text-sm ${
              isSolid
                ? "text-foreground hover:bg-brand-soft/60"
                : "text-sidebar-muted hover:bg-brand-mid/70 hover:text-white"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Support
          </a>
          <a
            href="mailto:support.bioclerk@gmail.com?subject=BioClerk%20license"
            className="mt-2 rounded-[10px] bg-brand-deep px-3 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand"
            onClick={() => setMenuOpen(false)}
          >
            Buy license
          </a>
        </nav>
      </div>
    </header>
  );
}
