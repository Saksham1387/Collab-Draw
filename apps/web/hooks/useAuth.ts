"use client";
import { httpUrl } from "@/lib/config";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  photo: string;
};
export const useAuth = () => {
  const token = getCookie("token");
  const [user, SetUser] = useState<User>();
  const isloggedIn = token ? true : false;

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${httpUrl}/user`, {
        withCredentials: true,
      });
      console.log(res.data);
      SetUser(res.data);
    };
    getUser();
  }, []);

  return {
    token,
    user,
    isloggedIn,
  };
};
