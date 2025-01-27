import { Component } from '@angular/core';
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
export class WeatherCardComponent {
  city: string = '';
  weather: any = null;
  weatherGif: string = '../../../assets/default.gif';
  message: string = 'Please enter a city name';
  loading: boolean = false;

  constructor(private apiService: ApiService) { }

  getWeather(city: string): void {
    if (!city.trim()) {
      this.message = 'Please enter a city name';
      this.weather = null;
      this.weatherGif = '../../../assets/default.gif';
      return;
    }

    this.loading = true;
    this.message = '';
    this.apiService.getWeather(city).subscribe({
      next: (data) => {
        this.weather = data;
        this.weatherGif = this.getWeatherGif(data.weather[0].main);
        this.message = '';
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

  getWeatherGif(condition: string): string {
    const gifs: { [key: string]: string } = {
      Clear: '../../../assets/sunny.gif',
      Clouds: '../../../assets/cloudy.gif',
      Rain: '../../../assets/rainy.gif',
      Thunderstorm: '../../../assets/thunderstorm.gif',
      Snow: '../../../assets/snow.gif',
      Smoke: '../../../assets/smoke.gif',
      Drizzle: '../../../assets/drizzle.gif',
      Mist: '../../../assets/mist.gif',
      Haze: '../../../assets/haze.gif',
    };
    return gifs[condition] || '../../../assets/default.gif';
  }
}
