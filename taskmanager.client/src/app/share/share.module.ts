import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardModule,
  ContentHeaderModule,
  FileuploadModule,
  SpinnerModule,
} from './reference';

@NgModule({
  declarations: [],
  imports: [CommonModule, FileuploadModule, ContentHeaderModule, CardModule],
  exports: [FileuploadModule, ContentHeaderModule, CardModule, SpinnerModule],
})
export class ShareModule {}
