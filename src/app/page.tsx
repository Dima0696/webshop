'use client';

import Link from 'next/link';
import { Package, Truck, Calendar, Sprout, Palette, User, LogOut, Flower2 } from 'lucide-react';
import { useState } from 'react';
import Logo from '@/components/Logo';
import NavigationHeader from '@/components/NavigationHeader';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, login, logout, isStaff, isAuthenticated } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = async (userType: 'client' | 'staff', credentials: { email: string; password: string }) => {
    const success = await login(userType, credentials);
    if (success) {
      setIsLoginOpen(false);
      alert(`Benvenuto, ${user?.name || 'utente'}!`);
    } else {
      alert('Credenziali non valide');
    }
  };
  const purchaseOptions = [
    {
      title: 'Fiori Recisi',
      description: 'Mazzi e composizioni disponibili immediatamente',
      icon: Flower2,
      href: '/magazzino',
      color: '#2d5a27',
      bgColor: '#e8f5e8'
    },
    {
      title: 'Grower Direct',
      description: 'Presto disponibile - Prodotti direttamente dai fornitori',
      icon: Truck,
      href: '#',
      color: '#4a7c59',
      bgColor: '#f0f9f4',
      comingSoon: true
    },
    {
      title: 'Prevendita',
      description: 'Presto disponibile - Acquista prodotti in arrivo',
      icon: Calendar,
      href: '#',
      color: '#d4af37',
      bgColor: '#fef7e0',
      comingSoon: true
    },
    {
      title: 'Piante',
      description: 'Piante in vaso e verdi',
      icon: Sprout,
      href: '/piante',
      color: '#22c55e',
      bgColor: '#ecfdf5'
    },
    {
      title: 'Decor',
      description: 'Decorazioni e complementi d\'arredo',
      icon: Palette,
      href: '#',
      color: '#8b4513',
      bgColor: '#f6f3f0'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <NavigationHeader 
        onLoginClick={() => setIsLoginOpen(true)}
      />

      {/* Hero Section con Logo + Webshop */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
                    {/* Logo grande con effetti */}
        <div className="hero-logo-container">
          <div className="hero-logo-wrapper">
            <Logo width={600} height={195} className="hero-logo" />
          </div>
              
              {/* Scritta WEBSHOP stilizzata */}
              <div className="webshop-text">
                <span className="webshop-text-main">WEBSHOP</span>
                <div className="webshop-underline"></div>
              </div>
            </div>
            
            {/* Sottotitolo elegante */}
                    <p className="hero-subtitle">
          Il portale digitale per professionisti del settore florovivaistico
        </p>
        
        {/* Transition element */}
        <div className="hero-to-categories-transition">
          <div className="transition-text">Scegli la tua categoria</div>
          <div className="transition-line"></div>
        </div>
      </div>
    </div>
  </section>

  {/* Business Sections */}
  <section className="business-sections">
        <div className="container">
          <div className="sections-grid">
            {purchaseOptions.map((option, index) => {
              const IconComponent = option.icon;
              const isExternal = option.href.startsWith('http');
              const isComingSoon = option.comingSoon;

              
              if (isComingSoon) {
                return (
                  <div
                    key={option.title}
                    className="business-card coming-soon"
                    style={{ 
                      animationDelay: `${index * 0.15}s`,
                      animation: `fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards, subtlePulse 3s ease-in-out infinite ${2 + index * 0.3}s`
                    }}
                  >
                    <div className="business-content">
                      <div className="business-header">
                        <div className="category-icon-top">
                          <IconComponent 
                            size={32} 
                            style={{ color: 'var(--lombarda-dark-green)' }}
                          />
                        </div>
                        <h3 className="business-title">{option.title}</h3>
                      </div>
                      <p className="business-description">{option.description}</p>
                      <div className="business-arrow coming-soon-text">
                        <span>Coming Soon</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12,6 12,12 16,14"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              }
              
              if (isExternal) {
                return (
                  <a
                    key={option.title}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="business-card"
                    style={{ 
                      animationDelay: `${index * 0.15}s`,
                      animation: `fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards, subtlePulse 3s ease-in-out infinite ${2 + index * 0.3}s`
                    }}
                  >
                    <div className="business-content">
                      <div className="business-header">
                        <div className="category-icon-top">
                          <IconComponent 
                            size={32} 
                            style={{ color: 'var(--lombarda-dark-green)' }}
                          />
                        </div>
                        <h3 className="business-title">{option.title}</h3>
                      </div>
                      <p className="business-description">{option.description}</p>
                      <div className="business-arrow">
                        <span>Scopri di più</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                );
              }
              
              return (
                <Link
                  key={option.title}
                  href={option.href}
                  className="business-card"
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    animation: `fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards, subtlePulse 3s ease-in-out infinite ${2 + index * 0.3}s`
                  }}
                >
                                    <div className="business-content">
                    <div className="business-header">
                      <div className="category-icon-top">
                        <IconComponent 
                          size={32} 
                          style={{ color: 'var(--lombarda-dark-green)' }}
                        />
                      </div>
                      <h3 className="business-title">{option.title}</h3>
                    </div>
                    <p className="business-description">{option.description}</p>
                    <div className="business-arrow">
                      <span>Scopri di più</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">© 2024 DimitriFlor. Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}