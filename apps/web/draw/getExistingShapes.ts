import { httpUrl } from "@/lib/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${httpUrl}/chats/${roomId}`,{
        withCredentials:true
    });
    const messages = res.data.chats;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape
    })

    return shapes;
}