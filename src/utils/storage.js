const TOKEN_KEY = 'eduexamsys_token';
const USER_KEY = 'eduexamsys_user';

export const storage = {
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser() {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  clear() {
    localStorage.clear();
  }
};

export default storage;
