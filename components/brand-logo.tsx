import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { mark: 28, text: "text-lg" },
  md: { mark: 34, text: "text-xl" },
  lg: { mark: 42, text: "text-[1.75rem]" },
};

export function BrandLogo({
  tone = "dark",
  size = "md",
  className = "",
}: BrandLogoProps) {
  const s = sizes[size];
  const textColor = tone === "light" ? "text-white" : "text-foreground";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="BioClerk home"
    >
      <Image
        src="/brand/logo.svg"
        alt=""
        width={s.mark}
        height={s.mark}
        className="shrink-0"
        priority
      />
      <span className={`${s.text} font-bold tracking-tight ${textColor}`}>
        BioClerk
      </span>
    </Link>
  );
}
