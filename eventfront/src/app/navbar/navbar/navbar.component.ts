// navbar.component.ts
import { isPlatformBrowser, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { Component, computed, effect, Inject, inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports:[NgIf,RouterLink,TitleCasePipe,FormsModule,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 service=inject(LoginServiceService)
 route=inject(Router)
  isLoggedIn: any = this.service.login();
  isMenuOpen: boolean = false;

  avatar:string= 'https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0='
  currentUser:any={
    firstName: '',
    lastName: '',
    email: '',
    role:''
  };

  constructor(@Inject(PLATFORM_ID) private platformid:object) {
    /* this.currentUser = computed(()=>{
     return this.service.user()
    }); */

    effect(() => {
      this.isLoggedIn=this.service.login();
      if (isPlatformBrowser(this.platformid)) {
        const login:any=localStorage.getItem('login')
        this.isLoggedIn=JSON.parse(login)
        const user:any=localStorage.getItem('user')
        //console.log(this.currentUser);
        this.currentUser=JSON.parse(user)
        console.log(this.currentUser);

        //console.log(JSON.parse(login));
        //this.ngOnInit()
      }
    });
  }

  ngOnInit(): void {

  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  create_event()
  {
    this.service.create_event.set(true);
    console.log(this.service.create_event());
  }

  logout(): void {
    //Implémentez la logique de déconnexion ici
     this.service.setUser(0,0);
    //this.route.navigate(['/connexion']);
    console.log('Utilisateur déconnecté');
  }
}
