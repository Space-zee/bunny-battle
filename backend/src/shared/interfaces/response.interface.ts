export interface IResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}
