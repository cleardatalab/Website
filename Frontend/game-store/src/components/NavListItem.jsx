import React from 'react';

function NavListItem({ item, navOnClick }) {
  const handleClick = (event) => {
    event.preventDefault(); 
    navOnClick(item.id, item.target);
  };

  return (
    <li>
      <a 
        href="#" 
        className={item.active ? 'active' : ''} 
        onClick={handleClick}
      >
        <i className={`bi ${item.icon}`}></i>
        <span className='navName'>{item.name}</span>
      </a>
    </li>
  );
}

export default NavListItem;
