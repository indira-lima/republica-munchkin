import { StyleSheet } from 'react-native';
import AwesomeAlert, { AwesomeAlertProps } from 'react-native-awesome-alerts';
import useAlerts from '../../hooks/useAlerts';
import globalStyles, { colors, fonts } from '../../utils/styles';

const DefaultCustomAlert = ({
	show = false,
	cancellable = false,
	vertical = false,
	large = false,
	...props
}: AwesomeAlertProps & { cancellable?: boolean, vertical?: boolean, large?: boolean }) => {
	return (
		<AwesomeAlert
			show={show}
			closeOnTouchOutside={cancellable}
			closeOnHardwareBackPress={cancellable}
			useNativeDriver
			titleStyle={styles.alertTitle}
			messageStyle={styles.alertMessage}
			cancelButtonTextStyle={styles.alertButton}
			confirmButtonTextStyle={styles.alertButton}
			contentStyle={styles.alertContent}
			contentContainerStyle={large ? { width: '95%', maxWidth: null } : undefined}
			actionContainerStyle={{
				flexDirection: vertical ? 'column' : 'row',
				justifyContent: vertical ? undefined : 'space-between',
			}}
			cancelText='Cancelar'
			cancelButtonColor={"gray"}

			confirmText='Ok'
			confirmButtonColor={colors.action}
			{...props}
		/>
	)
}

const Loading = ({ show = false }) => {
	return (
		<DefaultCustomAlert
			show={show}
			showProgress
			message="Carregando..."
		/>
	)
}

const Success = ({
	show = false,
	title = "Sucesso!",
	message = "Requisição enviada com sucesso.",
	...props
}: AwesomeAlertProps) => {
	const { closeAlerts } = useAlerts()

	return (
		<DefaultCustomAlert
			show={show}
			title={title}
			message={message}

			// OK
			showConfirmButton={true}
			onConfirmPressed={closeAlerts}
			confirmText="OK"
			{...props}
		/>
	)
}

const Error = ({
	show = false,
	title = "Ops!",
	message = "Ocorreu um erro ao enviar a requisição. Por favor, tente novamente.",
	showTryAgain = false,
	onTryAgain = () => { },
	...props
}: AwesomeAlertProps & { showTryAgain: boolean, onTryAgain: (() => void) }) => {
	const { closeAlerts } = useAlerts()

	return (
		<DefaultCustomAlert
			show={show}
			title={title}
			message={message}

			// Tentar novamente
			showConfirmButton={showTryAgain}
			onConfirmPressed={onTryAgain}
			confirmText="Tentar novamente"

			// Cancelar
			showCancelButton={true}
			cancelText="OK"
			onCancelPressed={closeAlerts}

			{...props}
		/>
	)
}

const Confirm = ({
	show = false,
	title = "Confirmar",
	message = "",
	onConfirmPressed,
	onCancelPressed,
	...props
}: AwesomeAlertProps) => {
	const { closeAlerts } = useAlerts()

	return (
		<DefaultCustomAlert
			show={show}
			title={title}
			message={message}

			// Confirmar
			confirmText={props.confirmText || "Confirmar"}
			showConfirmButton={true}
			onConfirmPressed={onConfirmPressed || closeAlerts}

			// Cancelar
			cancelText={props.cancelText || "Cancelar"}
			showCancelButton={true}
			onCancelPressed={onCancelPressed || closeAlerts}
			{...props}
		/>
	)
}

const styles = StyleSheet.create({
	alertTitle: {
		...globalStyles.title,
		textAlign: 'center'
	},
	alertMessage: {
		...globalStyles.text,
		fontSize: fonts.large,
		textAlign: 'center'
	},
	alertButton: {
		...globalStyles.text,
		color: 'white'
	},
	alertContent: { padding: 0 },
});

const CustomAlert = {
	Loading,
	Confirm,
	Error,
	Success
}

export default CustomAlert
