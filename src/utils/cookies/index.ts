import nookies from "nookies";

const addAuthCookies = (token: string, context?: any): void => {
    const tokenExpiryTime = new Date().setHours(new Date().getHours() + 2).toString();
    nookies.set(context, "tokenDespesas", token, { maxAge: 60 * 60 * 2 });
    nookies.set(context ,"tokenExpiryTimeDespesas", tokenExpiryTime, { maxAge: 60 * 60 * 2 });
}

const removeAuthCookies = (context?: any): void => {
    nookies.destroy(context, "tokenDespesas");
    nookies.destroy(context, "tokenExpiryTimeDespesas");
}

const getAuthCookies = (context?: any): { token: string, tokenExpiryTime: string } => {
    const token = nookies.get(context).tokenDespesas;
    const tokenExpiryTime = nookies.get(context).tokenExpiryTimeDespesas;

    return {
        token,
        tokenExpiryTime
    }
} 

export const cookies = {
    addAuthCookies,
    removeAuthCookies,
    getAuthCookies
}