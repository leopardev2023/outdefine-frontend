import Heading from 'components/Heading/HeadingV2';
import Accordion from './components/Accordion';
import { Container } from './components/Container';
import { faqs } from './information/faq';

export function FAQnGrowth() {
  return (
    <Container className="bg-white rounded">
      <Heading variant="h6" className="mb-5 text-xl font-bold font-poppins">
        FAQs & Growth
      </Heading>
      <Accordion list={faqs} />
    </Container>
  );
}
