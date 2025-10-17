interface IconProps {
  className?: string;
  size?: number;
}

export default function GrowerDirectIcon({ className = "", size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grower-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      
      {/* Modern minimalist background */}
      <rect x="8" y="8" width="64" height="64" rx="20" fill="url(#grower-bg)" />
      
      {/* Clean truck design */}
      <rect x="16" y="38" width="28" height="12" fill="white" rx="4" opacity="0.9" />
      <rect x="44" y="40" width="12" height="10" fill="white" rx="3" opacity="0.9" />
      
      {/* Simple cabin */}
      <rect x="44" y="30" width="12" height="8" fill="white" rx="2" opacity="0.9" />
      
      {/* Minimalist wheels */}
      <circle cx="26" cy="54" r="4" fill="white" opacity="0.9" />
      <circle cx="50" cy="54" r="4" fill="white" opacity="0.9" />
      
      {/* Movement arrow */}
      <polygon points="56,35 64,40 56,45" fill="white" opacity="0.7" />
    </svg>
  );
}
