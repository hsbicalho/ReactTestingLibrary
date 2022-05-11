import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing App.js', () => {
  test('Test if exist the link Nav Bar', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
  test('Test if redirect to home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    history.push('/');
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });
  test('Test if redirect to About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    history.push('/about');
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });
  test('Test if redirect to Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavoritePokemons);
    history.push('/favorites');
    expect(screen.getByText('Favorite pokémons')).toBeInTheDocument();
  });
  test('Test if redirect to Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/agumon');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
