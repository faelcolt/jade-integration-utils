import { Injectable } from '@angular/core';
import { HttpStatusService } from './http-status.service';
import { Result } from '../Models/Paginator';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  constructor(
    public http: HttpStatusService,
    public router:Router
  ) {  }

  /**
   * configureHttp
   */
  public configureHttp(url: string) {
    this.http.configure(url);
  }

  /**
   *
   * @param endpoint end point to access
   * @param queryParams = null; a string for example: name=Ronaldo&type=2 doesn't write ? \n(In case send GET without queryParams, just pass null end use endpoint to do it. Ex: cars/example)
   */
  get<T>(endpoint?: string, queryParams?: string): Promise<Result<T>> {
    let new_endpoint = '';

    if(queryParams){
      console.log(queryParams);
      new_endpoint = '/' +endpoint+'?'+queryParams;
    }else{
      new_endpoint = '/'+ endpoint;
    }

    return this.http.get<Result<T>>(new_endpoint);
  }

  getById<T>(id: number, endpoint?: string): Promise<Result<T>> {
    return this.http.get<Result<T>>('/' + endpoint + '/' + id);
  }

  /**
   * Use to request POST.
   * @param body K -> K is the model dto to pass with body
   * @param endpoint String -> string to be pass with endpoint access
   */
  post<T,K>(body: K, endpoint?: string): Promise<Result<T>> {
    return this.http.post<Result<T>>('/' + endpoint, body);
  }

  /**
   * Use to request POST.
   * @param body K -> K is the model dto to pass with body
   * @param endpoint String -> string to be pass with endpoint access
   */
  put<T,K>(body: K, endpoint?: string): Promise<Result<T>> {
    return this.http.put<Result<T>>('/' + endpoint, body);
  }

  delete<T>(id: number, endpoint?: string): Promise<Result<T>> {
    return this.http.delete<Result<T>>('/' + endpoint + '/' + id);
  }

  public set_token(auth: string): void {
    this.http.set_token(auth);
  }
  public get_token(): string {
    return this.http.get_token();
  }

  public get options(){
    return this.http.options;
  }
  public set options(options:any){
    this.http.options = options;
  }
  public default_options(){
    this.http.default_options();
  }
}
