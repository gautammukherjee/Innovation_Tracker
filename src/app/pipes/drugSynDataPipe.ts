import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'DrugSynFilterPipe'
})

export class DrugSynDataPipe implements PipeTransform {
    transform(value: any[], filterBy: any): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((p: any) => p.drug_syn_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}