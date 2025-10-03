import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar,
  IonButton, IonIcon, IonSpinner, IonButtons, IonMenuButton,
  IonText, IonItem, IonLabel, IonToast
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';
import { WeatherService, WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Buscar Clima</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Pesquisar por Cidade</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-searchbar
            [(ngModel)]="cityName"
            placeholder="Digite o nome da cidade"
            (keyup.enter)="searchWeather()"
            [disabled]="loading"
          ></ion-searchbar>
          <ion-button
            expand="block"
            (click)="searchWeather()"
            [disabled]="!cityName || loading"
          >
            <ion-spinner *ngIf="loading" name="crescent"></ion-spinner>
            <span *ngIf="!loading">Buscar</span>
          </ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card *ngIf="weatherData && !error" class="weather-card">
        <ion-card-header>
          <ion-card-title class="ion-text-center">
            {{ weatherData.name }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-text-center">
          <div class="weather-icon">
            <img
              [src]="getIconUrl(weatherData.weather[0].icon)"
              [alt]="weatherData.weather[0].description"
            />
          </div>
          <div class="temperature">
            <h1>{{ weatherData.main.temp.toFixed(1) }}°C</h1>
          </div>
          <div class="description">
            <ion-text color="medium">
              <p>{{ weatherData.weather[0].description }}</p>
            </ion-text>
          </div>
          <ion-item lines="none">
            <ion-label>
              <h3>Sensação Térmica</h3>
              <p>{{ weatherData.main.feels_like.toFixed(1) }}°C</p>
            </ion-label>
          </ion-item>
          <ion-button expand="block" color="success" (click)="saveToHistory()">
            <ion-icon slot="start" name="save-outline"></ion-icon>
            Salvar no Histórico
          </ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card *ngIf="error" color="danger">
        <ion-card-content>
          <ion-text>
            <p>{{ error }}</p>
          </ion-text>
        </ion-card-content>
      </ion-card>

      <ion-toast
        [isOpen]="showToast"
        message="Cidade salva no histórico!"
        duration="2000"
        (didDismiss)="showToast = false"
        color="success"
      ></ion-toast>
    </ion-content>
  `,
  styles: [`
    .weather-card {
      margin-top: 20px;
    }

    .weather-icon {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }

    .weather-icon img {
      width: 120px;
      height: 120px;
    }

    .temperature h1 {
      font-size: 3rem;
      font-weight: bold;
      margin: 10px 0;
    }

    .description {
      margin: 10px 0 20px 0;
      text-transform: capitalize;
    }

    .description p {
      font-size: 1.2rem;
    }

    ion-item {
      --background: transparent;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonSpinner,
    IonButtons,
    IonMenuButton,
    IonText,
    IonItem,
    IonLabel,
    IonToast
  ]
})
export class HomePage {
  cityName: string = '';
  weatherData: WeatherData | null = null;
  loading: boolean = false;
  error: string = '';
  showToast: boolean = false;

  constructor(private weatherService: WeatherService) {
    addIcons({ saveOutline });
  }

  searchWeather() {
    if (!this.cityName.trim()) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.weatherData = null;

    this.weatherService.getWeatherByCity(this.cityName).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 404) {
          this.error = 'Cidade não encontrada. Verifique o nome e tente novamente.';
        } else if (err.status === 401) {
          this.error = 'Erro de autenticação da API. Configure sua chave do OpenWeatherMap.';
        } else {
          this.error = 'Erro ao buscar dados do clima. Tente novamente mais tarde.';
        }
      }
    });
  }

  getIconUrl(icon: string): string {
    return this.weatherService.getWeatherIconUrl(icon);
  }

  saveToHistory() {
    if (this.weatherData) {
      this.weatherService.saveToHistory(this.weatherData);
      this.showToast = true;
    }
  }
}
