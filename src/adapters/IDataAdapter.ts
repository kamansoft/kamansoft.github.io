
// Generic data adapter interface
export interface IDataAdapter<T> {
  getData(): Promise<T>;
}

// Specific adapters for each data type
export interface IServicesDataAdapter extends IDataAdapter<any> {}
export interface IAboutDataAdapter extends IDataAdapter<any> {}
export interface ITeamDataAdapter extends IDataAdapter<any> {}
export interface IProcessDataAdapter extends IDataAdapter<any> {}
