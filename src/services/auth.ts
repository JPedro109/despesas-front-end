import nookies from "nookies";

export const auth = (context: any): any => {
    const token = nookies.get(context).tokenDespesas;
    const tokenExpiryTime = nookies.get(context).tokenExpiryTimeDespesas;
    const redirect = {
        redirect: {
            destination: '/',
            permanent: false,
        }
    }
    const authentification = () => {
        nookies.destroy(context,"tokenDespesas");
        nookies.destroy(context, "tokenExpiryTimeDespesas");
        return redirect;
    }

    if(!token || Date.now() > parseInt(tokenExpiryTime))
        return authentification();
}