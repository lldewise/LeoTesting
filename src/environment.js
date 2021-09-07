let Base_URL = {
  eventsource: 'http://localhost:5000',
  userPost: 'http://localhost:5008',
  adminPost: 'http://localhost:5009',
  studentPost: 'http://localhost:5006',
  newsPost: 'http://localhost:5005',
  teacherPost: 'http://localhost:5007',
  notificationSource: 'https://localhost:44377',
};
let Endpoints = {
  msal: {
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
  ateduSSOJSONFile: '/atedusso_DEV.json',
  atedu_data: 'ws://localhost:3000',
  accountAPI: 'https://localhost:44347/',
  onboadingAPI: 'https://localhost:44360/',
  subscriptionAPI: 'https://localhost:44377/',
  teamsAPI: 'https://localhost:44362/',
};

if (process.env.NODE_ENV.trim() === 'development') {
  Base_URL = {
    eventsource: 'http://localhost:5000',
    userPost: 'http://localhost:5008',
    adminPost: 'http://localhost:5009',
    studentPost: 'http://localhost:5006',
    newsPost: 'http://localhost:5005',
    teacherPost: 'http://localhost:5007',
    notificationSource: 'https://localhost:44377',
  };
  Endpoints = {
    msal: {
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    ateduSSOJSONFile: '/atedusso_DEV.json',
    atedu_data: 'ws://localhost:3000',
    accountAPI: 'https://localhost:44347/',
    onboadingAPI: 'https://localhost:44360/',
    subscriptionAPI: 'https://atedu-subscription-api.azurewebsites.net/',
    teamsAPI: 'https://localhost:44362/',
  };
}

if (process.env.NODE_ENV.trim() === 'production') {
  Base_URL = {
    eventsource: 'https://ateduweu-d-queryapi.azurewebsites.net',
    userPost: 'https://ateduweu-d-userapi.azurewebsites.net',
    studentPost: 'https://ateduweu-d-studentapi.azurewebsites.net',
    adminPost: 'https://ateduweu-d-adminapi.azurewebsites.net',
    newsPost: 'https://ateduweu-d-newsapi.azurewebsites.net',
    teacherPost: 'https://ateduweu-d-teacherapi.azurewebsites.net',
    notificationSource: 'https://atedu-subscription-api.azurewebsites.net',
  };
  Endpoints = {
    msal: {
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    ateduSSOJSONFile: '/atedusso_DEV.json',
    atedu_data: 'wss://atedu-data-dev.azurewebsites.net',
    accountAPI: 'https://atedu-account-api.azurewebsites.net/',
    onboadingAPI: 'https://localhost:44360/',
    subscriptionAPI: 'https://atedu-subscription-api.azurewebsites.net/',
    teamsAPI: 'https://localhost:44362/',
  };
}

 

export { Base_URL, Endpoints };
