import { AxiosResponse } from "axios";
import { AncilePolicyException, AncileProgramException } from "./errors";
import { AncileCallbackFunction } from "./types";

export function handleRequestException(callback: AncileCallbackFunction): (value: any) => any {
  return (error: any) => {
      callback(undefined, error);
  }
}

export function handleAncileResponse(callback: AncileCallbackFunction): (response: AxiosResponse<any>) => any {
  return (response: AxiosResponse) => {
      if (response.data.result === "ok") {
          callback(response.data.data, undefined);
      } else if (response.data.traceback.search("Policy") > -1) {
          callback(undefined, new AncilePolicyException());
      } else {
          callback(undefined, new AncileProgramException(response.data.traceback));
      }
  }
}