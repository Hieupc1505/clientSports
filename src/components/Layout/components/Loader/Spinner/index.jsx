import React from "react";
import classNames from "classnames/bind";
import styles from "./Spinner.module.scss";

const cx = classNames.bind(styles);

const Spinner = () => {
    return (
        <div className={cx("wrapper")}>
            <svg>
                <circle cx={20} cy={20} r={20} />
            </svg>
        </div>
    );
};

export default Spinner;
