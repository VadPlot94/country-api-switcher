import { z } from 'zod';
import type { ICountry } from '../providers/types';
import logger from './logger.service';
import i18n from '../i18n/i18n-setup';
import constants from './constants.service';

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
    .refine(val => !val || (i18n.options.supportedLngs || []).includes(val), {
      message: 'Unsupported language code',
    })
    .transform(val => val || constants.DefaultLanguage);

  public validateCountryCodeParam(
    countryCode: string,
    countriesList?: ICountry[],
  ): z.ZodSafeParseResult<string> {
    const validationSchema =
      Array.isArray(countriesList) && countriesList.length
        ? z
            .string()
            .refine(
              countryCode =>
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
