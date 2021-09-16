export const environment = {
  production: true,
  e2e: false,
  version: '1.0.0',
  serverUrl: '/api',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'fr-FR'],
  openid: {
    providers: [
      {
        name: 'auth0',
        displayName: 'Auth0',
        logoSrc: 'assets/images/auth0.png',
        clientID: 'jNmkrrsT0wforSkY0tgNsxVCdqhMrI2b',
        authorizationEndpoint:
          'https://thermalcloudservices-dev-ci.auth0.com/authorize',
        tokenEndpoint:
          'https://thermalcloudservices-dev-ci.auth0.com/oauth/token',
        endSessionEndpoint:
          'https://thermalcloudservices-dev-ci.auth0.com/v2/logout',
        endSessionRedirectKey: 'returnTo',
      },
      {
        name: 'azure_ad',
        displayName: 'Azure AD',
        logoSrc: 'assets/images/azureA.png',
        clientID: 'cc727d3f-d067-4824-9fdb-cbca8b655ef2',
        authorizationEndpoint:
          'https://nventb2c.b2clogin.com/nventb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_signin',
        tokenEndpoint:
          'https://nventb2c.b2clogin.com/nventb2c.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1_signin',
        endSessionEndpoint:
          'https://nventb2c.b2clogin.com/nventb2c.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1_signin',
        endSessionRedirectKey: 'post_logout_redirect_uri',
      },
    ],
  },
  testid: {
    provider: {
      name: 'tidp',
      displayName: 'TIDP',
      logoSrc: 'assets/images/azureA.png',
      clientID: 'T5S2P3',
      tokenEndpoint: 'http://localhost:8888/tidp/oauth2/token',
      configurationURL:
        'http://localhost:8888/tidp/.well-known/openid-configuration',
    },
  },
  idTokenDebug: false,
};
