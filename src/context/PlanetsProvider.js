import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [numericFilters, setNumericFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filter, setFilter] = useState({});
  const [mudar, PodeMudar] = useState(false);
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const contextPlanets = {
    filterByName,
    planets,
    setFilterByName,
    numericFilters,
    setNumericFilters,
    filter,
    setFilter,
    mudar,
    PodeMudar,
    planetsFiltered,
    setPlanetsFiltered,
    options,
    setOptions,
  };

  useEffect(() => {
    const planetsRequest = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const request = await fetch(URL);
      const response = await request.json();
      response.results.forEach((element) => delete element.residents);
      setPlanets(response.results);
      setPlanetsFiltered(response.results);
    };
    planetsRequest();
  }, []);

  return (
    <PlanetsContext.Provider value={ contextPlanets }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
