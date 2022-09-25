import React, { useEffect } from "react";
import Header from "../components/Header";
import classNames from "classnames/bind";
import styles from "../../GlobelStyles/Responesive.scss";
import { useDispatchCustom, useStateCustom } from "../../Hooks";
import { clearError } from "../../../redux/actions";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
    const { dataBySelector, onGetDispatch } = useDispatchCustom();
    const { error } = dataBySelector;
    const [count, { onChangeValue }] = useStateCustom(0);
    useEffect(() => {
        let idClear;
        // console.log(count);
        if (error && count <= 3) {
            idClear = setTimeout(() => {
                console.log("timeout");
                onGetDispatch(clearError());
            }, 3500);
            onChangeValue((pre) => pre + 1);
        }
        return () => clearTimeout(idClear);
    }, [error]);
    return (
        <div>
            <Header />
            {!error ? (
                <div className="container">
                    <div className={cx("content", "grid", "wide")}>
                        {children}
                    </div>
                </div>
            ) : (
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            height: "auto",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <img
                            src="https://cdn.dribbble.com/users/2773139/screenshots/11337915/media/7eafda6517c936f4f21031a9da6bcb5c.jpg?compress=1&resize=400x300&vertical=top"
                            alt="err"
                        />
                        {count === 4 && (
                            <div
                                style={{
                                    textAlign: "center",
                                    color: "red",
                                }}
                            >
                                Trang Web Hiện Tại Đang Lỗi. Vui Lòng Quay Trở
                                Lại Sau
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DefaultLayout;
