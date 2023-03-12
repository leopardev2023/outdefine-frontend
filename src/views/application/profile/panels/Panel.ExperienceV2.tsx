import { ReactElement, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { removeProfileExperienceBatch } from "redux/slices/profile";

import IconButton from "components/V2/IconButton";
import IconV2 from "components/V2/Icons";
import ModalV2 from "components/Modal/ModalV2";

import ExperienceFormV2 from "../componentsV2/Form.ExperienceV2";
import TalentExperienceCardV2 from "../componentsV2/Card.ExperienceV2";
import RemovalCardV2 from "../componentsV2/Card.RemovalV2";
import Button from "components/Button/ButtonV2";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import useWindowDimensions from "hooks/utils/useWindowDimensions";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

interface TalentExperienceSubPanelV2 {
  userRole?: string;
}

export default function TalentExperienceSubPanelV2(
  props: TalentExperienceSubPanelV2,
): ReactElement {
  const { isMedium } = useWindowDimensions();
  const freelancer_id = useSelector(
    (root: RootState) => root.profile.User.user_id,
  );
  const is_busy = useSelector((root: RootState) => root.profile.is_busy);

  const dispatch = useDispatch<AppDispatch>();
  const experiences = useSelector(
    (root: RootState) => root.profile.FreelancerProfileExperiences,
  );

  const [editable, setEditable] = useState<boolean>(false);
  const [modal, setModal] = useState<IExpModal>({
    type: "CREATE",
    data: {},
    visibility: false,
  });

  const addExperienceHandler = () => {
    if (experiences.length >= 5) {
      toast.custom(<Toast type="warning" message="You can upload upto 5 experiences" />);
      return;
    }
    setModal({ ...modal, type: "CREATE", visibility: true });
  };

  const removeExperienceHandler = async () => {
    try {
      await dispatch(
        removeProfileExperienceBatch({ freelancer_id, data: [modal.data.id] }),
      );
      toast.custom(<Toast type="success" message="Successfully removed an experience" />);
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while removing experience" />);
    }
    setModal({ ...modal, data: {}, visibility: false });
  };

  const isFreelancer = props.userRole === "Freelancer";
  const EmptyExperience = isFreelancer
    ? <EmptyPanelV2
  image={"/common/spaceboy/astro-computer.png"}
  description="Show companies your previous experience."
  title="Add your previous experience"
  className={`h-[480px] mt-[54px] mb-20 pt-[54px] pb-20 flex flex-col`}
>
    <Button
      onClick={addExperienceHandler}
      className="mt-10"
    >
      Add an experience
    </Button>
</EmptyPanelV2>
    : null;

  return (
    <>
      {experiences.length
        ? <section className='w-full bg-white rounded-lg relative pb-4 px-8 shadow-card'>
        <div className='p-[60px_0px_24px_0px] flex overflow-x-auto gap-7 min-h-[440px]'>
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
                    onClick={addExperienceHandler}
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
          {experiences?.slice(0, 5)?.map((data: ITalentExperience, index) => (
            <TalentExperienceCardV2 {...data} key={"expcard" + index}>
              {editable && (
                <>
                  <IconButton
                    onClick={() =>
                      setModal({ visibility: true, data, type: "EDIT" })
                    }
                    className='absolute top-4 right-4 rounded-lg bg-[#F4F4F4] w-8 h-8 flex'
                    iconClassName='w-4 h-4 m-auto'
                    iconType={"EDIT"}
                  />
                  <button
                    onClick={() =>
                      setModal({ visibility: true, data, type: "REMOVE" })
                    }
                    className='absolute bottom-2 right-4 font-semibold text-sm leading-[150%]'
                  >
                    Remove
                  </button>
                </>
              )}
            </TalentExperienceCardV2>
          ))}
        </div>
      </section>
        : EmptyExperience
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
            className={`overflow-auto absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 md:h-screen h-[calc(100%-124px)] mt-1 md:mt-0
              ${isMedium ? "w-11/12" : "w-[720px]"}`}
          >
            <ExperienceFormV2
              onClose={() =>
                setModal({ ...modal, data: {}, visibility: false })
              }
              formType={modal.type}
              experience={modal.data}
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
              onClose={() => setModal({ ...modal, visibility: false })}
              heading='Confirm removal'
              description='Confirm removal of experience below'
              paddingClass='pt-12 pb-7'
              onRemove={removeExperienceHandler}
              is_busy={is_busy}
            >
              <TalentExperienceCardV2 {...modal.data} />
            </RemovalCardV2>
          </div>
        )}
      </ModalV2>
    </>
  );
}
