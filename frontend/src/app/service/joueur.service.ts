import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Joueur } from '../model/joueur';
import { RouteAPIService } from './route-api.service';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  constructor(private http: HttpClient, private route: RouteAPIService) { }

  ListingJoueur(): Observable<Joueur[]>
  {
    return this.http.get<Joueur[]>(`${this.route.PHP_API}/listeJoueur.php`);
  }

  ListeJoueurSansCombat(): Observable<Joueur[]>
  {
    return this.http.get<Joueur[]>(`${this.route.PHP_API}/listeJoueurSansCombat.php`);
  }

  InfosJoueur(infos): Observable<Joueur>
  {
    return this.http.post<Joueur>(`${this.route.PHP_API}/infoJoueur.php`, infos);
  }

  AjouterJoueur(form): Observable<Joueur>
  { 
    return this.http.post<Joueur>(`${this.route.PHP_API}/AjouterJoueur.php`, form);
  }

  ChercheJoueur(form): Observable<Joueur[]>
  {
    return this.http.post<Joueur[]>(`${this.route.PHP_API}/chercheJoueur.php`, form);
  }

  EnregistreCombatSolo(idJoueur, idAdversaire, idCarte): Observable<Joueur[]>
  {
    return this.http.get<Joueur[]>(`${this.route.PHP_API}/ajouterCombat.php?idJ=${idJoueur}&idA=${idAdversaire}&idC=${idCarte}`);
  }

  ModifJoueur(form): Observable<any>
  {
    return this.http.post<Joueur>(`${this.route.PHP_API}/modifJoueur.php`, form);
  }

  SuppAllJoueur(): Observable<Joueur>
  {
    return this.http.get<Joueur>(`${this.route.PHP_API}/suppAllJoueur.php`);
  }

  SuppJoueur(info): Observable<Joueur>
  {
    return this.http.post<Joueur>(`${this.route.PHP_API}/suppJoueur.php`, info);
  }
}
