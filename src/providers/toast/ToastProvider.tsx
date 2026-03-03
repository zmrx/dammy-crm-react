import { useState, useCallback, type ReactNode } from "react";
import { Check, X } from "lucide-react";
import "./Toast.css";
import { ToastContext } from "./ToastContext";

export interface ToastData {
  id: number;
  message: string;
  type: "success" | "error";
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
        >
          {toast.type === "success" ? (
            <Check className="toast__icon" />
          ) : (
            <X className="toast__icon" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </ToastContext.Provider>
  );
}
