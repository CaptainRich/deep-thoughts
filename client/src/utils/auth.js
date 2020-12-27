
// Function to decode the token

import decode from 'jwt-decode';

class AuthService {

    // Retrieve the data saved in token
    getProfile() {
      return decode(this.getToken());
    }
  
    // Check if the user is still logged in
    loggedIn() {
      // Check if there is a saved token and it's still valid
      const token = this.getToken();
      // Use type coersion to check if token is NOT undefined and the token is NOT expired
      return !!token && !this.isTokenExpired(token);
    }
  
    // Check if the token has expired
    isTokenExpired(token) {
      try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    }
  
    // Retrieve token from localStorage
    getToken() {
      // Retrieve the user token from localStorage
      return localStorage.getItem('id_token');
    }
  
    // Set the token to localStorage and reload page to homepage
    login(idToken) {
      // Save the  user token to localStorage
      localStorage.setItem('id_token', idToken);
  
      window.location.assign('/');
    }
  
    // Clear the token from localStorage and force a logout with reload
    logout() {
      // Clear user token and profile data from localStorage
      localStorage.removeItem('id_token');
      
      // This will reload the page and reset the state of the application
      window.location.assign('/');
    }
  }

export default new AuthService();