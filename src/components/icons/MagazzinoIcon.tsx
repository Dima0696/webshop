interface IconProps {
  className?: string;
  size?: number;
}

export default function MagazzinoIcon({ className = "", size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="magazzino-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      
      {/* Modern minimalist background */}
      <rect x="8" y="8" width="64" height="64" rx="20" fill="url(#magazzino-bg)" />
      
      {/* Clean warehouse icon */}
      <rect x="24" y="35" width="32" height="20" fill="white" rx="3" opacity="0.9" />
      
      {/* Simple roof */}
      <polygon points="20,35 40,20 60,35" fill="white" opacity="0.9" />
      
      {/* Minimalist door */}
      <rect x="37" y="45" width="6" height="10" fill="url(#magazzino-bg)" rx="1" />
      
      {/* Clean windows */}
      <rect x="28" y="40" width="4" height="4" fill="url(#magazzino-bg)" rx="1" />
      <rect x="48" y="40" width="4" height="4" fill="url(#magazzino-bg)" rx="1" />
    </svg>
  );
}
