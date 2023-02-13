// Reducer file for store data state

// step 1 - buat variable yang  menyimpan data awalnya:
const INITIAL_STATE = {
  id: null,
  username: "",
  email: "",
  status: "",
  imgProfile: "",
  role: "",
};

// step 2 - create function reducer, yang gunanya menerima action dan mencocokan antara data yang dibawa action dengan data initial - berarti dia butuh 2 property
//value yang kita kasih default value INITIAL_STATE

export const SocioReducer = (state = INITIAL_STATE, action) => {
  // parameter action akan menerima 2 peoperty, yaitu type dan payload
  // type: untuk memilih data mana yang mau diperbarui
  // payload: berisi data yang akan diisi
  switch (action.type) {
    //below ini type actionnya
    case "UPDATE_SOCIO":
      // below ini payloadnya. In this case overwrite data "state" dengan data yg dikirim "action.payload"
      return { ...state, ...action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
