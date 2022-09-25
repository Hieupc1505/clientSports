import React, { useEffect, useRef } from "react";
import styles from "./Statistic.module.scss";
import classNames from "classnames/bind";
import { getTopPlayers } from "../../../../redux/actions";
// import { BorderLoader } from "~/components/Layout/components/Loader";
import { v4 as uuidv4 } from "uuid";
import { useStateCustom, useDispatchCustom } from "../../../Hooks";
import { type } from "./type";
const cx = classNames.bind(styles);

// console.log(type);
const Statistic = () => {
    const { onGetDispatch, dataBySelector } = useDispatchCustom();
    const {
        statistics: { data },
        nation,
        error,
    } = dataBySelector;

    const ele = useRef();
    const [title, { onChangeValue: setTitle }] = useStateCustom("rating");
    const [flag, { onChangeValue: setFlag, onToggle: onToggleFlag }] =
        useStateCustom(false);
    const handleClickItem = (e) => {
        const { value } = e.target.attributes["name"];

        setTitle(value);
        onToggleFlag();
    };

    const handleClickTitle = () => {
        onToggleFlag();
    };

    const handleClickDoc = (e) => {
        // console.log(ele.current.contains(e.target));
        if (ele.current && !ele.current.contains(e.target) && flag) {
            onToggleFlag();
        }
    };
    useEffect(() => {
        onGetDispatch(getTopPlayers(nation));
    }, [nation, error]);
    useEffect(() => {
        document.addEventListener("click", handleClickDoc);
        return () => document.removeEventListener("click", handleClickDoc);
    }, [flag]);

    return (
        <>
            {data && (
                <div className={cx("wrapper content-main")}>
                    <div className={cx("inner")}>
                        <div ref={ele} className={cx("inner-title", "ft-6")}>
                            <span
                                className={cx("season-dropdow-text")}
                                onClick={handleClickTitle}
                            >
                                {type[title]}
                                <span
                                    className={cx("season-dropdown-icon")}
                                ></span>
                            </span>
                            {flag && (
                                <ul className={cx("drop-down-list")}>
                                    {Object.keys(type).map((it, id) => {
                                        if (it !== title)
                                            return (
                                                <li
                                                    key={uuidv4()}
                                                    onClick={handleClickItem}
                                                    name={it}
                                                    className={cx(
                                                        "drop-down-item"
                                                    )}
                                                >
                                                    {type[it]}
                                                </li>
                                            );
                                    })}
                                </ul>
                            )}
                        </div>
                        <div className={cx("inner-main")}>
                            <table className={cx("inner-table")}>
                                <tbody>
                                    <tr className={cx("inner-row", "ft-6")}>
                                        <td
                                            className={cx("inner-row-title")}
                                        ></td>
                                        <td className={cx("inner-row-space")}>
                                            <div
                                                className={cx("inner-row-text")}
                                            >
                                                Cầu thủ
                                            </div>
                                        </td>
                                        <td className={cx("inner-row-type")}>
                                            {type[title]}
                                        </td>
                                    </tr>
                                    {data &&
                                        data.topPlayers[title].map(
                                            (item, index) => {
                                                return (
                                                    <tr
                                                        key={uuidv4()}
                                                        className={cx(
                                                            "inner-row-tt"
                                                        )}
                                                    >
                                                        <td
                                                            className={cx(
                                                                "inner-row-title"
                                                            )}
                                                        >
                                                            {index + 1}
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "inner-row-space"
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "inner-row-avata"
                                                                )}
                                                            >
                                                                <img
                                                                    src={`https://api.sofascore.app/api/v1/player/${item.player.id}/image`}
                                                                    alt="Haland"
                                                                />
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    "inner-row-info"
                                                                )}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "inner-row-info-name"
                                                                    )}
                                                                >
                                                                    {
                                                                        item
                                                                            .player
                                                                            .name
                                                                    }
                                                                </div>
                                                                <div
                                                                    className={cx(
                                                                        "inner-row-info-club-name"
                                                                    )}
                                                                >
                                                                    <span
                                                                        className={cx(
                                                                            "inner-row-info-club-logo"
                                                                        )}
                                                                    >
                                                                        <img
                                                                            src={`https://api.sofascore.app/api/v1/team/${item.team.id}/image`}
                                                                            alt="logo"
                                                                        />
                                                                    </span>
                                                                    {
                                                                        item
                                                                            .team
                                                                            .shortName
                                                                    }
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                "inner-row-type",
                                                                "ttc"
                                                            )}
                                                        >
                                                            {Number.isInteger(
                                                                Number(
                                                                    item
                                                                        .statistics[
                                                                        title
                                                                    ]
                                                                )
                                                            )
                                                                ? Number(
                                                                      item
                                                                          .statistics[
                                                                          title
                                                                      ]
                                                                  )
                                                                : Number(
                                                                      item
                                                                          .statistics[
                                                                          title
                                                                      ]
                                                                  ).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Statistic;
