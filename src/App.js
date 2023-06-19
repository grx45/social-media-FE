import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Landing from "./Pages/Landing";
import ForgotPasss from "./Pages/ForgotPass";
import Reset from "./Pages/ResetPass";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { mwKeepLogin } from "./actions/SocioAction";
import NotFound from "./Pages/NotFound";
import OtherProfile from "./Pages/OtherProfile";
import Verify from "./Pages/Verify";
import MyProfile from "./Pages/MyProfile";
import Footerbar from "./Components/Footerbar";

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
        {role == null} ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:username" element={<OtherProfile />} />
        </>
        )
        <Route path="/:username" element={<OtherProfile />} />
        <Route path="/profile/:username" element={<OtherProfile />} />
        <Route path="/landing" element={<Landing loading={loading} />} />
        <Route path="/forgot" element={<ForgotPasss />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/verification/:token" element={<Verify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footerbar />
    </div>
  );
}

export default App;
