//Layouts
// import { HeaderOnly } from "~/components/Layout";

// import Following from "~/Pages/Football";
// import Profile from "~/Pages/Profile";
// import Upload from "~/Pages/Upload";
//public routes
// import Football from "~/Pages/Football";
import Charts from "../components/Layout/components/Charts";
import Statistic from "../components/Layout/components/Statistic";
import Match from "../components/Layout/components/Match";
import Header from "../components/Layout/components/Header";
import Live from "../components/Layout/components/Live";
import News from "../components/Layout/components/News";

const publicRouters = [
    { path: "/match", component: Match },
    { path: "/", component: Match },
    // { path: "match", component: Football },
    { path: "/charts", component: Charts },
    { path: "/statistic", component: Statistic },
    { path: "/news", component: News },
    { path: "/header", component: Header },
    { path: "/live", component: Live, layout: null },

    // { path: "/following", component: Following },
    // { path: "/profile", component: Profile, layout: null },
    // { path: "/upload", component: Upload, layout: HeaderOnly },
];

const privateRotuers = [];

export { publicRouters, privateRotuers };
