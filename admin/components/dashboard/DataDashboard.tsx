
import PersonIcon from "@mui/icons-material/Person";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TheatersIcon from "@mui/icons-material/Theaters";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LogoutIcon from "@mui/icons-material/Logout";
import EventIcon from '@mui/icons-material/Event';
import StyleIcon from '@mui/icons-material/Style';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import NewspaperIcon from '@mui/icons-material/Newspaper';
export const dataDash = [
    {
        name: "Accueil",
        icon: <HomeIcon />,
        link: "/",
        description: "Page d'accueil"
    },
    {
        name: "Maintenance",
        icon: <EngineeringIcon />,
        link: "/maintenance",
        description: "Gestion de la page de maintenance"
    },
    {
        name: "Photographies",
        icon: <TheatersIcon />,
        link: "/photography",
        description: "Gestion des photographies"
    },
    {
        name: "Realisations",
        icon: <TheaterComedyIcon />,
        link: "/realizations",
        description: "Gestion des réalisations"
    },
    {
        name: "Blog",
        icon: <NewspaperIcon/>,
        link: "/blog",
        description: "Gestion des articles de blog"
    },
    {
        name: "Paragraphe",
        icon: <TextSnippetIcon />,
        link: "/paragraph",
        description: "Gestion des textes du site"
    },
    {
        name: "Tags",
        icon: <StyleIcon />,
        link: "/tags",
        description: "Gestion des tags"
    },
    {
        name: "Medias",
        icon: <PermMediaIcon />,
        link: "/medias",
        description: "Gestion des médias"
    },
    {
        name: "Paramètres",
        icon: <SettingsIcon />,
        link: "/settings",
        description: "Paramètres"
    },
    {
        name: "Déconnexion",
        icon: <LogoutIcon />,
        link: "/auth/disconnection",
        description: "Déconnexion"
    },
]