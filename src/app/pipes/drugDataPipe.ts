import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'DrugFilterPipe'
})

export class DrugDataPipe implements PipeTransform {
    transform(value: any[], filterBy: string): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((p: any) => p.drug_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}