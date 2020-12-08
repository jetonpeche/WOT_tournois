import { Component } from '@angular/core';
import { ConnexionService } from 'src/app/service/connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  erreurLog: boolean = false;
  erreurHttp: boolean = false;

  constructor(private conn: ConnexionService, private router: Router) { }

  onSeConnecter(form)
  {
    this.conn.connexion(form.value).subscribe(
      (ok: boolean) =>
      {
        if(ok == true)
        {
          sessionStorage.setItem("Login", "coucou");
          this.router.navigate(["/accueil"]);
        }
        else
        {
          this.erreurLog = true;
          setTimeout(() => {
            this.erreurLog = false;
          }, 3000);
        }
      },
      // erreur http
      (e) =>
      {
        console.log(e);
        this.erreurHttp = true;
        setTimeout(() => {
          this.erreurHttp = false;
        }, 3000);
      }
    )
  }

}
