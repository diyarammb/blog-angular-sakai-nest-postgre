import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { BlogsService } from './app/demo/service/blogs.service';
import { PhotoService } from './app/demo/service/photo.service';
import { NodeService } from './app/demo/service/node.service';
import { IconService } from './app/demo/service/icon.service';
import { EventService } from './app/demo/service/event.service';
import { CustomerService } from './app/demo/service/customer.service';
import { CountryService } from './app/demo/service/country.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/demo/components/auth/auth.interceptor';
 
if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(
            routes,
            withEnabledBlockingInitialNavigation(),
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                // onSameUrlNavigation: 'reload'
            })
        ),
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, BlogsService,
        importProvidersFrom(BrowserAnimationsModule), // Add BrowserAnimationsModule if you use animations
        importProvidersFrom(HttpClientModule),// Add HttpClientModule here,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
    .catch(err => console.error(err));
