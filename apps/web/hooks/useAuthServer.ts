import { cookies } from "next/headers";

export const useAuthServer = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const isloggedIn = token ? true : false;

  return {
    token,
    isloggedIn,
  };
};
