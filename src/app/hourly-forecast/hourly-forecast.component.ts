import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss'],
})
export class HourlyForecastComponent implements OnInit {

  lat: number;
  lng: number;
  hourly: Observable<any>;
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
  //   this.hourly = this.weather.currentForecast(this.lat, this.lng)
  //   .pipe(
  //     tap(data => console.log(data)),
  //     );
  //   this.isLoading = false;
  // }

  ionViewDidEnter() {
    this.isLoading = true;
    this.hourly = this.weather.currentForecast(this.lat, this.lng)
      .pipe(
        tap(data =>
          console.log(data))
      );
    console.log(this);
    this.isLoading = false;
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
