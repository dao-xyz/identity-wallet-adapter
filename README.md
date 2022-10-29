# Identity-wallet-adapter
A simple chain agnostic wallet adapter for signing arbitrary messages.
 
Supports: 
- Metamask 
- PhantomWallet


Based on the Solana Wallet Adapter (but with chain specific functionality removed). So coming from the Solana Wallet Adapter, you only need to replace 

```@solana/wallet-adapter...```

with 

```@dao-xyz/wallet-adapter...```

and you will served with a similiar API