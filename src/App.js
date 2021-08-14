import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import CharacterDetailScreen from './screens/CharacterDetailScreen'
import PageNotFound from './screens/PageNotFound'

function App() {
  return (
    <Router>
    	<Switch>
    		<Route path='/' exact component={HomeScreen} />
    		<Route path='/character-detail/:id' component={CharacterDetailScreen} />
    		<Route default component={PageNotFound} />
    	</Switch>
    </Router>
  );
}

export default App;
