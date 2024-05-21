"use client";

const useCookie = () => {
    const setCookie = (name: string, value: any, days: number) => {
        if (typeof document === "undefined") {
            // Handle non-browser environment (e.g., server-side rendering)
            return "";
        }
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        if (window.location.hostname === "localhost") {
            console.log("localhost: " , name + "=" + value + ";" + expires + ";path=/;domain=localhost");
            document.cookie = name + "=" + value + ";" + expires + ";path=/;domain=localhost";
        } else {
            console.log("onlyne: ", name + "=" + value + ";" + expires + ";path=/;domain=.etoileroyale.fr;Secure");
            document.cookie = name + "=" + value + ";" + expires + ";path=/;domain=.etoileroyale.fr;Secure";
        }
    };

    const getCookie = (CookieName: string): string => {
        if (typeof document === "undefined") {
            // Handle non-browser environment (e.g., server-side rendering)
            return "";
        }
        const name = CookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    const deleteCookie = (name: string) => {
        if (typeof document === "undefined") {
            // Handle non-browser environment (e.g., server-side rendering)
            return "";
        }
        if (window.location.hostname === "localhost") {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";

        } else {
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=.etoileroyale.fr;Secure";
        }
    };

    return {
        setCookie,
        getCookie,
        deleteCookie,
    };
};

export default useCookie;
