
import './App.css';
import ConnectDialog from './Wallet';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useWallet } from '@dao-xyz/wallet-adapter-react';

function Content() {
    const { wallet, publicKey, signMessage } = useWallet();

    const [openConnectDialog, setOpenConnectDialog] = useState<boolean>(false);
    return (

        <div className="App">
            <>{wallet ? <>PublicKey: {publicKey?.toString()}</> : <>Not connected</>}</>
            <Button onClick={() => setOpenConnectDialog(!openConnectDialog)}><>Connect {openConnectDialog}</></Button>
            {signMessage && <Button onClick={() => signMessage(new Uint8Array([1, 2, 3])).then((signedMessage) => {
                alert("Signed message: " + Buffer.from(signedMessage).toString('hex'))
            })}><>Sign a message {openConnectDialog}</></Button>}
            <ConnectDialog open={openConnectDialog} onClose={() => setOpenConnectDialog(false)} ></ConnectDialog>
        </div>
    );
}

export default Content;

