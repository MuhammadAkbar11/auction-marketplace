const TOKEN_KEY = "baebid_userInfo";

export const setLogin = data => {
  localStorage.setItem(TOKEN_KEY, data);
};

export const setLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  const userInfo = localStorage.getItem(TOKEN_KEY);

  if (userInfo && userInfo !== undefined) {
    return true;
  }

  return false;
};
