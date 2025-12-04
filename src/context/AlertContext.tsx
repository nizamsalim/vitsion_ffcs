import { createContext, useState, type ReactNode, useContext } from "react";

interface Alert {
  title: string | null;
  type: AlertType | null;
}

export enum AlertType {
  DANGER = "danger",
  SUCCESS = "success",
  WARNING = "warning",
}

export interface AlertContextType {
  alert: Alert;
  isVisible: boolean;
  showAlert: (message?: string, type?: AlertType, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const AlertContextProvider = ({ children }: Props) => {
  const [alert, setAlert] = useState<Alert>({ title: null, type: null });
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = (
    message?: string,
    type: AlertType = AlertType.DANGER,
    duration: number = 2000
  ) => {
    setAlert({ title: message as string, type });
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ alert, isVisible, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
export default AlertContextProvider;

export const useAlert = () => useContext(AlertContext);
