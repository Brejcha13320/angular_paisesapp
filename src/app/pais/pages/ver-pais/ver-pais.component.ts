import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PaisService } from '../../services/pais.service';
import { Country, Translation } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;
  translations: Translation[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    /* One Subscribe */
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.paisService.buscarPaisCodigo(id)))
      .subscribe((pais) => {
        this.pais = pais[0];
        this.translations = Object.values(this.pais.translations);
      });

    /* Two Subscribe */
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   this.paisService.buscarPaisCodigo(id).subscribe((pais) => {});
    // });
  }
}
