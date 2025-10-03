import { Component } from '@angular/core';
import { IonApp, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonMenuToggle } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, timeOutline, informationCircleOutline, moonOutline, sunnyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-split-pane contentId="main-content">
        <ion-menu contentId="main-content" type="overlay">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Clima Fácil</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list>
              <ion-menu-toggle auto-hide="false">
                <ion-item button routerLink="/home" routerLinkActive="selected">
                  <ion-icon slot="start" name="home-outline"></ion-icon>
                  <ion-label>Home</ion-label>
                </ion-item>
                <ion-item button routerLink="/historico" routerLinkActive="selected">
                  <ion-icon slot="start" name="time-outline"></ion-icon>
                  <ion-label>Histórico</ion-label>
                </ion-item>
                <ion-item button routerLink="/sobre" routerLinkActive="selected">
                  <ion-icon slot="start" name="information-circle-outline"></ion-icon>
                  <ion-label>Sobre</ion-label>
                </ion-item>
                <ion-item button (click)="toggleDarkMode()">
                  <ion-icon slot="start" [name]="darkMode ? 'sunny-outline' : 'moon-outline'"></ion-icon>
                  <ion-label>{{ darkMode ? 'Modo Claro' : 'Modo Escuro' }}</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>
        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-split-pane>
    </ion-app>
  `,
  styles: [`
    .selected {
      --background: var(--ion-color-primary);
      --color: var(--ion-color-primary-contrast);
    }
  `],
  standalone: true,
  imports: [
    IonApp,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonMenuToggle,
    RouterModule
  ]
})
export class AppComponent {
  darkMode = false;

  constructor() {
    addIcons({ homeOutline, timeOutline, informationCircleOutline, moonOutline, sunnyOutline });
    this.initializeDarkMode();
  }

  initializeDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode !== null) {
      this.darkMode = savedMode === 'true';
    } else {
      this.darkMode = prefersDark.matches;
    }

    this.applyDarkMode();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.applyDarkMode();
  }

  applyDarkMode() {
    document.body.classList.toggle('dark', this.darkMode);
  }
}
