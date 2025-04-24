import { httpUrl } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react";

export const useRoom = (slug: string) => {
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState();

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {
    const res = await axios.get(`${httpUrl}/room/${slug}`);
    const room = res.data.room;
    setRoom(room);
    setLoading(false)
  };

  return {
    loading,
    room,
  };
};
