import { CardsContent } from "../../data/CardsDashboardData";

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
