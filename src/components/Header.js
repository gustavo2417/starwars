import React, { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';

function Header() {
  const { setFilterByName } = useContext(planetsContext);

  const handleChange = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  return (
    <div>
      <h1>
        Starwars Planets
      </h1>
      <label htmlFor="filter">
        Pesquise um planeta:
        <input
          type="text"
          data-testid="name-filter"
          name="filter"
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}

export default Header;
