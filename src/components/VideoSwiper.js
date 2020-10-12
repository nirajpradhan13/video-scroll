import React from "react";
import Video from "./Video";
import sampleVideo from '../sample-payload.json';
import '../styles/video.css';
import { SWIPE_THRESHOLD, SWIPE_TIMEOUT } from "../constant";
import VideoInfoCard from "./VideoInfoCard";

class VideoSwiper extends React.Component {
    constructor(props) {
        super(props);
        this.timeDown = '';
        this.xDown = '';
        this.yDown = '';
        this.xDiff = 0;
        this.yDiff = 0;
        this.state = {
            activeVideoIndex: 0,
            showInfoCard: false,
        }
    }

    handleNextVideo = () => {
        const { activeVideoIndex } = this.state;
        if (activeVideoIndex < sampleVideo.length) {
            this.setState({ activeVideoIndex: activeVideoIndex + 1 });
            this.setShowInfoCard(false);
        }
    }

    handlePrevVideo = () => {
        const { activeVideoIndex } = this.state;
        if (activeVideoIndex !== 0) {
            this.setState({ activeVideoIndex: activeVideoIndex - 1 });
            this.setShowInfoCard(false);
        }
    }

    setShowInfoCard = (showInfoCard) => {
        this.setState({ showInfoCard })
    }

    handleTouchStart = (e) => {
        this.timeDown = Date.now();
        this.xDown = e.touches[0].clientX;
        this.yDown = e.touches[0].clientY;
        this.xDiff = 0;
        this.yDiff = 0;
    }

    handleTouchEnd(e) {
        const swipeThreshold = parseInt(SWIPE_THRESHOLD, 10);
        const swipeTimeout = parseInt(SWIPE_TIMEOUT, 10);
        const timeDiff = Date.now() - this.timeDown;
        let eventType = '';

        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
            if (Math.abs(this.xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (this.xDiff > 0) {
                    eventType = 'swiped-left';
                    this.setShowInfoCard(true)
                }
                else {
                    eventType = 'swiped-right';
                    this.setShowInfoCard(false)
                }
            }
        }
        else if (Math.abs(this.yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
            if (this.yDiff > 0) {
                eventType = 'swiped-up';
                this.handleNextVideo();
            }
            else {
                eventType = 'swiped-down';
                this.handlePrevVideo();
            }
        }

        if (eventType !== '') {
            console.log('eventType=>', eventType);
        }

        // reset values
        this.xDown = null;
        this.yDown = null;
        this.timeDown = null;
    }

    handleTouchMove(e) {
        if (!this.xDown || !this.yDown) return;
        const xUp = e.touches[0].clientX;
        const yUp = e.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;
    }

    render() {
        const { activeVideoIndex, showInfoCard } = this.state;
        const activeVideo = sampleVideo[activeVideoIndex];
        const {
            id: key = '',
            video: { originalUrl: source } = {},
            channel: { user: { name = '' } = {} } = {},
        } = activeVideo;
        console.log('activeVideoIndex=>', activeVideoIndex);
        console.log('sampleVideo=>', activeVideo);
        console.log('key=>', key);
        console.log('source=>', source);
        return (
            <div
                className='container'
                onTouchStart={(e) => this.handleTouchStart(e)}
                onTouchEnd={(e) => this.handleTouchEnd(e)}
                onTouchMove={(e) => this.handleTouchMove(e)}
            >
                {!showInfoCard && (
                    <Video
                        key={key}
                        source={source}
                        onEnded={this.handleNextVideo}
                    />
                )}
                {showInfoCard && (
                    <VideoInfoCard name={name} />
                )}
            </div>
        );
    };
}

export default VideoSwiper;
