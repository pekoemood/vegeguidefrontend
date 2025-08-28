import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../components/Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>テストボタン</Button>);
    expect(screen.getByRole('button', { name: 'テストボタン'})).toBeInTheDocument();
  });

  it('applies className', () => {
    render(<Button className='custom-class'>テスト</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリック</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
}); 