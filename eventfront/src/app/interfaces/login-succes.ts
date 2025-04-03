export interface LoginSucces {
  status:number;
  message:string;
  user:{
    firstName:string;
    lastName:string;
    email:string;
  },
  role:string;
}
