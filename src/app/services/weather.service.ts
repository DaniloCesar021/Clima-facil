import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  timestamp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<WeatherData> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=pt_br`;
    return this.http.get<WeatherData>(url);
  }

  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  saveToHistory(weatherData: WeatherData): void {
    const history = this.getHistory();
    const dataWithTimestamp = {
      ...weatherData,
      timestamp: Date.now()
    };

    const existingIndex = history.findIndex(item => item.name === weatherData.name);
    if (existingIndex !== -1) {
      history[existingIndex] = dataWithTimestamp;
    } else {
      history.unshift(dataWithTimestamp);
    }

    if (history.length > 10) {
      history.pop();
    }

    localStorage.setItem('weatherHistory', JSON.stringify(history));
  }

  getHistory(): WeatherData[] {
    const history = localStorage.getItem('weatherHistory');
    return history ? JSON.parse(history) : [];
  }

  clearHistory(): void {
    localStorage.removeItem('weatherHistory');
  }
}
