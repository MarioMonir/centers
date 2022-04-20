import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import entities from "../entities/entities";
import config from "../configs/config";
import MyLayout from "./MyLayout";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";

// ------------------------------------------------

console.log("asd", import.meta);

const dataProvider = simpleRestProvider(config?.baseUrl);

// ------------------------------------------------

const MyAdmin = () => {
  return (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
      {entities.map(({ label, ...reset }, index) => (
        <Resource key={index} option={{ label }} {...reset} />
      ))}
    </Admin>
  );
};

// ------------------------------------------------

export default MyAdmin;
