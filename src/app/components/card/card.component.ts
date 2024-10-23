import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() dataHead: string = '';
  @Input() imageUrl: string = 'assets/images/add-circle.svg';
  @Input() dataBalance?: string;
  @Input() dataLeft: string = 'Заказать';
  @Input() dataRight: string = '';
  @Input() backgroundColor: 'primary' | 'secondary' | 'tertiary' | 'primary-opacity' | 'secondary-opacity' = 'primary';
  @Input() statusColor?: 'green' | 'red' | 'yellow';

  get classesCard(): string[] {
    return ['card', `card-${this.backgroundColor}`];
  }

  get classesStatus(): string[] {
    return ['card_body_status' ,`card_body_status-${this.statusColor}`]
  }

}
