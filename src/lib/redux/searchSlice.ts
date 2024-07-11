import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ISearchData {
  searchUser?: string;
  searchConversation?: string;
}

interface InitialState {
  searchData: ISearchData;
}

// Define the initial state using that type
const initialState: InitialState = {
  searchData: {
    searchUser: '',
    searchConversation: '',
  },
};

export const searchSlice = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStoreSearchValue: (state, action:PayloadAction<ISearchData>) => {
      state.searchData = action.payload;
    },
  },
});

export const { setStoreSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
