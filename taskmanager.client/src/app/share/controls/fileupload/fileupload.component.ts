import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.scss',
})
export class FileuploadComponent {
  @Input() isDisabled = false;
  @Input() accept: string = 'image/png, image/jpeg';

  @Output() onFileLoaded: EventEmitter<any> = new EventEmitter<any>();

  onFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    this.onFileLoaded.emit(files);
  }
}
