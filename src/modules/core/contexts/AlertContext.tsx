import type { AwesomeAlertProps } from "react-native-awesome-alerts";
import { createContext, useCallback, useState } from "react";

type alertName = "confirm" | "error" | "success" | "loading";

interface Alert {
  name: alertName,
  customProps: AwesomeAlertProps;
}

interface AlertContextValue {
  isAlertOpen: boolean;
  currentAlert?: Alert;
  closeAlerts: () => void;
  showAlert: (name: alertName, customProps: AwesomeAlertProps) => void;
  showLoading: (show?: boolean) => void;
}

const AlertContext = createContext<AlertContextValue>({} as AlertContextValue);
export default AlertContext;

export const AlertProvider = ({ children }: any) => {
  const [currentAlert, setCurrentAlert] = useState<Alert | undefined>();

  const closeAlerts = useCallback(() => {
    setCurrentAlert(undefined);
  }, []);

  const showAlert = useCallback(
    (name: alertName, customProps: AwesomeAlertProps = {}) => {
      if (name == "loading") return showLoading();

      setCurrentAlert({ name, customProps });
    },
    []
  );

  const showLoading = useCallback((show = true) => {
    if (show) setCurrentAlert({ name: "loading", customProps: {} });
    else closeAlerts();
  }, []);

  return (
    <AlertContext.Provider
      value={{
        isAlertOpen: currentAlert !== null,
        currentAlert,
        closeAlerts,
        showAlert,
        showLoading,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

