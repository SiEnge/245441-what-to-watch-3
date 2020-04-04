import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withError from "./with-error.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div />;
const MockComponentWrapped = withError(MockComponent);

it(`Should change error message on error`, () => {
  const wrapper = shallow(
      <MockComponentWrapped />
  );

  expect(wrapper.props().errorMessage).toEqual(``);
  wrapper.instance()._handleError(`Error`);
  expect(wrapper.props().errorMessage).toEqual(`Error`);
});
