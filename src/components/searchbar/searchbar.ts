import { Component, Input } from '@angular/core';

import { SearchService } from '../../services/search.service';

@Component({
    selector: 'search-bar',
    templateUrl: 'searchbar.html'
})
export class SearchBar {
    @Input() placeholder: string;

    constructor(public search: SearchService) {

    }

    changed(ev: any) {
        this.search.go();
    }
}