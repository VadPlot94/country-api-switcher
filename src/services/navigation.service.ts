import type { NavigateFunction } from 'react-router-dom';
import type { ICountry } from '../providers/types';
import i18n from '../i18n/i18n-setup';
import constants from './constants.service';

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

  private getLangSegment() {
    return i18n.language === constants.DefaultLanguage ? '' : i18n.language;
  }
}

const navigationService = new NavigationService();
export default navigationService;
