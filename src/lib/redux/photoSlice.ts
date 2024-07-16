import { PhotoDetail } from '@/components/UploadPhotos';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  photos: PhotoDetail[];
}

// Define the initial state using that type
const initialState: InitialState = {
  photos: [],
};

export const photoSlice = createSlice({
  name: 'photo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<PhotoDetail[]>) => {
      state.photos = action.payload;
    },
  },
});

export const { setPhotos } = photoSlice.actions;

export default photoSlice.reducer;
