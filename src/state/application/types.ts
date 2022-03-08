export interface ApplicationState {
  forceRefresh: number
}

export interface WithApplicationState {
  [path: string]: ApplicationState
}
