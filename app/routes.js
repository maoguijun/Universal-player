/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import MenuList from './components/Menu/Menu';
import Video from './containers/Video';

export default () => (
  <App>
    <MenuList />
    <Switch>
      <Route path={routes.COUNTER} component={Video} />
    </Switch>
  </App>
);
