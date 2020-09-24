import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { environment } from '@env/environment';
const poolData = {
  // UserPoolId: environment.UserPoolId, // Your user pool id here
  // ClientId: environment.ClientId, // Your client id here
};

// const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root', // need to be removed
})
export class AuthService {
  cognitoUser: any;
  userPrefillInfo: {};
  tenantId = environment.tenantId;
  userInfo: any;
  email: any;

  constructor() {}

  getUserName(userInfoObj) {
    console.log(userInfoObj);
    this.userInfo = userInfoObj;
  }

  // signUp(username, email, password, responseHandle) {
  //   const attributeList = [];
  //   const userAttributeList: CognitoUserAttribute[] = [];
  //   const nameAttribute = {
  //     Name: 'name',
  //     Value: this.userInfo.firstName + ' ' + this.userInfo.lastName,
  //   };
  //   const firstNameAttribute = {
  //     Name: 'given_name',
  //     Value: this.userInfo.firstName,
  //   };
  //   const lastNameAttribute = {
  //     Name: 'family_name',
  //     Value: this.userInfo.lastName,
  //   };
  //   const tenantIdAttribute = {
  //     Name: 'custom:tenant_id',
  //     Value: this.tenantId,
  //   };

  //   const dobAttribute = {
  //     Name: 'custom:date_of_birth',
  //     Value: this.userInfo.dob,
  //   };
  //   const ageAttribute = {
  //     Name: 'custom:age',
  //     Value: this.userInfo.age.toString(),
  //   };
  //   const retirementAgeAttribute = {
  //     Name: 'custom:retirement_age',
  //     Value: this.userInfo.retirementAge,
  //   };

  //   userAttributeList.push(new CognitoUserAttribute(nameAttribute));
  //   userAttributeList.push(new CognitoUserAttribute(firstNameAttribute));
  //   userAttributeList.push(new CognitoUserAttribute(lastNameAttribute));
  //   userAttributeList.push(new CognitoUserAttribute(tenantIdAttribute));
  //   userAttributeList.push(new CognitoUserAttribute(dobAttribute));
  //   userAttributeList.push(new CognitoUserAttribute(ageAttribute));
  //   userAttributeList.push(new CognitoUserAttribute(retirementAgeAttribute));
  //   userPool.signUp(email, password, userAttributeList, null, (err, result) => {
  //     responseHandle(err, result);
  //   });
  // }

  // confirmCode(code) {
  //   const userData = {
  //     Username: this.cognitoUser.username,
  //     Pool: userPool,
  //   };
  //   const cognitoUser = new CognitoUser(userData);
  //   cognitoUser.confirmRegistration(code, true, function (err, result) {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log('call result: ' + result);
  //   });
  // }

  // signIn(email, password, errorHandle, successhandle) {
  //   const authenticationData = {
  //     Username: email,
  //     Password: password,
  //   };
  //   const authenticationDetails = new AuthenticationDetails(authenticationData);

  //   const userData = {
  //     Username: email,
  //     Pool: userPool,
  //   };
  //   const cognitoUser = new CognitoUser(userData);
  //   cognitoUser.authenticateUser(authenticationDetails, {
  //     onFailure: (err) => {
  //       errorHandle(err);
  //     },
  //     onSuccess: (result) => {
  //       successhandle(result);
  //     },
  //   });
  // }

  // resetPassword(email, errorHandle, successhandle) {
  //   this.email = email;
  //   const userData = {
  //     Username: this.email,
  //     Pool: userPool,
  //   };
  //   const cognitoUser = new CognitoUser(userData);
  //   cognitoUser.forgotPassword({
  //     onFailure: (err) => {
  //       errorHandle(err);
  //     },
  //     onSuccess: (result) => {
  //       successhandle(result);
  //     },
  //   });
  // }

  // confirmPassword(verificationCode, newPassword, errorHandle, successhandle) {
  //   const userData = {
  //     Username: this.email,
  //     Pool: userPool,
  //   };

  //   const cognitoUser = new CognitoUser(userData);
  //   cognitoUser.confirmPassword(verificationCode, newPassword, {
  //     onSuccess: () => {
  //       successhandle('success');
  //     },
  //     onFailure: (err: Error) => {
  //       errorHandle(err);
  //     },
  //   });
  // }

  // getAuthenticatedUser() {
  //   return userPool.getCurrentUser();
  // }

  signOut() {}

  // updateEmail(newEmail, responseHandle) {
  //   const user = userPool.getCurrentUser();
  //   const userAttributeEmail = [];
  //   user.getSession((err, session) => {
  //     const emailAttribute = {
  //       Name: 'email',
  //       Value: newEmail,
  //     };
  //     userAttributeEmail.push(new CognitoUserAttribute(emailAttribute));
  //     console.log(userAttributeEmail);
  //     user.updateAttributes(userAttributeEmail, (error, results) => {
  //       responseHandle(error, results);
  //     });
  //   });
  // }

  getUserFirstLastName() {
    this.userPrefillInfo = { firstName: this.userInfo.firstName, lastName: this.userInfo.lastName, email: this.userInfo.email };
    return this.userPrefillInfo;
  }
}
