export declare enum SignaturesStatus {
    OK = "OK",
    LOADING = "LOADING",
    ERROR = "ERROR"
}
export interface Signature {
    multiplier: number;
    signs: {
        sell: {
            v: number;
            r: string;
            s: string;
        };
        buy: {
            v: number;
            r: string;
            s: string;
        };
    };
    price: string;
    fee: number;
    blockNo: number;
    index: number;
}
export interface Signatures {
    [contract: string]: Signature;
}
interface SignaturesState {
    status: SignaturesStatus;
    signatures: {
        [chainId: number]: Signatures;
    };
}
export declare const fetchSignatures: import("@reduxjs/toolkit").AsyncThunk<{
    [chainId: number]: Signatures;
}, void, {}>;
declare const reducer: import("redux").Reducer<SignaturesState, import("redux").AnyAction>;
export default reducer;
export declare function useSignaturesState(): SignaturesState;
