/* eslint-disable */
import { Params } from "../lottery/params";
import { Lottery } from "../lottery/lottery";
import { Bet } from "../lottery/bet";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "tokenism30924.lottery.lottery";

/** GenesisState defines the lottery module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  lotteryList: Lottery[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  betList: Bet[];
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.lotteryList) {
      Lottery.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.betList) {
      Bet.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.lotteryList = [];
    message.betList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.lotteryList.push(Lottery.decode(reader, reader.uint32()));
          break;
        case 3:
          message.betList.push(Bet.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.lotteryList = [];
    message.betList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.lotteryList !== undefined && object.lotteryList !== null) {
      for (const e of object.lotteryList) {
        message.lotteryList.push(Lottery.fromJSON(e));
      }
    }
    if (object.betList !== undefined && object.betList !== null) {
      for (const e of object.betList) {
        message.betList.push(Bet.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.lotteryList) {
      obj.lotteryList = message.lotteryList.map((e) =>
        e ? Lottery.toJSON(e) : undefined
      );
    } else {
      obj.lotteryList = [];
    }
    if (message.betList) {
      obj.betList = message.betList.map((e) => (e ? Bet.toJSON(e) : undefined));
    } else {
      obj.betList = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.lotteryList = [];
    message.betList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.lotteryList !== undefined && object.lotteryList !== null) {
      for (const e of object.lotteryList) {
        message.lotteryList.push(Lottery.fromPartial(e));
      }
    }
    if (object.betList !== undefined && object.betList !== null) {
      for (const e of object.betList) {
        message.betList.push(Bet.fromPartial(e));
      }
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
