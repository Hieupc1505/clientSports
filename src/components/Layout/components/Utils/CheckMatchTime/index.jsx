const list = {
    Sun: "Cn",
    Mon: "Th 2",
    Tue: "Th 3",
    Wed: "Th 4",
    Thus: "Th 5",
    Fri: "Th 6",
    Sat: "Th 7",
};
const checkTimeMatch = function () {
    const checkWeekDay = (time, { code, type }) => {
        const timeNow = new Date();
        const timeMatch = new Date(time);
        if (code === 60 || type === "postponed") return "Tạm hoãn";
        if (
            timeMatch.toDateString() === timeNow.toDateString() &&
            timeMatch.getTime() >= timeNow.getTime()
        ) {
            return `Hôm nay, ${timeMatch.toLocaleDateString("id-GB", {
                day: "2-digit",
                month: "2-digit",
            })}`;
        } else if (
            timeMatch.getTime() > timeNow.getTime() &&
            timeMatch.getTime() < timeNow.getTime() + 1209600000
        ) {
            let d =
                timeMatch.getDate() - timeNow.getDate() === 1
                    ? "Ngày mai "
                    : `${Object.values(list)[timeMatch.getDay()]}`;

            return `${d}, ${timeMatch.toLocaleDateString("id-GB", {
                day: "2-digit",
                month: "2-digit",
            })}`;
        } else if (timeMatch.getTime() < timeNow.getTime()) {
            if (timeMatch.getTime() + 90 * 60 * 1000 > timeNow.getTime())
                return "Trực tiếp";
            return "KT";
        } else
            return `${timeMatch.toLocaleDateString("id-GB", {
                day: "2-digit",
                month: "2-digit",
            })}`;
    };
    const checkTime = (time, { code, type }) => {
        const timeMatch = new Date(time);
        const timeNow = new Date();
        if (code === 60 || type === "postponed") {
            return `${
                Object.values(list)[timeMatch.getDay()]
            }, ${timeMatch.toLocaleDateString("id-GB", {
                day: "2-digit",
                month: "2-digit",
            })}`;
        }
        if (timeNow.getTime() > timeMatch.getTime()) {
            if (
                timeMatch.getTime() < timeNow.getTime() &&
                timeMatch.getTime() > timeNow.getTime() - 1209600000
            ) {
                let d =
                    timeNow.getDate() - timeMatch.getDate() === 1
                        ? "Hôm qua "
                        : `${Object.values(list)[timeMatch.getDay()]}`;
                return `${d}, ${timeMatch.toLocaleDateString("id-GB", {
                    day: "2-digit",
                    month: "2-digit",
                })}`;
            } else {
                return `${timeMatch.toLocaleDateString("id-GB", {
                    day: "2-digit",
                    month: "2-digit",
                })}`;
            }
        } else
            return timeMatch.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
            });
    };

    return { checkTime, checkWeekDay };
};

export default checkTimeMatch;
