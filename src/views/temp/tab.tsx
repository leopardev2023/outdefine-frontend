import Heading from "components/Heading/HeadingV2";
import TabV2 from "components/V2/Tab/TabV2";
import { ReactElement } from "react";
import InviteToTeamV2 from "views/client-application/dashboard/components/Panel.InviteToTeamV2";
import TeamViewV2 from "views/client-application/dashboard/components/Panel.TeamViewV2";
import { code_tab } from "./codedata";
import CodePanel from "./codepanel";

const TabComponents = (): ReactElement => {
  return (
    <main className="flex gap-20">
      <div>
        <Heading variant="h3">Tabs</Heading>
        <Heading className="mt-10" variant="h5">
          Examples
        </Heading>
        <CodePanel className="mt-5 py-5">{code_tab.interface}</CodePanel>

        <CodePanel className="mt-5 py-5">{code_tab.example}</CodePanel>
      </div>
      <div className="min-w-[360px] w-[360px] mt-8">
        <TabV2
          tabClass="w-[175px] h-11 font-poppins font-semibold text-xs"
          tabs={["Invite", "Team"]}
          contents={[<InviteToTeamV2 />, <TeamViewV2 />]}
          contentWrapperClass="mt-10 mb-10 bg-white shadow-3xl rounded-lg min-h-[480px]"
        />
      </div>
    </main>
  );
};

export default TabComponents;
