import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class FotoMarcoComponent implements AfterViewInit {
  imageUrl: string | null = null;
  marcoImageUrl = 'assets/marco-evento.png';
  imagenCargada = false;
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  ngAfterViewInit() {
    // Configuración inicial del aspecto
    this.cambiarAspectRatio();
  }

  reiniciarPagina() {
    // Limpiar el input de archivo para permitir cargar el mismo archivo nuevamente
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    this.imageUrl = null;
    this.marcoImageUrl = 'assets/marco-evento.png';
    this.imagenCargada = false;

    //  Tiempo para asegurarse de que se aplique la relación de aspecto correcta
    setTimeout(() => {
      this.cambiarAspectRatio();
    }, 0);
  }

  cambiarMarco() {
    this.marcoImageUrl =
      this.marcoImageUrl === 'assets/marco-evento.png'
        ? 'assets/marco-alterno.png'
        : 'assets/marco-evento.png';

    // Tiempo para asegurarse de que se aplique el cambio después de que Angular actualice la vista
    setTimeout(() => {
      this.cambiarAspectRatio();
    }, 0);
  }

  cambiarAspectRatio() {
    const container = this.imageContainer.nativeElement;

    // Establecer la relación de aspecto del contenedor
    if (this.marcoImageUrl === 'assets/marco-evento.png') {
      container.style.aspectRatio = '1 / 1';
    } else {
      container.style.aspectRatio = '9 / 16';
    }

    // Solo intentar modificar la imagen del usuario si existe
    const userImage = container.querySelector('.user-image');
    if (userImage) {
      if (this.marcoImageUrl === 'assets/marco-evento.png') {
        userImage.style.scale = '1.3';
        userImage.style.top = '2rem';
      } else {
        userImage.style.scale = '1';
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.imagenCargada = true;

        // Aplicar el cambio de aspecto después de que se cargue la imagen
        setTimeout(() => {
          this.cambiarAspectRatio();
        }, 0);
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  downloadImage() {
    // Obtener las imágenes y el contenedor
    const element = document.querySelector('.image-container') as HTMLElement;
    const userImage = element.querySelector('.user-image') as HTMLElement;
    const marcoImage = element.querySelector('.marco-image') as HTMLElement;
    const loadingIndicator = document.createElement('div');

    // Optimizaciones para html2canvas
    const options = {
      scale: 5, // Escala menor para móviles
      useCORS: true, // Permitir recursos cross-origin
      allowTaint: true, // Permitir elementos que podrían "contaminar" el canvas
      backgroundColor: null, // Transparent background
      logging: false, // Desactivar logging para mejorar rendimiento
    };

    if (!element) return;

    if (!userImage || !marcoImage) {
      document.body.removeChild(loadingIndicator);
      return;
    }

    // Mostrar indicador de carga
    loadingIndicator.innerText = 'Procesando...';
    loadingIndicator.style.fontFamily = 'Product Sans, sans-serif';
    loadingIndicator.style.position = 'absolute';
    loadingIndicator.style.top = '50%';
    loadingIndicator.style.left = '50%';
    loadingIndicator.style.transform = 'translate(-50%, -50%)';
    loadingIndicator.style.backgroundColor = '#D1ECE3';
    loadingIndicator.style.color = 'black';
    loadingIndicator.style.fontSize = '12px';
    loadingIndicator.style.padding = '20px';
    loadingIndicator.style.borderRadius = '8px';
    loadingIndicator.style.zIndex = '1000';
    document.body.appendChild(loadingIndicator);


    html2canvas(element, options).then((canvas) => {
      // Quitar el indicador de carga
      document.body.removeChild(loadingIndicator);

      // Obtener la URL de la imagen
      const imageData = canvas.toDataURL('image/png');

      // Generar un nombre de archivo con fecha
      const date = new Date();
      const fileName = `WinayTech_${date.getSeconds()}.png`;

      // Detectar si es móvil para usar el método adecuado
      if (this.detectMobile()) {
        this.saveMobileImage(imageData, fileName);
      } else {
        this.saveDesktopImage(imageData, fileName);
      }
    });
  }

  // Método para guardar en dispositivos móviles
  private async saveMobileImage(imageData: string, fileName: string) {
  if (navigator.share && navigator.canShare) {
    try {
      const response = await fetch(imageData);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Mi imagen personalizada',
          text: 'Imagen creada con WinayTech',
        });
        return;
      }
    } catch (error) {
      console.error('Error al compartir la imagen:', error);
    }
  }
  this.saveDesktopImage(imageData, fileName);
}

  // Método para guardar en escritorio
  private saveDesktopImage(imageData: string, fileName: string) {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //Metodo para detectar si es un dispositivo móvil
  private detectMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
}
