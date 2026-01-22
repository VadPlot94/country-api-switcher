import i18n from '@i18n-next/i18n';
import type { Location, NavigateFunction } from 'react-router-dom';

import constants from './constants.service';
import type { ICountry } from './providers/types';

class NavigationService {
  private navigate: NavigateFunction;

  public init(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  public navigateToCountry(country: ICountry, replaceHistory?: boolean): void {
    if (country) {
      this.navigate?.(`${this.getLangSegment()}/country/${country.cca3}`, {
        state: country,
        replace: replaceHistory,
      });
    } else {
      this.navigateToMainPage();
    }
  }

  public navigateToMainPage(isOpenFromUrl?: boolean): void {
    if (isOpenFromUrl) {
      this.navigate?.(`/${this.getLangSegment()}`);
    } else {
      this.navigate?.(-1);
    }
  }

  public removeFirstSegmentFromPath(location: Location): string {
    return `/${location.pathname.split('/').slice(2).filter(Boolean).join('/')}${location.search}`;
  }

  private getLangSegment() {
    return i18n.language === constants.DefaultLanguage ? '' : i18n.language;
  }
}

const navigationService = new NavigationService();
export default navigationService;
