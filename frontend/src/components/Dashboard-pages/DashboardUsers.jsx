import React from "react";
import { useStateValue } from "../../context/contextProvider";
import { MdDeleteForever } from "react-icons/md";

import { FaUserEdit } from "react-icons/fa";

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();

  //function to delete user from db
  const deleteUser = (id) => {
    //
    console.log("delte user:" + id);
  };
  //
  return (
    <div className="container table-responsive ">
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
              <td data-toggle="tooltip" title="edit role">
                {user.role}{" "}
                <FaUserEdit style={{ fontSize: "40px", cursor: "pointer" }} />
              </td>
              <td data-toggle="tooltip" title="Delete this user">
                <MdDeleteForever
                  style={{ fontSize: "40px", cursor: "pointer", color: "red" }}
                  onClick={() => deleteUser(user._id)}
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
