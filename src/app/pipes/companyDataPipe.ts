import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name:'CompanyFilterPipe'
})

export class CompanyDataPipe implements PipeTransform{
    transform(value:any[],filterBy:string):any[]{       
        filterBy = filterBy?filterBy.toLocaleLowerCase():null;
        return filterBy? value.filter((p:any)=>p.company_name.toLocaleLowerCase().indexOf(filterBy)!== -1):value;
    }
}