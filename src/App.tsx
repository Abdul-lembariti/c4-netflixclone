import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Header from './Components/Header'
import Tv from './Routes/Tv'
import Search from './Routes/Search'
import Home from './Routes/Home'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
