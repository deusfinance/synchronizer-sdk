interface ApplicationState {
    forceRefresh: number;
}
declare const reducer: import("redux").Reducer<ApplicationState, import("redux").AnyAction>;
export default reducer;
export declare function useApplicationState(): ApplicationState;
