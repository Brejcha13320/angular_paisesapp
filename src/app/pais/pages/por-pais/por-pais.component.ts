import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent implements OnInit {
  termino: string = '';
  hayError: boolean = false;
  mostrarSugerencias: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}

  buscar(termino: string) {
    this.hayError = false;
    this.mostrarSugerencias = false;
    this.termino = termino;
    console.log(this.termino);
    this.paisService.buscarPais(this.termino).subscribe(
      (paises) => {
        this.paises = paises;
      },
      (error) => {
        this.hayError = true;
        this.paises = [];
      }
    );
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.mostrarSugerencias = true;
    this.termino = termino;

    this.paisService.buscarPais(termino).subscribe(
      (paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
      },
      (error) => {
        this.paisesSugeridos = [];
      }
    );
  }
}
