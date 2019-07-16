import Axios from "axios";
import { AncilePolicyException, AncileProgramException } from "./errors";

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

    public async execute(program: string, users: string[]) {
        let ancileRequest = new AncileRequest(this.purpose, this.token, program, users);

        let response = await Axios.post(
            this.ancileUrl,
            ancileRequest
        )

        if (response.data.result === "ok") {
            return response.data.data;
        }

        if (response.data.traceback.search("PolicyError") > -1) {
            throw new AncilePolicyException();
        }

        throw new AncileProgramException(response.data.traceback);
    }
}
