import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavItem } from './NavItem';

describe('NavItem', () => {
  it('renders with label', () => {
    render(<NavItem label="Dashboard" />);
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const icon = <span data-testid="test-icon">🏠</span>;
    render(<NavItem icon={icon} label="Home" />);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders without icon', () => {
    render(<NavItem label="Settings" />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('applies active state', () => {
    render(<NavItem label="Active Item" active />);
    const button = screen.getByRole('button', { name: 'Active Item' });
    expect(button).toHaveAttribute('aria-current', 'page');
  });

  it('does not apply active state when inactive', () => {
    render(<NavItem label="Inactive Item" active={false} />);
    const button = screen.getByRole('button', { name: 'Inactive Item' });
    expect(button).not.toHaveAttribute('aria-current');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<NavItem label="Clickable" onClick={handleClick} />);
    
    const button = screen.getByRole('button', { name: 'Clickable' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<NavItem label="Custom" className="custom-class" />);
    const button = screen.getByRole('button', { name: 'Custom' });
    expect(button.className).toContain('custom-class');
  });

  it('uses custom aria-label when provided', () => {
    render(<NavItem label="Nav" ariaLabel="Navigate to dashboard" />);
    expect(screen.getByRole('button', { name: 'Navigate to dashboard' })).toBeInTheDocument();
  });

  it('uses label as aria-label when custom not provided', () => {
    render(<NavItem label="Dashboard" />);
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
  });
});
