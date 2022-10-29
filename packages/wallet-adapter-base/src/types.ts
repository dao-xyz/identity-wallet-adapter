import { WalletAdapter } from './adapter';
import { MessageSignerWalletAdapter, SignerWalletAdapter } from './signer';

export type Adapter = WalletAdapter | SignerWalletAdapter | MessageSignerWalletAdapter;

