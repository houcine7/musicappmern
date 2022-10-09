import { useEffect } from "react";
import { CardsContent } from "../../data/CardsDashboardData";

import { useStateValue } from "../../context/contextProvider";

import { getSongs, getUsers, getAlbums, getArtists } from "../../api/index";
//card componenet
const DashboardCard = ({ image, name, stats }) => {
  //
  return (
    <div
      className="card text-left"
      style={{ maxWidth: "200px", alignItems: "center", borderRadius: "20px" }}
    >
      <img
        className="card-img-top img-fluid"
        src={image}
        alt="iconimg"
        style={{ width: "198px", height: "155px" }}
      />
      <div className="card-body d-flex flex-column align-items-center">
        <h4 className="card-title">{name}</h4>
        <p className="card-text">{stats}</p>
      </div>
    </div>
  );
};

//dboard home
const DashBoardHome = () => {
  const [{ allUsers, allSongs, allAlbums, allArtists }, dispatch] =
    useStateValue();

  useEffect(() => {
    //
    const fetchData = async () => {
      if (allUsers == null) {
        const data = await getUsers().then((users) => users);
        CardsContent[3].states = data.length;
        dispatch({
          type: "SET_ALL_USERS",
          allUsers: data,
        });
      }
      if (allSongs == null) {
        const data = await getSongs().then((users) => users);
        CardsContent[2].states = data.length;
        dispatch({
          type: "SET_ALL_SONGS",
          allSongs: data,
        });
      }
      if (allAlbums == null) {
        const data = await getAlbums().then((users) => users);
        CardsContent[0].states = data.length;
        dispatch({
          type: "SET_ALL_ALBUMS",
          allAlbums: data,
        });
      }
      if (allArtists == null) {
        const data = await getArtists().then((users) => users);
        CardsContent[1].states = data.length;
        dispatch({
          type: "SET_ALL_ARTISTS",
          allArtists: data,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="conteiner d-flex justify-content-evenly align-items-center flex-wrap">
      {CardsContent.map((item, index) => (
        <DashboardCard
          key={index}
          name={item.name}
          image={item.image}
          stats={item.states}
        />
      ))}
    </div>
  );
};

export default DashBoardHome;
