import React from "react";
import Video from "./Video";
import sampleVideo from '../sample-payload.json';
import '../styles/video.css';

class VideoSwiper extends React.Component {
    constructor(props) {
        super(props);
        this.timeDown = '';
        this.xDown = '';
        this.yDown = '';
        this.xDiff = 0;
        this.yDiff = 0;
        this.state = {
            activeVideo: 0,
        }
    }

    handleTouchStart = (e) => {
        this.timeDown = Date.now();
        this.xDown = e.touches[0].clientX;
        this.yDown = e.touches[0].clientY;
        this.xDiff = 0;
        this.yDiff = 0;
    }

    handleTouchEnd(e) {
        const swipeThreshold = parseInt(20, 10);
        const swipeTimeout = parseInt(500, 10);
        const timeDiff = Date.now() - this.timeDown;
        let eventType = '';

        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
            if (Math.abs(this.xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (this.xDiff > 0) {
                    eventType = 'swiped-left';
                }
                else {
                    eventType = 'swiped-right';
                }
            }
        }
        else if (Math.abs(this.yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
            if (this.yDiff > 0) {
                eventType = 'swiped-up';
            }
            else {
                eventType = 'swiped-down';
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
        console.log('sampleVideo=>', sampleVideo);
        return (
            <div
                className='container'
                id="gestureZone"
                onTouchStart={(e) => this.handleTouchStart(e)}
                onTouchEnd={(e) => this.handleTouchEnd(e)}
                onTouchMove={(e) => this.handleTouchMove(e)}
            >
                {/* <Video /> */}
                {/* <Video style={{ 'background-color': 'red' }} />
                <Video style={{ 'background-color': 'green' }} /> */}
            </div>
        );
    };
}

export default VideoSwiper;