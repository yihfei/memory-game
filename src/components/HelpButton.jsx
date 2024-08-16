import { useState } from 'react';

const HelpButton = () => {
    const [showInstruction, setShowInstructions] = useState(false);

    const openInstructions = () => {
        setShowInstructions(true);
    }

    const closeInstructions = () => {
        setShowInstructions(false);
    }
    return (
        <>
            <button onClick={openInstructions} className="help">
                HELP
            </button>
            {showInstruction && <Overlay closeInstructions={closeInstructions} />}
        </>
        
    )
}

const Overlay = ({ closeInstructions }) => {
    return (
        <div className="overlay">
            <div className="instructions">
                Select different Pokémon cards without repeating any card.
                <br></br>
                The score will be the number of consecutive different Pokémons selected!
            </div>

            <button onClick={closeInstructions}>close</button>
        </div>
    )
}

export default HelpButton;