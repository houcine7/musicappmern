import React from "react";
import { useStateValue } from "../../context/contextProvider";
import { MdDeleteForever } from "react-icons/md";

import { deleteUser, updateUserRole } from "../../api/index";
import { FaUserEdit } from "react-icons/fa";
import Alert from "../Alert";
import { useState } from "react";

const initialAlertState = {
  display: "none",
  msg: "",
};
const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();
  const [{ display, msg }, setAlert] = useState(initialAlertState);

  //function to delete user from db
  const handelDelete = async (id) => {
    //
    console.log("delte user:" + id);
    deleteUser(id).then((msg) => {
      //
      setAlert((prevState) => {
        return {
          ...prevState,
          display: "block",
          msg: msg,
        };
      });
    });
  };
  //update user role

  const handelUpdate = (id, role) => {
    //
    console.log(id, role);
    if (role === "member") {
      console.log("is member");
      updateUserRole(id, "admin").then((msg) => {
        setAlert((prevState) => {
          return {
            ...prevState,
            display: "block",
            msg: msg,
          };
        });
      });
    } else {
      console.log("is admin");
      updateUserRole(id, "member").then((msg) => {
        setAlert((prevState) => {
          return {
            ...prevState,
            display: "block",
            msg: msg,
          };
        });
      });
    }
  };
  return (
    <div className="container table-responsive position-relative">
      <Alert display={display} msg={msg} />
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">crated</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, index) => (
            <tr key={index}>
              <td>
                <img
                  src={user.imageURL}
                  alt="user"
                  referrerPolicy="no-referrer"
                  className="img-fluid rounded-circle"
                  style={{ maxWidth: "35px" }}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td
                data-toggle="tooltip"
                title="edit role"
                onClick={() => handelUpdate(user._id, user.role)}
              >
                {user.role}{" "}
                <FaUserEdit style={{ fontSize: "40px", cursor: "pointer" }} />
              </td>
              <td
                data-toggle="tooltip"
                title="Delete this user"
                onClick={() => handelDelete(user._id)}
              >
                <MdDeleteForever
                  style={{ fontSize: "40px", cursor: "pointer", color: "red" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardUsers;
