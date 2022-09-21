import React, { useEffect, useRef, useLayoutEffect } from "react";
import className from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BorderLoader } from "../Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { faMagnifyingGlass } from "@fortawesome/free-regular-svg-icons";
import { list } from "../../../GlobelStyles/type";
// faMagnifyingGlass
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { changeNation, getListVideo } from "../../../../redux/actions";
import { useStateCustom } from "../../../Hooks";

// "@fortawesome/fontawesome-svg-core":
// "@fortawesome/free-regular-svg-icons"
// "@fortawesome/free-solid-svg-icons"
// "@fortawesome/free-brands-svg-icons"
// "@fortawesome/react-fontawesome"

const cx = className.bind(styles);
const Header = () => {
    const { loading, nation, lists } = useSelector((state) => state.sport);
    const location = useLocation();
    const ele = useRef();
    const dispatch = useDispatch();
    const [flag, bind] = useStateCustom(false);
    const [listTag, { onChangeValue }] = useStateCustom([
        false,
        false,
        false,
        false,
    ]);
    const path = location.pathname.match(/\w+/);
    useEffect(() => {
        const list = document.querySelectorAll("[route]");
        const index = path
            ? Array.from(list)
                  .map((item) => item.getAttribute("route"))
                  .indexOf(path[0])
            : 0;
        const newTag = [...listTag].map((it, id) => {
            if (id === index) {
                return true;
            }
            return false;
        });
        onChangeValue(newTag);
    }, [location.pathname]);

    useEffect(() => {
        if (!lists[nation]) dispatch(getListVideo(nation));
    }, [nation]);

    const handleClickBars = () => {
        bind.onToggle();
    };
    const handleClickLeagueItem = async (index) => {
        bind.onToggle();
        await dispatch(changeNation(index));

        // console.log(location.pathname);
        // navigate(0);
    };
    useLayoutEffect(() => {
        document.title = list[nation].params.fullName;
        document.head.querySelector(
            "link"
        ).href = `https://api.sofascore.app/api/v1/unique-tournament/${list[nation].params.id}/image`;
    }, [nation]);

    const handleClickDoc = (e) => {
        // console.log(ele.current.contains(e.target));
        if (flag) {
            !ele.current.contains(e.target) && bind.onToggle();
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickDoc);
        return () => document.removeEventListener("click", handleClickDoc);
    }, [flag]);
    return (
        <header className={cx("wrapper", `${nation}`, "wide")}>
            <div className={cx("header-logo")}>
                <div className={cx("header-text-wrap")}>
                    <img
                        src={`https://api.sofascore.app/api/v1/unique-tournament/${list[nation].params.id}/image`}
                        alt="Premier League"
                        className={cx("header-logo-img")}
                    />
                    <span className={cx("header-logo-text")}>
                        {list[nation].params.fullName}
                    </span>
                </div>

                <div ref={ele} className={cx("header-bars")}>
                    <FontAwesomeIcon icon={faBars} onClick={handleClickBars} />
                    {flag && (
                        <ul className={cx("list-league")}>
                            {Object.keys(list).map((item, index) => {
                                if (item !== nation)
                                    return (
                                        <li
                                            onClick={() =>
                                                handleClickLeagueItem(item)
                                            }
                                            key={uuidv4()}
                                            className={cx("league-item")}
                                        >
                                            <img
                                                src={`https://api.sofascore.app/api/v1/unique-tournament/${list[item].params.id}/image`}
                                                alt="Premier League"
                                                className={cx(
                                                    "header-logo-img"
                                                )}
                                            />
                                            <span>
                                                {list[item].params.fullName}
                                            </span>
                                        </li>
                                    );
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <nav className={cx("header-lists")}>
                <ul
                    className={cx(
                        "header-lists-inner",
                        "content-main",
                        `${nation}`
                    )}
                >
                    <Link to="/">
                        <li
                            route="match"
                            className={cx("header-list-item", {
                                "header-list-item-active": listTag[0],
                            })}
                        >
                            TRẬN ĐẤU
                        </li>
                    </Link>
                    <Link to="/charts">
                        <li
                            route="charts"
                            className={cx("header-list-item", {
                                "header-list-item-active": listTag[1],
                            })}
                        >
                            BẢNG XẾP HẠNG
                        </li>
                    </Link>
                    <Link to={"/statistic"}>
                        <li
                            route="statistic"
                            className={cx("header-list-item", {
                                "header-list-item-active": listTag[2],
                            })}
                        >
                            THỐNG KÊ
                        </li>
                    </Link>
                    <Link to="/news">
                        <li
                            route="new"
                            className={cx("header-list-item", {
                                "header-list-item-active": listTag[3],
                            })}
                        >
                            TIN TỨC
                        </li>
                    </Link>
                </ul>
            </nav>
            {loading && <BorderLoader />}
        </header>
    );
};

export default Header;
