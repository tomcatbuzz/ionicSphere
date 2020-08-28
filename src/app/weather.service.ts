import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  lat: number;
  lng: number;
  readonly ROOT_URL = 'https://us-central1-ionicsphere-8b1a7.cloudfunctions.net/darkSkyProxy';

  constructor(private http: HttpClient) { }

  currentForecast(lat: number, lng: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('lat', lat.toString());
    params = params.set('lng', lng.toString());

    return this.http.get(this.ROOT_URL, { params });
  }
}

// TEST Code?
// const params = new HttpParams()
//   .set('id', 'someid');
//   .set('name', 'johndoe');

    // const fullURL = `${baseURL}?${params.toString()}`;
    // console.log({ fullURL });
