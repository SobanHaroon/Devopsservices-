import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { STUDIO_COPY } from "../../data/studioCopy";
import { ContactTranslations } from "../../data/contactTranslations";
import { PKR_BUDGETS, SERVICE_IDS, budgetLabel, buildBrief, toggleService, type Currency } from "../../lib/projectBrief";
const empty={fullName:"",companyName:"",email:"",phone:"",country:"",industry:"",description:""};
export default function ProjectContact({selected,setSelected}:{selected:string[];setSelected:(value:string[])=>void}) {
 const {language}=useLanguage();
 const c=STUDIO_COPY[language],t=ContactTranslations[language];
 const [data,setData]=useState(empty);
 const [currency,setCurrency]=useState<Currency>("USD");
 const [budget,setBudget]=useState("");
 const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
 const [serviceError,setServiceError]=useState(false);
 const [receipt,setReceipt]=useState<{services:string[];budget:string;currency:Currency}|null>(null);
 const successRef=useRef<HTMLDivElement>(null),errorRef=useRef<HTMLDivElement>(null);
 const firstService=useRef<HTMLInputElement>(null),inFlight=useRef(false);
 const labels=[...t.services,c.nfc] as string[];
 const budgets=currency==="PKR"?PKR_BUDGETS:t.budgets;
 const update=(name:keyof typeof empty,value:string)=>setData(old=>({...old,[name]:value}));
 const submit=async(e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();if(inFlight.current)return;
  if(!selected.length){setServiceError(true);firstService.current?.focus();return;}
  const index=Number(budget);
  if(budget===""||!budgetLabel(currency,index))return;
  inFlight.current=true;setStatus("sending");
  const names=SERVICE_IDS.filter(id=>selected.includes(id)).map(id=>labels[SERVICE_IDS.indexOf(id)]);
  const message=buildBrief(data,names,currency,index);
  const controller=new AbortController(),timeout=window.setTimeout(()=>controller.abort(),15000);
  try{
   const response=await fetch("https://ntfy.sh/contact-devops",{method:"POST",body:message,signal:controller.signal,headers:{"Title":"New DevOps Services project inquiry","Priority":"high","Tags":"briefcase"}});
   if(!response.ok)throw new Error("Delivery failed");
   setReceipt({services:names,budget:budgetLabel(currency,index),currency});setStatus("success");
   window.setTimeout(()=>successRef.current?.focus(),0);
  }catch{setStatus("error");window.setTimeout(()=>errorRef.current?.focus(),0);}
  finally{clearTimeout(timeout);inFlight.current=false;}
 };
 return <section id="contact" className="contact-section section-pad">
  <div className="contact-intro"><p className="eyebrow">{c.contactTag}</p><h2 className="section-title">{c.contactTitle}</h2><p className="section-desc">{c.contactDesc}</p>
   <div className="contact-direct"><Mail size={20}/><span>{c.email}<a href="mailto:devopsservicesltd@gmail.com">devopsservicesltd@gmail.com<ArrowUpRight size={16}/></a></span></div><p className="contact-location">{c.based}</p>
  </div>
  {status==="success"?<div className="brief-success" ref={successRef} tabIndex={-1} role="status">
   <CheckCircle2 size={40}/><h3>{c.success}</h3><p>{c.successDesc}</p>
   <dl><dt>{t.labelServices}</dt><dd>{receipt?.services.join(", ")}</dd><dt>{c.currency}</dt><dd>{receipt?.currency}</dd><dt>{t.labelBudget}</dt><dd>{receipt?.budget}</dd></dl>
   <button className="button button-dark" onClick={()=>{setData(empty);setSelected([]);setBudget("");setReceipt(null);setStatus("idle");}}>{c.another}<ArrowUpRight size={17}/></button>
  </div>:<form className="project-form" onSubmit={submit}>
   <fieldset disabled={status==="sending"} className="form-fields">
    <div className="form-two">
     <label>{t.labelFullName} *<input required autoComplete="name" name="fullName" value={data.fullName} onChange={e=>update("fullName",e.target.value)} maxLength={100}/></label>
     <label>{t.labelEmail} *<input required type="email" autoComplete="email" name="email" value={data.email} onChange={e=>update("email",e.target.value)} maxLength={200}/></label>
     <label>{t.labelCompany}<input autoComplete="organization" name="companyName" value={data.companyName} onChange={e=>update("companyName",e.target.value)} maxLength={160}/></label>
     <label>{t.labelPhone}<input type="tel" autoComplete="tel" name="phone" value={data.phone} onChange={e=>update("phone",e.target.value)} maxLength={40}/></label>
     <label>{t.labelCountry} *<select required name="country" value={data.country} onChange={e=>update("country",e.target.value)}><option value="">{t.selectCountry}</option>{["Pakistan",...t.countries].map((s:string,index:number)=><option key={index} value={index===0?"Pakistan":ContactTranslations.EN.countries[index-1]}>{s}</option>)}</select></label>
     <label>{t.labelIndustry} *<select required name="industry" value={data.industry} onChange={e=>update("industry",e.target.value)}><option value="">{t.selectIndustry}</option>{t.industries.map((s:string,index:number)=><option key={index} value={ContactTranslations.EN.industries[index]}>{s}</option>)}</select></label>
    </div>
    <fieldset className="service-field" aria-describedby={serviceError?"service-error":"service-hint"}>
     <legend>{t.labelServices} *</legend><p id="service-hint" className="field-hint">{c.multiple}</p>
     <div className="service-choices">{SERVICE_IDS.map((id,index)=><label className="service-choice" key={id}>
      <input ref={index===0?firstService:undefined} type="checkbox" name="services" value={id} checked={selected.includes(id)} onChange={()=>{setSelected(toggleService(selected,id));setServiceError(false);}}/><span>{labels[index]}<Check size={13}/></span>
     </label>)}</div>
     {serviceError&&<p id="service-error" className="form-error" role="alert">{c.required}</p>}
    </fieldset>
    <fieldset className="currency-field"><legend>{c.currency}</legend><div className="currency-switch">{(["USD","PKR"] as const).map(code=><label key={code}><input type="radio" name="currency" value={code} checked={currency===code} onChange={()=>{setCurrency(code);setBudget("");}}/><span>{code==="USD"?"$ USD":"Rs. PKR"}</span></label>)}</div></fieldset>
    <label className="budget-field">{t.labelBudget} *<select required name="budget" value={budget} onChange={e=>setBudget(e.target.value)} aria-describedby="budget-hint"><option value="">{c.selectBudget}</option>{budgets.map((label:string,index:number)=><option key={currency+index} value={index}>{label}</option>)}</select></label>
    <p id="budget-hint" className="field-hint">{c.budgetHint}</p>
    <label className="description-field">{t.labelDesc} *<textarea required name="description" rows={3} value={data.description} placeholder={t.placeholderDesc} onChange={e=>update("description",e.target.value)} maxLength={5000}/></label>
    {status==="error"&&<div className="form-error" ref={errorRef} tabIndex={-1} role="alert">{c.failure} <a href="mailto:devopsservicesltd@gmail.com">devopsservicesltd@gmail.com</a></div>}
    <button type="submit" className="button button-dark submit-brief" disabled={status==="sending"}>{status==="sending"?c.sending:c.send}{status==="sending"?<Loader2 className="spin" size={19}/>:<ArrowUpRight size={19}/>}</button>
   </fieldset>
  </form>}
 </section>;
}
