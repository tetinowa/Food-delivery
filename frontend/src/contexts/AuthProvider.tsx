"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  admin: Admin | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  logout: () => void;
};
type User = {
  _id: string;
  name: string;
  email: string;
  username: string;
};
type Admin = {
  _id: string;
  name: string;
  email: string;
};
type LoginResponse = {
  user: User;
  accessToken: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      const { user, accessToken } = data;

      localStorage.setItem("accessToken", accessToken);

      setUser(user);

      router.push("/");
    } catch {
      toast.error("Invalid email or password");
    }
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

    setUser(data.user);

    router.push("/login");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchMe = async () => {
      try {
        const { data } = await api.get<{ user: User }>("/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(data.user);
      } catch {
        localStorage.removeItem("accessToken");
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, admin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
