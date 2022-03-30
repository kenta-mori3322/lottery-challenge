/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Coin } from "../cosmos_proto/coin";

export const protobufPackage = "tokenism30924.lottery.lottery";

export interface Lottery {
  index: string;
  maxNumber: number;
  winningNumber: number;
  status: number;
  price: Coin[];
  accumulatedAmount: Coin[];
}

const baseLottery: object = {
  index: "",
  maxNumber: 0,
  winningNumber: 0,
  status: 0,
};

export const Lottery = {
  encode(message: Lottery, writer: Writer = Writer.create()): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.maxNumber !== 0) {
      writer.uint32(16).uint64(message.maxNumber);
    }
    if (message.winningNumber !== 0) {
      writer.uint32(24).uint64(message.winningNumber);
    }
    if (message.status !== 0) {
      writer.uint32(32).uint64(message.status);
    }
    for (const v of message.price) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.accumulatedAmount) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Lottery {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLottery } as Lottery;
    message.price = [];
    message.accumulatedAmount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.maxNumber = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.winningNumber = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.status = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.price.push(Coin.decode(reader, reader.uint32()));
          break;
        case 6:
          message.accumulatedAmount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Lottery {
    const message = { ...baseLottery } as Lottery;
    message.price = [];
    message.accumulatedAmount = [];
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    if (object.maxNumber !== undefined && object.maxNumber !== null) {
      message.maxNumber = Number(object.maxNumber);
    } else {
      message.maxNumber = 0;
    }
    if (object.winningNumber !== undefined && object.winningNumber !== null) {
      message.winningNumber = Number(object.winningNumber);
    } else {
      message.winningNumber = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = Number(object.status);
    } else {
      message.status = 0;
    }
    if (object.price !== undefined && object.price !== null) {
      for (const e of object.price) {
        message.price.push(Coin.fromJSON(e));
      }
    }
    if (
      object.accumulatedAmount !== undefined &&
      object.accumulatedAmount !== null
    ) {
      for (const e of object.accumulatedAmount) {
        message.accumulatedAmount.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Lottery): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.maxNumber !== undefined && (obj.maxNumber = message.maxNumber);
    message.winningNumber !== undefined &&
      (obj.winningNumber = message.winningNumber);
    message.status !== undefined && (obj.status = message.status);
    if (message.price) {
      obj.price = message.price.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.price = [];
    }
    if (message.accumulatedAmount) {
      obj.accumulatedAmount = message.accumulatedAmount.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.accumulatedAmount = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Lottery>): Lottery {
    const message = { ...baseLottery } as Lottery;
    message.price = [];
    message.accumulatedAmount = [];
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    if (object.maxNumber !== undefined && object.maxNumber !== null) {
      message.maxNumber = object.maxNumber;
    } else {
      message.maxNumber = 0;
    }
    if (object.winningNumber !== undefined && object.winningNumber !== null) {
      message.winningNumber = object.winningNumber;
    } else {
      message.winningNumber = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.price !== undefined && object.price !== null) {
      for (const e of object.price) {
        message.price.push(Coin.fromPartial(e));
      }
    }
    if (
      object.accumulatedAmount !== undefined &&
      object.accumulatedAmount !== null
    ) {
      for (const e of object.accumulatedAmount) {
        message.accumulatedAmount.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
