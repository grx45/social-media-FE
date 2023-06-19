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
        //kirim data token ke backend
        let response = await axios.get(`${API_URL}user/keeplogin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // memperbarui localstorage
        localStorage.setItem("socio_login", response.data.token);
        //menyimpan ulang ke reducer
        dispatch({
          type: "UPDATE_SOCIO",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log("error");
    }
  };
};
