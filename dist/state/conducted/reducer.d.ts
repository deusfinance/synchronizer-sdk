export declare enum ConductedStatus {
    OK = "OK",
    LOADING = "LOADING",
    ERROR = "ERROR"
}
export declare type Conducted = {
    id: string;
    long: string;
    short: string;
};
interface ConductedState {
    status: ConductedStatus;
    conducted: {
        [chainId: number]: Conducted[];
    };
}
export declare const fetchConducted: import("@reduxjs/toolkit").AsyncThunk<{
    [chainId: number]: Conducted[];
}, void, {}>;
declare const reducer: import("redux").Reducer<ConductedState, import("redux").AnyAction>;
export default reducer;
export declare function useConductedState(): ConductedState;
