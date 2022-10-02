import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import { fetchContacts, addNewContact, deleteContact } from './operations';

// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

export const contactsSlice = createSlice({
  name: 'contactsFilter',
  initialState: '',
  reducers: {
    filter(state, action) {
      return (state = action.payload);
    },
  },
  // extraReducers: {
  //   [fetchContacts.pending]: handlePending,
  //   [fetchContacts.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.items = action.payload;
  //     state.error = null;
  //   },
  //   [fetchContacts.rejected]: handleRejected,
  //   [addNewContact.pending]: handlePending,
  //   [addNewContact.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items.unshift(action.payload);
  //   },
  //   [addNewContact.rejected]: handleRejected,
  //   [deleteContact.pending]: handlePending,
  //   [deleteContact.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.error = null;
  //     const contactIndex = state.items.findIndex(
  //       item => item.id === action.payload.id
  //     );
  //     state.items.splice(contactIndex, 1);
  //   },
  //   [deleteContact.rejected]: handleRejected,
  // },
});

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6332cd55a54a0e83d258d07b.mockapi.io/phonebook',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contacts'],
    }),
    addContacts: builder.mutation({
      query: contact => ({
        url: `/contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContacts: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
} = contactsApi;
export const contactsReducer = contactsSlice.reducer;
export const { filter } = contactsSlice.actions;
