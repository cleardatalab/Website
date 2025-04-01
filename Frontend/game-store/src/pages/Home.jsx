import React, { useState, useEffect } from 'react';
import './home.css';
import GameSwiper from '../components/GameSwiper';
import GameCard from '../components/GameCard';
import filterListData from '../data/filterListData';

function Home({ games, reference }) {
    const [gameSections, setGameSections] = useState([]);
    const [filters, setFilters] = useState(filterListData);
    const [searchText, setSearchText] = useState('');

    const sectionTitles = [
        "Top 10 Games",
        "Games on Promotion",
        "New Arrivals",
        "Trending Now",
        "Top Picks",
        "Hidden Gems",
        "Exclusive Offers",
        "Must-Play Titles",
        "Limited-Time Deals"
    ];

    useEffect(() => {
        if (!games || games.length < 64) return;
    
        const sections = sectionTitles.map((title, i) => {
            if (title === "Top 10 Games") {
                return games.slice(0, 10); 
            }
            return games.slice(i * 8, (i + 1) * 8); 
        });
    
        setGameSections(sections);
    }, [games]);

    const handleSearch = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const getFilteredGames = (section) => {
        if (!searchText) return section;
        return section.filter(game =>
            game.title.toLowerCase().includes(searchText) ||
            game.category.toLowerCase().includes(searchText)
        );
    };

    const handleFilterGames = (category) => {
        setFilters(filters.map(filter => ({
            ...filter,
            active: filter.name === category
        })));
    };

    const getCategoryFilteredGames = (section) => {
        const activeFilter = filters.find(filter => filter.active);
        if (activeFilter && activeFilter.name !== 'All') {
            return section.filter(game => game.category === activeFilter.name);
        }
        return section;
    };

    if (!games || games.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <section id="home" className="home active" ref={reference}>
            <div className="container-fluid">

                <div className="row mb-4">
                    <div className="col-12">
                        <GameSwiper games={games} />
                    </div>
                </div>

                <div className="row align-items-center mb-4">
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6">
                        <div className="search-box">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search games by title or category..."
                                value={searchText}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <ul className="filters">
                            {filters.map((filter) => (
                                <li
                                    key={filter.id}
                                    className={filter.active ? 'active' : undefined}
                                    onClick={() => handleFilterGames(filter.name)}
                                >
                                    {filter.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {gameSections.map((section, index) => {
                    const filteredGames = getCategoryFilteredGames(getFilteredGames(section));

                    return (
                        <div key={index} className="game-section mb-5">
                            <h2 className="sectionTitle">{sectionTitles[index]}</h2>
                            <div className="row">
                                {filteredGames.map(game => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </div>
                        </div>
                    );
                })}

            </div>
        </section>
    );
}

export default Home;
