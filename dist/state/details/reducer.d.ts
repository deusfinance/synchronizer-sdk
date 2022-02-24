import { Sector } from '../../types';
export declare enum DetailsStatus {
    OK = "OK",
    LOADING = "LOADING",
    ERROR = "ERROR"
}
interface DetailsState {
    status: DetailsStatus;
    details: {
        [symbol: string]: {
            name: string;
            sector: Sector;
            symbol: string;
            shortSymbol: string;
            longSymbol: string;
        };
    };
}
export declare const fetchDetails: import("@reduxjs/toolkit").AsyncThunk<{
    [symbol: string]: {
        name: string;
        sector: Sector;
        symbol: string;
        shortSymbol: string;
        longSymbol: string;
    };
}, void, {}>;
declare const reducer: import("redux").Reducer<DetailsState, import("redux").AnyAction>;
export default reducer;
export declare function useDetailsState(): DetailsState;
