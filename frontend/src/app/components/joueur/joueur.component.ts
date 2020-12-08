import { Component, OnInit } from '@angular/core';
import { Joueur } from 'src/app/model/joueur';
import { NgForm } from '@angular/forms';
import { JoueurService } from 'src/app/service/joueur.service';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.css']
})
export class JoueurComponent implements OnInit {

  listeJoueur: Joueur[];
  joueurSelectionne: any = 
  {
    ID: null, NOM: null, WIN8: null, VICTOIRE: null, DEFAITE: null, POINTS_TOTAL: null, 
    MEMBRE_CLAN: null, DON: null, NIVEAU_PALIER: null, NOM_EQUIPE: null
  };

  erreurHttp: boolean = false;
  erreurAjout: boolean = false;
  succesAjout: boolean = false;
  succesModif: boolean = false;
  succesSupp: boolean = false;

  constructor(private joueur: JoueurService) { }

  ngOnInit()
  {
    this.joueur.ListingJoueur().subscribe(
      (liste) =>
      {
        this.listeJoueur = liste;
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  onInfoJoueur(joueur)
  {
    this.joueurSelectionne = joueur;
  }

  onModifJoueur(form)
  {
    this.joueur.ModifJoueur(form.value).subscribe(
      (ok) =>
      {
        if(ok == false)
        {
          this.erreurAjout = true;
          setTimeout(() => {
            this.erreurAjout = false;
          }, 3000);
        }
        else
        {
          this.succesModif = true;
          setTimeout(() => {
            this.succesModif = false;
          }, 3000);
        }
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  onChercheJoueur(form: NgForm)
  {
    this.joueur.ChercheJoueur(form.value).subscribe(
      (liste) =>
      {
        this.listeJoueur = liste;
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

  onAjouterJoueur(form: NgForm)
  {
    this.joueur.AjouterJoueur(form.value).subscribe(
    () =>
    {
      this.succesAjout = true;
      setTimeout(() => {
        this.succesAjout = false;
      }, 3000);

      // MAJ liste joueur
      this.ngOnInit();
    },
    // erreur http
    () =>
    {
      this.erreurHttp = true;
      setTimeout(() => {
        this.erreurHttp = false;
      }, 3000);
    });
  }

  onSuppAllJoueur()
  {
    if(confirm("Confirmation, vous etes sur le point de supprimer TOUS les joueurs"))
    {
      this.joueur.SuppAllJoueur().subscribe(
        () =>
        {
          this.listeJoueur = [];
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

  onSuppJoueur(info)
  {
    if(confirm("Confirmation, vous allez supprimer le joueur: " + info.NOM))
    {
      this.joueur.SuppJoueur(info).subscribe(
        () =>
        {
          this.ngOnInit();
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
        }
      )
    }
  }

}
