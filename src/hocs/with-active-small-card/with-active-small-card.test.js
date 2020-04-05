import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import {withActiveSmallCard} from "./with-active-small-card.jsx";
import {noop} from "../../const.js";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

const MockComponentWrapped = withActiveSmallCard(MockComponent);

it(`withActiveSmallCard is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      activeSmallCard={1}
      onSmallCardHover={noop}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
