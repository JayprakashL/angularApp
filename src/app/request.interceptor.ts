import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  // Register in app.config.ts
  // Cloning the original request as original request cannot be modified
  // pass this reqHeader
  console.log('Request Interceptor called', req);
  // for POST methods, it adds the header token
  if (req.method === 'POST') {
    const reqHeader = req.clone({
      headers: new HttpHeaders({
        token: '1232143ihvuitfi1',
      }),
    });
    return next(reqHeader);
  }
  return next(req);
};
