import { useState } from "react";
import { Appbar } from "react-native-paper";
import { Menu } from "react-native-paper";
import i18n from "i18n-js";

// ========================================================

const MenuBar = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Appbar.Action icon="tools" onPress={openMenu} />}
    >
      <Menu.Item onPress={() => {}} title="Option 1" />
      <Menu.Item onPress={() => {}} title="Option 2" />
      <Menu.Item onPress={() => {}} title="Option 3" disabled />
    </Menu>
  );
};

// ========================================================

export default function MyStatusBar({
  navigation: { goBack, openDrawer },
  route: { name, params },
}) {
  let back = true;
  let drawer = false;
  let menu = false;
  let title = params?.title ? params.title : name;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const matched = title?.match(/(Show).*(Screen)/)?.length;
  if (matched) {
    title = title.split("Show")[1].split("Screen")[0].toLowerCase();
  }

  if (!params?.title) {
    title = `${i18n.t(title)} ${params?.id ? " - " + params?.id : ""}`;
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (
    [
      i18n.t("courses"),
      i18n.t("teachers"),
      i18n.t("centers"),
      "exploreGroups",
      i18n.t("home"),
    ].includes(name)
  ) {
    back = false;
    drawer = true;
  }

  if (["Tabs", "login"].includes(name)) back = false;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  // {menu ? <MenuBar /> : false}

  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={goBack} />}
      {drawer && <Appbar.Action size={30} icon="menu" onPress={openDrawer} />}
      <Appbar.Content
        title={title}
        titleStyle={{ fontSize: 22, fontWeight: "bold" }}
      />
    </Appbar.Header>
  );
}

// ========================================================
