import "../../sass/style.scss"

export default function Home({ setPage }) {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    return (
        <div className="home-page">
            <div className="home-page-title">Memory Card Game</div>

            <a href="#" className="btn btn--action" onClick={() => setPage("difficulty")}><span>Start</span></a>

            <div className="black-mask"></div>
            <img className="home-background" src={`./images/home${randomNumber}.jpg`} alt="" />
        </div>
    )
}