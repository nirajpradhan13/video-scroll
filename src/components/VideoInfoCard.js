import React from "react";
import PropTypes from 'prop-types';

class VideoInfoCard extends React.PureComponent {
    render() {
        const { name } = this.props;
        return (
            <div>
                <h3>{name}</h3>
            </div>
        );
    }
}

VideoInfoCard.propTypes = {
    name: PropTypes.string.isRequired,
};

export default VideoInfoCard;