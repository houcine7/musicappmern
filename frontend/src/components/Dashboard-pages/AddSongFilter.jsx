import React from "react";

const AddSongFilter = ({ name, data, handelChange }) => {
  return (
    <>
      <select
        className="custom-select"
        name={name}
        required
        onChange={(e) => {
          console.log("on change");
          handelChange(e);
        }}
      >
        <option value="">Choose {name}</option>
        {data?.map((item, index) => {
          if (name === "artist" || name === "album") {
            return (
              <option value={item._id} key={index}>
                {item.name}
              </option>
            );
          } else {
            return (
              <option value={item.value ? item.value : item.name} key={index}>
                {item.name}
              </option>
            );
          }
        })}
      </select>
    </>
  );
};

export default AddSongFilter;
