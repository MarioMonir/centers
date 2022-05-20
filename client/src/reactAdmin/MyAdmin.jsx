import simpleRestProvider from "ra-data-simple-rest";
import { Admin, Resource } from "react-admin";
import config from "../configs/config";
import entities from "../entities/entities";
import i18nProvider from "../utils/translation/i18nProvider";
import MyLayout from "./MyLayout";

// ------------------------------------------------

const dataProvider = simpleRestProvider(config?.baseUrl);

// ------------------------------------------------

const MyAdmin = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      layout={MyLayout}
      i18nProvider={i18nProvider}
    >
      {entities.map(({ label, ...reset }, index) => (
        <Resource key={index} option={{ label }} {...reset} />
      ))}
    </Admin>
  );
};

// ------------------------------------------------

export default MyAdmin;
