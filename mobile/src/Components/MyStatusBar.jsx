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
  navigation: { goBack },
  route: { name, params },
}) {
  let back = true;
  let menu = false;
  let title = name;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const matched = title?.match(/(Show).*(Screen)/)?.length;
  if (matched) {
    title = title.split("Show")[1].split("Screen")[0].toLowerCase();
  }

  title = `${i18n.t(title)} ${params?.id ? " - " + params?.id : ""}`;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (["Tabs", "login", i18n.t("home")].includes(name)) back = false;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={goBack} /> : null}
      <Appbar.Content
        title={title}
        titleStyle={{ fontSize: 22, fontWeight: "bold" }}
      />
      {menu ? <MenuBar /> : false}
    </Appbar.Header>
  );
}

// ========================================================
