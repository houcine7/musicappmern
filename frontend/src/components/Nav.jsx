import { useEffect } from "react";
import { useStateValue } from "../context/contextProvider";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const navConstant = ["home", "music", "contact us"];
const urlLogo = "http://localhost:3000/logo.png";
const Nav = ({ setLoggedIn }) => {
  const navigateTo = useNavigate();
  //get user info
  const [{ user }, dispatch] = useStateValue();

  //logout function
  const logout = () => {
    const authentication = getAuth();
    authentication
      .signOut()
      .then(() => {
        localStorage.clear();
        navigateTo("/login", { replace: true });
      })
      .catch((error) => console.log(error));

    //
  };
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className="logo" src={urlLogo} alt="logo" loading="lazy" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2  mb-lg-0 ulitems">
            {navConstant.map((item, index) => {
              return (
                <li className="nav-item" key={index}>
                  <a className="nav-link active" aria-current="page" href="#">
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* <form className="d-flex input-group w-auto">
            <input
              type="search"
              className="form-control"
              placeholder="Type query"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              data-mdb-ripple-color="dark"
              style={{ padding: ".45rem 1.5rem .35rem" }}
            >
              Search
            </button>
          </form> */}
          <div className="navbar-nav mb-2 mb-lg-0 mr-3 mr-lg-0 profile">
            <div
              className="profile-nav d-flex justify-content-aroound align-items-center"
              id="triggerId"
              data-toggle="dropdown"
              aria-haspopup="true"
            >
              <img
                className="rounded-circle img-fluid profileimage"
                src={(user && user.imageURL) || "./user.png"}
                alt="userpic"
                referrerPolicy="no-referrer"
                style={{ width: "75px" }}
              />
              <div className="d-flex flex-column">
                <strong className="username">{user && user.name}</strong>
                <h6 className="title">premuim</h6>
              </div>
            </div>

            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="triggerId"
            >
              <a className="dropdown-item" href="#">
                Profile
              </a>
              <a className="dropdown-item" href="#">
                My Playlist
              </a>
              <a className="dropdown-item" href="./dashboard/home">
                Dashboard
              </a>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={logout}>
                logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
