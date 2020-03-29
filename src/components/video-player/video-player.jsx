import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";


class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: false
    };
  }

  componentWillUnmount() {
    let video = this._videoRef.current;

    video.oncanplaythrough = null;
    video = null;
  }

  // вызывается при обновлении компонента
  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  render() {
    const {poster, preview} = this.props;

    return (
      <video ref={this._videoRef}
        width="100%"
        onCanPlayThrough={() => this.setState({
          isPlaying: true
        })}
        poster={poster}
        muted
        >
        <source src={preview}/>
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  preview: PropTypes.string.isRequired,
  previewVideo: PropTypes.string.isRequired,
};

export default VideoPlayer;



// export default withActiveFlag(VideoPlayer);
