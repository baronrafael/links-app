import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';

const MODULES = [
  CommonModule,
  HttpClientModule,
  BrowserAnimationsModule
];

const COMPONENTS = [
  LoaderComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 6000,
      extendedTimeOut: 6000,
      progressBar: true,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
