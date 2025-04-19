import { ResumeData } from "@/lib/types";
// import { compress, decompress } from "brotli-wasm";
import CryptoJS from "crypto-js";
import brotliPromise from 'brotli-wasm'; // Import the default export

const brotli = await brotliPromise;
const { compress, decompress } = brotli;

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "your-secret-key";

export async function compressResumeData(data: ResumeData): Promise<Uint8Array> {
  const jsonString = JSON.stringify(data);
  return compress(new TextEncoder().encode(jsonString));
}

export async function decompressResumeData(compressedData: Uint8Array): Promise<ResumeData> {
  const decompressed = decompress(compressedData);
  const jsonString = new TextDecoder().decode(decompressed);
  return JSON.parse(jsonString);
}

export function encryptResumeData(data: ResumeData): string {
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
}

export function decryptResumeData(encryptedData: string): ResumeData {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  const jsonString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(jsonString);
}

export function downloadEncryptedResume(data: ResumeData) {
  const encryptedData = encryptResumeData(data);
  const blob = new Blob([encryptedData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "resume_data.enc";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readEncryptedFile(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const encryptedData = e.target?.result as string;
        const decryptedData = decryptResumeData(encryptedData);
        resolve(decryptedData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
} 