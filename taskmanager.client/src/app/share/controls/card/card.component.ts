import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() cardHeaderTemp: TemplateRef<any> | null = null;
  @Input() cardContentTemp: TemplateRef<any> | null = null;
  @Input() cardFooterTemp: TemplateRef<any> | null = null;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() userProfile: string = '';
  @Input() userFullName: string = '';
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = false;
  @Input() cardData: any;
  @Output() OnCardClick: EventEmitter<any> = new EventEmitter<any>();

  onClick() {
    this.OnCardClick.emit(this.cardData);
  }
}
