import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('test pokemon component', () => {
  const { averageWeight: { measurementUnit, value },
    image, name, type, id } = pokemons[0]; // pego fora dos testes para poder usar sempre
  it('verify info from specific pokemon', () => {
    renderWithRouter(<App pokemon={ pokemons[0] } isfavorite={ false } />);
    const pokeName = screen.getByText(name);
    expect(pokeName).toBeInTheDocument();
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType).toHaveTextContent(type);
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight).toHaveTextContent(value, measurementUnit);
    const pokeImg = screen.getByRole('img', { name: `${name} sprite` });
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg).toHaveAttribute('src', image);
  });
  it('test link to details', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  it('test if there is a star incon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const starImg = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(starImg).toBeInTheDocument();
    // expect(starImg).toHaveAttribute('className', 'favorite-icon'); nao funciona
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
  });
});