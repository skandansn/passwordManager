import React from "react";
import { Action } from "../App";



export const DataTable = ({ dispatch, data }) => {
  return (
    <table className="mt1">
      <thead>
        <tr>
          <th>Identifier</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(e => (
          <tr key={`${Math.random()}`}>
            <CopiableTd text={e[0]} />
            <CopiableTd text={e[1]} />
            <td>
              <button
                className="bn pa1 f5 bg-light-gray hover-bg-moon-gray"
                onClick={() => {
                  dispatch({ type: "delete", item: e[0] });
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CopiableTd = ({ text }) => {
  return (
    <td
      className="pointer dim pa2 ba mw4 mw5-m mw7-l"
      style={{ overflowWrap: "break-word" }}
      onClick={async () => {
        await navigator.clipboard.writeText(
          text.substring(text.indexOf("/") + 1)
        );
      }}
    >
      {text}
    </td>
  );
};
