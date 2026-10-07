"use client";

const STORE_URL = "https://apps.microsoft.com/detail/9PH1DPH465R9";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type DownloadLocation = "hero" | "header" | "mobile_menu" | "bottom_cta";

type DownloadForWindowsProps = {
  location: DownloadLocation;
  className?: string;
  onNavigate?: () => void;
};

function trackDownloadClick(location: DownloadLocation) {
  window.gtag?.("event", "download_click", {
    event_category: "engagement",
    event_label: "Download for Windows",
    button_location: location,
    link_url: STORE_URL,
  });
}

export function DownloadForWindows({
  location,
  className,
  onNavigate,
}: DownloadForWindowsProps) {
  return (
    <a
      href={STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        trackDownloadClick(location);
        onNavigate?.();
      }}
    >
      Download for Windows
    </a>
  );
}
