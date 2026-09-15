import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X, Sparkles, Radio } from "lucide-react";

export interface ToastItem {
  id: string;
  type?: "success" | "info" | "warning";
  title: string;
  message: string;
  refId?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Return fallback noop if used outside provider
    return {
      showToast: (toast: Omit<ToastItem, "id">) => {
        window.dispatchEvent(new CustomEvent("devops-toast", { detail: toast }));
      },
      removeToast: () => {}
    };
  }
  return context;
};

const playAudioPing = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.35);
  } catch {
    // Audio context play blocked or unsupported
  }
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toastData: Omit<ToastItem, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastItem = {
      id,
      duration: toastData.duration || 5000,
      ...toastData,
    };

    setToasts((prev) => [newToast, ...prev].slice(0, 4));
    playAudioPing();
  }, []);

  // Event listener fallback for custom events
  useEffect(() => {
    const handleCustomToast = (e: Event) => {
      const customEvent = e as CustomEvent<Omit<ToastItem, "id">>;
      if (customEvent.detail) {
        showToast(customEvent.detail);
      }
    };

    window.addEventListener("devops-toast", handleCustomToast);
    return () => window.removeEventListener("devops-toast", handleCustomToast);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      
      {/* Toast Render Area */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-[calc(100vw-3rem)] pointer-events-none select-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <SingleToast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

interface SingleToastProps {
  key?: React.Key;
  toast: ToastItem;
  onClose: () => void;
}

function SingleToast({ toast, onClose }: SingleToastProps) {
  const duration = toast.duration || 5000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto relative overflow-hidden bg-zinc-950/95 border border-cyan-500/40 rounded-2xl p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl text-white group"
    >
      {/* Top glowing radial flare */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-start gap-3.5 relative z-10">
        
        {/* Animated Icon */}
        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
          {toast.type === "info" ? (
            <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
          ) : toast.type === "warning" ? (
            <AlertCircle className="w-4 h-4 text-amber-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 truncate">
              <span>{toast.title}</span>
              <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
            </h4>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-zinc-300 text-xs mt-1 leading-relaxed font-sans">
            {toast.message}
          </p>

          {toast.refId && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300">
              <span className="text-zinc-500 uppercase">REF:</span>
              <span className="font-semibold">{toast.refId}</span>
            </div>
          )}
        </div>
      </div>

      {/* Shrinking bottom progress timer bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400"
      />
    </motion.div>
  );
}
