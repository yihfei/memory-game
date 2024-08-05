import { useEffect, useState } from 'react';

const Card = ({ name, onChange }) => {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
                // network errors may still result in fulfilled promise
                
                console.log('Response Status:', response.status); // Log response status

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setPokemon(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [name]);

    if (!pokemon) {
        return (<div>pokemon not available</div>);
    }

    console.log(pokemon);
    const imgURL = pokemon.sprites.other['official-artwork'].front_default;

    return (
        <div className="card" onClick={onChange}>
            <h2>{name}</h2>
            <img src={imgURL} alt="" />
        </div>
    )


}

export default Card;