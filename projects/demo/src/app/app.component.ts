import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ExcalidrawComponent} from '../../../excalidraw/src/lib/excalidraw.component';
import {ExcalidrawInitialDataState} from '@excalidraw/excalidraw/types/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ExcalidrawComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {

  }
  title = 'demo';
  data: ExcalidrawInitialDataState = {
    elements: [
      {
        frameId:"oDVXy8D6rom3H1-LLH2-f",
        type: "rectangle",
        version: 141,
        versionNonce: 361174001,
        isDeleted: false,
        id: "oDVXy8D6rom3H1-LLH2-f",
        fillStyle: "hachure",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        angle: 0,
        x: 100.50390625,
        y: 93.67578125,
        strokeColor: "#000000",
        backgroundColor: "transparent",
        width: 186.47265625,
        height: 141.9765625,
        seed: 1968410350,
        groupIds: [],
      },
    ],
    appState: { zenModeEnabled: true, viewBackgroundColor: "#a5d8ff" },
    scrollToContent: true
  } as any;
}
