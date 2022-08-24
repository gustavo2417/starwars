import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import planetsMocked from './mocks';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';

describe('testes a pagina Principal',() => {
  it('testa se os Input para filtrar estão na tela', () => {
    render(<PlanetsProvider><App /></PlanetsProvider>);
    
    const inputName = screen.getByTestId("name-filter");
    expect(inputName).toBeInTheDocument();
    const select = screen.getByTestId("column-filter");
    expect(select).toBeInTheDocument();
    const selectColumn = screen.getByTestId("comparison-filter");
    expect(selectColumn).toBeInTheDocument();
    const inputValue = screen.getByTestId("value-filter");
    expect(inputValue).toBeInTheDocument();
    const button = screen.getByTestId("button-filter");
    expect(button).toBeInTheDocument();
  });

  it('testa se os resultados da API estão na tela',  async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsMocked),
    });

    render(<PlanetsProvider><App /></PlanetsProvider>);
    
    await waitFor(() => screen.getByText(planetsMocked.results[1].created));

    const tr = screen.getAllByRole('row');
    expect(tr).toHaveLength(11);
  });

  it('testa se um filtro funciona corretamente', async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsMocked),
    });

    render(<PlanetsProvider><App /></PlanetsProvider>);
    
    await waitFor(() => screen.getByText(planetsMocked.results[1].created));
  
    const tr = screen.getAllByRole('row');
    expect(tr).toHaveLength(11);

    const button = screen.getByTestId("button-filter");
    const inputValue = screen.getByTestId("value-filter");

    userEvent.click(button);
  
    const newsTr = screen.getAllByRole('row');
    expect(newsTr).toHaveLength(9);
  
    userEvent.type(inputValue, '1000000')
    userEvent.click(button);
  
    const moreTr = screen.getAllByRole('row');
    expect(moreTr).toHaveLength(1);
  });

  it('testa se o filtro de "menor que" funciona corretamente', async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsMocked),
    });

    render(<PlanetsProvider><App /></PlanetsProvider>);
    
    await waitFor(() => screen.getByText(planetsMocked.results[1].created));

    const tr = screen.getAllByRole('row');
    expect(tr).toHaveLength(11);

    const button = screen.getByTestId("button-filter");
    const selectColumn = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");

    userEvent.selectOptions(selectColumn, 'menor que');
    userEvent.type(inputValue, '1000000')
    userEvent.click(button);

    const newsTr = screen.getAllByRole('row');
    expect(newsTr).toHaveLength(3)
  });

  it('testa se o filtro de "igual a" funciona corretamente', async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsMocked),
    });

    render(<PlanetsProvider><App /></PlanetsProvider>);
    
    await waitFor(() => screen.getByText(planetsMocked.results[1].created));

    const tr = screen.getAllByRole('row');
    expect(tr).toHaveLength(11);

    const button = screen.getByTestId("button-filter");
    const selectColumn = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");

    userEvent.selectOptions(selectColumn, 'igual a');
    userEvent.type(inputValue, '200000')
    userEvent.click(button);

    const newsTr = screen.getAllByRole('row');
    expect(newsTr).toHaveLength(2)
  });

  it('testa se o filtro por nome funciona corretamente', async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(planetsMocked),
    });

    render(<PlanetsProvider><App /></PlanetsProvider>);
    
    await waitFor(() => screen.getByText(planetsMocked.results[1].created));

    const tr = screen.getAllByRole('row');
    expect(tr).toHaveLength(11);

    const inputName = screen.getByTestId("name-filter");

    userEvent.type(inputName, 'Tatooine')

    const newsTr = screen.getAllByRole('row');
    expect(newsTr).toHaveLength(2)
  });
});
