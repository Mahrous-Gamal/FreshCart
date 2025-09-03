import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
 features = [
    {
      icon: 'fas fa-truck',
      title: 'Free Delivery',
      desc: 'Order $50 or more',
    },
    {
      icon: 'fas fa-undo',
      title: '30 Days Return',
      desc: 'Satisfaction guaranteed',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure Payment',
      desc: '100% protected checkout',
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      desc: 'Ready to help anytime',
    },
  ];
}
