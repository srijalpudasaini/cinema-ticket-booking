import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSelector';


export default configureStore({
  reducer: {
    user: userReducer
  }
})