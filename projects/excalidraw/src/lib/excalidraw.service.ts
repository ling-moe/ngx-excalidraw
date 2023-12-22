import { Injectable } from '@angular/core';
import {ExcalidrawImperativeAPI} from '@excalidraw/excalidraw/types/types';
import type App from '@excalidraw/excalidraw/types/components/App';

@Injectable({
  providedIn: 'root'
})
export class ExcalidrawService {

  private excalidrawAPI!: ExcalidrawImperativeAPI

  constructor() { }

  setAPI(api: ExcalidrawImperativeAPI){
    this.excalidrawAPI = api;
  }

  updateScene(data: Parameters<InstanceType<typeof App>["updateScene"]>[0]){
    this.excalidrawAPI.updateScene(data);
}
}
