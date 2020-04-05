import React, {PureComponent} from "react";

const withDisabledForm = (Component) => {
  return class WithDisabledForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isDisabledForm: false,
      };

      this._handleDisabledForm = this._handleDisabledForm.bind(this);
    }

    _handleDisabledForm(isDisabled) {
      this.setState({
        isDisabledForm: isDisabled,
      });

    }

    render() {
      return (
        <Component {...this.props} isDisabledForm={this.state.isDisabledForm} onDisabledForm={this._handleDisabledForm} />
      );
    }
  };
};

export default withDisabledForm;
