import { ValidatorFn, AbstractControl } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: boolean } | null => {
        let password = group.get('password')?.value;
        let confirmPassword = group.get('confirmPassword')?.value;

        if (password !== confirmPassword) {
            return { 'equal': true };
        }
        return null;
    };
}