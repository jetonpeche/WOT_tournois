import { Component, OnInit } from '@angular/core';
import { CarteService } from 'src/app/service/carte.service';
import { Carte } from 'src/app/model/carte';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {

  listeCarte: Carte[];
  carteAModifier: Carte = 
  { 
    ID: null, 
    LIBELLE: null, 

    MODE_ASSAUT: null, 
    MODE_STANDARD: null,
    MODE_IMPROMPTU: null
  }

  erreurHttp: boolean = false;
  succesAjout: boolean = false;
  succesModif: boolean = false;
  succesSupp: boolean = false;

  constructor(private carte: CarteService) { }

  ngOnInit()
  {
    this.carte.ListeCarte().subscribe(
    (liste) =>
    {
      this.listeCarte = liste;
    },
    () =>
    {
      this.erreurHttp = true;
      setTimeout(() => {
        this.erreurHttp = false;
      }, 3000);
    });
  }

  onSuppCarte(suppCarte)
  {
    if(confirm("Comfirmation de suppression de la carte: " + suppCarte.LIBELLE))
    {
      this.carte.SuppCarte(suppCarte).subscribe(
      (liste) =>
      {
        this.listeCarte = liste;

        this.succesSupp = true;
        setTimeout(() => {
          this.succesSupp = false;
        }, 3000);
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
    }
  }

  onAjouterCarte(form: NgForm)
  {
   this.carte.AjouterCarte(form.value).subscribe(
    (liste) =>
    {
      this.listeCarte = liste;

      this.succesAjout = true;
      setTimeout(() => {
        this.succesAjout =false;
      }, 2000);
    },
    () =>
    {
      this.erreurHttp = true;
      setTimeout(() => {
        this.erreurHttp =false;
      }, 3000);
    });
  }

  onChercheCarte(form)
  {
    this.carte.RechercheCarte(form.value).subscribe(
    (liste) =>
    {
      this.listeCarte = liste;
    }, 
    () =>
    {
      this.erreurHttp = true;
      setTimeout(() => {
        this.erreurHttp = false;
      }, 3000);
    });
  }

  onInfosCarteAModifier(uneCarte)
  {
    this.carte.InfosCarteAmodifier(uneCarte).subscribe(
      (carte) =>
      {
       this.carteAModifier = carte; 
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      }
    )
  }

  onModifierCarte(form)
  {
    this.carte.ModifierCarte(form.value).subscribe(
      () =>
      {
        this.succesModif = true;
        setTimeout(() => {
          this.succesModif = false;
        }, 3000);
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      }
    )
  }

}
