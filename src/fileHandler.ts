import { appendFile, readFile, mkdir } from "node:fs/promises";
import path from "path";

const outputFolder = path.join(process.cwd(), "output");
const fileName = path.join(outputFolder, "output.txt");

const ensureOutputFolder = async () => {
    try{
        await mkdir(outputFolder, { recursive: true});
    }catch (err){
        console.log("Error creating output folder: ", err);
    }
}

export const writeToFile = async (message: string): Promise<void> => {
      await ensureOutputFolder();
      await appendFile(fileName, message + "\n", "utf-8");
}

export const readFromFile = async (): Promise<string> => {
    try{
        const data = await readFile(fileName, "utf-8");
        return data;

    } catch (err) {
        console.log("Error reading from file: ", err);
        return "No data found in file";
    }
}