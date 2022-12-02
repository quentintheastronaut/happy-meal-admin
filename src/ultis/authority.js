// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

// TODO: Handle OGeek token here
export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  return localStorage.setItem('token', token);
}

/**
 * Get data of defined path
 *
 * @param {string} pathDefined
 * @return {object} {resource, action}
 */
function getAuthorityData(pathDefined) {
  const [resource, action] = pathDefined.split(':');

  return {
    resource,
    action,
  };
}

/**
 * @param {string} resource Resource we want to check if it authority
 * @param {string} role current user role
 * @return {boolean}
 */
export function checkAuthority(neededResource, role) {
  const listPath = authorityResources[role];
  if (!listPath) {
    return false;
  }

  const { resource, action } = getAuthorityData(neededResource);
  for (let i = 0; i < listPath.length; i += 1) {
    const path = listPath[i];
    const currentPathData = getAuthorityData(path);
    if (
      currentPathData.resource === resource &&
      (currentPathData.action === '*' || currentPathData.action === action)
    ) {
      return true;
    }
  }

  return false;
}
