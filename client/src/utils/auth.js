const TOKEN_KEY = "baebid_userInfo";
const ADMIN_TOKEN_KEY = "baebid_adminInfo";
export const setLogin = data => {
  localStorage.setItem(TOKEN_KEY, data);
};

export const setLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setAdminLogin = data => {
  localStorage.setItem(ADMIN_TOKEN_KEY, data);
};

export const setAdminLogout = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const isLogin = () => {
  const userInfo = localStorage.getItem(TOKEN_KEY);

  if (userInfo && userInfo !== undefined) {
    return true;
  }

  return false;
};

export const isAdminLogin = () => {
  const adminInfo = localStorage.getItem(ADMIN_TOKEN_KEY);

  if (adminInfo && adminInfo !== undefined) {
    return true;
  }

  return false;
};

export const adminInfoFromStorage = localStorage.getItem(ADMIN_TOKEN_KEY)
  ? JSON.parse(localStorage.getItem(ADMIN_TOKEN_KEY))
  : null;

export const userInfoFromStorage = localStorage.getItem("baebid_userInfo")
  ? JSON.parse(localStorage.getItem("baebid_userInfo"))
  : null;
