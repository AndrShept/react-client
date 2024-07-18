import { PhotoDetail } from '@/components/UploadPhotos';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
  photos: PhotoDetail[];
  selectedPhotos: PhotoDetail[];
}

// Define the initial state using that type
const initialState: InitialState = {
  photos: [],
  selectedPhotos: [],
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<PhotoDetail[]>) => {
      state.photos = action.payload;
      state.selectedPhotos = state.photos.filter((photo) => photo.isSelected);
    },
    setSelectedPhoto: (state, action: PayloadAction<string>) => {
      state.photos = state.photos.map((photo) =>
        photo.id === action.payload
          ? {
              ...photo,
              isSelected: !photo.isSelected,
            }
          : photo,
      );
      state.selectedPhotos = state.photos.filter((photo) => photo.isSelected);
    },
    selectAllPhoto: (state) => {
      state.photos = state.photos.map((photo) => ({
        ...photo,
        isSelected: true,
      }));
      state.selectedPhotos = state.photos.filter((photo) => photo.isSelected);
    },
    unSelectAllPhoto: (state) => {
      state.photos = state.photos.map((photo) => ({
        ...photo,
        isSelected: false,
      }));
      state.selectedPhotos = state.photos.filter((photo) => photo.isSelected);
    },
    resetState: (state) => {
      state.photos = [];
      state.selectedPhotos = [];
    },
  },
});

export const {
  setPhotos,
  setSelectedPhoto,
  selectAllPhoto,
  unSelectAllPhoto,
  resetState,
} = photoSlice.actions;

export default photoSlice.reducer;
