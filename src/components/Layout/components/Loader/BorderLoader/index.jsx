import React from "react";
import classNames from "classnames/bind";
import styles from "../loader.module.scss";

const cx = classNames.bind(styles);
const BorderLoader = () => {
    return (
        <div className={cx("loader")}>
            <div className={cx("spinner")}></div>
        </div>
    );
};

export default BorderLoader;
