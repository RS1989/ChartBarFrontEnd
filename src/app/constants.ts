export class Constants{
    public static get GetMainUrl(): string { return "http://localhost:49980" };
    public static get PostFileData():string { return this.GetMainUrl + "/api/upload"};
    public static get Randomize():string {return this.GetMainUrl + "/api/random"}
} 