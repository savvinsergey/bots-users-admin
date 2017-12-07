import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import Main from './components/main.react';
import UsersList from './components/users-list.react';
import UserForm from './components/user-form.react';

export default (
  <Route path="/" component={Main}>
    <IndexRedirect to="users" />
    <Route exact path="users" component={UsersList} />
    <Route exact path="user/:id" component={UserForm} />
  </Route>
);
