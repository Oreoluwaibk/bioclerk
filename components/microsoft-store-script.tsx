import Script from "next/script";

export function MicrosoftStoreScript() {
  return (
    <Script
      type="module"
      src="https://get.microsoft.com/badge/ms-store-badge.bundled.js"
      strategy="afterInteractive"
    />
  );
}
