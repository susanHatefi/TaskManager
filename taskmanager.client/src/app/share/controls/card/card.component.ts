import { Component, Input, TemplateRef } from '@angular/core';

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
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = false;
}