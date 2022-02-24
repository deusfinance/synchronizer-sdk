import { Action, AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook } from 'react-redux';
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    application: any;
    conducted: any;
    details: any;
    fees: any;
    quotes: any;
    signatures: any;
}, AnyAction, import("@reduxjs/toolkit").MiddlewareArray<import("redux-thunk").ThunkMiddleware<{
    application: any;
    conducted: any;
    details: any;
    fees: any;
    quotes: any;
    signatures: any;
}, AnyAction, null> | import("redux-thunk").ThunkMiddleware<{
    application: any;
    conducted: any;
    details: any;
    fees: any;
    quotes: any;
    signatures: any;
}, AnyAction, undefined> | import("redux").Middleware<{}, {
    application: any;
    conducted: any;
    details: any;
    fees: any;
    quotes: any;
    signatures: any;
}, import("redux").Dispatch<AnyAction>>>>;
export default store;
export declare type AppState = ReturnType<typeof store.getState>;
export declare type AppDispatch = typeof store.dispatch;
export declare type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
export declare type AppThunkDispatch = ThunkDispatch<{}, void, AnyAction>;
export declare const useAppDispatch: () => import("redux").Dispatch<AnyAction> & ThunkDispatch<{
    application: any;
    conducted: any;
    details: any;
    fees: any;
    quotes: any;
    signatures: any;
}, null, AnyAction> & ThunkDispatch<{
    application: any;
    conducted: any;
    details: any;
    fees: any;
    quotes: any;
    signatures: any;
}, undefined, AnyAction>;
export declare const useAppSelector: TypedUseSelectorHook<AppState>;
