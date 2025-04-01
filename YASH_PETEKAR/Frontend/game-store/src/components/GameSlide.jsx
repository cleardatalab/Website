import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './gameSwiper.css';

function GameSlide({ game, isPlaying, toggleVideo }) {
    return (
        <div className='gameSlider'>
            <img src={game.img} alt="Game Image" />
            <div className={`video ${isPlaying ? 'active' : ''}`}>
                {isPlaying && (
                    <iframe 
                        width="1280"
                        height="720"
                        src={`${game.trailer}?autoplay=1`} 
                        title={game.title}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
            <div className="content">
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                <div className="buttons">
                    <a href={game.game_url} target="_blank" rel="noopener noreferrer" className='orderBtn'>Download Now</a>
                    <a href="#" 
                        className={`playBtn ${isPlaying ? 'active' : ''}`} 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            toggleVideo();
                        }}
                    >
                        {isPlaying ? (
                            <span className='pause'>
                                <i className='bi bi-pause-fill'></i>
                            </span>
                        ) : (
                            <span className="play">
                                <i className='bi bi-play-fill'></i>
                            </span>
                        )}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default GameSlide;
