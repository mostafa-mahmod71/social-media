import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../auth/services/loading/loading.service';
import { finalize } from 'rxjs';

export const allresInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingservice = inject(LoadingService);
  loadingservice.isloading.set(true);
  return next(req).pipe(
    finalize(() => {
      loadingservice.isloading.set(false);
    }),
  );
};
