import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'DiseaseFilterPipe'
})

export class DiseaseDataPipe implements PipeTransform {
    transform(value: any[], filterBy: string): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((p: any) => p.disease_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}