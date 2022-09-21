import { useState } from "react";

const useStateCustom = (initValue) => {
    const [value, setValue] = useState(initValue);

    const bind = {
        value,
        onToggle: () => {
            setValue(!value);
        },
        onChangeValue: (newV) => {
            setValue(newV);
        },
    };

    const reset = () => {
        setValue(initValue);
    };

    return [value, bind, reset];
};

export default useStateCustom;
