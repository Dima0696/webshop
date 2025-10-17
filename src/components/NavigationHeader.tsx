'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, LogOut, ShoppingCart, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

interface NavigationHeaderProps {
  onRefresh?: () => void;
  loading?: boolean;
  cartItems?: number;
  onLoginClick?: () => void;
}

export default function NavigationHeader({ onRefresh, loading, cartItems = 0, onLoginClick }: NavigationHeaderProps) {
  const { isAuthenticated, user, logout, isStaff } = useAuth();
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <Logo width={160} height={52} />
          </Link>
          
          <nav className="nav-links">
            <Link 
              href="/" 
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/magazzino" 
              className={`nav-link ${pathname === '/magazzino' ? 'active' : ''}`}
            >
              Fiori Recisi
            </Link>
            <Link 
              href="/piante" 
              className={`nav-link ${pathname === '/piante' ? 'active' : ''}`}
            >
              Piante
            </Link>
            <span className="nav-link disabled">Grower Direct</span>
            <span className="nav-link disabled">Prevendita</span>
            <a href="#" className="nav-link" aria-disabled="true">
              Decor
            </a>
          </nav>

          {/* Controlli Destra */}
          <div className="auth-section">
            {/* Refresh Button (solo su pagine inventario) */}
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={loading}
                style={{ 
                  padding: '8px', 
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px', 
                  color: 'var(--lombarda-green)',
                  cursor: 'pointer',
                  opacity: loading ? 0.5 : 1,
                  transition: 'background-color 0.3s',
                  marginRight: '12px'
                }}
                title="Ricarica inventario"
              >
                <RefreshCw style={{ width: '20px', height: '20px' }} className={loading ? 'animate-spin' : ''} />
              </button>
            )}

            {/* Carrello (solo se ci sono articoli) */}
            {cartItems > 0 && (
              <div style={{ position: 'relative', marginRight: '16px' }}>
                <ShoppingCart style={{ width: '24px', height: '24px', color: 'var(--lombarda-green)' }} />
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '0.75rem',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cartItems}
                </span>
              </div>
            )}

            {/* Login/User Section */}
            {isAuthenticated ? (
              <div className="user-info-container">
                <div className="user-info">
                  <div className="user-name">{user?.name}</div>
                  <div className="user-type">
                    {isStaff ? 'Staff' : 'Cliente'}
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="logout-button"
                >
                  <LogOut className="h-4 w-4" />
                  Esci
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="login-button"
              >
                <User className="h-4 w-4" />
                Accedi
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

