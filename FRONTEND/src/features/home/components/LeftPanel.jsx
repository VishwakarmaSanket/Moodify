import React, { useState } from "react";
import Discover from "./Discover";
import Upload from "./Upload";
import "../styles/leftpanel.scss";

const LeftPanel = ({ onMoodSelect, refreshTrigger }) => {
  const [activeTab, setActiveTab] = useState("discover");
  return (
    <aside className="LeftPanel">
      <div className="LeftPanel-tab">
        <button
          className={activeTab === "discover" ? "active" : ""}
          onClick={() => setActiveTab("discover")}
        >
          Discover
        </button>
        <button
          className={activeTab === "upload" ? "active" : ""}
          onClick={() => setActiveTab("upload")}
        >
          Upload
        </button>
      </div>
      {activeTab === "discover" ? (
        <Discover onMoodSelect={onMoodSelect} refreshTrigger={refreshTrigger} />
      ) : (
        <Upload />
      )}
    </aside>
  );
};

export default LeftPanel;
