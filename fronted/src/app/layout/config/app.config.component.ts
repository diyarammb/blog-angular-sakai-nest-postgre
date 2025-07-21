import {Component, Input} from '@angular/core';
import {LayoutService} from '../service/app.layout.service';
import {MenuService} from '../app.menu.service';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
    standalone: true,
    imports: [
        SidebarModule,
        ButtonModule,
        NgFor,
        NgClass,
        NgIf,
        RadioButtonModule,
        FormsModule,
        InputSwitchModule,
    ],
})
export class AppConfigComponent {
    @Input() minimal: boolean = false;

    scales: number[] = [12, 13, 14, 15, 16];

    constructor(
        public layoutService: LayoutService,
        public menuService: MenuService
    ) {
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config().scale;
    }

    set scale(_val: number) {
        this.layoutService.config.update((config) => ({
            ...config,
            scale: _val,
        }));
    }

    get menuMode(): string {
        return this.layoutService.config().menuMode;
    }

    set menuMode(_val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            menuMode: _val,
        }));
    }

    get inputStyle(): string {
        return this.layoutService.config().inputStyle;
    }

    set inputStyle(_val: string) {
        this.layoutService.config().inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config().ripple;
    }

    set ripple(_val: boolean) {
        this.layoutService.config.update((config) => ({
            ...config,
            ripple: _val,
        }));
    }

    get theme(): string {
        return this.layoutService.config().theme;
    }

    set theme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: val,
        }));
    }

    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    set colorScheme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            colorScheme: val,
        }));
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
    }

    decrementScale() {
        this.scale--;
    }

    incrementScale() {
        this.scale++;
    }
}
