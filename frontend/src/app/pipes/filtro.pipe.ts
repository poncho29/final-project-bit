import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(valor:Producto[], filtroString:string, propName:string):Producto[]{

    const resultado: Producto[] =[];

    if(!valor || filtroString === '' || propName === ''){
      return valor;
    }

    valor.forEach((a:any) => {
      if(a[propName].trim().toLowerCase().includes(filtroString.toLowerCase())){
        resultado.push(a);
      }
    });

    return resultado;

  }

}
