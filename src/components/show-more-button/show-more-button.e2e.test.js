import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMoreButton from "./show-more-button.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call handler on show more button click`, () => {
  const onShowMoreButtonClick = jest.fn();

  const showMoreButtonWrap = mount(
      <ShowMoreButton
        onShowMoreButtonClick={onShowMoreButtonClick}
      />
  );

  const showMoreButton = showMoreButtonWrap.find(`button.catalog__button`);

  showMoreButton.props().onClick();
  expect(onShowMoreButtonClick.mock.calls.length).toBe(1);
});
