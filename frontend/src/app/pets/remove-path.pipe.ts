import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePath',
})
export class RemovePathPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    const newValue = value.slice(12);
    return newValue;
  }
}
