import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'GeneFilterPipe'
})

export class GeneDataPipe implements PipeTransform {
    transform(value: any[], filterBy: string): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((p: any) => p.gene_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}