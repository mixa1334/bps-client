export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return {
      "Content-Type": "application/json", 
      "Authorization": user.token };
  } else {
    return {};
  }
}
