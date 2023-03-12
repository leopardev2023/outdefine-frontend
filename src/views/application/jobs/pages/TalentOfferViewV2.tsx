import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import OfferDetailViewV2 from './OfferDetailViewV2';

import OfferListViewV2 from './OfferListViewV2';

export default function TalentOfferViewV2(): ReactElement {
  return (
    <Routes>
      <Route path='/' element={<OfferListViewV2 />} />
      <Route path='/:offerID' element={<OfferDetailViewV2 />} />
    </Routes>
  );
}
