import { createContext, useCallback, useState } from "react";

const AlertContext = createContext({});
export default AlertContext;

export const AlertProvider = ({
    children
}: any) => {

	const [currentAlert, setCurrentAlert] = useState(null)

	const closeAlerts = useCallback(() => {
		setCurrentAlert(null)
	}, [])

// @ts-expect-error TS(7006): Parameter 'name' implicitly has an 'any' type.
	const showAlert = useCallback((name, customProps = {}) => {
		if (name == "loading") return showLoading()

// @ts-expect-error TS(2345): Argument of type '{ name: any; customProps: {}; }'... Remove this comment to see the full error message
		setCurrentAlert({ name, customProps })
	}, [])

	const showLoading = useCallback((show = true) => {
		if (show)
// @ts-expect-error TS(2345): Argument of type '{ name: string; customProps: {};... Remove this comment to see the full error message
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