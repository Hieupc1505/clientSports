import Charts from "../components/Layout/components/Charts";
import Statistic from "../components/Layout/components/Statistic";
import Match from "../components/Layout/components/Match";
import Header from "../components/Layout/components/Header";
import Live from "../components/Layout/components/Live";
import HightLight from "../components/Layout/components/HightLight";

const publicRouters = [
    { path: "/match", component: Match },
    { path: "/charts", component: Charts },
    { path: "/statistic", component: Statistic },
    { path: "/lists", component: HightLight },
    { path: "/header", component: Header },
    { path: "/live", component: Live, layout: null },
    { path: "*", component: Match },
];

const privateRotuers = [];

export { publicRouters, privateRotuers };
