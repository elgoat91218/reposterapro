import type {Ingredient,Order,Product} from "@/types";

const factor=(unit:string)=>unit==="kg"||unit==="l"?1000:1;
export const toBaseQuantity=(quantity:number,unit:string)=>quantity*factor(unit);
export const calculateIngredientUnitCost=(i:Ingredient)=>{const purchaseBase=toBaseQuantity(i.purchaseQuantity,i.purchaseUnit||i.baseUnit);return purchaseBase>0?i.purchasePrice/purchaseBase:0};
export const calculateIngredientCost=(p:Product,ingredients:Ingredient[])=>p.ingredients.reduce((s,x)=>{const i=ingredients.find(v=>v.id===x.ingredientId);return s+(i?calculateIngredientUnitCost(i)*toBaseQuantity(x.quantity??1,x.unit||i.baseUnit):0)},0);
export const calculatePackagingCost=(p:Product,ingredients:Ingredient[]=[])=>p.packaging.reduce((s,x)=>{if(x.ingredientId){const i=ingredients.find(v=>v.id===x.ingredientId);if(i)return s+calculateIngredientUnitCost(i)*toBaseQuantity(x.quantity??1,x.unit||i.baseUnit)}return s+x.cost},0);
export const calculateLaborCost=(p:Product)=>p.laborHours*p.laborRate;
export const calculateRealCost=(p:Product,ingredients:Ingredient[])=>calculateIngredientCost(p,ingredients)+calculatePackagingCost(p,ingredients)+calculateLaborCost(p);
export const calculateProfit=(price:number,cost:number)=>price-cost;
export const calculateMargin=(price:number,cost:number)=>price?((price-cost)/price)*100:0;
export const calculateSuggestedPrice=(cost:number,margin:number)=>margin>=100?cost:cost/(1-margin/100);
export const calculateRoundedPrice=(value:number,rounding:number)=>rounding?Math.ceil(value/rounding)*rounding:value;
export const calculateOrderTotal=(o:Order)=>o.items.reduce((s,i)=>s+i.subtotal,0);
export const calculateOrderBalance=(o:Order)=>Math.max(0,o.total-o.payments.reduce((s,p)=>s+p.amount,0));
export const calculateAverageTicket=(orders:Order[])=>orders.length?orders.reduce((s,o)=>s+o.total,0)/orders.length:0;
export const calculateOrderCost=(o:Order,products:Product[],ingredients:Ingredient[])=>o.items.reduce((sum,it)=>{const product=products.find(p=>p.id===it.productId);const currentCost=product?calculateRealCost(product,ingredients):0;return sum+(it.costTotalSnapshot??currentCost*it.quantity)},0);
export const calculateOrderIngredientCost=(o:Order,products:Product[],ingredients:Ingredient[])=>o.items.reduce((sum,it)=>{const product=products.find(p=>p.id===it.productId);const currentCost=product?calculateIngredientCost(product,ingredients):0;return sum+(it.ingredientCostTotalSnapshot??currentCost*it.quantity)},0);
