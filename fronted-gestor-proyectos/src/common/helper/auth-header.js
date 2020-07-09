export function authHeader() {
    // return authorization header with jwt token
    const user = JSON.parse(localStorage.getItem("userData"));
  
    if (user && user.jwt) {
      return { Authorization: `Bearer ${user.jwt}` };
    }
    return {};
}