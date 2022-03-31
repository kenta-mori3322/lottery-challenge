// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: lottery/bet.proto

package types

import (
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	types "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
	_ "github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2/options"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type Bet struct {
	Index     string                                   `protobuf:"bytes,1,opt,name=index,proto3" json:"index,omitempty"`
	LotteryId uint64                                   `protobuf:"varint,2,opt,name=lotteryId,proto3" json:"lotteryId,omitempty"`
	Name      string                                   `protobuf:"bytes,3,opt,name=name,proto3" json:"name,omitempty"`
	Player    []byte                                   `protobuf:"bytes,4,opt,name=player,proto3" json:"player,omitempty"`
	Amount    github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,5,rep,name=amount,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"amount"`
}

func (m *Bet) Reset()         { *m = Bet{} }
func (m *Bet) String() string { return proto.CompactTextString(m) }
func (*Bet) ProtoMessage()    {}
func (*Bet) Descriptor() ([]byte, []int) {
	return fileDescriptor_f6913eb749032e22, []int{0}
}
func (m *Bet) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Bet) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Bet.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Bet) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Bet.Merge(m, src)
}
func (m *Bet) XXX_Size() int {
	return m.Size()
}
func (m *Bet) XXX_DiscardUnknown() {
	xxx_messageInfo_Bet.DiscardUnknown(m)
}

var xxx_messageInfo_Bet proto.InternalMessageInfo

func (m *Bet) GetIndex() string {
	if m != nil {
		return m.Index
	}
	return ""
}

func (m *Bet) GetLotteryId() uint64 {
	if m != nil {
		return m.LotteryId
	}
	return 0
}

func (m *Bet) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Bet) GetPlayer() []byte {
	if m != nil {
		return m.Player
	}
	return nil
}

func (m *Bet) GetAmount() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.Amount
	}
	return nil
}

func init() {
	proto.RegisterType((*Bet)(nil), "tokenism30924.lottery.lottery.Bet")
}

func init() { proto.RegisterFile("lottery/bet.proto", fileDescriptor_f6913eb749032e22) }

var fileDescriptor_f6913eb749032e22 = []byte{
	// 367 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x54, 0x51, 0x3d, 0x4f, 0xf3, 0x30,
	0x10, 0x8e, 0xfb, 0x25, 0x35, 0xef, 0xbb, 0x10, 0x55, 0x10, 0x2a, 0x48, 0xa3, 0x4c, 0x91, 0xa0,
	0x49, 0x3f, 0x58, 0xca, 0x46, 0x99, 0xe8, 0x98, 0x11, 0x84, 0x90, 0x93, 0x58, 0x21, 0x6a, 0xe3,
	0x8b, 0x6a, 0xb7, 0x6a, 0x85, 0x98, 0x59, 0x11, 0x7f, 0x00, 0x89, 0x91, 0x5f, 0xd2, 0xb1, 0x23,
	0x13, 0xa0, 0xf6, 0x8f, 0xa0, 0xda, 0x2e, 0x1f, 0x5e, 0xee, 0xb9, 0xbb, 0xe7, 0x79, 0x7c, 0xf6,
	0xe9, 0x3b, 0x23, 0xe0, 0x9c, 0x8c, 0xe7, 0x7e, 0x48, 0xb8, 0x97, 0x8f, 0x81, 0x83, 0x71, 0xc8,
	0x61, 0x48, 0x68, 0xca, 0xb2, 0x6e, 0xab, 0xd7, 0x39, 0xf1, 0x14, 0x61, 0x1b, 0xeb, 0xb5, 0x04,
	0x12, 0x10, 0x4c, 0x7f, 0x83, 0xa4, 0xa8, 0xbe, 0x17, 0x01, 0xcb, 0x80, 0xdd, 0xc8, 0x46, 0x04,
	0x29, 0x55, 0x0d, 0x19, 0xa2, 0x66, 0x42, 0x68, 0x13, 0x72, 0x42, 0x71, 0x9e, 0x4e, 0x3b, 0x3e,
	0xe4, 0x3c, 0x05, 0xca, 0x7c, 0x4c, 0x29, 0x70, 0x2c, 0xb0, 0x24, 0x3a, 0x0f, 0x05, 0xbd, 0xd8,
	0x27, 0xdc, 0xa8, 0xe9, 0xe5, 0x94, 0xc6, 0x64, 0x66, 0x22, 0x1b, 0xb9, 0xd5, 0x40, 0x26, 0xc6,
	0x81, 0x5e, 0x55, 0x73, 0x5c, 0xc4, 0x66, 0xc1, 0x46, 0x6e, 0x29, 0xf8, 0x29, 0x18, 0x86, 0x5e,
	0xa2, 0x38, 0x23, 0x66, 0x51, 0x48, 0x04, 0x36, 0x76, 0xf5, 0x4a, 0x3e, 0xc2, 0x73, 0x32, 0x36,
	0x4b, 0x36, 0x72, 0xff, 0x07, 0x2a, 0x33, 0x9e, 0x91, 0x5e, 0xc1, 0x19, 0x4c, 0x28, 0x37, 0xcb,
	0x76, 0xd1, 0xfd, 0xd7, 0xd9, 0xf7, 0xe4, 0x13, 0xbc, 0x10, 0x33, 0xe2, 0x4d, 0xdb, 0x21, 0xe1,
	0xb8, 0xed, 0x9d, 0x43, 0x4a, 0xfb, 0xa3, 0xa7, 0xb3, 0xde, 0xe0, 0xe8, 0xea, 0xce, 0x89, 0x09,
	0x85, 0xcc, 0x39, 0xb5, 0x9d, 0x09, 0xe6, 0x90, 0x39, 0xc7, 0xb6, 0x23, 0x2d, 0x36, 0xa5, 0x76,
	0x4b, 0x1d, 0xe7, 0xfe, 0xfa, 0xa5, 0x50, 0x65, 0xf1, 0x50, 0x88, 0xd9, 0xe2, 0xbd, 0xa1, 0xbd,
	0x7e, 0x34, 0xdc, 0x24, 0xe5, 0xb7, 0x93, 0xd0, 0x8b, 0x20, 0xf3, 0xe5, 0x45, 0x2a, 0x34, 0x59,
	0x3c, 0xf4, 0xf9, 0x3c, 0x27, 0x4c, 0xf2, 0x03, 0x35, 0x56, 0x7f, 0xb0, 0x58, 0x59, 0x68, 0xb9,
	0xb2, 0xd0, 0xe7, 0xca, 0x42, 0x8f, 0x6b, 0x4b, 0x5b, 0xae, 0x2d, 0xed, 0x6d, 0x6d, 0x69, 0x97,
	0xad, 0x5f, 0x5e, 0x7f, 0x96, 0xe5, 0x6f, 0xb7, 0x39, 0xfb, 0x46, 0xc2, 0x39, 0xac, 0x88, 0xcf,
	0xed, 0x7e, 0x05, 0x00, 0x00, 0xff, 0xff, 0x23, 0x2e, 0xfd, 0x86, 0xef, 0x01, 0x00, 0x00,
}

func (m *Bet) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Bet) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Bet) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Amount) > 0 {
		for iNdEx := len(m.Amount) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Amount[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintBet(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x2a
		}
	}
	if len(m.Player) > 0 {
		i -= len(m.Player)
		copy(dAtA[i:], m.Player)
		i = encodeVarintBet(dAtA, i, uint64(len(m.Player)))
		i--
		dAtA[i] = 0x22
	}
	if len(m.Name) > 0 {
		i -= len(m.Name)
		copy(dAtA[i:], m.Name)
		i = encodeVarintBet(dAtA, i, uint64(len(m.Name)))
		i--
		dAtA[i] = 0x1a
	}
	if m.LotteryId != 0 {
		i = encodeVarintBet(dAtA, i, uint64(m.LotteryId))
		i--
		dAtA[i] = 0x10
	}
	if len(m.Index) > 0 {
		i -= len(m.Index)
		copy(dAtA[i:], m.Index)
		i = encodeVarintBet(dAtA, i, uint64(len(m.Index)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintBet(dAtA []byte, offset int, v uint64) int {
	offset -= sovBet(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Bet) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Index)
	if l > 0 {
		n += 1 + l + sovBet(uint64(l))
	}
	if m.LotteryId != 0 {
		n += 1 + sovBet(uint64(m.LotteryId))
	}
	l = len(m.Name)
	if l > 0 {
		n += 1 + l + sovBet(uint64(l))
	}
	l = len(m.Player)
	if l > 0 {
		n += 1 + l + sovBet(uint64(l))
	}
	if len(m.Amount) > 0 {
		for _, e := range m.Amount {
			l = e.Size()
			n += 1 + l + sovBet(uint64(l))
		}
	}
	return n
}

func sovBet(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozBet(x uint64) (n int) {
	return sovBet(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Bet) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowBet
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: Bet: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Bet: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Index", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBet
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthBet
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthBet
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Index = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field LotteryId", wireType)
			}
			m.LotteryId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBet
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.LotteryId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Name", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBet
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthBet
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthBet
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Name = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Player", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBet
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthBet
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthBet
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Player = append(m.Player[:0], dAtA[iNdEx:postIndex]...)
			if m.Player == nil {
				m.Player = []byte{}
			}
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Amount", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBet
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthBet
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthBet
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Amount = append(m.Amount, types.Coin{})
			if err := m.Amount[len(m.Amount)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipBet(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthBet
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipBet(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowBet
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowBet
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowBet
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthBet
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupBet
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthBet
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthBet        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowBet          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupBet = fmt.Errorf("proto: unexpected end of group")
)
