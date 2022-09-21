import React from "react";
import classNames from "classnames/bind";
import styles from "./Live.module.scss";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const Live = () => {
    useEffect(() => {
        const _ = (ele) => document.querySelector(ele);
        const removeByWhile = (ele) => {
            let tar = _(ele);
            let parentTar = tar.parentElement;
            while (tar.tagName !== "BODY") {
                // console.log("them");
                let nextE = tar.nextElementSibling;
                let preE = tar.previousElementSibling;
                while (nextE || preE) {
                    // console.log("xoa");
                    if (nextE && nextE.tagName !== "script") nextE.remove();
                    if (preE && preE.tagName !== "script") preE.remove();
                    nextE = tar.nextElementSibling;
                    preE = tar.previousElementSibling;
                }
                tar = parentTar;
                parentTar = parentTar.parentElement;
            }
        };
    });
    return (
        <div className={cx("wrapper")}>
            <div className={cx("main-view")}>
                <div className={cx("main-bridge")}>
                    <div className={cx("main-view-video")}>
                        {/* <iframe
                            src={"https://www.youtube.com/watch?v=HNFbbTIT2Tw"}
                        ></iframe> */}
                    </div>
                </div>
            </div>
            <div className={cx("box-option")}>
                <div className={cx("view-side-bar")}>
                    <div className={cx("view-side-bar-video")}></div>
                </div>
                <div className={cx("view-side-bar")}>
                    <div className={cx("view-side-bar-video")}></div>
                </div>
                <div className={cx("view-side-bar")}>
                    <div className={cx("view-side-bar-video")}></div>
                </div>
            </div>
        </div>
    );
};

export default Live;
