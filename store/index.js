export const state = () => ({
  count: 12
})

export const getters = {
  doubleCount(state) {
    return state.count * 2;
  }
};

