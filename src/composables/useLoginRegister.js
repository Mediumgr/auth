export const useLoginRegister = (isNew, store) =>
  store.dispatch("isNewUser", !isNew);
