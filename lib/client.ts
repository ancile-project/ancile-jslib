import "requests";

export class AncileClient {
    public readonly token: string;
    public readonly purpose: string;
    public readonly ancileUrl: string;


    constructor(token: string, purpose: string, ancileUrl: string) {
        this.token = token;
        this.purpose = purpose;
        this.ancileUrl = ancileUrl;
    }

    public execute(program: string, users: string[], callback: (data: any[]) => any): void {
        
    }
}

