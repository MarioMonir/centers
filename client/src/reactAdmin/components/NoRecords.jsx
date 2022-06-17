import React from "react";
import { Title, useTranslate } from "react-admin";

// =================================================================

export default function NoRecords({ title = "records" }) {
  const translate = useTranslate();
  return (
    <div style={styles.container}>
      {`${translate("no")} ${translate(title)}`}
    </div>
  );
}

// =================================================================
const styles = {
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "50px",
    fontSize: 35,
    color: "#c7c7c7",
    fontFamily: "monospace",
    fontWeight: "300",
  },
};
