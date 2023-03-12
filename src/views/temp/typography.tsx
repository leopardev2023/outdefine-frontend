import Heading from "components/Heading/HeadingV2";
import TypographyV2 from "components/Typography/TypographyV2";

const TypographyComponents = () => {
  return (
    <>
      <h2 className="mb-6 text-h2">Typography</h2>

      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <h6 className="mb-2 text-h1">H1</h6>
        <Heading variant="h1">Web3</Heading>
        <h6 className="mb-2 text-h2">H2</h6>
        <Heading variant="h2">Web3</Heading>
        <h6 className="mb-2 text-h3">H3</h6>
        <Heading variant="h3">Web3</Heading>
        <h6 className="mb-2 text-h4">H4</h6>
        <Heading variant="h4">Web3</Heading>
        <h6 className="mb-2 text-h5">H5</h6>
        <Heading variant="h5">Web3</Heading>
        <h6 className="mb-2 text-h6">H6</h6>
        <Heading variant="h6">Web3</Heading>
        <h6 className="mb-2">P1</h6>
        <TypographyV2 variant="p1">Paragraph</TypographyV2>
        <h6 className="mb-2">P2</h6>
        <TypographyV2 variant="p2">Paragraph</TypographyV2>
        <h6 className="mb-2">P3</h6>
        <TypographyV2 variant="p3">Paragraph</TypographyV2>
        <h6 className="mb-2">Subtitle 1</h6>
        <TypographyV2 variant="subtitle1">Paragraph</TypographyV2>
        <h6 className="mb-2">Subtitle 2</h6>
        <TypographyV2 variant="subtitle2">Paragraph</TypographyV2>
        <h6 className="mb-2">Caption</h6>
        <TypographyV2 variant="caption">Paragraph</TypographyV2>
        <h6 className="mb-2">Label</h6>
        <TypographyV2 variant="label">Paragraph</TypographyV2>
      </div>
    </>
  );
};

export default TypographyComponents;
