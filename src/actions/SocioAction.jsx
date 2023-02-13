import axios from "axios";
import { API_URL } from "../Helper";

export const UpdateSocioAction = (data) => {
  return {
    type: "UPDATE_SOCIO", // type memilih tindakan yang akan dilakukan pada data reducer
    payload: data, // payload adalah data yang ingin disimpan ke global reducer
  };
};

export const logoutAction = () => {
  localStorage.removeItem("socio_login");
  return {
    type: "LOGOUT",
  };
};

export const mwKeepLogin = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("socio_login");
      if (token) {
        // if token bner ada
        //ambil data dari json server
        let response = await axios.get(`${API_URL}user?id=${token}`);
        // memperbarui localstorage
        localStorage.setItem("socio_login", response.data[0].id);
        //menyimpan ulang ke reducer
        dispatch({
          type: "UPDATE_SOCIO",
          payload: response.data[0],
        });
      }
    } catch (error) {
      console.log("error");
    }
  };
};
