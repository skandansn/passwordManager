import React, { useState } from "react";
import { decrypt, lsGet, generatePassword, fireStoreDownload } from "../helpers";
import { Action } from "../App";


export const Import = ({ dispatch }) => {
  const [encryptedData, setEncryptedData] = useState(lsGet() ?? "");
  const [key, setKey] = useState("");

  return (
    <div className="mb2 flex flex-column items-center">
    <form
      className="mt2 flex flex-column items-center"
      onSubmit={e => {
        e.preventDefault();
        if (!encryptedData && !key) {
          alert(
            "Fields must be nonempty!\nFor creating a new database enter only the master password."
          );
        } else if (!encryptedData && key) {
          let choice = window.confirm(
            `Create new database with master password "${key}"?`
          );
          if (choice) {
            dispatch({
              type: "import",
              data: { "username": generatePassword(16) },
              key
            });
            setKey("");
          }
        } else if (!decrypt(encryptedData, key)) {
          alert("Invalid password!");
        } else {
          let decryptedData = decrypt(encryptedData, key);
          dispatch({
            type: "import",
            data: decryptedData,
            key
          });
          setKey("");
        }
      }}
    >
      <textarea
        className="w-60 w-50-m w-40-ns h5 mt4"
        style={{ resize: "none" }}
        value={encryptedData}
        onChange={e => setEncryptedData(e.target.value)}
      />
      <input
        placeholder="Master password"
        className="mv2 tc"
        autoFocus
        value={key}
        onChange={e => setKey(e.target.value)}
      />
     
      <button className="bn pa2 bg-light-gray hover-bg-moon-gray" type="submit">
        Import / Create
      </button>
    </form>
    <button className="bn pa2 bg-light-gray hover-bg-moon-gray" onClick={() => fireStoreDownload(key)} >
        Import from Cloud
      </button>
    </div>
  );
};
