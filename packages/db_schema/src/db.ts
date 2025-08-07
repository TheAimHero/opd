import * as allergyDb from './allergy/db'
import * as authDb from './auth/db'
import * as dataDB from './data/db'
import * as medicineDb from './medicine/db'
import * as patientDb from './patient/db'
import * as prescribedMedicineDb from './prescribedMedicine/db'
import * as prescribedTestDb from './prescribedTest/db'
import * as testDb from './test/db'
import * as userDb from './user/db'
import * as visitDb from './visit/db'


export default {  
  ...allergyDb,
  ...authDb,
  ...dataDB,
  ...medicineDb,
  ...patientDb,
  ...prescribedMedicineDb,
  ...prescribedTestDb,
  ...testDb,
  ...userDb,
  ...visitDb,
}
