import React, {useState ,useEffect } from 'react'
import './categories.css'
import filterListData from '../data/filterListData'
import GameCard from '../components/GameCard'

function Categories({games, reference}) {

  const [data, setData] = useState(games)


  const [filters, setFilters] = useState(filterListData);
  const handleFilterGames = (category) => {
    setFilters(
      filters.map((filter) => {
        filter.active = false;
        if (filter.name === category) {
          filter.active = true;
        }
        return filter;
      })
    );
    if (category === 'All') {
      setData(games);
    } else {
      setData(games.filter((game) => game.category === category)); // Filter games based on category
    }
  };
    
  const [text, setText] = useState('');
  const handleSearchGames = (e) => {
    setData(games.filter(game =>
      game.title.toLowerCase().includes(e.target.value.toLowerCase())
    ));
    setText(e.target.value);
  };
  
  return (
    <section id='categories' className='categories' ref={reference}>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-end align-items-center"></div>
            <div className="col-lg-6 d-flex justify-content-end align-items-center">
              <div className="search">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  value={text}
                  onChange={handleSearchGames}
                  placeholder="Search games..."
                />
              </div>
            </div>
        </div>
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-start align-items-center">
            <ul className="filters">
              {filters.map((filter) => (
                <li
                  key={filter.id}
                  className={`${filter.active ? 'active' : undefined}`}
                  onClick={() => handleFilterGames(filter.name)}
                >
                  {filter.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
        {data.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories

