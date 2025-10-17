'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'client' | 'staff';
}

interface AuthContextType {
  user: User | null;
  login: (userType: 'client' | 'staff', credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isStaff: boolean;
  isClient: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // Demo users (in production questo dovrebbe essere un API call)
  const demoUsers = {
    clients: [
      { id: '1', email: 'cliente@test.com', password: 'cliente123', name: 'Mario Rossi', type: 'client' as const },
      { id: '2', email: 'test@dimitriflor.it', password: 'test123', name: 'Giulia Bianchi', type: 'client' as const }
    ],
    staff: [
      { id: '3', email: 'staff@dimitriflor.it', password: 'staff123', name: 'Marco Verdi', type: 'staff' as const },
      { id: '4', email: 'admin@dimitriflor.it', password: 'admin123', name: 'Laura Neri', type: 'staff' as const }
    ]
  };

  // Carica utente dal localStorage all'avvio
  useEffect(() => {
    const savedUser = localStorage.getItem('dimitriflor_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('lombardaflor_user');
      }
    }
  }, []);

  const login = async (userType: 'client' | 'staff', credentials: { email: string; password: string }): Promise<boolean> => {
    const users = userType === 'client' ? demoUsers.clients : demoUsers.staff;
    const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        type: foundUser.type
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem('dimitriflor_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dimitriflor_user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isStaff: user?.type === 'staff',
    isClient: user?.type === 'client',
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

