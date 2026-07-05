import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center" aria-label="Forge home">
      <span className="text-sm font-semibold leading-none tracking-[0.22em] text-white">
        FORGE
      </span>
    </Link>
  );
}
