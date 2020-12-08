import { Component, OnInit } from '@angular/core';
import { CombatEquipeService } from 'src/app/service/combat-equipe.service';
import { CombatEquipe } from 'src/app/model/combatEquipe';
import { PalierService } from 'src/app/service/palier.service';
import { Palier } from 'src/app/model/Palier';
import { CombatSoloService } from 'src/app/service/combat-solo.service';

@Component({
  selector: 'app-vue-participants',
  templateUrl: './vue-participants.component.html',
  styleUrls: ['./vue-participants.component.css']
})
export class VueParticipantsComponent implements OnInit {

  listePalier: Palier[];
  listeMatchEquipe: CombatEquipe[];
  listeMatchSolo: any[];

  erreurHttp: boolean = false;
  matchEquipe: boolean = true;

  constructor(private combatEquipe: CombatEquipeService, private combatSolo: CombatSoloService, private palier: PalierService) { }

  ngOnInit() 
  {
    this.ListeMatchEquipe();
    this.ListeMatchSolo();

    this.palier.ListePalier().subscribe(
      (liste) =>
      {
        this.listePalier = liste;
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  private ListeMatchEquipe()
  {
    this.combatEquipe.ListeMatchEquipe().subscribe(
      (liste) =>
      {
        this.listeMatchEquipe = liste;
      },
      () =>
      {
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      });
  }

  private ListeMatchSolo()
  {
    this.combatSolo.ListeMatchSolo().subscribe(
      (liste) =>
      {
        this.listeMatchSolo = liste;
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

  onChangerListe()
  {
    this.matchEquipe = !this.matchEquipe;
  }

}
