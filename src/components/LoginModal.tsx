'use client';

import { useState } from 'react';
import { X, User, Settings } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userType: 'client' | 'staff', credentials: { email: string; password: string }) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [loginType, setLoginType] = useState<'client' | 'staff'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginType, { email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-modal-overlay">
      {/* Backdrop */}
      <div 
        className="login-modal-backdrop"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="login-modal">
        {/* Header */}
        <div className="login-modal-header">
          <h2 className="login-modal-title">Accedi a DimitriFlor</h2>
          <button
            onClick={onClose}
            className="login-modal-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Login Type Selector */}
        <div className="login-type-grid">
          <button
            onClick={() => setLoginType('client')}
            className={`login-type-card ${loginType === 'client' ? 'active' : ''}`}
          >
            <User className="h-6 w-6" />
            <span className="login-type-text">Cliente</span>
          </button>
          
          <button
            onClick={() => setLoginType('staff')}
            className={`login-type-card ${loginType === 'staff' ? 'active' : ''}`}
          >
            <Settings className="h-6 w-6" />
            <span className="login-type-text">Staff</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="login-submit-button"
          >
            Accedi come {loginType === 'client' ? 'Cliente' : 'Staff'}
          </button>
        </form>

        {/* Info */}
        <div className="login-info">
          <p className="login-info-text">
            {loginType === 'client' 
              ? 'Accesso per visualizzare prodotti e fare ordini'
              : 'Accesso staff per gestione inventario e configurazioni'
            }
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="demo-credentials">
          <h4 className="demo-title">Credenziali Demo:</h4>
          <div className="demo-grid">
            <div className="demo-section">
              <strong>Cliente:</strong><br />
              cliente@test.com / cliente123
            </div>
            <div className="demo-section">
              <strong>Staff:</strong><br />
              staff@dimitriflor.it / staff123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
