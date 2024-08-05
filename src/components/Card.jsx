import { useEffect, useState } from 'react';

const Card = ({ name, onChange }) => {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
                // network errors may still result in fulfilled promise
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPokemon(data);
            } catch (error) {
                console.log(error);
                setError('Failed to load data');
            }
        }
        fetchData();
    }, [name]);

    if (error) {
        return null;
    }

    if (!pokemon) {
        return (<div>pokemon not available</div>);
    }

    const imgURL = pokemon.sprites.other['official-artwork'].front_default;

    return (
        <div className="card" onClick={() => onChange(name)}>
            <h2>{name}</h2>
            <img src={imgURL} alt="" />
        </div>
    )


}

export default Card;