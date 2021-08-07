export const environment = {
  production: false,
  rooturl: 'http://localhost:3000',
  apiUrl: '/casedetails/getall',
  apiUrlpostcase: '/casedetails',
  apicasegetbyid: '/casedetails/case',
  // apigetid:'http://localhost:3000/auth/:id',
  apiauth: '/auth',
  apiauthsignup: '/auth/signup',
  apiauthlogin: '/auth/admin',
  getname: '/auth/roleid/RoleID:2',
  apiauthpassword: '/auth/password',
  apicaasefileupload: 'http://localhost:3000',
  apiassign: '/casedetails/caseassign',
  apigetquestion: '/casedetails/group/questions',
  apigetquestionoptions: '/casedetails/group/questionoptions',
  apigetanswers: '/casedetails/questions/getanswers/caseid',
  numberofcases: '/casedetails/assignments/numberofassignments/users'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
