import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { useDispatch, useSelector } from "react-redux";
// import { getRound } from "~/redux/actions";
import styles from "../Match/Match.module.scss";
import classNames from "classnames/bind";
import YouTubeMatch from "../YouTubeMatch";
import VideoPlay from "../VideoPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { checkTimeMatch } from "../Utils";
import axios from "axios";
const cx = classNames.bind(styles);

const PreMatch = ({ data, round, lRound, color }) => {
    // console.log(color);
    const { checkTime, checkWeekDay } = checkTimeMatch();

    const [flag, setFlag] = useState(false);
    const [url, setUrl] = useState(null);
    const handleSetLink = (link) => {
        setUrl(link);
    };
    // const view = useRef();
    const handleClickVideo = useCallback(
        async (url, q, channelId, publishedAfter) => {
            document.querySelector("body").style.overflow = "hidden";
            console.log(url);

            let link = "";
            if (url) {
                link = url;
            } else {
                //channel id , querry
                let { data } = await axios({
                    method: "GET",
                    url: "https://www.googleapis.com/youtube/v3/search",
                    params: {
                        part: "snippet",
                        maxResults: "4",
                        key: "AIzaSyBle17ccjzisxuWTdnsX0sl0eLBWJMxFxI",
                        channelId,
                        q,
                        publishedAfter,
                        regionCode: "VN",
                    },
                });
                const result = data.items.filter(
                    (item) => item.snippet.channelId === channelId
                );
                // UCQsH5XtIc9hONE1BQjucM0g

                link = result[0].id.videoId;
            }

            setUrl(() => {
                return link;
            });
            setFlag((pre) => !pre);
        }
    );

    const exitVideo = () => {
        document.querySelector("body").style.overflow = "auto";
        setFlag(!flag);
    };
    return (
        <div className={cx("content-main")}>
            {color !== null && <div className={cx("view")}></div>}
            <div className={cx("table-text")}>
                Ngày thi đấu {round}/{lRound}
            </div>
            <table className={cx("table-wrap")}>
                <tbody className={cx("table-body")}>
                    {data &&
                        data.map((item, index) => {
                            return (
                                <tr key={uuidv4()} className={cx("table-row")}>
                                    <td
                                        status={
                                            item[0].status.code === 100
                                                ? "finished"
                                                : "notstarted"
                                        }
                                        className={cx(
                                            "table-row-match",
                                            "table-match-row_border"
                                        )}
                                    >
                                        <div
                                            className={cx(
                                                "table-row-match-wrap"
                                            )}
                                        >
                                            <table
                                                className={cx(
                                                    "table-row-match-wrap-inner"
                                                )}
                                            >
                                                <tbody
                                                    className={cx(
                                                        "table-match-body"
                                                    )}
                                                >
                                                    {/* contentOfMatch */}
                                                    <tr
                                                        className={cx(
                                                            "table-match-first-row"
                                                        )}
                                                    >
                                                        <td
                                                            className={cx(
                                                                "table-match-logo-format"
                                                            )}
                                                        ></td>
                                                        <td></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-score-format"
                                                            )}
                                                        ></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-sparate-format"
                                                            )}
                                                        ></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-time-format"
                                                            )}
                                                        ></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-no-width"
                                                            )}
                                                        ></td>
                                                    </tr>
                                                    <tr
                                                        className={cx(
                                                            "table-match-live-status"
                                                        )}
                                                        colSpan={6}
                                                    ></tr>
                                                    <tr
                                                        className={cx(
                                                            "table-match-row-time"
                                                        )}
                                                    >
                                                        <td colSpan={3}></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-row-sperate"
                                                            )}
                                                            rowSpan={5}
                                                        ></td>
                                                        <td
                                                            className={cx(
                                                                "table-match-time-detail"
                                                            )}
                                                            rowSpan={5}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "table-match-time-detail-text"
                                                                )}
                                                                style={{
                                                                    color: `${color}`,
                                                                }}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "table-match-time-status"
                                                                    )}
                                                                >
                                                                    {checkWeekDay(
                                                                        item[0]
                                                                            .startTimestamp *
                                                                            1000,
                                                                        item[0]
                                                                            .status
                                                                    )}
                                                                </div>
                                                                <div
                                                                    className={cx(
                                                                        "table-match-time-on"
                                                                    )}
                                                                >
                                                                    {checkTime(
                                                                        item[0]
                                                                            .startTimestamp *
                                                                            1000,
                                                                        item[0]
                                                                            .status
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {item[0].status
                                                                .code ===
                                                            100 ? (
                                                                <div
                                                                    className={cx(
                                                                        "table-match-detail-video"
                                                                    )}
                                                                >
                                                                    {/* <a
                                                                        href="https://www.youtube.com/watch?v=Ue76ar1xZWA&feature=onebox"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <img
                                                                            src="https://i.ytimg.com/vi/cBeA8BBM0Xk/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLADKHNS5_XF51n-zYznTlcRpeQPwQ"
                                                                            alt="hightLight"
                                                                        />
                                                                    </a> */}
                                                                    {
                                                                        <YouTubeMatch
                                                                            slug={{
                                                                                home: {
                                                                                    name: item[0]
                                                                                        .homeTeam
                                                                                        .name,
                                                                                    shortName:
                                                                                        item[0]
                                                                                            .homeTeam
                                                                                            .shortName,
                                                                                    id: item[0]
                                                                                        .homeTeam
                                                                                        .id,
                                                                                },
                                                                                away: {
                                                                                    name: item[0]
                                                                                        .awayTeam
                                                                                        .name,
                                                                                    shortName:
                                                                                        item[0]
                                                                                            .awayTeam
                                                                                            .shortName,
                                                                                    id: item[0]
                                                                                        .awayTeam
                                                                                        .id,
                                                                                },
                                                                            }}
                                                                            startMatch={
                                                                                item[0]
                                                                                    .startTimestamp *
                                                                                1000
                                                                            }
                                                                            handleClickVideo={
                                                                                handleClickVideo
                                                                            }
                                                                        />
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr></tr>
                                                    <tr
                                                        className={cx(
                                                            "table-match-row"
                                                        )}
                                                    >
                                                        <td
                                                            className={cx(
                                                                "table-match-img"
                                                            )}
                                                        >
                                                            <div>
                                                                <img
                                                                    src={`https://api.sofascore.app/api/v1/team/${item[0].homeTeam.id}/image`}
                                                                    className={cx(
                                                                        "table-match-img-logo"
                                                                    )}
                                                                    alt="logoOfTeam"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "table-match-team-info"
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "table-match-team-score"
                                                                )}
                                                            >
                                                                {item[0].status
                                                                    .code ===
                                                                100
                                                                    ? item[0]
                                                                          .homeScore
                                                                          .current
                                                                    : ``}
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    "table-match-team-name"
                                                                )}
                                                            >
                                                                <span>
                                                                    {
                                                                        item[0]
                                                                            .homeTeam
                                                                            .shortName
                                                                    }
                                                                    {"  "}
                                                                </span>
                                                                {item[0]
                                                                    .homeRedCards && (
                                                                    <svg
                                                                        width="6"
                                                                        height="8"
                                                                        viewBox="0 0 6 8"
                                                                        fill="#c1272d"
                                                                    >
                                                                        <rect
                                                                            x="0"
                                                                            y="0"
                                                                            width="6"
                                                                            height="8"
                                                                            rx="1"
                                                                            ry="1"
                                                                        ></rect>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    <tr
                                                        className={cx(
                                                            "table-match-row"
                                                        )}
                                                    >
                                                        <td
                                                            className={cx(
                                                                "table-match-img"
                                                            )}
                                                        >
                                                            <img
                                                                src={`https://api.sofascore.app/api/v1/team/${item[0].awayTeam.id}/image`}
                                                                className={cx(
                                                                    "table-match-img-logo"
                                                                )}
                                                                alt="logoOfTeam"
                                                            />
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "table-match-team-info"
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "table-match-team-score"
                                                                )}
                                                            >
                                                                {item[0].status
                                                                    .code ===
                                                                100
                                                                    ? item[0]
                                                                          .awayScore
                                                                          .current
                                                                    : ``}
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    "table-match-team-name"
                                                                )}
                                                            >
                                                                <span>
                                                                    {
                                                                        item[0]
                                                                            .awayTeam
                                                                            .shortName
                                                                    }
                                                                    {"  "}
                                                                </span>
                                                                {item[0]
                                                                    .awayRedCards && (
                                                                    <svg
                                                                        width="6"
                                                                        height="8"
                                                                        viewBox="0 0 6 8"
                                                                        fill="#c1272d"
                                                                    >
                                                                        <rect
                                                                            x="0"
                                                                            y="0"
                                                                            width="6"
                                                                            height="8"
                                                                            rx="1"
                                                                            ry="1"
                                                                        ></rect>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                    <tr></tr>
                                                    <tr></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                    {item[1] && (
                                        <td
                                            status={
                                                item[1].status.code === 100
                                                    ? "finished"
                                                    : "notstarted"
                                            }
                                            className={cx(
                                                "table-row-match",
                                                "table-match-row_border"
                                            )}
                                        >
                                            <div
                                                className={cx(
                                                    "table-row-match-wrap"
                                                )}
                                            >
                                                <table
                                                    className={cx(
                                                        "table-row-match-wrap-inner"
                                                    )}
                                                >
                                                    <tbody
                                                        className={cx(
                                                            "table-match-body"
                                                        )}
                                                    >
                                                        {/* contentOfMatch */}
                                                        <tr
                                                            className={cx(
                                                                "table-match-first-row"
                                                            )}
                                                        >
                                                            <td
                                                                className={cx(
                                                                    "table-match-logo-format"
                                                                )}
                                                            ></td>
                                                            <td></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-score-format"
                                                                )}
                                                            ></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-sparate-format"
                                                                )}
                                                            ></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-time-format"
                                                                )}
                                                            ></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-no-width"
                                                                )}
                                                            ></td>
                                                        </tr>
                                                        <tr
                                                            className={cx(
                                                                "table-match-live-status"
                                                            )}
                                                            colSpan={6}
                                                        ></tr>
                                                        <tr
                                                            className={cx(
                                                                "table-match-row-time"
                                                            )}
                                                        >
                                                            <td
                                                                colSpan={3}
                                                            ></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-row-sperate"
                                                                )}
                                                                rowSpan={5}
                                                            ></td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-time-detail"
                                                                )}
                                                                rowSpan={5}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "table-match-time-detail-text"
                                                                    )}
                                                                    style={{
                                                                        color: `${color}`,
                                                                    }}
                                                                >
                                                                    <div
                                                                        className={cx(
                                                                            "table-match-time-status"
                                                                        )}
                                                                    >
                                                                        {checkWeekDay(
                                                                            item[1]
                                                                                .startTimestamp *
                                                                                1000,
                                                                            item[1]
                                                                                .status
                                                                        )}
                                                                    </div>
                                                                    <div
                                                                        className={cx(
                                                                            "table-match-time-on"
                                                                        )}
                                                                    >
                                                                        {checkTime(
                                                                            item[1]
                                                                                .startTimestamp *
                                                                                1000,
                                                                            item[0]
                                                                                .status
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {item[1].status
                                                                    .code ===
                                                                100 ? (
                                                                    <div
                                                                        className={cx(
                                                                            "table-match-detail-video"
                                                                        )}
                                                                    >
                                                                        {
                                                                            <YouTubeMatch
                                                                                slug={{
                                                                                    home: {
                                                                                        name: item[1]
                                                                                            .homeTeam
                                                                                            .name,
                                                                                        shortName:
                                                                                            item[1]
                                                                                                .homeTeam
                                                                                                .shortName,
                                                                                        id: item[1]
                                                                                            .homeTeam
                                                                                            .id,
                                                                                    },
                                                                                    away: {
                                                                                        name: item[1]
                                                                                            .awayTeam
                                                                                            .name,
                                                                                        shortName:
                                                                                            item[1]
                                                                                                .awayTeam
                                                                                                .shortName,
                                                                                        id: item[1]
                                                                                            .awayTeam
                                                                                            .id,
                                                                                    },
                                                                                }}
                                                                                startMatch={
                                                                                    item[1]
                                                                                        .startTimestamp *
                                                                                    1000
                                                                                }
                                                                                handleClickVideo={
                                                                                    handleClickVideo
                                                                                }
                                                                            />
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr></tr>
                                                        <tr
                                                            className={cx(
                                                                "table-match-row"
                                                            )}
                                                        >
                                                            <td
                                                                className={cx(
                                                                    "table-match-img"
                                                                )}
                                                            >
                                                                <div>
                                                                    <img
                                                                        src={`https://api.sofascore.app/api/v1/team/${item[1].homeTeam.id}/image`}
                                                                        className={cx(
                                                                            "table-match-img-logo"
                                                                        )}
                                                                        alt="logoOfTeam"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-team-info"
                                                                )}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "table-match-team-score"
                                                                    )}
                                                                >
                                                                    {item[1]
                                                                        .status
                                                                        .code ===
                                                                    100
                                                                        ? item[1]
                                                                              .homeScore
                                                                              .current
                                                                        : ``}
                                                                </div>
                                                                <div
                                                                    className={cx(
                                                                        "table-match-team-name"
                                                                    )}
                                                                >
                                                                    <span>
                                                                        {
                                                                            item[1]
                                                                                .homeTeam
                                                                                .shortName
                                                                        }
                                                                        {"  "}
                                                                    </span>
                                                                    {item[1]
                                                                        .homeRedCards && (
                                                                        <svg
                                                                            width="6"
                                                                            height="8"
                                                                            viewBox="0 0 6 8"
                                                                            fill="#c1272d"
                                                                        >
                                                                            <rect
                                                                                x="0"
                                                                                y="0"
                                                                                width="6"
                                                                                height="8"
                                                                                rx="1"
                                                                                ry="1"
                                                                            ></rect>
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr
                                                            className={cx(
                                                                "table-match-row"
                                                            )}
                                                        >
                                                            <td
                                                                className={cx(
                                                                    "table-match-img"
                                                                )}
                                                            >
                                                                <img
                                                                    src={`https://api.sofascore.app/api/v1/team/${item[1].awayTeam.id}/image`}
                                                                    className={cx(
                                                                        "table-match-img-logo"
                                                                    )}
                                                                    alt="logoOfTeam"
                                                                />
                                                            </td>
                                                            <td
                                                                className={cx(
                                                                    "table-match-team-info"
                                                                )}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "table-match-team-score"
                                                                    )}
                                                                >
                                                                    {item[1]
                                                                        .status
                                                                        .code ===
                                                                    100
                                                                        ? item[1]
                                                                              .awayScore
                                                                              .current
                                                                        : ``}
                                                                </div>
                                                                <div
                                                                    className={cx(
                                                                        "table-match-team-name"
                                                                    )}
                                                                >
                                                                    <span>
                                                                        {
                                                                            item[1]
                                                                                .awayTeam
                                                                                .shortName
                                                                        }
                                                                        {"  "}
                                                                    </span>
                                                                    {item[1]
                                                                        .awayRedCards && (
                                                                        <svg
                                                                            width="6"
                                                                            height="8"
                                                                            viewBox="0 0 6 8"
                                                                            fill="#c1272d"
                                                                        >
                                                                            <rect
                                                                                x="0"
                                                                                y="0"
                                                                                width="6"
                                                                                height="8"
                                                                                rx="1"
                                                                                ry="1"
                                                                            ></rect>
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr></tr>
                                                        <tr></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    <tr className={cx("table-row")}></tr>
                    <tr className={cx("table-row")}></tr>
                </tbody>
            </table>

            {flag && (
                <div className={cx("play-video")}>
                    <div className={cx("cancel")} onClick={exitVideo}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className={cx("video")}>
                        <VideoPlay url={url} setLinkVideo={handleSetLink} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(PreMatch);
