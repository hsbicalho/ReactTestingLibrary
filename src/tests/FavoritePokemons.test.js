import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing Favorites Pokemons', () => {
  test('Test if shows message no favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFav = screen.getByText('No favorite pokemon found');
    expect(notFav).toBeInTheDocument();
  });
  test('tests if all cards are displayed', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const clickFavPok = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    userEvent.click(clickFavPok);
    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavoritePokemons);
    expect(screen.getByText(/Average weight/i)).toBeInTheDocument();
  });
});
