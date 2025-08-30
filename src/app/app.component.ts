import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FooterComponent } from './core/components/footer/footer.component';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ngx = inject(NgxSpinnerService);

  _PLATFORM_ID = inject(PLATFORM_ID);
  constructor(private flowbiteService: FlowbiteService) {}

  title = 'fresh-cart';

  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      initFlowbite();
    }

    this.flowbiteService.loadFlowbite((flowbite) => {
      console.log('Flowbite loaded', flowbite);
    });
  }
}
