import React, {PureComponent} from "react";

const withError = (Component) => {
  return class WithError extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        errorMessage: ``
      };

      this._handleError = this._handleError.bind(this);
    }

    _handleError(errorText) {
      this.setState({
        errorMessage: errorText,
      });
    }

    render() {
      return (
        <Component {...this.props} errorMessage={this.state.errorMessage} onError={this._handleError} />
      );
    }
  };
};

export default withError;
