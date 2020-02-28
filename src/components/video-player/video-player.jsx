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

  componentDidMount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = () => {
      this.setState({
        isPlaying: true,
      });
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
    const {preview, poster} = this.props;

    return (
      <video ref={this._videoRef}
        width="100%"
        poster={poster} muted>
        <source src={preview}/>
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  preview: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;


