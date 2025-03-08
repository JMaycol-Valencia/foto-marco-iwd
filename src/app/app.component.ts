import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FotoMarcoComponent } from './foto-marco/foto-marco.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from "./footer/footer.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FotoMarcoComponent, NavComponent, FooterComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'foto-con-marco';
}
