import { useLayoutEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Charts.module.scss";
import { getCharts } from "../../../../redux/actions";
import { v4 as uuidv4 } from "uuid";
import { list } from "../../../GlobelStyles/type";
import { useStateCustom, useDispatchCustom } from "../../../Hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

const Charts = () => {
    const [ss, { onChangeValue }] = useStateCustom(false);
    const { onGetDispatch, dataBySelector } = useDispatchCustom();
    const {
        charts: { data, fiveMatch, season },
        nation,
        error,
    } = dataBySelector;

    useLayoutEffect(() => {
        onGetDispatch(getCharts(nation, 0));
    }, [nation, error]);

    const emptyMatch = (round) => {
        // console.log(round);
        let content = [];
        for (let i = 0; i < 5 - round; i++) {
            let ele = (
                <div key={uuidv4()} className={cx("five-match-wrap")}>
                    <img
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRW1wdHkiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0JEQzFDNiIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgY3g9IjgiIGN5PSI4IiByPSI3Ij48L2NpcmNsZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo="
                        alt="stt"
                    />
                </div>
            );
            content.push(ele);
        }
        return content;
    };

    const handleClickSeason = async (index) => {
        onChangeValue(!ss);
        onGetDispatch(getCharts(nation, index));
    };
    const handleClickDropdown = () => {
        onChangeValue(!ss);
    };
    // console.log(data);
    return (
        <>
            {data && (
                <div className={cx("wrapper content-main")}>
                    <div className={cx("tdcm", "h-134")}>
                        <div className={cx("season")}>
                            <div className={cx("season-wrap")}>
                                <div className={cx("season-text")}>
                                    Mùa giải
                                </div>
                                <div
                                    className={cx("season-dropdown")}
                                    onClick={handleClickDropdown}
                                >
                                    <div className={cx("season-dropdow-text")}>
                                        {season}
                                        <span
                                            className={cx(
                                                "season-dropdown-icon"
                                            )}
                                        ></span>
                                    </div>
                                    {ss && (
                                        <ul
                                            className={cx(
                                                "season-dropdown-menu"
                                            )}
                                        >
                                            {list[nation].seasons.map(
                                                (item, index) => {
                                                    if (
                                                        index < 10 &&
                                                        item.year === season
                                                    )
                                                        return (
                                                            <li
                                                                ss={item.id}
                                                                key={uuidv4()}
                                                                className={cx(
                                                                    "season-dropdown-item"
                                                                )}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCheck
                                                                    }
                                                                />
                                                                <span>
                                                                    {item.year}
                                                                </span>
                                                            </li>
                                                        );
                                                    return (
                                                        <li
                                                            ss={item.id}
                                                            key={uuidv4()}
                                                            className={cx(
                                                                "season-dropdown-item"
                                                            )}
                                                            onClick={() =>
                                                                handleClickSeason(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            {item.year}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        {data &&
                            data.map((list) => (
                                <div key={uuidv4()} className={cx("charts")}>
                                    <table className={cx("charts-table")}>
                                        {/* <div className={cx("bridge")}></div> */}
                                        <tbody
                                            className={cx("charts-table-body")}
                                        >
                                            <tr
                                                className={cx(
                                                    "charts-body-title"
                                                )}
                                            >
                                                <th
                                                    className={cx(
                                                        "charts-row-form"
                                                    )}
                                                ></th>
                                                <th
                                                    className={cx(
                                                        "charts-row-form",
                                                        "charts-left"
                                                    )}
                                                ></th>
                                                <th
                                                    className={cx(
                                                        "charts-row-form",
                                                        "charts-row-club-name",
                                                        "charts-left"
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            "charts-row-club-name-text"
                                                        )}
                                                    >
                                                        Câu lạc bộ
                                                    </div>
                                                </th>
                                                <th
                                                    className={cx(
                                                        "charts-row-form"
                                                    )}
                                                >
                                                    RED
                                                </th>
                                                <th
                                                    className={cx(
                                                        "charts-row-form"
                                                    )}
                                                >
                                                    Win
                                                </th>
                                                <th
                                                    className={cx(
                                                        "charts-row-form"
                                                    )}
                                                >
                                                    H
                                                </th>
                                                <th
                                                    className={cx(
                                                        "charts-row-form"
                                                    )}
                                                >
                                                    Lose
                                                </th>
                                                <th
                                                    className={cx(
                                                        "charts-row-form"
                                                    )}
                                                >
                                                    BT
                                                </th>
                                                <th
                                                    className={cx(
                                                        "charts-row-form"
                                                    )}
                                                >
                                                    HBT
                                                </th>
                                                <th
                                                    className={cx(
                                                        "charts-row-form"
                                                    )}
                                                >
                                                    HS
                                                </th>
                                                <th
                                                    className={cx(
                                                        "charts-row-form"
                                                    )}
                                                >
                                                    D
                                                </th>

                                                <th
                                                    className={cx(
                                                        "charts-row-form",
                                                        "charts-row-last-five-match"
                                                    )}
                                                >
                                                    Last 5 match
                                                </th>
                                            </tr>
                                            {list.map((item, index) => (
                                                <tr
                                                    key={uuidv4()}
                                                    className={cx(
                                                        "charts-row-wrap",
                                                        "charts-body-title"
                                                    )}
                                                >
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "bd-t-3",
                                                            "charts-row-form",
                                                            "pb-0"
                                                        )}
                                                    ></td>
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "charts-row-form",
                                                            "pb-0",
                                                            "charts-left",
                                                            "w-78"
                                                        )}
                                                    >
                                                        <div
                                                            className={cx(
                                                                "charts-info-c1"
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "charts-info-separate"
                                                                )}
                                                            ></div>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                "charts-info-stt",
                                                                "bd-t-3"
                                                            )}
                                                        >
                                                            {index + 1}
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                "charts-info-img",
                                                                "bd-t-3"
                                                            )}
                                                        >
                                                            <img
                                                                src={`https://api.sofascore.app/api/v1/team/${item.team.id}/image`}
                                                                alt="logoImg"
                                                                className={cx(
                                                                    "content-center"
                                                                )}
                                                            />
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                "bd-t-3",
                                                                "charts-info-img",
                                                                "w-12"
                                                            )}
                                                        ></div>
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            "h-40",

                                                            "charts-row-form",
                                                            "charts-left",
                                                            "l-75"
                                                        )}
                                                    >
                                                        <span
                                                            className={cx(
                                                                "club-name"
                                                            )}
                                                        >
                                                            {
                                                                item.team
                                                                    .shortName
                                                            }
                                                        </span>
                                                    </td>
                                                    {/* DD Thang H thua BT SBT HS D 5match*/}
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "bd-t-3",
                                                            "charts-row-form",
                                                            "pb-0"
                                                        )}
                                                    >
                                                        {item.matches}
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "bd-t-3",
                                                            "charts-row-form",
                                                            "pb-0"
                                                        )}
                                                    >
                                                        {item.wins}
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "bd-t-3",
                                                            "charts-row-form",
                                                            "pb-0"
                                                        )}
                                                    >
                                                        {item.matches -
                                                            item.wins -
                                                            item.losses}
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "bd-t-3",
                                                            "charts-row-form",
                                                            "pb-0"
                                                        )}
                                                    >
                                                        {item.losses}
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "bd-t-3",
                                                            "charts-row-form",
                                                            "pb-0"
                                                        )}
                                                    >
                                                        {item.scoresFor}
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "bd-t-3",
                                                            "charts-row-form",
                                                            "pb-0"
                                                        )}
                                                    >
                                                        {item.scoresAgainst}
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "bd-t-3",
                                                            "charts-row-form",
                                                            "pb-0"
                                                        )}
                                                    >
                                                        {item.scoresFor -
                                                            item.scoresAgainst}
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "bd-t-3",
                                                            "charts-row-form",
                                                            "pb-0"
                                                        )}
                                                    >
                                                        {item.points}
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            "h-40",
                                                            "bd-t-3",
                                                            "charts-row-form",
                                                            "pb-0",
                                                            "charts-row-last-five-match"
                                                        )}
                                                    >
                                                        <div
                                                            className={cx(
                                                                "five-match-status"
                                                            )}
                                                        >
                                                            {fiveMatch[
                                                                `${item.team.id}`
                                                            ].map(
                                                                (
                                                                    st,
                                                                    index2
                                                                ) => {
                                                                    if (
                                                                        st.win ===
                                                                        0
                                                                    )
                                                                        return (
                                                                            <div
                                                                                key={uuidv4()}
                                                                                className={cx(
                                                                                    "five-match-wrap"
                                                                                )}
                                                                            >
                                                                                <img
                                                                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRHJhdyI+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiM5QUEwQTYiIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjUgNyAxMSA3IDExIDkgNSA5Ij48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
                                                                                    alt="stt"
                                                                                />
                                                                                <div
                                                                                    className={cx(
                                                                                        "match-info-tooltip"
                                                                                    )}
                                                                                >
                                                                                    <a
                                                                                        href={`https://www.sofascore.com/${st.slug}/${st.customId}`}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                    >
                                                                                        <span
                                                                                            className={cx(
                                                                                                "match-info-tooltip-text"
                                                                                            )}
                                                                                        >
                                                                                            {`${st.time}, ${st.score} ${st.match}`}
                                                                                        </span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    else if (
                                                                        st.win ===
                                                                        1
                                                                    )
                                                                        return (
                                                                            <div
                                                                                key={uuidv4()}
                                                                                className={cx(
                                                                                    "five-match-wrap"
                                                                                )}
                                                                            >
                                                                                <img
                                                                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iV2luIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzNBQTc1NyIgY3g9IjgiIGN5PSI4IiByPSI4Ij48L2NpcmNsZT4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSI2LjQgOS43NiA0LjMyIDcuNjggMy4yIDguOCA2LjQgMTIgMTIuOCA1LjYgMTEuNjggNC40OCI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="
                                                                                    alt=""
                                                                                ></img>
                                                                                <div
                                                                                    className={cx(
                                                                                        "match-info-tooltip"
                                                                                    )}
                                                                                >
                                                                                    <a
                                                                                        href={`https://www.sofascore.com/${st.slug}/${st.customId}`}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                    >
                                                                                        <span
                                                                                            className={cx(
                                                                                                "match-info-tooltip-text"
                                                                                            )}
                                                                                        >
                                                                                            {`${st.time}, ${st.score} ${st.match}`}
                                                                                        </span>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        );

                                                                    return (
                                                                        <div
                                                                            key={uuidv4()}
                                                                            className={cx(
                                                                                "five-match-wrap"
                                                                            )}
                                                                        >
                                                                            <img
                                                                                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTG9zcyI+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiNFQTQzMzUiIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgOC4wMDAwMDApIHJvdGF0ZSgtMzE1LjAwMDAwMCkgdHJhbnNsYXRlKC04LjAwMDAwMCwgLTguMDAwMDAwKSAiIHBvaW50cz0iMTIgOC44IDguOCA4LjggOC44IDEyIDcuMiAxMiA3LjIgOC44IDQgOC44IDQgNy4yIDcuMiA3LjIgNy4yIDQgOC44IDQgOC44IDcuMiAxMiA3LjIiPjwvcG9seWdvbj4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo="
                                                                                alt=""
                                                                            ></img>
                                                                            <div
                                                                                className={cx(
                                                                                    "match-info-tooltip"
                                                                                )}
                                                                            >
                                                                                <a
                                                                                    href={`https://www.sofascore.com/${st.slug}/${st.customId}`}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
                                                                                    <span
                                                                                        className={cx(
                                                                                            "match-info-tooltip-text"
                                                                                        )}
                                                                                    >
                                                                                        {`${st.time}, ${st.score} ${st.match}`}
                                                                                    </span>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                            {
                                                                //body

                                                                item.matches <
                                                                    5 && (
                                                                    <>
                                                                        {emptyMatch(
                                                                            item.matches
                                                                        ).map(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item
                                                                        )}
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </td>
                                                    <td
                                                        className={cx(
                                                            "charts-row-add"
                                                        )}
                                                    ></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        {nation !== "c1" && (
                            <div className={cx("note-wrap")}>
                                <div className={cx("charts-notes")}>
                                    <div className={cx("flex-1")}>
                                        <div
                                            className={cx("charts-note-title")}
                                        >
                                            Hạng trên/Hạng dưới
                                        </div>
                                        <div className={cx("charts-note-wrap")}>
                                            <div
                                                style={{
                                                    backgroundColor: "#4285F4",
                                                }}
                                                className={cx(
                                                    "charts-note-rect"
                                                )}
                                            ></div>
                                            <div
                                                className={cx(
                                                    "charts-note-text"
                                                )}
                                            >
                                                Vòng bảng Vô địch các CLB Châu
                                                Âu
                                            </div>
                                        </div>
                                        <div className={cx("charts-note-wrap")}>
                                            <div
                                                style={{
                                                    backgroundColor: "#FA7B17",
                                                }}
                                                className={cx(
                                                    "charts-note-rect"
                                                )}
                                            ></div>
                                            <div
                                                className={cx(
                                                    "charts-note-text"
                                                )}
                                            >
                                                Vòng bảng UEFA Europa League
                                            </div>
                                        </div>
                                        <div className={cx("charts-note-wrap")}>
                                            <div
                                                style={{
                                                    backgroundColor: "#EA4335",
                                                }}
                                                className={cx(
                                                    "charts-note-rect"
                                                )}
                                            ></div>
                                            <div
                                                className={cx(
                                                    "charts-note-text"
                                                )}
                                            >
                                                Xuống hạng
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx("flex-1")}>
                                        <div
                                            className={cx("charts-note-title")}
                                        >
                                            5 trận gần nhất
                                        </div>
                                        <div className={cx("charts-note-wrap")}>
                                            <div
                                                className={cx(
                                                    "charts-note-wrap"
                                                )}
                                                aria-labelledby="l5l-w"
                                            >
                                                <img
                                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iV2luIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iIzNBQTc1NyIgY3g9IjgiIGN5PSI4IiByPSI4Ij48L2NpcmNsZT4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgcG9pbnRzPSI2LjQgOS43NiA0LjMyIDcuNjggMy4yIDguOCA2LjQgMTIgMTIuOCA1LjYgMTEuNjggNC40OCI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg=="
                                                    className={cx("nB9CIe")}
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                className={cx(
                                                    "charts-note-text"
                                                )}
                                                id="l5l-w"
                                            >
                                                Thắng
                                            </div>
                                        </div>
                                        <div className={cx("charts-note-wrap")}>
                                            <div
                                                className={cx(
                                                    "charts-note-wrap"
                                                )}
                                                aria-labelledby="l5l-t"
                                            >
                                                <img
                                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRHJhdyI+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiM5QUEwQTYiIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjUgNyAxMSA3IDExIDkgNSA5Ij48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
                                                    className={cx("nB9CIe")}
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                className={cx(
                                                    "charts-note-text"
                                                )}
                                                id="l5l-t"
                                            >
                                                Hòa
                                            </div>
                                        </div>
                                        <div className={cx("charts-note-wrap")}>
                                            <div
                                                className={cx(
                                                    "charts-note-wrap"
                                                )}
                                                aria-labelledby="l5l-l"
                                            >
                                                <img
                                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTG9zcyI+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGZpbGw9IiNFQTQzMzUiIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjRkZGRkZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgOC4wMDAwMDApIHJvdGF0ZSgtMzE1LjAwMDAwMCkgdHJhbnNsYXRlKC04LjAwMDAwMCwgLTguMDAwMDAwKSAiIHBvaW50cz0iMTIgOC44IDguOCA4LjggOC44IDEyIDcuMiAxMiA3LjIgOC44IDQgOC44IDQgNy4yIDcuMiA3LjIgNy4yIDQgOC44IDQgOC44IDcuMiAxMiA3LjIiPjwvcG9seWdvbj4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo="
                                                    className={cx("nB9CIe")}
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                className={cx(
                                                    "charts-note-text"
                                                )}
                                                id="l5l-l"
                                            >
                                                Thua
                                            </div>
                                        </div>
                                        <div className={cx("charts-note-wrap")}>
                                            <div
                                                className={cx(
                                                    "charts-note-wrap"
                                                )}
                                                aria-labelledby="l5l-np"
                                            >
                                                <img
                                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRW1wdHkiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0JEQzFDNiIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgY3g9IjgiIGN5PSI4IiByPSI3Ij48L2NpcmNsZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo="
                                                    className={cx("nB9CIe")}
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                className={cx(
                                                    "charts-note-text"
                                                )}
                                                id="l5l-np"
                                            >
                                                Không thi đấu
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Charts;
