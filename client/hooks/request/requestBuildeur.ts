'use client'
import 'dotenv/config'
const requestBuildeur = async ({url, data, method} : any) => {
    const host = process.env.NEXT_PUBLIC_API_APIHOST;
    if (host === undefined) throw new Error("APIHOST is undefined");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    console.log(host + url, data, method);
    console.log(headers);
    const config = {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
        credentials: "include" as RequestCredentials
    };
    console.log(host + url, config);
    const request = new Request(host + url, config);
    try {
        const response = await fetch(request, {signal: new AbortController().signal});
        return response;
    } catch (error) {
       throw new Error("Error : " +  "Internal server error");
    }
}

export default requestBuildeur;