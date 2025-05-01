import { httpUrl } from "@/lib/config";
import axios from "axios";

export const createRoom = async (newRoomName: string) => {
  try {
    const res = await axios.post(
      `${httpUrl}/room`,
      {
        name: newRoomName,
      },
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          `Request failed with status: ${error.response?.status}` ||
          "Failed to create room"
      );
    }

    throw error;
  }
};
