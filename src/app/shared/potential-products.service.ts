import { Injectable } from '@angular/core';

export interface potentialProduct{
  value:String;
  viewValue: string;
}
@Injectable({
  providedIn: 'root'
})


export class PotentialProductsService {

  potentialProductOption: potentialProduct[] = [
    {value: 'Report',viewValue:'Report'},
    {value: 'Model',viewValue:'Model'},
    {value:'Software',viewValue:'Software'},
    {value: 'Algorithmics',viewValue:'Algorithmics'},
    {value: 'Datasets',viewValue:'Datasets'},
    {value: 'Hardware',viewValue:'Hardware'},
    {value: 'Presentation',viewValue:'Presentation'},
    {value: 'Patents',viewValue:'Patents'}

  ];


/*   potentialProductOption: potentialProduct[] = [
    {value: 'report-0',viewValue:'Report'},
    {value: 'model-1',viewValue:'Model'},
    {value: 'software-2',viewValue:'Software'},
    {value: 'algorithmics-3',viewValue:'Algorithmics'},
    {value: 'datasets-4',viewValue:'Datasets'},
    {value: 'hardware-5',viewValue:'Hardware'},
    {value: 'presentation-6',viewValue:'Presentation'},
    {value: 'patents-7',viewValue:'Patents'}

  ]; */

  constructor() { }


}
