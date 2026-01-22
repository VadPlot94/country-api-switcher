import { Theme } from './constants.service';

class HelperService {
  public getAppThemeFromLocalStorage(): Theme {
    const theme = localStorage.getItem('country-api-switcher-theme') as Theme;
    return Object.values(Theme).includes(theme) ? theme : Theme.DarkMode;
  }
  public setAppThemeToLocalStorage(theme: Theme): void {
    localStorage.setItem('country-api-switcher-theme', theme);
  }
  public updateHtmlTheme(newTheme: Theme) {
    const htmlClassList = document.documentElement.classList;
    Object.values(Theme).forEach((theme) => htmlClassList.remove(theme));
    document.documentElement.classList.add(newTheme);
  }
}

const helperService = new HelperService();
export default helperService;
