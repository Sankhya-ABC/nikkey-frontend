import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";

import { ROUTES } from "../routes";
import { loginService } from "../services/Login";
import { LoginResponse } from "../services/Login/types";
import { Usuario } from "../services/Usuarios/types";
import { Role } from "../types";
import { STORAGE_KEYS } from "../utils/constants";

interface AuthContextValue {
  login: (email: string, password: string) => Promise<void>;
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
    const raw = localStorage.getItem(STORAGE_KEYS.user);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  });

  const [originalUser, setOriginalUser] = useState<Usuario | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.originalUser);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEYS.token),
  );
  const [expiresAt, setExpiresAt] = useState<number | null>(() => {
    const v = localStorage.getItem(STORAGE_KEYS.expiresAt);
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
    localStorage.setItem(STORAGE_KEYS.token, resp.token);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(resp.user));
    localStorage.setItem(STORAGE_KEYS.expiresAt, String(newExpires));

    localStorage.removeItem(STORAGE_KEYS.originalUser);

    setToken(resp.token);
    setUser(resp.user);
    setOriginalUser(null);
    setExpiresAt(newExpires);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.expiresAt);
    localStorage.removeItem(STORAGE_KEYS.originalUser);

    setToken(null);
    setUser(null);
    setOriginalUser(null);
    setExpiresAt(null);

    navigate(ROUTES.LOGIN, { replace: true });
  };

  const login = async (email: string, password: string) => {
    const resp = await loginService.logar({ email, password });
    persistSession(resp);
  };

  const impersonate = (user: Usuario) => {
    if (!isAuthenticated()) {
      throw new Error("Precisa estar autenticado para impersonar");
    }

    if (!originalUser) {
      const currentUser = getUser();
      setOriginalUser(currentUser);
      localStorage.setItem(
        STORAGE_KEYS.originalUser,
        JSON.stringify(currentUser),
      );
    }

    setUser(user);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  };

  const stopImpersonating = () => {
    if (originalUser) {
      setUser(originalUser);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(originalUser));

      setOriginalUser(null);
      localStorage.removeItem(STORAGE_KEYS.originalUser);
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

    if (!userToCheck || !userToCheck.tipo_usuario) return false;

    if (Array.isArray(role)) {
      return role.includes(userToCheck.tipo_usuario);
    }

    return userToCheck.tipo_usuario === role;
  };

  const hasAnyRole = (roles: Role[]): boolean => {
    const userToCheck = getUser();

    if (!userToCheck || !userToCheck.tipo_usuario) return false;
    return roles.includes(userToCheck.tipo_usuario);
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
      if (e.key === STORAGE_KEYS.token) {
        const newToken = localStorage.getItem(STORAGE_KEYS.token);
        setToken(newToken);
      } else if (e.key === STORAGE_KEYS.user) {
        const newUser = localStorage.getItem(STORAGE_KEYS.user);
        setUser(newUser ? JSON.parse(newUser) : null);
      } else if (e.key === STORAGE_KEYS.expiresAt) {
        const newExpires = localStorage.getItem(STORAGE_KEYS.expiresAt);
        setExpiresAt(newExpires ? Number(newExpires) : null);
      } else if (e.key === STORAGE_KEYS.originalUser) {
        const newOriginalUser = localStorage.getItem(STORAGE_KEYS.originalUser);
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
      login,
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
