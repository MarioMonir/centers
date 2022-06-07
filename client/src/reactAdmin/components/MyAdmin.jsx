import { Admin, Resource } from "react-admin";
import entities from "../../entities/entities";
import i18nProvider from "../../utils/translation/i18nProvider";
import MyLayout from "./MyLayout";
import useAuthProvider from "../providers/auth.provider.hook";
import useDataProvider from "../providers/data.provider.hook";

// =======================================================

export default function MyAdmin() {
  const authProvider = useAuthProvider();
  const dataProvider = useDataProvider();

  return (
    <Admin layout={MyLayout} {...{ authProvider, dataProvider, i18nProvider }}>
      {entities.map(({ label, ...reset }, index) => (
        <Resource key={index} option={{ label }} {...reset} />
      ))}
    </Admin>
  );
}
