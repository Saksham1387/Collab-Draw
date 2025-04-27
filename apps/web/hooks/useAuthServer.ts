import { getCookie } from "cookies-next/client";

export const useAuthServer = () => {
  const token = getCookie("token");
  const isloggedIn = token ? true : false;

  return {
    token,
    isloggedIn,
  };
};
