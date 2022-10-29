import {  BaseWalletAdapter, WalletAdapter } from './adapter';

export type SignerWalletAdapter = WalletAdapter ;

export interface MessageSignerWalletAdapterProps {
    signMessage(message: Uint8Array): Promise<Uint8Array>;
}

export type MessageSignerWalletAdapter = WalletAdapter & MessageSignerWalletAdapterProps;
export abstract class BaseSignerWalletAdapter extends BaseWalletAdapter implements SignerWalletAdapter {}
export abstract class BaseMessageSignerWalletAdapter extends BaseSignerWalletAdapter
    implements MessageSignerWalletAdapter
{
    abstract signMessage(message: Uint8Array): Promise<Uint8Array>;
}
