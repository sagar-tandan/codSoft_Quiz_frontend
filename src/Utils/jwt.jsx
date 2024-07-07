import { jwtDecode } from "jwt-decode";

export const isTokenExp = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Math.floor(Date.now() / 1000) > exp;
  } catch (error) {
    console.error("Invalid Token", error);
    return true;
  }
};
