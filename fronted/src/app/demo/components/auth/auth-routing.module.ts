import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
        {path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule)},
        {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
        {path: '**', redirectTo: '/notfound'}
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
