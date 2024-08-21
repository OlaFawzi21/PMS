import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const _toastr = inject(ToastrService);

  if (localStorage.getItem('userToken')) {
    return true;
  } else {
    _toastr.error('You must login first', 'Error');
    router.navigate(['/auth/login']);

    return false;
  }
};
