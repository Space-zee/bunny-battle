export interface IResponse<T = void> {
  success: boolean;
  error?: string;
  data: T | null;
}
