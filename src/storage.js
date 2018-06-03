const saveStateToStorage = state =>
  localStorage.setItem('computer_lab_state', JSON.stringify(state))

const retrieveStateFromStorage = () => JSON.parse(localStorage.getItem('computer_lab_state'))

export { saveStateToStorage, retrieveStateFromStorage }
