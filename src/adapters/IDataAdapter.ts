
// Generic data adapter interface
export interface IDataAdapter<T> {
  getData(): Promise<T>;
}

// Specific adapters for each data type
export interface IServicesDataAdapter extends IDataAdapter<any> {}
export interface IAboutDataAdapter extends IDataAdapter<any> {}
export interface ITeamDataAdapter extends IDataAdapter<any> {}
export interface IProcessDataAdapter extends IDataAdapter<any> {}
export interface IHeroDataAdapter extends IDataAdapter<any> {}
export interface IPortfolioDataAdapter extends IDataAdapter<any> {}
export interface IContactDataAdapter extends IDataAdapter<any> {}
export interface IFooterDataAdapter extends IDataAdapter<any> {}
export interface IBlogDataAdapter extends IDataAdapter<any> {}
