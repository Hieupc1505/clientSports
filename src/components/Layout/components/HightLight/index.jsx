import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./News.module.scss";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const HightLight = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [vebo, setVebo] = useState([]);
    useEffect(
        () => async () => {
            const { data } = await axios.get(
                "https://serversport98.herokuapp.com/api/live-match"
            );
            setData(() => data.live);
        },
        []
    );
    useEffect(
        () => async () => {
            const { data } = await axios.get(
                "https://serversport98.herokuapp.com/api/vebo"
            );
            setVebo(() => data.live);
        },
        []
    );
    useEffect(() => {
        let timeout = setTimeout(async () => {
            const { data } = await axios.get(
                "https://serversport98.herokuapp.com/api/live-match"
            );
            setData(() => data.live);
        }, 3 * 60 * 1000);
        return () => clearTimeout(timeout);
    }, []);
    const handleClickLink = (link, e) => {
        e.preventDefault();

        navigate("/live", { state: { target: link, vebo } });
    };
    const handleTimeLoaded = ({ start }, { code, type, description = des }) => {
        if (code === 6) {
            return (
                Number.parseInt((new Date().getTime() / 1000 - start) / 60) +
                "'"
            );
        } else if (code === 7)
            return (
                Number.parseInt(
                    (new Date().getTime() / 1000 - start) / 60 - 15
                ) + "'"
            );
        else if (code == 31 || new RegExp("Halftime", "gi").test(des))
            return "HT";
    };
    const handleTimeLoadedVebo = ({ timeLoaded, day }) => {
        // let time = day.replace(/(\d+[/])(\d+[/])/, "$2$1") + " " + timeLoaded;
        // let tar = new Date().getTime() - new Date(time).getTime();
        // return tar > 0 ? tar / 60000 + "'" : timeLoaded + "\n" + day;
    };
    return (
        <div className={cx("wrapper", "content-main")}>
            <div className={cx("hight-light")}>
                <div className={cx("hight-light-row", "row")}>
                    {!!vebo.length &&
                        vebo.map((item) => (
                            <div
                                key={uuidv4()}
                                className={cx("hight-light-box", "col", "l-6")}
                            >
                                <div
                                    className={cx("box-wrap-link")}
                                    onClick={(e) =>
                                        handleClickLink(item.link, e)
                                    }
                                >
                                    <div className={cx("league")}>
                                        <i className={cx("league-icon")}>
                                            <img
                                                loading="lazy"
                                                alt={item.league.name}
                                                title={item.league.name}
                                                src={item.league.img}
                                            />
                                        </i>
                                        {item.league.name}
                                    </div>

                                    <div className={cx("col-item", "live")}>
                                        <div className={cx("hight-light-team")}>
                                            <div
                                                className={cx(
                                                    "hight-light-img"
                                                )}
                                            >
                                                <img
                                                    src={item.home.logo}
                                                    alt="homeTeam"
                                                />
                                            </div>
                                            <span
                                                className={cx("home-team-name")}
                                            >
                                                {item.home.name}
                                            </span>
                                        </div>
                                        <div className={cx("hight-light-info")}>
                                            {!item.status.live && (
                                                <>
                                                    <div
                                                        className={cx(
                                                            "hight-light-time-on"
                                                        )}
                                                    >
                                                        <span>
                                                            {
                                                                item.status
                                                                    .timeLoaded
                                                            }
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            "hight-light-time-on"
                                                        )}
                                                    >
                                                        <span>
                                                            {item.status.day}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                            {item.status.live && (
                                                <div
                                                    className={cx("match-live")}
                                                >
                                                    <div
                                                        className={cx(
                                                            "match-live-flash"
                                                        )}
                                                    >
                                                        <span
                                                            className={cx(
                                                                "flash-item"
                                                            )}
                                                        ></span>{" "}
                                                        Live
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            "match-result"
                                                        )}
                                                    >
                                                        <div
                                                            className={cx(
                                                                "match-time-loaded"
                                                            )}
                                                        >
                                                            {handleTimeLoadedVebo(
                                                                item.status
                                                            )}
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                "match-score"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "home-score"
                                                                )}
                                                            >
                                                                {
                                                                    item.status
                                                                        .homeScore
                                                                }
                                                            </span>
                                                            {"-"}
                                                            <span
                                                                className={cx(
                                                                    "away-score"
                                                                )}
                                                            >
                                                                {
                                                                    item.status
                                                                        .awayScore
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className={cx("hight-light-team")}>
                                            <div
                                                className={cx(
                                                    "hight-light-img"
                                                )}
                                            >
                                                <img
                                                    src={item.away.logo}
                                                    alt="awayTeam"
                                                />
                                            </div>
                                            <span
                                                className={cx("home-team-name")}
                                            >
                                                {item.away.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {/* <div className={cx("other-match")}>Các giải khác</div> */}
                <div className={cx("hight-light-row", "row")}>
                    {!!data.length &&
                        data.map((item) => (
                            <div
                                key={uuidv4()}
                                className={cx("hight-light-box", "col", "l-6")}
                            >
                                <div
                                    className={cx("box-wrap-link")}
                                    // onClick={(e) =>
                                    //     handleClickLink(item.link, e)
                                    // }
                                >
                                    {/* <div className={cx("league")}>
                                        <img
                                            src={item.league.img}
                                            title="logo"
                                        />
                                        {item.league.name}
                                    </div> */}

                                    <div className={cx("league")}>
                                        <i className={cx("league-icon")}>
                                            <img
                                                loading="lazy"
                                                alt={item.tournament.name}
                                                title={item.tournament.name}
                                                src={`https://api.sofascore.app/api/v1/unique-tournament/${item.tournament.id}/image`}
                                            />
                                        </i>
                                        {item.tournament.name.split(",")[0]}
                                    </div>

                                    <div className={cx("col-item")}>
                                        <div className={cx("hight-light-team")}>
                                            <div
                                                className={cx(
                                                    "hight-light-img"
                                                )}
                                            >
                                                <img
                                                    src={`https://api.sofascore.app/api/v1/team/${item.homeTeam.id}/image`}
                                                    alt="homeTeam"
                                                />
                                            </div>
                                            <span
                                                className={cx("home-team-name")}
                                            >
                                                {item.homeTeam.name}
                                            </span>
                                        </div>
                                        <div className={cx("hight-light-info")}>
                                            {/* {!item.status.live && (
                                                <>
                                                    <div
                                                        className={cx(
                                                            "hight-light-time-on"
                                                        )}
                                                    >
                                                        <span>
                                                            {item.status.time}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            "hight-light-time-on"
                                                        )}
                                                    >
                                                        <span>
                                                            {item.status.day}
                                                        </span>
                                                    </div>
                                                </>
                                            )} */}
                                            {item.status.type ===
                                                "inprogress" && (
                                                <div
                                                    className={cx("match-live")}
                                                >
                                                    <div
                                                        className={cx(
                                                            "match-live-flash"
                                                        )}
                                                    >
                                                        <span
                                                            className={cx(
                                                                "flash-item"
                                                            )}
                                                        ></span>{" "}
                                                        Live
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            "match-result"
                                                        )}
                                                    >
                                                        <div
                                                            className={cx(
                                                                "match-time-loaded"
                                                            )}
                                                        >
                                                            {handleTimeLoaded(
                                                                item.timeStatus,
                                                                item.status
                                                            )}
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                "match-score"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "home-score"
                                                                )}
                                                            >
                                                                {
                                                                    item
                                                                        .homeTeam
                                                                        .score
                                                                }
                                                            </span>
                                                            {"-"}
                                                            <span
                                                                className={cx(
                                                                    "away-score"
                                                                )}
                                                            >
                                                                {
                                                                    item
                                                                        .awayTeam
                                                                        .score
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className={cx("hight-light-team")}>
                                            <div
                                                className={cx(
                                                    "hight-light-img"
                                                )}
                                            >
                                                <img
                                                    src={`https://api.sofascore.app/api/v1/team/${item.awayTeam.id}/image`}
                                                    alt="awayTeam"
                                                />
                                            </div>
                                            <span
                                                className={cx("home-team-name")}
                                            >
                                                {item.awayTeam.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default HightLight;
