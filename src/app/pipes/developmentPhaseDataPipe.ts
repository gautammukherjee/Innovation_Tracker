import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'DevelopmentPhaseFilterPipe'
})

export class DevelopmentPhaseDataPipe implements PipeTransform {
    transform(value: any[], filterBy: any): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((p: any) => p.company_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}