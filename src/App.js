import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import landinPage from './components/LandinPage';
import CreatePokemon from './components/CreatePokemon'
import pokeDetail from './components/PokeDetail'

function App(){
  return (
    <BrowserRouter>
      <div  className="App">
        <Switch>
          <Route exact path="/" component={landinPage} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={CreatePokemon} />
          <Route path="/pokemons/:id" component={pokeDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
