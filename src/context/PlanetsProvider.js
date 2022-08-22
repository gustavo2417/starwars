import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  const contextPlanets = {
    filterByName, planets, setFilterByName,
  };

  useEffect(() => {
    const planetsRequest = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const request = await fetch(URL);
      const response = await request.json();
      response.results.forEach((element) => delete element.residents);
      setPlanets(response.results);
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
