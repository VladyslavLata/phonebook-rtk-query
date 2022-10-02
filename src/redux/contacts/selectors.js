import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectFilterName = state => state.contacts.filter;
export const selectLoading = state => state.contacts.isLoading;
export const selectErrorMessage = state => state.contacts.error;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilterName],
  (contacts, filterName) => {
    const filterNameNormalized = filterName.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNameNormalized)
    );
  }
);
