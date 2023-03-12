import { Routes, Route } from "react-router-dom";
import TalentApplication from "views/client-application/talent/pages/TalentApplication";
import TalentManagement from "views/client-application/talent/pages/TalentMangement";
import TalentsView from "views/client-application/talent/pages/TalentsView";

const routes = [
  {
    path: "/",
    exact: true,
    element: <TalentsView />,
  },
  {
    path: "/applications",
    element: <TalentApplication />,
  },
  {
    path: "/manage",
    element: <TalentManagement />,
  },
];

const ClientTalentRoute: React.FC = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={"client-talent" + index} {...route} />
      ))}
    </Routes>
  );
};

export default ClientTalentRoute;
