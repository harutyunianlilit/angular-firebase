import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AfService } from '../providers/af.service';
import { tap, map, take } from 'rxjs/operators';
import { User } from '../providers/user';

@Injectable({
  providedIn: 'root'
})
export class SubscriberGuard implements CanActivate {
  constructor(private af: AfService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.af.user$.pipe(
      take(1),
      map((user) => user && user.roles && user.roles.admin ? true : false),
      tap(isSubscriber => {
        if (!isSubscriber) {
          console.error('Access denied. Only subscribers are allowed.');
        }
      })
    );
  }
}
