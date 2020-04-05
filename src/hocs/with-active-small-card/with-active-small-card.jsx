import React, {PureComponent} from "react";
const VIDEO_DELAY = 1000;

export const withActiveSmallCard = (Component) => {
  return class WithActiveSmallCard extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeSmallCard: -1,
      };

      this._handleCardHover = this._handleCardHover.bind(this);
    }

    _handleCardHover(id) {
      if (id !== this.state.activeSmallCard) {
        if (id === -1) {
          this.setState({
            activeSmallCard: id,
          });
        } else {
          setTimeout(() => {
            this.setState({
              activeSmallCard: id,
            });
          }, VIDEO_DELAY);
        }
      }
    }

    render() {
      return (
        <Component {...this.props} activeSmallCard={this.state.activeSmallCard} onSmallCardHover={this._handleCardHover} />
      );
    }
  };
};
