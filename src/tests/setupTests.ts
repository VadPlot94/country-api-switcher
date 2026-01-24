// import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';

import * as matchers from '@testing-library/jest-dom/matchers';

import mock18n from './test-utils/i18n.mock';
import mockLocalStorage from './test-utils/local-storage.mock';

expect.extend(matchers);

mockLocalStorage();
mock18n();
