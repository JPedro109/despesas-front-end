import axios from "axios";
import nookies from "nookies";

export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Authorization": `Bearer ${nookies.get().tokenDespesas}`
  }
});

export const serverApi = (context: any) => axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Authorization": `Bearer ${nookies.get(context).tokenDespesas}`
  }
});