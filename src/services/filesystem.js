import { saveAs } from 'file-saver';
import { Buffer } from 'buffer';

export function saveFile(base64, mime, filename){
    let buffer = Buffer.from(base64, 'base64') 
    const url = window.URL.createObjectURL(new Blob([buffer],{ type: mime }));
    saveAs(url, filename);      
}   