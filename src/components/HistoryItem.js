import React from "react";

import "../styles/HistoryItem.scss";

function HistoryItem({
  title,
  content,
  created,
  modified,
  version,
  isDeleted,
}) {
  return (
    <tr className="historyItem">
      <td>{version}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td>{created}</td>
      <td>{modified}</td>
      {isDeleted !== undefined && <td>{isDeleted.toString()}</td>}
    </tr>
  );
}

export default HistoryItem;
