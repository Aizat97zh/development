import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css'],
})
export class AppCardComponent {
  @Input() card: any;

  get title(): string {
    const t: string = this.card?.title ?? '';
    return t.length > 50 ? t.slice(0, 47) + '...' : t;
  }
}
