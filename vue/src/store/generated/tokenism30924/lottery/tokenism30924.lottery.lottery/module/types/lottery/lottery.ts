/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "tokenism30924.lottery.lottery";

export interface Lottery {
  index: string;
  maxNumber: string;
  winningNumber: string;
  status: string;
  price: string;
  accumulatedAmount: string;
}

const baseLottery: object = {
  index: "",
  maxNumber: "",
  winningNumber: "",
  status: "",
  price: "",
  accumulatedAmount: "",
};

export const Lottery = {
  encode(message: Lottery, writer: Writer = Writer.create()): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.maxNumber !== "") {
      writer.uint32(18).string(message.maxNumber);
    }
    if (message.winningNumber !== "") {
      writer.uint32(26).string(message.winningNumber);
    }
    if (message.status !== "") {
      writer.uint32(34).string(message.status);
    }
    if (message.price !== "") {
      writer.uint32(42).string(message.price);
    }
    if (message.accumulatedAmount !== "") {
      writer.uint32(50).string(message.accumulatedAmount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Lottery {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLottery } as Lottery;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.maxNumber = reader.string();
          break;
        case 3:
          message.winningNumber = reader.string();
          break;
        case 4:
          message.status = reader.string();
          break;
        case 5:
          message.price = reader.string();
          break;
        case 6:
          message.accumulatedAmount = reader.string();
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
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    if (object.maxNumber !== undefined && object.maxNumber !== null) {
      message.maxNumber = String(object.maxNumber);
    } else {
      message.maxNumber = "";
    }
    if (object.winningNumber !== undefined && object.winningNumber !== null) {
      message.winningNumber = String(object.winningNumber);
    } else {
      message.winningNumber = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = String(object.status);
    } else {
      message.status = "";
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = String(object.price);
    } else {
      message.price = "";
    }
    if (
      object.accumulatedAmount !== undefined &&
      object.accumulatedAmount !== null
    ) {
      message.accumulatedAmount = String(object.accumulatedAmount);
    } else {
      message.accumulatedAmount = "";
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
    message.price !== undefined && (obj.price = message.price);
    message.accumulatedAmount !== undefined &&
      (obj.accumulatedAmount = message.accumulatedAmount);
    return obj;
  },

  fromPartial(object: DeepPartial<Lottery>): Lottery {
    const message = { ...baseLottery } as Lottery;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    if (object.maxNumber !== undefined && object.maxNumber !== null) {
      message.maxNumber = object.maxNumber;
    } else {
      message.maxNumber = "";
    }
    if (object.winningNumber !== undefined && object.winningNumber !== null) {
      message.winningNumber = object.winningNumber;
    } else {
      message.winningNumber = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = "";
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    } else {
      message.price = "";
    }
    if (
      object.accumulatedAmount !== undefined &&
      object.accumulatedAmount !== null
    ) {
      message.accumulatedAmount = object.accumulatedAmount;
    } else {
      message.accumulatedAmount = "";
    }
    return message;
  },
};

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
