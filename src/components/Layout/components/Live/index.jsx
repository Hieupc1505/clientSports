import React from "react";
import classNames from "classnames/bind";
import styles from "./Live.module.scss";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStateCustom } from "../../../Hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faArrowLeft,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

const Live = () => {
    const location = useLocation();
    const [links, { onChangeValue }] = useStateCustom(null);
    const [arrLink, { onChangeValue: setArrLink }] = useStateCustom([]);
    const [flag, { onChangeValue: setFlag }] = useStateCustom(false);
    const { state } = location;
    useEffect(() => {
        onChangeValue(location.state.target);
    }, [location]);
    // console.log(location);

    const addView = () => {
        setFlag(!flag);
    };
    const addLink = (link) => {
        setArrLink([...arrLink, link]);
        addView();
    };
    return (
        <>
            <div className={cx("navi")}>
                <Link to="/lists" className={cx("back")}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Trở lại
                </Link>
            </div>
            <div className={cx("wrapper")}>
                {flag && (
                    <div className={cx("overlay")}>
                        <div className={cx("cancel")} onClick={addView}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        <ul className={cx("list-tv")}>
                            {state.vebo &&
                                state.vebo.map((item) => {
                                    if (state.target !== item.link)
                                        return (
                                            <li
                                                className={cx("list-item")}
                                                onClick={() =>
                                                    addLink(item.link)
                                                }
                                            >
                                                <div
                                                    className={cx(
                                                        "item-text",
                                                        "item-home"
                                                    )}
                                                >
                                                    <img
                                                        src={item.home.logo}
                                                        title="home"
                                                    />{" "}
                                                    {item.home.name}
                                                </div>
                                                <span
                                                    className={cx(
                                                        "item-saperate"
                                                    )}
                                                >
                                                    VS
                                                </span>
                                                <div
                                                    className={cx(
                                                        "item-text",
                                                        "item-away"
                                                    )}
                                                >
                                                    {item.away.name}{" "}
                                                    <img
                                                        src={item.away.logo}
                                                        title="away"
                                                    />
                                                </div>
                                            </li>
                                        );
                                })}
                        </ul>
                    </div>
                )}
                <div className={cx("view-content")}>
                    <div className={cx("main-view")}>
                        <div className={cx("main-bridge")}>
                            {links && (
                                <div className={cx("main-view-video")}>
                                    <iframe
                                        className={cx("main-frame")}
                                        src={links}
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx("box-option")}>
                        <div className={cx("view-side-bar")} onClick={addView}>
                            {!arrLink[0] ? (
                                <>
                                    <div className={cx("view-icon")}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                    <div
                                        className={cx("view-side-bar-video")}
                                    ></div>
                                </>
                            ) : (
                                <div className={cx("view-side-bar-video")}>
                                    <iframe src={arrLink[0]} />
                                </div>
                            )}
                        </div>
                        <div className={cx("view-side-bar")} onClick={addView}>
                            {!arrLink[1] ? (
                                <>
                                    <div className={cx("view-icon")}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                    <div
                                        className={cx("view-side-bar-video")}
                                    ></div>
                                </>
                            ) : (
                                <div className={cx("view-side-bar-video")}>
                                    <iframe src={arrLink[0]} />
                                </div>
                            )}
                        </div>
                        <div className={cx("view-side-bar")} onClick={addView}>
                            {!arrLink[2] ? (
                                <>
                                    <div className={cx("view-icon")}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                    <div
                                        className={cx("view-side-bar-video")}
                                    ></div>
                                </>
                            ) : (
                                <div className={cx("view-side-bar-video")}>
                                    <iframe src={arrLink[0]} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Live;
