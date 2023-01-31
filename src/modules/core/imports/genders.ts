import { Genders } from '../utils/static' 

// @ts-expect-error TS(2307): Cannot find module '../../../../assets/genders/mas... Remove this comment to see the full error message
import genderMasc from '../../../../assets/genders/masc.png'
// @ts-expect-error TS(2307): Cannot find module '../../../../assets/genders/fem... Remove this comment to see the full error message
import genderFem from '../../../../assets/genders/fem.png'
// @ts-expect-error TS(2307): Cannot find module '../../../../assets/genders/age... Remove this comment to see the full error message
import genderAgender from '../../../../assets/genders/agender.png'
// @ts-expect-error TS(2307): Cannot find module '../../../../assets/genders/pan... Remove this comment to see the full error message
import genderPan from '../../../../assets/genders/pangender.png'

const genderIcons = {
  [Genders.MASC]: genderMasc,
  [Genders.FEM]: genderFem,
  [Genders.AGENDER]: genderAgender,
  [Genders.PAN]: genderPan,
}

export default genderIcons
