import {Route, Switch} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './components/Account'
import PopularPage from './components/PopularPage'
import MovieDetailPage from './components/MovieDetailPage'
import Search from './components/Search'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/popular" component={PopularPage} />
    <ProtectedRoute
      exact
      path="/movies-app/movies/:id"
      component={MovieDetailPage}
    />
    <ProtectedRoute exact path="/search" component={Search} />
    <Route component={NotFound} />
  </Switch>
)

export default App
