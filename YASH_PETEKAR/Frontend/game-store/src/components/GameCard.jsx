import React, { useContext } from 'react';
import './gameCard.css';
import { AppContext } from '../App';

function GameCard({ game }) {
  const { library, setLibrary } = useContext(AppContext);

  const handleAddToLibrary = (e, game) => {
    e.preventDefault();
    setLibrary([...library, game]);
  };

  const handleRemoveFromLibrary = (game) => {
    setLibrary(library.filter(item => item.id !== game.id)); 
  };

  return (
    <div className='col-xl-3 col-lg-4 col-md-6'>
      <div className='gameCard'>
          <img src={game.img} alt="" className='img-fluid' />
          <div className="gameTitle mt-4 mb-3">
              {game.title}
          </div>
          <a
            className={`like ${library.some((item) => item.id === game.id) ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                if (library.some((item) => item.id === game.id)) {
                    handleRemoveFromLibrary(game);
                } else {
                    handleAddToLibrary(e, game);
                }
            }}
          >
              <i className="bi bi-heart-fill"></i>
          </a>
          <div className="buttons">
            <button 
              onClick={() => window.open(game.game_url, "_blank")} 
              className="downloadBtn" 
              type="button"
            >
              Download Now 
              <i className="bi bi-download" style={{ marginLeft: '10px' }}></i>
            </button>
          </div>
      </div>
    </div>
  );
}

export default GameCard;
