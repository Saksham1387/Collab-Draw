"use client";

import { wsUrl } from "@/lib/config";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [ws, SetWs] = useState<WebSocket>();
  const { token } = useAuth();

  useEffect(() => {
    const ws = new WebSocket(`${wsUrl}?token=${token}`);

    ws.onopen = () => {
      SetWs(ws);
      console.log(ws)
      setLoading(false);
    };
    setLoading(false);
  }, []);

  return {
    loading,
    ws,
  };
};
