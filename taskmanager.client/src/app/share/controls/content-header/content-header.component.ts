import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrl: './content-header.component.scss',
})
export class ContentHeaderComponent implements OnDestroy {
  @Input() saveTitle: string = 'Submit';
  @Input() addTitle: string = 'Add New Task';
  @Input() showSaveAction: boolean = false;
  @Input() hasError: boolean = false;
  @Input() disabledSaveAction: boolean = true;
  @Input() showAddAction: boolean = true;
  @Input() showBack: boolean = false;
  @Input() showSearch: boolean = true;
  @Input() bgColor: string = '#002fff';

  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onAdd: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onBack: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  destroy$ = new Subject<any>();

  searchSubject: Subject<string> = new Subject<string>();
  search$ = this.searchSubject.asObservable().pipe(
    takeUntil(this.destroy$),
    debounceTime(500),
    distinctUntilChanged((a, b) => JSON.stringify(b) === JSON.stringify(a)),
    switchMap((value) => {
      this.onSearch.emit(value);
      return of();
    })
  );

  saveClick() {
    this.onSubmit.emit(true);
  }

  addClick() {
    this.onAdd.emit(true);
  }

  backClick() {
    this.onBack.emit(true);
  }

  searchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.searchSubject.next(value);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
