import { Component, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foto-marco',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './foto-marco.component.html',
  styleUrl: './foto-marco.component.css',
})
export class FotoMarcoComponent {
  imageUrl: string | null = null;
  marcoImageUrl = 'assets/marco-evento.png';
  imagenCargada = false;
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  reiniciarPagina() {
    this.imageUrl = null;
    this.marcoImageUrl = 'assets/marco-evento.png';
    this.imagenCargada = false;
    this.cambiarAspectRatio();
  }

  cambiarMarco() {
    this.marcoImageUrl =
      this.marcoImageUrl === 'assets/marco-evento.png'
        ? 'assets/marco-alterno.png'
        : 'assets/marco-evento.png';
    this.cambiarAspectRatio();
  }

  cambiarAspectRatio() {
    const container = this.imageContainer.nativeElement;
    if (this.marcoImageUrl === 'assets/marco-evento.png') {
      container.style.aspectRatio = '1 / 1';
    } else {
      container.style.aspectRatio = '9 / 16';
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.imagenCargada = true; // Establecer a verdadero cuando se carga la imagen
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
      //const originalOverflow = element.style.overflow;
      const originalUserRadius = userImage.style.borderRadius;
      const originalMarcoRadius = marcoImage.style.borderRadius;

      //element.style.overflow = 'visible';

      // Elimina los border-radius antes de la captura
      userImage.style.borderRadius = '0';
      marcoImage.style.borderRadius = '0';

      html2canvas(element, {
        scale: window.devicePixelRatio * 4, // Aumenta la escala para mejor resolución
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'WinayTech.png';
        link.click();

        // Restaura los border-radius originales después de la descarga
        userImage.style.borderRadius = originalUserRadius;
        marcoImage.style.borderRadius = originalMarcoRadius;
        //element.style.overflow = originalOverflow;
      });
    }
  }
}
