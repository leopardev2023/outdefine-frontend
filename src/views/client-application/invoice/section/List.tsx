import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import { updateInvoiceDetail } from "redux/slices/application";

import Welcome from "assets/welcome/welcome.png";
import SelectBox from "../components/SelectBox";
import rightArrowCircle from "assets/svg/arrow-circle-right.svg";
import clockIcon from "assets/svg/invoice/clock-icon.svg";
import completedIcon from "assets/svg/invoice/completed-icon.svg";
import starbucksSVG from "assets/svg/application/starbucks.svg";
import { Modal } from "components/Modal";
import closeSVG from "assets/svg/assessment/close.svg";
import applicationApi from "network/application";
import profileAPI from "network/profile";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const pageNumber = {
  list: 0,
  create: 1,
  edit: 2,
  newVoice: 3,
  view: 4,
};

// const invoiceData = { invoice_id: "1234567890#", type: "due", name: "Sarah Smith", userAvatar: "Sarah", job: "Blockchain engineer", dueBy: "01/05/2022", amount: 1000 };

const filters = [
  "Due invoices",
  "Paid invoices",
  "Upcoming invoices",
  "Overdue invoices",
];
const invoiceHeaders = [
  "Invoice#",
  "Date issued",
  "Date due",
  "Amount",
  "Sent to",
];

export interface Props {
  setNextStepPage: (enabled: number) => void;
}

const List = ({ setNextStepPage }: Props) => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.companyprofile.id);
  const clientId = useAppSelector((state) => state.companyprofile.client_id);

  const [invoiceHistory, setInvoiceHistory] = useState<any | null>(null);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [isQus, setQus] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("Due invoices");
  const [companyList, setCompanyList] = useState<any>([]);
  const [invoiceResult, setInvoiceResult] = useState<any>({});
  const [talentList, setTalentList] = useState<any>([]);
  const [invoiceData, setInvoiceData] = useState<any>();
  const [talent, setTalent] = useState<any>();

  const diff_minutes = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 3600 * 24;
    // return Math.abs(Math.round(diff));
    return Math.round(diff);
  };

  const filterList = (invoiceList: Array<any>) => {
    const dueList: any = [];
    const paidList: any = [];
    const upcomingList: any = [];
    const overdueList: any = [];

    const today = new Date();
    invoiceList?.filter((item) => {
      if (item.invoice_type == "paid") {
        paidList.push(item);
      } else if (
        diff_minutes(
          new Date(item["date_due"]),
          new Date(new Date().toISOString().slice(0, 10))
        ) < 0
      ) {
        overdueList.push(item);
        // } else if (diff_minutes(new Date(item["date_due"]), today) > 0) {
      } else if (
        diff_minutes(
          new Date(item["date_due"]),
          new Date(new Date().toISOString().slice(0, 10))
        ) == 0
      ) {
        dueList.push(item);
      } else {
        upcomingList.push(item);
      }
    });

    const invoiceRst = {
      "Due invoices": dueList,
      "Paid invoices": paidList,
      "Upcoming invoices": upcomingList,
      "Overdue invoices": overdueList,
    };
    setInvoiceResult(invoiceRst);
  };

  const init = async () => {
    const companyListObj = await applicationApi.getCompanyList();
    setCompanyList(companyListObj);
    const invoiceList = await applicationApi.getInvoiceListByCompanyId(
      companyId
    );
    filterList(invoiceList);
    const talents = await applicationApi.getTalentListByCompanyId(companyId);
    setTalentList(talents);
  };

  useEffect(() => {
    init();
  }, []);

  const checkInvoice = async (item) => {
    if (filter !== "Paid invoices") {
      setInvoiceData(item);
      const profile = await profileAPI.getUserProfile(
        "freelancer",
        item.freelancer_id
      );
      setTalent(profile);
      setModalOpen(!modalOpen);
    } else {
      toast.custom(<Toast type="warning" message="You already paid" />);
    }
  };

  return (
    <Wrapper
      header_title="Invoices"
      ban_title="Invoices"
      ban_content="In invoices you can see upcoming, and due invoices and pay them accordingly. Use the drop down filter to toggle between due invoices, upcoming invoicces and already paid invoices."
      ban_img={Welcome}
    >
      <div className="mt-[46px] flex gap-x-[30px] font-inter">
        <div className="flex flex-col">
          <div className="mt-8">
            <h1 className="font-poppins text-black font-semibold text-xl">
              Active talent
            </h1>
            <div className="mt-5 flex flex-row gap-x-[73px]">
              {talentList?.length > 0 &&
                talentList?.map((row: any, index: number) => (
                  <div className="flex flex-col">
                    <img
                      alt="starbucks"
                      src={row.User.avatar}
                      className="w-[100px] h-[100px] rounded-full shadow-3xl border bg-white border-white"
                    />
                    <span className="font-semibold mt-3">
                      Name: {row.User.first_name + " " + row.User.last_name}
                    </span>
                    <span>
                      Start:{" "}
                      {new Date(row.start_term).toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                    <span>
                      End:{" "}
                      {new Date(row.end_term).toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[52px]">
        <div className="flex justify-between relative">
          <h1 className="font-poppins text-black font-semibold text-xl">
            Invoices
          </h1>
        </div>
        <div className="mt-5">
          <span>
            To pay an invoice press the arrow "
            <img
              alt="arrow-right"
              className="cursor-pointer w-5 h-5 inline"
              src={rightArrowCircle}
            />
            " to see the details of the invoice then press “pay invoice” on the
            bottom. To pay a known reoccuring invoice right away just press the
            “pay” button. To sort through invoices, use the “sort by” filter
            below.
          </span>
        </div>
        <div className="mt-[60px] w-full shadow-3xl rounded-[15px] pl-[29px] pt-3 pb-5 pr-[43px] border border-primary">
          <div className="flex justify-start font-semibold mb-[15px] items-center">
            <span>Sort by: </span>
            <SelectBox
              list={filters}
              className="shadow-none w-[150px] text-sm"
              placeholder=""
              selected={filter}
              onSelect={setFilter}
            />
          </div>

          <table className="w-full mx-auto font-inter font-bold ">
            <>
              <thead className="border-b-2 border-primary text-sm">
                {invoiceHeaders.map((item) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody className="text-xs w-full">
                {invoiceResult[filter]?.length > 0 &&
                  invoiceResult[filter]?.map(
                    (row: any, index: number) =>
                      // (row.amount > filter) &&
                      row.amount > 0 && (
                        <tr>
                          <td className="flex justify-center items-center gap-x-2">
                            <img
                              alt="starbucks"
                              src={starbucksSVG}
                              className="w-[35px] h-[35px] rounded-full shadow-3xl border bg-white border-white"
                            />
                            {row.slug}
                          </td>
                          <td>
                            {new Date(row.date_issued)
                              .toISOString()
                              .slice(0, 10)}
                          </td>
                          <td>
                            {new Date(row.date_due).toISOString().slice(0, 10)}
                          </td>
                          <td>{row.amount}</td>
                          <td>
                            {companyList.map((item) => {
                              if (item.company_id == row.company_id) {
                                return item.name;
                              }
                            })}
                          </td>
                          <td>
                            <div className="flex justify-end items-center gap-x-3">
                              {row.invoice_type == "paid" && (
                                <span>
                                  <img
                                    alt="completedIcon"
                                    className="completedIcon"
                                    src={completedIcon}
                                  />
                                </span>
                              )}
                              <button
                                className="bg-theme text-white py-1 px-4 font-[14px] flex gap-x-2 font-inter"
                                onClick={() => {
                                  checkInvoice(row);
                                }}
                              >
                                {filter == "Overdue invoices" && (
                                  <img
                                    alt="clockIcon"
                                    className="clockIcon"
                                    src={clockIcon}
                                  />
                                )}
                                {filter == "Due invoices"
                                  ? "Pay"
                                  : filter == "Paid invoices"
                                  ? "Completed"
                                  : filter == "Upcoming invoices"
                                  ? "Upcoming pay"
                                  : "Overdue pay"}
                              </button>
                              <button
                                className="font-[14px] flex gap-x-2"
                                onClick={() => {
                                  dispatch(
                                    updateInvoiceDetail({
                                      amount: row?.amount,
                                      charges: row?.charges,
                                      company_id: row?.company_id,
                                      date_due: row?.date_due,
                                      date_issued: row?.date_issued,
                                      freelancer_id: row?.freelancer_id,
                                      other_charges: row?.other_charges,
                                      position: row?.position,
                                      invoice_number: row?.invoice_number,
                                      invoice_type: row?.invoice_type,
                                    })
                                  );
                                  setNextStepPage(pageNumber.view);
                                }}
                              >
                                <img
                                  alt="arrow-right"
                                  className="cursor-pointer"
                                  src={rightArrowCircle}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                  )}
              </tbody>
            </>
          </table>
        </div>
      </div>
      <Modal isOpen={modalOpen}>
        <div className="flex flex-col items-center w-[550px] bg-white rounded-[15px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-[140px]">
          <div className="">
            <button
              className="absolute right-6 top-6"
              onClick={() => setModalOpen(false)}
            >
              <img src={closeSVG} alt="" />
            </button>
            <h2 className="font-poppins font-extrabold text-[20px] mt-5 text-center">
              Pay invoice
            </h2>
          </div>
          <div className="invoiceItem w-full overflow-scroll my-5 font-poppins">
            <div>
              <div className="flex justify-start items-center gap-x-[37px] mt-5">
                <img
                  alt="starbucks"
                  className="w-[55px] h-[55px] rounded-full shadow-3xl border bg-white border-white"
                />
                <div className="flex flex-col">
                  {/* <span className='font-extrabold'>{invoiceData.freelancer_name}</span> */}
                  <span className="font-extrabold">freelancer_name</span>
                  <span className="text-sm">
                    {/* {invoiceData.freelancer_job} */}
                    freelancer_job
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full gap-y-10 justify-between items-center gap-x-[37px] mt-5 text-sm">
                <span className="font-extrabold">Amount Due</span>
                <span>${invoiceData?.amount}</span>
                <span className="font-extrabold">Due by</span>
                <span>
                  {/* {new Date(invoiceData.date_received).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })} */}
                  {new Date(invoiceData?.date_due).toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-x-10 justify-center items-center">
            <button
              className="bg-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] text-white px-5 py-2 mt-10 mb-10 w-auto"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Pay invoice
            </button>
            <button
              className="text-theme shadow-3xl rounded-[25px] font-inter font-bold text-[16px] px-5 py-2 mt-10 mb-10 w-auto border-2 border-theme"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </Wrapper>
  );
};

export default List;
