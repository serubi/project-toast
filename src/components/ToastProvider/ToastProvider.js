import React from 'react';
import useEscapeKey from '../../hooks/UseEscapeKey';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]); // { id, variant, message }

  function addToast(variant, message) {
    const toast = { id: crypto.randomUUID(), variant, message };
    const newToasts = [...toasts, toast];
    setToasts(newToasts);
  }

  function dismissToast(id) {
    const newToasts = toasts.filter(toast => toast.id !== id);
    setToasts(newToasts);
  }

  // Clear all toasts when user presses 'Escape'
  const clearToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(clearToasts);

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
