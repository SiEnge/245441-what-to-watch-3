import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import {withActiveTab} from "../witn-active-tab/witn-active-tab.jsx";
import {activeTab} from "../../utils/test.utils.js";

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

const MockComponentWrapped = withActiveTab(MockComponent);


it(`withActiveTab is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      activeTab={activeTab}
      onClickTab={() => {}}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
