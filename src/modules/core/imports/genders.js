import { Genders } from '../../../utils/static' 

import genderMasc from '../../../../assets/genders/masc.png'
import genderFem from '../../../../assets/genders/fem.png'
import genderAgender from '../../../../assets/genders/agender.png'
import genderPan from '../../../../assets/genders/pangender.png'

const genderIcons = {
  [Genders.MASC]: genderMasc,
  [Genders.FEM]: genderFem,
  [Genders.AGENDER]: genderAgender,
  [Genders.PAN]: genderPan,
}

export default genderIcons
