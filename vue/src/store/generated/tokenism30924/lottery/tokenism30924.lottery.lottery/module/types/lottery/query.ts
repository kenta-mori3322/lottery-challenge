/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../lottery/params";
import { Lottery } from "../lottery/lottery";
import { BetData } from "../lottery/bet_data";
import { PageRequest } from "../cosmos/base/query/v1beta1/pagination";

export const protobufPackage = "tokenism30924.lottery.lottery";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetLotteryRequest {
  index: string;
}

export interface QueryGetLotteryResponse {
  lottery: Lottery | undefined;
}

export interface QueryAllLotteryRequest {}

export interface QueryAllLotteryResponse {
  lottery: Lottery[];
}

export interface QueryGetBetDataRequest {
  index: string;
}

export interface QueryGetBetDataResponse {
  betData: BetData | undefined;
}

export interface QueryAllBetDataRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllBetDataResponse {
  betData: BetData[];
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryGetLotteryRequest: object = { index: "" };

export const QueryGetLotteryRequest = {
  encode(
    message: QueryGetLotteryRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetLotteryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetLotteryRequest } as QueryGetLotteryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetLotteryRequest {
    const message = { ...baseQueryGetLotteryRequest } as QueryGetLotteryRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    return message;
  },

  toJSON(message: QueryGetLotteryRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetLotteryRequest>
  ): QueryGetLotteryRequest {
    const message = { ...baseQueryGetLotteryRequest } as QueryGetLotteryRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    return message;
  },
};

const baseQueryGetLotteryResponse: object = {};

export const QueryGetLotteryResponse = {
  encode(
    message: QueryGetLotteryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.lottery !== undefined) {
      Lottery.encode(message.lottery, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetLotteryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetLotteryResponse,
    } as QueryGetLotteryResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lottery = Lottery.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetLotteryResponse {
    const message = {
      ...baseQueryGetLotteryResponse,
    } as QueryGetLotteryResponse;
    if (object.lottery !== undefined && object.lottery !== null) {
      message.lottery = Lottery.fromJSON(object.lottery);
    } else {
      message.lottery = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetLotteryResponse): unknown {
    const obj: any = {};
    message.lottery !== undefined &&
      (obj.lottery = message.lottery
        ? Lottery.toJSON(message.lottery)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetLotteryResponse>
  ): QueryGetLotteryResponse {
    const message = {
      ...baseQueryGetLotteryResponse,
    } as QueryGetLotteryResponse;
    if (object.lottery !== undefined && object.lottery !== null) {
      message.lottery = Lottery.fromPartial(object.lottery);
    } else {
      message.lottery = undefined;
    }
    return message;
  },
};

const baseQueryAllLotteryRequest: object = {};

export const QueryAllLotteryRequest = {
  encode(_: QueryAllLotteryRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllLotteryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllLotteryRequest } as QueryAllLotteryRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryAllLotteryRequest {
    const message = { ...baseQueryAllLotteryRequest } as QueryAllLotteryRequest;
    return message;
  },

  toJSON(_: QueryAllLotteryRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryAllLotteryRequest>): QueryAllLotteryRequest {
    const message = { ...baseQueryAllLotteryRequest } as QueryAllLotteryRequest;
    return message;
  },
};

const baseQueryAllLotteryResponse: object = {};

export const QueryAllLotteryResponse = {
  encode(
    message: QueryAllLotteryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.lottery) {
      Lottery.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllLotteryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllLotteryResponse,
    } as QueryAllLotteryResponse;
    message.lottery = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lottery.push(Lottery.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllLotteryResponse {
    const message = {
      ...baseQueryAllLotteryResponse,
    } as QueryAllLotteryResponse;
    message.lottery = [];
    if (object.lottery !== undefined && object.lottery !== null) {
      for (const e of object.lottery) {
        message.lottery.push(Lottery.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryAllLotteryResponse): unknown {
    const obj: any = {};
    if (message.lottery) {
      obj.lottery = message.lottery.map((e) =>
        e ? Lottery.toJSON(e) : undefined
      );
    } else {
      obj.lottery = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllLotteryResponse>
  ): QueryAllLotteryResponse {
    const message = {
      ...baseQueryAllLotteryResponse,
    } as QueryAllLotteryResponse;
    message.lottery = [];
    if (object.lottery !== undefined && object.lottery !== null) {
      for (const e of object.lottery) {
        message.lottery.push(Lottery.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryGetBetDataRequest: object = { index: "" };

export const QueryGetBetDataRequest = {
  encode(
    message: QueryGetBetDataRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetBetDataRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetBetDataRequest } as QueryGetBetDataRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBetDataRequest {
    const message = { ...baseQueryGetBetDataRequest } as QueryGetBetDataRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    return message;
  },

  toJSON(message: QueryGetBetDataRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetBetDataRequest>
  ): QueryGetBetDataRequest {
    const message = { ...baseQueryGetBetDataRequest } as QueryGetBetDataRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    return message;
  },
};

const baseQueryGetBetDataResponse: object = {};

export const QueryGetBetDataResponse = {
  encode(
    message: QueryGetBetDataResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.betData !== undefined) {
      BetData.encode(message.betData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetBetDataResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetBetDataResponse,
    } as QueryGetBetDataResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.betData = BetData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBetDataResponse {
    const message = {
      ...baseQueryGetBetDataResponse,
    } as QueryGetBetDataResponse;
    if (object.betData !== undefined && object.betData !== null) {
      message.betData = BetData.fromJSON(object.betData);
    } else {
      message.betData = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetBetDataResponse): unknown {
    const obj: any = {};
    message.betData !== undefined &&
      (obj.betData = message.betData
        ? BetData.toJSON(message.betData)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetBetDataResponse>
  ): QueryGetBetDataResponse {
    const message = {
      ...baseQueryGetBetDataResponse,
    } as QueryGetBetDataResponse;
    if (object.betData !== undefined && object.betData !== null) {
      message.betData = BetData.fromPartial(object.betData);
    } else {
      message.betData = undefined;
    }
    return message;
  },
};

const baseQueryAllBetDataRequest: object = {};

export const QueryAllBetDataRequest = {
  encode(
    message: QueryAllBetDataRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllBetDataRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBetDataRequest } as QueryAllBetDataRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBetDataRequest {
    const message = { ...baseQueryAllBetDataRequest } as QueryAllBetDataRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllBetDataRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllBetDataRequest>
  ): QueryAllBetDataRequest {
    const message = { ...baseQueryAllBetDataRequest } as QueryAllBetDataRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllBetDataResponse: object = {};

export const QueryAllBetDataResponse = {
  encode(
    message: QueryAllBetDataResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.betData) {
      BetData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllBetDataResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllBetDataResponse,
    } as QueryAllBetDataResponse;
    message.betData = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.betData.push(BetData.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBetDataResponse {
    const message = {
      ...baseQueryAllBetDataResponse,
    } as QueryAllBetDataResponse;
    message.betData = [];
    if (object.betData !== undefined && object.betData !== null) {
      for (const e of object.betData) {
        message.betData.push(BetData.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryAllBetDataResponse): unknown {
    const obj: any = {};
    if (message.betData) {
      obj.betData = message.betData.map((e) =>
        e ? BetData.toJSON(e) : undefined
      );
    } else {
      obj.betData = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllBetDataResponse>
  ): QueryAllBetDataResponse {
    const message = {
      ...baseQueryAllBetDataResponse,
    } as QueryAllBetDataResponse;
    message.betData = [];
    if (object.betData !== undefined && object.betData !== null) {
      for (const e of object.betData) {
        message.betData.push(BetData.fromPartial(e));
      }
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Lottery by index. */
  Lottery(request: QueryGetLotteryRequest): Promise<QueryGetLotteryResponse>;
  /** Queries a list of Lottery items. */
  LotteryAll(request: QueryAllLotteryRequest): Promise<QueryAllLotteryResponse>;
  /** Queries a BetData by index. */
  BetData(request: QueryGetBetDataRequest): Promise<QueryGetBetDataResponse>;
  /** Queries a list of BetData items. */
  BetDataAll(request: QueryAllBetDataRequest): Promise<QueryAllBetDataResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tokenism30924.lottery.lottery.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  Lottery(request: QueryGetLotteryRequest): Promise<QueryGetLotteryResponse> {
    const data = QueryGetLotteryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tokenism30924.lottery.lottery.Query",
      "Lottery",
      data
    );
    return promise.then((data) =>
      QueryGetLotteryResponse.decode(new Reader(data))
    );
  }

  LotteryAll(
    request: QueryAllLotteryRequest
  ): Promise<QueryAllLotteryResponse> {
    const data = QueryAllLotteryRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tokenism30924.lottery.lottery.Query",
      "LotteryAll",
      data
    );
    return promise.then((data) =>
      QueryAllLotteryResponse.decode(new Reader(data))
    );
  }

  BetData(request: QueryGetBetDataRequest): Promise<QueryGetBetDataResponse> {
    const data = QueryGetBetDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tokenism30924.lottery.lottery.Query",
      "BetData",
      data
    );
    return promise.then((data) =>
      QueryGetBetDataResponse.decode(new Reader(data))
    );
  }

  BetDataAll(
    request: QueryAllBetDataRequest
  ): Promise<QueryAllBetDataResponse> {
    const data = QueryAllBetDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "tokenism30924.lottery.lottery.Query",
      "BetDataAll",
      data
    );
    return promise.then((data) =>
      QueryAllBetDataResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
