import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, Box, Collapse, IconButton } from "@mui/material";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type AlertOptions = {
  title?: string;
  icon?: ReactNode;
  duration?: number;
  children: ReactNode;
  severity?: "success" | "info" | "warning" | "error";
};

type AlertState = AlertOptions & {
  open: boolean;
};

type AlertContextType = {
  showAlert: (options: AlertOptions) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState | null>(null);
  const timerRef = useRef<number | null>(null);

  const closeAlert = useCallback(() => {
    setAlert((prev) => (prev ? { ...prev, open: false } : prev));

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showAlert = useCallback(
    ({
      title,
      icon,
      duration = 4000,
      children,
      severity = "info",
    }: AlertOptions) => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      setAlert({
        title,
        icon,
        children,
        duration,
        severity,
        open: true,
      });

      timerRef.current = window.setTimeout(() => {
        closeAlert();
      }, duration);
    },
    [closeAlert],
  );

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1400,
          width: "100%",
          maxWidth: 420,
        }}
      >
        <Collapse in={Boolean(alert?.open)}>
          {alert && (
            <Alert
              severity={alert.severity}
              icon={alert.icon}
              action={
                <IconButton size="small" color="inherit" onClick={closeAlert}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
              {alert.children}
            </Alert>
          )}
        </Collapse>
      </Box>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }

  return context;
};
