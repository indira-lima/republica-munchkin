import { NavigationProp } from '@react-navigation/native'

/**
 * Ordena um array de objetos usando a chave especificada
 */
if (!Array.prototype.sortBy) {
  Object.defineProperty(Array.prototype, 'sortBy', {
  	value: function(key, order = "asc") {
  		return [].concat(this).sort(
  			order === "desc" ?
  			(a, b) => a[key] < b[key] :
  			(a, b) => a[key] > b[key]
  		)
  	}
  });
}

/**
 * Retorna o último elemento do array
 */
if (!Array.prototype.last) {
  Object.defineProperty(Array.prototype, 'last', {
    value: function() {
        return this[this.length - 1];
    }
  });
}

/**
 * 
 * @param { NavigationProp } navigation 
 */
export function resetNavigationToMenu(navigation) {
	if (!navigation.reset)
		throw new Error("Objeto navigation inválido")

	navigation.reset({
		index: 0,
		routes: [{ name: 'Menu' }],
	})
}

/**
 * Verifica se a ação a ser despachada pelo navigation
 * é um reset para o Menu
 * 
 * Esta ação é despacahada ao clicar no botão Home da
 * tab bar, que chama a função resetNavigationToMenu
 * 
 * @param {object} action objeto Action a ser despachado
 * @returns 
 */
export function isResetingToMenu(action) {
	return action?.type === "RESET" &&
		   action?.payload?.routes[0]?.name === "Menu"
}

/**
 * Substitui vírgulas na string `numero` para pontos e a
 * retorna convertida para number
 * 
 * @param {string} numero um número escrito com vírgula
 * @returns o número decimal convertido
 */
export function numeroVirgulaParaPonto(numero) {
	return +String(numero).replace(/,/, '.')
}
