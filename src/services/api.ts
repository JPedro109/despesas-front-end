import axios from "axios";
import nookies from "nookies";

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Authorization": `Bearer ${nookies.get().tokenDespesas}`
  }
});

const serverApi = (context: any) => axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Authorization": `Bearer ${nookies.get(context).tokenDespesas}`
  }
});

const addTokenInAuthorizationHeader = (token: string) => clientApi.defaults.headers.common["Authorization"] = token;

const cleanAuthorizationHeader = () => clientApi.defaults.headers.common["Authorization"] = undefined;

export const api = {
  client: clientApi,
  server: serverApi,
  addTokenInAuthorizationHeader,
  cleanAuthorizationHeader
}