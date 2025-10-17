interface IconProps {
  className?: string;
  size?: number;
}

export default function PianteIcon({ className = "", size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="piante-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      
      {/* Modern minimalist background */}
      <rect x="8" y="8" width="64" height="64" rx="20" fill="url(#piante-bg)" />
      
      {/* Clean pot */}
      <rect x="28" y="48" width="24" height="16" fill="white" rx="4" opacity="0.9" />
      
      {/* Simple plant stem */}
      <rect x="38" y="30" width="4" height="18" fill="white" rx="2" opacity="0.9" />
      
      {/* Minimalist leaves */}
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="white" opacity="0.8" />
      <ellipse cx="48" cy="34" rx="8" ry="4" fill="white" opacity="0.8" />
      <ellipse cx="40" cy="20" rx="6" ry="3" fill="white" opacity="0.9" />
    </svg>
  );
}
