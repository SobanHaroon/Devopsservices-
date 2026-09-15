export type Currency = "USD" | "PKR";
export const SERVICE_IDS = ["web-development","web-management","ui-ux-design","seo","digital-marketing","brand-identity","business-automation","nfc-cards"] as const;
export const PKR_BUDGETS = ["Rs. 35,000 - 50,000","Rs. 50,000 - 75,000","Rs. 75,000 - 100,000","Rs. 100,000+"];
export const USD_BUDGETS = ["$500 - $1,000","$1,000 - $5,000","$5,000 - $10,000","More than $10,000"];
export function toggleService(selected:string[],id:string) {
 return selected.includes(id)?selected.filter(item=>item!==id):[...selected,id];
}
export function budgetLabel(currency:Currency,index:number) {
 return (currency==="PKR"?PKR_BUDGETS:USD_BUDGETS)[index] || "";
}
export function buildBrief(data:{fullName:string;companyName:string;email:string;phone:string;country:string;industry:string;description:string},services:string[],currency:Currency,budgetIndex:number) {
 return ["New DevOps Services project inquiry", "Name: "+data.fullName,"Company: "+(data.companyName||"—"),"Email: "+data.email,"Phone: "+(data.phone||"—"),"Country: "+data.country,"Industry: "+data.industry,"Services: "+services.join(", "),"Preferred payment currency: "+currency,"Estimated project budget: "+budgetLabel(currency,budgetIndex),"Project description:",data.description].join("\n");
}
