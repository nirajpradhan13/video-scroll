import React from "react";
import PropTypes from 'prop-types';
import '../styles/video.css';

class Video extends React.Component {

    componentWillUnmount = () => {
        this.pauseVideo();
    };

    getVideoRef = elem => {
        this.video = elem
    }

    playVideo = () => {
        this.video.play()
    };

    pauseVideo = () => {
        this.video.pause();
    };

    render() {
        const { controls, autoPlay, muted, source, onEnded } = this.props;
        return (
            <video
                className="video"
                ref={this.getVideoRef}
                controls={controls}
                autoPlay={autoPlay}
                muted={muted}
                onEnded={() => onEnded()}
            >
                <source
                    src={source}
                    type="video/mp4"
                />
            </video>
        );
    };
}

Video.propTypes = {
    controls: PropTypes.bool,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    source: PropTypes.string,
};

Video.defaultProps = {
    controls: true,
    autoPlay: true,
    muted: true,
    source: '',
};

export default Video;