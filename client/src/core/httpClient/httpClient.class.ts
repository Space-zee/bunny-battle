import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IResponse } from "@/interfaces/response.interface";

export enum EHttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

class HttpService {
  private http: AxiosInstance;
  private baseURL = 'http://localhost:3000';

  constructor() {
    this.http = axios.create({ baseURL: this.baseURL });
  }

  // Handle HTTP requests
  public async request<Res>(
    method: EHttpMethod,
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<IResponse<Res>> {
    try {
      const response = await this.http.request<Res>({
        method,
        url,
        ...options,
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (e: any) {
      console.log('e', e)
      const error = e?.response?.data?.error
        ? e?.response?.data?.error
        : "Unknown error";
      return {
        success: false,
        error,
        data: null,
      };
    }
  }

  public async get<Res>(
    apiPaths: string,
    params?: any,
  ): Promise<IResponse<Res>> {
    return this.request<Res>(
      EHttpMethod.GET,
      `${this.baseURL}${apiPaths}`,
      {
        params,
      },
    );
  }

  // Perform POST request
  public async post<Req, Res>(
    apiPaths: string,
    payload: Req,
    params?: any,
  ): Promise<IResponse<Res>> {
    return this.request<Res>(
      EHttpMethod.POST,
      `${this.baseURL}${apiPaths}`,
      {
        params,
        data: payload,
      },
    );
  }

  // Perform UPDATE request
  public async update<Req, Res>(
    apiPaths: string,
    payload: Req,
    params?: any,
  ): Promise<IResponse<Res>> {
    return this.request<Res>(
      EHttpMethod.PUT,
      `${this.baseURL}${apiPaths}`,
      {
        params,
        data: payload,
      },
    );
  }

  // Perform DELETE request
  public async delete<Req, Res>(
    apiPaths: string,
    payload: Req,
    params?: any,
  ): Promise<IResponse<Res>> {
    return this.request<Res>(
      EHttpMethod.DELETE,
      `${this.baseURL}${apiPaths}`,
      {
        params,
        data: payload,
      },
    );
  }
}

export { HttpService as default };
