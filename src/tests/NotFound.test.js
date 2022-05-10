import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('test NotFound', () => {
  it('Test if exist an h2, with message requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole(
      'heading', { level: 2, name: /page requested not found/i },
    );
    expect(notFound).toBeInTheDocument();
  });
  it('test if shows the required image', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img', { name: /pikachu crying/i });
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});