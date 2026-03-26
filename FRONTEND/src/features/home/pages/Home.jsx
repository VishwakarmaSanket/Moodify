import { useState } from "react";
import FaceExpression from "../../Expressions/components/FaceExpression";
import Player from "../components/Player";
import useSong from "../hooks/useSong";
import "../styles/home.scss";
import NavBar from "../components/NavBar";
import Playlist from "../components/Playlist";
import LeftPanel from "../components/LeftPanel";

const Home = () => {
  const { getSongHandler } = useSong();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  async function handleExpression(expression) {
    await getSongHandler({ mood: expression });
    setRefreshTrigger(prev => prev + 1);
  }

  //   <div className="page">
  //   <FaceExpression onClick={handleExpression} />
  //   <Player />
  // </div>

  return (
    <div className="app-layout">
      <NavBar />
      <div className="app-body">
        <div className="left-panel">
          <LeftPanel onMoodSelect={handleExpression} refreshTrigger={refreshTrigger} />
        </div>
        <div className="central-panel">
          <FaceExpression onClick={handleExpression} />
        </div>
        <div className="right-panel">
          <Playlist />
        </div>
      </div>
      <div className="player-container">
        <Player />
      </div>
    </div>
  );
};

export default Home;
