import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "app/store";
import { useAppSelector } from "redux/hooks/redux-hooks";
import IconButton from "components/V2/IconButton";
import { NavLink } from "react-router-dom";
import {
  getJobPostingByCompanyID,
  removeJobPosting,
} from "redux/slices/companyJobs";

// components
import Heading from "components/Heading/HeadingV2";
import Button from "components/Button/ButtonV2";
import ModalV2 from "components/Modal/ModalV2";
import JobCardV2 from "../components/Card.JobV2";

// import svgs
import { ReactComponent as EditSvg } from "assets/V2/svg/edit.svg";
import { ReactComponent as CloseSvg } from "assets/V2/svg/close-dark.svg";

import JobPostFormV2 from "../components/Form.CreateJobV2";
import IconButtonV2 from "components/V2/IconButton";
import IconV2 from "components/V2/Icons";
import EmptyPanelV2 from "./Panel.EmptyV2";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const CompanyJobPanelV2: React.FC = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const companyProfile = useSelector((root: RootState) => root.companyprofile);

  const {
    id: companyID,
    company: { logo: companyLogo, ...rest },
  } = companyProfile;

  const companyJobStore = useSelector((root: RootState) => root.companyjob);

  const [searchParam, setSearchParam] = useSearchParams();

  const { userRole } = useAppSelector((state) => state.authentication);

  const [modal, setModal] = useState<IJobPostingModal>({
    data: {
      primary_skills: "",
      secondary_skills: "",
    },
    type: "CREATE",
    visibility: false,
  });
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    if (companyID === undefined) return;
    companyJobStore.busy !== true &&
      dispatch(getJobPostingByCompanyID(companyID));
  }, [companyID]);

  useEffect(() => {
    searchParam.get("action") === "create" &&
      setModal({
        type: "CREATE",
        visibility: true,
        data: {
          primary_skills: "",
          secondary_skills: "",
        },
      });
  }, [searchParam]);

  const closeModalHandler = () => {
    setModal({ ...modal, visibility: false, data: {} });
    searchParam.get("action") === "create" && setSearchParam("tab=job");
  };

  const removeHandler = async (id?: number, company_id?: number) => {
    if (id === undefined || company_id === undefined) {
      return;
    }
    const result = await dispatch(removeJobPosting({ id, company_id }));

    setModal({
      visibility: false,
      data: {
        primary_skills: "",
        secondary_skills: "",
      },
      type: "CREATE",
    });

    if (companyJobStore.success === false) {
      toast.custom(<Toast type="error" message="There was an error" />);
      return;
    }
    if (result.payload.success) {
      toast.custom(<Toast type="success" message="Successfully removed a job posting!" />);
    }
  };

  return (
    <>
      {companyJobStore.active.length === 0 && (
        <EmptyPanelV2
          className="pt-[52px] mt-[68px] mb-20 h-[446px]"
          title="No jobs have been posted"
          description="Start filling up your open roles by creating job posts."
          image={"common/spaceboy/astro-computer.png"}
          imageAltText="astro computer"
        >
          <Button
            onClick={() =>
              setModal({
                type: "CREATE",
                data: {
                  primary_skills: "",
                  secondary_skills: "",
                },
                visibility: true,
              })
            }
            className="mt-5"
          >
            Create a job
          </Button>
        </EmptyPanelV2>
      )}

      {companyJobStore.active.length > 0 && (
        <div className="mt-[68px] mb-20 w-full rounded-lg bg-white pt-[28px] pb-7 pl-14 shadow-card" data-cy="client-job-container">
          <div className="flex items-center justify-between pr-14 font-poppins font-semibold text-xl leading-[30px]" data-cy="client-job-label">
            Jobs
            <div className="flex gap-[10px]">
              {!editable ? (
                <>
                  <IconButtonV2
                    onClick={() =>
                      setModal({ ...modal, type: "CREATE", visibility: true })
                    }
                    iconType="ADD"
                    iconClassName="w-4 h-4"
                  />
                  <IconButtonV2
                    onClick={() => setEditable(true)}
                    iconType="EDIT"
                    iconClassName="w-4 h-4"
                  />
                </>
              ) : (
                <button
                  className="w-8 h-8 flex"
                  onClick={() => setEditable(false)}
                >
                  <IconV2
                    iconType={"CLOSE"}
                    iconClassName="block m-auto w-5 h-5"
                  />
                </button>
              )}
            </div>
          </div>
          <div className="mt-12 pr-6 relative">
            <div className="pr-9">
              {companyJobStore.active.map((posting: IJobPostingV2, index) => (
                <JobCardV2
                  {...posting}
                  companyLogo={companyLogo}
                  key={"job posting" + index}
                  editable={editable}
                >
                  {!editable && userRole && (
                    <div className="min-w-[200px] flex flex-col items-end justify-between">
                      <div className="flex gap-4 items-center"></div>
                      {userRole === "Client" && (
                        <NavLink to={"job/" + posting.id}>
                          <Button className="w-fit pl-8 pr-4 flex items-center gap-1">
                            View job
                            <IconV2
                              iconClassName="w-6 h-4"
                              iconType="ARROW-RIGHT"
                            />
                          </Button>
                        </NavLink>
                      )}
                    </div>
                  )}

                  {/* Button Group On Edit status */}
                  {editable && (
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() =>
                          setModal({
                            type: "EDIT",
                            data: companyJobStore.active[index],
                            visibility: true,
                          })
                        }
                        className="w-8 h-8 rounded bg-[#F4F4F4] flex"
                      >
                        <EditSvg className="w-4 h-4 m-auto" />
                      </button>
                      <button
                        onClick={() =>
                          setModal({
                            type: "DELETE",
                            data: companyJobStore.active[index],
                            visibility: true,
                          })
                        }
                        className="font-semibold text-sm leading-[21px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </JobCardV2>
              ))}
            </div>
          </div>
        </div>
      )}

      <ModalV2 onClose={closeModalHandler} isOpen={modal.visibility}>
        {["CREATE", "EDIT"].includes(modal.type) && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            className="overflow-x-hidden w-[720px] pb-20 absolute left-1/2 top-[150px] -translate-x-1/2 z-10"
          >
            <JobPostFormV2
              onClose={closeModalHandler}
              data={modal.data}
              editType={modal.type}
              onSubmit={(success: boolean) => {
                setModal({
                  visibility: false,
                  data: {
                    primary_skills: "",
                    secondary_skills: "",
                  },
                  type: "CREATE",
                });
                searchParam.get("action") === "create" &&
                  setSearchParam("tab=job");

                if (success) {
                  toast.custom(<Toast type="success" message={modal.type === "CREATE" ? "Successfully created a new job posting!" : "Successfully updated"} />);
                } else {
                  toast.custom(<Toast type="error" message="Sorry, there was an error, try again" />);
                }
              }}
            />
          </div>
        )}

        {modal.type === "DELETE" && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            className="overflow-x-hidden w-[650px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="w-full rounded-lg bg-white p-[45px_36px_36px_36px] relative flex flex-col">
              <CloseSvg
                onClick={closeModalHandler}
                className="cursor-pointer w-5 h-5 absolute top-6 right-8"
              />

              <Heading
                variant="h6"
                className="text-xl leading-[30px] font-semibold text-center"
              >
                Confirm removal
              </Heading>
              <p className="font-poppins text-sm leading-4 mt-4 mb-5 text-center">
                Confirm removal of job post below
              </p>
              <JobCardV2 {...modal.data} companyLogo={companyLogo} />
              <Button
                onClick={() =>
                  removeHandler(modal.data.id, modal.data.company_id)
                }
                loading={companyJobStore.busy}
                className="mx-auto w-fit min-w-[160px]"
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </ModalV2>
    </>
  );
};

export default CompanyJobPanelV2;
