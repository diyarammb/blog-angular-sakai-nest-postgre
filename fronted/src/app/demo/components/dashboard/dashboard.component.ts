import {Component, OnInit, OnDestroy} from '@angular/core';
import {MenuItem, SharedModule} from 'primeng/api';
import {BlogPost} from '../../api/blog-post.model';
import {BlogsService} from '../../service/blogs.service';
import {Subscription, debounceTime} from 'rxjs';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {ChartModule} from 'primeng/chart';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {NgStyle, CurrencyPipe} from '@angular/common';

@Component({
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [
        NgStyle,
        TableModule,
        SharedModule,
        ButtonModule,
        MenuModule,
        ChartModule,
        CurrencyPipe,
    ],
})
export class DashboardComponent {

     
    
    
}
