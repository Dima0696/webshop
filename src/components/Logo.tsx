export default function Logo({ 
  className = "", 
  width = 180, 
  height = 60 
}: { 
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
      }}
    >
      <span
        style={{
          fontWeight: 800,
          fontSize: Math.max(18, Math.min(48, Math.floor(width / 4))),
          letterSpacing: '0.5px',
          color: 'var(--lombarda-dark-green)',
          lineHeight: 1,
          whiteSpace: 'nowrap'
        }}
      >
        DimitriFlor
      </span>
    </div>
  );
}