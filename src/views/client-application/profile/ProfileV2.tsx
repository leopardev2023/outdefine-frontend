import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import BannerV2 from './components/BannerV2';

import ClientProfileViewV2 from './pages/View.ClientProfileV2';
import CompanyProfileViewV2 from './pages/View.CompanyProfileV2';

const ClientProfileV2: React.FC = (): ReactElement => {
  return (
    <main className='w-full h-full overflow-x-hidden overflow-y-scroll flex'>
      <div className='flex flex-col max-w-[1040px] w-full mx-auto'>
        <BannerV2 />
        <Routes>
          <Route path='/' element={<CompanyProfileViewV2 />} />
          <Route path='/myprofile' element={<ClientProfileViewV2 />} />
        </Routes>
      </div>
    </main>
  );
};

export default ClientProfileV2;
