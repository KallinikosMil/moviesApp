import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../redux/store'; // Adjust based on your store location
import { StatusType } from 'common';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  AuthError,
} from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { Alert } from 'react-native';

interface AuthState {
  user: any;
  status: StatusType;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: StatusType.IDLE,
  error: null,
};

const registerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUserSlice(state) {
      state.status = StatusType.LOADING;
      state.error = null;
    },
    registerUserSliceSuccess(state, action) {
      if (!action.payload) {
        state.status = StatusType.FAIL;
        state.error =
          'User registration was successful, but no user data was returned.';
        return;
      }
      Alert.alert('Register Completed check ur email');
      state.status = StatusType.SUCCESS;
      state.user = action.payload; // Now only serializable data
      state.error = null;
      console.log(state.user);
    },
    registerUserSliceError(state, action) {
      state.status = StatusType.ERROR;
      state.error = action.payload;
      Alert.alert('Error', state.error);
    },
    registerUserSliceFail(state, action) {
      state.status = StatusType.FAIL;
      state.error = action.payload;
      console.log(2);
    },
  },
});

// export const registerUser =
//   (email: string, password: string) => async (dispatch: AppDispatch) => {
//     dispatch(registerSlice.actions.registerUserSlice());
//     console.log('Dispatching registerUser action');

//     const handleSuccess = async (user: any) => {
//       await sendEmailVerification(user);
//       dispatch(registerSlice.actions.registerUserSliceSuccess(user));
//     };

//     const handleError = (error: AuthError) => {
//       let errorMessage = 'An error occurred during registration.';

//       switch (error.code) {
//         case 'auth/invalid-email':
//           errorMessage = 'The email address is badly formatted.';
//           break;
//         case 'auth/weak-password':
//           errorMessage = 'The password must be at least 6 characters long.';
//           break;
//         case 'auth/email-already-in-use':
//           errorMessage =
//             'The email address is already in use by another account.';
//           break;
//         case 'auth/operation-not-allowed':
//           errorMessage =
//             'Email/password accounts are not enabled. Contact support.';
//           break;
//         default:
//           errorMessage = error.message;
//       }

//       dispatch(registerSlice.actions.registerUserSliceError(errorMessage));
//     };

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       if (userCredential.user) {
//         await handleSuccess(userCredential.user);
//       } else {
//         handleError({
//           code: 'auth/user-not-found',
//           message: 'User data is missing after registration.',
//         } as AuthError);
//       }
//     } catch (error) {
//       handleError(error as AuthError);
//     }
//   };
export const registerUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(registerSlice.actions.registerUserSlice());

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const serializedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      };

      await sendEmailVerification(user);
      dispatch(registerSlice.actions.registerUserSliceSuccess(serializedUser));
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Registration process failed';
      dispatch(registerSlice.actions.registerUserSliceError(errorMessage));
    }
  };

export const {
  registerUserSlice,
  registerUserSliceSuccess,
  registerUserSliceError,
  registerUserSliceFail,
} = registerSlice.actions;
export default registerSlice.reducer;
