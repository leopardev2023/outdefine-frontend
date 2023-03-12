import IconV2 from 'components/V2/Icons';
import BadgeV2 from "components/V2/Badges/BadgeV2";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import protoTypeHelper from "helpers/prototype";

const AssessmentReviewCardV2 = (props) => {
  const skills = useSelector((root: RootState) => root.prototype.skills);

  return (
    <div className='my-6 px-6'>
      <pre className="mt-[10px] text-sm leading-[18px] font-inter font-semibold whitespace-pre-wrap">
        {props.topic}
      </pre>

      {!!props.tags && (
        <div className="mt-[6px] flex gap-2">
          {!!props.tags?.length && protoTypeHelper
            .getSkillNamesFromIDs(skills, props.tags)
            .map((skill, index) => (
              <BadgeV2
                key={skill + index}
                addClass='h-6 w-fit px-2 first:capitalize'
              >
                {skill}
              </BadgeV2>
            ))}
        </div>
      )}
      <pre className="mt-[5px] text-sm leading-[18px] font-inter whitespace-pre-wrap">
        Rate your interview using our 1-5 start system, 1 being strong NO hire and 5 being strong hire
      </pre>

      <span className='flex items-center gap-[2px] my-[10px]'>

        {[...Array(5)].map((x, i) => (
          <IconV2 key={i} iconType='RATINGSTAR' iconClassName={i < +props.calification ? 'w-8 h-8' : 'w-6 h-6'} />
        ))}
      </span>

      <pre className=" text-sm leading-[18px] font-inter font-semibold whitespace-pre-wrap">
        Notes
      </pre>
      <pre className="mt-[5px] text-sm leading-[18px] font-inter whitespace-pre-wrap">
        {props.notes}
      </pre>
    </div>
  );
};

export default AssessmentReviewCardV2;