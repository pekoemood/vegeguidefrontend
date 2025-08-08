import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hello from '../components/Hello';
import React from 'react';

describe('Hello Component', () => {
  it('should render "Hello, Vitest! text', () => {
    render(<Hello />);


    const headingElement = screen.getByText(/Hello, Vitest!/i);

    expect(headingElement).toBeInTheDocument();
  });
});