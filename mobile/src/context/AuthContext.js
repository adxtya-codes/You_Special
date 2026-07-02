import React, { createContext, useContext, useState } from 'react';
import { mockRiders, mockDrivers } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'rider' | 'driver' | 'admin'

  const loginAsRider  = (u) => { setUser(u || mockRiders[0]); setRole('rider'); };
  const loginAsDriver = (u) => { setUser(u || mockDrivers[0]); setRole('driver'); };
  const loginAsAdmin  = ()  => { setUser({ id: 'admin', name: 'Admin', initials: 'AD' }); setRole('admin'); };
  const logout = () => { setUser(null); setRole(null); };

  return (
    <AuthContext.Provider value={{ user, role, loginAsRider, loginAsDriver, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
