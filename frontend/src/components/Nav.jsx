import { useEffect } from "react";
import { useStateValue } from "../context/contextProvider";
const navConstant = ["home", "music", "contact us"];

const Nav = () => {
  //get user info
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {}, [user]);

  //
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className="logo" src="./logo.png" alt="" loading="lazy" />
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
            {navConstant.map((item) => {
              return (
                <li className="nav-item">
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
              className="d-flex justify-content-aroound align-items-center"
              id="triggerId"
              data-toggle="dropdown"
              aria-haspopup="true"
            >
              <img
                className="rounded-circle img-fluid profileimage"
                src={(user && user.imageURL) || "./user.png"}
                alt="userpic"
                style={{ width: "75px" }}
              />
              <div className="d-flex flex-column">
                <strong className="username">{user && user.name}</strong>
                <h6 className="title">premuim</h6>
              </div>
            </div>

            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="triggerId"
            >
              <a class="dropdown-item" href="#">
                Action
              </a>
              <a class="dropdown-item disabled" href="#">
                Disabled action
              </a>
              <h6 class="dropdown-header">Section header</h6>
              <a class="dropdown-item" href="#">
                Action
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                After divider action
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
