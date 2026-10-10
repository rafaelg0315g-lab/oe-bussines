/**
 * Static SVG sculpture — rendered when WebGL is unavailable.
 * Keeps the brand object present without any GPU dependency.
 */
export default function SculptureFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex h-full w-full items-center justify-center max-md:-translate-y-14 ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 400 400"
        className="h-auto w-[min(72vw,520px)]"
        fill="none"
      >
        <defs>
          <radialGradient id="oe-core" cx="38%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#e9edf2" />
            <stop offset="42%" stopColor="#9aa2ad" />
            <stop offset="100%" stopColor="#181b1f" />
          </radialGradient>
          <linearGradient id="oe-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dfe4ea" />
            <stop offset="100%" stopColor="#565c66" />
          </linearGradient>
          <radialGradient id="oe-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8bafff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#8bafff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="190" fill="url(#oe-glow)" />

        {/* wide crossing halo */}
        <ellipse
          cx="200"
          cy="200"
          rx="176"
          ry="48"
          stroke="url(#oe-ring)"
          strokeWidth="1.4"
          opacity="0.7"
          transform="rotate(-14 200 200)"
        />

        {/* three parallel orbital rings (Ξ signature) */}
        <g stroke="url(#oe-ring)" strokeWidth="2.2">
          <path d="M 82 168 A 122 122 0 0 1 318 168" />
          <path d="M 74 206 A 126 126 0 0 1 326 206" opacity="0.95" />
          <path d="M 82 244 A 122 122 0 0 1 318 244" opacity="0.8" />
        </g>

        {/* satellite bead */}
        <circle cx="200" cy="80" r="5" fill="#e8ecf1" />
        <circle cx="200" cy="80" r="9" fill="#8bafff" opacity="0.25" />

        {/* titanium core */}
        <circle cx="200" cy="200" r="84" fill="url(#oe-core)" />
        <circle
          cx="200"
          cy="200"
          r="102"
          stroke="#8b93a0"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
