import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Card from './components/Card';


function App() {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemonCards, setPokemonCards] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
        if (!response.ok) {
          throw new Error('Network response was not ok');        
        }
          const data = await response.json();
          const names = data.results.map(pokemon => pokemon.name);

          setPokemonNames(names);
          setLoading(false); 
      } catch (error) {
        console.log(error);
        setLoading(false); 
      } 
    };
    fetchPokemonList();
    
  }, [])

  useEffect(() => {
    const fetchAndSetPokemonCards = async () => {
      const cardPromises = pokemonNames.map(async (name) => {
        try {
          // Fetch Pokemon data to validate the name
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // If the fetch is successful, return the card component
          return <Card name={name} onChange={onChange} key={name} />;
        } catch (error) {
          // Log the error and return null if there's an issue
          console.error(`Failed to fetch data for ${name}:`, error);
          return null;
        }
      });

      // Wait for all card promises to resolve
      const cardsWithStatus = await Promise.all(cardPromises);

      // Filter out null values (failed fetches) from the cards array
      setPokemonCards(cardsWithStatus.filter(card => card !== null));
    };

    if (!loading) {
      fetchAndSetPokemonCards();
    }
  }, [pokemonNames, loading]);

  useEffect(() => {
    if (new Set(selectedNames).size !== selectedNames.length) {
      setBestScore(Math.max(currentScore, bestScore));
      setCurrentScore(-1);
      setSelectedNames([]);
    } else {
      setCurrentScore(currentScore + 1);      
    }
  }, [selectedNames]);

  const increaseScore = () => {
    setCurrentScore(prevScore => prevScore + 1);
  }

  const getRandomPokemonCards = (cards, count) => {
    // Shuffle the array
    const shuffled = cards.sort(() => 0.5 - Math.random());
    // Get the first `count` elements from the shuffled array
    return shuffled.slice(0, count);
  };


  const onChange = (name) => {
    setSelectedNames(prevSelectedNames => [...prevSelectedNames, name]);
  }

  const randomCards = getRandomPokemonCards(pokemonCards, 10);

  return (
    <>
      <header>
        <h2>best score: {bestScore}</h2>
        <h2>current score: {currentScore}</h2>
      </header>
      <div className="cards">
        {randomCards.length > 0 ? randomCards : <p>Loading cards...</p>}
      </div>
    </>
    
  )
}

export default App
