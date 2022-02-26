import { createSlice } from '@reduxjs/toolkit'

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    address: [],
    connected: false,
    balance: 0,
  },
  reducers: {
    connectWallet(state, action) {
      state.address = action.payload.walletAddress
      state.balance = action.payload.walletBalance
      state.connected = true
    },
    disconnectWallet(state) {
      state.address = []
      state.connected = false
    },
    updateBalance(state, action) {
      state.balance = action.payload
    },
  },
})

// Extract the action creators object and the reducer
const { actions, reducer } = walletSlice
// Extract and export each action creator by name
export const { connectWallet, disconnectWallet, updateBalance } = actions
// Export the reducer, either as a default or named export
export default reducer
