import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './gameSwiper.css';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import GameSlide from './GameSlide';

function GameSwiper({ games }) {
    const [playingIndex, setPlayingIndex] = useState(null); // Track which game is playing

    const handleToggleVideo = (index) => {
        setPlayingIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <Swiper
            effect="coverflow"
            grabCursor={true}
            navigation={true}
            loop={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
                rotate: 35,
                stretch: 200,
                depth: 250,
                modifier: 1,
                slideShadows: true,
            }}
            modules={[EffectCoverflow, Navigation]}
            className="gameSwiper"
        >
            {games.slice(0, 10).map((game, index) => (
                <SwiperSlide key={game.id}>
                    <GameSlide
                        game={game}
                        isPlaying={playingIndex === index}
                        toggleVideo={() => handleToggleVideo(index)}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default GameSwiper;
