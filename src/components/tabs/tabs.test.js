import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {TabsType} from "../../const.js";
import {movie, comments} from "../../utils/test.utils.js";

it(`Render Tabs Overview`, () => {
  const tree = renderer
    .create(<Tabs
      movie={movie}
      activeTab={TabsType.OVERVIEW}
      comments={comments}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Tabs Detail`, () => {
  const tree = renderer
    .create(<Tabs
      movie={movie}
      activeTab={TabsType.DETAIL}
      comments={comments}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Tabs Reviews`, () => {
  const tree = renderer
    .create(<Tabs
      movie={movie}
      activeTab={TabsType.REVIEWS}
      comments={comments}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

