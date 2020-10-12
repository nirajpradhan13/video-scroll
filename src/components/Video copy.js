import React from "react";
import '../styles/video.css';

class VideoDemo extends React.Component {

    componentDidMount = () => {
        // this.playVideo();
    };

    componentWillUnmount = () => {
        this.pauseVideo();
    };

    getVideo = elem => {
        this.video = elem
    }

    playVideo = () => {
        this.video.play()
    };

    pauseVideo = () => {
        this.video.pause();
    };

    render = () => {
        return (
            <div>
                <video className="video" ref={this.getVideo} controls autoPlay muted>
                    <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4" />
                </video>
            </div>
                
        );
    };
}

export default VideoDemo;