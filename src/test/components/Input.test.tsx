import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../../components/Input';

describe('Input', () => {
  it('render with placeholder', () => {
    render(<Input id='test-input' placeholder='入力してください' />)
    expect(screen.getByPlaceholderText('入力してください')).toBeInTheDocument();
  });

  it('applies className', () => {
    render(<Input id='test-input' className='custom-class' />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  } );

  it('call onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Input id='test-input' onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    const testValue = 'テスト';

    fireEvent.change(input, { target: { value: testValue }});
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue(testValue);
  });
})