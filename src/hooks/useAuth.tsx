import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";

import { LoginResponse } from "@/services/Login/types";
import { Usuario } from "@/services/Usuarios/types";
import { Role } from "@/types";
import { LOCAL_STORAGE_KEYS } from "@/utils/constants";

import { ROUTES } from "../routes";

interface AuthContextValue {
  persistSession: (resp: LoginResponse) => void;
  logout: () => void;

  getUser: () => Usuario | null;
  getOriginalUser: () => Usuario | null;
  isAuthenticated: () => boolean;

  getSessionRemaining: () => number;
  impersonate: (user: Usuario) => void;
  stopImpersonating: () => void;
  isImpersonating: () => boolean;

  hasRole: (role: Role | Role[]) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Usuario | null>(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  });

  const [originalUser, setOriginalUser] = useState<Usuario | null>(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.originalUser);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(LOCAL_STORAGE_KEYS.token),
  );
  const [expiresAt, setExpiresAt] = useState<number | null>(() => {
    const v = localStorage.getItem(LOCAL_STORAGE_KEYS.expiresAt);
    return v ? Number(v) : null;
  });

  const [, setTick] = useState(0);

  const getSessionRemaining = () => {
    if (!expiresAt) return 0;
    const remainingMs = expiresAt - Date.now();
    return Math.max(0, Math.floor(remainingMs / 1000));
  };

  const persistSession = (resp: LoginResponse) => {
    const SESSION_DURATION_MS = resp?.expires_in * 60 * 1000;
    const newExpires = Date.now() + SESSION_DURATION_MS;
    localStorage.setItem(LOCAL_STORAGE_KEYS.token, resp.token);
    localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(resp.user));
    localStorage.setItem(LOCAL_STORAGE_KEYS.expiresAt, String(newExpires));

    localStorage.removeItem(LOCAL_STORAGE_KEYS.originalUser);

    setToken(resp.token);
    setUser(resp.user);
    setOriginalUser(null);
    setExpiresAt(newExpires);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.user);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.expiresAt);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.originalUser);

    setToken(null);
    setUser(null);
    setOriginalUser(null);
    setExpiresAt(null);

    navigate(ROUTES.LOGIN, { replace: true });
  };

  const impersonate = (user: Usuario) => {
    if (!isAuthenticated()) {
      throw new Error("Precisa estar autenticado para impersonar");
    }

    if (!originalUser) {
      const currentUser = getUser();
      setOriginalUser(currentUser);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.originalUser,
        JSON.stringify(currentUser),
      );
    }

    setUser(user);
    localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user));
  };

  const stopImpersonating = () => {
    if (originalUser) {
      setUser(originalUser);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.user,
        JSON.stringify(originalUser),
      );

      setOriginalUser(null);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.originalUser);
    }
  };

  const isImpersonating = () => {
    return originalUser !== null;
  };

  const isAuthenticated = () => {
    return !!token && !!expiresAt && expiresAt > Date.now();
  };

  const getUser = () => user;

  const getOriginalUser = () => originalUser;

  const hasRole = (role: Role | Role[]): boolean => {
    const userToCheck = getUser();

    if (!userToCheck || !userToCheck.perfil) return false;

    if (Array.isArray(role)) {
      return role.includes(userToCheck.perfil);
    }

    return userToCheck.perfil === role;
  };

  const hasAnyRole = (roles: Role[]): boolean => {
    const userToCheck = getUser();

    if (!userToCheck || !userToCheck.perfil) return false;
    return roles.includes(userToCheck.perfil);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      if (expiresAt && expiresAt <= Date.now()) {
        logout();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, navigate]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.token) {
        const newToken = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
        setToken(newToken);
      } else if (e.key === LOCAL_STORAGE_KEYS.user) {
        const newUser = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
        setUser(newUser ? JSON.parse(newUser) : null);
      } else if (e.key === LOCAL_STORAGE_KEYS.expiresAt) {
        const newExpires = localStorage.getItem(LOCAL_STORAGE_KEYS.expiresAt);
        setExpiresAt(newExpires ? Number(newExpires) : null);
      } else if (e.key === LOCAL_STORAGE_KEYS.originalUser) {
        const newOriginalUser = localStorage.getItem(
          LOCAL_STORAGE_KEYS.originalUser,
        );
        setOriginalUser(newOriginalUser ? JSON.parse(newOriginalUser) : null);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (expiresAt && expiresAt <= Date.now()) {
      logout();
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      persistSession,
      logout,
      getUser,
      getOriginalUser,
      isAuthenticated,
      getSessionRemaining,
      impersonate,
      stopImpersonating,
      isImpersonating,
      hasRole,
      hasAnyRole,
    }),
    [token, user, originalUser, expiresAt],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
