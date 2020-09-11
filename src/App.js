import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import './scss/style.scss';

import { loggedIn } from './utils/auth.js';

import Dashboard from './views/dashboard/Dashboard';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));



class AuthRequiredRoute extends Route{
  /**
   * inherit from Router gives us possibility to reload render method and redirect
   * not logged users to login page.
   * @example <AuthRequiredRoute path="/" component={UserStatus}>
   */

    render() {
        if(loggedIn()){
            return <Redirect to="/"/>
        }else{
          let component = super.render();
          return component
        }
    }
}

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <AuthRequiredRoute exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <AuthRequiredRoute exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
