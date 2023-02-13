import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { SocioReducer } from "./SocioReducer";
import reduxThunk from "redux-thunk";

export const globalStore = configureStore(
  {
    reducer: {
      // SocioReducer,
      SocioReducer: SocioReducer,
    },
  },
  applyMiddleware(reduxThunk)
);
