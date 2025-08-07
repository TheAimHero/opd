import * as allergyRelations from './allergy/relations'
import * as dataDB from './data/relations'
import * as medicineRelations from './medicine/relations'
import * as patientRelations from './patient/relations'
import * as prescribedMedicineRelations from './prescribedMedicine/relations'
import * as prescribedTestRelations from './prescribedTest/relations'
import * as testRelations from './test/relations'
import * as visitRelations from './visit/relations'


export default {  
  ...allergyRelations,
  ...dataDB,
  ...medicineRelations,
  ...patientRelations,
  ...prescribedMedicineRelations,
  ...prescribedTestRelations,
  ...testRelations,
  ...visitRelations,
}
