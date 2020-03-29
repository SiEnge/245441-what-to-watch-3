import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getActiveMovie} from "../../reducer/data/selectors.js";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";

const COUNT_SIMBOLS_TEXTAREA = {
  Min: 50,
  Max: 400,
};

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.commentRef = createRef();
    this.formRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      movieId: this.props.movie.id,
      rating: this.formRef.current.rating.value,
      comment: this.commentRef.current.value,
    });
  }

  render() {
    const {movie: {title, poster, background}} = this.props;

    return (
      <section className="movie-card movie-card--full">
      <div className="movie-card__header">
         <div className="movie-card__bg">
          <img src={background} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo classLink={"logo__link"} />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="movie-page.html" className="breadcrumbs__link">{title}</a>
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
          onSubmit={this.handleSubmit}
          ref={this.formRef}
          >
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
              ref={this.commentRef}
              minLength={COUNT_SIMBOLS_TEXTAREA.Min}
              maxLength={COUNT_SIMBOLS_TEXTAREA.Max}
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>

    </section>
    );
  }
}



AddReview.propTypes = {
};

const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
});

export {AddReview};
export default connect(mapStateToProps)(AddReview);
