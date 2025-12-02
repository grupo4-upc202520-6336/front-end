import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {AuthStatus} from "../models/auth-status.enum";

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Estado:', authService.authStatus());
  console.log('Roles:', localStorage.getItem('roles'));


  if (authService.authStatus() === AuthStatus.authenticated) {

    let roles = [];
    try {
      roles = JSON.parse(localStorage.getItem('roles') || '[]');
    } catch (e) { roles = []; }

    const userId = localStorage.getItem('userId');

    if (roles.includes('ROLE_AGRICULTURAL_PRODUCER')) {
      router.navigateByUrl('/fields');
      return false;
    }

    if (roles.includes('ROLE_DISTRIBUTOR') && userId) {
      router.navigateByUrl(`/home-distributor/${userId}`);
      return false;
    }

    // Si NO hay roles → no redirigir
    return true;
  }


  return true; // Permitir acceso a la ruta si no está autenticado
};
