import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'DiseaseSynFilterPipe'
})

export class DiseaseSynDataPipe implements PipeTransform {
    transform(value: any[], filterBy: any): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((p: any) => p.disease_syn_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}