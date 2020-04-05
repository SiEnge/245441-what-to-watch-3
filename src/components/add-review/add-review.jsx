import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {getActiveMovie} from "../../reducer/data/selectors.js";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";
import withError from "../../hocs/with-error/with-error.jsx";
import withDisabledForm from "../../hocs/with-disabled-form/with-disabled-form.jsx";

const CountSimbolsTextarea = {
  MIN: 50,
  MAX: 400,
};

const Disabled = {
  TRUE: true,
  FALSE: false,
};

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.commentRef = createRef();
    this.formRef = createRef();

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _validateForm() {
    const {onError} = this.props;
    const rating = this.formRef.current.rating.value;
    const comment = this.commentRef.current.value;
    const errors = [];

    if (rating === ``) {
      errors.push(`select rating`);
    }

    if (comment.length < CountSimbolsTextarea.MIN) {
      errors.push(`text must be at least ${CountSimbolsTextarea.MIN} characters`);
    }

    if (errors.length === 0) {
      return true;
    }

    onError(`Warning: ${errors.join(`, `)}`);
    return false;
  }

  _handleFormSubmit() {
    const {onSubmit, onHistoryBack, onDisabledForm, onError} = this.props;
    const isValidate = this._validateForm();

    if (!isValidate) {
      return;
    }

    const reviewData = {
      movieId: this.props.movie.id,
      rating: this.formRef.current.rating.value,
      comment: this.commentRef.current.value,
    };

    onDisabledForm(Disabled.TRUE);

    const onSuccessSubmit = () => {
      onDisabledForm(Disabled.FALSE);
      onHistoryBack();
    };

    const onErrorSubmit = () => {
      onDisabledForm(Disabled.FALSE);
      onError(`Oops... Please, try again :)`);
    };

    onSubmit(reviewData, onSuccessSubmit, onErrorSubmit);
  }

  render() {
    const {movie: {title, poster, background}, onBackButtonClick, errorMessage, isDisabledForm} = this.props;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={background} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo classLink={`logo__link`} />

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a onClick={onBackButtonClick} href="movie-page.html" className="breadcrumbs__link">{title}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <UserBlock
              isAuth={true}
            />
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={poster} alt={title} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form"
            onSubmit={(evt) => {
              evt.preventDefault();
              this._handleFormSubmit();
            }}
            ref={this.formRef}
          >

            {errorMessage !== `` &&
              <p style={{color: `black`, textAlign: `center`}} >{errorMessage}</p>
            }
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" disabled={isDisabledForm} />
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" disabled={isDisabledForm} />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" disabled={isDisabledForm} defaultChecked/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" disabled={isDisabledForm} />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" disabled={isDisabledForm} />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
                disabled={isDisabledForm}
                ref={this.commentRef}
                minLength={CountSimbolsTextarea.MIN}
                maxLength={CountSimbolsTextarea.MAX}
              />
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={isDisabledForm}>Post</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    poster: PropTypes.string,
    background: PropTypes.string,
  }),

  errorMessage: PropTypes.string,
  isDisabledForm: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  onDisabledForm: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onHistoryBack: PropTypes.func,
};

const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
});

export {AddReview};

const enhance = compose(
    withError,
    withDisabledForm,
    connect(mapStateToProps)
);

export default enhance(AddReview);
