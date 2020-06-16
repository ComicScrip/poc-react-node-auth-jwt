import React, { useContext, useState } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import SecretPage from './SecretPage'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  // const {token} = useContext(AuthContext)
  const token = null
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken'))
  const setTokenInLocalStorage = (token) => {
    localStorage.setItem('authToken', token)
    setToken(token)
  }

  let userNameFromToken = null
  if (token) {
    userNameFromToken = jwtDecode(token).sub || null
  }

  return (
    <div className="App">
        {userNameFromToken && 
          <div>
            <p>Welcome back {userNameFromToken} !</p>
            <button onClick={() => setTokenInLocalStorage('')}>Log out</button>
          </div>
        }
        <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/secret">Show me a secret</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <PrivateRoute path="/secret">
              <SecretPage />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
      </div>
  );
}

export default App;
