export const environment = {
  production: false,
  UserPoolId: window['env']['UserPoolId'], // Your user pool id here
  ClientId: window['env']['ClientId'], // Your client id here
  tenantId: window['env']['tenantId'],
  stripeKey: window['env']['stripeKey'],
  pKey: window['env']['pKey'],
  enableEncryption: window['env']['enableEncryption'],
  url: {
    answers: '/answers',
    riskApi: location.origin + '/riskapi',
    subscription: location.origin + '/subscriptionapi',
    userProfileApi: location.origin + '/userapi',
    yodlee: location.origin + '/retirementapi',
    analysis: location.origin + '/analysisapi/analysis/summary',
    dev: 'https://dev.intelligent401k.com',
    reports: location.origin + '/reportapi',
    eventConfig: 'assets/data/events.json',
    questions: '/questions',
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`. */
