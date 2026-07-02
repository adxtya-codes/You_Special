import { createContext, useContext, useState } from 'react';
import { mockRiders, mockDrivers } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = logged out
  const [role, setRole] = useState(null); // 'rider' | 'driver' | 'admin'

  const loginAsRider = (userData) => {
    setUser(userData || mockRiders[0]);
    setRole('rider');
  };

  const loginAsDriver = (userData) => {
    setUser(userData || mockDrivers[0]);
    setRole('driver');
  };

  const loginAsAdmin = () => {
    setUser({ id: 'admin', name: 'Admin', initials: 'AD' });
    setRole('admin');
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loginAsRider, loginAsDriver, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
