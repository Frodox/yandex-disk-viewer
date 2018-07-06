import { IFolderState } from '../viewer/types';

interface IAuthState {
  readonly token: string;
}

interface IStoreState {
  readonly auth: IAuthState;
  readonly folder: IFolderState;
}

export { IAuthState, IStoreState };
