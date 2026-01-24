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

  /* Test will be skipped if use render word in test description.
     Prevent infinite watch loops by vitest */
  it('renders Header and MainPageLayout on main page (/)', () => {
    renderApp();

    // screen.debug();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    const groupElement = screen.getByRole('group');
    expect(groupElement).toHaveClass('filter-dropdown');
  });
});
