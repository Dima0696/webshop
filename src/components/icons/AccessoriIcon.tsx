interface IconProps {
  className?: string;
  size?: number;
}

export default function AccessoriIcon({ className = "", size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="accessori-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b4513" />
          <stop offset="100%" stopColor="#a0522d" />
        </linearGradient>
        <linearGradient id="tools-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </linearGradient>
        <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
      </defs>
      
      {/* App icon background */}
      <circle cx="32" cy="32" r="30" fill="url(#accessori-bg)" />
      <circle cx="32" cy="32" r="26" fill="url(#tools-gradient)" opacity="0.9" />
      
      {/* Trowel/Spatula */}
      <rect x="18" y="12" width="3" height="20" fill="#8b4513" rx="1" />
      <path d="M16 32 L19.5 28 L22 32 L19 36 Z" fill="url(#metal-gradient)" />
      
      {/* Pruning shears */}
      <path d="M38 16 Q40 14 42 16 L48 22 Q46 24 44 22 L42 20 Q40 18 38 20 L36 22 Q34 20 36 18 Z" fill="url(#metal-gradient)" />
      <path d="M42 20 L44 22 L46 20 L44 18 Z" fill="#ef4444" />
      <circle cx="40" cy="18" r="1" fill="#374151" />
      
      {/* Watering can */}
      <ellipse cx="28" cy="42" rx="8" ry="6" fill="#10b981" />
      <rect x="34" y="38" width="8" height="3" fill="#10b981" rx="1.5" />
      <rect x="26" y="36" width="4" height="6" fill="#10b981" rx="2" />
      
      {/* Water drops */}
      <circle cx="44" cy="36" r="1" fill="#3b82f6" />
      <circle cx="46" cy="38" r="1" fill="#3b82f6" />
      <circle cx="48" cy="40" r="1" fill="#3b82f6" />
      
      {/* Pot */}
      <rect x="44" y="44" width="12" height="10" fill="#d97706" rx="1" />
      <ellipse cx="50" cy="44" rx="6" ry="2" fill="#f59e0b" />
      <rect x="46" y="48" width="8" height="2" fill="#92400e" />
      
      {/* Fertilizer bag */}
      <rect x="12" y="44" width="10" height="12" fill="#16a34a" rx="1" />
      <rect x="14" y="46" width="6" height="8" fill="#22c55e" rx="0.5" />
      <circle cx="17" cy="50" r="1.5" fill="#fef3c7" />
      <text x="17" y="51" textAnchor="middle" fill="#365314" fontSize="4" fontWeight="bold">N</text>
      
      {/* Tools crossed pattern */}
      <path d="M8 8 L12 12" stroke="#d1d5db" strokeWidth="1" opacity="0.5" />
      <path d="M12 8 L8 12" stroke="#d1d5db" strokeWidth="1" opacity="0.5" />
      
      <path d="M52 8 L56 12" stroke="#d1d5db" strokeWidth="1" opacity="0.5" />
      <path d="M56 8 L52 12" stroke="#d1d5db" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

