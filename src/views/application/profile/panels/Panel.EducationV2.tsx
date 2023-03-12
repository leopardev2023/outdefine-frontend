import { ReactElement, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "app/store";

import IconButton from "components/V2/IconButton";
import IconV2 from "components/V2/Icons";

import TalentEducationCardV2 from "../componentsV2/Card.EducationV2";
import ModalV2 from "components/Modal/ModalV2";
import TalentEducationFormV2 from "../componentsV2/Form.EducationV2";
import RemovalCardV2 from "../componentsV2/Card.RemovalV2";
import { removeProfileEducationBatch } from "redux/slices/profile";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import Button from "components/Button/ButtonV2";
import useWindowDimensions from "hooks/utils/useWindowDimensions";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

interface TalentEducationSubPanelV2 {
  userRole?: string;
}

export default function TalentEducationSubPanelV2(
  props: TalentEducationSubPanelV2,
): ReactElement {
  const { isMedium } = useWindowDimensions();
  const educations: ITalentEducation[] = useSelector(
    (root: RootState) => root.profile.FreelancerProfileEducations,
  );
  const dispatch = useDispatch<AppDispatch>();
  const is_busy = useSelector((root: RootState) => root.profile.is_busy);
  const freelancer_id = useSelector(
    (root: RootState) => root.profile.freelancer_id,
  );

  const [editable, setEditable] = useState<boolean>(false);
  const [modal, setModal] = useState<IEduModal>({
    type: "CREATE",
    data: {},
    visibility: false,
  });

  const addEducationHandler = () => {
    if (educations.length >= 5) {
      toast.custom(<Toast type="warning" message="You can upload upto 5 eduation" />);
      return;
    }
    setModal({ ...modal, type: "CREATE", visibility: true });
  };

  const removeEducationHandler = async () => {
    try {
      await dispatch(
        removeProfileEducationBatch({ freelancer_id, data: [modal.data.id] }),
      );
      toast.custom(<Toast type="success" message="Successfully removed an education" />);
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while removing an education" />);
    }
    setModal({ ...modal, data: {}, visibility: false });
  };

  const isFreelancer = props.userRole === "Freelancer";
  const EmptyEducation = isFreelancer
    ? <EmptyPanelV2
    image={"/common/spaceboy/astro-computer.png"}
    description="Show companies your education."
    title="Add your education"
    className={`h-[480px] mt-[54px] mb-20 pt-[54px] pb-20 flex flex-col`}
  >
      <Button
        onClick={addEducationHandler}
        className="mt-10"
      >
        Add an education
      </Button>
  </EmptyPanelV2>
    : null;

  return (
    <>
      {educations.length
        ? <div className='w-full bg-white rounded-lg relative pb-4 px-8 shadow-card'>
        <div className='p-[60px_0px_24px_0px] flex overflow-x-auto gap-7 min-h-[250px]'>
          {isFreelancer && (
            <div className='action-group absolute flex gap-2 top-4 right-5'>
              {editable
                ? (
                <button
                  onClick={() => setEditable(false)}
                  className='w-8 h-8 flex'
                >
                  <IconV2 iconType={"CLOSE"} iconClassName='w-5 h-5 m-auto' />
                </button>
                  )
                : (
                <>
                  <IconButton
                    onClick={addEducationHandler}
                    iconType='ADD'
                    iconClassName='w-4 h-4'
                  />
                  <IconButton
                    onClick={() => setEditable(true)}
                    iconType='EDIT'
                    iconClassName='w-4 h-4'
                  />
                </>
                  )}
            </div>
          )}
          {educations.map((edu, index) => (
            <TalentEducationCardV2
              key={edu.start_date.toString() + index}
              education={edu}
            >
              {editable && (
                <>
                  {isFreelancer && (
                    <IconButton
                      onClick={() =>
                        setModal({ data: edu, visibility: true, type: "EDIT" })
                      }
                      className='absolute top-4 right-4 rounded-lg bg-[#F4F4F4] w-8 h-8 flex'
                      iconClassName='w-4 h-4 m-auto'
                      iconType={"EDIT"}
                    />
                  )}
                  <button
                    onClick={() =>
                      setModal({ visibility: true, type: "REMOVE", data: edu })
                    }
                    className='absolute bottom-2 right-4 font-semibold text-sm leading-[150%] font-inter'
                  >
                    Remove
                  </button>
                </>
              )}
            </TalentEducationCardV2>
          ))}
        </div>
        </div>
        : EmptyEducation
    }
      <ModalV2
        isOpen={modal.visibility}
        onClose={() => setModal({ ...modal, visibility: false })}
      >
        {["CREATE", "EDIT"].includes(modal.type) && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
            ${isMedium ? "w-11/12" : "w-[720px]"}`}
          >
            <TalentEducationFormV2
              formType={modal.type}
              education={modal.data}
              onClose={() => setModal({ ...modal, visibility: false })}
            />
          </div>
        )}
        {modal.type === "REMOVE" && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            className='overflow-hidden w-[480px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10'
          >
            <RemovalCardV2
              paddingClass='pt-12 pb-10'
              heading='Confirm removal'
              description='Confirm removal of education below'
              onClose={() => setModal({ ...modal, visibility: false })}
              onRemove={removeEducationHandler}
              is_busy={is_busy}
            >
              <TalentEducationCardV2 education={modal.data} />
            </RemovalCardV2>
          </div>
        )}
      </ModalV2>
    </>
  );
}
