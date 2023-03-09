import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'MoaFilterPipe'
})

export class MoaDataPipe implements PipeTransform {
    transform(value: any[], filterBy: string): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((p: any) => p.moa_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}