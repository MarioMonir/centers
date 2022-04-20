import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import entities from "../entities/entities";
import config from "../configs/config";
import MyLayout from "./MyLayout";
import i18nProvider from "../translation/i18nProvider";

// ------------------------------------------------

console.log("asd", import.meta);

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
