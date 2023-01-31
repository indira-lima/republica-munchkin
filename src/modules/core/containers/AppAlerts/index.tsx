import { Fragment } from "react"

import CustomAlert from "../../components/CustomAlert"

import useAlerts from "../../hooks/useAlerts"

export default function AppAlerts() {
// @ts-expect-error TS(2339): Property 'currentAlert' does not exist on type '{}... Remove this comment to see the full error message
	const { currentAlert, isAlertOpen } = useAlerts()
	if (!isAlertOpen) return null

	const { name = "", customProps = {} } = currentAlert
	return (
		<Fragment>
			{/* Loading */}
			{name === "loading" && <CustomAlert.Loading show={true} />}

			{/* Error */}
			{name === "error" && <CustomAlert.Error show={true} {...customProps}/>}

			{/* Success */}
			{name === "success" && <CustomAlert.Success show={true} {...customProps} />}

			{/* Confirm */}
			{name === "confirm" && <CustomAlert.Confirm show={true} {...customProps} />}
		</Fragment>
	)
}