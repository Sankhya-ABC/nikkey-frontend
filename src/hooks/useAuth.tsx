import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthContextValue {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getUser: () => User | null;
  isAuthenticated: () => boolean;
  getSessionRemaining: () => number;
}

const STORAGE_KEYS = {
  token: "auth_token",
  user: "auth_user",
  expiresAt: "auth_expiresAt",
};

const SESSION_DURATION_MS = 120 * 60 * 1000;

const fakeApiLogin = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  await new Promise((r) => setTimeout(r, 700));
  if (email === "user@example.com" && password === "password") {
    return {
      token: "fake-jwt-token-123",
      user: { id: "1", name: "Demo User", email },
    };
  }
  throw new Error("Usuário ou senha errados");
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.user);
    return raw ? (JSON.parse(raw) as User) : null;
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

  const persistSession = (resp: AuthResponse) => {
    const newExpires = Date.now() + SESSION_DURATION_MS;
    localStorage.setItem(STORAGE_KEYS.token, resp.token);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(resp.user));
    localStorage.setItem(STORAGE_KEYS.expiresAt, String(newExpires));
    setToken(resp.token);
    setUser(resp.user);
    setExpiresAt(newExpires);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.expiresAt);
    setToken(null);
    setUser(null);
    setExpiresAt(null);
    navigate("/login", { replace: true });
  };

  const login = async (email: string, password: string) => {
    const resp = await fakeApiLogin(email, password);
    persistSession(resp);
  };

  const isAuthenticated = () => {
    return !!token && !!expiresAt && expiresAt > Date.now();
  };

  const getUser = () => user;

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
      if (
        e.key === STORAGE_KEYS.token ||
        e.key === STORAGE_KEYS.user ||
        e.key === STORAGE_KEYS.expiresAt
      ) {
        const newToken = localStorage.getItem(STORAGE_KEYS.token);
        const newUser = localStorage.getItem(STORAGE_KEYS.user);
        const newExpires = localStorage.getItem(STORAGE_KEYS.expiresAt);
        setToken(newToken);
        setUser(newUser ? JSON.parse(newUser) : null);
        setExpiresAt(newExpires ? Number(newExpires) : null);
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
    () => ({ login, logout, getUser, isAuthenticated, getSessionRemaining }),
    [token, user, expiresAt],
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
