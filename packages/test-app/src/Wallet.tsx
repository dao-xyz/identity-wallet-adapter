import * as React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, Box, Collapse, Link, Snackbar } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';

import { WalletName, WalletReadyState } from '@dao-xyz/wallet-adapter-base';
import { useWallet, Wallet } from '@dao-xyz/wallet-adapter-react';
import { WalletIcon } from '@dao-xyz/wallet-adapter-material-ui';
import { FC, MouseEventHandler } from 'react';

export interface WalletListItemProps {
    handleClick: MouseEventHandler<HTMLButtonElement>;
    tabIndex?: number;
    wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({ handleClick, tabIndex, wallet }) => {
    return (
        <li>
            <Button onClick={handleClick} startIcon={<Box sx={{ width: '30px', display: 'flex', mr: 1, height: '30px' }}><WalletIcon wallet={wallet} style={{ filter: wallet.readyState !== WalletReadyState.Installed ? "grayscale(1)" : undefined }} /></Box>} tabIndex={tabIndex}>
                {wallet.adapter.name}
                {wallet.readyState === WalletReadyState.Installed && <> - Detected</>}
            </Button>
        </li>
    );
};


export default function ConnectDialog(props: { open: boolean, onClose?: () => void }) {
    const [open, setOpen] = React.useState(props.open);

    const { wallets, select } = useWallet();
    const [expanded, setExpanded] = React.useState(false);

    const handleClose = (event: React.MouseEvent) => {

        setOpen(false);
        if (props.onClose)
            props.onClose();
    };
    React.useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    const [installedWallets, otherWallets] = React.useMemo(() => {
        const installed: Wallet[] = [];
        const notDetected: Wallet[] = [];
        const loadable: Wallet[] = [];

        for (const wallet of wallets) {
            if (wallet.readyState === WalletReadyState.NotDetected) {
                notDetected.push(wallet);
            } else if (wallet.readyState === WalletReadyState.Loadable) {
                loadable.push(wallet);
            } else if (wallet.readyState === WalletReadyState.Installed) {
                installed.push(wallet);
            }
        }

        return [installed, [...loadable, ...notDetected]];
    }, [wallets]);

    const getStartedWallet = React.useMemo(() => {
        return installedWallets.length
            ? installedWallets[0]
            : wallets.find((wallet: { adapter: { name: WalletName } }) => wallet.adapter.name === 'Torus') ||
            wallets.find((wallet: { adapter: { name: WalletName } }) => wallet.adapter.name === 'Phantom') ||
            wallets.find((wallet: { readyState: any }) => wallet.readyState === WalletReadyState.Loadable) ||
            otherWallets[0];
    }, [installedWallets, wallets, otherWallets]);

    const handleCollapseClick = React.useCallback(() => setExpanded(!expanded), [expanded]);
    const handleWalletClick = React.useCallback(
        (event: React.MouseEvent, walletName: WalletName) => {
            select(walletName);
            handleClose(event);
        },
        [select, handleClose]
    );
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>How do you want to connect?</DialogTitle>
            <DialogContent>
                {installedWallets.length ? (
                    <>
                        <ul className="wallet-adapter-modal-list">
                            {installedWallets.map((wallet) => (
                                <WalletListItem
                                    key={wallet.adapter.name}
                                    handleClick={(event) => handleWalletClick(event, wallet.adapter.name)}
                                    wallet={wallet}
                                />
                            ))}
                            {otherWallets.length ? (
                                <Collapse in={expanded} id="wallet-adapter-modal-collapse">
                                    {otherWallets.map((wallet) => (
                                        <WalletListItem
                                            key={wallet.adapter.name}
                                            handleClick={(event) =>
                                                handleWalletClick(event, wallet.adapter.name)
                                            }
                                            tabIndex={expanded ? 0 : -1}
                                            wallet={wallet}
                                        />
                                    ))}
                                </Collapse>
                            ) : null}
                        </ul>
                        {otherWallets.length ? (
                            <button
                                className="wallet-adapter-modal-list-more"
                                onClick={handleCollapseClick}
                                tabIndex={0}
                            >
                                <span>{expanded ? 'Less ' : 'More '}options</span>
                                <svg
                                    width="13"
                                    height="7"
                                    viewBox="0 0 13 7"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`${expanded ? 'wallet-adapter-modal-list-more-icon-rotate' : ''
                                        }`}
                                >
                                    <path d="M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z" />
                                </svg>
                            </button>
                        ) : null}
                    </>
                ) : (
                    <>
                        <h1 className="wallet-adapter-modal-title">
                            You need to install a wallet to continue
                        </h1>
                        <div className="wallet-adapter-modal-middle">
                            IMAGE
                            {/*    <button
                                type="button"
                                className="wallet-adapter-modal-middle-button"
                                onClick={(event) => handleWalletClick(event, getStartedWallet.adapter.name)}
                            >
                            </button> */}
                        </div>
                        {otherWallets.length ? (
                            <>
                                <button
                                    className="wallet-adapter-modal-list-more"
                                    onClick={handleCollapseClick}
                                    tabIndex={0}
                                >
                                    <span>{expanded ? 'Hide ' : 'Already have a wallet? View '}options</span>
                                    <svg
                                        width="13"
                                        height="7"
                                        viewBox="0 0 13 7"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`${expanded ? 'wallet-adapter-modal-list-more-icon-rotate' : ''
                                            }`}
                                    >
                                        <path d="M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z" />
                                    </svg>
                                </button>
                                <Collapse in={expanded} id="wallet-adapter-modal-collapse">
                                    <ul className="wallet-adapter-modal-list">
                                        {otherWallets.map((wallet) => (
                                            <WalletListItem
                                                key={wallet.adapter.name}
                                                handleClick={(event) =>
                                                    handleWalletClick(event, wallet.adapter.name)
                                                }
                                                tabIndex={expanded ? 0 : -1}
                                                wallet={wallet}
                                            />
                                        ))}
                                    </ul>
                                </Collapse>
                            </>
                        ) : null}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
