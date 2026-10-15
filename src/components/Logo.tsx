import Image from "next/image";
import Link from "next/link";

export function Logo({ inverse, className = "" }: { inverse?: boolean; className?: string }) {
  return (
    <Link href="/" className={`focus-ring inline-flex shrink-0 rounded-sm ${className}`}>
      {inverse ? (
        <Image src="/images/logos/cv-logo-white.png" alt="C&V Dynamics, home" width={208} height={85} className="h-12 w-auto" />
      ) : (
        <Image
          src="/images/logos/cv-logo.png"
          alt="C&V Dynamics, home"
          width={453}
          height={192}
          priority
          className="h-10 w-auto lg:h-12"
        />
      )}
    </Link>
  );
}
