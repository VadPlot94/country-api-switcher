import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('usehooks-ts', () => {
  return {
    useMediaQuery: vi.fn(),
  };
});

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

  it('shows Header', () => {
    renderApp();

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  /* Test will be skipped if use render word in test description.
     Prevent infinite watch loops by vitest */
  it('shows MainPageLayout on main page (/)', () => {
    renderApp();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    const groupElement = screen.getByRole('group');
    expect(groupElement).toHaveClass('filter-dropdown');
  });

  it('shows MainPageLayout on main page (/) and Country List when query param `virtualTable === false`', () => {
    renderApp();
    const regionElement = screen.getByRole('region');
    expect(regionElement).toHaveClass('countries-list');
  });

  // it('shows MainPageLayout on main page (/) and Virtual Country List when query param `virtualTable === true`', () => {
  //   vi.mocked(useMediaQuery).mockReturnValue(true);
  //   renderApp(['/?virtualTable=true'], []);

  //   screen.debug();
  //   const regionElement = screen.getByRole('region');
  //   expect(regionElement).toHaveClass('virtual-countries-list');
  // });
});
