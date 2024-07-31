import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule, ContentHeaderModule, FileuploadModule } from './reference';

@NgModule({
  declarations: [],
  imports: [CommonModule, FileuploadModule, ContentHeaderModule, CardModule],
  exports: [FileuploadModule, ContentHeaderModule, CardModule],
})
export class ShareModule {}
