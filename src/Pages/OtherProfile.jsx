import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../Helper";

function OtherProfile(props) {
  const params = useParams();
  const [data, Setdata] = React.useState(null);

  console.log("Get from req.params url browser", params);

  const getDataUser = async () => {
    try {
      let response = await axios.get(`${API_URL}user?id=${params.id}`);
      Setdata(response.data[0]);
    } catch (error) {
      console.log("error");
    }
  };
  React.useEffect(() => {
    getDataUser();
  }, []);

  return (
    <div className="text-2xl mt-[73px]">Other Profile {data?.username}</div>
  );
}

export default OtherProfile;
