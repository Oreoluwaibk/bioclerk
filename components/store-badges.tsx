"use client";

import Image from "next/image";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type DownloadPlacement =
  | "hero"
  | "header"
  | "mobile_menu"
  | "bottom_cta"
  | "footer";

const WINDOWS_PRODUCT_ID = "9PH1DPH465R9";
const ANDROID_PACKAGE_ID = "com.bioclerk.app";
const EXTENSION_STORE_URL =
  "https://chromewebstore.google.com/detail/bioclerk/mlkcafpehlehipjgnhiaabgpkllmlbmp";

function campaignId(placement: DownloadPlacement, platform: string) {
  return `website_${placement}_${platform}`;
}

function androidStoreUrl(placement: DownloadPlacement) {
  const campaign = campaignId(placement, "android");
  const referrer = encodeURIComponent(
    `utm_source=bioclerk_website&utm_medium=badge&utm_campaign=${campaign}`,
  );
  return `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_ID}&referrer=${referrer}`;
}

function extensionStoreUrl(placement: DownloadPlacement) {
  const url = new URL(EXTENSION_STORE_URL);
  url.searchParams.set("utm_source", "bioclerk_website");
  url.searchParams.set("utm_medium", "badge");
  url.searchParams.set("utm_campaign", campaignId(placement, "extension"));
  return url.toString();
}

function trackClick(
  placement: DownloadPlacement,
  platform: "windows" | "android" | "extension",
  linkUrl: string,
) {
  window.gtag?.("event", "download_click", {
    event_category: "engagement",
    event_label: platform,
    button_location: placement,
    campaign_id: campaignId(placement, platform),
    link_url: linkUrl,
  });
}

type StoreBadgesProps = {
  placement: DownloadPlacement;
  /** `light` badge on dark backgrounds; `dark` badge on light backgrounds. */
  theme?: "light" | "dark";
  className?: string;
  size?: "sm" | "md";
  onNavigate?: () => void;
  platforms?: Array<"windows" | "android" | "extension">;
};

export function StoreBadges({
  placement,
  theme = "dark",
  className = "",
  size = "md",
  onNavigate,
  platforms = ["windows", "android", "extension"],
}: StoreBadgesProps) {
  const badgeHeight = size === "sm" ? 40 : 48;
  const androidUrl = androidStoreUrl(placement);
  const extensionUrl = extensionStoreUrl(placement);

  return (
    <div
      className={`store-badges store-badges--${size} flex flex-wrap items-center gap-3 ${className}`}
      data-placement={placement}
      style={{ ["--badge-height" as string]: `${badgeHeight}px` }}
    >
      {platforms.includes("windows") ? (
        <div
          className="store-badge store-badge--windows"
          onClick={() => {
            trackClick(
              placement,
              "windows",
              `https://apps.microsoft.com/detail/${WINDOWS_PRODUCT_ID}`,
            );
            onNavigate?.();
          }}
        >
          <ms-store-badge
            productid={WINDOWS_PRODUCT_ID}
            productname="BioClerk"
            cid={campaignId(placement, "windows")}
            window-mode="direct"
            theme={theme}
            animation="off"
            language="en"
          />
        </div>
      ) : null}

      {platforms.includes("android") ? (
        <a
          href={androidUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="store-badge store-badge--android"
          aria-label="Get BioClerk on Google Play"
          onClick={() => {
            trackClick(placement, "android", androidUrl);
            onNavigate?.();
          }}
        >
          <Image
            src="/brand/google-play-badge.png"
            alt="Get it on Google Play"
            width={572}
            height={176}
            className="store-badge__img"
            unoptimized
          />
        </a>
      ) : null}

      {platforms.includes("extension") ? (
        <a
          href={extensionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="store-badge store-badge--extension"
          aria-label="Get BioClerk from the Chrome Web Store"
          onClick={() => {
            trackClick(placement, "extension", extensionUrl);
            onNavigate?.();
          }}
        >
          <Image
            src="/brand/chrome-web-store-badge.svg"
            alt="Available in the Chrome Web Store"
            width={240}
            height={72}
            className="store-badge__img"
            unoptimized
          />
        </a>
      ) : null}
    </div>
  );
}
