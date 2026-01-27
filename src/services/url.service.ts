import i18n from '@i18n-next/i18n';
import { z } from 'zod';

import constants from './constants.service';
import logger from './logger.service';
import type { ICountry } from './providers/types';

class UrlService {
  private baseCountryCodeSchema: z.ZodString = z
    .string()
    .length(3, { message: 'Country code must be exactly 3 letters' })
    .regex(/^[A-Z]{3}$/, {
      message: 'Country code must be 3 uppercase letters (ISO 3166-1 alpha-3)',
    });

  private baseLangSchema: z.ZodPipe<
    z.ZodOptional<z.ZodString>,
    z.ZodTransform<string, string>
  > = z
    .string()
    .length(2, { message: 'Language must be exactly 2 letters' })
    .regex(/^[a-z]{2}$/, {
      message: 'Language code must be 2 lowercase letters',
    })
    .optional()
    .refine((val) => !val || (i18n.options.supportedLngs || []).includes(val), {
      message: 'Unsupported language code',
    })
    .transform((val) => val || constants.DefaultLanguage);

  public getBaseName() {
    //const pathname = window.location.pathname;
    // Github deploy app with specific url
    // Ex: https://{acc_name}.github.io/{repo_name}/ => https://vadplot94.github.io/country-api-switcher/
    // We need to exclude {repo_name} from react routing check
    console.log(process.env.IS_GITHUB_PAGES);
    const isGitHubPages = process.env.IS_GITHUB_PAGES === 'true';
    return isGitHubPages ? '/country-api-switcher' : '/';
    // const possibleRepo = pathname.split('/')[1];
    // const knownRepos = ['country-api-switcher', constants.BaseUrl];

    // return possibleRepo && knownRepos.includes(possibleRepo)
    //   ? `/${possibleRepo}`
    //   : '/';
  }

  public validateCountryCodeParam(
    countryCode: string,
    countriesList?: ICountry[],
  ): z.ZodSafeParseResult<string> {
    const validationSchema =
      Array.isArray(countriesList) && countriesList.length
        ? z
            .string()
            .refine(
              (countryCode) =>
                countriesList.some(({ cca3 }) => cca3 === countryCode),
              { message: 'Invalid ISO 3166-1 alpha-3 country code' },
            )
        : this.baseCountryCodeSchema;

    const validationObj = validationSchema.safeParse(countryCode);

    if (validationObj.error) {
      validationObj.error.issues.forEach((issue: z.core.$ZodIssue) => {
        logger.logError(
          `Country code: '${countryCode}' url param -> ${issue.code}: ${issue.message}`,
        );
      });
    }

    return validationObj;
  }

  public validateLangParam(lang?: string): z.ZodSafeParseResult<string> {
    const validationObj = this.baseLangSchema.safeParse(lang);

    if (validationObj.error) {
      validationObj.error.issues.forEach((issue: z.core.$ZodIssue) => {
        logger.logError(
          `Lang param: '${lang}' url param -> ${issue.code}: ${issue.message}`,
        );
      });
    }

    return validationObj;
  }
}

const urlService = new UrlService();
export default urlService;
