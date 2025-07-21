import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: true,
    imports: [NgFor, NgIf, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) {
    }

    ngOnInit() {
        this.model = [
            {

                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },

                    {
                        label: 'Blog',
                        icon: 'pi pi-file',
                        routerLink: ['/dashboard/pages/blog']
                    },
                ]
            },



        ];
    }
}
