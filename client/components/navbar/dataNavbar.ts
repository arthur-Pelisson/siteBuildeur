"use client";
// TODO : navBarConnected and shouldBeco are maybe the same thing try to see if can remove one of them
const profileBar = [
    {
        name: {
            fr: "Profile",
            en: "Profile",
        },
        path: "/profile",
        navBarConnected: true,
        shouldBeco: true,
        navbarHide: false,
    },
    {
        name: {
            fr: "Se déconnecter",
            en: "Sign out",
        },
        path: "/auth/disconnection",
        navBarConnected: true,
        shouldBeco: true,
        navbarHide: false,
    },
    
];

const authNav = [
    {
        name: {
            fr: "S'inscrire",
            en: "Sign up",
        },
        path: "/auth/register",
        navBarConnected: false,
        shouldBeco: false,
        navbarHide: false,
    },
    {
        name: {
            fr: "Se connecter",
            en: "Sign in",
        },
        path: "/auth/connection",
        navBarConnected: false,
        shouldBeco: false,
        navbarHide: false,
    },
];

const nav = [
    {
        name: {
            fr: "Accueil",
            en: "Home",
        },
        path: "/",
        navbarHide: false,
    },
    {
        name: {
            fr: "Realisations",
            en: "Realizations",
        },
        path: "/realizations",
        navbarHide: false,
    },
    {
        name: {
            fr: "Photographies",
            en: "Photography",
        },
        path: "/photography",
        navbarHide: false,
    },
    {
        name: {
            fr: "Blog",
            en: "Blog",
        },
        path: "/blog",
        navbarHide: false,
    },
    {
        name: {
            fr: "A propos",
            en: "About",
        },
        path: "/about",
        navbarHide: false,
    },
    {
        name: {
            fr: "Contactez-nous",
            en: "Contact us",
        },
        path: "/contact",
        navbarHide: false,
    },

];

export  {nav, profileBar, authNav};
