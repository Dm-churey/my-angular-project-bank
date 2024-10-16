import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() dataHead: string = '';
  @Input() imageUrl: string = 'assets/images/add-circle.svg';
  @Input() dataBalance?: number;
  @Input() imageUrlCurrency: string = '';
  @Input() dataLeft: string = 'Заказать';
  @Input() dataRight: string = '';
  @Input() backgroundColor: 'primary' | 'secondary' | 'primary-opacity' | 'secondary-opacity' = 'primary';

  ngOnInit(): void {}

  get classesCard(): string[] {
    return ['card', `card-${this.backgroundColor}`];
  }

}
