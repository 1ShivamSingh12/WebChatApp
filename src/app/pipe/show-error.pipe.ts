import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { REGEX } from '../constant/validation';

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
      // console.log(error,'errr');

      if(error?.hasOwnProperty("required")){
        return `${label} is required`
      }
      else if(error?.hasOwnProperty("minlength")){
        return `${label} must be of 3 character`;
      }else if(error?.hasOwnProperty("maxlength")){
        return `${label} must be of 10 character `;
      }
      else if(error?.hasOwnProperty("pattern")){
        if(control === 'password' || control === 'confirm_password'){
          return `${label} must be 3 character and must not contain spaces`
        }else{
          let pattern = error.pattern.requiredPattern;
          return this.PATTERN_ERRORS(pattern, label);
        }
      }
    }

    return '';
  }

  PATTERN_ERRORS(pattern:any , label:string){

    if(pattern == REGEX.name){
      return `${label} is invalid`
    }
    else if (pattern == REGEX.password){
      return `${label} is invalid`
    }
    return ''
  }
}
