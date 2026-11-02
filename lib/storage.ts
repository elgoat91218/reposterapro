import type {AppData} from "@/types";
const KEY="repostera-pro:v1";
let activeUserId: string | null = null;
export function setStorageUser(userId: string | null) { activeUserId = userId; }
function storageKey() { return activeUserId ? `${KEY}:user:${activeUserId}` : KEY; }
export function getData():AppData|null{if(typeof window==="undefined")return null;try{const raw=localStorage.getItem(storageKey());return raw?JSON.parse(raw):null}catch{return null}}
export function saveData(data:AppData){if(typeof window!=="undefined")localStorage.setItem(storageKey(),JSON.stringify(data))}
export function restoreDemoData(data:AppData){if(typeof window!=="undefined")localStorage.setItem(storageKey(),JSON.stringify(data))}
export function clearData(){if(typeof window==="undefined")return;localStorage.removeItem(storageKey())}
export function updateData(mutator:(data:AppData)=>AppData){const current=getData();if(!current)return null;const next=mutator(current);saveData(next);return next}
