import { PhotoDetail } from '@/components/UploadPhotos';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModeType = 'add' | 'edit' | null;

interface InitialState {
  photos: PhotoDetail[];
  isShow: boolean;
  mode: ModeType;
  page: number;
}

// Define the initial state using that type
const initialState: InitialState = {
  photos: [],
  isShow: false,
  mode: null,
  page: 1,
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhotos: (state, action: PayloadAction<PhotoDetail[]>) => {
      state.photos = action.payload;
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
    },
    selectAllPhoto: (state) => {
      state.photos = state.photos.map((photo) => ({
        ...photo,
        isSelected: true,
      }));
    },
    unSelectAllPhoto: (state) => {
      state.photos = state.photos.map((photo) => ({
        ...photo,
        isSelected: false,
      }));
    },
    resetState: (state) => {
      state = initialState;
    },
    setIsShow: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload;
    },
    setMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    defaultPage: (state) => {
      state.page = 1;
    },
  },
});

export const {
  setPhotos,
  setSelectedPhoto,
  selectAllPhoto,
  unSelectAllPhoto,
  resetState,
  setIsShow,
  setMode,
  incrementPage,
  defaultPage,
} = photoSlice.actions;

export default photoSlice.reducer;
