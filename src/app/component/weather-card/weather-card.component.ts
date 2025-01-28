import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  providers: [ApiService],
})
export class WeatherCardComponent implements OnInit {
  city: string = '';
  weather: any = null;
  weatherGif: string = '../../../assets/clear-day.png';
  message: string = 'Please enter a city name';
  loading: boolean = false;
  dayNightGif: string = '';
  weatherType: string = ''

  constructor(private apiService: ApiService) { }

  getWeather(city: string): void {
    if (!city.trim()) {
      this.message = 'Please enter a city name';
      this.weather = null;
      this.weatherGif = '../../../assets/clear-day.png';
      return;
    }
  
    this.loading = true;
    this.message = '';
    this.apiService.getWeather(city).subscribe({
      next: (data) => {
        console.log(data);
        this.weather = data;
        this.weatherType = data.weather[0].main;
        console.log(this.weatherType);
        const isDay = this.isDayTime(data.dt, data.sys.sunrise, data.sys.sunset);
        this.weatherGif = this.getWeatherGif(data.weather[0].main, isDay);
        this.message = '';
        this.dayNightGif = isDay ? 'https://img.freepik.com/premium-photo/gradient-color-background-colorful-vibrant-colors-multicolored-bright-colors-radiant-spectrum_955379-14548.jpg?w=360' : 'https://img.freepik.com/free-photo/gradient-blue-abstract-background-smooth-dark-blue-with-black-vignette-studio_1258-67827.jpg?t=st=1738056391~exp=1738059991~hmac=631144927b213996011b0bc5182f6a51d3be393e30debd676b574fbe1fb938c8&w=740';
      },
      error: () => {
        this.message = 'City not found! Please try again.';
        this.weather = null;
        this.weatherGif = '../../../assets/default.gif';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  

  isDayTime(currentTime: number, sunrise: number, sunset: number): boolean {
    return currentTime >= sunrise && currentTime <= sunset;
  }
  
  getWeatherGif(condition: string, isDay: boolean): string {
    const gifs: { [key: string]: { day: string; night: string } } = {
      Clear: {
        day: '../../../assets/sunny.gif',
        night: '../../../assets/moon.gif',
      },
      Clouds: {
        day: '../../../assets/cloudy.gif',
        night: '../../../assets/cloudy.gif',
      },
      Rain: {
        day: '../../../assets/rainy.gif',
        night: '../../../assets/rainy.gif',
      },
      Thunderstorm: {
        day: '../../../assets/thunderstorm-day.gif',
        night: '../../../assets/thunderstorm-night.gif',
      },
      Snow: {
        day: '../../../assets/snow-day.gif',
        night: '../../../assets/snow-night.gif',
      },
      Drizzle: {
        day: '../../../assets/drizzle-day.gif',
        night: '../../../assets/drizzle-night.gif',
      },
      Mist: {
        day: '../../../assets/mist-day.gif',
        night: '../../../assets/mist-night.gif',
      },
      Haze: {
        day: '../../../assets/haze-day.gif',
        night: '../../../assets/haze-night.gif',
      },
      Smoke: {
        day: '../../../assets/smoke-day.gif',
        night: '../../../assets/smoke-night.gif',
      },
    };
    return gifs[condition]?.[isDay ? 'day' : 'night'] || '../../../assets/default.gif';
  }
  ngOnInit(): void {
    this.getWeather('Mumbai'); 
  }
}
