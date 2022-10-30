import { Admin, Authenticated, CustomRoutes, Resource } from "react-admin";
import entities from "../../entities/entities";
import { Route } from "react-router-dom";

import i18nProvider from "../../utils/translation/i18nProvider";
import MyLayout from "./MyLayout";
import useAuthProvider from "../providers/auth.provider.hook";
import useDataProvider from "../providers/data.provider.hook";
// import ShowMaterial from "../../entities/group/components/ShowMaterial";
import GroupMaterial from "../../entities/group/components/GroupMaterial";
import Settings from "../../entities/settings/list.settings";
import RestUser from "../../entities/user/rest.user";
import WalletUser from "../../entities/user/wallet.user";
import React, { useState, useEffect } from "react";
import Protected from "./Protected";
import Home from "../../entities/landingPage/Home";
import Signin from "../../entities/landingPage/Sigin";
import SignUp from "../../entities/landingPage/SignUp";
import Search from "../../entities/group/components/Search";
import Settlement from "../../settlement/list.settlement";
// =======================================================

export default function MyAdmin() {
  const authProvider = useAuthProvider();
  const dataProvider = useDataProvider();
  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoggedUser(user);
  }, []);

  return (
    <Admin
      loginPage={<Signin />}
      layout={MyLayout}
      {...{ authProvider, dataProvider, i18nProvider }}
    >
      {entities.map(({ label, ...reset }, index) => (
        <Resource key={index} option={{ label }} {...reset} />
      ))}
      <CustomRoutes>
        <Route
          path="/profile"
          element={
            <Authenticated>
              <Settings />
            </Authenticated>
          }
        />
        <Route
          path="/restPassword"
          element={
            <Authenticated>
              <RestUser />
            </Authenticated>
          }
        />

        <Route
          path="/wallet"
          element={
            <Authenticated requireAuth>
              <WalletUser />
            </Authenticated>
          }
        />
        <Route
          path="/settlement"
          element={
            <Authenticated requireAuth>
              <Settlement />
            </Authenticated>
          }
        />
        <Route
          path="/uploadmaterials"
          element={
            <Authenticated requireAuth>
              <GroupMaterial />
            </Authenticated>
          }
        />
        <Route
          path="/search"
          element={
            <Authenticated>
              <Search />
            </Authenticated>
          }
        />
      </CustomRoutes>
      <CustomRoutes noLayout>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landing" element={<Home />} />
      </CustomRoutes>
      {/* <Resource name="uploadmaterials" list={GroupMaterial} /> */}

      {/* <Resource name="showmaterials" list={ShowMaterial} /> */}
    </Admin>
  );
}
