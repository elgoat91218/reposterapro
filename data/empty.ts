import type {AppData} from "@/types";

/** Datos iniciales limpios: la aplicación abre lista para que cada negocio cargue su propia información. */
export function createEmptyData():AppData{
 const now=new Date().toISOString();
 return {
  customers:[],
  ingredients:[],
  products:[],
  orders:[],
  orderHistory:{},
  expenses:[],
  notifications:[],
  userProfile:{id:"user",name:"",email:"",avatar:"",createdAt:now,updatedAt:now},
  businessProfile:{id:"biz",businessName:"",logo:"",phone:"",address:"",additionalInfo:"",createdAt:now,updatedAt:now},
  settings:{currency:"ARS",theme:"system",demoData:false,defaultMargin:40,rounding:500,onboardingCompleted:true,tourCompleted:true,onboarding:{businessTypes:[],workLocation:"",orderChannels:[],monthlyOrders:""}}
 };
}
