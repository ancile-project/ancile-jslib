import { AxiosResponse } from "axios";
import { AncilePolicyException, AncileProgramException } from "./errors";

export function handleRequestException(callback: (data: any[] | undefined, error: any) => any): (value: any) => any {
  return (error: any) => {
      setTimeout(callback(undefined, error), 0)
  }
}

export function handleAncileResponse(callback: (data: any[] | undefined, error: any) => any): (response: AxiosResponse<any>) => any {
  return (response: AxiosResponse) => {
      if (response.data.result === "ok") {
          setTimeout(callback(response.data.data, undefined), 0);
      } else if (response.data.traceback.search("Policy") > -1) {
          throw new AncilePolicyException();
      } else {
          throw new AncileProgramException(response.data.traceback);
      }
  }
}