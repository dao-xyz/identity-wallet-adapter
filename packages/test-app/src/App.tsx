import logo from './logo.svg';
import './App.css';
import ConnectDialog from './Wallet';
import { useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { MetaMaskWalletAdapter } from '@dao-xyz/wallet-adapter-metamask';
import { PhantomWalletAdapter } from '@dao-xyz/wallet-adapter-phantom';
import { WalletProvider } from '@dao-xyz/wallet-adapter-react';
import Content from './Content';

function App() {

  const wallets = useMemo(
    () => [
      new MetaMaskWalletAdapter(),
      new PhantomWalletAdapter()
    ],
    []
  );


  const [openConnectDialog, setOpenConnectDialog] = useState<boolean>(false);
  return (
    <WalletProvider wallets={wallets} autoConnect>
      <Content></Content>
    </WalletProvider>
  );
}

export default App;
