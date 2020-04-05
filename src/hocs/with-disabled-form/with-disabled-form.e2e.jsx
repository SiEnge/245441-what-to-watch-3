import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withDisabledForm from "./with-disabled-form.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div />;
const MockComponentWrapped = withDisabledForm(MockComponent);

it(`Should change error message on error`, () => {
  const wrapper = shallow(
      <MockComponentWrapped />
  );

  expect(wrapper.props().isDisabledForm).toEqual(false);
  wrapper.instance()._handleDisabledForm(true);
  expect(wrapper.props().isDisabledForm).toEqual(true);
});
