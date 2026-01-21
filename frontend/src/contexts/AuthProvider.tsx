"use client";

import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  admin: Admin | null;
};
type User = {
  _id: string;
  name: string;
  email: string;
};
type Admin = {
  _id: string;
  name: string;
  email: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>({
    _id: "AA",
    name: "AA",
    email: "aa",
  });
  return (
    <AuthContext.Provider value={{ user, admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
