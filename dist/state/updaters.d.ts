import { SupportedChainId } from '../constants/chains';
export interface UpdaterProps {
    chainId: SupportedChainId;
    partnerId: string;
}
export default function Updaters({ chainId, partnerId }: UpdaterProps): JSX.Element;
