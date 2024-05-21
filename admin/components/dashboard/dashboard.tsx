import * as React from "react";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { dataDash } from "./DataDashboard";
import { useToken } from "@/contextProvider/tokenProvider";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import { usePathname } from "next/navigation";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/navigation";


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function Dashboard({ children }: any) {
    const { token } = useToken();
    console.log("token dashboard", token);
    const pathname = usePathname();
    const [activePath, setActivePath] = useState(pathname);
    const router = useRouter();
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    useEffect(() => {
        // console.log("pathname", pathname.split("/")[1]);
        
        setActivePath(pathname);
    }, [pathname]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const renderAciveLink = (link: string) => {
        const formatedActivePath = activePath.substring(1, activePath.length);
        const formatedLink = link.substring(1, link.length);
        if (formatedActivePath.startsWith(formatedLink) && formatedLink !== "" && formatedActivePath !== "" || formatedActivePath === formatedLink) {
            return (
                <div className="bg-blue-300 rounded-full w-5 h-5">
                </div>
            )
        }
        return;
    };

    if (token === null || token === undefined) {
        return <></>;
    }
    // console.log("token", token.token);
    if (token === false) {
        return <>{children}</>;
    }

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{justifyContent: "space-between !important"}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                       Dashboard
                    </Typography>
                        <Box sx={{  float:"right" }}>
                            <Tooltip title={"Profile"}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={() => {router.push("/profile")}}
                                    color="inherit"
                                >
                                    <AccountCircle sx={{ width: 35, height: 35, color: "white" }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {dataDash.map((item) => (
                        <Link href={item.link}  key={item.name}>
                            {/* <p>{item.link.substring(1,item.link.length)} : {activePath.substring(1, activePath.length)}</p> */}
                            
                            <Tooltip title={item.description} placement="right">
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.name} />
                                        {renderAciveLink(item.link)}
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                        </Link>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}
