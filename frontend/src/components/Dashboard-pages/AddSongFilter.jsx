import React from "react";

const AddSongFilter = ({ name, data, handelChange }) => {
  return (
    <>
      <select
        className="custom-select"
        name={name}
        onChange={(e) => {
          console.log("on change");
          handelChange(e);
        }}
      >
        <option value="">Choose {name}</option>
        {data?.map((item, index) => {
          return (
            <option value={item.value ? item.value : item.name} key={index}>
              {item.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default AddSongFilter;
