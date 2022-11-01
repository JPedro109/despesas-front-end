import { cookies } from "../utils/cookies";

export const auth = (context: any): any => {
    const { token, tokenExpiryTime } = cookies.getAuthCookies(context);
    const redirect = {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
    const authentification = () => {
        cookies.removeAuthCookies(context);
        return redirect;
    }

    if(!token || Date.now() > parseInt(tokenExpiryTime)) return authentification();
}