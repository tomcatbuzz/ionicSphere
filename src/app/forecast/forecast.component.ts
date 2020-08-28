import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {

  lat: number;
  lng: number;
  forecast: Observable<any>;
  isLoading = false;

  constructor(private weather: WeatherService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    } else {
      this.lat = 40.73;
      this.lng = -73.93;
    }
  }

  // getForecast() {
  //   this.isLoading = true;
  //   this.forecast = this.weather.currentForecast(this.lat, this.lng)
  //   .pipe(
  //     tap(data => console.log(data)),
  //     );
  //   this.isLoading = false;
  // }

  ionViewDidEnter() {
    this.isLoading = true;
    this.forecast = this.weather.currentForecast(this.lat, this.lng)
      .pipe(
        tap(data => console.log(data))
      );
    this.isLoading = false;
    console.log(this);
  }

  weatherIcon(icon) {
    switch (icon) {
      case 'partly-cloudy-day':
        return 'wi wi-day-cloudy';
      case 'rain':
        return 'wi wi-day-rain';
      case 'clear-day':
        return 'wi wi-day-sunny';
      case 'partly-cloudy-night':
        return 'wi wi-night-partly-cloudy';
      default:
        return `wi wi-day-sunny`;
    }
  }

}
