import { Injectable } from "@angular/core";

import { User } from "@app/sign-up/user.model";

@Injectable({
  providedIn: "root",
})
export class UserInfoService {
  private userInfo: User;

  updateUserInfo(users: User[]) {
    this.userInfo = this.modifyUserObject(users[0]);
  }

  getUserInfo(): any {
    return this.userInfo;
  }

  modifyUserObject(user): User {
    return {
      firstName: user["first_name"],
      lastName: user["last_name"],
      middleName: user["middle_name"],
      createTime: user["create_date"],
      dateOfBirth: user["date_of_birth"],
      age: user.age,
      retirementAge: user["retirement_age"],
      email: user.primary_email,
      altEmail: user["alt_email"],
      refBroker: user.refbroker,
      phoneNumber: user.phone,
      cognitoUsername: user["cognito_username"],
      tenant_id: user["tenant_id"],
      state: user.state,
      active: user.active,
      uuid: user.uuid,
      login_time: user.login_date,
      userPreferences: user["user_preferences"] || {},
      additionalInformation: user["additional_information"] || {},
      address1: user["address1"],
      address2: user["address2"],
      city: user["city"],
      stateName: user["state_name"],
      zipCode: user["zip_code"],
      profileImage: user["profile_image"],
      paymentPlan: user["paymentplan"],
      accountid: user["accountid"],
    };
  }
}
