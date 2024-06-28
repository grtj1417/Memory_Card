import "../../sass/style.scss"

export default function Result({ result, setResult, setPage, setCardArray, setSelectedCardArray }) {
    const _result = result;
    console.log(_result)

    function handleRestart() {
        setResult("");
        setPage("difficulty");
        setCardArray([]);
        setSelectedCardArray([]);
    }

    return (
        <div className="result-page">
            {_result === "lose" && (
                <div className="lose">
                    <h2>You lost</h2>
                    <video autoPlay id="backgroundVideo">
                        <source src="./videos/failed.mp4"></source>
                    </video>
                    <div className="retart-btn">
                        <button onClick={handleRestart}>Restart</button>
                    </div>
                </div>
            )}

            {_result === "win" && (
                <div className="win">
                    <h2>You win</h2>
                    <video autoPlay id="backgroundVideo">
                        <source src="./videos/win.mp4"></source>
                    </video>
                    <div className="retart-btn">
                        <button onClick={handleRestart}>Restart</button>
                    </div>
                </div>
            )}

        </div>
    )
}