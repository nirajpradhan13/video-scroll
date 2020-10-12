import React from "react";
import Video from "./Video";
import '../styles/video.css';

class VideoSwiper extends React.Component {
    render() {
        return (
            <div className='container' id="gestureZone">
                <Video style={{ 'background-color': 'coral' }} />
                <Video style={{ 'background-color': 'red' }}/>
                <Video style={{ 'background-color': 'green' }}/>
            </div>
        );
    };
}

export default VideoSwiper;