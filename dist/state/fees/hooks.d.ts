import BigNumber from 'bignumber.js';
import { FeesState } from './reducer';
import { Sector } from '../../types';
export declare function useFeesState(): FeesState;
export declare function useTotalFeeCallback(): (sector: Sector) => BigNumber;
export declare function usePlatformFeeCallback(): (sector: Sector) => BigNumber;
export declare function usePartnerFeeCallback(): (sector: Sector) => BigNumber;
