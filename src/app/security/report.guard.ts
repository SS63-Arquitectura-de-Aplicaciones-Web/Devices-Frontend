import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const reportGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return (authService.getAuthUser()?.roles[0].rol === 'PROGRAMADOR' ||
    authService.getAuthUser()?.roles[0].rol === 'RECLUTADOR')
    ? true
    : router.createUrlTree(['segura/home']);
};
