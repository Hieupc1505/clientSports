import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import className from "classnames/bind";
import styles from "./Match.module.scss";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { getMatchTime, getRound } from "../../../../redux/actions";
import { Spinner } from "../Loader";
import PreMatch from "../PreMatch";
import { v4 as uuidv4 } from "uuid";
import { useStateCustom, useDispatchCustom } from "../../../Hooks";
// import YouTubeMatch from "../YouTubeMatch";

const cx = className.bind(styles);

const Match = () => {
    // const [loadBottom, setLoadBottom] = useState(false);
    const [loadTop, setLoadTop] = useState(false);
    const [before, setBefore] = useState([]);
    const [after, setAfter] = useState([]);
    const roundStatus = useRef({ up: null, down: null });
    const preScroll = useRef({
        top: 0,
        bottom: 0,
    });
    const { onGetDispatch, dataBySelector } = useDispatchCustom();

    const [
        loadBottom,
        { onChangeValue: setLoadBottom, onToggle: onToggleLoadBottom },
    ] = useStateCustom(false);

    const {
        matchs: { data, rounds },
        loadingPre,
        loading,
        nation,
        error,
    } = dataBySelector;
    // const [value, ]
    const handleScroll = async () => {
        let currentScrollPos = window.pageYOffset;
        let totalHeight = document.documentElement.scrollHeight;
        let screenHeight = window.innerHeight;
        let bottomOffset = Number.parseInt(
            totalHeight - screenHeight - currentScrollPos
        );
        // console.log(totalHeight, screenHeight, currentScrollPos);
        if (
            currentScrollPos === 0 &&
            preScroll.current.top > currentScrollPos &&
            !loadingPre
        ) {
            // setPre(1);
            if (roundStatus.current.up > 1) {
                setLoadTop((pre) => !pre);
                const { data } = await onGetDispatch(
                    getRound(nation, roundStatus.current.up - 1),
                    true
                );
                roundStatus.current.up -= 1;
                setBefore((pre) => {
                    return [data, ...pre];
                });
                setLoadTop((pre) => !pre);
            }
        } else if (
            bottomOffset === 0 &&
            preScroll.current.bottom > bottomOffset &&
            !loadingPre
        ) {
            if (roundStatus.current.down < 38) {
                onToggleLoadBottom();
                const { data } = await onGetDispatch(
                    getRound(nation, roundStatus.current.down + 1),
                    true
                );
                roundStatus.current.down += 1;
                setAfter((pre) => {
                    return [...pre, data];
                });
                setLoadBottom(0);
            }
        }
        preScroll.current.top = currentScrollPos;
        preScroll.current.bottom = bottomOffset;
    };
    // console.log(preRound.current);
    useEffect(() => {
        onGetDispatch(getMatchTime(nation));
    }, [nation, error]);

    useEffect(() => {
        setAfter(() => []);
        setBefore(() => []);
    }, [nation]);

    useLayoutEffect(() => {
        // var prevScrollpos = window.pageYOffset;
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadingPre, nation]);

    useLayoutEffect(() => {
        if (data)
            roundStatus.current = {
                up: rounds.currentRound.round - 1,
                down: rounds.currentRound.round + 1,
            };
    }, [data]);
    // useEffect( () => {
    //     const bf = onGetDispatch(getRound())
    // }, [])
    useEffect(() => {
        let view = document.querySelector(".view");
        console.log(view);
        if (view) {
            view.scrollIntoView();
            window.scrollTo(0, window.scrollY - 132);
        }
    }, [nation]);
    return (
        <>
            {!loading && (
                <div className={cx("wrapper")}>
                    {!!loadTop && <Spinner />}

                    {data &&
                        !!before.length &&
                        before.map((item, index) => (
                            <PreMatch
                                key={uuidv4()}
                                data={item}
                                lRound={rounds.rounds.length}
                                round={
                                    rounds.currentRound.round -
                                    before.length +
                                    index -
                                    1
                                }
                            />
                        ))}
                    {data &&
                        data.map((item, index) => {
                            if (item) {
                                return (
                                    <PreMatch
                                        key={uuidv4()}
                                        lRound={rounds.rounds.length}
                                        data={item}
                                        round={
                                            rounds.currentRound.round +
                                            index -
                                            1
                                        }
                                        color={index === 1 ? "orange" : null}
                                    />
                                );
                            }
                        })}

                    {data &&
                        !!after.length &&
                        after.map((item, index) => (
                            <PreMatch
                                key={uuidv4()}
                                data={item}
                                round={rounds.currentRound.round + index + 2}
                                lRound={rounds.rounds.length}
                            />
                        ))}

                    {!!loadBottom && <Spinner />}
                </div>
            )}
        </>
    );
};

export default Match;
