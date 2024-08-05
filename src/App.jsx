import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Card from './components/Card';


function App() {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        if (!response.ok) {
          throw new Error('Network response was not ok');        
        }
          const data = await response.json();
          const names = data.results.map(pokemon => pokemon.name);

          setPokemonNames(names);
      } catch (error) {
        console.log(error);
      } 
    };
    fetchPokemonList();
  }, [])

  

  const getRandomPokemonNames = (names, count) => {
    // Shuffle the array
    const shuffled = names.sort(() => 0.5 - Math.random());
    // Get the first `count` elements from the shuffled array
    return shuffled.slice(0, count);
  };

  const randomNames = getRandomPokemonNames(pokemonNames, 10);

  return (
    <div className="cards">
      {randomNames.map(name => (
          <Card name={name} key={name} />
        ))
      }
    </div>
  )
}

export default App
