import Axios, { AxiosResponse } from "axios";
import { handleAncileResponse, handleRequestException } from "./handlers"
import { AncileCallbackFunction } from "./types";

class AncileRequest {
    purpose: string;
    token: string;
    program: string;
    users: string[];

    constructor(purpose: string, token: string, program: string, users: string[]) {
        this.purpose = purpose;
        this.token = token;
        this.program = program;
        this.users = users;
    }
}

export class AncileClient {
    public readonly token: string;
    public readonly purpose: string;
    public readonly ancileUrl: string;

    constructor(token: string, purpose: string, ancileUrl: string) {
        this.token = token;
        this.purpose = purpose;
        this.ancileUrl = ancileUrl;
    }

    public execute(program: string, users: string[], callback: AncileCallbackFunction): void {
        let ancileRequest = new AncileRequest(this.purpose, this.token, program, users);

        Axios.post(
            this.ancileUrl,
            ancileRequest
        )
        .catch(handleRequestException(callback))
        .then(handleAncileResponse(callback));
    }
}
