import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'showError',
  pure:false
})
export class ShowErrorPipe implements PipeTransform {

  transform(form: FormGroup, control : string , label : string): any {

    // console.log(form , control , label);
    // console.log(form.get(control)?.touched,form.get(control)?.invalid,"AYU2");

    if(form.get(control)?.touched && form.get(control)?.invalid){
      // console.log('lll');

      const error = form.get(control)?.errors

      if(error?.hasOwnProperty("required")){
        return `${label} is required`
      }else if(error?.hasOwnProperty("pattern")){
        if(control === 'password' || control === 'confirm_password'){
          return `${label} must be of 8 character and must contain one alphanumeric and one special character`
        }else{
          let pattern = error.pattern.requiredPattern;
          // console.log(pattern,'ooooo');
          return this.PATTERN_ERRORS(pattern, label);
        }
      }
    }

    return '';
  }

  PATTERN_ERRORS(pattern:any , label:string){

    // if(pattern == REGEX.email){
    //   return `${label} is invalid`
    // }else if (pattern == REGEX.name){
    //   return `${label} is invalid`
    // }
    return ''
  }
}
