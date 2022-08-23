import React, { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';

function Header() {
  const {
    setFilterByName,
    setNumericFilters,
    PodeMudar,
    planetsFiltered,
    setPlanetsFiltered,
    numericFilters,
  } = useContext(planetsContext);

  const handleChange = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const handleChanceFilters = ({ target }) => {
    const { name, value } = target;
    setNumericFilters({ ...numericFilters, [name]: value });
  };

  const filterByNumbers = () => {
    const { column, comparison, value } = numericFilters;
    PodeMudar(true);
    if (comparison === 'maior que') {
      setPlanetsFiltered(planetsFiltered.filter(
        (planet) => Number(planet[column]) > Number(value),
      ));
    } if (comparison === 'menor que') {
      setPlanetsFiltered(planetsFiltered.filter(
        (planet) => Number(planet[column]) < Number(value),
      ));
    } if (comparison === 'igual a') {
      setPlanetsFiltered(planetsFiltered.filter(
        (planet) => Number(planet[column]) === Number(value),
      ));
    }
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
      <div>
        <select
          name="column"
          value={ numericFilters.column }
          data-testid="column-filter"
          onChange={ handleChanceFilters }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison"
          value={ numericFilters.comparison }
          data-testid="comparison-filter"
          onChange={ handleChanceFilters }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          name="value"
          type="number"
          value={ numericFilters.value }
          onChange={ handleChanceFilters }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ filterByNumbers }
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}

export default Header;
