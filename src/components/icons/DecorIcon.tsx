interface IconProps {
  className?: string;
  size?: number;
}

export default function DecorIcon({ className = "", size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="decor-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      
      {/* Modern minimalist background */}
      <rect x="8" y="8" width="64" height="64" rx="20" fill="url(#decor-bg)" />
      
      {/* Clean vase */}
      <rect x="32" y="48" width="16" height="16" fill="white" rx="6" opacity="0.9" />
      
      {/* Simple decorative stems */}
      <rect x="38" y="32" width="2" height="16" fill="white" rx="1" opacity="0.8" />
      <rect x="42" y="28" width="2" height="20" fill="white" rx="1" opacity="0.8" />
      
      {/* Minimalist flowers */}
      <circle cx="39" cy="28" r="4" fill="white" opacity="0.9" />
      <circle cx="43" cy="24" r="4" fill="white" opacity="0.9" />
      
      {/* Modern decoration elements */}
      <circle cx="24" cy="24" r="3" fill="white" opacity="0.6" />
      <circle cx="56" cy="28" r="3" fill="white" opacity="0.6" />
      <circle cx="20" cy="56" r="2" fill="white" opacity="0.5" />
    </svg>
  );
}
