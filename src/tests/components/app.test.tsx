import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@services/navigation.service', () => ({
  default: { init: vi.fn(), removeFirstSegmentFromPath: vi.fn(() => null) },
}));

vi.mock('@services/url.service', () => ({
  default: { validateLangParam: vi.fn(() => ({ success: true })) },
}));

// vi.mock('../../components/header/header', () => ({
//   default: () => <header data-testid="header">Header</header>,
// }));

import renderApp from '../test-utils/app-render.mock';

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Header', () => {
    renderApp();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('render MainPageLayout on main page (/)', async () => {
    renderApp();

    // screen.debug();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    const groupElement = screen.getByRole('group');
    expect(groupElement).toHaveClass('filter-dropdown');
  });
});
