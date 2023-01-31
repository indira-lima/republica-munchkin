import { useCallback } from 'react';
import * as SecureStorage from 'expo-secure-store';
import useCancelablePromise from './useCancelablePromise';

const appPrefixStorage = '__rep_munchkin';

const useSecureStorage = () => {
	const { cancelablePromise } = useCancelablePromise()

	/** Salva dados sensíveis no storage com encriptação */
// @ts-expect-error TS(7006): Parameter 'key' implicitly has an 'any' type.
	const secureSave = useCallback(async (key, value) => {
		let strValue = value;
		if (typeof value !== "string")
			strValue = JSON.stringify(value);

// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
		await cancelablePromise(
			SecureStorage.setItemAsync(`${appPrefixStorage}_${key}`, strValue)
		)
	}, [])

	/** Remove dados do storage */
// @ts-expect-error TS(7006): Parameter 'key' implicitly has an 'any' type.
	const removeFromStorage = useCallback(async (key) => {
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
		await cancelablePromise(
			SecureStorage.deleteItemAsync(`${appPrefixStorage}_${key}`)
		)
	}, [])

	/** Busca dados do storage */
// @ts-expect-error TS(7006): Parameter 'key' implicitly has an 'any' type.
	const getFromStorage = useCallback(async (key) => {
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
		const value = await cancelablePromise(
			SecureStorage.getItemAsync(`${appPrefixStorage}_${key}`)
		)

		if (value) {
			try {
// @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
				return JSON.parse(value)
			} catch (e) {
				return value
			}
		}
		return value
	}, [])


	return {
		secureSave, removeFromStorage, getFromStorage
	}
}

export default useSecureStorage
