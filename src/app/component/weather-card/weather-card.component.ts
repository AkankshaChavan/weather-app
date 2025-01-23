import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    HttpClientModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
  providers: [ApiService]
})
export class WeatherCardComponent {

  city: string = '';
  weather: any;
  weatherIcon: string = '';

  constructor(private apiService: ApiService) {}

  getWeather(city: string): void {
    this.apiService.getWeather(city).subscribe({
      next: (data) => {
        this.weather = data;
        this.weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      },
      error: (err) => {
        alert('City not found!');
        // this.weather = null;
        // this.weatherIcon = '';
      }
    });
  }

}
