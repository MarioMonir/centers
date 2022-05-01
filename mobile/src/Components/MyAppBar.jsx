import { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { Menu } from "react-native-paper";

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
      <Menu.Item
        onPress={() => {
          console.log("Option 1 was pressed");
        }}
        title="Option 1"
      />
      <Menu.Item
        onPress={() => {
          console.log("Option 2 was pressed");
        }}
        title="Option 2"
      />
      <Menu.Item
        onPress={() => {
          console.log("Option 3 was pressed");
        }}
        title="Option 3"
        disabled
      />
    </Menu>
  );
};

// ========================================================

export default function MyStatusBar({
  navigation: { goBack },
  route: { name },
}) {
  let back = true;
  if (["Home"].includes(name)) back = false;

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={goBack} /> : null}
      <Appbar.Content title={name} />
      {back ? null : <MenuBar />}
    </Appbar.Header>
  );
}

// ========================================================

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // marginTop: -1,
//     // backgroundColor: "white",
//     // height: 60,
//     // marginLeft: -20,
//     // marginBottom: -1,
//   },
// });
