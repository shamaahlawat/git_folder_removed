// Must have at least one test file in this directory or Mocha will throw an error.
import React from 'react';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<p>testing component</p>, div);
});
