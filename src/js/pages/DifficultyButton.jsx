
import { setDifficultyAndCreateDeck } from "../shuffle";
import "../../sass/style.scss"

export default function DifficultyButton({ setDeck, setPage, setDisplayNum }) {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    var backgroundSrc = `./images/difficulty${randomNumber}.jpg`;

    return (
        <div className="difficulty-page" style={{ backgroundImage: `url(${backgroundSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center top', backgroundSize: 'cover' }}>
            <div className="difficulty-page-background"></div>
            <div className="difficulty-description">
                Welcome to the Memory Game! Test your memory skills with this fun and challenging
                game. Here’s how to play:
                <br />
                <br />
                Set Difficulty: Choose a difficulty level to create and shuffle the deck.
                <br />
                Select Cards: Pick a card from the displayed options. It will be moved to the selected cards array.
                <br />
                <br />
                Shuffle and Display: The game shuffles and displays a specific number of cards.
                Enjoy the game and improve your memory skills!
            </div>
            <div className="difficulty-btns">
                <button onClick={() => {
                    const newDeck = setDifficultyAndCreateDeck(1);
                    setDeck(newDeck);
                    setPage("game");
                    setDisplayNum(5);
                }}>easy</button>

                <button onClick={() => {
                    const newDeck = setDifficultyAndCreateDeck(2);
                    setDeck(newDeck);
                    setPage("game");
                    setDisplayNum(25);
                }}>medium</button>

                <button onClick={() => {
                    const newDeck = setDifficultyAndCreateDeck(3);
                    setDeck(newDeck);
                    setPage("game");
                    setDisplayNum(56);
                }}>hard</button>
            </div>
        </div>
    );
}