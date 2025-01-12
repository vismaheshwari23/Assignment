import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputBox from '../components/InputBox/InputBox';

jest.useFakeTimers();

describe('InputBox Component', () => {
  it('renders correctly', () => {
    render(<InputBox onSearch={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText('Search here');
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('updates search input value correctly', () => {
    render(<InputBox onSearch={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText('Search here');
    fireEvent.change(inputElement, { target: { value: 'React' } });

    expect(inputElement).toHaveValue('React');
  });

  it('calls onSearch with correct value after delay', () => {
    const mockOnSearch = jest.fn();
    render(<InputBox onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search here');
    fireEvent.change(inputElement, { target: { value: 'React' } });

    jest.advanceTimersByTime(600);

    expect(mockOnSearch).toHaveBeenCalledWith('React');
  });
});
