import { Component, Inject, Injector, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  customClass: any;
  customStyle: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComponent>,

    private inj: Injector
  ) { }

  // closeMe$ = combineLatest([this.dialogService.dialogResult$]).pipe(
  //   mergeMap(param => {
  //     this.dialogRef.close(param[0]);
  //     return of(true);
  //   })
  // )
  

  ngOnInit(): void {
    this.customClass = this.data?.class;
    this.customStyle = this.data?.style;

  }

  onClose(value: string) {
  //   this.dialogRef.close(value)
  }

  onTopClose() {
  //   const rslt = this.dialogService.resultDialogAfterClose;
  //   this.dialogService.close(rslt ?? 'cancel');
  }
}
