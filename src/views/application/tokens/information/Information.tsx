import Wrapper from '../components/Wrapper';
// import img_info from 'assets/tokens/information.png';
import Accordion from '../components/Accordion';
import { faqs } from './faq';

const Information = () => {
  return (
    <Wrapper
      header_title='Information'
      ban_title='Get to know more about your tokens with frequently asked questions'
      ban_content='What’s the token for, all the ways to earn, what is token vetting and more.'
      // ban_img={img_info}
    >
      <div className='mt-[50px] font-poppins font-semibold text-black'>
        <h1 className='text-xl mb-5'>Frequently asked questions</h1>
        <Accordion list={faqs} />
      </div>
    </Wrapper>
  );
};

export default Information;
