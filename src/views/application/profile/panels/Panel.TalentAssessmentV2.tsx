import { useState, useEffect } from "react"

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import AssessmentAPI from 'network/assessment';

import Button from "components/Button/ButtonV2";
import Heading from "components/Heading/HeadingV2";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";

import AssessmentReviewCardV2 from "views/client-application/profile/components/Card.AssessmentReviewV2";

interface PropsType {
  userRole?: string;
}

export default function TalentAssessmentV2({ userRole }: PropsType) {
  const [show, setShow] = useState<boolean>(false);
  const [topics, setTopics] = useState<any>({
    englishProficiency: {
      name: "English Proficiency",
      show: false,
      calification: null,
      notes: null,
    },
    generalBackground: {
      name: "General Background",
      show: false,
      calification: 5,
      notes: null,
    },
    technicalSkills: {
      name: "Technical Skills Assessed",
      show: false,
      calification: null,
      notes: null,
      tags: null,
    },
    codingSkills: {
      name: "Coding Skills Assessed",
      show: false,
      calification: null,
      notes: null,
      tags: null,
    }
  });
  const {email_id: emailId} = useSelector((root: RootState) => root.profile.User);

  useEffect(() => {
    init();
  }, [])


  const init = async () => {
    const getAssessments = (await AssessmentAPI.getAssessmentInfoByEmail({ email_id: emailId })).data.data;

    const notes = JSON.parse(getAssessments.notes_taken)
    const rating = JSON.parse(getAssessments.rating)
    const preTopics = topics;
    topics.technicalSkills.tags = JSON.parse(getAssessments.interview_technical_skills);
    topics.codingSkills.tags = JSON.parse(getAssessments.coding_skills);
    let showInterface = false;

    for (const key in preTopics) {
      preTopics[key].notes = notes[`${key}Notes`] || null;
      preTopics[key].calification = rating[`${key}Rating`]?.toString() || null;
      if (preTopics[key].notes || preTopics[key].calification) {
        preTopics[key].show = true;
        showInterface = true
      }
    }

    setShow(showInterface)
    setTopics({ ...preTopics })
  }

  return (
    show ?
      <div className='mt-[54px] mb-20 w-full py-8 px-9 bg-white rounded-lg shadow-card relative'>
        <Heading variant='h6' className='text-xl leading-[150%] font-semibold'>
          Online interview
        </Heading>
        <hr className="border-odf/50 h-[2px]" />
        <pre className="mt-[10px] text-sm leading-[18px] ml-3 font-inter font-semibold whitespace-pre-wrap">
          Introduce yourself rating
        </pre>

        {topics.englishProficiency.show && (
          <AssessmentReviewCardV2
            topic={topics.englishProficiency.name}
            calification={topics.englishProficiency.calification}
            notes={topics.englishProficiency.notes}
          />
        )}

        {topics.generalBackground.show && (
          <AssessmentReviewCardV2
            topic={topics.generalBackground.name}
            calification={topics.generalBackground.calification}
            notes={topics.generalBackground.notes}
          />
        )}

        <Heading variant='h6' className='text-xl leading-[150%] font-semibold mt-12'>
          Coding Assessment
        </Heading>
        <hr className="border-odf/50 h-[2px]" />
        <a href="https://outdefine.com/terms" className="underline ml-3" target="_blank">Assessment pdf</a>

        {topics.technicalSkills.show && (
          <AssessmentReviewCardV2
            topic={topics.technicalSkills.name}
            calification={topics.technicalSkills.calification}
            notes={topics.technicalSkills.notes}
            tags={topics.technicalSkills.tags}
          />
        )}

        {topics.codingSkills.show && (
          <AssessmentReviewCardV2
            topic={topics.codingSkills.name}
            calification={topics.codingSkills.calification}
            notes={topics.codingSkills.notes}
            tags={topics.codingSkills.tags}
          />
        )}


      </div>
      :
      <div>
        <EmptyPanelV2
          className={`h-[480px] mt-[54px] mb-20 pt-[54px] pb-20 flex flex-col ${userRole === "Client" ? "justify-center" : ""
            }`}
          image={"/common/spaceboy/astro-ipad.png"}
          title={"No Assessments"}
          description={
            userRole === "Client"
              ? "There are no assessment to show for this candidate."
              : "Earn your first badge when you complete your assessment!"
          }
        >
          {userRole !== "Client" && (
            <NavLink to="/assessments">
              <Button className="mt-5">Assessment</Button>
            </NavLink>
          )}
        </EmptyPanelV2>
      </div>
  );
}