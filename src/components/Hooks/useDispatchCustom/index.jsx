import { useDispatch, useSelector } from "react-redux";

const useDispatchCustom = () => {
    const dispatch = useDispatch();
    const dataBySelector = useSelector((state) => state.sport);
    const onGetDispatch = (action, depen = false) => {
        if (depen) return dispatch(action);
        dispatch(action);
    };
    return { onGetDispatch, dataBySelector };
};

export default useDispatchCustom;
