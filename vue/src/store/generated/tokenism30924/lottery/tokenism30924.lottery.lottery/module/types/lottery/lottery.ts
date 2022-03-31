/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Coin } from "../cosmos_proto/coin";

export const protobufPackage = "tokenism30924.lottery.lottery";

export interface Lottery {
  index: string;
  winningNumber: number;
  winnerName: string;
  winnerAddress: Uint8Array;
  /** 0: closed, 1: opened */
  status: number;
  proposer: Uint8Array;
  price: Coin[];
  accumulatedAmount: Coin[];
  /** number of bets participated */
  betCount: number;
}

const baseLottery: object = {
  index: "",
  winningNumber: 0,
  winnerName: "",
  status: 0,
  betCount: 0,
};

export const Lottery = {
  encode(message: Lottery, writer: Writer = Writer.create()): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.winningNumber !== 0) {
      writer.uint32(16).uint64(message.winningNumber);
    }
    if (message.winnerName !== "") {
      writer.uint32(26).string(message.winnerName);
    }
    if (message.winnerAddress.length !== 0) {
      writer.uint32(34).bytes(message.winnerAddress);
    }
    if (message.status !== 0) {
      writer.uint32(40).uint64(message.status);
    }
    if (message.proposer.length !== 0) {
      writer.uint32(50).bytes(message.proposer);
    }
    for (const v of message.price) {
      Coin.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.accumulatedAmount) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.betCount !== 0) {
      writer.uint32(72).uint64(message.betCount);
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
          message.winningNumber = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.winnerName = reader.string();
          break;
        case 4:
          message.winnerAddress = reader.bytes();
          break;
        case 5:
          message.status = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.proposer = reader.bytes();
          break;
        case 7:
          message.price.push(Coin.decode(reader, reader.uint32()));
          break;
        case 8:
          message.accumulatedAmount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 9:
          message.betCount = longToNumber(reader.uint64() as Long);
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
    if (object.winningNumber !== undefined && object.winningNumber !== null) {
      message.winningNumber = Number(object.winningNumber);
    } else {
      message.winningNumber = 0;
    }
    if (object.winnerName !== undefined && object.winnerName !== null) {
      message.winnerName = String(object.winnerName);
    } else {
      message.winnerName = "";
    }
    if (object.winnerAddress !== undefined && object.winnerAddress !== null) {
      message.winnerAddress = bytesFromBase64(object.winnerAddress);
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = Number(object.status);
    } else {
      message.status = 0;
    }
    if (object.proposer !== undefined && object.proposer !== null) {
      message.proposer = bytesFromBase64(object.proposer);
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
    if (object.betCount !== undefined && object.betCount !== null) {
      message.betCount = Number(object.betCount);
    } else {
      message.betCount = 0;
    }
    return message;
  },

  toJSON(message: Lottery): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.winningNumber !== undefined &&
      (obj.winningNumber = message.winningNumber);
    message.winnerName !== undefined && (obj.winnerName = message.winnerName);
    message.winnerAddress !== undefined &&
      (obj.winnerAddress = base64FromBytes(
        message.winnerAddress !== undefined
          ? message.winnerAddress
          : new Uint8Array()
      ));
    message.status !== undefined && (obj.status = message.status);
    message.proposer !== undefined &&
      (obj.proposer = base64FromBytes(
        message.proposer !== undefined ? message.proposer : new Uint8Array()
      ));
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
    message.betCount !== undefined && (obj.betCount = message.betCount);
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
    if (object.winningNumber !== undefined && object.winningNumber !== null) {
      message.winningNumber = object.winningNumber;
    } else {
      message.winningNumber = 0;
    }
    if (object.winnerName !== undefined && object.winnerName !== null) {
      message.winnerName = object.winnerName;
    } else {
      message.winnerName = "";
    }
    if (object.winnerAddress !== undefined && object.winnerAddress !== null) {
      message.winnerAddress = object.winnerAddress;
    } else {
      message.winnerAddress = new Uint8Array();
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.proposer !== undefined && object.proposer !== null) {
      message.proposer = object.proposer;
    } else {
      message.proposer = new Uint8Array();
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
    if (object.betCount !== undefined && object.betCount !== null) {
      message.betCount = object.betCount;
    } else {
      message.betCount = 0;
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

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
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
