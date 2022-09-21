import React from "react";
import styles from "./SlideBar.modules.scss";
import className from "classnames/bind";
const cx = className.bind(styles);

const SlideBar = () => {
    return (
        <aside className={cx("wrapper")}>
            <h2>SlideBar</h2>
        </aside>
    );
};

export default SlideBar;
