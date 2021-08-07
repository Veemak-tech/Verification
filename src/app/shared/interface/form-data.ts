export interface FormData {
  controlName: string;
  controlType: string;
  valueType?: string;
  currentValue?: string;
  placeholder?: string;
  options?: Array<{
    optionName: string;
    value: string;
   }>;
  validators?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
  };
}


// "questionid": 1,
//         "questionname": "IsAlive",
//         "questiondisplaytext": "Is Person is alive ?",
//         "helptext": "Alive",
//         "labelcss": "col-sm-2 col-form-label",
//         "controlcss": "form-control",
//         "maxlength": 45,
//         "controltype": "text",
//         "groupid": 1,
//         "displayorderno": 1,
//         "CreatedBy": "karthik",
//         "CreatedDate": "2021-03-23T06:08:47.000Z",
//         "LastModifiedBy
