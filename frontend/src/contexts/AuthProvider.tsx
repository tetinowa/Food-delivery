"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
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
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
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
  const [admin, setAdmin] = useState<Admin | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    const [user] = data;

    setUser(user);

    router.push("/");
  };

  const register = async (
    username: string,
    password: string,
    email: string
  ) => {
    const { data } = await api.post("/auth/register", {
      username,
      password,
      email,
    });

    const [user] = data;

    setUser(user);

    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, admin, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
