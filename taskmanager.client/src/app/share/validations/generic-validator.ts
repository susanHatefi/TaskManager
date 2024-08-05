import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

const VALIDATION_MESSAGES = {
  title: {
    required: 'Title Is Required',
  },
  priority: {
    required: 'Priority Is Required',
    range: 'Priority Should Be between 1 to 4',
  },
  component: {
    required: 'Component Is Required',
  },
  severity: {
    required: 'Severity Is Required',
  },
  affectedVersion: {
    required: 'Affected Version  Is Required',
  },
};

export class GenericValidator {
  constructor(
    private validationMessages: {
      [key: string]: { [key: string]: string };
    } = VALIDATION_MESSAGES
  ) {}

  getValidationsMessages(mainForm: FormGroup): { [key: string]: string } {
    const messages: { [key: string]: string } = {};
    for (const controlName in mainForm.controls) {
      if (mainForm.controls.hasOwnProperty(controlName)) {
        const control = mainForm.controls[controlName];
        if (control instanceof FormGroup) {
          const childMessages = this.getValidationsMessages(control);
          Object.assign(messages, childMessages);
        } else {
          if (this.validationMessages[controlName]) {
            if (control.errors && control.dirty) {
              messages[controlName] = '';
              Object.keys(control.errors).map((messageKey) => {
                if (this.validationMessages[controlName][messageKey]) {
                  messages[controlName] +=
                    this.validationMessages[controlName][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }

  rangeValidation(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (!isNaN(+min) && !isNaN(+max)) {
        if (c.value < min || c.value > max) {
          return { range: true };
        }
      } else if (!isNaN(+min)) {
        if (c.value < min) {
          return { range: true };
        }
      } else if (!isNaN(+min)) {
        if (c.value > max) {
          return { range: true };
        }
      }

      return null;
    };
  }
}
