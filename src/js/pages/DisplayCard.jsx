import { useState, useEffect } from "react";
import { shuffle, selectCard } from "../shuffle.js";
import "../../sass/style.scss"

export default function DisplayCard({ cardArray, selectedCardArray, setCardArray, setSelectedCardArray, setPage, setResult, displayNum }) {
    const [displayCards, setDisplayCards] = useState([]);
    const [backgroundSrc, setBackgroundSrc] = useState("");
    const [score, setScore] = useState(0);

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 4) + 1;
        const initialBackgroundSrc = `./images/game_background${randomNumber}.jpg`;
        setBackgroundSrc(initialBackgroundSrc);
    }, []);

    useEffect(() => {
        const _displayCards = shuffle(cardArray, selectedCardArray);
        setDisplayCards(_displayCards);
    }, [cardArray, selectedCardArray]);

    const handleCardClick = (idx) => {
        //判斷輸
        if (selectedCardArray.includes(displayCards[idx])) {
            setPage("result");
            setResult("lose");
            return;
        }

        var _score = score + 1;
        setScore(_score);

        const [newCardArray, newSelectedCardArray] = selectCard(displayCards[idx], [...cardArray], [...selectedCardArray]);

        //判斷贏
        if (newCardArray.length === 0) {
            setPage("result");
            setResult("win");
            return;
        }

        setCardArray(newCardArray);
        setSelectedCardArray(newSelectedCardArray);
    };

    return (
        <div 
            className="display-cards" 
            style={{ backgroundImage: `url(${backgroundSrc})`, 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center top', 
            backgroundSize: 'cover' }}
        >

            <div className="cards">
                {displayCards.map((e, idx) => (
                    <img
                        key={e}
                        className="card-content"
                        src={`./images/${e}.webp`}
                        alt={`${e}.webp`}
                        onClick={() => handleCardClick(idx)}
                    />
                ))}
            </div>

            <div className="score">
                Score : {score} / {displayNum}
            </div>
        </div>
    );
}