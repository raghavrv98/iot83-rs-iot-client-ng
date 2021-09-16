import { Component, HostListener } from '@angular/core';

@Component({
    template: ''
})
export class BaseComponent {

    isLoading = true;
    isNoDataFound = false;
    deviceViewport: number;
    isMobileView = false;

    @HostListener('window:resize', ['$event'])
    getScreenSize() {
        this.deviceViewport = window.innerWidth;
        this.isMobileView = this.deviceViewport <= 991 ? true : false;
    }

    trackByFn(item) {
        return item.id;
    }

    isLoadingHandler(): void {
        setTimeout(() => { this.isLoading = false; }, 1000);
    }

    isNoDataFoundHandler(): void {
        setTimeout(() => { this.isNoDataFound = true; }, 1000);
    }

}
