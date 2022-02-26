import Web3 from 'web3'

let web3: Web3
if (typeof window !== 'undefined') {
  web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')
}

export const requestWallet = async () => {
  try {
    return await web3.eth.requestAccounts()
  } catch (error) {
    console.log(error)
  }
}

export const getWalletBalance = async (wallet: string) => {
  try {
    const balance = await web3.eth.getBalance(wallet)
    return convertBalance(balance)
  } catch (error) {
    console.log(error)
  }
}

const convertBalance = async (balance: string) => {
  return web3.utils.fromWei(balance)
}
