import React, {PureComponent} from "react";

const TabsType = {
  OVERVIEW: `Overview`,
  DETAIL: `Details`,
  REVIEWS: `Reviews`
};

export const withActiveTab = (Component) => {
  return class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeTab: TabsType.OVERVIEW
      };

      this._handleTabClick = this._handleTabClick.bind(this);
    }

    _handleTabClick(evt) {
      evt.preventDefault();
      const tab = evt.currentTarget;

      this.setState({
        activeTab: tab.dataset.name,
      });
    }

    render() {
      return (
        <Component {...this.props} activeTab={this.state.activeTab} onClickTab={this._handleTabClick} />
      );
    }
  };
};
