/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Value } from "../../google/protobuf/struct";

export const protobufPackage = "grpc.gateway.protoc_gen_openapiv2.options";

/**
 * Scheme describes the schemes supported by the OpenAPI Swagger
 * and Operation objects.
 */
export enum Scheme {
  UNKNOWN = 0,
  HTTP = 1,
  HTTPS = 2,
  WS = 3,
  WSS = 4,
  UNRECOGNIZED = -1,
}

export function schemeFromJSON(object: any): Scheme {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return Scheme.UNKNOWN;
    case 1:
    case "HTTP":
      return Scheme.HTTP;
    case 2:
    case "HTTPS":
      return Scheme.HTTPS;
    case 3:
    case "WS":
      return Scheme.WS;
    case 4:
    case "WSS":
      return Scheme.WSS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Scheme.UNRECOGNIZED;
  }
}

export function schemeToJSON(object: Scheme): string {
  switch (object) {
    case Scheme.UNKNOWN:
      return "UNKNOWN";
    case Scheme.HTTP:
      return "HTTP";
    case Scheme.HTTPS:
      return "HTTPS";
    case Scheme.WS:
      return "WS";
    case Scheme.WSS:
      return "WSS";
    default:
      return "UNKNOWN";
  }
}

/**
 * `Swagger` is a representation of OpenAPI v2 specification's Swagger object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#swaggerObject
 *
 * Example:
 *
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      title: "Echo API";
 *      version: "1.0";
 *      description: ";
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *    };
 *    schemes: HTTPS;
 *    consumes: "application/json";
 *    produces: "application/json";
 *  };
 */
export interface Swagger {
  /**
   * Specifies the OpenAPI Specification version being used. It can be
   * used by the OpenAPI UI and other clients to interpret the API listing. The
   * value MUST be "2.0".
   */
  swagger: string;
  /**
   * Provides metadata about the API. The metadata can be used by the
   * clients if needed.
   */
  info: Info | undefined;
  /**
   * The host (name or ip) serving the API. This MUST be the host only and does
   * not include the scheme nor sub-paths. It MAY include a port. If the host is
   * not included, the host serving the documentation is to be used (including
   * the port). The host does not support path templating.
   */
  host: string;
  /**
   * The base path on which the API is served, which is relative to the host. If
   * it is not included, the API is served directly under the host. The value
   * MUST start with a leading slash (/). The basePath does not support path
   * templating.
   * Note that using `base_path` does not change the endpoint paths that are
   * generated in the resulting OpenAPI file. If you wish to use `base_path`
   * with relatively generated OpenAPI paths, the `base_path` prefix must be
   * manually removed from your `google.api.http` paths and your code changed to
   * serve the API from the `base_path`.
   */
  base_path: string;
  /**
   * The transfer protocol of the API. Values MUST be from the list: "http",
   * "https", "ws", "wss". If the schemes is not included, the default scheme to
   * be used is the one used to access the OpenAPI definition itself.
   */
  schemes: Scheme[];
  /**
   * A list of MIME types the APIs can consume. This is global to all APIs but
   * can be overridden on specific API calls. Value MUST be as described under
   * Mime Types.
   */
  consumes: string[];
  /**
   * A list of MIME types the APIs can produce. This is global to all APIs but
   * can be overridden on specific API calls. Value MUST be as described under
   * Mime Types.
   */
  produces: string[];
  /**
   * An object to hold responses that can be used across operations. This
   * property does not define global responses for all operations.
   */
  responses: { [key: string]: Response };
  /** Security scheme definitions that can be used across the specification. */
  security_definitions: SecurityDefinitions | undefined;
  /**
   * A declaration of which security schemes are applied for the API as a whole.
   * The list of values describes alternative security schemes that can be used
   * (that is, there is a logical OR between the security requirements).
   * Individual operations can override this definition.
   */
  security: SecurityRequirement[];
  /** Additional external documentation. */
  external_docs: ExternalDocumentation | undefined;
  extensions: { [key: string]: Value };
}

export interface Swagger_ResponsesEntry {
  key: string;
  value: Response | undefined;
}

export interface Swagger_ExtensionsEntry {
  key: string;
  value: Value | undefined;
}

/**
 * `Operation` is a representation of OpenAPI v2 specification's Operation object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#operationObject
 *
 * Example:
 *
 *  service EchoService {
 *    rpc Echo(SimpleMessage) returns (SimpleMessage) {
 *      option (google.api.http) = {
 *        get: "/v1/example/echo/{id}"
 *      };
 *
 *      option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {
 *        summary: "Get a message.";
 *        operation_id: "getMessage";
 *        tags: "echo";
 *        responses: {
 *          key: "200"
 *            value: {
 *            description: "OK";
 *          }
 *        }
 *      };
 *    }
 *  }
 */
export interface Operation {
  /**
   * A list of tags for API documentation control. Tags can be used for logical
   * grouping of operations by resources or any other qualifier.
   */
  tags: string[];
  /**
   * A short summary of what the operation does. For maximum readability in the
   * swagger-ui, this field SHOULD be less than 120 characters.
   */
  summary: string;
  /**
   * A verbose explanation of the operation behavior. GFM syntax can be used for
   * rich text representation.
   */
  description: string;
  /** Additional external documentation for this operation. */
  external_docs: ExternalDocumentation | undefined;
  /**
   * Unique string used to identify the operation. The id MUST be unique among
   * all operations described in the API. Tools and libraries MAY use the
   * operationId to uniquely identify an operation, therefore, it is recommended
   * to follow common programming naming conventions.
   */
  operation_id: string;
  /**
   * A list of MIME types the operation can consume. This overrides the consumes
   * definition at the OpenAPI Object. An empty value MAY be used to clear the
   * global definition. Value MUST be as described under Mime Types.
   */
  consumes: string[];
  /**
   * A list of MIME types the operation can produce. This overrides the produces
   * definition at the OpenAPI Object. An empty value MAY be used to clear the
   * global definition. Value MUST be as described under Mime Types.
   */
  produces: string[];
  /**
   * The list of possible responses as they are returned from executing this
   * operation.
   */
  responses: { [key: string]: Response };
  /**
   * The transfer protocol for the operation. Values MUST be from the list:
   * "http", "https", "ws", "wss". The value overrides the OpenAPI Object
   * schemes definition.
   */
  schemes: Scheme[];
  /**
   * Declares this operation to be deprecated. Usage of the declared operation
   * should be refrained. Default value is false.
   */
  deprecated: boolean;
  /**
   * A declaration of which security schemes are applied for this operation. The
   * list of values describes alternative security schemes that can be used
   * (that is, there is a logical OR between the security requirements). This
   * definition overrides any declared top-level security. To remove a top-level
   * security declaration, an empty array can be used.
   */
  security: SecurityRequirement[];
  extensions: { [key: string]: Value };
}

export interface Operation_ResponsesEntry {
  key: string;
  value: Response | undefined;
}

export interface Operation_ExtensionsEntry {
  key: string;
  value: Value | undefined;
}

/**
 * `Header` is a representation of OpenAPI v2 specification's Header object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#headerObject
 */
export interface Header {
  /** `Description` is a short description of the header. */
  description: string;
  /** The type of the object. The value MUST be one of "string", "number", "integer", or "boolean". The "array" type is not supported. */
  type: string;
  /** `Format` The extending format for the previously mentioned type. */
  format: string;
  /**
   * `Default` Declares the value of the header that the server will use if none is provided.
   * See: https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2.
   * Unlike JSON Schema this value MUST conform to the defined type for the header.
   */
  default: string;
  /** 'Pattern' See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3. */
  pattern: string;
}

/**
 * `Response` is a representation of OpenAPI v2 specification's Response object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#responseObject
 */
export interface Response {
  /**
   * `Description` is a short description of the response.
   * GFM syntax can be used for rich text representation.
   */
  description: string;
  /**
   * `Schema` optionally defines the structure of the response.
   * If `Schema` is not provided, it means there is no content to the response.
   */
  schema: Schema | undefined;
  /**
   * `Headers` A list of headers that are sent with the response.
   * `Header` name is expected to be a string in the canonical format of the MIME header key
   * See: https://golang.org/pkg/net/textproto/#CanonicalMIMEHeaderKey
   */
  headers: { [key: string]: Header };
  /**
   * `Examples` gives per-mimetype response examples.
   * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#example-object
   */
  examples: { [key: string]: string };
  extensions: { [key: string]: Value };
}

export interface Response_HeadersEntry {
  key: string;
  value: Header | undefined;
}

export interface Response_ExamplesEntry {
  key: string;
  value: string;
}

export interface Response_ExtensionsEntry {
  key: string;
  value: Value | undefined;
}

/**
 * `Info` is a representation of OpenAPI v2 specification's Info object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#infoObject
 *
 * Example:
 *
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      title: "Echo API";
 *      version: "1.0";
 *      description: ";
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *    };
 *    ...
 *  };
 */
export interface Info {
  /** The title of the application. */
  title: string;
  /**
   * A short description of the application. GFM syntax can be used for rich
   * text representation.
   */
  description: string;
  /** The Terms of Service for the API. */
  terms_of_service: string;
  /** The contact information for the exposed API. */
  contact: Contact | undefined;
  /** The license information for the exposed API. */
  license: License | undefined;
  /**
   * Provides the version of the application API (not to be confused
   * with the specification version).
   */
  version: string;
  extensions: { [key: string]: Value };
}

export interface Info_ExtensionsEntry {
  key: string;
  value: Value | undefined;
}

/**
 * `Contact` is a representation of OpenAPI v2 specification's Contact object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#contactObject
 *
 * Example:
 *
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      ...
 *      contact: {
 *        name: "gRPC-Gateway project";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *        email: "none@example.com";
 *      };
 *      ...
 *    };
 *    ...
 *  };
 */
export interface Contact {
  /** The identifying name of the contact person/organization. */
  name: string;
  /**
   * The URL pointing to the contact information. MUST be in the format of a
   * URL.
   */
  url: string;
  /**
   * The email address of the contact person/organization. MUST be in the format
   * of an email address.
   */
  email: string;
}

/**
 * `License` is a representation of OpenAPI v2 specification's License object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#licenseObject
 *
 * Example:
 *
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    info: {
 *      ...
 *      license: {
 *        name: "BSD 3-Clause License";
 *        url: "https://github.com/grpc-ecosystem/grpc-gateway/blob/master/LICENSE.txt";
 *      };
 *      ...
 *    };
 *    ...
 *  };
 */
export interface License {
  /** The license name used for the API. */
  name: string;
  /** A URL to the license used for the API. MUST be in the format of a URL. */
  url: string;
}

/**
 * `ExternalDocumentation` is a representation of OpenAPI v2 specification's
 * ExternalDocumentation object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#externalDocumentationObject
 *
 * Example:
 *
 *  option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
 *    ...
 *    external_docs: {
 *      description: "More about gRPC-Gateway";
 *      url: "https://github.com/grpc-ecosystem/grpc-gateway";
 *    }
 *    ...
 *  };
 */
export interface ExternalDocumentation {
  /**
   * A short description of the target documentation. GFM syntax can be used for
   * rich text representation.
   */
  description: string;
  /**
   * The URL for the target documentation. Value MUST be in the format
   * of a URL.
   */
  url: string;
}

/**
 * `Schema` is a representation of OpenAPI v2 specification's Schema object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 */
export interface Schema {
  json_schema: JSONSchema | undefined;
  /**
   * Adds support for polymorphism. The discriminator is the schema property
   * name that is used to differentiate between other schema that inherit this
   * schema. The property name used MUST be defined at this schema and it MUST
   * be in the required property list. When used, the value MUST be the name of
   * this schema or any schema that inherits it.
   */
  discriminator: string;
  /**
   * Relevant only for Schema "properties" definitions. Declares the property as
   * "read only". This means that it MAY be sent as part of a response but MUST
   * NOT be sent as part of the request. Properties marked as readOnly being
   * true SHOULD NOT be in the required list of the defined schema. Default
   * value is false.
   */
  read_only: boolean;
  /** Additional external documentation for this schema. */
  external_docs: ExternalDocumentation | undefined;
  /**
   * A free-form property to include an example of an instance for this schema in JSON.
   * This is copied verbatim to the output.
   */
  example: string;
}

/**
 * `JSONSchema` represents properties from JSON Schema taken, and as used, in
 * the OpenAPI v2 spec.
 *
 * This includes changes made by OpenAPI v2.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
 *
 * See also: https://cswr.github.io/JsonSchema/spec/basic_types/,
 * https://github.com/json-schema-org/json-schema-spec/blob/master/schema.json
 *
 * Example:
 *
 *  message SimpleMessage {
 *    option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_schema) = {
 *      json_schema: {
 *        title: "SimpleMessage"
 *        description: "A simple message."
 *        required: ["id"]
 *      }
 *    };
 *
 *    // Id represents the message identifier.
 *    string id = 1; [
 *        (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_field) = {
 *          {description: "The unique identifier of the simple message."
 *        }];
 *  }
 */
export interface JSONSchema {
  /**
   * Ref is used to define an external reference to include in the message.
   * This could be a fully qualified proto message reference, and that type must
   * be imported into the protofile. If no message is identified, the Ref will
   * be used verbatim in the output.
   * For example:
   *  `ref: ".google.protobuf.Timestamp"`.
   */
  ref: string;
  /** The title of the schema. */
  title: string;
  /** A short description of the schema. */
  description: string;
  default: string;
  read_only: boolean;
  /**
   * A free-form property to include a JSON example of this field. This is copied
   * verbatim to the output swagger.json. Quotes must be escaped.
   * This property is the same for 2.0 and 3.0.0 https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/3.0.0.md#schemaObject  https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#schemaObject
   */
  example: string;
  multiple_of: number;
  /**
   * Maximum represents an inclusive upper limit for a numeric instance. The
   * value of MUST be a number,
   */
  maximum: number;
  exclusive_maximum: boolean;
  /**
   * minimum represents an inclusive lower limit for a numeric instance. The
   * value of MUST be a number,
   */
  minimum: number;
  exclusive_minimum: boolean;
  max_length: number;
  min_length: number;
  pattern: string;
  max_items: number;
  min_items: number;
  unique_items: boolean;
  max_properties: number;
  min_properties: number;
  required: string[];
  /** Items in 'array' must be unique. */
  array: string[];
  type: JSONSchema_JSONSchemaSimpleTypes[];
  /** `Format` */
  format: string;
  /** Items in `enum` must be unique https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1 */
  enum: string[];
}

export enum JSONSchema_JSONSchemaSimpleTypes {
  UNKNOWN = 0,
  ARRAY = 1,
  BOOLEAN = 2,
  INTEGER = 3,
  NULL = 4,
  NUMBER = 5,
  OBJECT = 6,
  STRING = 7,
  UNRECOGNIZED = -1,
}

export function jSONSchema_JSONSchemaSimpleTypesFromJSON(
  object: any
): JSONSchema_JSONSchemaSimpleTypes {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return JSONSchema_JSONSchemaSimpleTypes.UNKNOWN;
    case 1:
    case "ARRAY":
      return JSONSchema_JSONSchemaSimpleTypes.ARRAY;
    case 2:
    case "BOOLEAN":
      return JSONSchema_JSONSchemaSimpleTypes.BOOLEAN;
    case 3:
    case "INTEGER":
      return JSONSchema_JSONSchemaSimpleTypes.INTEGER;
    case 4:
    case "NULL":
      return JSONSchema_JSONSchemaSimpleTypes.NULL;
    case 5:
    case "NUMBER":
      return JSONSchema_JSONSchemaSimpleTypes.NUMBER;
    case 6:
    case "OBJECT":
      return JSONSchema_JSONSchemaSimpleTypes.OBJECT;
    case 7:
    case "STRING":
      return JSONSchema_JSONSchemaSimpleTypes.STRING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return JSONSchema_JSONSchemaSimpleTypes.UNRECOGNIZED;
  }
}

export function jSONSchema_JSONSchemaSimpleTypesToJSON(
  object: JSONSchema_JSONSchemaSimpleTypes
): string {
  switch (object) {
    case JSONSchema_JSONSchemaSimpleTypes.UNKNOWN:
      return "UNKNOWN";
    case JSONSchema_JSONSchemaSimpleTypes.ARRAY:
      return "ARRAY";
    case JSONSchema_JSONSchemaSimpleTypes.BOOLEAN:
      return "BOOLEAN";
    case JSONSchema_JSONSchemaSimpleTypes.INTEGER:
      return "INTEGER";
    case JSONSchema_JSONSchemaSimpleTypes.NULL:
      return "NULL";
    case JSONSchema_JSONSchemaSimpleTypes.NUMBER:
      return "NUMBER";
    case JSONSchema_JSONSchemaSimpleTypes.OBJECT:
      return "OBJECT";
    case JSONSchema_JSONSchemaSimpleTypes.STRING:
      return "STRING";
    default:
      return "UNKNOWN";
  }
}

/**
 * `Tag` is a representation of OpenAPI v2 specification's Tag object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#tagObject
 */
export interface Tag {
  /**
   * A short description for the tag. GFM syntax can be used for rich text
   * representation.
   */
  description: string;
  /** Additional external documentation for this tag. */
  external_docs: ExternalDocumentation | undefined;
}

/**
 * `SecurityDefinitions` is a representation of OpenAPI v2 specification's
 * Security Definitions object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityDefinitionsObject
 *
 * A declaration of the security schemes available to be used in the
 * specification. This does not enforce the security schemes on the operations
 * and only serves to provide the relevant details for each scheme.
 */
export interface SecurityDefinitions {
  /**
   * A single security scheme definition, mapping a "name" to the scheme it
   * defines.
   */
  security: { [key: string]: SecurityScheme };
}

export interface SecurityDefinitions_SecurityEntry {
  key: string;
  value: SecurityScheme | undefined;
}

/**
 * `SecurityScheme` is a representation of OpenAPI v2 specification's
 * Security Scheme object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securitySchemeObject
 *
 * Allows the definition of a security scheme that can be used by the
 * operations. Supported schemes are basic authentication, an API key (either as
 * a header or as a query parameter) and OAuth2's common flows (implicit,
 * password, application and access code).
 */
export interface SecurityScheme {
  /**
   * The type of the security scheme. Valid values are "basic",
   * "apiKey" or "oauth2".
   */
  type: SecurityScheme_Type;
  /** A short description for security scheme. */
  description: string;
  /**
   * The name of the header or query parameter to be used.
   * Valid for apiKey.
   */
  name: string;
  /**
   * The location of the API key. Valid values are "query" or
   * "header".
   * Valid for apiKey.
   */
  in: SecurityScheme_In;
  /**
   * The flow used by the OAuth2 security scheme. Valid values are
   * "implicit", "password", "application" or "accessCode".
   * Valid for oauth2.
   */
  flow: SecurityScheme_Flow;
  /**
   * The authorization URL to be used for this flow. This SHOULD be in
   * the form of a URL.
   * Valid for oauth2/implicit and oauth2/accessCode.
   */
  authorization_url: string;
  /**
   * The token URL to be used for this flow. This SHOULD be in the
   * form of a URL.
   * Valid for oauth2/password, oauth2/application and oauth2/accessCode.
   */
  token_url: string;
  /**
   * The available scopes for the OAuth2 security scheme.
   * Valid for oauth2.
   */
  scopes: Scopes | undefined;
  extensions: { [key: string]: Value };
}

/**
 * The type of the security scheme. Valid values are "basic",
 * "apiKey" or "oauth2".
 */
export enum SecurityScheme_Type {
  TYPE_INVALID = 0,
  TYPE_BASIC = 1,
  TYPE_API_KEY = 2,
  TYPE_OAUTH2 = 3,
  UNRECOGNIZED = -1,
}

export function securityScheme_TypeFromJSON(object: any): SecurityScheme_Type {
  switch (object) {
    case 0:
    case "TYPE_INVALID":
      return SecurityScheme_Type.TYPE_INVALID;
    case 1:
    case "TYPE_BASIC":
      return SecurityScheme_Type.TYPE_BASIC;
    case 2:
    case "TYPE_API_KEY":
      return SecurityScheme_Type.TYPE_API_KEY;
    case 3:
    case "TYPE_OAUTH2":
      return SecurityScheme_Type.TYPE_OAUTH2;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecurityScheme_Type.UNRECOGNIZED;
  }
}

export function securityScheme_TypeToJSON(object: SecurityScheme_Type): string {
  switch (object) {
    case SecurityScheme_Type.TYPE_INVALID:
      return "TYPE_INVALID";
    case SecurityScheme_Type.TYPE_BASIC:
      return "TYPE_BASIC";
    case SecurityScheme_Type.TYPE_API_KEY:
      return "TYPE_API_KEY";
    case SecurityScheme_Type.TYPE_OAUTH2:
      return "TYPE_OAUTH2";
    default:
      return "UNKNOWN";
  }
}

/** The location of the API key. Valid values are "query" or "header". */
export enum SecurityScheme_In {
  IN_INVALID = 0,
  IN_QUERY = 1,
  IN_HEADER = 2,
  UNRECOGNIZED = -1,
}

export function securityScheme_InFromJSON(object: any): SecurityScheme_In {
  switch (object) {
    case 0:
    case "IN_INVALID":
      return SecurityScheme_In.IN_INVALID;
    case 1:
    case "IN_QUERY":
      return SecurityScheme_In.IN_QUERY;
    case 2:
    case "IN_HEADER":
      return SecurityScheme_In.IN_HEADER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecurityScheme_In.UNRECOGNIZED;
  }
}

export function securityScheme_InToJSON(object: SecurityScheme_In): string {
  switch (object) {
    case SecurityScheme_In.IN_INVALID:
      return "IN_INVALID";
    case SecurityScheme_In.IN_QUERY:
      return "IN_QUERY";
    case SecurityScheme_In.IN_HEADER:
      return "IN_HEADER";
    default:
      return "UNKNOWN";
  }
}

/**
 * The flow used by the OAuth2 security scheme. Valid values are
 * "implicit", "password", "application" or "accessCode".
 */
export enum SecurityScheme_Flow {
  FLOW_INVALID = 0,
  FLOW_IMPLICIT = 1,
  FLOW_PASSWORD = 2,
  FLOW_APPLICATION = 3,
  FLOW_ACCESS_CODE = 4,
  UNRECOGNIZED = -1,
}

export function securityScheme_FlowFromJSON(object: any): SecurityScheme_Flow {
  switch (object) {
    case 0:
    case "FLOW_INVALID":
      return SecurityScheme_Flow.FLOW_INVALID;
    case 1:
    case "FLOW_IMPLICIT":
      return SecurityScheme_Flow.FLOW_IMPLICIT;
    case 2:
    case "FLOW_PASSWORD":
      return SecurityScheme_Flow.FLOW_PASSWORD;
    case 3:
    case "FLOW_APPLICATION":
      return SecurityScheme_Flow.FLOW_APPLICATION;
    case 4:
    case "FLOW_ACCESS_CODE":
      return SecurityScheme_Flow.FLOW_ACCESS_CODE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SecurityScheme_Flow.UNRECOGNIZED;
  }
}

export function securityScheme_FlowToJSON(object: SecurityScheme_Flow): string {
  switch (object) {
    case SecurityScheme_Flow.FLOW_INVALID:
      return "FLOW_INVALID";
    case SecurityScheme_Flow.FLOW_IMPLICIT:
      return "FLOW_IMPLICIT";
    case SecurityScheme_Flow.FLOW_PASSWORD:
      return "FLOW_PASSWORD";
    case SecurityScheme_Flow.FLOW_APPLICATION:
      return "FLOW_APPLICATION";
    case SecurityScheme_Flow.FLOW_ACCESS_CODE:
      return "FLOW_ACCESS_CODE";
    default:
      return "UNKNOWN";
  }
}

export interface SecurityScheme_ExtensionsEntry {
  key: string;
  value: Value | undefined;
}

/**
 * `SecurityRequirement` is a representation of OpenAPI v2 specification's
 * Security Requirement object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#securityRequirementObject
 *
 * Lists the required security schemes to execute this operation. The object can
 * have multiple security schemes declared in it which are all required (that
 * is, there is a logical AND between the schemes).
 *
 * The name used for each property MUST correspond to a security scheme
 * declared in the Security Definitions.
 */
export interface SecurityRequirement {
  /**
   * Each name must correspond to a security scheme which is declared in
   * the Security Definitions. If the security scheme is of type "oauth2",
   * then the value is a list of scope names required for the execution.
   * For other security scheme types, the array MUST be empty.
   */
  security_requirement: {
    [key: string]: SecurityRequirement_SecurityRequirementValue;
  };
}

/**
 * If the security scheme is of type "oauth2", then the value is a list of
 * scope names required for the execution. For other security scheme types,
 * the array MUST be empty.
 */
export interface SecurityRequirement_SecurityRequirementValue {
  scope: string[];
}

export interface SecurityRequirement_SecurityRequirementEntry {
  key: string;
  value: SecurityRequirement_SecurityRequirementValue | undefined;
}

/**
 * `Scopes` is a representation of OpenAPI v2 specification's Scopes object.
 *
 * See: https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md#scopesObject
 *
 * Lists the available scopes for an OAuth2 security scheme.
 */
export interface Scopes {
  /**
   * Maps between a name of a scope to a short description of it (as the value
   * of the property).
   */
  scope: { [key: string]: string };
}

export interface Scopes_ScopeEntry {
  key: string;
  value: string;
}

const baseSwagger: object = {
  swagger: "",
  host: "",
  base_path: "",
  schemes: 0,
  consumes: "",
  produces: "",
};

export const Swagger = {
  encode(message: Swagger, writer: Writer = Writer.create()): Writer {
    if (message.swagger !== "") {
      writer.uint32(10).string(message.swagger);
    }
    if (message.info !== undefined) {
      Info.encode(message.info, writer.uint32(18).fork()).ldelim();
    }
    if (message.host !== "") {
      writer.uint32(26).string(message.host);
    }
    if (message.base_path !== "") {
      writer.uint32(34).string(message.base_path);
    }
    writer.uint32(42).fork();
    for (const v of message.schemes) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.consumes) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.produces) {
      writer.uint32(58).string(v!);
    }
    Object.entries(message.responses).forEach(([key, value]) => {
      Swagger_ResponsesEntry.encode(
        { key: key as any, value },
        writer.uint32(82).fork()
      ).ldelim();
    });
    if (message.security_definitions !== undefined) {
      SecurityDefinitions.encode(
        message.security_definitions,
        writer.uint32(90).fork()
      ).ldelim();
    }
    for (const v of message.security) {
      SecurityRequirement.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    if (message.external_docs !== undefined) {
      ExternalDocumentation.encode(
        message.external_docs,
        writer.uint32(114).fork()
      ).ldelim();
    }
    Object.entries(message.extensions).forEach(([key, value]) => {
      Swagger_ExtensionsEntry.encode(
        { key: key as any, value },
        writer.uint32(122).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Swagger {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSwagger } as Swagger;
    message.schemes = [];
    message.consumes = [];
    message.produces = [];
    message.responses = {};
    message.security = [];
    message.extensions = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swagger = reader.string();
          break;
        case 2:
          message.info = Info.decode(reader, reader.uint32());
          break;
        case 3:
          message.host = reader.string();
          break;
        case 4:
          message.base_path = reader.string();
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.schemes.push(reader.int32() as any);
            }
          } else {
            message.schemes.push(reader.int32() as any);
          }
          break;
        case 6:
          message.consumes.push(reader.string());
          break;
        case 7:
          message.produces.push(reader.string());
          break;
        case 10:
          const entry10 = Swagger_ResponsesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry10.value !== undefined) {
            message.responses[entry10.key] = entry10.value;
          }
          break;
        case 11:
          message.security_definitions = SecurityDefinitions.decode(
            reader,
            reader.uint32()
          );
          break;
        case 12:
          message.security.push(
            SecurityRequirement.decode(reader, reader.uint32())
          );
          break;
        case 14:
          message.external_docs = ExternalDocumentation.decode(
            reader,
            reader.uint32()
          );
          break;
        case 15:
          const entry15 = Swagger_ExtensionsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry15.value !== undefined) {
            message.extensions[entry15.key] = entry15.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Swagger {
    const message = { ...baseSwagger } as Swagger;
    message.schemes = [];
    message.consumes = [];
    message.produces = [];
    message.responses = {};
    message.security = [];
    message.extensions = {};
    if (object.swagger !== undefined && object.swagger !== null) {
      message.swagger = String(object.swagger);
    } else {
      message.swagger = "";
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = Info.fromJSON(object.info);
    } else {
      message.info = undefined;
    }
    if (object.host !== undefined && object.host !== null) {
      message.host = String(object.host);
    } else {
      message.host = "";
    }
    if (object.base_path !== undefined && object.base_path !== null) {
      message.base_path = String(object.base_path);
    } else {
      message.base_path = "";
    }
    if (object.schemes !== undefined && object.schemes !== null) {
      for (const e of object.schemes) {
        message.schemes.push(schemeFromJSON(e));
      }
    }
    if (object.consumes !== undefined && object.consumes !== null) {
      for (const e of object.consumes) {
        message.consumes.push(String(e));
      }
    }
    if (object.produces !== undefined && object.produces !== null) {
      for (const e of object.produces) {
        message.produces.push(String(e));
      }
    }
    if (object.responses !== undefined && object.responses !== null) {
      Object.entries(object.responses).forEach(([key, value]) => {
        message.responses[key] = Response.fromJSON(value);
      });
    }
    if (
      object.security_definitions !== undefined &&
      object.security_definitions !== null
    ) {
      message.security_definitions = SecurityDefinitions.fromJSON(
        object.security_definitions
      );
    } else {
      message.security_definitions = undefined;
    }
    if (object.security !== undefined && object.security !== null) {
      for (const e of object.security) {
        message.security.push(SecurityRequirement.fromJSON(e));
      }
    }
    if (object.external_docs !== undefined && object.external_docs !== null) {
      message.external_docs = ExternalDocumentation.fromJSON(
        object.external_docs
      );
    } else {
      message.external_docs = undefined;
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      Object.entries(object.extensions).forEach(([key, value]) => {
        message.extensions[key] = Value.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: Swagger): unknown {
    const obj: any = {};
    message.swagger !== undefined && (obj.swagger = message.swagger);
    message.info !== undefined &&
      (obj.info = message.info ? Info.toJSON(message.info) : undefined);
    message.host !== undefined && (obj.host = message.host);
    message.base_path !== undefined && (obj.base_path = message.base_path);
    if (message.schemes) {
      obj.schemes = message.schemes.map((e) => schemeToJSON(e));
    } else {
      obj.schemes = [];
    }
    if (message.consumes) {
      obj.consumes = message.consumes.map((e) => e);
    } else {
      obj.consumes = [];
    }
    if (message.produces) {
      obj.produces = message.produces.map((e) => e);
    } else {
      obj.produces = [];
    }
    obj.responses = {};
    if (message.responses) {
      Object.entries(message.responses).forEach(([k, v]) => {
        obj.responses[k] = Response.toJSON(v);
      });
    }
    message.security_definitions !== undefined &&
      (obj.security_definitions = message.security_definitions
        ? SecurityDefinitions.toJSON(message.security_definitions)
        : undefined);
    if (message.security) {
      obj.security = message.security.map((e) =>
        e ? SecurityRequirement.toJSON(e) : undefined
      );
    } else {
      obj.security = [];
    }
    message.external_docs !== undefined &&
      (obj.external_docs = message.external_docs
        ? ExternalDocumentation.toJSON(message.external_docs)
        : undefined);
    obj.extensions = {};
    if (message.extensions) {
      Object.entries(message.extensions).forEach(([k, v]) => {
        obj.extensions[k] = Value.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Swagger>): Swagger {
    const message = { ...baseSwagger } as Swagger;
    message.schemes = [];
    message.consumes = [];
    message.produces = [];
    message.responses = {};
    message.security = [];
    message.extensions = {};
    if (object.swagger !== undefined && object.swagger !== null) {
      message.swagger = object.swagger;
    } else {
      message.swagger = "";
    }
    if (object.info !== undefined && object.info !== null) {
      message.info = Info.fromPartial(object.info);
    } else {
      message.info = undefined;
    }
    if (object.host !== undefined && object.host !== null) {
      message.host = object.host;
    } else {
      message.host = "";
    }
    if (object.base_path !== undefined && object.base_path !== null) {
      message.base_path = object.base_path;
    } else {
      message.base_path = "";
    }
    if (object.schemes !== undefined && object.schemes !== null) {
      for (const e of object.schemes) {
        message.schemes.push(e);
      }
    }
    if (object.consumes !== undefined && object.consumes !== null) {
      for (const e of object.consumes) {
        message.consumes.push(e);
      }
    }
    if (object.produces !== undefined && object.produces !== null) {
      for (const e of object.produces) {
        message.produces.push(e);
      }
    }
    if (object.responses !== undefined && object.responses !== null) {
      Object.entries(object.responses).forEach(([key, value]) => {
        if (value !== undefined) {
          message.responses[key] = Response.fromPartial(value);
        }
      });
    }
    if (
      object.security_definitions !== undefined &&
      object.security_definitions !== null
    ) {
      message.security_definitions = SecurityDefinitions.fromPartial(
        object.security_definitions
      );
    } else {
      message.security_definitions = undefined;
    }
    if (object.security !== undefined && object.security !== null) {
      for (const e of object.security) {
        message.security.push(SecurityRequirement.fromPartial(e));
      }
    }
    if (object.external_docs !== undefined && object.external_docs !== null) {
      message.external_docs = ExternalDocumentation.fromPartial(
        object.external_docs
      );
    } else {
      message.external_docs = undefined;
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      Object.entries(object.extensions).forEach(([key, value]) => {
        if (value !== undefined) {
          message.extensions[key] = Value.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseSwagger_ResponsesEntry: object = { key: "" };

export const Swagger_ResponsesEntry = {
  encode(
    message: Swagger_ResponsesEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Response.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Swagger_ResponsesEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSwagger_ResponsesEntry } as Swagger_ResponsesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Response.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Swagger_ResponsesEntry {
    const message = { ...baseSwagger_ResponsesEntry } as Swagger_ResponsesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Response.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: Swagger_ResponsesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Response.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Swagger_ResponsesEntry>
  ): Swagger_ResponsesEntry {
    const message = { ...baseSwagger_ResponsesEntry } as Swagger_ResponsesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Response.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseSwagger_ExtensionsEntry: object = { key: "" };

export const Swagger_ExtensionsEntry = {
  encode(
    message: Swagger_ExtensionsEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Swagger_ExtensionsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSwagger_ExtensionsEntry,
    } as Swagger_ExtensionsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Swagger_ExtensionsEntry {
    const message = {
      ...baseSwagger_ExtensionsEntry,
    } as Swagger_ExtensionsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: Swagger_ExtensionsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Swagger_ExtensionsEntry>
  ): Swagger_ExtensionsEntry {
    const message = {
      ...baseSwagger_ExtensionsEntry,
    } as Swagger_ExtensionsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseOperation: object = {
  tags: "",
  summary: "",
  description: "",
  operation_id: "",
  consumes: "",
  produces: "",
  schemes: 0,
  deprecated: false,
};

export const Operation = {
  encode(message: Operation, writer: Writer = Writer.create()): Writer {
    for (const v of message.tags) {
      writer.uint32(10).string(v!);
    }
    if (message.summary !== "") {
      writer.uint32(18).string(message.summary);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.external_docs !== undefined) {
      ExternalDocumentation.encode(
        message.external_docs,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.operation_id !== "") {
      writer.uint32(42).string(message.operation_id);
    }
    for (const v of message.consumes) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.produces) {
      writer.uint32(58).string(v!);
    }
    Object.entries(message.responses).forEach(([key, value]) => {
      Operation_ResponsesEntry.encode(
        { key: key as any, value },
        writer.uint32(74).fork()
      ).ldelim();
    });
    writer.uint32(82).fork();
    for (const v of message.schemes) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.deprecated === true) {
      writer.uint32(88).bool(message.deprecated);
    }
    for (const v of message.security) {
      SecurityRequirement.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    Object.entries(message.extensions).forEach(([key, value]) => {
      Operation_ExtensionsEntry.encode(
        { key: key as any, value },
        writer.uint32(106).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Operation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOperation } as Operation;
    message.tags = [];
    message.consumes = [];
    message.produces = [];
    message.responses = {};
    message.schemes = [];
    message.security = [];
    message.extensions = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tags.push(reader.string());
          break;
        case 2:
          message.summary = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.external_docs = ExternalDocumentation.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.operation_id = reader.string();
          break;
        case 6:
          message.consumes.push(reader.string());
          break;
        case 7:
          message.produces.push(reader.string());
          break;
        case 9:
          const entry9 = Operation_ResponsesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry9.value !== undefined) {
            message.responses[entry9.key] = entry9.value;
          }
          break;
        case 10:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.schemes.push(reader.int32() as any);
            }
          } else {
            message.schemes.push(reader.int32() as any);
          }
          break;
        case 11:
          message.deprecated = reader.bool();
          break;
        case 12:
          message.security.push(
            SecurityRequirement.decode(reader, reader.uint32())
          );
          break;
        case 13:
          const entry13 = Operation_ExtensionsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry13.value !== undefined) {
            message.extensions[entry13.key] = entry13.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Operation {
    const message = { ...baseOperation } as Operation;
    message.tags = [];
    message.consumes = [];
    message.produces = [];
    message.responses = {};
    message.schemes = [];
    message.security = [];
    message.extensions = {};
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(String(e));
      }
    }
    if (object.summary !== undefined && object.summary !== null) {
      message.summary = String(object.summary);
    } else {
      message.summary = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.external_docs !== undefined && object.external_docs !== null) {
      message.external_docs = ExternalDocumentation.fromJSON(
        object.external_docs
      );
    } else {
      message.external_docs = undefined;
    }
    if (object.operation_id !== undefined && object.operation_id !== null) {
      message.operation_id = String(object.operation_id);
    } else {
      message.operation_id = "";
    }
    if (object.consumes !== undefined && object.consumes !== null) {
      for (const e of object.consumes) {
        message.consumes.push(String(e));
      }
    }
    if (object.produces !== undefined && object.produces !== null) {
      for (const e of object.produces) {
        message.produces.push(String(e));
      }
    }
    if (object.responses !== undefined && object.responses !== null) {
      Object.entries(object.responses).forEach(([key, value]) => {
        message.responses[key] = Response.fromJSON(value);
      });
    }
    if (object.schemes !== undefined && object.schemes !== null) {
      for (const e of object.schemes) {
        message.schemes.push(schemeFromJSON(e));
      }
    }
    if (object.deprecated !== undefined && object.deprecated !== null) {
      message.deprecated = Boolean(object.deprecated);
    } else {
      message.deprecated = false;
    }
    if (object.security !== undefined && object.security !== null) {
      for (const e of object.security) {
        message.security.push(SecurityRequirement.fromJSON(e));
      }
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      Object.entries(object.extensions).forEach(([key, value]) => {
        message.extensions[key] = Value.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: Operation): unknown {
    const obj: any = {};
    if (message.tags) {
      obj.tags = message.tags.map((e) => e);
    } else {
      obj.tags = [];
    }
    message.summary !== undefined && (obj.summary = message.summary);
    message.description !== undefined &&
      (obj.description = message.description);
    message.external_docs !== undefined &&
      (obj.external_docs = message.external_docs
        ? ExternalDocumentation.toJSON(message.external_docs)
        : undefined);
    message.operation_id !== undefined &&
      (obj.operation_id = message.operation_id);
    if (message.consumes) {
      obj.consumes = message.consumes.map((e) => e);
    } else {
      obj.consumes = [];
    }
    if (message.produces) {
      obj.produces = message.produces.map((e) => e);
    } else {
      obj.produces = [];
    }
    obj.responses = {};
    if (message.responses) {
      Object.entries(message.responses).forEach(([k, v]) => {
        obj.responses[k] = Response.toJSON(v);
      });
    }
    if (message.schemes) {
      obj.schemes = message.schemes.map((e) => schemeToJSON(e));
    } else {
      obj.schemes = [];
    }
    message.deprecated !== undefined && (obj.deprecated = message.deprecated);
    if (message.security) {
      obj.security = message.security.map((e) =>
        e ? SecurityRequirement.toJSON(e) : undefined
      );
    } else {
      obj.security = [];
    }
    obj.extensions = {};
    if (message.extensions) {
      Object.entries(message.extensions).forEach(([k, v]) => {
        obj.extensions[k] = Value.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Operation>): Operation {
    const message = { ...baseOperation } as Operation;
    message.tags = [];
    message.consumes = [];
    message.produces = [];
    message.responses = {};
    message.schemes = [];
    message.security = [];
    message.extensions = {};
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(e);
      }
    }
    if (object.summary !== undefined && object.summary !== null) {
      message.summary = object.summary;
    } else {
      message.summary = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.external_docs !== undefined && object.external_docs !== null) {
      message.external_docs = ExternalDocumentation.fromPartial(
        object.external_docs
      );
    } else {
      message.external_docs = undefined;
    }
    if (object.operation_id !== undefined && object.operation_id !== null) {
      message.operation_id = object.operation_id;
    } else {
      message.operation_id = "";
    }
    if (object.consumes !== undefined && object.consumes !== null) {
      for (const e of object.consumes) {
        message.consumes.push(e);
      }
    }
    if (object.produces !== undefined && object.produces !== null) {
      for (const e of object.produces) {
        message.produces.push(e);
      }
    }
    if (object.responses !== undefined && object.responses !== null) {
      Object.entries(object.responses).forEach(([key, value]) => {
        if (value !== undefined) {
          message.responses[key] = Response.fromPartial(value);
        }
      });
    }
    if (object.schemes !== undefined && object.schemes !== null) {
      for (const e of object.schemes) {
        message.schemes.push(e);
      }
    }
    if (object.deprecated !== undefined && object.deprecated !== null) {
      message.deprecated = object.deprecated;
    } else {
      message.deprecated = false;
    }
    if (object.security !== undefined && object.security !== null) {
      for (const e of object.security) {
        message.security.push(SecurityRequirement.fromPartial(e));
      }
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      Object.entries(object.extensions).forEach(([key, value]) => {
        if (value !== undefined) {
          message.extensions[key] = Value.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseOperation_ResponsesEntry: object = { key: "" };

export const Operation_ResponsesEntry = {
  encode(
    message: Operation_ResponsesEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Response.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): Operation_ResponsesEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseOperation_ResponsesEntry,
    } as Operation_ResponsesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Response.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Operation_ResponsesEntry {
    const message = {
      ...baseOperation_ResponsesEntry,
    } as Operation_ResponsesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Response.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: Operation_ResponsesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Response.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Operation_ResponsesEntry>
  ): Operation_ResponsesEntry {
    const message = {
      ...baseOperation_ResponsesEntry,
    } as Operation_ResponsesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Response.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseOperation_ExtensionsEntry: object = { key: "" };

export const Operation_ExtensionsEntry = {
  encode(
    message: Operation_ExtensionsEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): Operation_ExtensionsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseOperation_ExtensionsEntry,
    } as Operation_ExtensionsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Operation_ExtensionsEntry {
    const message = {
      ...baseOperation_ExtensionsEntry,
    } as Operation_ExtensionsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: Operation_ExtensionsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Operation_ExtensionsEntry>
  ): Operation_ExtensionsEntry {
    const message = {
      ...baseOperation_ExtensionsEntry,
    } as Operation_ExtensionsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseHeader: object = {
  description: "",
  type: "",
  format: "",
  default: "",
  pattern: "",
};

export const Header = {
  encode(message: Header, writer: Writer = Writer.create()): Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.format !== "") {
      writer.uint32(26).string(message.format);
    }
    if (message.default !== "") {
      writer.uint32(50).string(message.default);
    }
    if (message.pattern !== "") {
      writer.uint32(106).string(message.pattern);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHeader } as Header;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.description = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.format = reader.string();
          break;
        case 6:
          message.default = reader.string();
          break;
        case 13:
          message.pattern = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Header {
    const message = { ...baseHeader } as Header;
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (object.format !== undefined && object.format !== null) {
      message.format = String(object.format);
    } else {
      message.format = "";
    }
    if (object.default !== undefined && object.default !== null) {
      message.default = String(object.default);
    } else {
      message.default = "";
    }
    if (object.pattern !== undefined && object.pattern !== null) {
      message.pattern = String(object.pattern);
    } else {
      message.pattern = "";
    }
    return message;
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    message.description !== undefined &&
      (obj.description = message.description);
    message.type !== undefined && (obj.type = message.type);
    message.format !== undefined && (obj.format = message.format);
    message.default !== undefined && (obj.default = message.default);
    message.pattern !== undefined && (obj.pattern = message.pattern);
    return obj;
  },

  fromPartial(object: DeepPartial<Header>): Header {
    const message = { ...baseHeader } as Header;
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (object.format !== undefined && object.format !== null) {
      message.format = object.format;
    } else {
      message.format = "";
    }
    if (object.default !== undefined && object.default !== null) {
      message.default = object.default;
    } else {
      message.default = "";
    }
    if (object.pattern !== undefined && object.pattern !== null) {
      message.pattern = object.pattern;
    } else {
      message.pattern = "";
    }
    return message;
  },
};

const baseResponse: object = { description: "" };

export const Response = {
  encode(message: Response, writer: Writer = Writer.create()): Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.schema !== undefined) {
      Schema.encode(message.schema, writer.uint32(18).fork()).ldelim();
    }
    Object.entries(message.headers).forEach(([key, value]) => {
      Response_HeadersEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    Object.entries(message.examples).forEach(([key, value]) => {
      Response_ExamplesEntry.encode(
        { key: key as any, value },
        writer.uint32(34).fork()
      ).ldelim();
    });
    Object.entries(message.extensions).forEach(([key, value]) => {
      Response_ExtensionsEntry.encode(
        { key: key as any, value },
        writer.uint32(42).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponse } as Response;
    message.headers = {};
    message.examples = {};
    message.extensions = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.description = reader.string();
          break;
        case 2:
          message.schema = Schema.decode(reader, reader.uint32());
          break;
        case 3:
          const entry3 = Response_HeadersEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.headers[entry3.key] = entry3.value;
          }
          break;
        case 4:
          const entry4 = Response_ExamplesEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.examples[entry4.key] = entry4.value;
          }
          break;
        case 5:
          const entry5 = Response_ExtensionsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry5.value !== undefined) {
            message.extensions[entry5.key] = entry5.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response {
    const message = { ...baseResponse } as Response;
    message.headers = {};
    message.examples = {};
    message.extensions = {};
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.schema !== undefined && object.schema !== null) {
      message.schema = Schema.fromJSON(object.schema);
    } else {
      message.schema = undefined;
    }
    if (object.headers !== undefined && object.headers !== null) {
      Object.entries(object.headers).forEach(([key, value]) => {
        message.headers[key] = Header.fromJSON(value);
      });
    }
    if (object.examples !== undefined && object.examples !== null) {
      Object.entries(object.examples).forEach(([key, value]) => {
        message.examples[key] = String(value);
      });
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      Object.entries(object.extensions).forEach(([key, value]) => {
        message.extensions[key] = Value.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.description !== undefined &&
      (obj.description = message.description);
    message.schema !== undefined &&
      (obj.schema = message.schema ? Schema.toJSON(message.schema) : undefined);
    obj.headers = {};
    if (message.headers) {
      Object.entries(message.headers).forEach(([k, v]) => {
        obj.headers[k] = Header.toJSON(v);
      });
    }
    obj.examples = {};
    if (message.examples) {
      Object.entries(message.examples).forEach(([k, v]) => {
        obj.examples[k] = v;
      });
    }
    obj.extensions = {};
    if (message.extensions) {
      Object.entries(message.extensions).forEach(([k, v]) => {
        obj.extensions[k] = Value.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Response>): Response {
    const message = { ...baseResponse } as Response;
    message.headers = {};
    message.examples = {};
    message.extensions = {};
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.schema !== undefined && object.schema !== null) {
      message.schema = Schema.fromPartial(object.schema);
    } else {
      message.schema = undefined;
    }
    if (object.headers !== undefined && object.headers !== null) {
      Object.entries(object.headers).forEach(([key, value]) => {
        if (value !== undefined) {
          message.headers[key] = Header.fromPartial(value);
        }
      });
    }
    if (object.examples !== undefined && object.examples !== null) {
      Object.entries(object.examples).forEach(([key, value]) => {
        if (value !== undefined) {
          message.examples[key] = String(value);
        }
      });
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      Object.entries(object.extensions).forEach(([key, value]) => {
        if (value !== undefined) {
          message.extensions[key] = Value.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseResponse_HeadersEntry: object = { key: "" };

export const Response_HeadersEntry = {
  encode(
    message: Response_HeadersEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Header.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Response_HeadersEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponse_HeadersEntry } as Response_HeadersEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Header.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response_HeadersEntry {
    const message = { ...baseResponse_HeadersEntry } as Response_HeadersEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Header.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: Response_HeadersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Header.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Response_HeadersEntry>
  ): Response_HeadersEntry {
    const message = { ...baseResponse_HeadersEntry } as Response_HeadersEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Header.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseResponse_ExamplesEntry: object = { key: "", value: "" };

export const Response_ExamplesEntry = {
  encode(
    message: Response_ExamplesEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Response_ExamplesEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponse_ExamplesEntry } as Response_ExamplesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response_ExamplesEntry {
    const message = { ...baseResponse_ExamplesEntry } as Response_ExamplesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: Response_ExamplesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Response_ExamplesEntry>
  ): Response_ExamplesEntry {
    const message = { ...baseResponse_ExamplesEntry } as Response_ExamplesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

const baseResponse_ExtensionsEntry: object = { key: "" };

export const Response_ExtensionsEntry = {
  encode(
    message: Response_ExtensionsEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): Response_ExtensionsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseResponse_ExtensionsEntry,
    } as Response_ExtensionsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response_ExtensionsEntry {
    const message = {
      ...baseResponse_ExtensionsEntry,
    } as Response_ExtensionsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: Response_ExtensionsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<Response_ExtensionsEntry>
  ): Response_ExtensionsEntry {
    const message = {
      ...baseResponse_ExtensionsEntry,
    } as Response_ExtensionsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseInfo: object = {
  title: "",
  description: "",
  terms_of_service: "",
  version: "",
};

export const Info = {
  encode(message: Info, writer: Writer = Writer.create()): Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.terms_of_service !== "") {
      writer.uint32(26).string(message.terms_of_service);
    }
    if (message.contact !== undefined) {
      Contact.encode(message.contact, writer.uint32(34).fork()).ldelim();
    }
    if (message.license !== undefined) {
      License.encode(message.license, writer.uint32(42).fork()).ldelim();
    }
    if (message.version !== "") {
      writer.uint32(50).string(message.version);
    }
    Object.entries(message.extensions).forEach(([key, value]) => {
      Info_ExtensionsEntry.encode(
        { key: key as any, value },
        writer.uint32(58).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Info {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInfo } as Info;
    message.extensions = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.terms_of_service = reader.string();
          break;
        case 4:
          message.contact = Contact.decode(reader, reader.uint32());
          break;
        case 5:
          message.license = License.decode(reader, reader.uint32());
          break;
        case 6:
          message.version = reader.string();
          break;
        case 7:
          const entry7 = Info_ExtensionsEntry.decode(reader, reader.uint32());
          if (entry7.value !== undefined) {
            message.extensions[entry7.key] = entry7.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Info {
    const message = { ...baseInfo } as Info;
    message.extensions = {};
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (
      object.terms_of_service !== undefined &&
      object.terms_of_service !== null
    ) {
      message.terms_of_service = String(object.terms_of_service);
    } else {
      message.terms_of_service = "";
    }
    if (object.contact !== undefined && object.contact !== null) {
      message.contact = Contact.fromJSON(object.contact);
    } else {
      message.contact = undefined;
    }
    if (object.license !== undefined && object.license !== null) {
      message.license = License.fromJSON(object.license);
    } else {
      message.license = undefined;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    } else {
      message.version = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      Object.entries(object.extensions).forEach(([key, value]) => {
        message.extensions[key] = Value.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: Info): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.terms_of_service !== undefined &&
      (obj.terms_of_service = message.terms_of_service);
    message.contact !== undefined &&
      (obj.contact = message.contact
        ? Contact.toJSON(message.contact)
        : undefined);
    message.license !== undefined &&
      (obj.license = message.license
        ? License.toJSON(message.license)
        : undefined);
    message.version !== undefined && (obj.version = message.version);
    obj.extensions = {};
    if (message.extensions) {
      Object.entries(message.extensions).forEach(([k, v]) => {
        obj.extensions[k] = Value.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Info>): Info {
    const message = { ...baseInfo } as Info;
    message.extensions = {};
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (
      object.terms_of_service !== undefined &&
      object.terms_of_service !== null
    ) {
      message.terms_of_service = object.terms_of_service;
    } else {
      message.terms_of_service = "";
    }
    if (object.contact !== undefined && object.contact !== null) {
      message.contact = Contact.fromPartial(object.contact);
    } else {
      message.contact = undefined;
    }
    if (object.license !== undefined && object.license !== null) {
      message.license = License.fromPartial(object.license);
    } else {
      message.license = undefined;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    } else {
      message.version = "";
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      Object.entries(object.extensions).forEach(([key, value]) => {
        if (value !== undefined) {
          message.extensions[key] = Value.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseInfo_ExtensionsEntry: object = { key: "" };

export const Info_ExtensionsEntry = {
  encode(
    message: Info_ExtensionsEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Info_ExtensionsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInfo_ExtensionsEntry } as Info_ExtensionsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Info_ExtensionsEntry {
    const message = { ...baseInfo_ExtensionsEntry } as Info_ExtensionsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: Info_ExtensionsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Info_ExtensionsEntry>): Info_ExtensionsEntry {
    const message = { ...baseInfo_ExtensionsEntry } as Info_ExtensionsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseContact: object = { name: "", url: "", email: "" };

export const Contact = {
  encode(message: Contact, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Contact {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseContact } as Contact;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Contact {
    const message = { ...baseContact } as Contact;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    return message;
  },

  toJSON(message: Contact): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.url !== undefined && (obj.url = message.url);
    message.email !== undefined && (obj.email = message.email);
    return obj;
  },

  fromPartial(object: DeepPartial<Contact>): Contact {
    const message = { ...baseContact } as Contact;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    } else {
      message.url = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
    }
    return message;
  },
};

const baseLicense: object = { name: "", url: "" };

export const License = {
  encode(message: License, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): License {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLicense } as License;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): License {
    const message = { ...baseLicense } as License;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = "";
    }
    return message;
  },

  toJSON(message: License): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial(object: DeepPartial<License>): License {
    const message = { ...baseLicense } as License;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    } else {
      message.url = "";
    }
    return message;
  },
};

const baseExternalDocumentation: object = { description: "", url: "" };

export const ExternalDocumentation = {
  encode(
    message: ExternalDocumentation,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ExternalDocumentation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseExternalDocumentation } as ExternalDocumentation;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.description = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ExternalDocumentation {
    const message = { ...baseExternalDocumentation } as ExternalDocumentation;
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = "";
    }
    return message;
  },

  toJSON(message: ExternalDocumentation): unknown {
    const obj: any = {};
    message.description !== undefined &&
      (obj.description = message.description);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial(
    object: DeepPartial<ExternalDocumentation>
  ): ExternalDocumentation {
    const message = { ...baseExternalDocumentation } as ExternalDocumentation;
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    } else {
      message.url = "";
    }
    return message;
  },
};

const baseSchema: object = { discriminator: "", read_only: false, example: "" };

export const Schema = {
  encode(message: Schema, writer: Writer = Writer.create()): Writer {
    if (message.json_schema !== undefined) {
      JSONSchema.encode(message.json_schema, writer.uint32(10).fork()).ldelim();
    }
    if (message.discriminator !== "") {
      writer.uint32(18).string(message.discriminator);
    }
    if (message.read_only === true) {
      writer.uint32(24).bool(message.read_only);
    }
    if (message.external_docs !== undefined) {
      ExternalDocumentation.encode(
        message.external_docs,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.example !== "") {
      writer.uint32(50).string(message.example);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Schema {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSchema } as Schema;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.json_schema = JSONSchema.decode(reader, reader.uint32());
          break;
        case 2:
          message.discriminator = reader.string();
          break;
        case 3:
          message.read_only = reader.bool();
          break;
        case 5:
          message.external_docs = ExternalDocumentation.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.example = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Schema {
    const message = { ...baseSchema } as Schema;
    if (object.json_schema !== undefined && object.json_schema !== null) {
      message.json_schema = JSONSchema.fromJSON(object.json_schema);
    } else {
      message.json_schema = undefined;
    }
    if (object.discriminator !== undefined && object.discriminator !== null) {
      message.discriminator = String(object.discriminator);
    } else {
      message.discriminator = "";
    }
    if (object.read_only !== undefined && object.read_only !== null) {
      message.read_only = Boolean(object.read_only);
    } else {
      message.read_only = false;
    }
    if (object.external_docs !== undefined && object.external_docs !== null) {
      message.external_docs = ExternalDocumentation.fromJSON(
        object.external_docs
      );
    } else {
      message.external_docs = undefined;
    }
    if (object.example !== undefined && object.example !== null) {
      message.example = String(object.example);
    } else {
      message.example = "";
    }
    return message;
  },

  toJSON(message: Schema): unknown {
    const obj: any = {};
    message.json_schema !== undefined &&
      (obj.json_schema = message.json_schema
        ? JSONSchema.toJSON(message.json_schema)
        : undefined);
    message.discriminator !== undefined &&
      (obj.discriminator = message.discriminator);
    message.read_only !== undefined && (obj.read_only = message.read_only);
    message.external_docs !== undefined &&
      (obj.external_docs = message.external_docs
        ? ExternalDocumentation.toJSON(message.external_docs)
        : undefined);
    message.example !== undefined && (obj.example = message.example);
    return obj;
  },

  fromPartial(object: DeepPartial<Schema>): Schema {
    const message = { ...baseSchema } as Schema;
    if (object.json_schema !== undefined && object.json_schema !== null) {
      message.json_schema = JSONSchema.fromPartial(object.json_schema);
    } else {
      message.json_schema = undefined;
    }
    if (object.discriminator !== undefined && object.discriminator !== null) {
      message.discriminator = object.discriminator;
    } else {
      message.discriminator = "";
    }
    if (object.read_only !== undefined && object.read_only !== null) {
      message.read_only = object.read_only;
    } else {
      message.read_only = false;
    }
    if (object.external_docs !== undefined && object.external_docs !== null) {
      message.external_docs = ExternalDocumentation.fromPartial(
        object.external_docs
      );
    } else {
      message.external_docs = undefined;
    }
    if (object.example !== undefined && object.example !== null) {
      message.example = object.example;
    } else {
      message.example = "";
    }
    return message;
  },
};

const baseJSONSchema: object = {
  ref: "",
  title: "",
  description: "",
  default: "",
  read_only: false,
  example: "",
  multiple_of: 0,
  maximum: 0,
  exclusive_maximum: false,
  minimum: 0,
  exclusive_minimum: false,
  max_length: 0,
  min_length: 0,
  pattern: "",
  max_items: 0,
  min_items: 0,
  unique_items: false,
  max_properties: 0,
  min_properties: 0,
  required: "",
  array: "",
  type: 0,
  format: "",
  enum: "",
};

export const JSONSchema = {
  encode(message: JSONSchema, writer: Writer = Writer.create()): Writer {
    if (message.ref !== "") {
      writer.uint32(26).string(message.ref);
    }
    if (message.title !== "") {
      writer.uint32(42).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.default !== "") {
      writer.uint32(58).string(message.default);
    }
    if (message.read_only === true) {
      writer.uint32(64).bool(message.read_only);
    }
    if (message.example !== "") {
      writer.uint32(74).string(message.example);
    }
    if (message.multiple_of !== 0) {
      writer.uint32(81).double(message.multiple_of);
    }
    if (message.maximum !== 0) {
      writer.uint32(89).double(message.maximum);
    }
    if (message.exclusive_maximum === true) {
      writer.uint32(96).bool(message.exclusive_maximum);
    }
    if (message.minimum !== 0) {
      writer.uint32(105).double(message.minimum);
    }
    if (message.exclusive_minimum === true) {
      writer.uint32(112).bool(message.exclusive_minimum);
    }
    if (message.max_length !== 0) {
      writer.uint32(120).uint64(message.max_length);
    }
    if (message.min_length !== 0) {
      writer.uint32(128).uint64(message.min_length);
    }
    if (message.pattern !== "") {
      writer.uint32(138).string(message.pattern);
    }
    if (message.max_items !== 0) {
      writer.uint32(160).uint64(message.max_items);
    }
    if (message.min_items !== 0) {
      writer.uint32(168).uint64(message.min_items);
    }
    if (message.unique_items === true) {
      writer.uint32(176).bool(message.unique_items);
    }
    if (message.max_properties !== 0) {
      writer.uint32(192).uint64(message.max_properties);
    }
    if (message.min_properties !== 0) {
      writer.uint32(200).uint64(message.min_properties);
    }
    for (const v of message.required) {
      writer.uint32(210).string(v!);
    }
    for (const v of message.array) {
      writer.uint32(274).string(v!);
    }
    writer.uint32(282).fork();
    for (const v of message.type) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.format !== "") {
      writer.uint32(290).string(message.format);
    }
    for (const v of message.enum) {
      writer.uint32(370).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): JSONSchema {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseJSONSchema } as JSONSchema;
    message.required = [];
    message.array = [];
    message.type = [];
    message.enum = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.ref = reader.string();
          break;
        case 5:
          message.title = reader.string();
          break;
        case 6:
          message.description = reader.string();
          break;
        case 7:
          message.default = reader.string();
          break;
        case 8:
          message.read_only = reader.bool();
          break;
        case 9:
          message.example = reader.string();
          break;
        case 10:
          message.multiple_of = reader.double();
          break;
        case 11:
          message.maximum = reader.double();
          break;
        case 12:
          message.exclusive_maximum = reader.bool();
          break;
        case 13:
          message.minimum = reader.double();
          break;
        case 14:
          message.exclusive_minimum = reader.bool();
          break;
        case 15:
          message.max_length = longToNumber(reader.uint64() as Long);
          break;
        case 16:
          message.min_length = longToNumber(reader.uint64() as Long);
          break;
        case 17:
          message.pattern = reader.string();
          break;
        case 20:
          message.max_items = longToNumber(reader.uint64() as Long);
          break;
        case 21:
          message.min_items = longToNumber(reader.uint64() as Long);
          break;
        case 22:
          message.unique_items = reader.bool();
          break;
        case 24:
          message.max_properties = longToNumber(reader.uint64() as Long);
          break;
        case 25:
          message.min_properties = longToNumber(reader.uint64() as Long);
          break;
        case 26:
          message.required.push(reader.string());
          break;
        case 34:
          message.array.push(reader.string());
          break;
        case 35:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.type.push(reader.int32() as any);
            }
          } else {
            message.type.push(reader.int32() as any);
          }
          break;
        case 36:
          message.format = reader.string();
          break;
        case 46:
          message.enum.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JSONSchema {
    const message = { ...baseJSONSchema } as JSONSchema;
    message.required = [];
    message.array = [];
    message.type = [];
    message.enum = [];
    if (object.ref !== undefined && object.ref !== null) {
      message.ref = String(object.ref);
    } else {
      message.ref = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.default !== undefined && object.default !== null) {
      message.default = String(object.default);
    } else {
      message.default = "";
    }
    if (object.read_only !== undefined && object.read_only !== null) {
      message.read_only = Boolean(object.read_only);
    } else {
      message.read_only = false;
    }
    if (object.example !== undefined && object.example !== null) {
      message.example = String(object.example);
    } else {
      message.example = "";
    }
    if (object.multiple_of !== undefined && object.multiple_of !== null) {
      message.multiple_of = Number(object.multiple_of);
    } else {
      message.multiple_of = 0;
    }
    if (object.maximum !== undefined && object.maximum !== null) {
      message.maximum = Number(object.maximum);
    } else {
      message.maximum = 0;
    }
    if (
      object.exclusive_maximum !== undefined &&
      object.exclusive_maximum !== null
    ) {
      message.exclusive_maximum = Boolean(object.exclusive_maximum);
    } else {
      message.exclusive_maximum = false;
    }
    if (object.minimum !== undefined && object.minimum !== null) {
      message.minimum = Number(object.minimum);
    } else {
      message.minimum = 0;
    }
    if (
      object.exclusive_minimum !== undefined &&
      object.exclusive_minimum !== null
    ) {
      message.exclusive_minimum = Boolean(object.exclusive_minimum);
    } else {
      message.exclusive_minimum = false;
    }
    if (object.max_length !== undefined && object.max_length !== null) {
      message.max_length = Number(object.max_length);
    } else {
      message.max_length = 0;
    }
    if (object.min_length !== undefined && object.min_length !== null) {
      message.min_length = Number(object.min_length);
    } else {
      message.min_length = 0;
    }
    if (object.pattern !== undefined && object.pattern !== null) {
      message.pattern = String(object.pattern);
    } else {
      message.pattern = "";
    }
    if (object.max_items !== undefined && object.max_items !== null) {
      message.max_items = Number(object.max_items);
    } else {
      message.max_items = 0;
    }
    if (object.min_items !== undefined && object.min_items !== null) {
      message.min_items = Number(object.min_items);
    } else {
      message.min_items = 0;
    }
    if (object.unique_items !== undefined && object.unique_items !== null) {
      message.unique_items = Boolean(object.unique_items);
    } else {
      message.unique_items = false;
    }
    if (object.max_properties !== undefined && object.max_properties !== null) {
      message.max_properties = Number(object.max_properties);
    } else {
      message.max_properties = 0;
    }
    if (object.min_properties !== undefined && object.min_properties !== null) {
      message.min_properties = Number(object.min_properties);
    } else {
      message.min_properties = 0;
    }
    if (object.required !== undefined && object.required !== null) {
      for (const e of object.required) {
        message.required.push(String(e));
      }
    }
    if (object.array !== undefined && object.array !== null) {
      for (const e of object.array) {
        message.array.push(String(e));
      }
    }
    if (object.type !== undefined && object.type !== null) {
      for (const e of object.type) {
        message.type.push(jSONSchema_JSONSchemaSimpleTypesFromJSON(e));
      }
    }
    if (object.format !== undefined && object.format !== null) {
      message.format = String(object.format);
    } else {
      message.format = "";
    }
    if (object.enum !== undefined && object.enum !== null) {
      for (const e of object.enum) {
        message.enum.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: JSONSchema): unknown {
    const obj: any = {};
    message.ref !== undefined && (obj.ref = message.ref);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.default !== undefined && (obj.default = message.default);
    message.read_only !== undefined && (obj.read_only = message.read_only);
    message.example !== undefined && (obj.example = message.example);
    message.multiple_of !== undefined &&
      (obj.multiple_of = message.multiple_of);
    message.maximum !== undefined && (obj.maximum = message.maximum);
    message.exclusive_maximum !== undefined &&
      (obj.exclusive_maximum = message.exclusive_maximum);
    message.minimum !== undefined && (obj.minimum = message.minimum);
    message.exclusive_minimum !== undefined &&
      (obj.exclusive_minimum = message.exclusive_minimum);
    message.max_length !== undefined && (obj.max_length = message.max_length);
    message.min_length !== undefined && (obj.min_length = message.min_length);
    message.pattern !== undefined && (obj.pattern = message.pattern);
    message.max_items !== undefined && (obj.max_items = message.max_items);
    message.min_items !== undefined && (obj.min_items = message.min_items);
    message.unique_items !== undefined &&
      (obj.unique_items = message.unique_items);
    message.max_properties !== undefined &&
      (obj.max_properties = message.max_properties);
    message.min_properties !== undefined &&
      (obj.min_properties = message.min_properties);
    if (message.required) {
      obj.required = message.required.map((e) => e);
    } else {
      obj.required = [];
    }
    if (message.array) {
      obj.array = message.array.map((e) => e);
    } else {
      obj.array = [];
    }
    if (message.type) {
      obj.type = message.type.map((e) =>
        jSONSchema_JSONSchemaSimpleTypesToJSON(e)
      );
    } else {
      obj.type = [];
    }
    message.format !== undefined && (obj.format = message.format);
    if (message.enum) {
      obj.enum = message.enum.map((e) => e);
    } else {
      obj.enum = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<JSONSchema>): JSONSchema {
    const message = { ...baseJSONSchema } as JSONSchema;
    message.required = [];
    message.array = [];
    message.type = [];
    message.enum = [];
    if (object.ref !== undefined && object.ref !== null) {
      message.ref = object.ref;
    } else {
      message.ref = "";
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.default !== undefined && object.default !== null) {
      message.default = object.default;
    } else {
      message.default = "";
    }
    if (object.read_only !== undefined && object.read_only !== null) {
      message.read_only = object.read_only;
    } else {
      message.read_only = false;
    }
    if (object.example !== undefined && object.example !== null) {
      message.example = object.example;
    } else {
      message.example = "";
    }
    if (object.multiple_of !== undefined && object.multiple_of !== null) {
      message.multiple_of = object.multiple_of;
    } else {
      message.multiple_of = 0;
    }
    if (object.maximum !== undefined && object.maximum !== null) {
      message.maximum = object.maximum;
    } else {
      message.maximum = 0;
    }
    if (
      object.exclusive_maximum !== undefined &&
      object.exclusive_maximum !== null
    ) {
      message.exclusive_maximum = object.exclusive_maximum;
    } else {
      message.exclusive_maximum = false;
    }
    if (object.minimum !== undefined && object.minimum !== null) {
      message.minimum = object.minimum;
    } else {
      message.minimum = 0;
    }
    if (
      object.exclusive_minimum !== undefined &&
      object.exclusive_minimum !== null
    ) {
      message.exclusive_minimum = object.exclusive_minimum;
    } else {
      message.exclusive_minimum = false;
    }
    if (object.max_length !== undefined && object.max_length !== null) {
      message.max_length = object.max_length;
    } else {
      message.max_length = 0;
    }
    if (object.min_length !== undefined && object.min_length !== null) {
      message.min_length = object.min_length;
    } else {
      message.min_length = 0;
    }
    if (object.pattern !== undefined && object.pattern !== null) {
      message.pattern = object.pattern;
    } else {
      message.pattern = "";
    }
    if (object.max_items !== undefined && object.max_items !== null) {
      message.max_items = object.max_items;
    } else {
      message.max_items = 0;
    }
    if (object.min_items !== undefined && object.min_items !== null) {
      message.min_items = object.min_items;
    } else {
      message.min_items = 0;
    }
    if (object.unique_items !== undefined && object.unique_items !== null) {
      message.unique_items = object.unique_items;
    } else {
      message.unique_items = false;
    }
    if (object.max_properties !== undefined && object.max_properties !== null) {
      message.max_properties = object.max_properties;
    } else {
      message.max_properties = 0;
    }
    if (object.min_properties !== undefined && object.min_properties !== null) {
      message.min_properties = object.min_properties;
    } else {
      message.min_properties = 0;
    }
    if (object.required !== undefined && object.required !== null) {
      for (const e of object.required) {
        message.required.push(e);
      }
    }
    if (object.array !== undefined && object.array !== null) {
      for (const e of object.array) {
        message.array.push(e);
      }
    }
    if (object.type !== undefined && object.type !== null) {
      for (const e of object.type) {
        message.type.push(e);
      }
    }
    if (object.format !== undefined && object.format !== null) {
      message.format = object.format;
    } else {
      message.format = "";
    }
    if (object.enum !== undefined && object.enum !== null) {
      for (const e of object.enum) {
        message.enum.push(e);
      }
    }
    return message;
  },
};

const baseTag: object = { description: "" };

export const Tag = {
  encode(message: Tag, writer: Writer = Writer.create()): Writer {
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.external_docs !== undefined) {
      ExternalDocumentation.encode(
        message.external_docs,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Tag {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTag } as Tag;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.external_docs = ExternalDocumentation.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tag {
    const message = { ...baseTag } as Tag;
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.external_docs !== undefined && object.external_docs !== null) {
      message.external_docs = ExternalDocumentation.fromJSON(
        object.external_docs
      );
    } else {
      message.external_docs = undefined;
    }
    return message;
  },

  toJSON(message: Tag): unknown {
    const obj: any = {};
    message.description !== undefined &&
      (obj.description = message.description);
    message.external_docs !== undefined &&
      (obj.external_docs = message.external_docs
        ? ExternalDocumentation.toJSON(message.external_docs)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Tag>): Tag {
    const message = { ...baseTag } as Tag;
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.external_docs !== undefined && object.external_docs !== null) {
      message.external_docs = ExternalDocumentation.fromPartial(
        object.external_docs
      );
    } else {
      message.external_docs = undefined;
    }
    return message;
  },
};

const baseSecurityDefinitions: object = {};

export const SecurityDefinitions = {
  encode(
    message: SecurityDefinitions,
    writer: Writer = Writer.create()
  ): Writer {
    Object.entries(message.security).forEach(([key, value]) => {
      SecurityDefinitions_SecurityEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SecurityDefinitions {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSecurityDefinitions } as SecurityDefinitions;
    message.security = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = SecurityDefinitions_SecurityEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.security[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SecurityDefinitions {
    const message = { ...baseSecurityDefinitions } as SecurityDefinitions;
    message.security = {};
    if (object.security !== undefined && object.security !== null) {
      Object.entries(object.security).forEach(([key, value]) => {
        message.security[key] = SecurityScheme.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: SecurityDefinitions): unknown {
    const obj: any = {};
    obj.security = {};
    if (message.security) {
      Object.entries(message.security).forEach(([k, v]) => {
        obj.security[k] = SecurityScheme.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SecurityDefinitions>): SecurityDefinitions {
    const message = { ...baseSecurityDefinitions } as SecurityDefinitions;
    message.security = {};
    if (object.security !== undefined && object.security !== null) {
      Object.entries(object.security).forEach(([key, value]) => {
        if (value !== undefined) {
          message.security[key] = SecurityScheme.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseSecurityDefinitions_SecurityEntry: object = { key: "" };

export const SecurityDefinitions_SecurityEntry = {
  encode(
    message: SecurityDefinitions_SecurityEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SecurityScheme.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SecurityDefinitions_SecurityEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSecurityDefinitions_SecurityEntry,
    } as SecurityDefinitions_SecurityEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = SecurityScheme.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SecurityDefinitions_SecurityEntry {
    const message = {
      ...baseSecurityDefinitions_SecurityEntry,
    } as SecurityDefinitions_SecurityEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = SecurityScheme.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: SecurityDefinitions_SecurityEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? SecurityScheme.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<SecurityDefinitions_SecurityEntry>
  ): SecurityDefinitions_SecurityEntry {
    const message = {
      ...baseSecurityDefinitions_SecurityEntry,
    } as SecurityDefinitions_SecurityEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = SecurityScheme.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseSecurityScheme: object = {
  type: 0,
  description: "",
  name: "",
  in: 0,
  flow: 0,
  authorization_url: "",
  token_url: "",
};

export const SecurityScheme = {
  encode(message: SecurityScheme, writer: Writer = Writer.create()): Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.in !== 0) {
      writer.uint32(32).int32(message.in);
    }
    if (message.flow !== 0) {
      writer.uint32(40).int32(message.flow);
    }
    if (message.authorization_url !== "") {
      writer.uint32(50).string(message.authorization_url);
    }
    if (message.token_url !== "") {
      writer.uint32(58).string(message.token_url);
    }
    if (message.scopes !== undefined) {
      Scopes.encode(message.scopes, writer.uint32(66).fork()).ldelim();
    }
    Object.entries(message.extensions).forEach(([key, value]) => {
      SecurityScheme_ExtensionsEntry.encode(
        { key: key as any, value },
        writer.uint32(74).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SecurityScheme {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSecurityScheme } as SecurityScheme;
    message.extensions = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.in = reader.int32() as any;
          break;
        case 5:
          message.flow = reader.int32() as any;
          break;
        case 6:
          message.authorization_url = reader.string();
          break;
        case 7:
          message.token_url = reader.string();
          break;
        case 8:
          message.scopes = Scopes.decode(reader, reader.uint32());
          break;
        case 9:
          const entry9 = SecurityScheme_ExtensionsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry9.value !== undefined) {
            message.extensions[entry9.key] = entry9.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SecurityScheme {
    const message = { ...baseSecurityScheme } as SecurityScheme;
    message.extensions = {};
    if (object.type !== undefined && object.type !== null) {
      message.type = securityScheme_TypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.in !== undefined && object.in !== null) {
      message.in = securityScheme_InFromJSON(object.in);
    } else {
      message.in = 0;
    }
    if (object.flow !== undefined && object.flow !== null) {
      message.flow = securityScheme_FlowFromJSON(object.flow);
    } else {
      message.flow = 0;
    }
    if (
      object.authorization_url !== undefined &&
      object.authorization_url !== null
    ) {
      message.authorization_url = String(object.authorization_url);
    } else {
      message.authorization_url = "";
    }
    if (object.token_url !== undefined && object.token_url !== null) {
      message.token_url = String(object.token_url);
    } else {
      message.token_url = "";
    }
    if (object.scopes !== undefined && object.scopes !== null) {
      message.scopes = Scopes.fromJSON(object.scopes);
    } else {
      message.scopes = undefined;
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      Object.entries(object.extensions).forEach(([key, value]) => {
        message.extensions[key] = Value.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: SecurityScheme): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = securityScheme_TypeToJSON(message.type));
    message.description !== undefined &&
      (obj.description = message.description);
    message.name !== undefined && (obj.name = message.name);
    message.in !== undefined && (obj.in = securityScheme_InToJSON(message.in));
    message.flow !== undefined &&
      (obj.flow = securityScheme_FlowToJSON(message.flow));
    message.authorization_url !== undefined &&
      (obj.authorization_url = message.authorization_url);
    message.token_url !== undefined && (obj.token_url = message.token_url);
    message.scopes !== undefined &&
      (obj.scopes = message.scopes ? Scopes.toJSON(message.scopes) : undefined);
    obj.extensions = {};
    if (message.extensions) {
      Object.entries(message.extensions).forEach(([k, v]) => {
        obj.extensions[k] = Value.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SecurityScheme>): SecurityScheme {
    const message = { ...baseSecurityScheme } as SecurityScheme;
    message.extensions = {};
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.in !== undefined && object.in !== null) {
      message.in = object.in;
    } else {
      message.in = 0;
    }
    if (object.flow !== undefined && object.flow !== null) {
      message.flow = object.flow;
    } else {
      message.flow = 0;
    }
    if (
      object.authorization_url !== undefined &&
      object.authorization_url !== null
    ) {
      message.authorization_url = object.authorization_url;
    } else {
      message.authorization_url = "";
    }
    if (object.token_url !== undefined && object.token_url !== null) {
      message.token_url = object.token_url;
    } else {
      message.token_url = "";
    }
    if (object.scopes !== undefined && object.scopes !== null) {
      message.scopes = Scopes.fromPartial(object.scopes);
    } else {
      message.scopes = undefined;
    }
    if (object.extensions !== undefined && object.extensions !== null) {
      Object.entries(object.extensions).forEach(([key, value]) => {
        if (value !== undefined) {
          message.extensions[key] = Value.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseSecurityScheme_ExtensionsEntry: object = { key: "" };

export const SecurityScheme_ExtensionsEntry = {
  encode(
    message: SecurityScheme_ExtensionsEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SecurityScheme_ExtensionsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSecurityScheme_ExtensionsEntry,
    } as SecurityScheme_ExtensionsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SecurityScheme_ExtensionsEntry {
    const message = {
      ...baseSecurityScheme_ExtensionsEntry,
    } as SecurityScheme_ExtensionsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: SecurityScheme_ExtensionsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<SecurityScheme_ExtensionsEntry>
  ): SecurityScheme_ExtensionsEntry {
    const message = {
      ...baseSecurityScheme_ExtensionsEntry,
    } as SecurityScheme_ExtensionsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseSecurityRequirement: object = {};

export const SecurityRequirement = {
  encode(
    message: SecurityRequirement,
    writer: Writer = Writer.create()
  ): Writer {
    Object.entries(message.security_requirement).forEach(([key, value]) => {
      SecurityRequirement_SecurityRequirementEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SecurityRequirement {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSecurityRequirement } as SecurityRequirement;
    message.security_requirement = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = SecurityRequirement_SecurityRequirementEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.security_requirement[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SecurityRequirement {
    const message = { ...baseSecurityRequirement } as SecurityRequirement;
    message.security_requirement = {};
    if (
      object.security_requirement !== undefined &&
      object.security_requirement !== null
    ) {
      Object.entries(object.security_requirement).forEach(([key, value]) => {
        message.security_requirement[
          key
        ] = SecurityRequirement_SecurityRequirementValue.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: SecurityRequirement): unknown {
    const obj: any = {};
    obj.security_requirement = {};
    if (message.security_requirement) {
      Object.entries(message.security_requirement).forEach(([k, v]) => {
        obj.security_requirement[
          k
        ] = SecurityRequirement_SecurityRequirementValue.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SecurityRequirement>): SecurityRequirement {
    const message = { ...baseSecurityRequirement } as SecurityRequirement;
    message.security_requirement = {};
    if (
      object.security_requirement !== undefined &&
      object.security_requirement !== null
    ) {
      Object.entries(object.security_requirement).forEach(([key, value]) => {
        if (value !== undefined) {
          message.security_requirement[
            key
          ] = SecurityRequirement_SecurityRequirementValue.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseSecurityRequirement_SecurityRequirementValue: object = { scope: "" };

export const SecurityRequirement_SecurityRequirementValue = {
  encode(
    message: SecurityRequirement_SecurityRequirementValue,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.scope) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SecurityRequirement_SecurityRequirementValue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSecurityRequirement_SecurityRequirementValue,
    } as SecurityRequirement_SecurityRequirementValue;
    message.scope = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.scope.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SecurityRequirement_SecurityRequirementValue {
    const message = {
      ...baseSecurityRequirement_SecurityRequirementValue,
    } as SecurityRequirement_SecurityRequirementValue;
    message.scope = [];
    if (object.scope !== undefined && object.scope !== null) {
      for (const e of object.scope) {
        message.scope.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: SecurityRequirement_SecurityRequirementValue): unknown {
    const obj: any = {};
    if (message.scope) {
      obj.scope = message.scope.map((e) => e);
    } else {
      obj.scope = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<SecurityRequirement_SecurityRequirementValue>
  ): SecurityRequirement_SecurityRequirementValue {
    const message = {
      ...baseSecurityRequirement_SecurityRequirementValue,
    } as SecurityRequirement_SecurityRequirementValue;
    message.scope = [];
    if (object.scope !== undefined && object.scope !== null) {
      for (const e of object.scope) {
        message.scope.push(e);
      }
    }
    return message;
  },
};

const baseSecurityRequirement_SecurityRequirementEntry: object = { key: "" };

export const SecurityRequirement_SecurityRequirementEntry = {
  encode(
    message: SecurityRequirement_SecurityRequirementEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      SecurityRequirement_SecurityRequirementValue.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SecurityRequirement_SecurityRequirementEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSecurityRequirement_SecurityRequirementEntry,
    } as SecurityRequirement_SecurityRequirementEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = SecurityRequirement_SecurityRequirementValue.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SecurityRequirement_SecurityRequirementEntry {
    const message = {
      ...baseSecurityRequirement_SecurityRequirementEntry,
    } as SecurityRequirement_SecurityRequirementEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = SecurityRequirement_SecurityRequirementValue.fromJSON(
        object.value
      );
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: SecurityRequirement_SecurityRequirementEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? SecurityRequirement_SecurityRequirementValue.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<SecurityRequirement_SecurityRequirementEntry>
  ): SecurityRequirement_SecurityRequirementEntry {
    const message = {
      ...baseSecurityRequirement_SecurityRequirementEntry,
    } as SecurityRequirement_SecurityRequirementEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = SecurityRequirement_SecurityRequirementValue.fromPartial(
        object.value
      );
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseScopes: object = {};

export const Scopes = {
  encode(message: Scopes, writer: Writer = Writer.create()): Writer {
    Object.entries(message.scope).forEach(([key, value]) => {
      Scopes_ScopeEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Scopes {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseScopes } as Scopes;
    message.scope = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = Scopes_ScopeEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.scope[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Scopes {
    const message = { ...baseScopes } as Scopes;
    message.scope = {};
    if (object.scope !== undefined && object.scope !== null) {
      Object.entries(object.scope).forEach(([key, value]) => {
        message.scope[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: Scopes): unknown {
    const obj: any = {};
    obj.scope = {};
    if (message.scope) {
      Object.entries(message.scope).forEach(([k, v]) => {
        obj.scope[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Scopes>): Scopes {
    const message = { ...baseScopes } as Scopes;
    message.scope = {};
    if (object.scope !== undefined && object.scope !== null) {
      Object.entries(object.scope).forEach(([key, value]) => {
        if (value !== undefined) {
          message.scope[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseScopes_ScopeEntry: object = { key: "", value: "" };

export const Scopes_ScopeEntry = {
  encode(message: Scopes_ScopeEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Scopes_ScopeEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseScopes_ScopeEntry } as Scopes_ScopeEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Scopes_ScopeEntry {
    const message = { ...baseScopes_ScopeEntry } as Scopes_ScopeEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: Scopes_ScopeEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<Scopes_ScopeEntry>): Scopes_ScopeEntry {
    const message = { ...baseScopes_ScopeEntry } as Scopes_ScopeEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
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
