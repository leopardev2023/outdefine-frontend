import TabV2 from "components/V2/Tab/TabV2";

import NewOfferPanelV2 from "../panels/Panel.NewOfferV2";
import DeclinedOfferV2 from "../panels/Panel.DeclinedOfferV2";
import WithdrawnOfferV2 from "../panels/Panel.WithdrawnOfferV2";
import AcceptedOfferPanelV2 from "../panels/Panel.AcceptedOfferV2";

export default function OfferListViewV2() {
  return (
    <div className="px-2 py-[80px] lg:p-[100px]">
      <h1 className='font-bold text-xl leading-[30px] mt-[60px]'>Offers</h1>
      <TabV2
        wrapperAsFragment
        addClass='w-full mt-14'
        tabClass='w-[124px] h-11 font-poppins font-semibold text-xs'
        tabs={["New offers", "Accepted", "Declined", "Withdrawn"]}
        contents={[
          <NewOfferPanelV2 />,
          <AcceptedOfferPanelV2 />,
          <DeclinedOfferV2 />,
          <WithdrawnOfferV2 />,
        ]}
      />
    </div>
  );
}
