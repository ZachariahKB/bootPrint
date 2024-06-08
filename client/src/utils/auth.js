import decode from 'jwt-decode';

class AuthService {
  // Decode token and get user profile
  getProfile() {
    return decode(this.getToken());
  }

  // Check if user is logged in
  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  // Get token from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Login user by saving the token to local storage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/home');
  }

  // Logout user by removing the token from local storage and reloading the page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
