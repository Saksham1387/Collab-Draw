"use client";

import { wsUrl } from "@/lib/config";
import { useEffect, useState } from "react";

export const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [ws, SetWs] = useState<WebSocket>();

  useEffect(() => { 
    const ws = new WebSocket(`${wsUrl}?token=${localStorage.getItem("token")}`);

    ws.onopen = () => {
      SetWs(ws);
      setLoading(false);
    };
    setLoading(false);
  }, []);

  return {
    loading,
    ws,
  };
};
