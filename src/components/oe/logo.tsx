/**
 * OE BUSINESS brand mark — original geometric monogram.
 * "O" = orbital ring · "E" = three parallel bars (Ξ-like geometry).
 * Pure SVG so it stays crisp at any size, monochrome via currentColor.
 */

export function OeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="OE BUSINESS"
      className={className}
    >
      <circle
        cx="23"
        cy="32"
        r="14.5"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M45 21.5h13M45 32h9.5M45 42.5h13"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Vertical lockup used in navbar / footer. */
export function OeLockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <OeMark className="h-8 w-8 shrink-0 text-titanium" />
      <span className="font-display leading-none">
        <span className="block text-[15px] font-semibold tracking-[0.22em] text-ice">
          OE
        </span>
        <span className="mt-1 block text-[8.5px] font-medium tracking-[0.5em] text-mute">
          BUSINESS
        </span>
      </span>
    </span>
  );
}
