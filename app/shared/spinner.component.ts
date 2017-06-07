import { Component, Input } from 'angular2/core';

@Component({
    selector: 'spinner';
    template: `
        <i *ngIf="isVisible" class="fa fa-cog fa-spin fa-3x fa-fw"></i>
        `})

export class Spinner {
    @Input() isVisible = true;

}
