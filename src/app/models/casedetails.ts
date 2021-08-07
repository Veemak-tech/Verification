import { address } from "./address";
import { insurerDetails } from "./insurerDetails"
import { thirdpartyDetails } from "./thirdpartydetails"

export interface casedetails {

  CaseID: string;
  name: string;
  Description: string;
  InsurerVerificationNotes: string;
  T_VerificationNotes: string;
  ReferenceNumber:string;
  DueDate:string;
  CreatedBy: string;
  LastModifiedBy:string;


  insAddress:address;

  insDetails: insurerDetails;

  tpartyDetails: thirdpartyDetails;


}
