interface IconProps {
  className?: string;
  size?: number;
}

export default function PrevenditaIcon({ className = "", size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="prevendita-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      
      {/* Modern minimalist background */}
      <rect x="8" y="8" width="64" height="64" rx="20" fill="url(#prevendita-bg)" />
      
      {/* Clean calendar */}
      <rect x="20" y="24" width="40" height="32" fill="white" rx="6" opacity="0.9" />
      
      {/* Simple header */}
      <rect x="20" y="24" width="40" height="8" fill="url(#prevendita-bg)" rx="6" opacity="0.3" />
      
      {/* Minimalist grid */}
      <line x1="28" y1="36" x2="28" y2="52" stroke="url(#prevendita-bg)" strokeWidth="1" opacity="0.3" />
      <line x1="36" y1="36" x2="36" y2="52" stroke="url(#prevendita-bg)" strokeWidth="1" opacity="0.3" />
      <line x1="44" y1="36" x2="44" y2="52" stroke="url(#prevendita-bg)" strokeWidth="1" opacity="0.3" />
      <line x1="52" y1="36" x2="52" y2="52" stroke="url(#prevendita-bg)" strokeWidth="1" opacity="0.3" />
      
      <line x1="24" y1="40" x2="56" y2="40" stroke="url(#prevendita-bg)" strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="44" x2="56" y2="44" stroke="url(#prevendita-bg)" strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="48" x2="56" y2="48" stroke="url(#prevendita-bg)" strokeWidth="1" opacity="0.3" />
      
      {/* Highlighted date */}
      <circle cx="32" cy="42" r="3" fill="url(#prevendita-bg)" />
      
      {/* Clock indicator */}
      <circle cx="50" cy="18" r="6" fill="white" opacity="0.9" />
      <circle cx="50" cy="18" r="1" fill="url(#prevendita-bg)" />
      <line x1="50" y1="18" x2="50" y2="14" stroke="url(#prevendita-bg)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="18" x2="53" y2="18" stroke="url(#prevendita-bg)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
