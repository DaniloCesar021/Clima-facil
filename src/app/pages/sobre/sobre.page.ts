import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonButtons,
  IonMenuButton, IonIcon, IonText, IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, schoolOutline, calendarOutline, bookOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sobre',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Sobre</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="sobre-container">
        <div class="profile-icon">
          <ion-icon name="person-circle-outline" color="primary"></ion-icon>
        </div>

        <ion-card>
          <ion-card-header>
            <ion-card-title class="ion-text-center">
              Informações do Desenvolvedor
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-icon slot="start" name="person-circle-outline" color="primary"></ion-icon>
                <ion-label>
                  <h3>Nome</h3>
                  <p>Danilo Cesar</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon slot="start" name="calendar-outline" color="primary"></ion-icon>
                <ion-label>
                  <h3>Idade</h3>
                  <p>20 anos</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon slot="start" name="school-outline" color="primary"></ion-icon>
                <ion-label>
                  <h3>Instituição</h3>
                  <p>UNISUAM</p>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-icon slot="start" name="book-outline" color="primary"></ion-icon>
                <ion-label>
                  <h3>Curso</h3>
                  <p>Análise e Desenvolvimento de Sistemas</p>
                </ion-label>
              </ion-item>

              <ion-item lines="none">
                <ion-icon slot="start" name="school-outline" color="primary"></ion-icon>
                <ion-label>
                  <h3>Período</h3>
                  <p>4º período</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title class="ion-text-center">
              Sobre o App
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-text>
              <p class="app-description">
                <strong>Clima Fácil Weather App</strong> é um aplicativo desenvolvido
                com Ionic e Angular que permite consultar informações meteorológicas
                de qualquer cidade do mundo usando a API do OpenWeatherMap.
              </p>
              <p class="app-description">
                O app oferece recursos como pesquisa de clima em tempo real,
                histórico de pesquisas e suporte a tema claro/escuro.
              </p>
            </ion-text>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [`
    .sobre-container {
      max-width: 600px;
      margin: 0 auto;
    }

    .profile-icon {
      display: flex;
      justify-content: center;
      margin: 30px 0;
    }

    .profile-icon ion-icon {
      font-size: 120px;
    }

    ion-card {
      margin-bottom: 20px;
    }

    ion-item {
      --padding-start: 10px;
    }

    ion-item h3 {
      font-weight: bold;
      margin-bottom: 5px;
    }

    ion-item p {
      font-size: 1rem;
    }

    .app-description {
      margin-bottom: 15px;
      line-height: 1.6;
      text-align: justify;
    }
  `],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonText,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class SobrePage {
  constructor() {
    addIcons({ personCircleOutline, schoolOutline, calendarOutline, bookOutline });
  }
}
