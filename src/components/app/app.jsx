import React from "react";
import Main from "../main/main.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {promoMovie} = props;

  return (
    <Main
      promoMovie={promoMovie}
    />
  );
};


export default App;
