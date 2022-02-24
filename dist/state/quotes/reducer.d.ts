export declare enum QuotesStatus {
    OK = "OK",
    LOADING = "LOADING",
    ERROR = "ERROR"
}
declare type Quote = {
    price: string;
    open: boolean;
};
interface Quotes {
    [symbol: string]: {
        long: Quote;
        short: Quote;
    };
}
export interface QuotesState {
    status: QuotesStatus;
    quotes: {
        [chainId: number]: Quotes;
    };
}
export declare const fetchQuotes: import("@reduxjs/toolkit").AsyncThunk<{
    [chainId: number]: Quotes;
}, void, {}>;
declare const reducer: import("redux").Reducer<QuotesState, import("redux").AnyAction>;
export default reducer;
