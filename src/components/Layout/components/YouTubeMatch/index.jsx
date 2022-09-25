import React from "react";
import { useSelector } from "react-redux";
// ISODateString(new Date(1662901200*1000))
import { v4 as uuidv4 } from "uuid";
import { list } from "../../../GlobelStyles/type";
import classNames from "classnames/bind";
import styles from "../Match/Match.module.scss";
const cx = classNames.bind(styles);

const YouTubeMatch = ({ slug, startMatch, handleClickVideo }) => {
    const { lists, nation, loading } = useSelector((state) => state.sport);

    const ISODateString = (d) => {
        function pad(n) {
            return n < 10 ? "0" + n : n;
        }
        return (
            d.getUTCFullYear() +
            "-" +
            pad(d.getUTCMonth() + 1) +
            "-" +
            pad(d.getUTCDate()) +
            "T" +
            pad(d.getUTCHours()) +
            ":" +
            pad(d.getUTCMinutes()) +
            ":" +
            pad(d.getUTCSeconds()) +
            "Z"
        );
    };
    const checkTitle = (arr, title, time) => {
        // const words = [...home.shortName.split(" "), ...away.shortName.split(" ")];
        const checkWord = arr.every(
            (item) => {
                const txt1 = item.name
                    .split(" ")
                    .map((item) => `(${item})`)
                    .join("|");

                const work = new RegExp(`(${txt1})`, "gi");
                const work2 = new RegExp(`(${item.shortName})`, "gi");
                return work.test(title) || work2.test(title);
            }
            // title.toLocaleLowerCase().includes(item.toLocaleLowerCase())
        );
        const checkTime =
            new Date(startMatch - 24 * 60 * 60 * 1000) < new Date(time) &&
            new Date(time) < new Date(startMatch + 3 * 24 * 60 * 60 * 1000);
        // console.log(checkTime, checkWord);
        if (checkWord && checkTime) return true;
        return false;
    };

    const handleHightLightImage = ({ home, away }) => {
        let body = "";
        let after = ISODateString(new Date(startMatch));
        lists[nation].map((item) => {
            if (
                checkTitle(
                    [home, away],
                    item.snippet.title,
                    item.snippet.publishedAt
                )
            )
                body = (
                    <span
                        key={uuidv4()}
                        onClick={() =>
                            handleClickVideo(
                                item.snippet.videoId,
                                `${home.name} - ${away.name}`
                            )
                        }
                        // href={`https://www.youtube.com/watch?v=${item.snippet.videoId}`}
                        // target="_blank"
                        // rel="noopener noreferrer"
                    >
                        <img
                            src={`https://i.ytimg.com/vi/${item.snippet.videoId}/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLADKHNS5_XF51n-zYznTlcRpeQPwQ`}
                            alt="hightLight"
                        />
                    </span>
                );
        });
        if (!body) {
            body = (
                <div
                    onClick={() =>
                        handleClickVideo(
                            null,

                            `${home.name} - ${away.name}`,
                            list[nation].params.channelId,
                            after
                        )
                    }
                    key={uuidv4()}
                    className={cx("hight-light-box")}
                    style={{
                        backgroundImage: `url(${list[nation].params.image})`,
                    }}
                    // href={`https://www.youtube.com/watch?v=${item.snippet.videoId}`}
                    // target="_blank"
                    // rel="noopener noreferrer"
                >
                    <div className={cx("home-info")}>
                        <img
                            src={`https://api.sofascore.app/api/v1/team/${home.id}/image`}
                            alt={"home"}
                        />
                    </div>
                    <div className={cx("away-info")}>
                        <img
                            src={`https://api.sofascore.app/api/v1/team/${away.id}/image`}
                            alt={"away"}
                        />
                    </div>
                </div>
            );
        }
        return body;
    };

    return (
        <div>{!loading && lists[nation] && handleHightLightImage(slug)}</div>
    );
};

export default React.memo(YouTubeMatch);
