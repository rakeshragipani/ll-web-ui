import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { LlHttpService } from './http/ll-http.service';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';

import { SessionStorageService } from '@app/shared/session-storage.service';
import { ActivityHistroyService } from './activityHistrory.service';

@Injectable({
  providedIn: "root",
})
export class CommonService {
  private data$ = new BehaviorSubject<any>(null);
  private mfaData$ = new BehaviorSubject<any>(null);
  public dataEvent = this.data$.asObservable();
  public mfaData = this.mfaData$.asObservable();
  private accountAnalysisData: any;
  private accountOptimizationData: any;
  private billingData: any;
  headers: HttpHeaders;
  userId: string;
  tenantId = environment.tenantId;
  userProfileInfo: any;
  yodleeData: any;
  public setData(data: any) {
    this.data$.next(data);
  }
  public mfaLoginForm(mfaData: any) {
    this.mfaData$.next(mfaData);
  }
  public yodleeKeys(yodleeData: any) {
    this.yodleeData = yodleeData;
  }
  constructor(
    private httpService: LlHttpService,
    private sessionStorageService: SessionStorageService
  ) { }

  getRetirementSavings() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    this.headers = new HttpHeaders({
      tenant_id: this.tenantId,
      userId: this.userId,
    });
    return this.httpService
      .get(environment.url.riskApi + "/savings", { headers: this.headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getRetirementAccounts() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    this.headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      container: "investment",
      "Content-Type": "application/json",
    });
    return this.httpService
      .get(environment.url.yodlee + "/accounts/fetch/0", {
        headers: this.headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getRetirementSavingsData() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    this.headers = new HttpHeaders({
      tenant_id: this.tenantId,
      userId: this.userId,
    });
    return this.httpService
      .get(environment.url.riskApi + "/savings/" + this.userId, {
        headers: this.headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  updateRiskOptionsData(saveOption: any) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    this.headers = new HttpHeaders({
      tenant_id: this.tenantId,
      userId: this.userId,
      "Content-Type": "application/json",
    });
    return this.httpService
      .post(environment.url.riskApi + "/savings/" + this.userId, saveOption, {
        headers: this.headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  saveRiskassessment(saveRiskassessment) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    this.headers = new HttpHeaders({
      tenant_id: this.tenantId,
      userId: this.userId,
    });
    return this.httpService
      .post(environment.url.riskApi + "/savings", saveRiskassessment, {
        headers: this.headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getRiskAssessmentAnalysis(riskAnalysisStepOne) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      risk_value: riskAnalysisStepOne.risk_value.toString(),
      amount: riskAnalysisStepOne.amount.toString(),
      step_number: riskAnalysisStepOne.step_number,
      selected_option: riskAnalysisStepOne.selected_option,
    });
    return this.httpService
      .get(environment.url.riskApi + "/analysis", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getRiskAssessmentAnalysisStepTwo(riskAnalysisStepTwo) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      risk_value: riskAnalysisStepTwo.risk_value.toString(),
      amount: riskAnalysisStepTwo.amount.toString(),
      step_number: riskAnalysisStepTwo.step_number,
      selected_option: riskAnalysisStepTwo.selected_option,
    });
    return this.httpService
      .get(environment.url.riskApi + "/analysis", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getRiskAssessmentAnalysisStepThree(riskAnalysisStepThree) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      risk_value: riskAnalysisStepThree.risk_value.toString(),
      amount: riskAnalysisStepThree.amount.toString(),
      step_number: riskAnalysisStepThree.step_number,
      selected_option: riskAnalysisStepThree.selected_option,
    });
    return this.httpService
      .get(environment.url.riskApi + "/analysis", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getRiskScore() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({ user_id: this.userId });
    return this.httpService
      .get(environment.url.riskApi + "/score", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  sendAnalysisScore(sendAnalysisScore) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
    });
    return this.httpService
      .post(environment.url.riskApi + "/analysis", sendAnalysisScore, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  /* ----------------------------------------- UserProfile Api ---------------------------------------------- */
  getUserData() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
    });
    return this.httpService
      .get(environment.url.userProfileApi + "/users", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  updateUserData(updatedUserInfo) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    this.headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
    });
    return this.httpService
      .post(
        environment.url.userProfileApi + "/users",
        { userInfo: updatedUserInfo },
        { headers: this.headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }



  closeUser(type) {
    this.userId = this.sessionStorageService.getSingleValueFromSession('userId');
    this.headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      tenantid: this.tenantId,
      userid: this.userId,
      closetype:type

    });
    return this.httpService.deleteWithHeaders(environment.url.userProfileApi + '/closeuser', { headers: this.headers }).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  /* -------------------------------------------------- Email Verification ------------------------------------------*/
  emailVerify(emailVerifyInfo) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    this.headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
    });
    return this.httpService
      .post(environment.url.userProfileApi + "/verifyemail", emailVerifyInfo, {
        headers: this.headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  /* -------------------------------------------------- Logout ------------------------------------------*/
  logOut(updatedUserInfo) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    this.headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
    });
    return this.httpService
      .post(environment.url.userProfileApi + "/logout", updatedUserInfo, {
        headers: this.headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  /* -------------------------------------------------- Avatar ------------------------------------------*/
  updateProfileImage(updatedUserInfo) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    this.headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
    });
    return this.httpService
      .post(environment.url.userProfileApi + "/avatar", updatedUserInfo, {
        headers: this.headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  /* ----------------------------------------- Subscription Api ---------------------------------------------- */
  customerPayment(customerDetails: any) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenantId: this.tenantId,
      userId: this.userId,
    });
    return this.httpService
      .post(environment.url.subscription + "/customer/", customerDetails, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  createSubscription(subscriptionDetails) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenantId: this.tenantId,
      userId: this.userId,
    });
    return this.httpService
      .post(
        environment.url.subscription + "/subscriptioninfo/",
        subscriptionDetails,
        {
          headers: headers,
        }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  couponCode(couponCode) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenantId: this.tenantId,
      userId: this.userId,
      couponcode: couponCode,
    });
    return this.httpService
      .get(environment.url.subscription + "/coupons/", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getProducts() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenantId: this.tenantId,
      userId: this.userId,
    });
    return this.httpService
      .get(environment.url.subscription + "/products/", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getStripeCustomerId() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
    });
    return this.httpService
      .get(environment.url.subscription + "/subscription/" + this.userId, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getCustomerCards(customerId) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    // const headers = new HttpHeaders({
    //   tenant_id: this.tenantId,
    //   user_id: this.userId,
    // });
    return this.httpService
      .get(environment.url.subscription + "/cards/customer/" + customerId)
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  deleteCustomerCard(cardId, customerId) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    // const headers = new HttpHeaders({
    //   tenant_id: this.tenantId,
    //   user_id: this.userId,
    // });
    return this.httpService
      .delete(
        environment.url.subscription +
        "/cards/" +
        cardId +
        "/customer/" +
        customerId
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  updateCustomerCard(customerId, cardObject) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    // const headers = new HttpHeaders({
    //   tenant_id: this.tenantId,
    //   user_id: this.userId,
    // });
    return this.httpService
      .put(
        environment.url.subscription + "/cards/customer/" + customerId,
        cardObject
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  changeSubscription(subscriptionDetails) {
    return this.httpService
      .put(
        environment.url.subscription + "/subscriptioninfo",
        subscriptionDetails
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  defaultPaymentRenewalCard(cardDetails) {
    return this.httpService
      .put(environment.url.subscription + "/customer", cardDetails)
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  sendCardToken(customerId, tokenId) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    return this.httpService
      .post(
        environment.url.subscription + "/cards/customer/" + customerId,
        tokenId
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getBillingInvoice(subscriptionId) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    return this.httpService
      .get(
        environment.url.subscription +
        "/subscriptioninfo/billingDetails/" +
        subscriptionId
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  cancelSubscription(subscriptionId) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    return this.httpService
      .delete(
        environment.url.subscription + "/subscriptioninfo/" + subscriptionId
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  /* ----------------------------------------------- Yodlee -------------------------------------------------- */
  getProviders() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      "Content-Type": "application/json",
    });
    return this.httpService
      .get(environment.url.yodlee + "/providers/", {
        headers: headers,
        observe: "response",
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          return res;
        })
      );
  }

  getProviderId(providerId) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      isapitoken: this.yodleeData.isapitoken,
      isusertoken: this.yodleeData.isusertoken,
      token: this.yodleeData.token,
      tokentime: this.yodleeData.tokentime,
      "Content-Type": "application/json",
    });
    return this.httpService
      .get(environment.url.yodlee + "/providers/" + providerId, {
        headers: headers,
        observe: "response",
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  providerAccount(providerId, providerAccount) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      providerId: providerId,
      isapitoken: this.yodleeData.isapitoken,
      isusertoken: this.yodleeData.isusertoken,
      token: this.yodleeData.token,
      tokentime: this.yodleeData.tokentime,
      providerStatus: " ",
    });
    return this.httpService
      .post(environment.url.yodlee + "/provideraccount/", providerAccount, {
        headers: headers,
        observe: "response",
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  providerAccountPut(providerAccountId, providerAccount) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      providerAccountId: providerAccountId.toString(),
      providerStatus: " ",
      isapitoken: this.yodleeData.isapitoken,
      isusertoken: this.yodleeData.isusertoken,
      token: this.yodleeData.token,
      tokentime: this.yodleeData.tokentime,
    });
    return this.httpService
      .put(environment.url.yodlee + "/provideraccount/", providerAccount, {
        headers: headers,
        observe: "response",
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getProviderAccountStatus(providerAccountStatus) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      isapitoken: this.yodleeData.isapitoken,
      isusertoken: this.yodleeData.isusertoken,
      token: this.yodleeData.token,
      tokentime: this.yodleeData.tokentime,
      requestId: "",
      "Content-Type": "application/json",
    });
    return this.httpService
      .get(
        environment.url.yodlee +
        "/provideraccounts/" +
        providerAccountStatus.id,
        { headers: headers, observe: "response" }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getProviderAccount(providerAccountData) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const accountType = this.sessionStorageService.getSingleValueFromSession(
      "accountType"
    );
    const headers = new HttpHeaders({
      provideraccountid: providerAccountData.providerAccountId.toString(),
      Status: providerAccountData.status,
      tenant_id: this.tenantId,
      user_id: this.userId,
      container: "investment",
      "Content-Type": "application/json",
      accountType: accountType.accountType,
    });
    return this.httpService
      .get(environment.url.yodlee + "/accounts", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getHoldingsData(providerId, AccountId) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      provideraccountid: providerId.toString(),
      accountId: AccountId.toString(),
      include: "assetClassification",
      "Content-Type": "application/json",
      tenant_id: this.tenantId,
      user_id: this.userId,
    });
    return this.httpService
      .get(environment.url.yodlee + "/holdings", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getProviderAccountById(providerAccountData) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      container: "investment",
      "Content-Type": "application/json",
    });
    return this.httpService
      .get(environment.url.yodlee + "/accounts/add/" + providerAccountData, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  getFriendlyAccounts() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const accountType = this.sessionStorageService.getSingleValueFromSession(
      "accountType"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
      account_type: accountType.accountType,
    });
    return this.httpService
      .get(environment.url.yodlee + "/accounttype", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  deleteRegisterRetirementAccount(providerAccountId, Id) {
    return (
      this.httpService
        // .delete(environment.url.yodlee + "/accounts/delete/" + providerAccountId)
        .delete(
          environment.url.yodlee +
          "/accounts/delete/" +
          Id + "/" +
          providerAccountId
        )
        .pipe(
          tap((res) => {
            return res.toString;
          })
        )
    );
  }

  /* ----------------------------------------------- Activity Histroy -------------------------------------------------- */
  getActivityHistory() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
    });
    return this.httpService
      .get(environment.url.userProfileApi + "/audit", { headers: headers })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  postActivityHistory(activityHistory) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      tenant_id: this.tenantId,
      user_id: this.userId,
    });
    return this.httpService
      .post(environment.url.userProfileApi + "/audit", activityHistory, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
  /* ----------------------------------------------- End Activity Histroy --------------------------------------------- */
  /* ----------------------------------------------- Reports & Statements --------------------------------------------- */
  reportsAndStatements(reportId) {
    this.userId = this.sessionStorageService.getSingleValueFromSession('userId');
    return this.httpService.get(environment.url.reports + '/getReportsData/' + reportId).pipe(
      tap((res) => {
        return res;
      })
    );
  }
  /* ----------------------------------------------- End of Reports & Statements --------------------------------------------- */
  getAccountAnalysisData() {
    return this.accountAnalysisData;
  }
  setAccountAnalysisData(data) {
    this.accountAnalysisData = data;
  }

  // getAccountAnalysis() {
  //   this.userId = this.sessionStorageService.getSingleValueFromSession('userId');
  //   const headers = new HttpHeaders({
  //     container: 'investment',
  //     'Content-Type': 'application/json',
  //   });
  //   /*  For now populating from JSON file, Todo need to integrate actual api once ready */
  //   return this.httpService.get('../../assets/json/account-analysis.json', { headers: headers }).pipe(
  //     tap((res) => {
  //       this.setAccountAnalysisData(res);
  //       return res;
  //     })
  //   );
  // }

  getAccountAnalysis() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      user_id: this.userId,
      tenant_id: this.tenantId,
      account_id: "123",
    });
    /*  For now populating from JSON file, Todo need to integrate actual api once ready */
    return this.httpService
      .get(environment.url.analysis, { headers: headers })
      .pipe(
        tap((res) => {
          this.setAccountAnalysisData(res);
          return res;
        })
      );
  }

  getAccountOptimizationData() {
    return this.accountOptimizationData;
  }
  setAccountOptimizationData(data) {
    this.accountOptimizationData = data;
  }

  getAccountOptimization() {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      container: "investment",
      "Content-Type": "application/json",
    });
    /*  For now populating from JSON file, Todo need to integrate actual api once ready */
    return this.httpService
      .get("../../assets/json/account-optimization.json", { headers: headers })
      .pipe(
        tap((res) => {
          this.setAccountOptimizationData(res);
          return res;
        })
      );
  }

  setBillingData(data) {
    this.billingData = data;
  }

  getBillingInfo(customerId) {
    this.userId = this.sessionStorageService.getSingleValueFromSession(
      "userId"
    );
    const headers = new HttpHeaders({
      container: "investment",
      "Content-Type": "application/json",
    });
    return this.httpService
      .get(
        environment.url.subscription + "/customer/paymentHistory/" + customerId,
        { headers: headers }
      )
      .pipe(
        tap((res) => {
          return res;
        })
      );
    // /*  For now populating from JSON file, Todo need to integrate actual api once ready */
    // return this.httpService.get('../../assets/json/billing.json', { headers: headers }).pipe(
    //   tap((res) => {
    //     this.setBillingData(res);
    //     return res;
    //   })
    // );
  }

  /* -----------------------------------COGNITO---------------------------------------------*/
  signIn(customerDetails: any) {
    const headers = new HttpHeaders({
      type: "signin",
      "Content-Type": "application/json",
    });
    return this.httpService
      .post(environment.url.userProfileApi + "/auth", customerDetails, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  signUp(customerDetails: any) {
    const headers = new HttpHeaders({
      type: "signup",
      tenant_id: this.tenantId,
      "Content-Type": "application/json",
    });
    return this.httpService
      .post(environment.url.userProfileApi + "/auth", customerDetails, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  confirmPassword(customerDetails: any) {
    const headers = new HttpHeaders({
      type: "confirmpassword",
      tenant_id: this.tenantId,
      "Content-Type": "application/json",
    });
    return this.httpService
      .post(environment.url.userProfileApi + "/auth", customerDetails, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  resetPassword(customerDetails: any) {
    const headers = new HttpHeaders({
      type: "resetpassword",
      tenant_id: this.tenantId,
      "Content-Type": "application/json",
    });
    return this.httpService
      .post(environment.url.userProfileApi + "/auth", customerDetails, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  updateEmail(customerDetails: any) {
    const headers = new HttpHeaders({
      type: "updateemail",
      tenant_id: this.tenantId,
      "Content-Type": "application/json",
    });
    return this.httpService
      .post(environment.url.userProfileApi + "/auth", customerDetails, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }

  /* -----------------------------------COGNITO---------------------------------------------*/
}
