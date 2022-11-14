import { cookies } from "../utils/cookies";
import axios from "axios";

const clientApi = axios.create();
clientApi.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
clientApi.defaults.headers.common["Authorization"] = `Bearer ${cookies.getAuthCookies().token}`;

const serverApi = (context: any) => axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Authorization": `Bearer ${cookies.getAuthCookies(context).token}`
  }
});

const addTokenInAuthorizationHeader = (token: string) => clientApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const cleanAuthorizationHeader = () => clientApi.defaults.headers.common["Authorization"] = null;

export const api = {
  client: clientApi,
  server: serverApi,
  addTokenInAuthorizationHeader,
  cleanAuthorizationHeader
}