import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const nextPokemon = pokemons.filter((_, i) => i !== 0);
describe('teste o componente Pokedex', () => {
  it('test if exist an h2 with the required message', () => {
    renderWithRouter(<App />);
    const head = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i });
    expect(head).toBeInTheDocument();
  });
  it('test if navegate by pokémons', () => {
    renderWithRouter(<App />);
    const currPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(currPoke).toBeInTheDocument();
    nextPokemon.forEach((poke, i) => {
      userEvent.click(currPoke);
      expect(screen.getByText(poke.name)).toBeInTheDocument();
      expect(screen.queryByText(pokemons[i].name)).not.toBeInTheDocument();
    });
    userEvent.click(currPoke);
    expect(screen.queryByText(pokemons[0].name)).toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
    types.forEach((type) => {
      expect(screen.getByRole('button', { name: type })).toBeInTheDocument();
    });
    const magicNumber = 7;
    const typesBtns = screen.getAllByTestId('pokemon-type-button');
    expect(typesBtns).toHaveLength(magicNumber);
  });
  it('test if have a button to reset filter', () => {
    renderWithRouter(<App />);
    const allPoke = screen.getByRole('button', { name: /all/i });
    expect(allPoke).toBeInTheDocument();
    expect(allPoke).toHaveTextContent('All');
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNext);
    const charmander = screen.getByText('Charmander');
    const pikachu1 = screen.queryByText('Pikachu');
    expect(charmander).toBeInTheDocument();
    expect(pikachu1).not.toBeInTheDocument();
    userEvent.click(allPoke);
    const pikachu2 = screen.getByText('Pikachu');
    expect(pikachu2).toBeInTheDocument();
  });
});