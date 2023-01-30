import moment from "moment-timezone";
import 'moment/locale/pt-br'

moment.tz.setDefault('America/Sao_Paulo');

export const momentTz = moment