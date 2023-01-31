import { NavigationProp } from '@react-navigation/native'

/**
 * Ordena um array de objetos usando a chave especificada
 */
// @ts-expect-error TS(2551): Property 'sortBy' does not exist on type 'any[]'. ... Remove this comment to see the full error message
if (!Array.prototype.sortBy) {
  Object.defineProperty(Array.prototype, 'sortBy', {
  // @ts-expect-error TS(7006): Parameter 'key' implicitly has an 'any' type.
  	value: function(key, order = "asc") {
  		return [].concat(this).sort(
  // @ts-expect-error TS(2345): Argument of type '(a: never, b: never) => boolean'... Remove this comment to see the full error message
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
// @ts-expect-error TS(2339): Property 'last' does not exist on type 'any[]'.
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
// @ts-expect-error TS(7006): Parameter 'navigation' implicitly has an 'any' typ... Remove this comment to see the full error message
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
// @ts-expect-error TS(7006): Parameter 'action' implicitly has an 'any' type.
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
// @ts-expect-error TS(7006): Parameter 'numero' implicitly has an 'any' type.
export function numeroVirgulaParaPonto(numero) {
	return +String(numero).replace(/,/, '.');
}

/**
 * Import all resources from a require.context
 */
// @ts-expect-error TS(7006): Parameter 'r' implicitly has an 'any' type.
export function importAll(r) {
	r.keys().forEach(r)
}
