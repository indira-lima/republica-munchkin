import * as Yup from 'yup'

import { numeroVirgulaParaPonto } from './functions'

export const yupQuantidade = Yup.number()
	.transform((_, value) => {
		if (value && String(value).includes('.')) return null
		return numeroVirgulaParaPonto(value)
	})
	.typeError('Quantidade deve ser um número maior que zero')
	.positive('Quantidade deve ser um número maior que zero')
// @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
	.lessThan('100', 'Máximo de 99 itens')
	.required('Informe a quantidade do produto')