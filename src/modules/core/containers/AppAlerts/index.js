import { Fragment } from "react"

import CustomAlert from "../CustomAlert"

import useAlerts from "../../Hooks/useAlerts"

export default function AppAlerts() {
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