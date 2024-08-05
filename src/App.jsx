import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Card from './components/Card';


function App() {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemonCards, setPokemonCards] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        if (!response.ok) {
          throw new Error('Network response was not ok');        
        }
          const data = await response.json();
          const names = data.results.map(pokemon => pokemon.name);

          setPokemonNames(names);
          setPokemonCards(pokemonNames.map(name => (
            <Card name={name} onChange={onChange} key={name} />
          )))
      } catch (error) {
        console.log(error);
      } 
    };
    fetchPokemonList();
    
  }, [])

  

  const getRandomPokemonCards = (cards, count) => {
    // Shuffle the array
    const shuffled = cards.sort(() => 0.5 - Math.random());
    // Get the first `count` elements from the shuffled array
    return shuffled.slice(0, count);
  };

  const onChange = (name) => {
    setPokemonNames([...pokemonNames, name])
  }

  const randomCards = getRandomPokemonCards(pokemonCards, 10);

  return (
    <div className="cards">
      {randomCards}
    </div>
  )
}

export default App
