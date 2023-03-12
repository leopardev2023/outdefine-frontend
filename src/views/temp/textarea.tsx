import Heading from "components/Heading/HeadingV2";
import TextareaV2 from "components/V2/Textarea/TextareaV2";
import { ChangeEvent, ReactElement, useState } from "react";
import { code_textarea } from "./codedata";
import CodePanel from "./codepanel";

const TextareaComponents = (): ReactElement => {
  const [data1, setData1] = useState<string>("");
  const [data2, setData2] = useState<string>("");
  const [data3, setData3] = useState<string>("");
  const [data4, setData4] = useState<string>("");
  const [data5, setData5] = useState<string>("");
  const [data6, setData6] = useState<string>("");

  const errorValidator = (arg: any) => {
    if (arg === "" || arg === undefined) return true;
    return false;
  };

  const successValidator = (arg: any) => {
    if (arg === "" || arg === undefined) return undefined;
    return true;
  };

  return (
    <>
      <Heading variant="h3">Textarea</Heading>
      <Heading className="mt-10" variant="h5">
        Examples
      </Heading>
      <div className="mt-10 flex gap-3 flex-wrap">
        <div className="w-[250px] h-[140px]">
          <TextareaV2
            value={data1}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData1(e.target.value)}
          />
        </div>
        <div className="w-[250px] h-[140px]">
          <TextareaV2
            value={data2}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData2(e.target.value)}
            placeholder="By James"
          />
        </div>
        <div className="w-[250px] h-[140px]">
          <TextareaV2
            value={data3}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData3(e.target.value)}
            validators={[errorValidator, successValidator]}
          />
        </div>
        <div className="w-[250px] h-[140px]">
          <TextareaV2
            value={data4}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData4(e.target.value)}
            placeholder="Error validation"
            description="Error description"
            validators={[errorValidator, successValidator]}
          />
        </div>
        <div className="w-[250px] h-[140px]">
          <TextareaV2
            value={data6}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData6(e.target.value)}
            validators={[successValidator]}
          />
        </div>
        <div className="w-[250px] h-[140px]">
          <TextareaV2
            value={data5}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData5(e.target.value)}
            placeholder="Validation Success"
            validators={[successValidator]}
          />
        </div>
        <div className="w-[250px] h-[140px]">
          <TextareaV2 disabled />
        </div>
      </div>
      <div className="mt-10">
        <Heading variant="h5">Usage</Heading>
        <p className="flex gap-32 mt-5 mb-10">
          <CodePanel className="py-5">{code_textarea.interface}</CodePanel>
          <CodePanel className="py-5 max-h-[450px] overflow-auto">
            {code_textarea.example}
          </CodePanel>
        </p>
      </div>
    </>
  );
};

export default TextareaComponents;
