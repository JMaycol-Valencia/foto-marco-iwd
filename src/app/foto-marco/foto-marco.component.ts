import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foto-marco',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './foto-marco.component.html',
  styleUrl: './foto-marco.component.css'
})
export class FotoMarcoComponent {
  imageUrl: string | null = null;
  marcoSeleccionado: string = 'marco-evento';
  mostrarRadioButtons: boolean = true;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  triggerFileInput() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  downloadImage() {
    const element = document.querySelector('.image-container') as HTMLElement;
    if (element) {
      const userImage = document.querySelector('.user-image') as HTMLElement;
      const marcoImage = document.querySelector('.marco-image') as HTMLElement;

      // Guarda los valores originales de border-radius
      const originalUserRadius = userImage.style.borderRadius;
      const originalMarcoRadius = marcoImage.style.borderRadius;

      // Elimina los border-radius antes de la captura
      userImage.style.borderRadius = '0';
      marcoImage.style.borderRadius = '0';

      html2canvas(element).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'WinayTech.png';
        link.click();

        // Restaura los border-radius originales después de la descarga
        userImage.style.borderRadius = originalUserRadius;
        marcoImage.style.borderRadius = originalMarcoRadius;
      });
    }
  }

  ocultarRadioButtons() {
    this.mostrarRadioButtons = false;
  }
}