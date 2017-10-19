import { Injectable, Inject } from '@angular/core';
import { B2bConfig } from './b2b-config.class';
import { Http, URLSearchParams, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do'
import { ServiceLocatorService } from './service-locator.service';
import * as moment from 'moment'

@Injectable()
export class B2bClientService {
  private http: Http;
  public accessToken: string;
  public renewTokenBefore: moment.Moment;

  constructor(private config: B2bConfig) {
    if (config == null) {
      throw new Error("config cannot be empty")
    }
    this.http = ServiceLocatorService.injector.get(Http)
  }

  private isAuthorized() {
    return this.accessToken != null && moment.utc().isBefore(this.renewTokenBefore);
  }

  private ensureAuthorizedAsync(): Observable<any> {
    if (!this.isAuthorized()) {
      return this.authorize();
    } else {
      return Observable.of({})
    }
  }

  authorize(): Observable<any> {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append("grant_type", "clientkey");
    urlSearchParams.append("clientkey", this.config.koppelSleutel);
    return this.http.post(this.config.authUri, urlSearchParams)
      .map((res: Response) => res.json())
      .do((responseBody) => {
        this.accessToken = responseBody.access_token;
        this.renewTokenBefore = moment.utc().add(responseBody.expires_in, "seconds");
      });
  }

  private getDefaultHeaders(): Headers {
    return new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + this.accessToken,
      "Ocp-Apim-Subscription-Key": this.config.subscriptionKey
    });
  }

  get(path: string): Observable<Response> {
    let url = this.config.apiBaseUriVersioned + path;
    let options: RequestOptionsArgs = {
      headers: this.getDefaultHeaders()
    }
    return this.ensureAuthorizedAsync()
      .flatMap(() => this.http.get(url, options));
  }
}
