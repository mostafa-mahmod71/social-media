import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../auth/services/loading/loading.service';
import { finalize } from 'rxjs';

export const allresInterceptor: HttpInterceptorFn = (req, next) => {
  const loadnigservice = inject(LoadingService);
  loadnigservice.isloading.set(true);
  return next(req).pipe(
    finalize(() => {
      loadnigservice.isloading.set(false);
    }),
  );
};
