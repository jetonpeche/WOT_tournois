import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouteAPIService } from './route-api.service';

@Injectable({
  providedIn: 'root'
})
export class CombatSoloService {

  constructor(private http: HttpClient, private route: RouteAPIService) { }

  ListeMatchSolo(): Observable<any[]>
  {
    return this.http.get<any[]>(`${this.route.PHP_API}/listeMatchSolo.php`);
  }

  SuppMatchSolo(info): Observable<any>
  {
    return this.http.post(`${this.route.PHP_API}/suppMatchSolo.php`, info);
  }

  ModifierJoueursMatchSolo(form): Observable<any>
  {
    return this.http.post(`${this.route.PHP_API}/modifJoueursMatchSolo.php`, form);
  }

  SuppAllMatchSolo(): Observable<string>
  {
    return this.http.get<string>(`${this.route.PHP_API}/suppAllMatchSolo.php`);
  }
}
