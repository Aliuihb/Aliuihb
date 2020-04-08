import React, { useState, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, Guide, MiniGuide, Queue, MessageBox } from "../Components";
import { NavProvider } from "../Context/NavContext";
import { GuideProvider } from "../Context/GuideContext";
import { UrlLocationProvider } from "../Context/UrlLocationContext";
import { WLVProvider } from "../Context/WLVContext";
import { MessageBoxProvider } from "../Context/MessageBoxContext";
import { QueueProvider } from "../Context/QueueContext";
import Results from "./Results";
import Home from "./Home";
import WLV from "./WLV";
import "./Sass/app_style.scss";

function App() {
  // Slider State
  const [ShowGuide, setShowGuide] = useState(true);

  // ===========================
  //       Handle Guide
  // ===========================

  // Handle Show
  const HandleShowGuide = useCallback(() => {
    setShowGuide(!ShowGuide);
  }, [setShowGuide, ShowGuide]);

  return (
    <div className="rootContainer">
      <MessageBoxProvider>
        <QueueProvider>
          <GuideProvider>
            {/* NAVBAR */}
            <NavProvider>
              <Navbar HandleShowGuide={HandleShowGuide} />
              {/* PAGES */}
              <UrlLocationProvider>
                <WLVProvider>
                  <div className="page_container">
                    <Switch>
                      {/* HOME PAGE ROUTE */}
                      <Route path="/" exact component={Home} />
                      {/* RESULTS PAGE ROUTE*/}
                      <Route path="/results/search=:id" component={Results} />
                      {/* WLV PAGE ROUTE*/}
                      <Route path="/wlv/WL" exact component={WLV} />
                    </Switch>
                  </div>
                  {/* GUIDE */}
                  <MiniGuide />
                  <Guide ShowGuide={ShowGuide} setShowGuide={setShowGuide} />
                  {/* MESSAGE BOX */}
                  <MessageBox />
                </WLVProvider>
              </UrlLocationProvider>
            </NavProvider>
          </GuideProvider>
          {/* QUEUE */}
          <Queue />
        </QueueProvider>
      </MessageBoxProvider>
    </div>
  );
}

export default App;
