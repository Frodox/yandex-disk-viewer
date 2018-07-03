interface IFileMeta {
  readonly name: string;
  readonly path: string;
  readonly size?: number;
  readonly type: string;
}

export { IFileMeta };
