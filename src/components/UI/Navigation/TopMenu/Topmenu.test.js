import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavLink } from 'react-router-dom';
import TopMenu from './TopMenu';

configure({adapter: new Adapter()});

describe('TopMenu UI Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TopMenu />);
  });
  
  it('should render 3 navigation items', () => {
    expect(wrapper.find(NavLink)).toHaveLength(3);
  });
});
