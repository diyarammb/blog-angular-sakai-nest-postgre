import { Routes } from '@angular/router';
import { PostDetailsComponent } from './demo/components/post-details/post-details.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './demo/components/auth/auth.guard';
import { NoAuthGuard } from './demo/components/auth/no-auth.guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: AppLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
        ]
    },
    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)
    },
    { path: 'blog/:id', component: PostDetailsComponent },
];
