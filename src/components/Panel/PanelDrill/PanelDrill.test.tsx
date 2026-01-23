import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PanelDrill } from './PanelDrill';
import type { PanelDrillItem } from './PanelDrill';

describe('PanelDrill', () => {
  const mockStack: PanelDrillItem[] = [
    { id: 'root', label: 'Home', content: <div>Home Content</div> },
    { id: 'settings', label: 'Settings', content: <div>Settings Content</div> },
    { id: 'account', label: 'Account', content: <div>Account Content</div> },
  ];

  it('renders active (last) panel content', () => {
    render(<PanelDrill stack={mockStack} />);
    expect(screen.getByText('Account Content')).toBeInTheDocument();
    expect(screen.queryByText('Home Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings Content')).not.toBeInTheDocument();
  });

  it('renders empty state when stack is empty', () => {
    render(<PanelDrill stack={[]} />);
    expect(screen.getByText('No content')).toBeInTheDocument();
  });

  it('shows breadcrumb when stack has multiple items', () => {
    render(<PanelDrill stack={mockStack} onNavigate={vi.fn()} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('hides breadcrumb when stack has only one item', () => {
    render(
      <PanelDrill
        stack={[{ id: 'root', label: 'Home', content: <div>Home Content</div> }]}
        onNavigate={vi.fn()}
      />
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.getByText('Home Content')).toBeInTheDocument();
  });

  it('hides breadcrumb when showBreadcrumb is false', () => {
    render(<PanelDrill stack={mockStack} showBreadcrumb={false} />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('calls onNavigate when breadcrumb item is clicked', async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();
    render(<PanelDrill stack={mockStack} onNavigate={handleNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Home' }));
    expect(handleNavigate).toHaveBeenCalledWith('root', 0);

    await user.click(screen.getByRole('button', { name: 'Settings' }));
    expect(handleNavigate).toHaveBeenCalledWith('settings', 1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <PanelDrill stack={mockStack} className="custom-class" />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('forwards Panel props', () => {
    const { container } = render(
      <PanelDrill stack={mockStack} data-testid="test-panel" variant="solid" />
    );
    expect(screen.getByTestId('test-panel')).toBeInTheDocument();
  });

  it('forwards ref to Panel', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<PanelDrill ref={ref} stack={mockStack} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders custom breadcrumb separator', () => {
    render(
      <PanelDrill
        stack={mockStack}
        onNavigate={vi.fn()}
        breadcrumbSeparator=">"
      />
    );
    expect(screen.getAllByText('>')).toHaveLength(2);
  });

  it('updates content when stack changes', () => {
    const { rerender } = render(
      <PanelDrill
        stack={[{ id: 'root', label: 'Home', content: <div>Home Content</div> }]}
      />
    );
    expect(screen.getByText('Home Content')).toBeInTheDocument();

    rerender(
      <PanelDrill
        stack={[
          { id: 'root', label: 'Home', content: <div>Home Content</div> },
          { id: 'settings', label: 'Settings', content: <div>Settings Content</div> },
        ]}
      />
    );
    expect(screen.getByText('Settings Content')).toBeInTheDocument();
    expect(screen.queryByText('Home Content')).not.toBeInTheDocument();
  });
});
