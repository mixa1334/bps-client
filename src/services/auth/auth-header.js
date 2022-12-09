import authService from "./auth.service";

export default function authHeader() {
  const user = authService.getCurrentUser();

  if (user && user.token) {
    return {
      "Content-Type": "application/json", 
      "Authorization": user.token };
  } else {
    return {};
  }
}
