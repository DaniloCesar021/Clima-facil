import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonIcon, IonButtons, IonMenuButton,
  IonCard, IonCardContent, IonText, IonButton, IonItemSliding,
  IonItemOptions, IonItemOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, searchOutline, timeOutline } from 'ionicons/icons';
import { WeatherService, WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-historico',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Histórico de Pesquisas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div *ngIf="history.length === 0" class="empty-state">
        <ion-card>
          <ion-card-content class="ion-text-center">
            <ion-icon name="time-outline" size="large" color="medium"></ion-icon>
            <h2>Nenhuma pesquisa salva</h2>
            <p>Pesquise por cidades e salve no histórico para vê-las aqui.</p>
          </ion-card-content>
        </ion-card>
      </div>

      <ion-list *ngIf="history.length > 0">
        <ion-item-sliding *ngFor="let item of history">
          <ion-item button (click)="viewWeatherDetails(item)">
            <div class="weather-item">
              <img
                [src]="getIconUrl(item.weather[0].icon)"
                [alt]="item.weather[0].description"
                class="weather-icon-small"
              />
              <div class="weather-info">
                <ion-label>
                  <h2><strong>{{ item.name }}</strong></h2>
                  <p>{{ item.main.temp.toFixed(1) }}°C - {{ item.weather[0].description }}</p>
                  <p class="timestamp" *ngIf="item.timestamp">
                    <ion-text color="medium">
                      {{ formatDate(item.timestamp) }}
                    </ion-text>
                  </p>
                </ion-label>
              </div>
            </div>
            <ion-icon slot="end" name="search-outline" color="primary"></ion-icon>
          </ion-item>

          <ion-item-options>
            <ion-item-option color="danger" (click)="removeFromHistory(item)">
              <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <ion-button
        *ngIf="history.length > 0"
        expand="block"
        color="danger"
        fill="outline"
        (click)="clearAllHistory()"
        class="clear-button"
      >
        <ion-icon slot="start" name="trash-outline"></ion-icon>
        Limpar Histórico
      </ion-button>
    </ion-content>
  `,
  styles: [`
    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 20px;
    }

    .empty-state ion-icon {
      font-size: 80px;
      margin-bottom: 20px;
    }

    .empty-state h2 {
      margin: 20px 0 10px 0;
    }

    .weather-item {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 15px;
    }

    .weather-icon-small {
      width: 60px;
      height: 60px;
    }

    .weather-info {
      flex: 1;
    }

    .timestamp {
      font-size: 0.85rem;
      margin-top: 5px;
    }

    .clear-button {
      margin-top: 20px;
    }

    ion-item {
      --padding-start: 10px;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonText,
    IonButton,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  ]
})
export class HistoricoPage implements OnInit {
  history: WeatherData[] = [];

  constructor(
    private weatherService: WeatherService,
    private router: Router
  ) {
    addIcons({ trashOutline, searchOutline, timeOutline });
  }

  ngOnInit() {
    this.loadHistory();
  }

  ionViewWillEnter() {
    this.loadHistory();
  }

  loadHistory() {
    this.history = this.weatherService.getHistory();
  }

  getIconUrl(icon: string): string {
    return this.weatherService.getWeatherIconUrl(icon);
  }

  viewWeatherDetails(item: WeatherData) {
    this.router.navigate(['/home']);
  }

  removeFromHistory(item: WeatherData) {
    this.history = this.history.filter(h => h.name !== item.name);
    localStorage.setItem('weatherHistory', JSON.stringify(this.history));
  }

  clearAllHistory() {
    this.weatherService.clearHistory();
    this.history = [];
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
