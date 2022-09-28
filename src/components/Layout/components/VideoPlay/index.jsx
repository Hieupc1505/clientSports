import React from "react";
import ReactPlayer from "react-player/youtube";
import { useSelector } from "react-redux";
// import { list as nations } from "../../../GlobelStyles/type";
const VideoPlay = ({ url, setLinkVideo }) => {
    const { nation } = useSelector((state) => state.sport);

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
                    height={"100%"}
                    width={"100%"}
                    style={{
                        "max-height": "360px",
                    }}
                />
            }
        </div>
    );
};

export default VideoPlay;
