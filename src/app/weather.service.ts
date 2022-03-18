import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Weather {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentWeather() {
    return Promise.all([
      this.http.get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=02d0154f262374e33dea65535d66fecc`
      ),
      this.http.get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=Bandung&appid=02d0154f262374e33dea65535d66fecc`
      ),
      this.http.get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=02d0154f262374e33dea65535d66fecc`
      ),
      this.http.get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=Spain&appid=02d0154f262374e33dea65535d66fecc`
      ),
      this.http.get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=02d0154f262374e33dea65535d66fecc`
      ),
      this.http.get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=Shanghai&appid=02d0154f262374e33dea65535d66fecc`
      ),
      this.http.get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=Palembang&appid=02d0154f262374e33dea65535d66fecc`
      ),
      this.http.get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=02d0154f262374e33dea65535d66fecc`
      ),
    ]);
  }

  getWeather(city: string) {
    return this.http.get<Weather>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=02d0154f262374e33dea65535d66fecc`
    );
  }

  storeWeather(weather: Weather) {
    const weathers = this.getWeatherFromLocalStorage();
    localStorage.setItem('weather', JSON.stringify([...weathers, weather]));
  }

  storeAllWeathers(weathers: Weather[]) {
    localStorage.setItem('weather', JSON.stringify(weathers));
  }

  getWeatherFromLocalStorage() {
    return JSON.parse(
      localStorage.getItem('weather') || JSON.stringify([])
    ) as Weather[];
  }

  deleteWeatherFromLocalStorage(index: number) {
    const weathers = this.getWeatherFromLocalStorage();
    const newWeathers = [
      ...weathers.slice(0, index),
      ...weathers.slice(index + 1),
    ];

    this.storeAllWeathers(newWeathers);

    return newWeathers;
  }
}
