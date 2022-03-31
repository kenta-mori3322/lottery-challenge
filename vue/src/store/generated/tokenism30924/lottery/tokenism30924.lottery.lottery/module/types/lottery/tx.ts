/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "tokenism30924.lottery.lottery";

export interface MsgEnterLottery {
  creator: string;
  betAmount: string;
}

export interface MsgEnterLotteryResponse {
  code: string;
  msg: string;
}

const baseMsgEnterLottery: object = { creator: "", betAmount: "" };

export const MsgEnterLottery = {
  encode(message: MsgEnterLottery, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.betAmount !== "") {
      writer.uint32(18).string(message.betAmount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEnterLottery {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEnterLottery } as MsgEnterLottery;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.betAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEnterLottery {
    const message = { ...baseMsgEnterLottery } as MsgEnterLottery;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.betAmount !== undefined && object.betAmount !== null) {
      message.betAmount = String(object.betAmount);
    } else {
      message.betAmount = "";
    }
    return message;
  },

  toJSON(message: MsgEnterLottery): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.betAmount !== undefined && (obj.betAmount = message.betAmount);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgEnterLottery>): MsgEnterLottery {
    const message = { ...baseMsgEnterLottery } as MsgEnterLottery;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.betAmount !== undefined && object.betAmount !== null) {
      message.betAmount = object.betAmount;
    } else {
      message.betAmount = "";
    }
    return message;
  },
};

const baseMsgEnterLotteryResponse: object = { code: "", msg: "" };

export const MsgEnterLotteryResponse = {
  encode(
    message: MsgEnterLotteryResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.msg !== "") {
      writer.uint32(18).string(message.msg);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgEnterLotteryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgEnterLotteryResponse,
    } as MsgEnterLotteryResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.string();
          break;
        case 2:
          message.msg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEnterLotteryResponse {
    const message = {
      ...baseMsgEnterLotteryResponse,
    } as MsgEnterLotteryResponse;
    if (object.code !== undefined && object.code !== null) {
      message.code = String(object.code);
    } else {
      message.code = "";
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = String(object.msg);
    } else {
      message.msg = "";
    }
    return message;
  },

  toJSON(message: MsgEnterLotteryResponse): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = message.code);
    message.msg !== undefined && (obj.msg = message.msg);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgEnterLotteryResponse>
  ): MsgEnterLotteryResponse {
    const message = {
      ...baseMsgEnterLotteryResponse,
    } as MsgEnterLotteryResponse;
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = "";
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = object.msg;
    } else {
      message.msg = "";
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  EnterLottery(request: MsgEnterLottery): Promise<MsgEnterLotteryResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  EnterLottery(request: MsgEnterLottery): Promise<MsgEnterLotteryResponse> {
    const data = MsgEnterLottery.encode(request).finish();
    const promise = this.rpc.request(
      "tokenism30924.lottery.lottery.Msg",
      "EnterLottery",
      data
    );
    return promise.then((data) =>
      MsgEnterLotteryResponse.decode(new Reader(data))
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
