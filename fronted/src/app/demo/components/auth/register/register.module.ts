import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        ErrorRoutingModule,
        ButtonModule,
        RegisterComponent
    ]
})
export class RegisterModule {
}
