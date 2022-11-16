import { createContext, useCallback, useState } from "react";

const AlertContext = createContext({});
export default AlertContext;


export const AlertProvider = ({ children }) => {

	const [currentAlert, setCurrentAlert] = useState(null)

	const closeAlerts = useCallback(() => {
		setCurrentAlert(null)
	}, [])

	const showAlert = useCallback((name, customProps = {}) => {
		if (name == "loading") return showLoading()

		setCurrentAlert({ name, customProps })
	}, [])

	const showLoading = useCallback((show = true) => {
		if (show)
			setCurrentAlert({ name: "loading", customProps: {} })
		else
			closeAlerts()
	}, [])

	return (
		<AlertContext.Provider value={{
			isAlertOpen: currentAlert !== null,
			currentAlert,
			closeAlerts,
			showAlert,
			showLoading,
		}}>
			{children}
		</AlertContext.Provider>
	);
}