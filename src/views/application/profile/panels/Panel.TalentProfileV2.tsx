import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "app/store";

import Button from "components/Button/ButtonV2";
import IconV2 from "components/V2/Icons";

import NewExpCardV2 from "views/client-application/profile/components/Card.NewExpV2";
import TalentAboutMeV2 from "../componentsV2/TalentAboutMeV2";

import TabV2 from "components/V2/Tab/TabV2";

import TalentExperienceSubPanelV2 from "./Panel.ExperienceV2";
import TalentEducationSubPanelV2 from "./Panel.EducationV2";

import ModalV2 from "components/Modal/ModalV2";
import TalentProfileFormV2 from "../componentsV2/Form.TalentProfileV2";
import CardResume from "../componentsV2/Card.Resume";
import useWindowDimensions from "hooks/utils/useWindowDimensions";

interface ITalentProfileV2 {
  onTabChange: (name: string, action: string) => void;
  userRole?: string;
}

export default function TalentProfileV2(props: ITalentProfileV2): ReactElement {
  const { isXs, isMedium } = useWindowDimensions();
  const navigate = useNavigate();
  const profile = useSelector((root: RootState) => root.profile);
  const userRole = props.userRole;
  const experiences = useSelector(
    (root: RootState) => root.profile.FreelancerProfileExperiences,
  );
  const educations: ITalentEducation[] = useSelector(
    (root: RootState) => root.profile.FreelancerProfileEducations,
  );
  const isFreelancer = userRole === "Freelancer";
  const freelancer_id = useSelector(
    (root: RootState) => root.profile.freelancer_id,
  );

  const [visibility, setVisibility] = useState<boolean>(false);

  const clickSetupProfileHandler = () => {
    setVisibility(true);
    localStorage.setItem(`talent_${freelancer_id}_profile_setup`, "true");
  };

  const clickAssessmentHandler = () => {
    localStorage.setItem(`talent_${freelancer_id}_assessment_enter`, "true");
    navigate("/assessments");
  };

  const clickProjectsHandler = () => {
    localStorage.setItem(`talent_${freelancer_id}_project_upload`, "true");
    props.onTabChange("projects", "upload");
  };

  const tabs : string[] = [];
  const Contents : JSX.Element[] = [];
  if (experiences.length || isFreelancer) {
    tabs.push("Experience");
    Contents.push(<TalentExperienceSubPanelV2 userRole={userRole} />);
  }
  if (educations.length || isFreelancer) {
    tabs.push("Education");
    Contents.push(<TalentEducationSubPanelV2 userRole={userRole} />);
  }

  return (
    <>
      <section className='mb-14'>
        {isFreelancer && (
          <div className={`mt-11 flex justify-center flex-wrap ${isXs ? "gap-3" : "gap-10"}`}>
            {localStorage.getItem(`talent_${freelancer_id}_profile_setup`) !==
              "true" && (
              <NewExpCardV2
                icon={<IconV2 iconType={"USEROUTLINE"} />}
                icon_description={"Profile"}
                title={"Finish setting up profile"}
              >
                <Button
                  onClick={clickSetupProfileHandler}
                  className='mt-4 w-24 px-0 py-2'
                >
                  Continue
                </Button>
              </NewExpCardV2>
            )}

            {localStorage.getItem(
              `talent_${freelancer_id}_assessment_enter`,
            ) !== "true" && (
              <NewExpCardV2
                icon={<IconV2 iconType={"CODE"} />}
                icon_description={"Assessment"}
                title={"Complete assessment"}
              >
                <Button
                  onClick={clickAssessmentHandler}
                  className='mt-4 w-24 px-0 py-2'
                >
                  Get started
                </Button>
              </NewExpCardV2>
            )}

            {localStorage.getItem(`talent_${freelancer_id}_project_upload`) !==
              "true" && (
              <NewExpCardV2
                icon={<IconV2 iconType={"DOCUMENT"} />}
                icon_description={"Projects"}
                title={"Add projects"}
              >
                <Button
                  onClick={clickProjectsHandler}
                  className='mt-4 w-24 px-0 py-2'
                >
                  Upload
                </Button>
              </NewExpCardV2>
            )}
          </div>
        )}
        <TalentAboutMeV2 userRole={userRole} />
        {/* <AssessmentSectionV2 /> */}
        <CardResume link={profile.resume} userRole={userRole} />
        <TabV2
          addClass='mt-8'
          tabClass='w-[175px] h-11 font-poppins font-semibold text-xs'
          contentWrapperClass='mt-8 w-full min-h-[500px]'
          tabs={tabs}
          contents={Contents}
        />
      </section>

      {isFreelancer && (
        <ModalV2 onClose={() => setVisibility(false)} isOpen={visibility}>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            className={`overflow-x-hidden pb-20 absolute left-1/2 top-[150px] -translate-x-1/2 z-10
            ${isMedium ? "w-11/12" : "w-[720px]"}`}
          >
            <TalentProfileFormV2
              onClose={() => setVisibility(false)}
              profile={profile}
            />
          </div>
        </ModalV2>
      )}
    </>
  );
}
