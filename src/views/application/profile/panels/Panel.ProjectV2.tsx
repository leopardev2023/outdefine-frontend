import { ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { removeProfilePortfolioBatch } from "redux/slices/profile";
import { useSearchParams } from "react-router-dom";

import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";

import IconButton from "components/V2/IconButton";
import Heading from "components/Heading/HeadingV2";
import ModalV2 from "components/Modal/ModalV2";
import Button from "components/Button/ButtonV2";
import IconV2 from "components/V2/Icons";

import ProjectCardV2 from "../componentsV2/Card.ProjectV2";
import RemovalCardV2 from "../componentsV2/Card.RemovalV2";

import ProjectFormV2 from "../componentsV2/Form.ProjectV2";
import TalentPortfolioDetailViewModal from "../componentsV2/Modal.ViewPortfolioDetail";

import useWindowDimensions from "hooks/utils/useWindowDimensions";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

interface TalentProjectPanelV2 {
  userRole?: string;
}

export default function TalentProjectPanelV2(props: TalentProjectPanelV2): ReactElement {
  const { isMedium, isXs } = useWindowDimensions();
  const portfolios = useSelector((root: RootState) => root.profile.FreelancerProfilePortfolios);
  const dispatch = useDispatch<AppDispatch>();
  const [searchParam, setSearchParam] = useSearchParams();
  const freelancer_id = useSelector((root: RootState) => root.profile.freelancer_id);
  const is_busy = useSelector((root: RootState) => root.profile.is_busy);

  const [editable, setEditable] = useState<Boolean>(false);
  const [modal, setModal] = useState<IProjectModal>({
    type: "CREATE",
    data: {},
    visibility: false,
  });

  useEffect(() => {
    if (props.userRole === "Client") return;

    searchParam.get("action") === "upload" &&
      setModal({ type: "CREATE", visibility: true, data: {} });
  }, [searchParam]);

  const removePortfolioHandler = async () => {
    try {
      await dispatch(removeProfilePortfolioBatch({ freelancer_id, data: [modal.data.id] }));
      toast.custom(<Toast type="success" message="Successfully removed a project" />);
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while removing a project" />);
    }
    setModal({ ...modal, data: {}, visibility: false });
  };

  const clickAddProjectHandler = () => {
    if (portfolios.length >= 5) {
      toast.custom(<Toast type="warning" message="You can upload upto 5 projects" />);
      return;
    }
    setModal({ ...modal, type: "CREATE", visibility: true });
  };

  return (
    <>
      {portfolios.length === 0 && (
        <EmptyPanelV2
          image={"/app/common/spaceboy/astro-computer.png"}
          description={
            props.userRole === "Client"
              ? "There are no projects to show for this candidate."
              : "Show companies your previous work."
          }
          title={props.userRole === "Client" ? "No projects" : "Add your first project!"}
          className={`h-[480px] mt-[54px] mb-20 pt-[54px] pb-20 flex flex-col ${
            props.userRole === "Client" ? "justify-center" : ""
          }`}
        >
          {props.userRole !== "Client" && (
            <Button
              onClick={() => {
                if (portfolios.length >= 5) {
                  toast.custom(<Toast type="warning" message="You can upload upto 5 projects" />);
                  return;
                }
                setModal({ ...modal, type: "CREATE", visibility: true });
              }}
              className="mt-10"
            >
              Add a project
            </Button>
          )}
        </EmptyPanelV2>
      )}
      {portfolios.length > 0 && (
        <div className="mt-[54px] mb-20 w-full min-h-[480px] py-8 px-8 bg-white rounded-lg shadow-card relative">
          {props.userRole?.toLowerCase() === "freelancer" && (
            <div className="action-group absolute top-8 right-10 flex gap-2">
              {editable ? (
                <button onClick={() => setEditable(false)} className="w-8 h-8 flex">
                  <IconV2 iconType={"CLOSE"} iconClassName="w-5 h-5 m-auto" />
                </button>
              ) : (
                <>
                  <IconButton
                    onClick={() => {
                      if (portfolios.length >= 5) {
                        toast.custom(<Toast type="warning" message="You can upload upto 5 projects" />);
                        return;
                      }
                      setModal({ ...modal, type: "CREATE", visibility: true });
                    }}
                    iconType="ADD"
                    iconClassName="w-4 h-4"
                  />
                  {props.userRole === "Freelancer" && (
                    <IconButton
                      onClick={() => setEditable(true)}
                      iconType="EDIT"
                      iconClassName="w-4 h-4"
                    />
                  )}
                </>
              )}
            </div>
          )}
          <Heading variant="h6" className="font-semibold text-xl leading-[150%]">
            Projects
          </Heading>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {portfolios.map((portfolio, index) => (
              <ProjectCardV2
                onCardClick={() => setModal({ data: portfolio, type: "VIEW", visibility: true })}
                key={portfolio.id}
                portfolio={portfolio}
              >
                {editable && (
                  <>
                    {props.userRole === "Freelancer" && (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setModal({
                            visibility: true,
                            data: portfolio,
                            type: "EDIT",
                          });
                        }}
                        iconType="EDIT"
                        iconClassName="w-4 h-4"
                      />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModal({
                          visibility: true,
                          data: portfolio,
                          type: "REMOVE",
                        });
                      }}
                      className="translate-y-2 font-inter active:font-semibold text-sm leading-[150%]"
                    >
                      Remove
                    </button>
                  </>
                )}
              </ProjectCardV2>
            ))}
          </div>
        </div>
      )}

      <ModalV2 isOpen={modal.visibility} onClose={() => setModal({ ...modal, visibility: false })}>
        {["CREATE", "EDIT"].includes(modal.type) && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className={`absolute left-1/2 -translate-y-1/2 -translate-x-1/2 z-10
            ${isMedium ? "w-11/12" : "w-[720px]"} ${isXs ? "top-[600px]" : "top-1/2 mt-60 md:mt-40"}`}
          >
            <ProjectFormV2
              onClose={() => setModal({ ...modal, visibility: false, data: {} })}
              formType={modal.type}
              project={modal.data}
            />
          </div>
        )}

        {modal.type === "REMOVE" && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className="overflow-hidden w-[480px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
          >
            <RemovalCardV2
              paddingClass="pt-12 pb-7"
              heading="Confirm removal"
              description="Confirm removal of project below "
              onRemove={removePortfolioHandler}
              onClose={() => setModal({ ...modal, visibility: false })}
              is_busy={is_busy}
            >
              <ProjectCardV2 portfolio={modal.data} />
            </RemovalCardV2>
          </div>
        )}

        {modal.type === "VIEW" && (
          <TalentPortfolioDetailViewModal
            onClose={() => setModal({ ...modal, visibility: false, data: {} })}
            data={modal.data}
          />
        )}
      </ModalV2>
    </>
  );
}
