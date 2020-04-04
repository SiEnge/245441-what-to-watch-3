import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import Logo from "../logo/logo.jsx";
import withError from "../../hocs/with-error/with-error.jsx";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this._handleSubmitForm = this._handleSubmitForm.bind(this);
  }

  _validateForm() {
    const {onError} = this.props;
    const login = this.loginRef.current.value;

    if (login.indexOf(`@`) > 0) {
      return true;
    }

    onError(`Please enter a valid email address`);
    return false;
  }

  _handleSubmitForm() {
    const {onSubmit, onError, onHistoryBack} = this.props;
    const isValidate = this._validateForm();

    if (!isValidate) {
      return;
    }

    const authData = {
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    };

    onSubmit(authData, onHistoryBack, onError);
  }

  render() {
    const {errorMessage} = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo classLink={`logo__link`} />

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form"
            onSubmit={(evt) => {
              evt.preventDefault();
              this._handleSubmitForm();
            }}
          >

            {(errorMessage !== ``) && (
              <div className="sign-in__message">
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"
                  ref={this.loginRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"
                  ref={this.passwordRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <Logo classLink={`logo__link logo__link--light`} />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

SignIn.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onHistoryBack: PropTypes.func,
};

export default withError(SignIn);


// по клику можно дедать проверку заполнения формы, если она не заполнена правильно, то показывать ошибку
