import Button from "components/Button/ButtonV2";
import TypographyV2 from "components/Typography/TypographyV2";
import CompanyImage from "assets/welcome/company.png";
import TalentImage from "assets/welcome/talent.png";

interface Props {
    onClientSelect: () => unknown;
    onTalentSelect: () => unknown;
    onContinue: () => unknown;
    type: string | undefined;
  }

function AccountSelectButtons({ onClientSelect, onTalentSelect, onContinue, type }: Props) {
  return <>
    <div className='flex flex-col md:flex-row w-full space-y-4 space-x-0 background-white space-y-10 md:space-x-[40px] md:space-y-0 px-4 px-2'>
        <div
        className={`flex flex-col items-center px-8 py-4 border rounded-lg h-[270px] text-sm border-odf ${
            type === "company" ? "bg-odf-light" : "bg-background"
        }`}
        role='button'
        onClick={onClientSelect}
        >
            <TypographyV2
                variant='subtitle1'
                className='font-semibold text-[16px] md:text-base font-poppins'
            >
                Company
            </TypographyV2>
            <TypographyV2 variant='p2' className='mt-3 mb-4'>
                I am looking to hire
            </TypographyV2>
            <img
                src={CompanyImage}
                className='w-[170px]'
                alt='Company'
            />
        </div>
        <div
        className={`flex flex-col items-center px-6 py-4 border rounded-lg w-full md:w-[250px] h-[270px] text-sm border-odf cursor-pointer ${
            type === "talent" ? "bg-odf-light" : "bg-background"
        }`}
        onClick={onTalentSelect}
        >
            <TypographyV2
                variant='subtitle1'
                className='font-semibold text-[16px] md:text-base font-poppins '
            >
                Talent
            </TypographyV2>
            <TypographyV2 variant='p2' className='mt-3 mb-4'>
                I am looking for opportunities
            </TypographyV2>
            <img
                src={TalentImage}
                className='w-[170px]'
                alt='Talent'
        />
        </div>
    </div>

    <div className='flex justify-center w-full md:justify-end md:mt-14 mt-10'>
        <Button
        className='w-full md:ml-auto md:w-auto h-[50px] md:h-auto text-[16px] md:text-base'
        variant='primary'
        disabled={!type}
        onClick={onContinue}
        >
        Continue
        </Button>
    </div>
  </>;
}

export default AccountSelectButtons;
