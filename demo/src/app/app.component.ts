import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShipmentComponent } from './presentation/shipment/shipment.component';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ShipmentComponent],
})
export class AppComponent {
  title = 'showcases-form';
}
