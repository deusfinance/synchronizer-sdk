import React from 'react';
import { SupportedChainId } from './constants/chains';
export declare function Provider({ chainId, partnerId, children, }: {
    chainId: SupportedChainId;
    partnerId: string;
    children: React.ReactNode;
}): JSX.Element;
