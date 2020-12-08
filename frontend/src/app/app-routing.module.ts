import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CarteComponent } from './components/carte/carte.component';
import { JoueurComponent } from './components/joueur/joueur.component';
import { CombatSoloComponent } from './components/combat-solo/combat-solo.component';
import { CombatEquipeComponent } from './components/combat-equipe/combat-equipe.component';
import { MatchComponent } from './components/match/match.component';
import { VueParticipantsComponent } from './components/vue-participants/vue-participants.component';

// guard
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [

  // page par defaut
  { path: "", component: ConnexionComponent },
  
  { path: "accueil", component: AccueilComponent },
  { path: "carte", component: CarteComponent },
  { path: "joueur", component: JoueurComponent },
  { path: "combatSolo", component: CombatSoloComponent },
  { path: "combatEquipe", component: CombatEquipeComponent },
  { path: "match", component: MatchComponent },

  { path: "vueParticipant", component: VueParticipantsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
