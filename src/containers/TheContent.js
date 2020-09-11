import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
import { loggedIn } from '../utils/auth.js';
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class AuthRequiredRoute extends Route{
  /**
   * inherit from Router gives us possibility to reload render method and redirect
   * not logged users to login page.
   * @example <AuthRequiredRoute path="/" component={UserStatus}>
   */

    render() {
        if(!loggedIn()){
            return <Redirect to="/login"/>
        }else{
           let component = super.render();
          return component
        }
    }
}



const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <AuthRequiredRoute
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
