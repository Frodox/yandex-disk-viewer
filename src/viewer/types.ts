export interface IViewerError {
  readonly message: string;
}

export interface IFileMeta {
  readonly name: string;
  readonly path: string;
  readonly size?: number;
  readonly type: string;
}

export interface IFolderState {
  readonly error?: IViewerError;
  readonly isLoading: boolean;
  readonly items: IFileMeta[];
  readonly path?: string;
  readonly total: number;
}
