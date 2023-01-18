import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatServiceService } from '../service/chat-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private route : Router, private chatService:ChatServiceService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let Login = localStorage.getItem('login')
    if(this.chatService.details?.valid){
      console.log("the guard is....running.");
      return true
    }
    this.route.navigate(['']);
    localStorage.clear()
    return false
  }

}
