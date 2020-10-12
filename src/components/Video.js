import React from "react";
import '../styles/video.css';

class Video extends React.Component {
    render() {
        return (
            <video className="video" controls autoPlay muted>
                <source src="https://d1104ewo8apaup.cloudfront.net/video/207d2d6903e6957e0c6125b4f45eb9bfxw5yowt7.mp4"
                    type="video/mp4" />
            </video>
        );
    };
}

export default Video;