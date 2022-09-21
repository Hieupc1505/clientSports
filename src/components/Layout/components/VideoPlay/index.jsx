import React from "react";
import ReactPlayer from "react-player/youtube";
import { useSelector } from "react-redux";
import { list as nations } from "../../../GlobelStyles/type";
const VideoPlay = ({ url }) => {
    const { nation } = useSelector((state) => state.sport);
    // const { list } = nations[nation].params;
    // const arrUrl =
    //     typeof url === "string"
    //         ? `https://www.youtube.com/watch?v=${url}`
    //         : url.map((item) => `https://www.youtube.com/watch?v=${item}`);
    // console.log(arrUrl);
    return (
        <div>
            {
                <ReactPlayer
                    playing
                    url={`https://www.youtube.com/watch?v=${url}`}
                    controls={true}
                    config={{
                        youtube: {
                            playerVars: { showinfo: 1 },
                        },
                    }}
                />
            }
        </div>
    );
};

export default VideoPlay;
