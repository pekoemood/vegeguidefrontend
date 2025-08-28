import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '../../components/Spinner';

describe('Spinner Component', () => {
  it('should render spinner element', () => {
    render (<Spinner />)

    const spinnerElement = screen.getByText('', { selector: 'span.loading'})
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('loading', 'loading-spinner', 'loading-xs');
  })
})