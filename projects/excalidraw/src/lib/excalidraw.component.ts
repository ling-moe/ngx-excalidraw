import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {render, createElement} from 'preact';
import {Excalidraw} from "@excalidraw/excalidraw";
import {
  AppState,
  BinaryFileData,
  BinaryFiles,
  ExcalidrawImperativeAPI, ExcalidrawInitialDataState, Gesture, LibraryItems, LibraryItemsSource,
  PointerDownState, SceneData, SidebarName, ToolType,
  UIOptions,
} from '@excalidraw/excalidraw/types/types';
import App from '@excalidraw/excalidraw/types/components/App';
import type React from 'react'
import {ExcalidrawElement, NonDeletedExcalidrawElement, Theme} from '@excalidraw/excalidraw/types/element/types';
import {ClipboardData} from '@excalidraw/excalidraw/types/clipboard';
import {Language} from '@excalidraw/excalidraw/types/i18n';

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

  @Input()
  initialData?: ExcalidrawInitialDataState | null | Promise<ExcalidrawInitialDataState | null>;
  @Input()
  UIOptions?: Partial<UIOptions>;
  @Input()
  isCollaborating?: boolean;
  @Input()
  beforePaste?: (data: ClipboardData, event: ClipboardEvent | null) => Promise<boolean> | boolean;
  @Input()
  langCode?: Language["code"];
  @Input()
  viewModeEnabled?: boolean;
  @Input()
  zenModeEnabled?: boolean;
  @Input()
  gridModeEnabled?: boolean;
  @Input()
  objectsSnapModeEnabled?: boolean;
  @Input()
  libraryReturnUrl?: string;
  @Input()
  theme?: Theme;
  @Input()
  name?: string;
  @Input()
  detectScroll?: boolean;
  @Input()
  handleKeyboardGlobally?: boolean;
  @Input()
  beforeLibraryChange?: (libraryItems: LibraryItems) => void | Promise<any>;
  @Input()
  autoFocus?: boolean;
  @Input()
  generateIdForFile?: (file: File) => string | Promise<string>;
  @Input()
  validateEmbeddable?: boolean | string[] | RegExp | RegExp[] | ((link: string) => boolean | undefined);

  @Output()
  change = new EventEmitter<{elements: readonly ExcalidrawElement[], appState: AppState, files: BinaryFiles}>();
  @Output()
  pointerUpdate = new EventEmitter<{
    pointer: {
      x: number;
      y: number;
      tool: "pointer" | "laser";
    };
    button: "down" | "up";
    pointersMap: Gesture["pointers"];
  }>();
  @Output()
  pointerDown = new EventEmitter<{activeTool: AppState["activeTool"], pointerDownState: PointerDownState}>();
  scrollChange = new EventEmitter<{scrollX: number, scrollY: number}>();
  constructor() {
  }

  ngOnInit(): void {
    render(createElement(Excalidraw, {
      initialData: this.initialData,
      excalidrawAPI: (api: ExcalidrawImperativeAPI) => this.excalidrawAPI = api,
      UIOptions: this.UIOptions,
      onChange: (elements, appState, files) => this.change.emit({elements, appState, files}),
      isCollaborating: this.isCollaborating,
      onPointerUpdate: payload => this.pointerUpdate.emit(payload),
      onPaste: this.beforePaste,
      langCode: this.langCode,
      viewModeEnabled: this.viewModeEnabled,
      zenModeEnabled: this.zenModeEnabled,
      gridModeEnabled: this.gridModeEnabled,
      objectsSnapModeEnabled: this.objectsSnapModeEnabled,
      libraryReturnUrl: this.libraryReturnUrl,
      theme: this.theme,
      name: this.name,
      detectScroll: this.detectScroll,
      handleKeyboardGlobally: this.handleKeyboardGlobally,
      onLibraryChange: this.beforeLibraryChange,
      autoFocus: this.autoFocus,
      generateIdForFile: this.generateIdForFile,
      onPointerDown: (activeTool,pointerDownState)=> this.pointerDown.emit({activeTool,pointerDownState}),
      onScrollChange: (scrollX, scrollY) => this.scrollChange.emit({scrollX,scrollY}),
      validateEmbeddable: this.validateEmbeddable,
    }), this.container.nativeElement);
  }

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
