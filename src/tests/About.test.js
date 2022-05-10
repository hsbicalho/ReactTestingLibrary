import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testing About.js component', () => {
  test('test if there is the required information', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('Test if the page contains a h2 with thext about Pokédex', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });
  test('Test if exist two paragraph on the page', () => {
    renderWithRouter(<About />);
    const aboutPokedex1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutPokedex1).toBeInTheDocument();
    const aboutPokedex2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(aboutPokedex2).toBeInTheDocument();
  });
  test('Test if exist the required image', () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img', { name: 'Pokédex' });
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});