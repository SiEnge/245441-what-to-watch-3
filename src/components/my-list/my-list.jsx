import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list.jsx";
import {getFavoriteMovies} from "../../reducer/data/selectors.js";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";

const MyList = (props) => {
  const {movies} = props;
  // debugger;
  // const {onShowMoreButtonClick} = props;

  const onMovieCardClick = (() => {});
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo classLink={"logo__link"} />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock
          isAuth={true}
        />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesList
          movies={movies}
          onMovieCardClick={onMovieCardClick}
        />

      </section>

      <footer className="page-footer">
        <Logo classLink={"logo__link logo__link--light"} />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

MyList.propTypes = {
  // onShowMoreButtonClick: PropTypes.func.isRequired,
};

// export default MyList;

const mapStateToProps = (state) => ({
  movies: getFavoriteMovies(state),
});

// const mapDispatchToProps = ({onShowMoreButtonClick: ActionCreator.incrementPage});

export {MyList};
export default connect(mapStateToProps)(MyList);
