import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router';
import Card from '../../components/Card';

const mockProps = {
  id: 1,
  name: 'キャベツ',
  image: 'test-image.jpg',
  description: 'おいしい野菜です',
  season: true,
  price: 200,
  rate: 5,
};

describe('Card Component', () => {
  const renderCard = (props = mockProps) => {
    return render(
      <BrowserRouter>
        <Card {...props} />
      </BrowserRouter>
    );
  };

  it('should render card with correct content', () => {
    renderCard();

    expect(screen.getByText('キャベツ')).toBeInTheDocument();
    expect(screen.getByText('200円/kg')).toBeInTheDocument();
    expect(screen.getByText('おいしい野菜です')).toBeInTheDocument();
    expect(screen.getByText('旬の野菜')).toBeInTheDocument();
    expect(screen.getByText('5%(先週比)')).toBeInTheDocument();

    const image = screen.getByAltText('キャベツ') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('test-image.jpg');
  });

  it('should render price trend correctly when rate is negative', () => {
    renderCard({ ...mockProps, rate: -5 });
    expect(screen.getByText('-5%(先週比)')).toBeInTheDocument();
  })
})
