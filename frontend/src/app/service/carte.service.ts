import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carte } from '../model/carte';
import { RouteAPIService } from './route-api.service';

@Injectable({
  providedIn: 'root'
})
export class CarteService {

  constructor(private http: HttpClient, private route: RouteAPIService) { }

  ListeCarte(): Observable<Carte[]>
  {
    return this.http.get<Carte[]>(`${this.route.PHP_API}/listeCarte.php`);
  }

  ListeCarteModeStandard(): Observable<Carte[]>
  {
    return this.http.get<Carte[]>(`${this.route.PHP_API}/listeCarteMode.php`);
  }

  ListeCarteModeAssaut(): Observable<Carte[]>
  {
    return this.http.get<Carte[]>(`${this.route.PHP_API}/listeCarteModeAssaut.php`);
  }

  SuppCarte(uneCarte): Observable<Carte[]>
  {
    return this.http.post<Carte[]>(`${this.route.PHP_API}/suppUneCarte.php`, uneCarte);
  }

  AjouterCarte(form): Observable<Carte[]>
  {
    return this.http.post<Carte[]>(`${this.route.PHP_API}/ajouterCarte.php`, form);
  }

  RechercheCarte(nomCarte): Observable<Carte[]>
  {
    return this.http.post<Carte[]>(`${this.route.PHP_API}/chercheCarte.php`, nomCarte);
  }

  InfosCarteAmodifier(uneCarte): Observable<any>
  {
    return this.http.post<any>(`${this.route.PHP_API}/infosCarteAmodifier.php`, uneCarte);
  }

  ModifierCarte(carte): Observable<Carte>
  {
    return this.http.post<Carte>(`${this.route.PHP_API}/modifierCarte.php`, carte);
  }

}
