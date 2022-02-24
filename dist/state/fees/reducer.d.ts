import { Sector } from '../../types';
export declare enum FeesStatus {
    OK = "OK",
    LOADING = "LOADING",
    ERROR = "ERROR"
}
declare type Fee = {
    [Sector.STOCKS]: string;
    [Sector.CRYPTO]: string;
    [Sector.FOREX]: string;
    [Sector.COMMODITIES]: string;
    [Sector.MISC]: string;
};
export interface FeesState {
    status: FeesStatus;
    platformFee: Fee;
    partnerFee: Fee;
}
declare const reducer: import("redux").Reducer<FeesState, import("redux").AnyAction>;
export default reducer;
export declare const updatePlatformFee: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, updatePartnerFee: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
