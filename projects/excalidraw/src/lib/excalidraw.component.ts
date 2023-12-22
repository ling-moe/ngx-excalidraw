import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {render, createElement} from 'preact';
import {Excalidraw} from "@excalidraw/excalidraw";
import {
  AppState,
  BinaryFileData,
  BinaryFiles,
  ExcalidrawImperativeAPI, ExcalidrawInitialDataState, LibraryItems, LibraryItemsSource,
  PointerDownState, SceneData, SidebarName, ToolType,
} from '@excalidraw/excalidraw/types/types';
import App from '@excalidraw/excalidraw/types/components/App';
import type React from 'react'
import {ExcalidrawElement, NonDeletedExcalidrawElement} from '@excalidraw/excalidraw/types/element/types';

@Component({
  selector: 'lib-excalidraw',
  standalone: true,
  imports: [],
  template: `
      <div style="width: 1500px;height: 800px;border: 1px red dashed" #container></div>`,
  styles: ``,
})
export class ExcalidrawComponent implements OnInit, ExcalidrawImperativeAPI {
  @ViewChild("container", {static: true})
  container!: ElementRef;
  private excalidrawAPI!: ExcalidrawImperativeAPI;
  initialData: ExcalidrawInitialDataState | null | Promise<ExcalidrawInitialDataState | null> = null;

  constructor() {
  }

  ngOnInit(): void {
    render(createElement(Excalidraw, {
      initialData: this.initialData,
      excalidrawAPI: (api: ExcalidrawImperativeAPI) => this.excalidrawAPI = api,
    }), this.container.nativeElement);
  }


  data = {
    elements: [
      {
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
    appState: {zenModeEnabled: true, viewBackgroundColor: "#a5d8ff"},
    scrollToContent: true,
  };

  addFiles(data: BinaryFileData[]): void {
    return this.excalidrawAPI.addFiles(data);
  }

  getAppState(): Readonly<AppState> {
    return this.excalidrawAPI.getAppState();
  }

  getFiles(): InstanceType<typeof App>["files"] {
    return this.excalidrawAPI.getFiles();
  }

  getSceneElements(): readonly NonDeletedExcalidrawElement[] {
    return this.excalidrawAPI.getSceneElements();
  }

  getSceneElementsIncludingDeleted(): readonly ExcalidrawElement[] {
    return this.excalidrawAPI.getSceneElementsIncludingDeleted();
  }

  set history(history: InstanceType<typeof App>["resetHistory"]){
    this.excalidrawAPI.history = history;
  }

  get history(): InstanceType<typeof App>["resetHistory"]{
    return this.excalidrawAPI.history;
  }
  set id(id: string){
    this.excalidrawAPI.id = id;
  }

  get id(): string{
    return this.excalidrawAPI.id;
  }

  onChange(callback: (elements: readonly ExcalidrawElement[], appState: AppState, files: BinaryFiles) => void) {
    return this.excalidrawAPI.onChange(callback);
  }

  onPointerDown(callback: (activeTool: AppState["activeTool"], pointerDownState: PointerDownState, event: React.PointerEvent<HTMLElement>) => void) {
    return this.excalidrawAPI.onPointerDown(callback);
  }

  onPointerUp(callback: (activeTool: AppState["activeTool"], pointerDownState: PointerDownState, event: PointerEvent) => void) {
    return this.excalidrawAPI.onPointerUp(callback);
  }

  refresh(): void {
    return this.excalidrawAPI.refresh();
  }
  set resetCursor(resetCursor: InstanceType<typeof App>["resetCursor"]){
    this.excalidrawAPI.resetScene = resetCursor;
  }

  get resetCursor(): InstanceType<typeof App>["resetScene"]{
    return this.excalidrawAPI.resetCursor;
  }

  set resetScene(setCursor: InstanceType<typeof App>["resetScene"]){
    this.excalidrawAPI.resetScene = setCursor;
  }
  get resetScene(): InstanceType<typeof App>["resetScene"]{
    return this.excalidrawAPI.resetScene;
  }

  scrollToContent(target: ExcalidrawElement | readonly ExcalidrawElement[] | undefined, opts: {
    fitToContent?: boolean;
    fitToViewport?: never;
    viewportZoomFactor?: never;
    animate?: boolean;
    duration?: number
  } | {
    fitToContent?: never;
    fitToViewport?: boolean;
    viewportZoomFactor?: number;
    animate?: boolean;
    duration?: number
  } | undefined): void {
    return this.excalidrawAPI.scrollToContent(target,opts);
  }

  setActiveTool(tool: ({ type: Exclude<ToolType, "image"> } & { locked?: boolean }) | ({
    type: Extract<ToolType, "image">;
    insertOnCanvasDirectly?: boolean
  } & { locked?: boolean }) | ({ type: "custom"; customType: string } & { locked?: boolean })): void {
    return this.excalidrawAPI.setActiveTool(tool);
  }
  set setCursor(setCursor: InstanceType<typeof App>["setCursor"]){
    this.excalidrawAPI.setCursor = setCursor;
  }

  get setCursor(): InstanceType<typeof App>["setCursor"]{
    return this.excalidrawAPI.setCursor;
  }

  setToast(toast: { message: string; closable?: boolean; duration?: number } | null): void {
    return this.excalidrawAPI.setToast(toast);
  }

  toggleSidebar({name, tab, force}: {
    name: SidebarName;
    tab?: string | undefined;
    force?: boolean | undefined
  }): boolean {
    return this.excalidrawAPI.toggleSidebar({name, tab, force});
  }

  updateFrameRendering(opts: Partial<{
    enabled: boolean;
    name: boolean;
    outline: boolean;
    clip: boolean
  }> | ((prevState: AppState["frameRendering"]) => Partial<AppState["frameRendering"]>)): void {
    return this.excalidrawAPI.updateFrameRendering(opts);
  }

  updateLibrary({libraryItems, prompt, merge, openLibraryMenu, defaultStatus}: {
    libraryItems: LibraryItemsSource;
    merge?: boolean | undefined;
    prompt?: boolean | undefined;
    openLibraryMenu?: boolean | undefined;
    defaultStatus?: "published" | "unpublished" | undefined
  }): Promise<LibraryItems> {
    return this.excalidrawAPI.updateLibrary({libraryItems, prompt, merge, openLibraryMenu, defaultStatus});
  }

  updateScene<K extends keyof AppState>(sceneData: {
    elements?: SceneData["elements"];
    appState?: Pick<AppState, K> | null | undefined;
    collaborators?: SceneData["collaborators"];
    commitToHistory?: SceneData["commitToHistory"]
  }): void {
    this.excalidrawAPI.updateScene(sceneData);
  }
}
