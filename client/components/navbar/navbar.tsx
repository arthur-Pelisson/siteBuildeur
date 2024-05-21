"use client";
import Link from "next/link";
import { useLanguage } from "@/contextProvider/languageProvider";
import { useEffect, useState, useRef } from "react";
import { useToken } from "@/contextProvider/tokenProvider";
import LanguageNavbar from "../languageComp/language";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getLogo } from "@/components/logos";
import { nav, profileBar, authNav } from "@/components/navbar/dataNavbar";
import { usePathname } from "next/navigation";
import useCookie from "@/hooks/cookie/cookie";
import useDebounce from "../debounceTime";

type navPosition = "static" | "fixed" | "absolute" | "relative" | "sticky" | undefined;

const navBar = () => {
    const refsNavbar = useRef<(HTMLElement | null)[]>([]);
    const { language } = useLanguage();
    const { token } = useToken();
    const [connect, setConnect] = useState<boolean>(token);
    const [navPosition, setNavPosition] = useState<navPosition>("fixed"); 
    const { getCookie } = useCookie();
    const tokenAdmin = getCookie("token_admin");

    const tooltip = {
        fr: "Ouvrir le menu du profile",
        en: "Open the profile menu",
    };

    const pathName = usePathname();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [scrollPosition, setScrollPosition] = useState(pathName === "/" ? 0 : 1);

    useEffect(() => {
        console.log("token navabr : ", token);
        setConnect(token);
    }, [token]);

    useEffect(() => {
        console.log("pathName : ", pathName);
        // setPositionFromPathName();
        setScrollPosition(pathName === "/" ? 0 : 1);
        removeActiveClass();
        // if (pathName === "/") {
            // window.addEventListener("scroll", handleScroll);
        // }
        // return () => {
        //     window.removeEventListener("scroll", handleScroll);
        // };
    }, [pathName, language, refsNavbar.current]);

    // const setPositionFromPathName = () => {
    //     switch (pathName) {
    //         case "/":
    //             setNavPosition("fixed");
    //             break;
    //         default:
    //             setNavPosition("static");
    //             break;
    //     }
    // };

    

    useEffect(() => {
        window.addEventListener('resize', removeActiveClass);
        return () => {
            window.removeEventListener('resize', removeActiveClass);
        }
    }, []);

    useEffect(() => {
        callRemoveActiveClass();
    }, [refsNavbar.current]);

    const addRef = (element) => {
        refsNavbar.current.push(element);
    };

    const removeActiveClass = () => {
        refsNavbar.current.forEach((element) => {
            if (element !== null) {
                const btn = element.childNodes[0] as HTMLElement;
                if (btn !== null) {
                    btn.classList.remove("navbar-active");
                }
            }


        });
        addActiveClass();
    };
    const callRemoveActiveClass = useDebounce(removeActiveClass, 400);

    const addActiveClass = () => {
        refsNavbar.current.forEach((element) => {
            if (element !== null) {
                let pathname = pathName.split("/")[1];
                if (pathname === "") { pathname = "/"}
                const href = element.getAttribute("href")?.substring(1, (element as any)?.getAttribute("href")?.length - 1);
                if (href === pathname) {
                    const btn = element.childNodes[0] as HTMLElement;
                    if (btn !== null) {
                        btn.classList.add("navbar-active");
                    }
                }
            }
        });
    };

    const handleScroll = () => {
        // setScrollPosition(window.scrollY);
        // if (window.scrollY > 0) {
            // setNavPosition("sticky");
        // } else {
            // setNavPosition("static");
        // }
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (page) => {
        setAnchorElUser(null);
    };

    const createMenuItem = (page) => {
        return (
            <MenuItem key={page.name[language]} className="w-[100%] toto" onClick={handleCloseNavMenu}>
                <Typography className="burgerMenu w-[100%]" textAlign="center">
                    <Link href={page.path} scroll={false} ref={(element) => addRef(element)} passHref>
                        <Button className="w-[100%]" onClick={handleCloseNavMenu}>
                            {page.name[language]}
                        </Button>
                    </Link>
                </Typography>
            </MenuItem>
        );
    };

    const displayPage = (page) => {
        if (page.navbarHide === true) return null;
        console.log("nav connect : ", connect)
        if (connect) {
            if (page.navBarConnected || page.navBarConnected === undefined) {
                return createMenuItem(page);
            }
        } else {
            if (!page.navBarConnected || page.navBarConnected === undefined) {
                return createMenuItem(page);
            }
        }
    };

    const createButton = (page) => {
        return (
            <Link key={page.name[language]}  href={page.path} ref={(element) => addRef(element)} passHref>
                <Button onClick={handleCloseNavMenu} className="!text-xs lg:!text-sm" sx={{ my: 2, color: "white", display: "block"}}>
                    {page.name[language]}
                </Button>
            </Link>
        );
    };

    const displayButton = (page) => {
        if (page.navbarHide === true) return null;

        if (connect) {
            if (page.navBarConnected || page.navBarConnected === undefined) {
                return createButton(page);
            }
        } else {
            if (!page.navBarConnected || page.navBarConnected === undefined) {
                return createButton(page);
            }
        }
    };

    const displayLogo = () => {
        return (
            <Link href="/" passHref>
                {/* <Avatar variant="square" alt="logo" src="" sx={{ width: 80, height: 80, margin: "5px" }} /> */}
                <h3 className="text-center mr-5" >Margaux<br/>PELISSON</h3>
            </Link>
        );
    };

    return (
        <>
        <AppBar
            position={navPosition}
            id="navBar"
            sx={{
                // background: scrollPosition === 0 ? "transparent" : "#1976d2",
                transition: "background 0.3s",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>{displayLogo()}</Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            // sx={{
                            //     display: { xs: "block", md: "none" },
                            // }}
                        >
                            {nav.map((page) => displayPage(page))}
                            {authNav.map((page) => displayPage(page))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 0, marginRight: "25%", display: { sm: "none" } }}>{displayLogo()}</Box>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>{nav.map((page) => displayButton(page))}</Box>
                    <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>{authNav.map((page) => displayButton(page))}</Box>
                    {connect && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title={tooltip[language]}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenUserMenu}
                                    color="inherit"
                                >
                                    <AccountCircle sx={{ width: 35, height: 35, color: "white" }} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {profileBar.map((profile) => (
                                    <Link key={profile.name[language]} href={profile.path} ref={(element) => addRef(element)} passHref>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{profile.name[language]}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                    )}
                    <Box sx={{ flexGrow: 0, marginRight: "10px" }}>
                        <div className="w-10 ml-1 lg:ml-6">
                            <LanguageNavbar leftPixel={10} />
                        </div>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </>
    );
};

export default navBar;
