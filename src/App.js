import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Landing from "./Pages/Landing";
import { Route, Routes } from "react-router-dom";
import "flowbite";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { mwKeepLogin } from "./actions/SocioAction";
import NotFound from "./Pages/NotFound";
import OtherProfile from "./Pages/OtherProfile";
import Verify from "./Pages/Verify";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.SocioReducer.role);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    dispatch(mwKeepLogin());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Navbar loading={loading} />
      <Routes>
        {!role ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : null}
        <Route path="/landing" element={<Landing loading={loading} />} />
        <Route path="/other/:id" element={<OtherProfile />} />
        <Route path="/verification/:token" element={<Verify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
