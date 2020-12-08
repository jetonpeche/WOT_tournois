import { Component, OnInit } from '@angular/core';
import { JoueurService } from 'src/app/service/joueur.service';
import { CarteService } from 'src/app/service/carte.service';
import { Joueur } from 'src/app/model/joueur';
import { Carte } from 'src/app/model/carte';

@Component({
  selector: 'app-combat-solo',
  templateUrl: './combat-solo.component.html',
  styleUrls: ['./combat-solo.component.css']
})
export class CombatSoloComponent implements OnInit {

  private nb: number;
  private nbCarte: number;
  private resultat: number;

  differencePalier: number;

  listeJoueur: Joueur[];
  private listeCarte: Carte[];

  private listeJoueurPalier: any[] = [];

  succesAjout: boolean = false;
  erreurHttp: boolean = false;

  carteSelectionne: any = { ID: null, LIBELLE: null };
  adversaire: any = { ID: null, NOM: null };
  joueurSelectionne: any = { ID: null, NOM: null, PALIER: null };

  constructor(private joueur: JoueurService, private carte: CarteService) { }

  // liste joueur sans combat et liste les cartes avec le mode pri aleatoirement
  ngOnInit() 
  {
    this.joueur.ListeJoueurSansCombat().subscribe(
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

      this.carte.ListeCarteModeStandard().subscribe(
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

  // recupere les infos du joueur et lance la selection d'adversaire et carte
  onInfoJoueur(form)
  {
    this.joueur.InfosJoueur(form.value).subscribe(
    (joueur) =>
    {
      this.joueurSelectionne = joueur;
      this.ChoisirAdversaire();
    },
    () =>
    {
      this.erreurHttp = true;
      setTimeout(() => {
        this.erreurHttp = false;
      }, 3000);
    });
  }

  private ChoisirAdversaire()
  {
    // interval
    const min: number = 0;
    const max: number = 155;


     // genere un nb aleatoire [0; 155[
    this.nb = Math.floor(Math.random() * (max - min)) + min;

    // 7%
    if(this.nb <= 6)
    {
      this.differencePalier = -3;
    }
    // 18%
    else if(this.nb >= 7 && this.nb <= 25)
    {     
      this.differencePalier = -2;
    }
    // 25%
    else if(this.nb >= 26 && this.nb <= 51)
    {
      this.differencePalier = -1;
    }
    // 50%
    else if(this.nb >= 52 && this.nb <= 102)
    {
      this.differencePalier = 0;
    }
    // 25%
    else if(this.nb >= 103 && this.nb <= 128)
    {
      this.differencePalier = 1;
    }
    // 18%
    else if(this.nb >= 129 && this.nb <= 147)
    {
      this.differencePalier = 2;
    }
    // 7%
    else if(this.nb >=148)
    {
      this.differencePalier = 3;
    }

    // palier tire au sort Negatif
    if(this.differencePalier < 0)
    {
      this.resultat = +this.joueurSelectionne.NIVEAU_PALIER + +this.differencePalier;
    }
    // palier tire au sort Positif
    else if(this.differencePalier > 0)
    {
      this.resultat = +this.joueurSelectionne.NIVEAU_PALIER + +this.differencePalier;
    }
    // palier tire au sort 0
    else if(this.differencePalier == 0)
    {
      this.resultat = +this.joueurSelectionne.NIVEAU_PALIER;
    }

    // cree une liste de joueur avec le meme palier que le joueur selectionné
    for (let index = 0; index < this.listeJoueur.length; index++) 
    {
      const element = this.listeJoueur[index];

      // ajout dans la liste si la palier genere est identique au palier du joueur
      // ne peut ajouter le joueur actuel
      if(this.resultat == element.NIVEAU_PALIER && element.ID != this.joueurSelectionne.ID)
      {
        this.listeJoueurPalier.push(
          { 
            ID: element.ID, 
            NOM: element.NOM
          });
      }
    }

    // si la liste des joueurs adverse n'est pas vide
    if(this.listeJoueurPalier.length != 0)
    {
      // nb aleatoire pour tirer un adversaire
      this.nb = Math.floor(Math.random() * (this.listeJoueurPalier.length - 0)) + 0;

      this.adversaire = this.listeJoueurPalier[this.nb];

      // tire une carte aleatoirement si elle est pas selectionne
      if(this.carteSelectionne.ID == null)
      {
        this.TirerUneCarte();
      }
      

      // enregistre le combat et supprime les joueurs qui on deja un combat
      if(this.adversaire.NOM != null && this.adversaire.NOM != "")
      {
        this.joueur.EnregistreCombatSolo(this.joueurSelectionne.ID, this.adversaire.ID, this.carteSelectionne.ID).subscribe(
          () =>
          {
            this.ngOnInit();
            this.succesAjout = true;
            setTimeout(() => {
              this.succesAjout = false;
            }, 2000);
          },
          () =>
          {
            this.erreurHttp = true;
            setTimeout(() => {
              this.erreurHttp = false;
            }, 3000);
          });
      }

      // vide la liste des joueurs du palier tirer au sort
      this.listeJoueurPalier = [];
    }
    // fait recommencer le tirage d'adversaire
    else
    {
      this.ChoisirAdversaire();
    }

  }

  // renvoie la carte tire au sort
  private TirerUneCarte()
  {
    // genere un nb aleatoire
    const nb = Math.floor(Math.random() * (this.listeCarte.length - 0)) + 0;

    this.carteSelectionne = this.listeCarte[nb];
  }

}
