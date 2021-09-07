import Keycloak from 'keycloak-js';
import i18n from '../i18n/i18n';
import routeConfig from '../routeConfig';
import logger from 'loglevel';
import { Endpoints } from '../environment';

const updatedRoute = routeConfig;
updatedRoute.path = '/' + i18n.language + '/';
updatedRoute.children.map(item => {
  if (!item.path.includes(i18n.language)) {
    return (item.path = '/' + i18n.language + item.path);
  }
  return item.path;
});

const ateduSSO = new Keycloak(Endpoints.ateduSSOJSONFile);

ateduSSO
  .init({
    onLoad: 'check-sso',
    checkLoginIframe: true,
    silentCheckSsoRedirectUri: window.location.origin + '/_check-sso.html',
    pkceMethod: 'S256',
    redirectUri: window.location.origin + '/' + window.location.pathname,
  })
  .then(authenticated => {
    if (authenticated) {
      logger.info('AteduSSO (init) done!');
    } else {
      logger.warn('Could NOT autheticate.');
    }
  })
  .catch(ex => {
    logger.error('Failed to INIT AteduSSO!');
  });

export default ateduSSO;
