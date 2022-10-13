import React from "react";
import { useStateValue } from "../../context/contextProvider";

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();
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
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardUsers;
