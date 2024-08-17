import { useEffect, useState } from 'react';

const Card = ({ name, onChange, onError }) => {
    const [pokemon, setPokemon] = useState(null);
    const [isFlipped, setIsFlipped] = useState(true);
    const [imgURL, setImgURL] = useState('');

    
    useEffect(() => {
        setIsFlipped(true);
        const fetchData = async() => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
                // network errors may still result in fulfilled promise
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPokemon(data);
                setImgURL(data.sprites.other['official-artwork'].front_default);
                setIsFlipped(false);
            } catch (error) {
                console.log(error);
                onError(name); 
            }
        }
        fetchData();
    }, []);

    


    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => {onChange(name); setIsFlipped(true);}}>
            <div className="card-front">
                {pokemon && (
                    <>
                        <h2>{name}</h2>
                        <img src={imgURL} alt={name} />
                    </>
                )}
            </div>
            <div className="card-back">
                <img src='src/assets/cardback.webp' />
            </div>
        </div>
    )


}

export default Card;