import type { NextPage } from 'next'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { requestWallet, getWalletBalance } from '../utils/web3'
import { RootState } from '../store'
import { connectWallet } from '../store/reducer'
const Home: NextPage = () => {
  const wallet = useSelector((state: RootState) => ({
    address: state.address,
    connected: state.connected,
    balance: state.balance,
  }))
  const dispatch = useDispatch()

  const handleConnectToWallet = async () => {
    console.log('clicked connect to wallet')
    const walletAddress = await requestWallet()
    if (walletAddress !== undefined) {
      const walletBalance = await getWalletBalance(walletAddress[0])
      dispatch(connectWallet({ walletAddress, walletBalance }))
    }
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js with Web3!
          </a>
        </h1>

        <p className="mt-3 mb-10 text-2xl">
          Get started by Connecting your wallet.
        </p>
        <div>
          {wallet.address.length < 1 ? (
            <button
              onClick={handleConnectToWallet}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Connect Wallet
            </button>
          ) : (
            <div>
              <p>Wallet Address: {wallet.address}</p>
              <p>Wallet Balance: {wallet.balance}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
