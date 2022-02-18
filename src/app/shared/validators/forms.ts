import { FormGroup } from "@angular/forms"

export function resetform(form: FormGroup) {
    form.reset()
    for (let key in form.controls) {
        form.controls[key].clearValidators()
        form.controls[key].updateValueAndValidity()
    }


    console.log(form)
}