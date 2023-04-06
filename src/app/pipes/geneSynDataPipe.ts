import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'GeneSynFilterPipe'
})

export class GeneSynDataPipe implements PipeTransform {
    transform(value: any[], filterBy: any): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((p: any) => p.gene_syn_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}