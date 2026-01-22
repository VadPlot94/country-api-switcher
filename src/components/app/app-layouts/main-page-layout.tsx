import '../app.scss';
import '@i18n-next/i18n';

import { useSearchParams } from 'react-router-dom';

import CountriesList from '../../countries-list/countries-list';
import VirtualCountriesList from '../../countries-list/virtual/virtual-countries-list';
import FilterDropdown from '../../filter/filter-dropdown';
import Search from '../../search/search';

const MainPageLayout = () => {
  const [searchParams] = useSearchParams();

  const isVirtualTable = searchParams.get('virtualTable') === 'true';
  return (
    <div className="app__countries-layout-container">
      <div className="app__container-header">
        <Search />
        <FilterDropdown />
      </div>
      <div className="app__container-content">
        {isVirtualTable ? <VirtualCountriesList /> : <CountriesList />}
      </div>
    </div>
  );
};

export default MainPageLayout;
