import * as Yup from 'yup'

import { numeroVirgulaParaPonto } from './functions'

export const yupQuantidade = Yup.number()
	.transform((_, value) => {
		if (value && String(value).includes('.')) return null
		return numeroVirgulaParaPonto(value)
	})
	.typeError('Quantidade deve ser um número maior que zero')
	.positive('Quantidade deve ser um número maior que zero')
	.lessThan('100', 'Máximo de 99 itens')
	.required('Informe a quantidade do produto')