import * as Data from "effect/Data"
import * as Effect from "effect/Effect"
import type { SchemaError } from "effect/Schema"
import * as Schema from "effect/Schema"
import type * as HttpClient from "effect/unstable/http/HttpClient"
import * as HttpClientError from "effect/unstable/http/HttpClientError"
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest"
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse"
// recursive declarations
export type TimeInterval = { readonly "name"?: string, readonly "time_intervals"?: ReadonlyArray<TimeInterval> } & { readonly [x: string]: Schema.Json }
export const TimeInterval = Schema.suspend((): Schema.Codec<TimeInterval> => __recursive_TimeInterval)
export type RouteExport = { readonly "active_time_intervals"?: ReadonlyArray<string>, readonly "continue"?: boolean, readonly "group_by"?: ReadonlyArray<string>, readonly "group_interval"?: string, readonly "group_wait"?: string, readonly "match"?: { readonly [x: string]: string }, readonly "match_re"?: MatchRegexps, readonly "matchers"?: Matchers, readonly "mute_time_intervals"?: ReadonlyArray<string>, readonly "object_matchers"?: ObjectMatchers, readonly "receiver"?: string, readonly "repeat_interval"?: string, readonly "routes"?: ReadonlyArray<RouteExport> } & { readonly [x: string]: Schema.Json }
export const RouteExport = Schema.suspend((): Schema.Codec<RouteExport> => __recursive_RouteExport)
export type Route = { readonly "active_time_intervals"?: ReadonlyArray<string>, readonly "continue"?: boolean, readonly "group_by"?: ReadonlyArray<string>, readonly "group_interval"?: string, readonly "group_wait"?: string, readonly "match"?: { readonly [x: string]: string }, readonly "match_re"?: MatchRegexps, readonly "matchers"?: Matchers, readonly "mute_time_intervals"?: ReadonlyArray<string>, readonly "object_matchers"?: ObjectMatchers, readonly "provenance"?: Provenance, readonly "receiver"?: string, readonly "repeat_interval"?: string, readonly "routes"?: ReadonlyArray<Route> } & { readonly [x: string]: Schema.Json }
export const Route = Schema.suspend((): Schema.Codec<Route> => __recursive_Route)
// non-recursive definitions
export type Permission = { readonly "action"?: string, readonly "created"?: string, readonly "scope"?: string, readonly "updated"?: string } & { readonly [x: string]: Schema.Json }
export const Permission = Schema.StructWithRest(Schema.Struct({ "action": Schema.optionalKey(Schema.String), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "scope": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "Permission is the model for access control permissions", "identifier": "Permission" })
export type ErrorResponseBody = { readonly "error"?: string, readonly "message": string, readonly "status"?: string } & { readonly [x: string]: Schema.Json }
export const ErrorResponseBody = Schema.StructWithRest(Schema.Struct({ "error": Schema.optionalKey(Schema.String.annotate({ "description": "Error An optional detailed description of the actual error. Only included if running in developer mode." })), "message": Schema.String.annotate({ "description": "a human readable version of the error" }), "status": Schema.optionalKey(Schema.String.annotate({ "description": "Status An optional status to denote the cause of the error.\n\nFor example, a 412 Precondition Failed error may include additional information of why that error happened." })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ErrorResponseBody" })
export type RoleAssignmentsDTO = { readonly "role_uid"?: string, readonly "service_accounts"?: ReadonlyArray<number>, readonly "teams"?: ReadonlyArray<number>, readonly "users"?: ReadonlyArray<number> } & { readonly [x: string]: Schema.Json }
export const RoleAssignmentsDTO = Schema.StructWithRest(Schema.Struct({ "role_uid": Schema.optionalKey(Schema.String), "service_accounts": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "teams": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "users": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "RoleAssignmentsDTO" })
export type Status = number
export const Status = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "Status" }))
export type SuccessResponseBody = { readonly "message"?: string } & { readonly [x: string]: Schema.Json }
export const SuccessResponseBody = Schema.StructWithRest(Schema.Struct({ "message": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "SuccessResponseBody" })
export type Assignments = { readonly "builtInRoles"?: boolean, readonly "serviceAccounts"?: boolean, readonly "teams"?: boolean, readonly "users"?: boolean } & { readonly [x: string]: Schema.Json }
export const Assignments = Schema.StructWithRest(Schema.Struct({ "builtInRoles": Schema.optionalKey(Schema.Boolean), "serviceAccounts": Schema.optionalKey(Schema.Boolean), "teams": Schema.optionalKey(Schema.Boolean), "users": Schema.optionalKey(Schema.Boolean) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "Assignments" })
export type ResourcePermissionDTO = { readonly "actions"?: ReadonlyArray<string>, readonly "builtInRole"?: string, readonly "id"?: number, readonly "isInherited"?: boolean, readonly "isManaged"?: boolean, readonly "isServiceAccount"?: boolean, readonly "permission"?: string, readonly "roleName"?: string, readonly "team"?: string, readonly "teamAvatarUrl"?: string, readonly "teamId"?: number, readonly "teamUid"?: string, readonly "userAvatarUrl"?: string, readonly "userId"?: number, readonly "userLogin"?: string, readonly "userUid"?: string } & { readonly [x: string]: Schema.Json }
export const ResourcePermissionDTO = Schema.StructWithRest(Schema.Struct({ "actions": Schema.optionalKey(Schema.Array(Schema.String)), "builtInRole": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "isInherited": Schema.optionalKey(Schema.Boolean), "isManaged": Schema.optionalKey(Schema.Boolean), "isServiceAccount": Schema.optionalKey(Schema.Boolean), "permission": Schema.optionalKey(Schema.String), "roleName": Schema.optionalKey(Schema.String), "team": Schema.optionalKey(Schema.String), "teamAvatarUrl": Schema.optionalKey(Schema.String), "teamId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "teamUid": Schema.optionalKey(Schema.String), "userAvatarUrl": Schema.optionalKey(Schema.String), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "userLogin": Schema.optionalKey(Schema.String), "userUid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "resourcePermissionDTO" })
export type Duration = number
export const Duration = Schema.Number.annotate({ "description": "A Duration represents the elapsed time between two instants\nas an int64 nanosecond count. The representation limits the\nlargest representable duration to approximately 290 years.", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "Duration" }))
export type FailedUser = { readonly "Error"?: string, readonly "Login"?: string } & { readonly [x: string]: Schema.Json }
export const FailedUser = Schema.StructWithRest(Schema.Struct({ "Error": Schema.optionalKey(Schema.String), "Login": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "FailedUser holds the information of an user that failed", "identifier": "FailedUser" })
export type SettingsBag = { readonly [x: string]: { readonly [x: string]: string } }
export const SettingsBag = Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.String)).annotate({ "identifier": "SettingsBag" })
export type AdminStats = { readonly "activeAdmins"?: number, readonly "activeDevices"?: number, readonly "activeEditors"?: number, readonly "activeSessions"?: number, readonly "activeUsers"?: number, readonly "activeViewers"?: number, readonly "admins"?: number, readonly "alerts"?: number, readonly "dailyActiveAdmins"?: number, readonly "dailyActiveEditors"?: number, readonly "dailyActiveSessions"?: number, readonly "dailyActiveUsers"?: number, readonly "dailyActiveViewers"?: number, readonly "dashboards"?: number, readonly "datasources"?: number, readonly "editors"?: number, readonly "monthlyActiveUsers"?: number, readonly "orgs"?: number, readonly "playlists"?: number, readonly "snapshots"?: number, readonly "stars"?: number, readonly "tags"?: number, readonly "users"?: number, readonly "viewers"?: number } & { readonly [x: string]: Schema.Json }
export const AdminStats = Schema.StructWithRest(Schema.Struct({ "activeAdmins": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "activeDevices": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "activeEditors": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "activeSessions": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "activeUsers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "activeViewers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "admins": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "alerts": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dailyActiveAdmins": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dailyActiveEditors": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dailyActiveSessions": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dailyActiveUsers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dailyActiveViewers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dashboards": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "datasources": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "editors": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "monthlyActiveUsers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "orgs": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "playlists": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "snapshots": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "stars": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "tags": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "users": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "viewers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "AdminStats" })
export type UserToken = { readonly "AuthToken"?: string, readonly "AuthTokenSeen"?: boolean, readonly "ClientIp"?: string, readonly "CreatedAt"?: number, readonly "ExternalSessionId"?: number, readonly "Id"?: number, readonly "PrevAuthToken"?: string, readonly "RevokedAt"?: number, readonly "RotatedAt"?: number, readonly "SeenAt"?: number, readonly "UnhashedToken"?: string, readonly "UpdatedAt"?: number, readonly "UserAgent"?: string, readonly "UserId"?: number } & { readonly [x: string]: Schema.Json }
export const UserToken = Schema.StructWithRest(Schema.Struct({ "AuthToken": Schema.optionalKey(Schema.String), "AuthTokenSeen": Schema.optionalKey(Schema.Boolean), "ClientIp": Schema.optionalKey(Schema.String), "CreatedAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "ExternalSessionId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "Id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "PrevAuthToken": Schema.optionalKey(Schema.String), "RevokedAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "RotatedAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "SeenAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "UnhashedToken": Schema.optionalKey(Schema.String), "UpdatedAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "UserAgent": Schema.optionalKey(Schema.String), "UserId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "UserToken represents a user token", "identifier": "UserToken" })
export type QuotaDTO = { readonly "limit"?: number, readonly "org_id"?: number, readonly "target"?: string, readonly "used"?: number, readonly "user_id"?: number } & { readonly [x: string]: Schema.Json }
export const QuotaDTO = Schema.StructWithRest(Schema.Struct({ "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "org_id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "target": Schema.optionalKey(Schema.String), "used": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "user_id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "QuotaDTO" })
export type Json = { readonly [x: string]: Schema.Json }
export const Json = Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "identifier": "Json" })
export type TagsDTO = { readonly "count"?: number, readonly "tag"?: string } & { readonly [x: string]: Schema.Json }
export const TagsDTO = Schema.StructWithRest(Schema.Struct({ "count": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "tag": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "TagsDTO is the frontend DTO for Tag.", "identifier": "TagsDTO" })
export type DeviceDTO = { readonly "avatarUrl"?: string, readonly "clientIp"?: string, readonly "createdAt"?: string, readonly "deviceId"?: string, readonly "lastSeenAt"?: string, readonly "updatedAt"?: string, readonly "userAgent"?: string } & { readonly [x: string]: Schema.Json }
export const DeviceDTO = Schema.StructWithRest(Schema.Struct({ "avatarUrl": Schema.optionalKey(Schema.String), "clientIp": Schema.optionalKey(Schema.String), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "deviceId": Schema.optionalKey(Schema.String), "lastSeenAt": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "userAgent": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "deviceDTO" })
export type DeviceSearchHitDTO = { readonly "clientIp"?: string, readonly "createdAt"?: string, readonly "deviceId"?: string, readonly "lastSeenAt"?: string, readonly "updatedAt"?: string, readonly "userAgent"?: string } & { readonly [x: string]: Schema.Json }
export const DeviceSearchHitDTO = Schema.StructWithRest(Schema.Struct({ "clientIp": Schema.optionalKey(Schema.String), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "deviceId": Schema.optionalKey(Schema.String), "lastSeenAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "userAgent": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "DeviceSearchHitDTO" })
export type CloudMigrationSessionResponseDTO = { readonly "created"?: string, readonly "slug"?: string, readonly "uid"?: string, readonly "updated"?: string } & { readonly [x: string]: Schema.Json }
export const CloudMigrationSessionResponseDTO = Schema.StructWithRest(Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "slug": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "CloudMigrationSessionResponseDTO" })
export type MigrateDataResponseItemDTO = { readonly "errorCode"?: "ALERT_RULES_QUOTA_REACHED" | "ALERT_RULES_GROUP_QUOTA_REACHED" | "DATASOURCE_NAME_CONFLICT" | "DATASOURCE_INVALID_URL" | "DATASOURCE_ALREADY_MANAGED" | "FOLDER_NAME_CONFLICT" | "DASHBOARD_ALREADY_MANAGED" | "LIBRARY_ELEMENT_NAME_CONFLICT" | "UNSUPPORTED_DATA_TYPE" | "RESOURCE_CONFLICT" | "UNEXPECTED_STATUS_CODE" | "INTERNAL_SERVICE_ERROR" | "GENERIC_ERROR", readonly "message"?: string, readonly "name"?: string, readonly "parentName"?: string, readonly "refId": string, readonly "status": "OK" | "WARNING" | "ERROR" | "PENDING" | "UNKNOWN", readonly "type": "DASHBOARD" | "DATASOURCE" | "FOLDER" | "LIBRARY_ELEMENT" | "ALERT_RULE" | "ALERT_RULE_GROUP" | "CONTACT_POINT" | "NOTIFICATION_POLICY" | "NOTIFICATION_TEMPLATE" | "MUTE_TIMING" | "PLUGIN" } & { readonly [x: string]: Schema.Json }
export const MigrateDataResponseItemDTO = Schema.StructWithRest(Schema.Struct({ "errorCode": Schema.optionalKey(Schema.Literals(["ALERT_RULES_QUOTA_REACHED", "ALERT_RULES_GROUP_QUOTA_REACHED", "DATASOURCE_NAME_CONFLICT", "DATASOURCE_INVALID_URL", "DATASOURCE_ALREADY_MANAGED", "FOLDER_NAME_CONFLICT", "DASHBOARD_ALREADY_MANAGED", "LIBRARY_ELEMENT_NAME_CONFLICT", "UNSUPPORTED_DATA_TYPE", "RESOURCE_CONFLICT", "UNEXPECTED_STATUS_CODE", "INTERNAL_SERVICE_ERROR", "GENERIC_ERROR"])), "message": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "parentName": Schema.optionalKey(Schema.String), "refId": Schema.String, "status": Schema.Literals(["OK", "WARNING", "ERROR", "PENDING", "UNKNOWN"]), "type": Schema.Literals(["DASHBOARD", "DATASOURCE", "FOLDER", "LIBRARY_ELEMENT", "ALERT_RULE", "ALERT_RULE_GROUP", "CONTACT_POINT", "NOTIFICATION_POLICY", "NOTIFICATION_TEMPLATE", "MUTE_TIMING", "PLUGIN"]) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "MigrateDataResponseItemDTO" })
export type SnapshotResourceStats = { readonly "statuses"?: { readonly [x: string]: number }, readonly "total"?: number, readonly "types"?: { readonly [x: string]: number } } & { readonly [x: string]: Schema.Json }
export const SnapshotResourceStats = Schema.StructWithRest(Schema.Struct({ "statuses": Schema.optionalKey(Schema.Record(Schema.String, Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "total": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "types": Schema.optionalKey(Schema.Record(Schema.String, Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "SnapshotResourceStats" })
export type SnapshotDTO = { readonly "created"?: string, readonly "finished"?: string, readonly "sessionUid"?: string, readonly "status"?: "INITIALIZING" | "CREATING" | "PENDING_UPLOAD" | "UPLOADING" | "PENDING_PROCESSING" | "PROCESSING" | "FINISHED" | "CANCELED" | "ERROR" | "UNKNOWN", readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const SnapshotDTO = Schema.StructWithRest(Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "finished": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "sessionUid": Schema.optionalKey(Schema.String), "status": Schema.optionalKey(Schema.Literals(["INITIALIZING", "CREATING", "PENDING_UPLOAD", "UPLOADING", "PENDING_PROCESSING", "PROCESSING", "FINISHED", "CANCELED", "ERROR", "UNKNOWN"])), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "Base snapshot without results", "identifier": "SnapshotDTO" })
export type ResourceDependencyDTO = { readonly "dependencies"?: ReadonlyArray<"DASHBOARD" | "DATASOURCE" | "FOLDER" | "LIBRARY_ELEMENT" | "ALERT_RULE" | "ALERT_RULE_GROUP" | "CONTACT_POINT" | "NOTIFICATION_POLICY" | "NOTIFICATION_TEMPLATE" | "MUTE_TIMING" | "PLUGIN">, readonly "resourceType"?: "DASHBOARD" | "DATASOURCE" | "FOLDER" | "LIBRARY_ELEMENT" | "ALERT_RULE" | "ALERT_RULE_GROUP" | "CONTACT_POINT" | "NOTIFICATION_POLICY" | "NOTIFICATION_TEMPLATE" | "MUTE_TIMING" | "PLUGIN" } & { readonly [x: string]: Schema.Json }
export const ResourceDependencyDTO = Schema.StructWithRest(Schema.Struct({ "dependencies": Schema.optionalKey(Schema.Array(Schema.Literals(["DASHBOARD", "DATASOURCE", "FOLDER", "LIBRARY_ELEMENT", "ALERT_RULE", "ALERT_RULE_GROUP", "CONTACT_POINT", "NOTIFICATION_POLICY", "NOTIFICATION_TEMPLATE", "MUTE_TIMING", "PLUGIN"]))), "resourceType": Schema.optionalKey(Schema.Literals(["DASHBOARD", "DATASOURCE", "FOLDER", "LIBRARY_ELEMENT", "ALERT_RULE", "ALERT_RULE_GROUP", "CONTACT_POINT", "NOTIFICATION_POLICY", "NOTIFICATION_TEMPLATE", "MUTE_TIMING", "PLUGIN"])) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ResourceDependencyDTO" })
export type GetAccessTokenResponseDTO = { readonly "createdAt"?: string, readonly "displayName"?: string, readonly "expiresAt"?: string, readonly "firstUsedAt"?: string, readonly "id"?: string, readonly "lastUsedAt"?: string } & { readonly [x: string]: Schema.Json }
export const GetAccessTokenResponseDTO = Schema.StructWithRest(Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String), "displayName": Schema.optionalKey(Schema.String), "expiresAt": Schema.optionalKey(Schema.String), "firstUsedAt": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.String), "lastUsedAt": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "GetAccessTokenResponseDTO" })
export type DashboardSnapshotDTO = { readonly "created"?: string, readonly "expires"?: string, readonly "external"?: boolean, readonly "externalUrl"?: string, readonly "key"?: string, readonly "name"?: string, readonly "updated"?: string } & { readonly [x: string]: Schema.Json }
export const DashboardSnapshotDTO = Schema.StructWithRest(Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "expires": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "external": Schema.optionalKey(Schema.Boolean), "externalUrl": Schema.optionalKey(Schema.String), "key": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "DashboardSnapshotDTO without dashboard map", "identifier": "DashboardSnapshotDTO" })
export type AnnotationActions = { readonly "canAdd"?: boolean, readonly "canDelete"?: boolean, readonly "canEdit"?: boolean } & { readonly [x: string]: Schema.Json }
export const AnnotationActions = Schema.StructWithRest(Schema.Struct({ "canAdd": Schema.optionalKey(Schema.Boolean), "canDelete": Schema.optionalKey(Schema.Boolean), "canEdit": Schema.optionalKey(Schema.Boolean) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "+k8s:deepcopy-gen=true", "identifier": "AnnotationActions" })
export type PublicDashboardListResponse = { readonly "accessToken"?: string, readonly "dashboardUid"?: string, readonly "isEnabled"?: boolean, readonly "slug"?: string, readonly "title"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const PublicDashboardListResponse = Schema.StructWithRest(Schema.Struct({ "accessToken": Schema.optionalKey(Schema.String), "dashboardUid": Schema.optionalKey(Schema.String), "isEnabled": Schema.optionalKey(Schema.Boolean), "slug": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "PublicDashboardListResponse" })
export type PublicError = { readonly "extra"?: { readonly [x: string]: Schema.Json }, readonly "message"?: string, readonly "messageId": string, readonly "statusCode": number } & { readonly [x: string]: Schema.Json }
export const PublicError = Schema.StructWithRest(Schema.Struct({ "extra": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "description": "Extra Additional information about the error" })), "message": Schema.optionalKey(Schema.String.annotate({ "description": "Message A human readable message" })), "messageId": Schema.String.annotate({ "description": "MessageID A unique identifier for the error" }), "statusCode": Schema.Number.annotate({ "description": "StatusCode The HTTP status code returned", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "PublicError is derived from Error and only contains information\navailable to the end user.", "identifier": "publicError" })
export type DashboardTagCloudItem = { readonly "count"?: number, readonly "term"?: string } & { readonly [x: string]: Schema.Json }
export const DashboardTagCloudItem = Schema.StructWithRest(Schema.Struct({ "count": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "term": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "DashboardTagCloudItem" })
export type EmailDTO = { readonly "recipient"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const EmailDTO = Schema.StructWithRest(Schema.Struct({ "recipient": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "EmailDTO" })
export type ShareType = string
export const ShareType = Schema.String.annotate({ "identifier": "ShareType" })
export type PermissionType = number
export const PermissionType = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "PermissionType" }))
export type DsAccess = string
export const DsAccess = Schema.String.annotate({ "identifier": "DsAccess" })
export type Transformation = { readonly "expression"?: string, readonly "field"?: string, readonly "mapValue"?: string, readonly "type"?: "regex" | "logfmt" } & { readonly [x: string]: Schema.Json }
export const Transformation = Schema.StructWithRest(Schema.Struct({ "expression": Schema.optionalKey(Schema.String), "field": Schema.optionalKey(Schema.String), "mapValue": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.Literals(["regex", "logfmt"])) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "Transformation" })
export type CorrelationType = string
export const CorrelationType = Schema.String.annotate({ "description": "the type of correlation, either query for containing query information, or external for containing an external URL\n+enum", "identifier": "CorrelationType" })
export type Metadata = { readonly [x: string]: boolean }
export const Metadata = Schema.Record(Schema.String, Schema.Boolean).annotate({ "description": "Metadata contains user accesses for a given resource\nEx: map[string]bool{\"create\":true, \"delete\": true}", "identifier": "Metadata" })
export type TeamLBACRule = { readonly "rules"?: ReadonlyArray<string>, readonly "teamId"?: string, readonly "teamUid"?: string } & { readonly [x: string]: Schema.Json }
export const TeamLBACRule = Schema.StructWithRest(Schema.Struct({ "rules": Schema.optionalKey(Schema.Array(Schema.String)), "teamId": Schema.optionalKey(Schema.String), "teamUid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "TeamLBACRule" })
export type CacheConfigResponse = { readonly "created"?: string, readonly "dataSourceID"?: number, readonly "dataSourceUID"?: string, readonly "defaultTTLMs"?: number, readonly "enabled"?: boolean, readonly "message"?: string, readonly "ttlQueriesMs"?: number, readonly "ttlResourcesMs"?: number, readonly "updated"?: string, readonly "useDefaultTTL"?: boolean } & { readonly [x: string]: Schema.Json }
export const CacheConfigResponse = Schema.StructWithRest(Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "dataSourceID": Schema.optionalKey(Schema.Number.annotate({ "description": "Fields that can be set by the API caller - read/write", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dataSourceUID": Schema.optionalKey(Schema.String), "defaultTTLMs": Schema.optionalKey(Schema.Number.annotate({ "description": "These are returned by the HTTP API, but are managed internally - read-only\nNote: 'created' and 'updated' are special properties managed automatically by xorm, but we are setting them manually", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "enabled": Schema.optionalKey(Schema.Boolean), "message": Schema.optionalKey(Schema.String), "ttlQueriesMs": Schema.optionalKey(Schema.Number.annotate({ "description": "TTL MS, or \"time to live\", is how long a cached item will stay in the cache before it is removed (in milliseconds)", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "ttlResourcesMs": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "useDefaultTTL": Schema.optionalKey(Schema.Boolean.annotate({ "description": "If UseDefaultTTL is enabled, then the TTLQueriesMS and TTLResourcesMS in this object is always sent as the default TTL located in grafana.ini" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "CacheConfigResponse" })
export type Source = string
export const Source = Schema.String.annotate({ "title": "Source type defines the status source.", "identifier": "Source" })
export type ExplorePanelsState = Schema.Json
export const ExplorePanelsState = Schema.Json.annotate({ "expected": "JSON value", "description": "This is an object constructed with the keys as the values of the enum VisType and the value being a bag of properties", "identifier": "ExplorePanelsState" })
export type TimeRange = { readonly "from"?: string, readonly "to"?: string } & { readonly [x: string]: Schema.Json }
export const TimeRange = Schema.StructWithRest(Schema.Struct({ "from": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "to": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "Redefining this to avoid an import cycle", "identifier": "TimeRange" })
export type SupportedTransformationTypes = string
export const SupportedTransformationTypes = Schema.String.annotate({ "identifier": "SupportedTransformationTypes" })
export type ValueMapping = { readonly [x: string]: Schema.Json }
export const ValueMapping = Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "description": "ValueMapping allows mapping input values to text and color", "identifier": "ValueMapping" })
export type ConfFloat64 = number
export const ConfFloat64 = Schema.Number.annotate({ "description": "ConfFloat64 is a float64. It Marshals float64 values of NaN of Inf\nto null.", "format": "double" }).check(Schema.isFinite().annotate({ "expected": "a finite number", "identifier": "ConfFloat64" }))
export type ThresholdsMode = string
export const ThresholdsMode = Schema.String.annotate({ "description": "ThresholdsMode absolute or percentage", "identifier": "ThresholdsMode" })
export type EnumFieldConfig = { readonly "color"?: ReadonlyArray<string>, readonly "description"?: ReadonlyArray<string>, readonly "icon"?: ReadonlyArray<string>, readonly "text"?: ReadonlyArray<string> } & { readonly [x: string]: Schema.Json }
export const EnumFieldConfig = Schema.StructWithRest(Schema.Struct({ "color": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Color is the color value for a given index (empty is undefined)" })), "description": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Description of the enum state" })), "icon": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Icon supports setting an icon for a given index value" })), "text": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Value is the string display value for a given index" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "Enum field config\nVector values are used as lookup keys into the enum fields", "identifier": "EnumFieldConfig" })
export type FrameLabels = { readonly [x: string]: string }
export const FrameLabels = Schema.Record(Schema.String, Schema.String).annotate({ "description": "Labels are used to add metadata to an object.  The JSON will always be sorted keys", "identifier": "FrameLabels" })
export type DataTopic = string
export const DataTopic = Schema.String.annotate({ "title": "DataTopic is used to identify which topic the frame should be assigned to.", "description": "nolint:revive", "identifier": "DataTopic" })
export type InspectType = number
export const InspectType = Schema.Number.annotate({ "title": "InspectType is a type for the Inspect property of a Notice.", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "InspectType" }))
export type NoticeSeverity = number
export const NoticeSeverity = Schema.Number.annotate({ "title": "NoticeSeverity is a type for the Severity property of a Notice.", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "NoticeSeverity" }))
export type VisType = string
export const VisType = Schema.String.annotate({ "title": "VisType is used to indicate how the data should be visualized in explore.", "identifier": "VisType" })
export type FrameType = string
export const FrameType = Schema.String.annotate({ "description": "A FrameType string, when present in a frame's metadata, asserts that the\nframe's structure conforms to the FrameType's specification.\nThis property is currently optional, so FrameType may be FrameTypeUnknown even if the properties of\nthe Frame correspond to a defined FrameType.\n+enum", "identifier": "FrameType" })
export type FrameTypeVersion = ReadonlyArray<number>
export const FrameTypeVersion = Schema.Array(Schema.Number.annotate({ "format": "uint64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))).annotate({ "title": "FrameType is a 2 number version (Major / Minor).", "identifier": "FrameTypeVersion" })
export type ManagerKind = string
export const ManagerKind = Schema.String.annotate({ "title": "ManagerKind is the type of manager, which is responsible for managing the resource.", "description": "It can be a user or a tool or a generic API client.\n+enum", "identifier": "ManagerKind" })
export type DescendantCounts = { readonly [x: string]: number }
export const DescendantCounts = Schema.Record(Schema.String, Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))).annotate({ "identifier": "DescendantCounts" })
export type HealthResponse = { readonly "apiserver"?: string, readonly "commit"?: string, readonly "database"?: string, readonly "enterpriseCommit"?: string, readonly "version"?: string } & { readonly [x: string]: Schema.Json }
export const HealthResponse = Schema.StructWithRest(Schema.Struct({ "apiserver": Schema.optionalKey(Schema.String), "commit": Schema.optionalKey(Schema.String), "database": Schema.optionalKey(Schema.String), "enterpriseCommit": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "healthResponse" })
export type LibraryElementDTOMetaUser = { readonly "avatarUrl"?: string, readonly "id"?: number, readonly "name"?: string } & { readonly [x: string]: Schema.Json }
export const LibraryElementDTOMetaUser = Schema.StructWithRest(Schema.Struct({ "avatarUrl": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "name": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "LibraryElementDTOMetaUser" })
export type ActiveUserStats = { readonly "active_admins_and_editors"?: number, readonly "active_anonymous_devices"?: number, readonly "active_users"?: number, readonly "active_viewers"?: number } & { readonly [x: string]: Schema.Json }
export const ActiveUserStats = Schema.StructWithRest(Schema.Struct({ "active_admins_and_editors": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "active_anonymous_devices": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "active_users": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "active_viewers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ActiveUserStats" })
export type TokenStatus = number
export const TokenStatus = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "TokenStatus" }))
export type Address = { readonly "address1"?: string, readonly "address2"?: string, readonly "city"?: string, readonly "country"?: string, readonly "state"?: string, readonly "zipCode"?: string } & { readonly [x: string]: Schema.Json }
export const Address = Schema.StructWithRest(Schema.Struct({ "address1": Schema.optionalKey(Schema.String), "address2": Schema.optionalKey(Schema.String), "city": Schema.optionalKey(Schema.String), "country": Schema.optionalKey(Schema.String), "state": Schema.optionalKey(Schema.String), "zipCode": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "Address" })
export type TempUserStatus = string
export const TempUserStatus = Schema.String.annotate({ "identifier": "TempUserStatus" })
export type PreferencesNavbarPreference = { readonly "bookmarkUrls"?: ReadonlyArray<string> } & { readonly [x: string]: Schema.Json }
export const PreferencesNavbarPreference = Schema.StructWithRest(Schema.Struct({ "bookmarkUrls": Schema.optionalKey(Schema.Array(Schema.String)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "+k8s:openapi-gen=true", "identifier": "PreferencesNavbarPreference" })
export type PreferencesQueryHistoryPreference = { readonly "homeTab"?: string } & { readonly [x: string]: Schema.Json }
export const PreferencesQueryHistoryPreference = Schema.StructWithRest(Schema.Struct({ "homeTab": Schema.optionalKey(Schema.String.annotate({ "description": "one of: '' | 'query' | 'starred';" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "+k8s:openapi-gen=true", "identifier": "PreferencesQueryHistoryPreference" })
export type OrgUserDTO = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "authLabels"?: ReadonlyArray<string>, readonly "avatarUrl"?: string, readonly "created"?: string, readonly "email"?: string, readonly "isDisabled"?: boolean, readonly "isExternallySynced"?: boolean, readonly "isProvisioned"?: boolean, readonly "lastSeenAt"?: string, readonly "lastSeenAtAge"?: string, readonly "login"?: string, readonly "name"?: string, readonly "orgId"?: number, readonly "role"?: string, readonly "uid"?: string, readonly "userId"?: number } & { readonly [x: string]: Schema.Json }
export const OrgUserDTO = Schema.StructWithRest(Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "authLabels": Schema.optionalKey(Schema.Array(Schema.String)), "avatarUrl": Schema.optionalKey(Schema.String), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.optionalKey(Schema.String), "isDisabled": Schema.optionalKey(Schema.Boolean), "isExternallySynced": Schema.optionalKey(Schema.Boolean), "isProvisioned": Schema.optionalKey(Schema.Boolean), "lastSeenAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "lastSeenAtAge": Schema.optionalKey(Schema.String), "login": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "role": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "OrgUserDTO" })
export type UserLookupDTO = { readonly "avatarUrl"?: string, readonly "login"?: string, readonly "uid"?: string, readonly "userId"?: number } & { readonly [x: string]: Schema.Json }
export const UserLookupDTO = Schema.StructWithRest(Schema.Struct({ "avatarUrl": Schema.optionalKey(Schema.String), "login": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "UserLookupDTO" })
export type OrgDTO = { readonly "id"?: number, readonly "name"?: string } & { readonly [x: string]: Schema.Json }
export const OrgDTO = Schema.StructWithRest(Schema.Struct({ "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "name": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "OrgDTO" })
export type Playlist = { readonly "id"?: number, readonly "interval"?: string, readonly "name"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const Playlist = Schema.StructWithRest(Schema.Struct({ "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "interval": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "Playlist model", "identifier": "Playlist" })
export type PlaylistItemDTO = { readonly "title"?: string, readonly "type"?: string, readonly "value"?: string } & { readonly [x: string]: Schema.Json }
export const PlaylistItemDTO = Schema.StructWithRest(Schema.Struct({ "title": Schema.optionalKey(Schema.String.annotate({ "description": "Title is an unused property -- it will be removed in the future" })), "type": Schema.optionalKey(Schema.String.annotate({ "description": "Type of the item." })), "value": Schema.optionalKey(Schema.String.annotate({ "description": "Value depends on type and describes the playlist item.\n\ndashboard_by_id: The value is an internal numerical identifier set by Grafana. This\nis not portable as the numerical identifier is non-deterministic between different instances.\nWill be replaced by dashboard_by_uid in the future. (deprecated)\ndashboard_by_tag: The value is a tag which is set on any number of dashboards. All\ndashboards behind the tag will be added to the playlist.\ndashboard_by_uid: The value is the dashboard UID" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "PlaylistItemDTO" })
export type DataSourceRef = { readonly "type"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const DataSourceRef = Schema.StructWithRest(Schema.Struct({ "type": Schema.optionalKey(Schema.String.annotate({ "description": "The plugin type-id" })), "uid": Schema.optionalKey(Schema.String.annotate({ "description": "Specific datasource instance" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "Ref to a DataSource instance", "identifier": "DataSourceRef" })
export type AnnotationPanelFilter = { readonly "exclude"?: boolean, readonly "ids"?: ReadonlyArray<number> } & { readonly [x: string]: Schema.Json }
export const AnnotationPanelFilter = Schema.StructWithRest(Schema.Struct({ "exclude": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Should the specified panels be included or excluded" })), "ids": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" }))).annotate({ "description": "Panel IDs that should be included or excluded" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "AnnotationPanelFilter" })
export type AnnotationTarget = { readonly "limit"?: number, readonly "matchAny"?: boolean, readonly "tags"?: ReadonlyArray<string>, readonly "type"?: string } & { readonly [x: string]: Schema.Json }
export const AnnotationTarget = Schema.StructWithRest(Schema.Struct({ "limit": Schema.optionalKey(Schema.Number.annotate({ "description": "Only required/valid for the grafana datasource...\nbut code+tests is already depending on it so hard to change", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "matchAny": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Only required/valid for the grafana datasource...\nbut code+tests is already depending on it so hard to change" })), "tags": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Only required/valid for the grafana datasource...\nbut code+tests is already depending on it so hard to change" })), "type": Schema.optionalKey(Schema.String.annotate({ "description": "Only required/valid for the grafana datasource...\nbut code+tests is already depending on it so hard to change" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "TODO: this should be a regular DataQuery that depends on the selected dashboard\nthese match the properties of the \"grafana\" datasouce that is default in most dashboards", "identifier": "AnnotationTarget" })
export type RecordingRuleJSON = { readonly "active"?: boolean, readonly "count"?: boolean, readonly "description"?: string, readonly "dest_data_source_uid"?: string, readonly "id"?: string, readonly "interval"?: number, readonly "name"?: string, readonly "prom_name"?: string, readonly "queries"?: ReadonlyArray<{ readonly [x: string]: Schema.Json }>, readonly "range"?: number, readonly "target_ref_id"?: string } & { readonly [x: string]: Schema.Json }
export const RecordingRuleJSON = Schema.StructWithRest(Schema.Struct({ "active": Schema.optionalKey(Schema.Boolean), "count": Schema.optionalKey(Schema.Boolean), "description": Schema.optionalKey(Schema.String), "dest_data_source_uid": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.String), "interval": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "name": Schema.optionalKey(Schema.String), "prom_name": Schema.optionalKey(Schema.String), "queries": Schema.optionalKey(Schema.Array(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })))), "range": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "target_ref_id": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "RecordingRuleJSON is the external representation of a recording rule", "identifier": "RecordingRuleJSON" })
export type PrometheusRemoteWriteTargetJSON = { readonly "data_source_uid"?: string, readonly "id"?: string, readonly "remote_write_path"?: string } & { readonly [x: string]: Schema.Json }
export const PrometheusRemoteWriteTargetJSON = Schema.StructWithRest(Schema.Struct({ "data_source_uid": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.String), "remote_write_path": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "PrometheusRemoteWriteTargetJSON" })
export type ReportDashboardID = { readonly "id"?: number, readonly "name"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const ReportDashboardID = Schema.StructWithRest(Schema.Struct({ "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "name": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ReportDashboardID" })
export type ReportTimeRange = { readonly "from"?: string, readonly "to"?: string } & { readonly [x: string]: Schema.Json }
export const ReportTimeRange = Schema.StructWithRest(Schema.Struct({ "from": Schema.optionalKey(Schema.String), "to": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ReportTimeRange" })
export type Type = string
export const Type = Schema.String.annotate({ "description": "+enum", "identifier": "Type" })
export type ReportSchedule = { readonly "dayOfMonth"?: string, readonly "endDate"?: string, readonly "frequency"?: string, readonly "intervalAmount"?: number, readonly "intervalFrequency"?: string, readonly "startDate"?: string, readonly "timeZone"?: string, readonly "workdaysOnly"?: boolean } & { readonly [x: string]: Schema.Json }
export const ReportSchedule = Schema.StructWithRest(Schema.Struct({ "dayOfMonth": Schema.optionalKey(Schema.String), "endDate": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "frequency": Schema.optionalKey(Schema.String), "intervalAmount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "intervalFrequency": Schema.optionalKey(Schema.String), "startDate": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "timeZone": Schema.optionalKey(Schema.String), "workdaysOnly": Schema.optionalKey(Schema.Boolean) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ReportSchedule" })
export type State = string
export const State = Schema.String.annotate({ "description": "+enum", "identifier": "State" })
export type ReportURLItem = { readonly "title"?: string, readonly "url"?: string } & { readonly [x: string]: Schema.Json }
export const ReportURLItem = Schema.StructWithRest(Schema.Struct({ "title": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ReportURLItem" })
export type ReportBrandingOptions = { readonly "emailFooterLink"?: string, readonly "emailFooterMode"?: string, readonly "emailFooterText"?: string, readonly "emailLogoUrl"?: string, readonly "reportLogoUrl"?: string } & { readonly [x: string]: Schema.Json }
export const ReportBrandingOptions = Schema.StructWithRest(Schema.Struct({ "emailFooterLink": Schema.optionalKey(Schema.String), "emailFooterMode": Schema.optionalKey(Schema.String), "emailFooterText": Schema.optionalKey(Schema.String), "emailLogoUrl": Schema.optionalKey(Schema.String), "reportLogoUrl": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ReportBrandingOptions" })
export type FooterItem = { readonly "color"?: string, readonly "fontSize"?: string, readonly "fontStyle"?: string, readonly "fontWeight"?: string, readonly "type"?: string, readonly "value"?: string } & { readonly [x: string]: Schema.Json }
export const FooterItem = Schema.StructWithRest(Schema.Struct({ "color": Schema.optionalKey(Schema.String), "fontSize": Schema.optionalKey(Schema.String), "fontStyle": Schema.optionalKey(Schema.String), "fontWeight": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "FooterItem" })
export type HitType = string
export const HitType = Schema.String.annotate({ "identifier": "HitType" })
export type ServiceAccountDTO = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "avatarUrl"?: string, readonly "id"?: number, readonly "isDisabled"?: boolean, readonly "isExternal"?: boolean, readonly "login"?: string, readonly "name"?: string, readonly "orgId"?: number, readonly "role"?: string, readonly "tokens"?: number, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const ServiceAccountDTO = Schema.StructWithRest(Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean).annotate({ "examples": [{ "serviceaccounts:delete": true, "serviceaccounts:read": true, "serviceaccounts:write": true }] })), "avatarUrl": Schema.optionalKey(Schema.String.annotate({ "examples": ["/avatar/85ec38023d90823d3e5b43ef35646af9"] })), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "isDisabled": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "isExternal": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "login": Schema.optionalKey(Schema.String.annotate({ "examples": ["sa-grafana"] })), "name": Schema.optionalKey(Schema.String.annotate({ "examples": ["grafana"] })), "orgId": Schema.optionalKey(Schema.Number.annotate({ "examples": [1], "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "role": Schema.optionalKey(Schema.String.annotate({ "examples": ["Viewer"] })), "tokens": Schema.optionalKey(Schema.Number.annotate({ "examples": [0], "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "uid": Schema.optionalKey(Schema.String.annotate({ "examples": ["fe1xejlha91xce"] })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "swagger: model", "identifier": "ServiceAccountDTO" })
export type TokenDTO = { readonly "created"?: string, readonly "expiration"?: string, readonly "hasExpired"?: boolean, readonly "id"?: number, readonly "isRevoked"?: boolean, readonly "lastUsedAt"?: string, readonly "name"?: string, readonly "secondsUntilExpiration"?: number } & { readonly [x: string]: Schema.Json }
export const TokenDTO = Schema.StructWithRest(Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "examples": ["2022-03-23T10:31:02Z"], "format": "date-time" })), "expiration": Schema.optionalKey(Schema.String.annotate({ "examples": ["2022-03-23T10:31:02Z"], "format": "date-time" })), "hasExpired": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "id": Schema.optionalKey(Schema.Number.annotate({ "examples": [1], "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "isRevoked": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "lastUsedAt": Schema.optionalKey(Schema.String.annotate({ "examples": ["2022-03-23T10:31:02Z"], "format": "date-time" })), "name": Schema.optionalKey(Schema.String.annotate({ "examples": ["grafana"] })), "secondsUntilExpiration": Schema.optionalKey(Schema.Number.annotate({ "examples": [0], "format": "double" }).check(Schema.isFinite().annotate({ "expected": "a finite number" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "TokenDTO" })
export type IPMask = ReadonlyArray<number>
export const IPMask = Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" }))).annotate({ "title": "An IPMask is a bitmask that can be used to manipulate\nIP addresses for IP addressing and routing.", "description": "See type [IPNet] and func [ParseCIDR] for details.", "identifier": "IPMask" })
export type ExtKeyUsage = number
export const ExtKeyUsage = Schema.Number.annotate({ "title": "ExtKeyUsage represents an extended set of actions that are valid for a given key.", "description": "Each of the ExtKeyUsage* constants define a unique action.", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "ExtKeyUsage" }))
export type ObjectIdentifier = ReadonlyArray<number>
export const ObjectIdentifier = Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))).annotate({ "title": "An ObjectIdentifier represents an ASN.1 OBJECT IDENTIFIER.", "identifier": "ObjectIdentifier" })
export type KeyUsage = number
export const KeyUsage = Schema.Number.annotate({ "description": "KeyUsage represents the set of actions that are valid for a given key. It's\na bitmap of the KeyUsage* constants.", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "KeyUsage" }))
export type PolicyMapping = { readonly "IssuerDomainPolicy"?: string, readonly "SubjectDomainPolicy"?: string } & { readonly [x: string]: Schema.Json }
export const PolicyMapping = Schema.StructWithRest(Schema.Struct({ "IssuerDomainPolicy": Schema.optionalKey(Schema.String.annotate({ "description": "IssuerDomainPolicy contains a policy OID the issuing certificate considers\nequivalent to SubjectDomainPolicy in the subject certificate." })), "SubjectDomainPolicy": Schema.optionalKey(Schema.String.annotate({ "description": "SubjectDomainPolicy contains a OID the issuing certificate considers\nequivalent to IssuerDomainPolicy in the subject certificate." })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "PolicyMapping represents a policy mapping entry in the policyMappings extension.", "identifier": "PolicyMapping" })
export type PublicKeyAlgorithm = number
export const PublicKeyAlgorithm = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "PublicKeyAlgorithm" }))
export type SignatureAlgorithm = number
export const SignatureAlgorithm = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "SignatureAlgorithm" }))
export type URL = string
export const URL = Schema.String.annotate({ "format": "url", "identifier": "URL" })
export type TeamGroupDTO = { readonly "groupId"?: string, readonly "orgId"?: number, readonly "teamId"?: number, readonly "teamUid"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const TeamGroupDTO = Schema.StructWithRest(Schema.Struct({ "groupId": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "teamId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "teamUid": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String.annotate({ "description": "Deprecated: always empty; no per-entry id." })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "TeamGroupDTO" })
export type UserProfileDTO = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "authLabels"?: ReadonlyArray<string> | null, readonly "avatarUrl"?: string, readonly "createdAt"?: string, readonly "email"?: string, readonly "id"?: number, readonly "isDisabled"?: boolean, readonly "isExternal"?: boolean, readonly "isExternallySynced"?: boolean, readonly "isGrafanaAdmin"?: boolean, readonly "isGrafanaAdminExternallySynced"?: boolean, readonly "isProvisioned"?: boolean, readonly "login"?: string, readonly "name"?: string, readonly "orgId"?: number, readonly "theme"?: string, readonly "uid"?: string, readonly "updatedAt"?: string } & { readonly [x: string]: Schema.Json }
export const UserProfileDTO = Schema.StructWithRest(Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "authLabels": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "avatarUrl": Schema.optionalKey(Schema.String), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "isDisabled": Schema.optionalKey(Schema.Boolean), "isExternal": Schema.optionalKey(Schema.Boolean), "isExternallySynced": Schema.optionalKey(Schema.Boolean), "isGrafanaAdmin": Schema.optionalKey(Schema.Boolean), "isGrafanaAdminExternallySynced": Schema.optionalKey(Schema.Boolean), "isProvisioned": Schema.optionalKey(Schema.Boolean), "login": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "theme": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "UserProfileDTO" })
export type UserOrgDTO = { readonly "name"?: string, readonly "orgId"?: number, readonly "role"?: "None" | "Viewer" | "Editor" | "Admin" } & { readonly [x: string]: Schema.Json }
export const UserOrgDTO = Schema.StructWithRest(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "role": Schema.optionalKey(Schema.Literals(["None", "Viewer", "Editor", "Admin"])) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "UserOrgDTO" })
export type UserSearchHitDTO = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "authLabels"?: ReadonlyArray<string>, readonly "avatarUrl"?: string, readonly "created"?: string, readonly "email"?: string, readonly "id"?: number, readonly "isAdmin"?: boolean, readonly "isDisabled"?: boolean, readonly "isProvisioned"?: boolean, readonly "lastSeenAt"?: string, readonly "lastSeenAtAge"?: string, readonly "login"?: string, readonly "name"?: string, readonly "role"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const UserSearchHitDTO = Schema.StructWithRest(Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "authLabels": Schema.optionalKey(Schema.Array(Schema.String)), "avatarUrl": Schema.optionalKey(Schema.String), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "isAdmin": Schema.optionalKey(Schema.Boolean), "isDisabled": Schema.optionalKey(Schema.Boolean), "isProvisioned": Schema.optionalKey(Schema.Boolean), "lastSeenAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "lastSeenAtAge": Schema.optionalKey(Schema.String), "login": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "role": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "UserSearchHitDTO" })
export type AlertRuleNotificationSettings = { readonly "active_time_intervals"?: ReadonlyArray<string>, readonly "group_by"?: ReadonlyArray<string>, readonly "group_interval"?: string, readonly "group_wait"?: string, readonly "mute_time_intervals"?: ReadonlyArray<string>, readonly "receiver": string, readonly "repeat_interval"?: string } & { readonly [x: string]: Schema.Json }
export const AlertRuleNotificationSettings = Schema.StructWithRest(Schema.Struct({ "active_time_intervals": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Override the times when notifications should not be muted. These must match the name of a mute time interval defined\nin the alertmanager configuration time_intervals section. All notifications will be suppressed unless they are sent\nat the time that matches any interval.", "examples": [["maintenance"]] })), "group_by": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Override the labels by which incoming alerts are grouped together. For example, multiple alerts coming in for\ncluster=A and alertname=LatencyHigh would be batched into a single group. To aggregate by all possible labels\nuse the special value '...' as the sole label name.\nThis effectively disables aggregation entirely, passing through all alerts as-is. This is unlikely to be what\nyou want, unless you have a very low alert volume or your upstream notification system performs its own grouping.\nMust include 'alertname' and 'grafana_folder' if not using '...'.", "default": ["alertname", "grafana_folder"], "examples": [["alertname", "grafana_folder", "cluster"]] })), "group_interval": Schema.optionalKey(Schema.String.annotate({ "description": "Override how long to wait before sending a notification about new alerts that are added to a group of alerts for\nwhich an initial notification has already been sent. (Usually ~5m or more.)", "examples": ["5m"] })), "group_wait": Schema.optionalKey(Schema.String.annotate({ "description": "Override how long to initially wait to send a notification for a group of alerts. Allows to wait for an\ninhibiting alert to arrive or collect more initial alerts for the same group. (Usually ~0s to few minutes.)", "examples": ["30s"] })), "mute_time_intervals": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Override the times when notifications should be muted. These must match the name of a mute time interval defined\nin the alertmanager configuration time_intervals section. When muted it will not send any notifications, but\notherwise acts normally.", "examples": [["maintenance"]] })), "receiver": Schema.String.annotate({ "description": "Name of the receiver to send notifications to.", "examples": ["grafana-default-email"] }), "repeat_interval": Schema.optionalKey(Schema.String.annotate({ "description": "Override how long to wait before sending a notification again if it has already been sent successfully for an\nalert. (Usually ~3h or more).\nNote that this parameter is implicitly bound by Alertmanager's `--data.retention` configuration flag.\nNotifications will be resent after either repeat_interval or the data retention period have passed, whichever\noccurs first. `repeat_interval` should not be less than `group_interval`.", "examples": ["4h"] })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "AlertRuleNotificationSettings" })
export type Provenance = string
export const Provenance = Schema.String.annotate({ "identifier": "Provenance" })
export type Record = { readonly "from": string, readonly "metric": string, readonly "target_datasource_uid"?: string } & { readonly [x: string]: Schema.Json }
export const Record = Schema.StructWithRest(Schema.Struct({ "from": Schema.String.annotate({ "description": "Which expression node should be used as the input for the recorded metric.", "examples": ["A"] }), "metric": Schema.String.annotate({ "description": "Name of the recorded metric.", "examples": ["grafana_alerts_ratio"] }), "target_datasource_uid": Schema.optionalKey(Schema.String.annotate({ "description": "Which data source should be used to write the output of the recording rule, specified by UID.", "examples": ["my-prom"] })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "Record" })
export type PublicError1 = { readonly "extra"?: { readonly [x: string]: Schema.Json }, readonly "message"?: string, readonly "messageId"?: string, readonly "statusCode"?: number } & { readonly [x: string]: Schema.Json }
export const PublicError1 = Schema.StructWithRest(Schema.Struct({ "extra": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "message": Schema.optionalKey(Schema.String), "messageId": Schema.optionalKey(Schema.String), "statusCode": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "PublicError is derived from Error and only contains information\navailable to the end user.", "identifier": "PublicError" })
export type RawMessage = { readonly [x: string]: Schema.Json }
export const RawMessage = Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "identifier": "RawMessage" })
export type RelativeTimeRangeExport = { readonly "from"?: number, readonly "to"?: number } & { readonly [x: string]: Schema.Json }
export const RelativeTimeRangeExport = Schema.StructWithRest(Schema.Struct({ "from": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "to": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "RelativeTimeRangeExport" })
export type AlertRuleNotificationSettingsExport = { readonly "active_time_intervals"?: ReadonlyArray<string>, readonly "group_by"?: ReadonlyArray<string>, readonly "group_interval"?: string, readonly "group_wait"?: string, readonly "mute_time_intervals"?: ReadonlyArray<string>, readonly "receiver"?: string, readonly "repeat_interval"?: string } & { readonly [x: string]: Schema.Json }
export const AlertRuleNotificationSettingsExport = Schema.StructWithRest(Schema.Struct({ "active_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "group_by": Schema.optionalKey(Schema.Array(Schema.String)), "group_interval": Schema.optionalKey(Schema.String), "group_wait": Schema.optionalKey(Schema.String), "mute_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "receiver": Schema.optionalKey(Schema.String), "repeat_interval": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "AlertRuleNotificationSettingsExport is the provisioned export of models.NotificationSettings.", "identifier": "AlertRuleNotificationSettingsExport" })
export type AlertRuleRecordExport = { readonly "from"?: string, readonly "metric"?: string, readonly "targetDatasourceUid"?: string } & { readonly [x: string]: Schema.Json }
export const AlertRuleRecordExport = Schema.StructWithRest(Schema.Struct({ "from": Schema.optionalKey(Schema.String), "metric": Schema.optionalKey(Schema.String), "targetDatasourceUid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "Record is the provisioned export of models.Record.", "identifier": "AlertRuleRecordExport" })
export type MuteTimeIntervalExport = { readonly "name"?: string, readonly "orgId"?: number, readonly "time_intervals"?: ReadonlyArray<TimeInterval> } & { readonly [x: string]: Schema.Json }
export const MuteTimeIntervalExport = Schema.StructWithRest(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "time_intervals": Schema.optionalKey(Schema.Array(TimeInterval)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "MuteTimeIntervalExport" })
export type MatchRegexps = { readonly [x: string]: string }
export const MatchRegexps = Schema.Record(Schema.String, Schema.String).annotate({ "title": "MatchRegexps represents a map of Regexp.", "identifier": "MatchRegexps" })
export type MatchType = number
export const MatchType = Schema.Number.annotate({ "title": "MatchType is an enum for label matching types.", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer", "identifier": "MatchType" }))
export type ObjectMatcher = ReadonlyArray<string>
export const ObjectMatcher = Schema.Array(Schema.String).annotate({ "title": "ObjectMatcher is a matcher that can be used to filter alerts.", "identifier": "ObjectMatcher" })
export type PermissionDenied = { readonly [x: string]: Schema.Json }
export const PermissionDenied = Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "identifier": "PermissionDenied" })
export type MuteTimeInterval = { readonly "name"?: string, readonly "time_intervals"?: ReadonlyArray<TimeInterval> } & { readonly [x: string]: Schema.Json }
export const MuteTimeInterval = Schema.StructWithRest(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "time_intervals": Schema.optionalKey(Schema.Array(TimeInterval)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "MuteTimeInterval represents a named set of time intervals for which a route should be muted.", "identifier": "MuteTimeInterval" })
export type NotFound = { readonly [x: string]: Schema.Json }
export const NotFound = Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "identifier": "NotFound" })
export type RoleDTO = { readonly "created": string, readonly "delegatable"?: boolean, readonly "description": string, readonly "displayName": string, readonly "global"?: boolean, readonly "group": string, readonly "hidden"?: boolean, readonly "mapped"?: boolean, readonly "name": string, readonly "permissions"?: ReadonlyArray<Permission>, readonly "uid": string, readonly "updated": string, readonly "version": number } & { readonly [x: string]: Schema.Json }
export const RoleDTO = Schema.StructWithRest(Schema.Struct({ "created": Schema.String.annotate({ "format": "date-time" }), "delegatable": Schema.optionalKey(Schema.Boolean), "description": Schema.String, "displayName": Schema.String, "global": Schema.optionalKey(Schema.Boolean), "group": Schema.String, "hidden": Schema.optionalKey(Schema.Boolean), "mapped": Schema.optionalKey(Schema.Boolean), "name": Schema.String, "permissions": Schema.optionalKey(Schema.Array(Permission)), "uid": Schema.String, "updated": Schema.String.annotate({ "format": "date-time" }), "version": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "RoleDTO" })
export type Description = { readonly "assignments"?: Assignments, readonly "permissions"?: ReadonlyArray<string> } & { readonly [x: string]: Schema.Json }
export const Description = Schema.StructWithRest(Schema.Struct({ "assignments": Schema.optionalKey(Assignments), "permissions": Schema.optionalKey(Schema.Array(Schema.String)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "Description" })
export type RelativeTimeRange = { readonly "from"?: Duration, readonly "to"?: Duration } & { readonly [x: string]: Schema.Json }
export const RelativeTimeRange = Schema.StructWithRest(Schema.Struct({ "from": Schema.optionalKey(Duration), "to": Schema.optionalKey(Duration) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "RelativeTimeRange is the per query start and end time\nfor requests.", "identifier": "RelativeTimeRange" })
export type SyncResult = { readonly "Elapsed"?: Duration, readonly "FailedUsers"?: ReadonlyArray<FailedUser>, readonly "MissingUserIds"?: ReadonlyArray<number>, readonly "Started"?: string, readonly "UpdatedUserIds"?: ReadonlyArray<number> } & { readonly [x: string]: Schema.Json }
export const SyncResult = Schema.StructWithRest(Schema.Struct({ "Elapsed": Schema.optionalKey(Duration), "FailedUsers": Schema.optionalKey(Schema.Array(FailedUser)), "MissingUserIds": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "Started": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "UpdatedUserIds": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "SyncResult holds the result of a sync with LDAP. This gives us information on which users were updated and how.", "identifier": "SyncResult" })
export type Annotation = { readonly "alertId"?: number, readonly "alertName"?: string, readonly "avatarUrl"?: string, readonly "created"?: number, readonly "dashboardId"?: number, readonly "dashboardUID"?: string, readonly "data"?: Json, readonly "email"?: string, readonly "id"?: number, readonly "login"?: string, readonly "newState"?: string, readonly "panelId"?: number, readonly "prevState"?: string, readonly "tags"?: ReadonlyArray<string>, readonly "text"?: string, readonly "time"?: number, readonly "timeEnd"?: number, readonly "updated"?: number, readonly "userId"?: number, readonly "userUID"?: string } & { readonly [x: string]: Schema.Json }
export const Annotation = Schema.StructWithRest(Schema.Struct({ "alertId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "alertName": Schema.optionalKey(Schema.String), "avatarUrl": Schema.optionalKey(Schema.String), "created": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dashboardId": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: Use DashboardUID and OrgID instead", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dashboardUID": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Json), "email": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "login": Schema.optionalKey(Schema.String), "newState": Schema.optionalKey(Schema.String), "panelId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "prevState": Schema.optionalKey(Schema.String), "tags": Schema.optionalKey(Schema.Array(Schema.String)), "text": Schema.optionalKey(Schema.String), "time": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "timeEnd": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "updated": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "userUID": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "Annotation" })
export type DashboardVersionMeta = { readonly "created"?: string, readonly "createdBy"?: string, readonly "dashboardId"?: number, readonly "data"?: Json, readonly "id"?: number, readonly "message"?: string, readonly "parentVersion"?: number, readonly "restoredFrom"?: number, readonly "uid"?: string, readonly "version"?: number } & { readonly [x: string]: Schema.Json }
export const DashboardVersionMeta = Schema.StructWithRest(Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "dashboardId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "data": Schema.optionalKey(Json), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "message": Schema.optionalKey(Schema.String), "parentVersion": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "restoredFrom": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "uid": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "DashboardVersionMeta extends the DashboardVersionDTO with the names\nassociated with the UserIds, overriding the field with the same name from\nthe DashboardVersionDTO model.", "identifier": "DashboardVersionMeta" })
export type MetricRequest = { readonly "debug"?: boolean, readonly "from": string, readonly "queries": ReadonlyArray<Json>, readonly "to": string } & { readonly [x: string]: Schema.Json }
export const MetricRequest = Schema.StructWithRest(Schema.Struct({ "debug": Schema.optionalKey(Schema.Boolean), "from": Schema.String.annotate({ "description": "From Start time in epoch timestamps in milliseconds or relative using Grafana time units.", "examples": ["now-1h"] }), "queries": Schema.Array(Json).annotate({ "description": "queries.refId – Specifies an identifier of the query. Is optional and default to “A”.\nqueries.datasourceId – Specifies the data source to be queried. Each query in the request must have an unique datasourceId.\nqueries.maxDataPoints - Species maximum amount of data points that dashboard panel can render. Is optional and default to 100.\nqueries.intervalMs - Specifies the time interval in milliseconds of time series. Is optional and defaults to 1000.", "examples": [[{ "datasource": { "uid": "PD8C576611E62080A" }, "format": "table", "intervalMs": 86400000, "maxDataPoints": 1092, "rawSql": "SELECT 1 as valueOne, 2 as valueTwo", "refId": "A" }]] }), "to": Schema.String.annotate({ "description": "To End time in epoch timestamps in milliseconds or relative using Grafana time units.", "examples": ["now"] }) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "MetricRequest" })
export type QueryHistoryDTO = { readonly "comment"?: string, readonly "createdAt"?: number, readonly "createdBy"?: number, readonly "datasourceUid"?: string, readonly "queries"?: Json, readonly "starred"?: boolean, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const QueryHistoryDTO = Schema.StructWithRest(Schema.Struct({ "comment": Schema.optionalKey(Schema.String), "createdAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "createdBy": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "datasourceUid": Schema.optionalKey(Schema.String), "queries": Schema.optionalKey(Json), "starred": Schema.optionalKey(Schema.Boolean), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "QueryHistoryDTO" })
export type EmbeddedContactPoint = { readonly "disableResolveMessage"?: boolean, readonly "name"?: string, readonly "provenance"?: string, readonly "settings": Json, readonly "type": "alertmanager" | "dingding" | "discord" | "email" | "googlechat" | "kafka" | "line" | "opsgenie" | "pagerduty" | "pushover" | "sensugo" | "slack" | "teams" | "telegram" | "threema" | "victorops" | "webhook" | "wecom", readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const EmbeddedContactPoint = Schema.StructWithRest(Schema.Struct({ "disableResolveMessage": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name is used as grouping key in the UI. Contact points with the\nsame name will be grouped in the UI.", "examples": ["webhook_1"] })), "provenance": Schema.optionalKey(Schema.String.annotate({ "readOnly": true })), "settings": Json, "type": Schema.Literals(["alertmanager", "dingding", "discord", "email", "googlechat", "kafka", "line", "opsgenie", "pagerduty", "pushover", "sensugo", "slack", "teams", "telegram", "threema", "victorops", "webhook", "wecom"]).annotate({ "examples": ["webhook"] }), "uid": Schema.optionalKey(Schema.String.annotate({ "description": "UID is the unique identifier of the contact point. The UID can be\nset by the user.", "examples": ["my_external_reference"] }).check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })).check(Schema.isMaxLength(40).annotate({ "expected": "a value with a length of at most 40" })).check(Schema.isPattern(new RegExp("^[a-zA-Z0-9\\-\\_]+$")).annotate({ "expected": "a string matching the RegExp ^[a-zA-Z0-9\\-\\_]+$" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "EmbeddedContactPoint is the contact point type that is used\nby grafanas embedded alertmanager implementation.", "identifier": "EmbeddedContactPoint" })
export type FindTagsResult = { readonly "tags"?: ReadonlyArray<TagsDTO> } & { readonly [x: string]: Schema.Json }
export const FindTagsResult = Schema.StructWithRest(Schema.Struct({ "tags": Schema.optionalKey(Schema.Array(TagsDTO)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "FindTagsResult is the result of a tags search.", "identifier": "FindTagsResult" })
export type SearchDeviceQueryResult = { readonly "devices"?: ReadonlyArray<DeviceSearchHitDTO>, readonly "page"?: number, readonly "perPage"?: number, readonly "totalCount"?: number } & { readonly [x: string]: Schema.Json }
export const SearchDeviceQueryResult = Schema.StructWithRest(Schema.Struct({ "devices": Schema.optionalKey(Schema.Array(DeviceSearchHitDTO)), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "SearchDeviceQueryResult" })
export type CloudMigrationSessionListResponseDTO = { readonly "sessions"?: ReadonlyArray<CloudMigrationSessionResponseDTO> } & { readonly [x: string]: Schema.Json }
export const CloudMigrationSessionListResponseDTO = Schema.StructWithRest(Schema.Struct({ "sessions": Schema.optionalKey(Schema.Array(CloudMigrationSessionResponseDTO)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "CloudMigrationSessionListResponseDTO" })
export type GetSnapshotResponseDTO = { readonly "created"?: string, readonly "finished"?: string, readonly "results"?: ReadonlyArray<MigrateDataResponseItemDTO>, readonly "sessionUid"?: string, readonly "stats"?: SnapshotResourceStats, readonly "status"?: "INITIALIZING" | "CREATING" | "PENDING_UPLOAD" | "UPLOADING" | "PENDING_PROCESSING" | "PROCESSING" | "FINISHED" | "CANCELED" | "ERROR" | "UNKNOWN", readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const GetSnapshotResponseDTO = Schema.StructWithRest(Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "finished": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "results": Schema.optionalKey(Schema.Array(MigrateDataResponseItemDTO)), "sessionUid": Schema.optionalKey(Schema.String), "stats": Schema.optionalKey(SnapshotResourceStats), "status": Schema.optionalKey(Schema.Literals(["INITIALIZING", "CREATING", "PENDING_UPLOAD", "UPLOADING", "PENDING_PROCESSING", "PROCESSING", "FINISHED", "CANCELED", "ERROR", "UNKNOWN"])), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "GetSnapshotResponseDTO" })
export type SnapshotListResponseDTO = { readonly "snapshots"?: ReadonlyArray<SnapshotDTO> } & { readonly [x: string]: Schema.Json }
export const SnapshotListResponseDTO = Schema.StructWithRest(Schema.Struct({ "snapshots": Schema.optionalKey(Schema.Array(SnapshotDTO)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "SnapshotListResponseDTO" })
export type ResourceDependenciesResponseDTO = { readonly "resourceDependencies"?: ReadonlyArray<ResourceDependencyDTO> } & { readonly [x: string]: Schema.Json }
export const ResourceDependenciesResponseDTO = Schema.StructWithRest(Schema.Struct({ "resourceDependencies": Schema.optionalKey(Schema.Array(ResourceDependencyDTO)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ResourceDependenciesResponseDTO" })
export type AnnotationPermission = { readonly "dashboard"?: AnnotationActions } & { readonly [x: string]: Schema.Json }
export const AnnotationPermission = Schema.StructWithRest(Schema.Struct({ "dashboard": Schema.optionalKey(AnnotationActions) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "+k8s:deepcopy-gen=true", "identifier": "AnnotationPermission" })
export type PublicDashboardListResponseWithPagination = { readonly "page"?: number, readonly "perPage"?: number, readonly "publicDashboards"?: ReadonlyArray<PublicDashboardListResponse>, readonly "totalCount"?: number } & { readonly [x: string]: Schema.Json }
export const PublicDashboardListResponseWithPagination = Schema.StructWithRest(Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "publicDashboards": Schema.optionalKey(Schema.Array(PublicDashboardListResponse)), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "PublicDashboardListResponseWithPagination" })
export type PublicDashboard = { readonly "accessToken"?: string, readonly "annotationsEnabled"?: boolean, readonly "createdAt"?: string, readonly "createdBy"?: number, readonly "dashboardUid"?: string, readonly "isEnabled"?: boolean, readonly "recipients"?: ReadonlyArray<EmailDTO>, readonly "share"?: ShareType, readonly "timeSelectionEnabled"?: boolean, readonly "uid"?: string, readonly "updatedAt"?: string, readonly "updatedBy"?: number } & { readonly [x: string]: Schema.Json }
export const PublicDashboard = Schema.StructWithRest(Schema.Struct({ "accessToken": Schema.optionalKey(Schema.String), "annotationsEnabled": Schema.optionalKey(Schema.Boolean), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dashboardUid": Schema.optionalKey(Schema.String), "isEnabled": Schema.optionalKey(Schema.Boolean), "recipients": Schema.optionalKey(Schema.Array(EmailDTO)), "share": Schema.optionalKey(ShareType), "timeSelectionEnabled": Schema.optionalKey(Schema.Boolean), "uid": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "PublicDashboard" })
export type DashboardACLInfoDTO = { readonly "created"?: string, readonly "dashboardId"?: number, readonly "folderId"?: number, readonly "folderUid"?: string, readonly "inherited"?: boolean, readonly "isFolder"?: boolean, readonly "permission"?: PermissionType, readonly "permissionName"?: string, readonly "role"?: "None" | "Viewer" | "Editor" | "Admin", readonly "slug"?: string, readonly "team"?: string, readonly "teamAvatarUrl"?: string, readonly "teamEmail"?: string, readonly "teamId"?: number, readonly "teamUid"?: string, readonly "title"?: string, readonly "uid"?: string, readonly "updated"?: string, readonly "url"?: string, readonly "userAvatarUrl"?: string, readonly "userEmail"?: string, readonly "userId"?: number, readonly "userLogin"?: string, readonly "userUid"?: string } & { readonly [x: string]: Schema.Json }
export const DashboardACLInfoDTO = Schema.StructWithRest(Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "dashboardId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "folderId": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: use FolderUID instead", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "folderUid": Schema.optionalKey(Schema.String), "inherited": Schema.optionalKey(Schema.Boolean), "isFolder": Schema.optionalKey(Schema.Boolean), "permission": Schema.optionalKey(PermissionType), "permissionName": Schema.optionalKey(Schema.String), "role": Schema.optionalKey(Schema.Literals(["None", "Viewer", "Editor", "Admin"])), "slug": Schema.optionalKey(Schema.String), "team": Schema.optionalKey(Schema.String), "teamAvatarUrl": Schema.optionalKey(Schema.String), "teamEmail": Schema.optionalKey(Schema.String), "teamId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "teamUid": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "url": Schema.optionalKey(Schema.String), "userAvatarUrl": Schema.optionalKey(Schema.String), "userEmail": Schema.optionalKey(Schema.String), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "userLogin": Schema.optionalKey(Schema.String), "userUid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "DashboardACLInfoDTO" })
export type TeamDTO = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "avatarUrl"?: string, readonly "email"?: string, readonly "externalUID"?: string, readonly "id": number, readonly "isProvisioned": boolean, readonly "memberCount": number, readonly "name": string, readonly "orgId": number, readonly "permission"?: PermissionType, readonly "uid": string } & { readonly [x: string]: Schema.Json }
export const TeamDTO = Schema.StructWithRest(Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "avatarUrl": Schema.optionalKey(Schema.String), "email": Schema.optionalKey(Schema.String), "externalUID": Schema.optionalKey(Schema.String), "id": Schema.Number.annotate({ "description": "@deprecated Use UID instead", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })), "isProvisioned": Schema.Boolean, "memberCount": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })), "name": Schema.String, "orgId": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })), "permission": Schema.optionalKey(PermissionType), "uid": Schema.String }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "TeamDTO" })
export type TeamMemberDTO = { readonly "auth_module"?: string, readonly "avatarUrl"?: string, readonly "email"?: string, readonly "labels"?: ReadonlyArray<string>, readonly "login"?: string, readonly "name"?: string, readonly "orgId"?: number, readonly "permission"?: PermissionType, readonly "teamId"?: number, readonly "teamUID"?: string, readonly "uid"?: string, readonly "userId"?: number, readonly "userUID"?: string } & { readonly [x: string]: Schema.Json }
export const TeamMemberDTO = Schema.StructWithRest(Schema.Struct({ "auth_module": Schema.optionalKey(Schema.String), "avatarUrl": Schema.optionalKey(Schema.String), "email": Schema.optionalKey(Schema.String), "labels": Schema.optionalKey(Schema.Array(Schema.String)), "login": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "permission": Schema.optionalKey(PermissionType), "teamId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "teamUID": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "userUID": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "TeamMemberDTO" })
export type DataSourceListItemDTO = { readonly "access"?: DsAccess, readonly "basicAuth"?: boolean, readonly "database"?: string, readonly "id"?: number, readonly "isDefault"?: boolean, readonly "jsonData"?: Json, readonly "name"?: string, readonly "orgId"?: number, readonly "readOnly"?: boolean, readonly "type"?: string, readonly "typeLogoUrl"?: string, readonly "typeName"?: string, readonly "uid"?: string, readonly "url"?: string, readonly "user"?: string } & { readonly [x: string]: Schema.Json }
export const DataSourceListItemDTO = Schema.StructWithRest(Schema.Struct({ "access": Schema.optionalKey(DsAccess), "basicAuth": Schema.optionalKey(Schema.Boolean), "database": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "isDefault": Schema.optionalKey(Schema.Boolean), "jsonData": Schema.optionalKey(Json), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "readOnly": Schema.optionalKey(Schema.Boolean), "type": Schema.optionalKey(Schema.String), "typeLogoUrl": Schema.optionalKey(Schema.String), "typeName": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "user": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "DataSourceListItemDTO" })
export type Transformations = ReadonlyArray<Transformation>
export const Transformations = Schema.Array(Transformation).annotate({ "identifier": "Transformations" })
export type DataSource = { readonly "access"?: DsAccess, readonly "accessControl"?: Metadata, readonly "basicAuth"?: boolean, readonly "basicAuthUser"?: string, readonly "database"?: string, readonly "id"?: number, readonly "isDefault"?: boolean, readonly "jsonData"?: Json, readonly "name"?: string, readonly "orgId"?: number, readonly "readOnly"?: boolean, readonly "secureJsonFields"?: { readonly [x: string]: boolean }, readonly "type"?: string, readonly "typeLogoUrl"?: string, readonly "uid"?: string, readonly "url"?: string, readonly "user"?: string, readonly "version"?: number, readonly "withCredentials"?: boolean } & { readonly [x: string]: Schema.Json }
export const DataSource = Schema.StructWithRest(Schema.Struct({ "access": Schema.optionalKey(DsAccess), "accessControl": Schema.optionalKey(Metadata), "basicAuth": Schema.optionalKey(Schema.Boolean), "basicAuthUser": Schema.optionalKey(Schema.String), "database": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "isDefault": Schema.optionalKey(Schema.Boolean), "jsonData": Schema.optionalKey(Json), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "readOnly": Schema.optionalKey(Schema.Boolean), "secureJsonFields": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "type": Schema.optionalKey(Schema.String), "typeLogoUrl": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "user": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "withCredentials": Schema.optionalKey(Schema.Boolean) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "DataSource" })
export type TeamLBACRules = { readonly "rules"?: ReadonlyArray<TeamLBACRule> } & { readonly [x: string]: Schema.Json }
export const TeamLBACRules = Schema.StructWithRest(Schema.Struct({ "rules": Schema.optionalKey(Schema.Array(TeamLBACRule)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "TeamLBACRules" })
export type LinkTransformationConfig = { readonly "expression"?: string, readonly "field"?: string, readonly "mapValue"?: string, readonly "type"?: SupportedTransformationTypes } & { readonly [x: string]: Schema.Json }
export const LinkTransformationConfig = Schema.StructWithRest(Schema.Struct({ "expression": Schema.optionalKey(Schema.String), "field": Schema.optionalKey(Schema.String), "mapValue": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(SupportedTransformationTypes) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "LinkTransformationConfig" })
export type ValueMappings = ReadonlyArray<ValueMapping>
export const ValueMappings = Schema.Array(ValueMapping).annotate({ "identifier": "ValueMappings" })
export type Threshold = { readonly "color"?: string, readonly "state"?: string, readonly "value"?: ConfFloat64 } & { readonly [x: string]: Schema.Json }
export const Threshold = Schema.StructWithRest(Schema.Struct({ "color": Schema.optionalKey(Schema.String), "state": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(ConfFloat64) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "Threshold a single step on the threshold list", "identifier": "Threshold" })
export type FieldTypeConfig = { readonly "enum"?: EnumFieldConfig } & { readonly [x: string]: Schema.Json }
export const FieldTypeConfig = Schema.StructWithRest(Schema.Struct({ "enum": Schema.optionalKey(EnumFieldConfig) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "FieldTypeConfig has type specific configs, only one should be active at a time", "identifier": "FieldTypeConfig" })
export type Notice = { readonly "inspect"?: InspectType, readonly "link"?: string, readonly "severity"?: NoticeSeverity, readonly "text"?: string } & { readonly [x: string]: Schema.Json }
export const Notice = Schema.StructWithRest(Schema.Struct({ "inspect": Schema.optionalKey(InspectType), "link": Schema.optionalKey(Schema.String.annotate({ "description": "Link is an optional link for display in the user interface and can be an\nabsolute URL or a path relative to Grafana's root url." })), "severity": Schema.optionalKey(NoticeSeverity), "text": Schema.optionalKey(Schema.String.annotate({ "description": "Text is freeform descriptive text for the notice." })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "Notice provides a structure for presenting notifications in Grafana's user interface.", "identifier": "Notice" })
export type FolderSearchHit = { readonly "id"?: number, readonly "managedBy"?: ManagerKind, readonly "parentUid"?: string, readonly "title"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const FolderSearchHit = Schema.StructWithRest(Schema.Struct({ "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "managedBy": Schema.optionalKey(ManagerKind), "parentUid": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "FolderSearchHit" })
export type LibraryElementDTOMeta = { readonly "connectedDashboards"?: number, readonly "created"?: string, readonly "createdBy"?: LibraryElementDTOMetaUser, readonly "folderName"?: string, readonly "folderUid"?: string, readonly "updated"?: string, readonly "updatedBy"?: LibraryElementDTOMetaUser } & { readonly [x: string]: Schema.Json }
export const LibraryElementDTOMeta = Schema.StructWithRest(Schema.Struct({ "connectedDashboards": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(LibraryElementDTOMetaUser), "folderName": Schema.optionalKey(Schema.String), "folderUid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(LibraryElementDTOMetaUser) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "LibraryElementDTOMeta is the meta information for LibraryElementDTO.", "identifier": "LibraryElementDTOMeta" })
export type LibraryElementConnectionDTO = { readonly "connectionId"?: number, readonly "connectionUid"?: string, readonly "created"?: string, readonly "createdBy"?: LibraryElementDTOMetaUser, readonly "elementId"?: number, readonly "id"?: number, readonly "kind"?: number } & { readonly [x: string]: Schema.Json }
export const LibraryElementConnectionDTO = Schema.StructWithRest(Schema.Struct({ "connectionId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "connectionUid": Schema.optionalKey(Schema.String), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(LibraryElementDTOMetaUser), "elementId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "id": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: this field will be removed in the future", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "kind": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "LibraryElementConnectionDTO is the frontend DTO for element connections.", "identifier": "LibraryElementConnectionDTO" })
export type Token = { readonly "account"?: string, readonly "anonymousRatio"?: number, readonly "company"?: string, readonly "details_url"?: string, readonly "exp"?: number, readonly "iat"?: number, readonly "included_users"?: number, readonly "iss"?: string, readonly "jti"?: string, readonly "lexp"?: number, readonly "lic_exp_warn_days"?: number, readonly "lid"?: string, readonly "limit_by"?: string, readonly "max_concurrent_user_sessions"?: number, readonly "nbf"?: number, readonly "prod"?: ReadonlyArray<string>, readonly "slug"?: string, readonly "status"?: TokenStatus, readonly "sub"?: string, readonly "tok_exp_warn_days"?: number, readonly "trial"?: boolean, readonly "trial_exp"?: number, readonly "update_days"?: number, readonly "usage_billing"?: boolean } & { readonly [x: string]: Schema.Json }
export const Token = Schema.StructWithRest(Schema.Struct({ "account": Schema.optionalKey(Schema.String), "anonymousRatio": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "company": Schema.optionalKey(Schema.String), "details_url": Schema.optionalKey(Schema.String), "exp": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "iat": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "included_users": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "iss": Schema.optionalKey(Schema.String), "jti": Schema.optionalKey(Schema.String), "lexp": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "lic_exp_warn_days": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "lid": Schema.optionalKey(Schema.String), "limit_by": Schema.optionalKey(Schema.String), "max_concurrent_user_sessions": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "nbf": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "prod": Schema.optionalKey(Schema.Array(Schema.String)), "slug": Schema.optionalKey(Schema.String), "status": Schema.optionalKey(TokenStatus), "sub": Schema.optionalKey(Schema.String), "tok_exp_warn_days": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "trial": Schema.optionalKey(Schema.Boolean), "trial_exp": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "update_days": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "usage_billing": Schema.optionalKey(Schema.Boolean) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "Token" })
export type OrgDetailsDTO = { readonly "address"?: Address, readonly "id"?: number, readonly "name"?: string } & { readonly [x: string]: Schema.Json }
export const OrgDetailsDTO = Schema.StructWithRest(Schema.Struct({ "address": Schema.optionalKey(Address), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "name": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "OrgDetailsDTO" })
export type TempUserDTO = { readonly "code"?: string, readonly "createdOn"?: string, readonly "email"?: string, readonly "emailSent"?: boolean, readonly "emailSentOn"?: string, readonly "id"?: number, readonly "invitedByEmail"?: string, readonly "invitedByLogin"?: string, readonly "invitedByName"?: string, readonly "name"?: string, readonly "orgId"?: number, readonly "role"?: "None" | "Viewer" | "Editor" | "Admin", readonly "status"?: TempUserStatus, readonly "url"?: string } & { readonly [x: string]: Schema.Json }
export const TempUserDTO = Schema.StructWithRest(Schema.Struct({ "code": Schema.optionalKey(Schema.String), "createdOn": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.optionalKey(Schema.String), "emailSent": Schema.optionalKey(Schema.Boolean), "emailSentOn": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "invitedByEmail": Schema.optionalKey(Schema.String), "invitedByLogin": Schema.optionalKey(Schema.String), "invitedByName": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "role": Schema.optionalKey(Schema.Literals(["None", "Viewer", "Editor", "Admin"])), "status": Schema.optionalKey(TempUserStatus), "url": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "TempUserDTO" })
export type PreferencesSpec = { readonly "homeDashboardUID"?: string, readonly "homeURL"?: string, readonly "language"?: string, readonly "navbar"?: PreferencesNavbarPreference, readonly "queryHistory"?: PreferencesQueryHistoryPreference, readonly "theme"?: string, readonly "timezone"?: string, readonly "weekStart"?: string } & { readonly [x: string]: Schema.Json }
export const PreferencesSpec = Schema.StructWithRest(Schema.Struct({ "homeDashboardUID": Schema.optionalKey(Schema.String.annotate({ "description": "UID for the home dashboard" })), "homeURL": Schema.optionalKey(Schema.String.annotate({ "description": "Explicit home URL (NOTE: this can only be modified in the system settings)" })), "language": Schema.optionalKey(Schema.String.annotate({ "description": "Selected language" })), "navbar": Schema.optionalKey(PreferencesNavbarPreference), "queryHistory": Schema.optionalKey(PreferencesQueryHistoryPreference), "theme": Schema.optionalKey(Schema.String.annotate({ "description": "user interface theme" })), "timezone": Schema.optionalKey(Schema.String.annotate({ "description": "The timezone selection" })), "weekStart": Schema.optionalKey(Schema.String.annotate({ "description": "day of the week (sunday, monday, etc)" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "+k8s:openapi-gen=true", "identifier": "PreferencesSpec" })
export type SearchOrgUsersQueryResult = { readonly "orgUsers"?: ReadonlyArray<OrgUserDTO>, readonly "page"?: number, readonly "perPage"?: number, readonly "totalCount"?: number } & { readonly [x: string]: Schema.Json }
export const SearchOrgUsersQueryResult = Schema.StructWithRest(Schema.Struct({ "orgUsers": Schema.optionalKey(Schema.Array(OrgUserDTO)), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "SearchOrgUsersQueryResult" })
export type Playlists = ReadonlyArray<Playlist>
export const Playlists = Schema.Array(Playlist).annotate({ "identifier": "Playlists" })
export type PlaylistDTO = { readonly "interval"?: string, readonly "items"?: ReadonlyArray<PlaylistItemDTO>, readonly "name"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const PlaylistDTO = Schema.StructWithRest(Schema.Struct({ "interval": Schema.optionalKey(Schema.String.annotate({ "description": "Interval sets the time between switching views in a playlist." })), "items": Schema.optionalKey(Schema.Array(PlaylistItemDTO).annotate({ "description": "The ordered list of items that the playlist will iterate over." })), "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name of the playlist." })), "uid": Schema.optionalKey(Schema.String.annotate({ "description": "Unique playlist identifier. Generated on creation, either by the\ncreator of the playlist of by the application." })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "PlaylistDTO" })
export type AnnotationQuery = { readonly "builtIn"?: number, readonly "datasource"?: DataSourceRef, readonly "enable"?: boolean, readonly "filter"?: AnnotationPanelFilter, readonly "hide"?: boolean, readonly "iconColor"?: string, readonly "name"?: string, readonly "placement"?: string, readonly "target"?: AnnotationTarget, readonly "type"?: string } & { readonly [x: string]: Schema.Json }
export const AnnotationQuery = Schema.StructWithRest(Schema.Struct({ "builtIn": Schema.optionalKey(Schema.Number.annotate({ "description": "Set to 1 for the standard annotation query all dashboards have by default.", "format": "double" }).check(Schema.isFinite().annotate({ "expected": "a finite number" }))), "datasource": Schema.optionalKey(DataSourceRef), "enable": Schema.optionalKey(Schema.Boolean.annotate({ "description": "When enabled the annotation query is issued with every dashboard refresh" })), "filter": Schema.optionalKey(AnnotationPanelFilter), "hide": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Annotation queries can be toggled on or off at the top of the dashboard.\nWhen hide is true, the toggle is not shown in the dashboard." })), "iconColor": Schema.optionalKey(Schema.String.annotate({ "description": "Color to use for the annotation event markers" })), "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name of annotation." })), "placement": Schema.optionalKey(Schema.String.annotate({ "description": "Placement can be used to display the annotation query somewhere else on the dashboard other than the default location." })), "target": Schema.optionalKey(AnnotationTarget), "type": Schema.optionalKey(Schema.String.annotate({ "description": "TODO -- this should not exist here, it is based on the --grafana-- datasource" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "TODO docs\nFROM: AnnotationQuery in grafana-data/src/types/annotations.ts", "identifier": "AnnotationQuery" })
export type ReportDashboard = { readonly "dashboard"?: ReportDashboardID, readonly "reportVariables"?: { readonly [x: string]: Schema.Json }, readonly "timeRange"?: ReportTimeRange } & { readonly [x: string]: Schema.Json }
export const ReportDashboard = Schema.StructWithRest(Schema.Struct({ "dashboard": Schema.optionalKey(ReportDashboardID), "reportVariables": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "timeRange": Schema.optionalKey(ReportTimeRange) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ReportDashboard" })
export type ReportOptions = { readonly "csvEncoding"?: string, readonly "layout"?: string, readonly "orientation"?: string, readonly "pdfCombineOneFile"?: boolean, readonly "pdfShowTemplateVariables"?: boolean, readonly "timeRange"?: ReportTimeRange } & { readonly [x: string]: Schema.Json }
export const ReportOptions = Schema.StructWithRest(Schema.Struct({ "csvEncoding": Schema.optionalKey(Schema.String), "layout": Schema.optionalKey(Schema.String), "orientation": Schema.optionalKey(Schema.String), "pdfCombineOneFile": Schema.optionalKey(Schema.Boolean), "pdfShowTemplateVariables": Schema.optionalKey(Schema.Boolean), "timeRange": Schema.optionalKey(ReportTimeRange) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ReportOptions" })
export type ReportSettings = { readonly "branding"?: ReportBrandingOptions, readonly "embeddedImageTheme"?: string, readonly "footerFontFamily"?: string, readonly "footerItems"?: ReadonlyArray<FooterItem>, readonly "id"?: number, readonly "orgId"?: number, readonly "pdfDashboardTitleEnabled"?: boolean, readonly "pdfHeaderEnabled"?: boolean, readonly "pdfTheme"?: string, readonly "pdfTimeRangeEnabled"?: boolean, readonly "userId"?: number } & { readonly [x: string]: Schema.Json }
export const ReportSettings = Schema.StructWithRest(Schema.Struct({ "branding": Schema.optionalKey(ReportBrandingOptions), "embeddedImageTheme": Schema.optionalKey(Schema.String), "footerFontFamily": Schema.optionalKey(Schema.String), "footerItems": Schema.optionalKey(Schema.Array(FooterItem)), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "pdfDashboardTitleEnabled": Schema.optionalKey(Schema.Boolean), "pdfHeaderEnabled": Schema.optionalKey(Schema.Boolean), "pdfTheme": Schema.optionalKey(Schema.String), "pdfTimeRangeEnabled": Schema.optionalKey(Schema.Boolean), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ReportSettings" })
export type Hit = { readonly "description"?: string, readonly "folderId"?: number, readonly "folderTitle"?: string, readonly "folderUid"?: string, readonly "folderUrl"?: string, readonly "id"?: number, readonly "isDeleted"?: boolean, readonly "isStarred"?: boolean, readonly "orgId"?: number, readonly "permanentlyDeleteDate"?: string, readonly "slug"?: string, readonly "sortMeta"?: number, readonly "sortMetaName"?: string, readonly "tags"?: ReadonlyArray<string>, readonly "title"?: string, readonly "type"?: HitType, readonly "uid"?: string, readonly "uri"?: string, readonly "url"?: string } & { readonly [x: string]: Schema.Json }
export const Hit = Schema.StructWithRest(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "folderId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "folderTitle": Schema.optionalKey(Schema.String), "folderUid": Schema.optionalKey(Schema.String), "folderUrl": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "isDeleted": Schema.optionalKey(Schema.Boolean), "isStarred": Schema.optionalKey(Schema.Boolean), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "permanentlyDeleteDate": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "slug": Schema.optionalKey(Schema.String), "sortMeta": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "sortMetaName": Schema.optionalKey(Schema.String), "tags": Schema.optionalKey(Schema.Array(Schema.String)), "title": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(HitType), "uid": Schema.optionalKey(Schema.String), "uri": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "Hit" })
export type SearchOrgServiceAccountsResult = { readonly "page"?: number, readonly "perPage"?: number, readonly "serviceAccounts"?: ReadonlyArray<ServiceAccountDTO>, readonly "totalCount"?: number } & { readonly [x: string]: Schema.Json }
export const SearchOrgServiceAccountsResult = Schema.StructWithRest(Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "serviceAccounts": Schema.optionalKey(Schema.Array(ServiceAccountDTO)), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "description": "It can be used for pagination of the user list\nE.g. if totalCount is equal to 100 users and\nthe perpage parameter is set to 10 then there are 10 pages of users.", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "swagger: model", "identifier": "SearchOrgServiceAccountsResult" })
export type IPNet = { readonly "IP"?: string, readonly "Mask"?: IPMask } & { readonly [x: string]: Schema.Json }
export const IPNet = Schema.StructWithRest(Schema.Struct({ "IP": Schema.optionalKey(Schema.String), "Mask": Schema.optionalKey(IPMask) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "An IPNet represents an IP network.", "identifier": "IPNet" })
export type Extension = { readonly "Critical"?: boolean, readonly "Id"?: ObjectIdentifier, readonly "Value"?: ReadonlyArray<number> } & { readonly [x: string]: Schema.Json }
export const Extension = Schema.StructWithRest(Schema.Struct({ "Critical": Schema.optionalKey(Schema.Boolean), "Id": Schema.optionalKey(ObjectIdentifier), "Value": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "Extension represents the ASN.1 structure of the same name. See RFC\n5280, section 4.2.", "identifier": "Extension" })
export type AttributeTypeAndValue = { readonly "Type"?: ObjectIdentifier, readonly "Value"?: Schema.Json } & { readonly [x: string]: Schema.Json }
export const AttributeTypeAndValue = Schema.StructWithRest(Schema.Struct({ "Type": Schema.optionalKey(ObjectIdentifier), "Value": Schema.optionalKey(Schema.Json.annotate({ "expected": "JSON value" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "AttributeTypeAndValue mirrors the ASN.1 structure of the same name in\nRFC 5280, Section 4.1.2.4.", "identifier": "AttributeTypeAndValue" })
export type SearchTeamGroupsQueryResult = { readonly "page"?: number, readonly "perPage"?: number, readonly "teamGroups"?: ReadonlyArray<TeamGroupDTO>, readonly "totalCount"?: number } & { readonly [x: string]: Schema.Json }
export const SearchTeamGroupsQueryResult = Schema.StructWithRest(Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "teamGroups": Schema.optionalKey(Schema.Array(TeamGroupDTO)), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "SearchTeamGroupsQueryResult" })
export type SearchUserQueryResult = { readonly "page"?: number, readonly "perPage"?: number, readonly "totalCount"?: number, readonly "users"?: ReadonlyArray<UserSearchHitDTO> } & { readonly [x: string]: Schema.Json }
export const SearchUserQueryResult = Schema.StructWithRest(Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "users": Schema.optionalKey(Schema.Array(UserSearchHitDTO)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "SearchUserQueryResult" })
export type NotificationTemplate = { readonly "name"?: string, readonly "provenance"?: Provenance, readonly "template"?: string, readonly "version"?: string } & { readonly [x: string]: Schema.Json }
export const NotificationTemplate = Schema.StructWithRest(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "provenance": Schema.optionalKey(Provenance), "template": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "NotificationTemplate" })
export type ForbiddenError = { readonly "body"?: PublicError1 } & { readonly [x: string]: Schema.Json }
export const ForbiddenError = Schema.StructWithRest(Schema.Struct({ "body": Schema.optionalKey(PublicError1) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ForbiddenError" })
export type ReceiverExport = { readonly "disableResolveMessage"?: boolean, readonly "settings"?: RawMessage, readonly "type"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const ReceiverExport = Schema.StructWithRest(Schema.Struct({ "disableResolveMessage": Schema.optionalKey(Schema.Boolean), "settings": Schema.optionalKey(RawMessage), "type": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "ReceiverExport is the provisioned file export of alerting.ReceiverV1.", "identifier": "ReceiverExport" })
export type AlertQueryExport = { readonly "datasourceUid"?: string, readonly "model"?: { readonly [x: string]: Schema.Json }, readonly "queryType"?: string, readonly "refId"?: string, readonly "relativeTimeRange"?: RelativeTimeRangeExport } & { readonly [x: string]: Schema.Json }
export const AlertQueryExport = Schema.StructWithRest(Schema.Struct({ "datasourceUid": Schema.optionalKey(Schema.String), "model": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "queryType": Schema.optionalKey(Schema.String), "refId": Schema.optionalKey(Schema.String), "relativeTimeRange": Schema.optionalKey(RelativeTimeRangeExport) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "AlertQueryExport is the provisioned export of models.AlertQuery.", "identifier": "AlertQueryExport" })
export type Matcher = { readonly "Name"?: string, readonly "Type"?: MatchType, readonly "Value"?: string } & { readonly [x: string]: Schema.Json }
export const Matcher = Schema.StructWithRest(Schema.Struct({ "Name": Schema.optionalKey(Schema.String), "Type": Schema.optionalKey(MatchType), "Value": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "Matcher models the matching of a label.", "identifier": "Matcher" })
export type ObjectMatchers = ReadonlyArray<ObjectMatcher>
export const ObjectMatchers = Schema.Array(ObjectMatcher).annotate({ "title": "ObjectMatchers is a list of matchers that can be used to filter alerts.", "identifier": "ObjectMatchers" })
export type MuteTimings = ReadonlyArray<MuteTimeInterval>
export const MuteTimings = Schema.Array(MuteTimeInterval).annotate({ "identifier": "MuteTimings" })
export type AlertQuery = { readonly "datasourceUid"?: string, readonly "model"?: { readonly [x: string]: Schema.Json }, readonly "queryType"?: string, readonly "refId"?: string, readonly "relativeTimeRange"?: RelativeTimeRange } & { readonly [x: string]: Schema.Json }
export const AlertQuery = Schema.StructWithRest(Schema.Struct({ "datasourceUid": Schema.optionalKey(Schema.String.annotate({ "description": "Grafana data source unique identifier; it should be '__expr__' for a Server Side Expression operation." })), "model": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "description": "JSON is the raw JSON query and includes the above properties as well as custom properties." })), "queryType": Schema.optionalKey(Schema.String.annotate({ "description": "QueryType is an optional identifier for the type of query.\nIt can be used to distinguish different types of queries." })), "refId": Schema.optionalKey(Schema.String.annotate({ "description": "RefID is the unique identifier of the query, set by the frontend call." })), "relativeTimeRange": Schema.optionalKey(RelativeTimeRange) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "AlertQuery represents a single query associated with an alert definition.", "identifier": "AlertQuery" })
export type ActiveSyncStatusDTO = { readonly "enabled"?: boolean, readonly "nextSync"?: string, readonly "prevSync"?: SyncResult, readonly "schedule"?: string } & { readonly [x: string]: Schema.Json }
export const ActiveSyncStatusDTO = Schema.StructWithRest(Schema.Struct({ "enabled": Schema.optionalKey(Schema.Boolean), "nextSync": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "prevSync": Schema.optionalKey(SyncResult), "schedule": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "ActiveSyncStatusDTO holds the information for LDAP background Sync", "identifier": "ActiveSyncStatusDTO" })
export type DashboardVersionResponseMeta = { readonly "continueToken"?: string, readonly "versions"?: ReadonlyArray<DashboardVersionMeta> } & { readonly [x: string]: Schema.Json }
export const DashboardVersionResponseMeta = Schema.StructWithRest(Schema.Struct({ "continueToken": Schema.optionalKey(Schema.String), "versions": Schema.optionalKey(Schema.Array(DashboardVersionMeta)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "DashboardVersionResponseMeta" })
export type QueryHistorySearchResult = { readonly "page"?: number, readonly "perPage"?: number, readonly "queryHistory"?: ReadonlyArray<QueryHistoryDTO>, readonly "totalCount"?: number } & { readonly [x: string]: Schema.Json }
export const QueryHistorySearchResult = Schema.StructWithRest(Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "queryHistory": Schema.optionalKey(Schema.Array(QueryHistoryDTO)), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "QueryHistorySearchResult" })
export type ContactPoints = ReadonlyArray<EmbeddedContactPoint>
export const ContactPoints = Schema.Array(EmbeddedContactPoint).annotate({ "identifier": "ContactPoints" })
export type GetAnnotationTagsResponse = { readonly "result"?: FindTagsResult } & { readonly [x: string]: Schema.Json }
export const GetAnnotationTagsResponse = Schema.StructWithRest(Schema.Struct({ "result": Schema.optionalKey(FindTagsResult) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "GetAnnotationTagsResponse is a response struct for FindTagsResult.", "identifier": "GetAnnotationTagsResponse" })
export type DashboardMeta = { readonly "annotationsPermissions"?: AnnotationPermission, readonly "apiVersion"?: string, readonly "canAdmin"?: boolean, readonly "canDelete"?: boolean, readonly "canEdit"?: boolean, readonly "canSave"?: boolean, readonly "canStar"?: boolean, readonly "created"?: string, readonly "createdBy"?: string, readonly "expires"?: string, readonly "folderId"?: number, readonly "folderTitle"?: string, readonly "folderUid"?: string, readonly "folderUrl"?: string, readonly "hasAcl"?: boolean, readonly "isFolder"?: boolean, readonly "isSnapshot"?: boolean, readonly "provisioned"?: boolean, readonly "provisionedExternalId"?: string, readonly "publicDashboardEnabled"?: boolean, readonly "slug"?: string, readonly "type"?: string, readonly "updated"?: string, readonly "updatedBy"?: string, readonly "url"?: string, readonly "version"?: number } & { readonly [x: string]: Schema.Json }
export const DashboardMeta = Schema.StructWithRest(Schema.Struct({ "annotationsPermissions": Schema.optionalKey(AnnotationPermission), "apiVersion": Schema.optionalKey(Schema.String), "canAdmin": Schema.optionalKey(Schema.Boolean), "canDelete": Schema.optionalKey(Schema.Boolean), "canEdit": Schema.optionalKey(Schema.Boolean), "canSave": Schema.optionalKey(Schema.Boolean), "canStar": Schema.optionalKey(Schema.Boolean), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "expires": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "folderId": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: use FolderUID instead", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "folderTitle": Schema.optionalKey(Schema.String), "folderUid": Schema.optionalKey(Schema.String), "folderUrl": Schema.optionalKey(Schema.String), "hasAcl": Schema.optionalKey(Schema.Boolean), "isFolder": Schema.optionalKey(Schema.Boolean), "isSnapshot": Schema.optionalKey(Schema.Boolean), "provisioned": Schema.optionalKey(Schema.Boolean), "provisionedExternalId": Schema.optionalKey(Schema.String), "publicDashboardEnabled": Schema.optionalKey(Schema.Boolean), "slug": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "DashboardMeta" })
export type SearchTeamQueryResult = { readonly "page"?: number, readonly "perPage"?: number, readonly "teams"?: ReadonlyArray<TeamDTO>, readonly "totalCount"?: number } & { readonly [x: string]: Schema.Json }
export const SearchTeamQueryResult = Schema.StructWithRest(Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "teams": Schema.optionalKey(Schema.Array(TeamDTO)), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "SearchTeamQueryResult" })
export type DataSourceList = ReadonlyArray<DataSourceListItemDTO>
export const DataSourceList = Schema.Array(DataSourceListItemDTO).annotate({ "identifier": "DataSourceList" })
export type CorrelationConfig = { readonly "field": string, readonly "target": { readonly [x: string]: Schema.Json }, readonly "transformations"?: Transformations, readonly "type"?: CorrelationType } & { readonly [x: string]: Schema.Json }
export const CorrelationConfig = Schema.StructWithRest(Schema.Struct({ "field": Schema.String.annotate({ "description": "Field used to attach the correlation link", "examples": ["message"] }), "target": Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "description": "Target data query", "examples": [{ "prop1": "value1", "prop2": "value" }] }), "transformations": Schema.optionalKey(Transformations), "type": Schema.optionalKey(CorrelationType) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "CorrelationConfig" })
export type InternalDataLink = { readonly "datasourceName"?: string, readonly "datasourceUid"?: string, readonly "panelsState"?: ExplorePanelsState, readonly "query"?: Schema.Json, readonly "timeRange"?: TimeRange, readonly "transformations"?: ReadonlyArray<LinkTransformationConfig> } & { readonly [x: string]: Schema.Json }
export const InternalDataLink = Schema.StructWithRest(Schema.Struct({ "datasourceName": Schema.optionalKey(Schema.String), "datasourceUid": Schema.optionalKey(Schema.String), "panelsState": Schema.optionalKey(ExplorePanelsState), "query": Schema.optionalKey(Schema.Json.annotate({ "expected": "JSON value" })), "timeRange": Schema.optionalKey(TimeRange), "transformations": Schema.optionalKey(Schema.Array(LinkTransformationConfig)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "InternalDataLink definition to allow Explore links to be constructed in the backend", "identifier": "InternalDataLink" })
export type ThresholdsConfig = { readonly "mode"?: ThresholdsMode, readonly "steps"?: ReadonlyArray<Threshold> } & { readonly [x: string]: Schema.Json }
export const ThresholdsConfig = Schema.StructWithRest(Schema.Struct({ "mode": Schema.optionalKey(ThresholdsMode), "steps": Schema.optionalKey(Schema.Array(Threshold).annotate({ "description": "Must be sorted by 'value', first value is always -Infinity" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "ThresholdsConfig setup thresholds", "identifier": "ThresholdsConfig" })
export type LibraryElementDTO = { readonly "description"?: string, readonly "folderId"?: number, readonly "folderUid"?: string, readonly "id"?: number, readonly "kind"?: number, readonly "meta"?: LibraryElementDTOMeta, readonly "model"?: { readonly [x: string]: Schema.Json }, readonly "name"?: string, readonly "orgId"?: number, readonly "schemaVersion"?: number, readonly "type"?: string, readonly "uid"?: string, readonly "version"?: number } & { readonly [x: string]: Schema.Json }
export const LibraryElementDTO = Schema.StructWithRest(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "folderId": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: use FolderUID instead", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "folderUid": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "kind": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "meta": Schema.optionalKey(LibraryElementDTOMeta), "model": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "schemaVersion": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "type": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "LibraryElementDTO is the frontend DTO for entities.", "identifier": "LibraryElementDTO" })
export type LibraryElementConnectionsResponse = { readonly "result"?: ReadonlyArray<LibraryElementConnectionDTO> } & { readonly [x: string]: Schema.Json }
export const LibraryElementConnectionsResponse = Schema.StructWithRest(Schema.Struct({ "result": Schema.optionalKey(Schema.Array(LibraryElementConnectionDTO)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "LibraryElementConnectionsResponse is a response struct for an array of LibraryElementConnectionDTO.", "identifier": "LibraryElementConnectionsResponse" })
export type AnnotationEvent = { readonly "color"?: string, readonly "dashboardId"?: number, readonly "dashboardUID"?: string, readonly "id"?: number, readonly "isRegion"?: boolean, readonly "panelId"?: number, readonly "source"?: AnnotationQuery, readonly "tags"?: ReadonlyArray<string>, readonly "text"?: string, readonly "time"?: number, readonly "timeEnd"?: number } & { readonly [x: string]: Schema.Json }
export const AnnotationEvent = Schema.StructWithRest(Schema.Struct({ "color": Schema.optionalKey(Schema.String), "dashboardId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dashboardUID": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "isRegion": Schema.optionalKey(Schema.Boolean), "panelId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "source": Schema.optionalKey(AnnotationQuery), "tags": Schema.optionalKey(Schema.Array(Schema.String)), "text": Schema.optionalKey(Schema.String), "time": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "timeEnd": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "AnnotationEvent" })
export type Report = { readonly "created"?: string, readonly "dashboards"?: ReadonlyArray<ReportDashboard>, readonly "enableCsv"?: boolean, readonly "enableDashboardUrl"?: boolean, readonly "formats"?: ReadonlyArray<Type>, readonly "id"?: number, readonly "message"?: string, readonly "name"?: string, readonly "options"?: ReportOptions, readonly "orgId"?: number, readonly "recipients"?: string, readonly "replyTo"?: string, readonly "scaleFactor"?: number, readonly "schedule"?: ReportSchedule, readonly "state"?: State, readonly "subject"?: string, readonly "uid"?: string, readonly "updated"?: string, readonly "urls"?: ReadonlyArray<ReportURLItem>, readonly "userId"?: number } & { readonly [x: string]: Schema.Json }
export const Report = Schema.StructWithRest(Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "dashboards": Schema.optionalKey(Schema.Array(ReportDashboard)), "enableCsv": Schema.optionalKey(Schema.Boolean), "enableDashboardUrl": Schema.optionalKey(Schema.Boolean), "formats": Schema.optionalKey(Schema.Array(Type)), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "message": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "options": Schema.optionalKey(ReportOptions), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "recipients": Schema.optionalKey(Schema.String), "replyTo": Schema.optionalKey(Schema.String), "scaleFactor": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "schedule": Schema.optionalKey(ReportSchedule), "state": Schema.optionalKey(State), "subject": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "urls": Schema.optionalKey(Schema.Array(ReportURLItem)), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "Report" })
export type HitList = ReadonlyArray<Hit>
export const HitList = Schema.Array(Hit).annotate({ "identifier": "HitList" })
export type Name = { readonly "Country"?: ReadonlyArray<string>, readonly "ExtraNames"?: ReadonlyArray<AttributeTypeAndValue>, readonly "Locality"?: ReadonlyArray<string>, readonly "Names"?: ReadonlyArray<AttributeTypeAndValue>, readonly "SerialNumber"?: string, readonly "StreetAddress"?: ReadonlyArray<string> } & { readonly [x: string]: Schema.Json }
export const Name = Schema.StructWithRest(Schema.Struct({ "Country": Schema.optionalKey(Schema.Array(Schema.String)), "ExtraNames": Schema.optionalKey(Schema.Array(AttributeTypeAndValue).annotate({ "description": "ExtraNames contains attributes to be copied, raw, into any marshaled\ndistinguished names. Values override any attributes with the same OID.\nThe ExtraNames field is not populated when parsing, see Names." })), "Locality": Schema.optionalKey(Schema.Array(Schema.String)), "Names": Schema.optionalKey(Schema.Array(AttributeTypeAndValue).annotate({ "description": "Names contains all parsed attributes. When parsing distinguished names,\nthis can be used to extract non-standard attributes that are not parsed\nby this package. When marshaling to RDNSequences, the Names field is\nignored, see ExtraNames." })), "SerialNumber": Schema.optionalKey(Schema.String), "StreetAddress": Schema.optionalKey(Schema.Array(Schema.String)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "Name represents an X.509 distinguished name. This only includes the common\nelements of a DN. Note that Name is only an approximation of the X.509\nstructure. If an accurate representation is needed, asn1.Unmarshal the raw\nsubject or issuer as an [RDNSequence].", "identifier": "Name" })
export type NotificationTemplates = ReadonlyArray<NotificationTemplate>
export const NotificationTemplates = Schema.Array(NotificationTemplate).annotate({ "identifier": "NotificationTemplates" })
export type ContactPointExport = { readonly "name"?: string, readonly "orgId"?: number, readonly "receivers"?: ReadonlyArray<ReceiverExport> } & { readonly [x: string]: Schema.Json }
export const ContactPointExport = Schema.StructWithRest(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "receivers": Schema.optionalKey(Schema.Array(ReceiverExport)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "ContactPointExport is the provisioned file export of alerting.ContactPointV1.", "identifier": "ContactPointExport" })
export type AlertRuleExport = { readonly "annotations"?: { readonly [x: string]: string }, readonly "condition"?: string, readonly "dashboardUid"?: string, readonly "data"?: ReadonlyArray<AlertQueryExport>, readonly "execErrState"?: "OK" | "Alerting" | "Error", readonly "for"?: Duration, readonly "isPaused"?: boolean, readonly "keepFiringFor"?: Duration, readonly "labels"?: { readonly [x: string]: string }, readonly "missing_series_evals_to_resolve"?: number, readonly "noDataState"?: "Alerting" | "NoData" | "OK", readonly "notification_settings"?: AlertRuleNotificationSettingsExport, readonly "panelId"?: number, readonly "record"?: AlertRuleRecordExport, readonly "title"?: string, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const AlertRuleExport = Schema.StructWithRest(Schema.Struct({ "annotations": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "condition": Schema.optionalKey(Schema.String), "dashboardUid": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Array(AlertQueryExport)), "execErrState": Schema.optionalKey(Schema.Literals(["OK", "Alerting", "Error"])), "for": Schema.optionalKey(Duration), "isPaused": Schema.optionalKey(Schema.Boolean), "keepFiringFor": Schema.optionalKey(Duration), "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "missing_series_evals_to_resolve": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "noDataState": Schema.optionalKey(Schema.Literals(["Alerting", "NoData", "OK"])), "notification_settings": Schema.optionalKey(AlertRuleNotificationSettingsExport), "panelId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "record": Schema.optionalKey(AlertRuleRecordExport), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "AlertRuleExport is the provisioned file export of models.AlertRule.", "identifier": "AlertRuleExport" })
export type Matchers = ReadonlyArray<Matcher>
export const Matchers = Schema.Array(Matcher).annotate({ "description": "Matchers is a slice of Matchers that is sortable, implements Stringer, and\nprovides a Matches method to match a LabelSet against all Matchers in the\nslice. Note that some users of Matchers might require it to be sorted.", "identifier": "Matchers" })
export type ProvisionedAlertRule = { readonly "annotations"?: { readonly [x: string]: string }, readonly "condition": string, readonly "data": ReadonlyArray<AlertQuery>, readonly "execErrState": "OK" | "Alerting" | "Error", readonly "folderUID": string, readonly "for": string, readonly "id"?: number, readonly "isPaused"?: boolean, readonly "keep_firing_for"?: string, readonly "labels"?: { readonly [x: string]: string }, readonly "missingSeriesEvalsToResolve"?: number, readonly "noDataState": "Alerting" | "NoData" | "OK", readonly "notification_settings"?: AlertRuleNotificationSettings, readonly "orgID": number, readonly "provenance"?: Provenance, readonly "record"?: Record, readonly "ruleGroup": string, readonly "title": string, readonly "uid"?: string, readonly "updated"?: string } & { readonly [x: string]: Schema.Json }
export const ProvisionedAlertRule = Schema.StructWithRest(Schema.Struct({ "annotations": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "examples": [{ "runbook_url": "https://supercoolrunbook.com/page/13" }] })), "condition": Schema.String.annotate({ "examples": ["A"] }), "data": Schema.Array(AlertQuery).annotate({ "examples": [[{ "datasourceUid": "__expr__", "model": { "conditions": [{ "evaluator": { "params": [0, 0], "type": "gt" }, "operator": { "type": "and" }, "query": { "params": [] }, "reducer": { "params": [], "type": "avg" }, "type": "query" }], "datasource": { "type": "__expr__", "uid": "__expr__" }, "expression": "1 == 1", "hide": false, "intervalMs": 1000, "maxDataPoints": 43200, "refId": "A", "type": "math" }, "queryType": "", "refId": "A", "relativeTimeRange": { "from": 0, "to": 0 } }]] }), "execErrState": Schema.Literals(["OK", "Alerting", "Error"]), "folderUID": Schema.String.annotate({ "examples": ["project_x"] }), "for": Schema.String.annotate({ "format": "duration" }), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "isPaused": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "keep_firing_for": Schema.optionalKey(Schema.String.annotate({ "format": "duration" })), "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "examples": [{ "team": "sre-team-1" }] })), "missingSeriesEvalsToResolve": Schema.optionalKey(Schema.Number.annotate({ "examples": [2], "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "noDataState": Schema.Literals(["Alerting", "NoData", "OK"]), "notification_settings": Schema.optionalKey(AlertRuleNotificationSettings), "orgID": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })), "provenance": Schema.optionalKey(Provenance), "record": Schema.optionalKey(Record), "ruleGroup": Schema.String.annotate({ "examples": ["eval_group_1"] }).check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })).check(Schema.isMaxLength(190).annotate({ "expected": "a value with a length of at most 190" })), "title": Schema.String.annotate({ "examples": ["Always firing"] }).check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })).check(Schema.isMaxLength(190).annotate({ "expected": "a value with a length of at most 190" })), "uid": Schema.optionalKey(Schema.String.check(Schema.isMinLength(1).annotate({ "expected": "a value with a length of at least 1" })).check(Schema.isMaxLength(40).annotate({ "expected": "a value with a length of at most 40" })).check(Schema.isPattern(new RegExp("^[a-zA-Z0-9-_]+$")).annotate({ "expected": "a string matching the RegExp ^[a-zA-Z0-9-_]+$" }))), "updated": Schema.optionalKey(Schema.String.annotate({ "readOnly": true, "format": "date-time" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "ProvisionedAlertRule" })
export type QueryHistorySearchResponse = { readonly "result"?: QueryHistorySearchResult } & { readonly [x: string]: Schema.Json }
export const QueryHistorySearchResponse = Schema.StructWithRest(Schema.Struct({ "result": Schema.optionalKey(QueryHistorySearchResult) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "QueryHistorySearchResponse" })
export type GetHomeDashboardResponse = { readonly "dashboard"?: Json, readonly "meta"?: DashboardMeta, readonly "redirectUri"?: string } & { readonly [x: string]: Schema.Json }
export const GetHomeDashboardResponse = Schema.StructWithRest(Schema.Struct({ "dashboard": Schema.optionalKey(Json), "meta": Schema.optionalKey(DashboardMeta), "redirectUri": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "Get home dashboard response.", "identifier": "GetHomeDashboardResponse" })
export type DashboardFullWithMeta = { readonly "dashboard"?: Json, readonly "meta"?: DashboardMeta } & { readonly [x: string]: Schema.Json }
export const DashboardFullWithMeta = Schema.StructWithRest(Schema.Struct({ "dashboard": Schema.optionalKey(Json), "meta": Schema.optionalKey(DashboardMeta) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "DashboardFullWithMeta" })
export type Correlation = { readonly "config"?: CorrelationConfig, readonly "description"?: string, readonly "label"?: string, readonly "orgId"?: number, readonly "provisioned"?: boolean, readonly "sourceUID"?: string, readonly "targetUID"?: string, readonly "type"?: CorrelationType, readonly "uid"?: string } & { readonly [x: string]: Schema.Json }
export const Correlation = Schema.StructWithRest(Schema.Struct({ "config": Schema.optionalKey(CorrelationConfig), "description": Schema.optionalKey(Schema.String.annotate({ "description": "Description of the correlation", "examples": ["Logs to Traces"] })), "label": Schema.optionalKey(Schema.String.annotate({ "description": "Label identifying the correlation", "examples": ["My Label"] })), "orgId": Schema.optionalKey(Schema.Number.annotate({ "description": "OrgID of the data source the correlation originates from", "examples": [1], "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "provisioned": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Provisioned True if the correlation was created during provisioning" })), "sourceUID": Schema.optionalKey(Schema.String.annotate({ "description": "UID of the data source the correlation originates from", "examples": ["d0oxYRg4z"] })), "targetUID": Schema.optionalKey(Schema.String.annotate({ "description": "UID of the data source the correlation points to", "examples": ["PE1C5CBDA0504A6A3"] })), "type": Schema.optionalKey(CorrelationType), "uid": Schema.optionalKey(Schema.String.annotate({ "description": "Unique identifier of the correlation", "examples": ["50xhMlg9k"] })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "Correlation is the model for correlations definitions", "identifier": "Correlation" })
export type DataLink = { readonly "internal"?: InternalDataLink, readonly "targetBlank"?: boolean, readonly "title"?: string, readonly "url"?: string } & { readonly [x: string]: Schema.Json }
export const DataLink = Schema.StructWithRest(Schema.Struct({ "internal": Schema.optionalKey(InternalDataLink), "targetBlank": Schema.optionalKey(Schema.Boolean), "title": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "DataLink define what", "identifier": "DataLink" })
export type LibraryElementSearchResult = { readonly "elements"?: ReadonlyArray<LibraryElementDTO>, readonly "page"?: number, readonly "perPage"?: number, readonly "totalCount"?: number } & { readonly [x: string]: Schema.Json }
export const LibraryElementSearchResult = Schema.StructWithRest(Schema.Struct({ "elements": Schema.optionalKey(Schema.Array(LibraryElementDTO)), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "LibraryElementSearchResult is the search result for entities.", "identifier": "LibraryElementSearchResult" })
export type LibraryElementArrayResponse = { readonly "result"?: ReadonlyArray<LibraryElementDTO> } & { readonly [x: string]: Schema.Json }
export const LibraryElementArrayResponse = Schema.StructWithRest(Schema.Struct({ "result": Schema.optionalKey(Schema.Array(LibraryElementDTO)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "LibraryElementArrayResponse is a response struct for an array of LibraryElementDTO.", "identifier": "LibraryElementArrayResponse" })
export type LibraryElementResponse = { readonly "result"?: LibraryElementDTO } & { readonly [x: string]: Schema.Json }
export const LibraryElementResponse = Schema.StructWithRest(Schema.Struct({ "result": Schema.optionalKey(LibraryElementDTO) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "LibraryElementResponse is a response struct for LibraryElementDTO.", "identifier": "LibraryElementResponse" })
export type Certificate = { readonly "AuthorityKeyId"?: ReadonlyArray<number>, readonly "BasicConstraintsValid"?: boolean, readonly "CRLDistributionPoints"?: ReadonlyArray<string>, readonly "DNSNames"?: ReadonlyArray<string>, readonly "EmailAddresses"?: ReadonlyArray<string>, readonly "ExcludedDNSDomains"?: ReadonlyArray<string>, readonly "ExcludedEmailAddresses"?: ReadonlyArray<string>, readonly "ExcludedIPRanges"?: ReadonlyArray<IPNet>, readonly "ExcludedURIDomains"?: ReadonlyArray<string>, readonly "ExtKeyUsage"?: ReadonlyArray<ExtKeyUsage>, readonly "Extensions"?: ReadonlyArray<Extension>, readonly "ExtraExtensions"?: ReadonlyArray<Extension>, readonly "IPAddresses"?: ReadonlyArray<string>, readonly "InhibitAnyPolicy"?: number, readonly "InhibitAnyPolicyZero"?: boolean, readonly "InhibitPolicyMapping"?: number, readonly "InhibitPolicyMappingZero"?: boolean, readonly "IsCA"?: boolean, readonly "Issuer"?: Name, readonly "IssuingCertificateURL"?: ReadonlyArray<string>, readonly "KeyUsage"?: KeyUsage, readonly "MaxPathLen"?: number, readonly "MaxPathLenZero"?: boolean, readonly "NotBefore"?: string, readonly "OCSPServer"?: ReadonlyArray<string>, readonly "PermittedDNSDomains"?: ReadonlyArray<string>, readonly "PermittedDNSDomainsCritical"?: boolean, readonly "PermittedEmailAddresses"?: ReadonlyArray<string>, readonly "PermittedIPRanges"?: ReadonlyArray<IPNet>, readonly "PermittedURIDomains"?: ReadonlyArray<string>, readonly "Policies"?: ReadonlyArray<string>, readonly "PolicyIdentifiers"?: ReadonlyArray<ObjectIdentifier>, readonly "PolicyMappings"?: ReadonlyArray<PolicyMapping>, readonly "PublicKey"?: Schema.Json, readonly "PublicKeyAlgorithm"?: PublicKeyAlgorithm, readonly "Raw"?: ReadonlyArray<number>, readonly "RawIssuer"?: ReadonlyArray<number>, readonly "RawSubject"?: ReadonlyArray<number>, readonly "RawSubjectPublicKeyInfo"?: ReadonlyArray<number>, readonly "RawTBSCertificate"?: ReadonlyArray<number>, readonly "RequireExplicitPolicy"?: number, readonly "RequireExplicitPolicyZero"?: boolean, readonly "SerialNumber"?: string, readonly "Signature"?: ReadonlyArray<number>, readonly "SignatureAlgorithm"?: SignatureAlgorithm, readonly "Subject"?: Name, readonly "SubjectKeyId"?: ReadonlyArray<number>, readonly "URIs"?: ReadonlyArray<URL>, readonly "UnhandledCriticalExtensions"?: ReadonlyArray<ObjectIdentifier>, readonly "UnknownExtKeyUsage"?: ReadonlyArray<ObjectIdentifier>, readonly "Version"?: number } & { readonly [x: string]: Schema.Json }
export const Certificate = Schema.StructWithRest(Schema.Struct({ "AuthorityKeyId": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "BasicConstraintsValid": Schema.optionalKey(Schema.Boolean.annotate({ "description": "BasicConstraintsValid indicates whether IsCA, MaxPathLen,\nand MaxPathLenZero are valid." })), "CRLDistributionPoints": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "CRL Distribution Points" })), "DNSNames": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Subject Alternate Name values. (Note that these values may not be valid\nif invalid values were contained within a parsed certificate. For\nexample, an element of DNSNames may not be a valid DNS domain name.)" })), "EmailAddresses": Schema.optionalKey(Schema.Array(Schema.String)), "ExcludedDNSDomains": Schema.optionalKey(Schema.Array(Schema.String)), "ExcludedEmailAddresses": Schema.optionalKey(Schema.Array(Schema.String)), "ExcludedIPRanges": Schema.optionalKey(Schema.Array(IPNet)), "ExcludedURIDomains": Schema.optionalKey(Schema.Array(Schema.String)), "ExtKeyUsage": Schema.optionalKey(Schema.Array(ExtKeyUsage)), "Extensions": Schema.optionalKey(Schema.Array(Extension).annotate({ "description": "Extensions contains raw X.509 extensions. When parsing certificates,\nthis can be used to extract non-critical extensions that are not\nparsed by this package. When marshaling certificates, the Extensions\nfield is ignored, see ExtraExtensions." })), "ExtraExtensions": Schema.optionalKey(Schema.Array(Extension).annotate({ "description": "ExtraExtensions contains extensions to be copied, raw, into any\nmarshaled certificates. Values override any extensions that would\notherwise be produced based on the other fields. The ExtraExtensions\nfield is not populated when parsing certificates, see Extensions." })), "IPAddresses": Schema.optionalKey(Schema.Array(Schema.String)), "InhibitAnyPolicy": Schema.optionalKey(Schema.Number.annotate({ "description": "InhibitAnyPolicy and InhibitAnyPolicyZero indicate the presence and value\nof the inhibitAnyPolicy extension.\n\nThe value of InhibitAnyPolicy indicates the number of additional\ncertificates in the path after this certificate that may use the\nanyPolicy policy OID to indicate a match with any other policy.\n\nWhen parsing a certificate, a positive non-zero InhibitAnyPolicy means\nthat the field was specified, -1 means it was unset, and\nInhibitAnyPolicyZero being true mean that the field was explicitly set to\nzero. The case of InhibitAnyPolicy==0 with InhibitAnyPolicyZero==false\nshould be treated equivalent to -1 (unset).", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "InhibitAnyPolicyZero": Schema.optionalKey(Schema.Boolean.annotate({ "description": "InhibitAnyPolicyZero indicates that InhibitAnyPolicy==0 should be\ninterpreted as an actual maximum path length of zero. Otherwise, that\ncombination is interpreted as InhibitAnyPolicy not being set." })), "InhibitPolicyMapping": Schema.optionalKey(Schema.Number.annotate({ "description": "InhibitPolicyMapping and InhibitPolicyMappingZero indicate the presence\nand value of the inhibitPolicyMapping field of the policyConstraints\nextension.\n\nThe value of InhibitPolicyMapping indicates the number of additional\ncertificates in the path after this certificate that may use policy\nmapping.\n\nWhen parsing a certificate, a positive non-zero InhibitPolicyMapping\nmeans that the field was specified, -1 means it was unset, and\nInhibitPolicyMappingZero being true mean that the field was explicitly\nset to zero. The case of InhibitPolicyMapping==0 with\nInhibitPolicyMappingZero==false should be treated equivalent to -1\n(unset).", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "InhibitPolicyMappingZero": Schema.optionalKey(Schema.Boolean.annotate({ "description": "InhibitPolicyMappingZero indicates that InhibitPolicyMapping==0 should be\ninterpreted as an actual maximum path length of zero. Otherwise, that\ncombination is interpreted as InhibitAnyPolicy not being set." })), "IsCA": Schema.optionalKey(Schema.Boolean), "Issuer": Schema.optionalKey(Name), "IssuingCertificateURL": Schema.optionalKey(Schema.Array(Schema.String)), "KeyUsage": Schema.optionalKey(KeyUsage), "MaxPathLen": Schema.optionalKey(Schema.Number.annotate({ "description": "MaxPathLen and MaxPathLenZero indicate the presence and\nvalue of the BasicConstraints' \"pathLenConstraint\".\n\nWhen parsing a certificate, a positive non-zero MaxPathLen\nmeans that the field was specified, -1 means it was unset,\nand MaxPathLenZero being true mean that the field was\nexplicitly set to zero. The case of MaxPathLen==0 with MaxPathLenZero==false\nshould be treated equivalent to -1 (unset).\n\nWhen generating a certificate, an unset pathLenConstraint\ncan be requested with either MaxPathLen == -1 or using the\nzero value for both MaxPathLen and MaxPathLenZero.", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "MaxPathLenZero": Schema.optionalKey(Schema.Boolean.annotate({ "description": "MaxPathLenZero indicates that BasicConstraintsValid==true\nand MaxPathLen==0 should be interpreted as an actual\nmaximum path length of zero. Otherwise, that combination is\ninterpreted as MaxPathLen not being set." })), "NotBefore": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "OCSPServer": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "RFC 5280, 4.2.2.1 (Authority Information Access)" })), "PermittedDNSDomains": Schema.optionalKey(Schema.Array(Schema.String)), "PermittedDNSDomainsCritical": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Name constraints" })), "PermittedEmailAddresses": Schema.optionalKey(Schema.Array(Schema.String)), "PermittedIPRanges": Schema.optionalKey(Schema.Array(IPNet)), "PermittedURIDomains": Schema.optionalKey(Schema.Array(Schema.String)), "Policies": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Policies contains all policy identifiers included in the certificate.\nSee CreateCertificate for context about how this field and the PolicyIdentifiers field\ninteract.\nIn Go 1.22, encoding/gob cannot handle and ignores this field." })), "PolicyIdentifiers": Schema.optionalKey(Schema.Array(ObjectIdentifier).annotate({ "description": "PolicyIdentifiers contains asn1.ObjectIdentifiers, the components\nof which are limited to int32. If a certificate contains a policy which\ncannot be represented by asn1.ObjectIdentifier, it will not be included in\nPolicyIdentifiers, but will be present in Policies, which contains all parsed\npolicy OIDs.\nSee CreateCertificate for context about how this field and the Policies field\ninteract." })), "PolicyMappings": Schema.optionalKey(Schema.Array(PolicyMapping).annotate({ "description": "PolicyMappings contains a list of policy mappings included in the certificate." })), "PublicKey": Schema.optionalKey(Schema.Json.annotate({ "expected": "JSON value" })), "PublicKeyAlgorithm": Schema.optionalKey(PublicKeyAlgorithm), "Raw": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "RawIssuer": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "RawSubject": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "RawSubjectPublicKeyInfo": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "RawTBSCertificate": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "RequireExplicitPolicy": Schema.optionalKey(Schema.Number.annotate({ "description": "RequireExplicitPolicy and RequireExplicitPolicyZero indicate the presence\nand value of the requireExplicitPolicy field of the policyConstraints\nextension.\n\nThe value of RequireExplicitPolicy indicates the number of additional\ncertificates in the path after this certificate before an explicit policy\nis required for the rest of the path. When an explicit policy is required,\neach subsequent certificate in the path must contain a required policy OID,\nor a policy OID which has been declared as equivalent through the policy\nmapping extension.\n\nWhen parsing a certificate, a positive non-zero RequireExplicitPolicy\nmeans that the field was specified, -1 means it was unset, and\nRequireExplicitPolicyZero being true mean that the field was explicitly\nset to zero. The case of RequireExplicitPolicy==0 with\nRequireExplicitPolicyZero==false should be treated equivalent to -1\n(unset).", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "RequireExplicitPolicyZero": Schema.optionalKey(Schema.Boolean.annotate({ "description": "RequireExplicitPolicyZero indicates that RequireExplicitPolicy==0 should be\ninterpreted as an actual maximum path length of zero. Otherwise, that\ncombination is interpreted as InhibitAnyPolicy not being set." })), "SerialNumber": Schema.optionalKey(Schema.String), "Signature": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "SignatureAlgorithm": Schema.optionalKey(SignatureAlgorithm), "Subject": Schema.optionalKey(Name), "SubjectKeyId": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "URIs": Schema.optionalKey(Schema.Array(URL)), "UnhandledCriticalExtensions": Schema.optionalKey(Schema.Array(ObjectIdentifier).annotate({ "description": "UnhandledCriticalExtensions contains a list of extension IDs that\nwere not (fully) processed when parsing. Verify will fail if this\nslice is non-empty, unless verification is delegated to an OS\nlibrary which understands all the critical extensions.\n\nUsers can access these extensions using Extensions and can remove\nelements from this slice if they believe that they have been\nhandled." })), "UnknownExtKeyUsage": Schema.optionalKey(Schema.Array(ObjectIdentifier)), "Version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "A Certificate represents an X.509 certificate.", "identifier": "Certificate" })
export type AlertRuleGroupExport = { readonly "folder"?: string, readonly "interval"?: Duration, readonly "name"?: string, readonly "orgId"?: number, readonly "rules"?: ReadonlyArray<AlertRuleExport> } & { readonly [x: string]: Schema.Json }
export const AlertRuleGroupExport = Schema.StructWithRest(Schema.Struct({ "folder": Schema.optionalKey(Schema.String), "interval": Schema.optionalKey(Duration), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "rules": Schema.optionalKey(Schema.Array(AlertRuleExport)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "AlertRuleGroupExport is the provisioned file export of AlertRuleGroupV1.", "identifier": "AlertRuleGroupExport" })
export type NotificationPolicyExport = { readonly "active_time_intervals"?: ReadonlyArray<string>, readonly "continue"?: boolean, readonly "group_by"?: ReadonlyArray<string>, readonly "group_interval"?: string, readonly "group_wait"?: string, readonly "match"?: { readonly [x: string]: string }, readonly "match_re"?: MatchRegexps, readonly "matchers"?: Matchers, readonly "mute_time_intervals"?: ReadonlyArray<string>, readonly "object_matchers"?: ObjectMatchers, readonly "orgId"?: number, readonly "receiver"?: string, readonly "repeat_interval"?: string, readonly "routes"?: ReadonlyArray<RouteExport> } & { readonly [x: string]: Schema.Json }
export const NotificationPolicyExport = Schema.StructWithRest(Schema.Struct({ "active_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "continue": Schema.optionalKey(Schema.Boolean), "group_by": Schema.optionalKey(Schema.Array(Schema.String)), "group_interval": Schema.optionalKey(Schema.String), "group_wait": Schema.optionalKey(Schema.String), "match": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "description": "Deprecated. Remove before v1.0 release." })), "match_re": Schema.optionalKey(MatchRegexps), "matchers": Schema.optionalKey(Matchers), "mute_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "object_matchers": Schema.optionalKey(ObjectMatchers), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "receiver": Schema.optionalKey(Schema.String), "repeat_interval": Schema.optionalKey(Schema.String), "routes": Schema.optionalKey(Schema.Array(RouteExport)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "NotificationPolicyExport is the provisioned file export of alerting.NotificiationPolicyV1.", "identifier": "NotificationPolicyExport" })
export type ProvisionedAlertRules = ReadonlyArray<ProvisionedAlertRule>
export const ProvisionedAlertRules = Schema.Array(ProvisionedAlertRule).annotate({ "identifier": "ProvisionedAlertRules" })
export type AlertRuleGroup = { readonly "folderUid"?: string, readonly "interval"?: number, readonly "rules"?: ReadonlyArray<ProvisionedAlertRule>, readonly "title"?: string } & { readonly [x: string]: Schema.Json }
export const AlertRuleGroup = Schema.StructWithRest(Schema.Struct({ "folderUid": Schema.optionalKey(Schema.String), "interval": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "rules": Schema.optionalKey(Schema.Array(ProvisionedAlertRule)), "title": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "AlertRuleGroup" })
export type FieldConfig = { readonly "color"?: { readonly [x: string]: Schema.Json }, readonly "custom"?: { readonly [x: string]: Schema.Json }, readonly "decimals"?: number, readonly "description"?: string, readonly "displayName"?: string, readonly "displayNameFromDS"?: string, readonly "filterable"?: boolean, readonly "interval"?: number, readonly "links"?: ReadonlyArray<DataLink>, readonly "mappings"?: ValueMappings, readonly "max"?: ConfFloat64, readonly "min"?: ConfFloat64, readonly "noValue"?: string, readonly "path"?: string, readonly "thresholds"?: ThresholdsConfig, readonly "type"?: FieldTypeConfig, readonly "unit"?: string, readonly "writeable"?: boolean } & { readonly [x: string]: Schema.Json }
export const FieldConfig = Schema.StructWithRest(Schema.Struct({ "color": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "description": "Map values to a display color\nNOTE: this interface is under development in the frontend... so simple map for now" })), "custom": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "description": "Panel Specific Values" })), "decimals": Schema.optionalKey(Schema.Number.annotate({ "format": "uint16" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "description": Schema.optionalKey(Schema.String.annotate({ "description": "Description is human readable field metadata" })), "displayName": Schema.optionalKey(Schema.String.annotate({ "description": "DisplayName overrides Grafana default naming, should not be used from a data source" })), "displayNameFromDS": Schema.optionalKey(Schema.String.annotate({ "description": "DisplayNameFromDS overrides Grafana default naming strategy." })), "filterable": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Filterable indicates if the Field's data can be filtered by additional calls." })), "interval": Schema.optionalKey(Schema.Number.annotate({ "description": "Interval indicates the expected regular step between values in the series.\nWhen an interval exists, consumers can identify \"missing\" values when the expected value is not present.\nThe grafana timeseries visualization will render disconnected values when missing values are found it the time field.\nThe interval uses the same units as the values.  For time.Time, this is defined in milliseconds.", "format": "double" }).check(Schema.isFinite().annotate({ "expected": "a finite number" }))), "links": Schema.optionalKey(Schema.Array(DataLink).annotate({ "description": "The behavior when clicking on a result" })), "mappings": Schema.optionalKey(ValueMappings), "max": Schema.optionalKey(ConfFloat64), "min": Schema.optionalKey(ConfFloat64), "noValue": Schema.optionalKey(Schema.String.annotate({ "description": "Alternative to empty string" })), "path": Schema.optionalKey(Schema.String.annotate({ "description": "Path is an explicit path to the field in the datasource. When the frame meta includes a path,\nthis will default to `${frame.meta.path}/${field.name}\n\nWhen defined, this value can be used as an identifier within the datasource scope, and\nmay be used as an identifier to update values in a subsequent request" })), "thresholds": Schema.optionalKey(ThresholdsConfig), "type": Schema.optionalKey(FieldTypeConfig), "unit": Schema.optionalKey(Schema.String.annotate({ "description": "Numeric Options" })), "writeable": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Writeable indicates that the datasource knows how to update this value" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "FieldConfig represents the display properties for a Field.", "identifier": "FieldConfig" })
export type QueryStat = { readonly "color"?: { readonly [x: string]: Schema.Json }, readonly "custom"?: { readonly [x: string]: Schema.Json }, readonly "decimals"?: number, readonly "description"?: string, readonly "displayName"?: string, readonly "displayNameFromDS"?: string, readonly "filterable"?: boolean, readonly "interval"?: number, readonly "links"?: ReadonlyArray<DataLink>, readonly "mappings"?: ValueMappings, readonly "max"?: ConfFloat64, readonly "min"?: ConfFloat64, readonly "noValue"?: string, readonly "path"?: string, readonly "thresholds"?: ThresholdsConfig, readonly "type"?: FieldTypeConfig, readonly "unit"?: string, readonly "value"?: number, readonly "writeable"?: boolean } & { readonly [x: string]: Schema.Json }
export const QueryStat = Schema.StructWithRest(Schema.Struct({ "color": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "description": "Map values to a display color\nNOTE: this interface is under development in the frontend... so simple map for now" })), "custom": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" })).annotate({ "description": "Panel Specific Values" })), "decimals": Schema.optionalKey(Schema.Number.annotate({ "format": "uint16" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "description": Schema.optionalKey(Schema.String.annotate({ "description": "Description is human readable field metadata" })), "displayName": Schema.optionalKey(Schema.String.annotate({ "description": "DisplayName overrides Grafana default naming, should not be used from a data source" })), "displayNameFromDS": Schema.optionalKey(Schema.String.annotate({ "description": "DisplayNameFromDS overrides Grafana default naming strategy." })), "filterable": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Filterable indicates if the Field's data can be filtered by additional calls." })), "interval": Schema.optionalKey(Schema.Number.annotate({ "description": "Interval indicates the expected regular step between values in the series.\nWhen an interval exists, consumers can identify \"missing\" values when the expected value is not present.\nThe grafana timeseries visualization will render disconnected values when missing values are found it the time field.\nThe interval uses the same units as the values.  For time.Time, this is defined in milliseconds.", "format": "double" }).check(Schema.isFinite().annotate({ "expected": "a finite number" }))), "links": Schema.optionalKey(Schema.Array(DataLink).annotate({ "description": "The behavior when clicking on a result" })), "mappings": Schema.optionalKey(ValueMappings), "max": Schema.optionalKey(ConfFloat64), "min": Schema.optionalKey(ConfFloat64), "noValue": Schema.optionalKey(Schema.String.annotate({ "description": "Alternative to empty string" })), "path": Schema.optionalKey(Schema.String.annotate({ "description": "Path is an explicit path to the field in the datasource. When the frame meta includes a path,\nthis will default to `${frame.meta.path}/${field.name}\n\nWhen defined, this value can be used as an identifier within the datasource scope, and\nmay be used as an identifier to update values in a subsequent request" })), "thresholds": Schema.optionalKey(ThresholdsConfig), "type": Schema.optionalKey(FieldTypeConfig), "unit": Schema.optionalKey(Schema.String.annotate({ "description": "Numeric Options" })), "value": Schema.optionalKey(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite().annotate({ "expected": "a finite number" }))), "writeable": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Writeable indicates that the datasource knows how to update this value" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "QueryStat is used for storing arbitrary statistics metadata related to a query and its result, e.g. total request time, data processing time.", "description": "The embedded FieldConfig's display name must be set.\nIt corresponds to the QueryResultMetaStat on the frontend (https://github.com/grafana/grafana/blob/master/packages/grafana-data/src/types/data.ts#L53).", "identifier": "QueryStat" })
export type LibraryElementSearchResponse = { readonly "result"?: LibraryElementSearchResult } & { readonly [x: string]: Schema.Json }
export const LibraryElementSearchResponse = Schema.StructWithRest(Schema.Struct({ "result": Schema.optionalKey(LibraryElementSearchResult) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "LibraryElementSearchResponse is a response struct for LibraryElementSearchResult.", "identifier": "LibraryElementSearchResponse" })
export type JSONWebKey = { readonly "Algorithm"?: string, readonly "CertificateThumbprintSHA1"?: ReadonlyArray<number>, readonly "CertificateThumbprintSHA256"?: ReadonlyArray<number>, readonly "Certificates"?: ReadonlyArray<Certificate>, readonly "CertificatesURL"?: URL, readonly "Key"?: Schema.Json, readonly "KeyID"?: string, readonly "Use"?: string } & { readonly [x: string]: Schema.Json }
export const JSONWebKey = Schema.StructWithRest(Schema.Struct({ "Algorithm": Schema.optionalKey(Schema.String.annotate({ "description": "Key algorithm, parsed from `alg` header." })), "CertificateThumbprintSHA1": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" }))).annotate({ "description": "X.509 certificate thumbprint (SHA-1), parsed from `x5t` header." })), "CertificateThumbprintSHA256": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" }))).annotate({ "description": "X.509 certificate thumbprint (SHA-256), parsed from `x5t#S256` header." })), "Certificates": Schema.optionalKey(Schema.Array(Certificate).annotate({ "description": "X.509 certificate chain, parsed from `x5c` header." })), "CertificatesURL": Schema.optionalKey(URL), "Key": Schema.optionalKey(Schema.Json.annotate({ "expected": "JSON value", "description": "Key is the Go in-memory representation of this key. It must have one\nof these types:\ned25519.PublicKey\ned25519.PrivateKey\necdsa.PublicKey\necdsa.PrivateKey\nrsa.PublicKey\nrsa.PrivateKey\n[]byte (a symmetric key)\n\nWhen marshaling this JSONWebKey into JSON, the \"kty\" header parameter\nwill be automatically set based on the type of this field." })), "KeyID": Schema.optionalKey(Schema.String.annotate({ "description": "Key identifier, parsed from `kid` header." })), "Use": Schema.optionalKey(Schema.String.annotate({ "description": "Key use, parsed from `use` header." })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "JSONWebKey represents a public or private key in JWK format. It can be\nmarshaled into JSON and unmarshaled from JSON.", "identifier": "JSONWebKey" })
export type AlertingFileExport = { readonly "apiVersion"?: number, readonly "contactPoints"?: ReadonlyArray<ContactPointExport>, readonly "groups"?: ReadonlyArray<AlertRuleGroupExport>, readonly "muteTimes"?: ReadonlyArray<MuteTimeIntervalExport>, readonly "policies"?: ReadonlyArray<NotificationPolicyExport> } & { readonly [x: string]: Schema.Json }
export const AlertingFileExport = Schema.StructWithRest(Schema.Struct({ "apiVersion": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "contactPoints": Schema.optionalKey(Schema.Array(ContactPointExport)), "groups": Schema.optionalKey(Schema.Array(AlertRuleGroupExport)), "muteTimes": Schema.optionalKey(Schema.Array(MuteTimeIntervalExport)), "policies": Schema.optionalKey(Schema.Array(NotificationPolicyExport)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "AlertingFileExport is the full provisioned file export.", "identifier": "AlertingFileExport" })
export type Field = { readonly "config"?: FieldConfig, readonly "labels"?: FrameLabels, readonly "name"?: string } & { readonly [x: string]: Schema.Json }
export const Field = Schema.StructWithRest(Schema.Struct({ "config": Schema.optionalKey(FieldConfig), "labels": Schema.optionalKey(FrameLabels), "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name is default identifier of the field. The name does not have to be unique, but the combination\nof name and Labels should be unique for proper behavior in all situations." })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "Field represents a typed column of data within a Frame.", "description": "A Field is essentially a slice of various types with extra properties and methods.\nSee NewField() for supported types.\n\nThe slice data in the Field is a not exported, so methods on the Field are used to to manipulate its data.", "identifier": "Field" })
export type FrameMeta = { readonly "channel"?: string, readonly "custom"?: Schema.Json, readonly "dataTopic"?: DataTopic, readonly "executedQueryString"?: string, readonly "notices"?: ReadonlyArray<Notice>, readonly "path"?: string, readonly "pathSeparator"?: string, readonly "preferredVisualisationPluginId"?: string, readonly "preferredVisualisationType"?: VisType, readonly "stats"?: ReadonlyArray<QueryStat>, readonly "type"?: FrameType, readonly "typeVersion"?: FrameTypeVersion, readonly "uniqueRowIdFields"?: ReadonlyArray<number> } & { readonly [x: string]: Schema.Json }
export const FrameMeta = Schema.StructWithRest(Schema.Struct({ "channel": Schema.optionalKey(Schema.String.annotate({ "description": "Channel is the path to a stream in grafana live that has real-time updates for this data." })), "custom": Schema.optionalKey(Schema.Json.annotate({ "expected": "JSON value", "description": "Custom datasource specific values." })), "dataTopic": Schema.optionalKey(DataTopic), "executedQueryString": Schema.optionalKey(Schema.String.annotate({ "description": "ExecutedQueryString is the raw query sent to the underlying system. All macros and templating\nhave been applied.  When metadata contains this value, it will be shown in the query inspector." })), "notices": Schema.optionalKey(Schema.Array(Notice).annotate({ "description": "Notices provide additional information about the data in the Frame that\nGrafana can display to the user in the user interface." })), "path": Schema.optionalKey(Schema.String.annotate({ "description": "Path is a browsable path on the datasource." })), "pathSeparator": Schema.optionalKey(Schema.String.annotate({ "description": "PathSeparator defines the separator pattern to decode a hierarchy. The default separator is '/'." })), "preferredVisualisationPluginId": Schema.optionalKey(Schema.String.annotate({ "description": "PreferredVisualizationPluginId sets the panel plugin id to use to render the data when using Explore. If\nthe plugin cannot be found will fall back to PreferredVisualization." })), "preferredVisualisationType": Schema.optionalKey(VisType), "stats": Schema.optionalKey(Schema.Array(QueryStat).annotate({ "description": "Stats is an array of query result statistics." })), "type": Schema.optionalKey(FrameType), "typeVersion": Schema.optionalKey(FrameTypeVersion), "uniqueRowIdFields": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))).annotate({ "description": "Array of field indices which values create a unique id for each row. Ideally this should be globally unique ID\nbut that isn't guarantied. Should help with keeping track and deduplicating rows in visualizations, especially\nwith streaming data with frequent updates." })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "FrameMeta matches:", "description": "https://github.com/grafana/grafana/blob/master/packages/grafana-data/src/types/data.ts#L11\nNOTE -- in javascript this can accept any `[key: string]: any;` however\nthis interface only exposes the values we want to be exposed", "identifier": "FrameMeta" })
export type Frame = { readonly "Fields"?: ReadonlyArray<Field>, readonly "Meta"?: FrameMeta, readonly "Name"?: string, readonly "RefID"?: string } & { readonly [x: string]: Schema.Json }
export const Frame = Schema.StructWithRest(Schema.Struct({ "Fields": Schema.optionalKey(Schema.Array(Field).annotate({ "description": "Fields are the columns of a frame.\nAll Fields must be of the same the length when marshalling the Frame for transmission.\nThere should be no `nil` entries in the Fields slice (making them pointers was a mistake)." })), "Meta": Schema.optionalKey(FrameMeta), "Name": Schema.optionalKey(Schema.String.annotate({ "description": "Name is used in some Grafana visualizations." })), "RefID": Schema.optionalKey(Schema.String.annotate({ "description": "RefID is a property that can be set to match a Frame to its originating query." })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "Frame is a columnar data structure where each column is a Field.", "description": "Each Field is well typed by its FieldType and supports optional Labels.\n\nA Frame is a general data container for Grafana. A Frame can be table data\nor time series data depending on its content and field types.", "identifier": "Frame" })
export type Frames = ReadonlyArray<Frame>
export const Frames = Schema.Array(Frame).annotate({ "title": "Frames is a slice of Frame pointers.", "description": "It is the main data container within a backend.DataResponse.\nThere should be no `nil` entries in the Frames slice (making them pointers was a mistake).", "identifier": "Frames" })
export type DataResponse = { readonly "Error"?: string, readonly "ErrorSource"?: Source, readonly "Frames"?: Frames, readonly "Status"?: Status } & { readonly [x: string]: Schema.Json }
export const DataResponse = Schema.StructWithRest(Schema.Struct({ "Error": Schema.optionalKey(Schema.String.annotate({ "description": "Error is a property to be set if the corresponding DataQuery has an error." })), "ErrorSource": Schema.optionalKey(Source), "Frames": Schema.optionalKey(Frames), "Status": Schema.optionalKey(Status) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "DataResponse contains the results from a DataQuery.", "description": "A map of RefIDs (unique query identifiers) to this type makes up the Responses property of a QueryDataResponse.\nThe Error property is used to allow for partial success responses from the containing QueryDataResponse.", "identifier": "DataResponse" })
export type Responses = { readonly [x: string]: DataResponse }
export const Responses = Schema.Record(Schema.String, DataResponse).annotate({ "title": "Responses is a map of RefIDs (Unique Query ID) to DataResponses.", "description": "The QueryData method the QueryDataHandler method will set the RefId\nproperty on the DataResponses' frames based on these RefIDs.", "identifier": "Responses" })
export type QueryDataResponse = { readonly "results"?: Responses } & { readonly [x: string]: Schema.Json }
export const QueryDataResponse = Schema.StructWithRest(Schema.Struct({ "results": Schema.optionalKey(Responses) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "QueryDataResponse contains the results from a QueryDataRequest.", "description": "It is the return type of a QueryData call.", "identifier": "QueryDataResponse" })
// recursive definitions
export type Folder = { readonly "accessControl"?: Metadata, readonly "canAdmin"?: boolean, readonly "canDelete"?: boolean, readonly "canEdit"?: boolean, readonly "canSave"?: boolean, readonly "created"?: string, readonly "createdBy"?: string, readonly "hasAcl"?: boolean, readonly "id"?: number, readonly "managedBy"?: ManagerKind, readonly "orgId"?: number, readonly "parentUid"?: string, readonly "parents"?: ReadonlyArray<Folder>, readonly "title"?: string, readonly "uid"?: string, readonly "updated"?: string, readonly "updatedBy"?: string, readonly "url"?: string, readonly "version"?: number } & { readonly [x: string]: Schema.Json }
export const Folder = Schema.StructWithRest(Schema.Struct({ "accessControl": Schema.optionalKey(Metadata), "canAdmin": Schema.optionalKey(Schema.Boolean), "canDelete": Schema.optionalKey(Schema.Boolean), "canEdit": Schema.optionalKey(Schema.Boolean), "canSave": Schema.optionalKey(Schema.Boolean), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "hasAcl": Schema.optionalKey(Schema.Boolean), "id": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: use UID instead", "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "managedBy": Schema.optionalKey(ManagerKind), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "parentUid": Schema.optionalKey(Schema.String.annotate({ "description": "only used if nested folders are enabled" })), "parents": Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<Folder> => Folder)).annotate({ "description": "the parent folders starting from the root going down" })), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "identifier": "Folder" })
const __recursive_TimeInterval = Schema.StructWithRest(Schema.Struct({ "name": Schema.optionalKey(Schema.String), "time_intervals": Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<TimeInterval> => TimeInterval))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "title": "TimeInterval represents a named set of time intervals for which a route should be muted.", "identifier": "TimeInterval" })
const __recursive_RouteExport = Schema.StructWithRest(Schema.Struct({ "active_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "continue": Schema.optionalKey(Schema.Boolean), "group_by": Schema.optionalKey(Schema.Array(Schema.String)), "group_interval": Schema.optionalKey(Schema.String), "group_wait": Schema.optionalKey(Schema.String), "match": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "description": "Deprecated. Remove before v1.0 release." })), "match_re": Schema.optionalKey(MatchRegexps), "matchers": Schema.optionalKey(Matchers), "mute_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "object_matchers": Schema.optionalKey(ObjectMatchers), "receiver": Schema.optionalKey(Schema.String), "repeat_interval": Schema.optionalKey(Schema.String), "routes": Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<RouteExport> => RouteExport))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "RouteExport is the provisioned file export of definitions.Route. This is needed to hide fields that aren't useable in\nprovisioning file format. An alternative would be to define a custom MarshalJSON and MarshalYAML that excludes them.", "identifier": "RouteExport" })
const __recursive_Route = Schema.StructWithRest(Schema.Struct({ "active_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "continue": Schema.optionalKey(Schema.Boolean), "group_by": Schema.optionalKey(Schema.Array(Schema.String)), "group_interval": Schema.optionalKey(Schema.String), "group_wait": Schema.optionalKey(Schema.String), "match": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "description": "Deprecated. Remove before v1.0 release." })), "match_re": Schema.optionalKey(MatchRegexps), "matchers": Schema.optionalKey(Matchers), "mute_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "object_matchers": Schema.optionalKey(ObjectMatchers), "provenance": Schema.optionalKey(Provenance), "receiver": Schema.optionalKey(Schema.String), "repeat_interval": Schema.optionalKey(Schema.String), "routes": Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<Route> => Route))) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]).annotate({ "description": "A Route is a node that contains definitions of how to handle alerts. This is modified\nfrom the upstream alertmanager in that it adds the ObjectMatchers property.", "identifier": "Route" })
// schemas
export type ListRolesParams = { readonly "delegatable"?: boolean, readonly "includeHidden"?: boolean, readonly "targetOrgId"?: number }
export const ListRolesParams = Schema.Struct({ "delegatable": Schema.optionalKey(Schema.Boolean), "includeHidden": Schema.optionalKey(Schema.Boolean), "targetOrgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type ListRoles200 = ReadonlyArray<RoleDTO>
export const ListRoles200 = Schema.Array(RoleDTO)
export type ListRoles403 = ErrorResponseBody
export const ListRoles403 = ErrorResponseBody
export type ListRoles500 = ErrorResponseBody
export const ListRoles500 = ErrorResponseBody
export type GetRole200 = RoleDTO
export const GetRole200 = RoleDTO
export type GetRole403 = ErrorResponseBody
export const GetRole403 = ErrorResponseBody
export type GetRole500 = ErrorResponseBody
export const GetRole500 = ErrorResponseBody
export type GetRoleAssignments200 = RoleAssignmentsDTO
export const GetRoleAssignments200 = RoleAssignmentsDTO
export type GetRoleAssignments403 = ErrorResponseBody
export const GetRoleAssignments403 = ErrorResponseBody
export type GetRoleAssignments404 = ErrorResponseBody
export const GetRoleAssignments404 = ErrorResponseBody
export type GetRoleAssignments500 = ErrorResponseBody
export const GetRoleAssignments500 = ErrorResponseBody
export type GetAccessControlStatus200 = Status
export const GetAccessControlStatus200 = Status
export type GetAccessControlStatus403 = ErrorResponseBody
export const GetAccessControlStatus403 = ErrorResponseBody
export type GetAccessControlStatus404 = ErrorResponseBody
export const GetAccessControlStatus404 = ErrorResponseBody
export type GetAccessControlStatus500 = ErrorResponseBody
export const GetAccessControlStatus500 = ErrorResponseBody
export type ListTeamRolesParams = { readonly "targetOrgId"?: number }
export const ListTeamRolesParams = Schema.Struct({ "targetOrgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type ListTeamRoles200 = SuccessResponseBody
export const ListTeamRoles200 = SuccessResponseBody
export type ListTeamRoles400 = ErrorResponseBody
export const ListTeamRoles400 = ErrorResponseBody
export type ListTeamRoles403 = ErrorResponseBody
export const ListTeamRoles403 = ErrorResponseBody
export type ListTeamRoles500 = ErrorResponseBody
export const ListTeamRoles500 = ErrorResponseBody
export type ListUserRolesParams = { readonly "includeHidden"?: boolean, readonly "targetOrgId"?: number }
export const ListUserRolesParams = Schema.Struct({ "includeHidden": Schema.optionalKey(Schema.Boolean), "targetOrgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type ListUserRoles200 = ReadonlyArray<RoleDTO>
export const ListUserRoles200 = Schema.Array(RoleDTO)
export type ListUserRoles400 = ErrorResponseBody
export const ListUserRoles400 = ErrorResponseBody
export type ListUserRoles403 = ErrorResponseBody
export const ListUserRoles403 = ErrorResponseBody
export type ListUserRoles500 = ErrorResponseBody
export const ListUserRoles500 = ErrorResponseBody
export type GetResourceDescription200 = Description
export const GetResourceDescription200 = Description
export type GetResourceDescription403 = ErrorResponseBody
export const GetResourceDescription403 = ErrorResponseBody
export type GetResourceDescription500 = ErrorResponseBody
export const GetResourceDescription500 = ErrorResponseBody
export type GetResourcePermissions200 = ReadonlyArray<ResourcePermissionDTO>
export const GetResourcePermissions200 = Schema.Array(ResourcePermissionDTO)
export type GetResourcePermissions403 = ErrorResponseBody
export const GetResourcePermissions403 = ErrorResponseBody
export type GetResourcePermissions404 = ErrorResponseBody
export const GetResourcePermissions404 = ErrorResponseBody
export type GetResourcePermissions500 = ErrorResponseBody
export const GetResourcePermissions500 = ErrorResponseBody
export type GetSyncStatus200 = ActiveSyncStatusDTO
export const GetSyncStatus200 = ActiveSyncStatusDTO
export type GetSyncStatus401 = ErrorResponseBody
export const GetSyncStatus401 = ErrorResponseBody
export type GetSyncStatus403 = ErrorResponseBody
export const GetSyncStatus403 = ErrorResponseBody
export type GetSyncStatus500 = ErrorResponseBody
export const GetSyncStatus500 = ErrorResponseBody
export type GetLDAPStatus200 = SuccessResponseBody
export const GetLDAPStatus200 = SuccessResponseBody
export type GetLDAPStatus401 = ErrorResponseBody
export const GetLDAPStatus401 = ErrorResponseBody
export type GetLDAPStatus403 = ErrorResponseBody
export const GetLDAPStatus403 = ErrorResponseBody
export type GetLDAPStatus500 = ErrorResponseBody
export const GetLDAPStatus500 = ErrorResponseBody
export type GetUserFromLDAP200 = SuccessResponseBody
export const GetUserFromLDAP200 = SuccessResponseBody
export type GetUserFromLDAP401 = ErrorResponseBody
export const GetUserFromLDAP401 = ErrorResponseBody
export type GetUserFromLDAP403 = ErrorResponseBody
export const GetUserFromLDAP403 = ErrorResponseBody
export type GetUserFromLDAP500 = ErrorResponseBody
export const GetUserFromLDAP500 = ErrorResponseBody
export type AdminGetSettings200 = SettingsBag
export const AdminGetSettings200 = SettingsBag
export type AdminGetSettings401 = ErrorResponseBody
export const AdminGetSettings401 = ErrorResponseBody
export type AdminGetSettings403 = ErrorResponseBody
export const AdminGetSettings403 = ErrorResponseBody
export type AdminGetStats200 = AdminStats
export const AdminGetStats200 = AdminStats
export type AdminGetStats401 = ErrorResponseBody
export const AdminGetStats401 = ErrorResponseBody
export type AdminGetStats403 = ErrorResponseBody
export const AdminGetStats403 = ErrorResponseBody
export type AdminGetStats500 = ErrorResponseBody
export const AdminGetStats500 = ErrorResponseBody
export type AdminGetUserAuthTokens200 = ReadonlyArray<UserToken>
export const AdminGetUserAuthTokens200 = Schema.Array(UserToken)
export type AdminGetUserAuthTokens401 = ErrorResponseBody
export const AdminGetUserAuthTokens401 = ErrorResponseBody
export type AdminGetUserAuthTokens403 = ErrorResponseBody
export const AdminGetUserAuthTokens403 = ErrorResponseBody
export type AdminGetUserAuthTokens500 = ErrorResponseBody
export const AdminGetUserAuthTokens500 = ErrorResponseBody
export type GetUserQuota200 = ReadonlyArray<QuotaDTO>
export const GetUserQuota200 = Schema.Array(QuotaDTO)
export type GetUserQuota401 = ErrorResponseBody
export const GetUserQuota401 = ErrorResponseBody
export type GetUserQuota403 = ErrorResponseBody
export const GetUserQuota403 = ErrorResponseBody
export type GetUserQuota404 = ErrorResponseBody
export const GetUserQuota404 = ErrorResponseBody
export type GetUserQuota500 = ErrorResponseBody
export const GetUserQuota500 = ErrorResponseBody
export type GetAnnotationsParams = { readonly "from"?: number, readonly "to"?: number, readonly "userId"?: number, readonly "userUID"?: string, readonly "alertId"?: number, readonly "alertUID"?: string, readonly "dashboardId"?: number, readonly "dashboardUID"?: string, readonly "panelId"?: number, readonly "limit"?: number, readonly "tags"?: ReadonlyArray<string>, readonly "type"?: "alert" | "annotation", readonly "matchAny"?: boolean }
export const GetAnnotationsParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "to": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "userUID": Schema.optionalKey(Schema.String), "alertId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "alertUID": Schema.optionalKey(Schema.String), "dashboardId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "dashboardUID": Schema.optionalKey(Schema.String), "panelId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "tags": Schema.optionalKey(Schema.Array(Schema.String)), "type": Schema.optionalKey(Schema.Literals(["alert", "annotation"])), "matchAny": Schema.optionalKey(Schema.Boolean) })
export type GetAnnotations200 = ReadonlyArray<Annotation>
export const GetAnnotations200 = Schema.Array(Annotation)
export type GetAnnotations401 = ErrorResponseBody
export const GetAnnotations401 = ErrorResponseBody
export type GetAnnotations500 = ErrorResponseBody
export const GetAnnotations500 = ErrorResponseBody
export type GetAnnotationTagsParams = { readonly "tag"?: string, readonly "limit"?: string }
export const GetAnnotationTagsParams = Schema.Struct({ "tag": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.String.annotate({ "default": "100" })) })
export type GetAnnotationTags200 = GetAnnotationTagsResponse
export const GetAnnotationTags200 = GetAnnotationTagsResponse
export type GetAnnotationTags401 = ErrorResponseBody
export const GetAnnotationTags401 = ErrorResponseBody
export type GetAnnotationTags500 = ErrorResponseBody
export const GetAnnotationTags500 = ErrorResponseBody
export type GetAnnotationByID200 = Annotation
export const GetAnnotationByID200 = Annotation
export type GetAnnotationByID401 = ErrorResponseBody
export const GetAnnotationByID401 = ErrorResponseBody
export type GetAnnotationByID500 = ErrorResponseBody
export const GetAnnotationByID500 = ErrorResponseBody
export type ListDevices200 = ReadonlyArray<DeviceDTO>
export const ListDevices200 = Schema.Array(DeviceDTO)
export type ListDevices401 = ErrorResponseBody
export const ListDevices401 = ErrorResponseBody
export type ListDevices403 = ErrorResponseBody
export const ListDevices403 = ErrorResponseBody
export type ListDevices404 = ErrorResponseBody
export const ListDevices404 = ErrorResponseBody
export type ListDevices500 = ErrorResponseBody
export const ListDevices500 = ErrorResponseBody
export type SearchDevices200 = SearchDeviceQueryResult
export const SearchDevices200 = SearchDeviceQueryResult
export type SearchDevices401 = ErrorResponseBody
export const SearchDevices401 = ErrorResponseBody
export type SearchDevices403 = ErrorResponseBody
export const SearchDevices403 = ErrorResponseBody
export type SearchDevices404 = ErrorResponseBody
export const SearchDevices404 = ErrorResponseBody
export type SearchDevices500 = ErrorResponseBody
export const SearchDevices500 = ErrorResponseBody
export type GetSessionList200 = CloudMigrationSessionListResponseDTO
export const GetSessionList200 = CloudMigrationSessionListResponseDTO
export type GetSessionList401 = ErrorResponseBody
export const GetSessionList401 = ErrorResponseBody
export type GetSessionList403 = ErrorResponseBody
export const GetSessionList403 = ErrorResponseBody
export type GetSessionList500 = ErrorResponseBody
export const GetSessionList500 = ErrorResponseBody
export type GetSession200 = CloudMigrationSessionResponseDTO
export const GetSession200 = CloudMigrationSessionResponseDTO
export type GetSession400 = ErrorResponseBody
export const GetSession400 = ErrorResponseBody
export type GetSession401 = ErrorResponseBody
export const GetSession401 = ErrorResponseBody
export type GetSession403 = ErrorResponseBody
export const GetSession403 = ErrorResponseBody
export type GetSession500 = ErrorResponseBody
export const GetSession500 = ErrorResponseBody
export type GetSnapshotParams = { readonly "resultPage"?: number, readonly "resultLimit"?: number, readonly "resultSortColumn"?: string, readonly "resultSortOrder"?: string, readonly "errorsOnly"?: boolean }
export const GetSnapshotParams = Schema.Struct({ "resultPage": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "resultLimit": Schema.optionalKey(Schema.Number.annotate({ "default": 100, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "resultSortColumn": Schema.optionalKey(Schema.String.annotate({ "default": "default" })), "resultSortOrder": Schema.optionalKey(Schema.String.annotate({ "default": "ASC" })), "errorsOnly": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })) })
export type GetSnapshot200 = GetSnapshotResponseDTO
export const GetSnapshot200 = GetSnapshotResponseDTO
export type GetSnapshot400 = ErrorResponseBody
export const GetSnapshot400 = ErrorResponseBody
export type GetSnapshot401 = ErrorResponseBody
export const GetSnapshot401 = ErrorResponseBody
export type GetSnapshot403 = ErrorResponseBody
export const GetSnapshot403 = ErrorResponseBody
export type GetSnapshot500 = ErrorResponseBody
export const GetSnapshot500 = ErrorResponseBody
export type GetShapshotListParams = { readonly "page"?: number, readonly "limit"?: number, readonly "sort"?: string }
export const GetShapshotListParams = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "limit": Schema.optionalKey(Schema.Number.annotate({ "default": 100, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "sort": Schema.optionalKey(Schema.String) })
export type GetShapshotList200 = SnapshotListResponseDTO
export const GetShapshotList200 = SnapshotListResponseDTO
export type GetShapshotList400 = ErrorResponseBody
export const GetShapshotList400 = ErrorResponseBody
export type GetShapshotList401 = ErrorResponseBody
export const GetShapshotList401 = ErrorResponseBody
export type GetShapshotList403 = ErrorResponseBody
export const GetShapshotList403 = ErrorResponseBody
export type GetShapshotList500 = ErrorResponseBody
export const GetShapshotList500 = ErrorResponseBody
export type GetResourceDependencies200 = ResourceDependenciesResponseDTO
export const GetResourceDependencies200 = ResourceDependenciesResponseDTO
export type GetCloudMigrationToken200 = GetAccessTokenResponseDTO
export const GetCloudMigrationToken200 = GetAccessTokenResponseDTO
export type GetCloudMigrationToken401 = ErrorResponseBody
export const GetCloudMigrationToken401 = ErrorResponseBody
export type GetCloudMigrationToken403 = ErrorResponseBody
export const GetCloudMigrationToken403 = ErrorResponseBody
export type GetCloudMigrationToken404 = ErrorResponseBody
export const GetCloudMigrationToken404 = ErrorResponseBody
export type GetCloudMigrationToken500 = ErrorResponseBody
export const GetCloudMigrationToken500 = ErrorResponseBody
export type SearchDashboardSnapshotsParams = { readonly "query"?: string, readonly "limit"?: number }
export const SearchDashboardSnapshotsParams = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type SearchDashboardSnapshots200 = ReadonlyArray<DashboardSnapshotDTO>
export const SearchDashboardSnapshots200 = Schema.Array(DashboardSnapshotDTO)
export type SearchDashboardSnapshots500 = ErrorResponseBody
export const SearchDashboardSnapshots500 = ErrorResponseBody
export type GetHomeDashboard200 = GetHomeDashboardResponse
export const GetHomeDashboard200 = GetHomeDashboardResponse
export type GetHomeDashboard401 = ErrorResponseBody
export const GetHomeDashboard401 = ErrorResponseBody
export type GetHomeDashboard500 = ErrorResponseBody
export const GetHomeDashboard500 = ErrorResponseBody
export type ListPublicDashboards200 = PublicDashboardListResponseWithPagination
export const ListPublicDashboards200 = PublicDashboardListResponseWithPagination
export type ListPublicDashboards401 = PublicError
export const ListPublicDashboards401 = PublicError
export type ListPublicDashboards403 = PublicError
export const ListPublicDashboards403 = PublicError
export type ListPublicDashboards500 = PublicError
export const ListPublicDashboards500 = PublicError
export type GetDashboardTags200 = ReadonlyArray<DashboardTagCloudItem>
export const GetDashboardTags200 = Schema.Array(DashboardTagCloudItem)
export type GetDashboardTags401 = ErrorResponseBody
export const GetDashboardTags401 = ErrorResponseBody
export type GetDashboardTags500 = ErrorResponseBody
export const GetDashboardTags500 = ErrorResponseBody
export type GetPublicDashboard200 = PublicDashboard
export const GetPublicDashboard200 = PublicDashboard
export type GetPublicDashboard400 = PublicError
export const GetPublicDashboard400 = PublicError
export type GetPublicDashboard401 = PublicError
export const GetPublicDashboard401 = PublicError
export type GetPublicDashboard403 = PublicError
export const GetPublicDashboard403 = PublicError
export type GetPublicDashboard404 = PublicError
export const GetPublicDashboard404 = PublicError
export type GetPublicDashboard500 = PublicError
export const GetPublicDashboard500 = PublicError
export type GetDashboardByUID200 = DashboardFullWithMeta
export const GetDashboardByUID200 = DashboardFullWithMeta
export type GetDashboardByUID401 = ErrorResponseBody
export const GetDashboardByUID401 = ErrorResponseBody
export type GetDashboardByUID403 = ErrorResponseBody
export const GetDashboardByUID403 = ErrorResponseBody
export type GetDashboardByUID404 = ErrorResponseBody
export const GetDashboardByUID404 = ErrorResponseBody
export type GetDashboardByUID406 = ErrorResponseBody
export const GetDashboardByUID406 = ErrorResponseBody
export type GetDashboardByUID500 = ErrorResponseBody
export const GetDashboardByUID500 = ErrorResponseBody
export type GetDashboardPermissionsListByUID200 = ReadonlyArray<DashboardACLInfoDTO>
export const GetDashboardPermissionsListByUID200 = Schema.Array(DashboardACLInfoDTO)
export type GetDashboardPermissionsListByUID401 = ErrorResponseBody
export const GetDashboardPermissionsListByUID401 = ErrorResponseBody
export type GetDashboardPermissionsListByUID403 = ErrorResponseBody
export const GetDashboardPermissionsListByUID403 = ErrorResponseBody
export type GetDashboardPermissionsListByUID404 = ErrorResponseBody
export const GetDashboardPermissionsListByUID404 = ErrorResponseBody
export type GetDashboardPermissionsListByUID500 = ErrorResponseBody
export const GetDashboardPermissionsListByUID500 = ErrorResponseBody
export type GetDashboardVersionsByUIDParams = { readonly "limit"?: number, readonly "start"?: number }
export const GetDashboardVersionsByUIDParams = Schema.Struct({ "limit": Schema.optionalKey(Schema.Number.annotate({ "default": 0, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "start": Schema.optionalKey(Schema.Number.annotate({ "default": 0, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type GetDashboardVersionsByUID200 = DashboardVersionResponseMeta
export const GetDashboardVersionsByUID200 = DashboardVersionResponseMeta
export type GetDashboardVersionsByUID401 = ErrorResponseBody
export const GetDashboardVersionsByUID401 = ErrorResponseBody
export type GetDashboardVersionsByUID403 = ErrorResponseBody
export const GetDashboardVersionsByUID403 = ErrorResponseBody
export type GetDashboardVersionsByUID404 = ErrorResponseBody
export const GetDashboardVersionsByUID404 = ErrorResponseBody
export type GetDashboardVersionsByUID500 = ErrorResponseBody
export const GetDashboardVersionsByUID500 = ErrorResponseBody
export type GetDashboardVersionByUID200 = DashboardVersionMeta
export const GetDashboardVersionByUID200 = DashboardVersionMeta
export type GetDashboardVersionByUID401 = ErrorResponseBody
export const GetDashboardVersionByUID401 = ErrorResponseBody
export type GetDashboardVersionByUID403 = ErrorResponseBody
export const GetDashboardVersionByUID403 = ErrorResponseBody
export type GetDashboardVersionByUID404 = ErrorResponseBody
export const GetDashboardVersionByUID404 = ErrorResponseBody
export type GetDashboardVersionByUID500 = ErrorResponseBody
export const GetDashboardVersionByUID500 = ErrorResponseBody
export type GetDataSources200 = DataSourceList
export const GetDataSources200 = DataSourceList
export type GetDataSources401 = ErrorResponseBody
export const GetDataSources401 = ErrorResponseBody
export type GetDataSources403 = ErrorResponseBody
export const GetDataSources403 = ErrorResponseBody
export type GetDataSources500 = ErrorResponseBody
export const GetDataSources500 = ErrorResponseBody
export type GetCorrelationsParams = { readonly "limit"?: number, readonly "page"?: number, readonly "sourceUID"?: ReadonlyArray<string> }
export const GetCorrelationsParams = Schema.Struct({ "limit": Schema.optionalKey(Schema.Number.annotate({ "default": 100, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })).check(Schema.isLessThanOrEqualTo(1000).annotate({ "expected": "a value less than or equal to 1000" }))), "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "sourceUID": Schema.optionalKey(Schema.Array(Schema.String)) })
export type GetCorrelations200 = ReadonlyArray<Correlation>
export const GetCorrelations200 = Schema.Array(Correlation)
export type GetCorrelations401 = ErrorResponseBody
export const GetCorrelations401 = ErrorResponseBody
export type GetCorrelations404 = ErrorResponseBody
export const GetCorrelations404 = ErrorResponseBody
export type GetCorrelations500 = ErrorResponseBody
export const GetCorrelations500 = ErrorResponseBody
export type GetDataSourceIdByName200 = { readonly "id": number } & { readonly [x: string]: Schema.Json }
export const GetDataSourceIdByName200 = Schema.StructWithRest(Schema.Struct({ "id": Schema.Number.annotate({ "description": "ID Identifier of the data source.", "examples": [65], "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))])
export type GetDataSourceIdByName401 = ErrorResponseBody
export const GetDataSourceIdByName401 = ErrorResponseBody
export type GetDataSourceIdByName403 = ErrorResponseBody
export const GetDataSourceIdByName403 = ErrorResponseBody
export type GetDataSourceIdByName404 = ErrorResponseBody
export const GetDataSourceIdByName404 = ErrorResponseBody
export type GetDataSourceIdByName500 = ErrorResponseBody
export const GetDataSourceIdByName500 = ErrorResponseBody
export type GetDataSourceByName200 = DataSource
export const GetDataSourceByName200 = DataSource
export type GetDataSourceByName401 = ErrorResponseBody
export const GetDataSourceByName401 = ErrorResponseBody
export type GetDataSourceByName403 = ErrorResponseBody
export const GetDataSourceByName403 = ErrorResponseBody
export type GetDataSourceByName500 = ErrorResponseBody
export const GetDataSourceByName500 = ErrorResponseBody
export type DatasourceProxyGETByUIDcalls400 = ErrorResponseBody
export const DatasourceProxyGETByUIDcalls400 = ErrorResponseBody
export type DatasourceProxyGETByUIDcalls401 = ErrorResponseBody
export const DatasourceProxyGETByUIDcalls401 = ErrorResponseBody
export type DatasourceProxyGETByUIDcalls403 = ErrorResponseBody
export const DatasourceProxyGETByUIDcalls403 = ErrorResponseBody
export type DatasourceProxyGETByUIDcalls404 = ErrorResponseBody
export const DatasourceProxyGETByUIDcalls404 = ErrorResponseBody
export type DatasourceProxyGETByUIDcalls500 = ErrorResponseBody
export const DatasourceProxyGETByUIDcalls500 = ErrorResponseBody
export type GetCorrelationsBySourceUID200 = ReadonlyArray<Correlation>
export const GetCorrelationsBySourceUID200 = Schema.Array(Correlation)
export type GetCorrelationsBySourceUID401 = ErrorResponseBody
export const GetCorrelationsBySourceUID401 = ErrorResponseBody
export type GetCorrelationsBySourceUID404 = ErrorResponseBody
export const GetCorrelationsBySourceUID404 = ErrorResponseBody
export type GetCorrelationsBySourceUID500 = ErrorResponseBody
export const GetCorrelationsBySourceUID500 = ErrorResponseBody
export type GetCorrelation200 = Correlation
export const GetCorrelation200 = Correlation
export type GetCorrelation401 = ErrorResponseBody
export const GetCorrelation401 = ErrorResponseBody
export type GetCorrelation404 = ErrorResponseBody
export const GetCorrelation404 = ErrorResponseBody
export type GetCorrelation500 = ErrorResponseBody
export const GetCorrelation500 = ErrorResponseBody
export type GetDataSourceByUID200 = DataSource
export const GetDataSourceByUID200 = DataSource
export type GetDataSourceByUID400 = ErrorResponseBody
export const GetDataSourceByUID400 = ErrorResponseBody
export type GetDataSourceByUID401 = ErrorResponseBody
export const GetDataSourceByUID401 = ErrorResponseBody
export type GetDataSourceByUID403 = ErrorResponseBody
export const GetDataSourceByUID403 = ErrorResponseBody
export type GetDataSourceByUID404 = ErrorResponseBody
export const GetDataSourceByUID404 = ErrorResponseBody
export type GetDataSourceByUID500 = ErrorResponseBody
export const GetDataSourceByUID500 = ErrorResponseBody
export type CheckDatasourceHealthWithUID200 = SuccessResponseBody
export const CheckDatasourceHealthWithUID200 = SuccessResponseBody
export type CheckDatasourceHealthWithUID400 = ErrorResponseBody
export const CheckDatasourceHealthWithUID400 = ErrorResponseBody
export type CheckDatasourceHealthWithUID401 = ErrorResponseBody
export const CheckDatasourceHealthWithUID401 = ErrorResponseBody
export type CheckDatasourceHealthWithUID403 = ErrorResponseBody
export const CheckDatasourceHealthWithUID403 = ErrorResponseBody
export type CheckDatasourceHealthWithUID500 = ErrorResponseBody
export const CheckDatasourceHealthWithUID500 = ErrorResponseBody
export type GetTeamLBACRulesApi200 = TeamLBACRules
export const GetTeamLBACRulesApi200 = TeamLBACRules
export type GetTeamLBACRulesApi400 = ErrorResponseBody
export const GetTeamLBACRulesApi400 = ErrorResponseBody
export type GetTeamLBACRulesApi401 = ErrorResponseBody
export const GetTeamLBACRulesApi401 = ErrorResponseBody
export type GetTeamLBACRulesApi403 = ErrorResponseBody
export const GetTeamLBACRulesApi403 = ErrorResponseBody
export type GetTeamLBACRulesApi404 = ErrorResponseBody
export const GetTeamLBACRulesApi404 = ErrorResponseBody
export type GetTeamLBACRulesApi500 = ErrorResponseBody
export const GetTeamLBACRulesApi500 = ErrorResponseBody
export type CallDatasourceResourceWithUID200 = SuccessResponseBody
export const CallDatasourceResourceWithUID200 = SuccessResponseBody
export type CallDatasourceResourceWithUID400 = ErrorResponseBody
export const CallDatasourceResourceWithUID400 = ErrorResponseBody
export type CallDatasourceResourceWithUID401 = ErrorResponseBody
export const CallDatasourceResourceWithUID401 = ErrorResponseBody
export type CallDatasourceResourceWithUID403 = ErrorResponseBody
export const CallDatasourceResourceWithUID403 = ErrorResponseBody
export type CallDatasourceResourceWithUID404 = ErrorResponseBody
export const CallDatasourceResourceWithUID404 = ErrorResponseBody
export type CallDatasourceResourceWithUID500 = ErrorResponseBody
export const CallDatasourceResourceWithUID500 = ErrorResponseBody
export type GetDataSourceCacheConfigParams = { readonly "dataSourceType"?: string }
export const GetDataSourceCacheConfigParams = Schema.Struct({ "dataSourceType": Schema.optionalKey(Schema.String) })
export type GetDataSourceCacheConfig200 = CacheConfigResponse
export const GetDataSourceCacheConfig200 = CacheConfigResponse
export type GetDataSourceCacheConfig500 = ErrorResponseBody
export const GetDataSourceCacheConfig500 = ErrorResponseBody
export type QueryMetricsWithExpressionsRequestJson = MetricRequest
export const QueryMetricsWithExpressionsRequestJson = MetricRequest
export type QueryMetricsWithExpressions200 = QueryDataResponse
export const QueryMetricsWithExpressions200 = QueryDataResponse
export type QueryMetricsWithExpressions207 = QueryDataResponse
export const QueryMetricsWithExpressions207 = QueryDataResponse
export type QueryMetricsWithExpressions400 = ErrorResponseBody
export const QueryMetricsWithExpressions400 = ErrorResponseBody
export type QueryMetricsWithExpressions401 = ErrorResponseBody
export const QueryMetricsWithExpressions401 = ErrorResponseBody
export type QueryMetricsWithExpressions403 = ErrorResponseBody
export const QueryMetricsWithExpressions403 = ErrorResponseBody
export type QueryMetricsWithExpressions500 = ErrorResponseBody
export const QueryMetricsWithExpressions500 = ErrorResponseBody
export type GetFoldersParams = { readonly "limit"?: number, readonly "page"?: number, readonly "parentUid"?: string, readonly "permission"?: "Edit" | "View" }
export const GetFoldersParams = Schema.Struct({ "limit": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "parentUid": Schema.optionalKey(Schema.String), "permission": Schema.optionalKey(Schema.Literals(["Edit", "View"]).annotate({ "default": "View" })) })
export type GetFolders200 = ReadonlyArray<FolderSearchHit>
export const GetFolders200 = Schema.Array(FolderSearchHit)
export type GetFolders401 = ErrorResponseBody
export const GetFolders401 = ErrorResponseBody
export type GetFolders403 = ErrorResponseBody
export const GetFolders403 = ErrorResponseBody
export type GetFolders500 = ErrorResponseBody
export const GetFolders500 = ErrorResponseBody
export type GetFolderByUID200 = Folder
export const GetFolderByUID200 = Folder
export type GetFolderByUID401 = ErrorResponseBody
export const GetFolderByUID401 = ErrorResponseBody
export type GetFolderByUID403 = ErrorResponseBody
export const GetFolderByUID403 = ErrorResponseBody
export type GetFolderByUID404 = ErrorResponseBody
export const GetFolderByUID404 = ErrorResponseBody
export type GetFolderByUID500 = ErrorResponseBody
export const GetFolderByUID500 = ErrorResponseBody
export type GetFolderDescendantCounts200 = DescendantCounts
export const GetFolderDescendantCounts200 = DescendantCounts
export type GetFolderDescendantCounts401 = ErrorResponseBody
export const GetFolderDescendantCounts401 = ErrorResponseBody
export type GetFolderDescendantCounts403 = ErrorResponseBody
export const GetFolderDescendantCounts403 = ErrorResponseBody
export type GetFolderDescendantCounts404 = ErrorResponseBody
export const GetFolderDescendantCounts404 = ErrorResponseBody
export type GetFolderDescendantCounts500 = ErrorResponseBody
export const GetFolderDescendantCounts500 = ErrorResponseBody
export type GetFolderPermissionList200 = ReadonlyArray<DashboardACLInfoDTO>
export const GetFolderPermissionList200 = Schema.Array(DashboardACLInfoDTO)
export type GetFolderPermissionList401 = ErrorResponseBody
export const GetFolderPermissionList401 = ErrorResponseBody
export type GetFolderPermissionList403 = ErrorResponseBody
export const GetFolderPermissionList403 = ErrorResponseBody
export type GetFolderPermissionList404 = ErrorResponseBody
export const GetFolderPermissionList404 = ErrorResponseBody
export type GetFolderPermissionList500 = ErrorResponseBody
export const GetFolderPermissionList500 = ErrorResponseBody
export type GetHealth200 = HealthResponse
export const GetHealth200 = HealthResponse
export type GetHealth503 = ErrorResponseBody
export const GetHealth503 = ErrorResponseBody
export type GetLibraryElementsParams = { readonly "searchString"?: string, readonly "kind"?: 1, readonly "sortDirection"?: "alpha-asc" | "alpha-desc", readonly "typeFilter"?: string, readonly "excludeUid"?: string, readonly "folderFilter"?: string, readonly "folderFilterUIDs"?: string, readonly "perPage"?: number, readonly "page"?: number }
export const GetLibraryElementsParams = Schema.Struct({ "searchString": Schema.optionalKey(Schema.String), "kind": Schema.optionalKey(Schema.Literal(1).annotate({ "format": "int64" })), "sortDirection": Schema.optionalKey(Schema.Literals(["alpha-asc", "alpha-desc"])), "typeFilter": Schema.optionalKey(Schema.String), "excludeUid": Schema.optionalKey(Schema.String), "folderFilter": Schema.optionalKey(Schema.String), "folderFilterUIDs": Schema.optionalKey(Schema.String), "perPage": Schema.optionalKey(Schema.Number.annotate({ "default": 100, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type GetLibraryElements200 = LibraryElementSearchResponse
export const GetLibraryElements200 = LibraryElementSearchResponse
export type GetLibraryElements401 = ErrorResponseBody
export const GetLibraryElements401 = ErrorResponseBody
export type GetLibraryElements500 = ErrorResponseBody
export const GetLibraryElements500 = ErrorResponseBody
export type GetLibraryElementByName200 = LibraryElementArrayResponse
export const GetLibraryElementByName200 = LibraryElementArrayResponse
export type GetLibraryElementByName401 = ErrorResponseBody
export const GetLibraryElementByName401 = ErrorResponseBody
export type GetLibraryElementByName404 = ErrorResponseBody
export const GetLibraryElementByName404 = ErrorResponseBody
export type GetLibraryElementByName500 = ErrorResponseBody
export const GetLibraryElementByName500 = ErrorResponseBody
export type GetLibraryElementByUID200 = LibraryElementResponse
export const GetLibraryElementByUID200 = LibraryElementResponse
export type GetLibraryElementByUID401 = ErrorResponseBody
export const GetLibraryElementByUID401 = ErrorResponseBody
export type GetLibraryElementByUID403 = ErrorResponseBody
export const GetLibraryElementByUID403 = ErrorResponseBody
export type GetLibraryElementByUID404 = ErrorResponseBody
export const GetLibraryElementByUID404 = ErrorResponseBody
export type GetLibraryElementByUID500 = ErrorResponseBody
export const GetLibraryElementByUID500 = ErrorResponseBody
export type GetLibraryElementConnections200 = LibraryElementConnectionsResponse
export const GetLibraryElementConnections200 = LibraryElementConnectionsResponse
export type GetLibraryElementConnections401 = ErrorResponseBody
export const GetLibraryElementConnections401 = ErrorResponseBody
export type GetLibraryElementConnections403 = ErrorResponseBody
export const GetLibraryElementConnections403 = ErrorResponseBody
export type GetLibraryElementConnections404 = ErrorResponseBody
export const GetLibraryElementConnections404 = ErrorResponseBody
export type GetLibraryElementConnections500 = ErrorResponseBody
export const GetLibraryElementConnections500 = ErrorResponseBody
export type GetCustomPermissionsReport500 = ErrorResponseBody
export const GetCustomPermissionsReport500 = ErrorResponseBody
export type GetCustomPermissionsCSV500 = ErrorResponseBody
export const GetCustomPermissionsCSV500 = ErrorResponseBody
export type RefreshLicenseStats200 = ActiveUserStats
export const RefreshLicenseStats200 = ActiveUserStats
export type RefreshLicenseStats500 = ErrorResponseBody
export const RefreshLicenseStats500 = ErrorResponseBody
export type GetLicenseToken200 = Token
export const GetLicenseToken200 = Token
export type GetSAMLLogout404 = ErrorResponseBody
export const GetSAMLLogout404 = ErrorResponseBody
export type GetSAMLLogout500 = ErrorResponseBody
export const GetSAMLLogout500 = ErrorResponseBody
export type GetCurrentOrg200 = OrgDetailsDTO
export const GetCurrentOrg200 = OrgDetailsDTO
export type GetCurrentOrg401 = ErrorResponseBody
export const GetCurrentOrg401 = ErrorResponseBody
export type GetCurrentOrg403 = ErrorResponseBody
export const GetCurrentOrg403 = ErrorResponseBody
export type GetCurrentOrg500 = ErrorResponseBody
export const GetCurrentOrg500 = ErrorResponseBody
export type GetPendingOrgInvites200 = ReadonlyArray<TempUserDTO>
export const GetPendingOrgInvites200 = Schema.Array(TempUserDTO)
export type GetPendingOrgInvites401 = ErrorResponseBody
export const GetPendingOrgInvites401 = ErrorResponseBody
export type GetPendingOrgInvites403 = ErrorResponseBody
export const GetPendingOrgInvites403 = ErrorResponseBody
export type GetPendingOrgInvites500 = ErrorResponseBody
export const GetPendingOrgInvites500 = ErrorResponseBody
export type GetOrgPreferences200 = PreferencesSpec
export const GetOrgPreferences200 = PreferencesSpec
export type GetOrgPreferences401 = ErrorResponseBody
export const GetOrgPreferences401 = ErrorResponseBody
export type GetOrgPreferences403 = ErrorResponseBody
export const GetOrgPreferences403 = ErrorResponseBody
export type GetOrgPreferences500 = ErrorResponseBody
export const GetOrgPreferences500 = ErrorResponseBody
export type GetCurrentOrgQuota200 = ReadonlyArray<QuotaDTO>
export const GetCurrentOrgQuota200 = Schema.Array(QuotaDTO)
export type GetCurrentOrgQuota401 = ErrorResponseBody
export const GetCurrentOrgQuota401 = ErrorResponseBody
export type GetCurrentOrgQuota403 = ErrorResponseBody
export const GetCurrentOrgQuota403 = ErrorResponseBody
export type GetCurrentOrgQuota404 = ErrorResponseBody
export const GetCurrentOrgQuota404 = ErrorResponseBody
export type GetCurrentOrgQuota500 = ErrorResponseBody
export const GetCurrentOrgQuota500 = ErrorResponseBody
export type GetOrgUsersForCurrentOrgParams = { readonly "query"?: string, readonly "limit"?: number }
export const GetOrgUsersForCurrentOrgParams = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type GetOrgUsersForCurrentOrg200 = ReadonlyArray<OrgUserDTO>
export const GetOrgUsersForCurrentOrg200 = Schema.Array(OrgUserDTO)
export type GetOrgUsersForCurrentOrg401 = ErrorResponseBody
export const GetOrgUsersForCurrentOrg401 = ErrorResponseBody
export type GetOrgUsersForCurrentOrg403 = ErrorResponseBody
export const GetOrgUsersForCurrentOrg403 = ErrorResponseBody
export type GetOrgUsersForCurrentOrg500 = ErrorResponseBody
export const GetOrgUsersForCurrentOrg500 = ErrorResponseBody
export type GetOrgUsersForCurrentOrgLookupParams = { readonly "query"?: string, readonly "limit"?: number }
export const GetOrgUsersForCurrentOrgLookupParams = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type GetOrgUsersForCurrentOrgLookup200 = ReadonlyArray<UserLookupDTO>
export const GetOrgUsersForCurrentOrgLookup200 = Schema.Array(UserLookupDTO)
export type GetOrgUsersForCurrentOrgLookup401 = ErrorResponseBody
export const GetOrgUsersForCurrentOrgLookup401 = ErrorResponseBody
export type GetOrgUsersForCurrentOrgLookup403 = ErrorResponseBody
export const GetOrgUsersForCurrentOrgLookup403 = ErrorResponseBody
export type GetOrgUsersForCurrentOrgLookup500 = ErrorResponseBody
export const GetOrgUsersForCurrentOrgLookup500 = ErrorResponseBody
export type SearchOrgsParams = { readonly "page"?: number, readonly "perpage"?: number, readonly "name"?: string, readonly "query"?: string }
export const SearchOrgsParams = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perpage": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "name": Schema.optionalKey(Schema.String), "query": Schema.optionalKey(Schema.String) })
export type SearchOrgs200 = ReadonlyArray<OrgDTO>
export const SearchOrgs200 = Schema.Array(OrgDTO)
export type SearchOrgs401 = ErrorResponseBody
export const SearchOrgs401 = ErrorResponseBody
export type SearchOrgs403 = ErrorResponseBody
export const SearchOrgs403 = ErrorResponseBody
export type SearchOrgs409 = ErrorResponseBody
export const SearchOrgs409 = ErrorResponseBody
export type SearchOrgs500 = ErrorResponseBody
export const SearchOrgs500 = ErrorResponseBody
export type GetOrgByName200 = OrgDetailsDTO
export const GetOrgByName200 = OrgDetailsDTO
export type GetOrgByName401 = ErrorResponseBody
export const GetOrgByName401 = ErrorResponseBody
export type GetOrgByName403 = ErrorResponseBody
export const GetOrgByName403 = ErrorResponseBody
export type GetOrgByName500 = ErrorResponseBody
export const GetOrgByName500 = ErrorResponseBody
export type GetOrgByID200 = OrgDetailsDTO
export const GetOrgByID200 = OrgDetailsDTO
export type GetOrgByID401 = ErrorResponseBody
export const GetOrgByID401 = ErrorResponseBody
export type GetOrgByID403 = ErrorResponseBody
export const GetOrgByID403 = ErrorResponseBody
export type GetOrgByID500 = ErrorResponseBody
export const GetOrgByID500 = ErrorResponseBody
export type GetOrgQuota200 = ReadonlyArray<QuotaDTO>
export const GetOrgQuota200 = Schema.Array(QuotaDTO)
export type GetOrgQuota401 = ErrorResponseBody
export const GetOrgQuota401 = ErrorResponseBody
export type GetOrgQuota403 = ErrorResponseBody
export const GetOrgQuota403 = ErrorResponseBody
export type GetOrgQuota404 = ErrorResponseBody
export const GetOrgQuota404 = ErrorResponseBody
export type GetOrgQuota500 = ErrorResponseBody
export const GetOrgQuota500 = ErrorResponseBody
export type GetOrgUsers200 = ReadonlyArray<OrgUserDTO>
export const GetOrgUsers200 = Schema.Array(OrgUserDTO)
export type GetOrgUsers401 = ErrorResponseBody
export const GetOrgUsers401 = ErrorResponseBody
export type GetOrgUsers403 = ErrorResponseBody
export const GetOrgUsers403 = ErrorResponseBody
export type GetOrgUsers500 = ErrorResponseBody
export const GetOrgUsers500 = ErrorResponseBody
export type SearchOrgUsers200 = SearchOrgUsersQueryResult
export const SearchOrgUsers200 = SearchOrgUsersQueryResult
export type SearchOrgUsers401 = ErrorResponseBody
export const SearchOrgUsers401 = ErrorResponseBody
export type SearchOrgUsers403 = ErrorResponseBody
export const SearchOrgUsers403 = ErrorResponseBody
export type SearchOrgUsers500 = ErrorResponseBody
export const SearchOrgUsers500 = ErrorResponseBody
export type SearchPlaylistsParams = { readonly "query"?: string, readonly "limit"?: number }
export const SearchPlaylistsParams = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type SearchPlaylists200 = Playlists
export const SearchPlaylists200 = Playlists
export type SearchPlaylists500 = ErrorResponseBody
export const SearchPlaylists500 = ErrorResponseBody
export type GetPlaylist200 = PlaylistDTO
export const GetPlaylist200 = PlaylistDTO
export type GetPlaylist401 = ErrorResponseBody
export const GetPlaylist401 = ErrorResponseBody
export type GetPlaylist403 = ErrorResponseBody
export const GetPlaylist403 = ErrorResponseBody
export type GetPlaylist404 = ErrorResponseBody
export const GetPlaylist404 = ErrorResponseBody
export type GetPlaylist500 = ErrorResponseBody
export const GetPlaylist500 = ErrorResponseBody
export type GetPlaylistItems200 = ReadonlyArray<PlaylistItemDTO>
export const GetPlaylistItems200 = Schema.Array(PlaylistItemDTO)
export type GetPlaylistItems401 = ErrorResponseBody
export const GetPlaylistItems401 = ErrorResponseBody
export type GetPlaylistItems403 = ErrorResponseBody
export const GetPlaylistItems403 = ErrorResponseBody
export type GetPlaylistItems404 = ErrorResponseBody
export const GetPlaylistItems404 = ErrorResponseBody
export type GetPlaylistItems500 = ErrorResponseBody
export const GetPlaylistItems500 = ErrorResponseBody
export type ViewPublicDashboard200 = DashboardFullWithMeta
export const ViewPublicDashboard200 = DashboardFullWithMeta
export type ViewPublicDashboard400 = PublicError
export const ViewPublicDashboard400 = PublicError
export type ViewPublicDashboard401 = PublicError
export const ViewPublicDashboard401 = PublicError
export type ViewPublicDashboard403 = PublicError
export const ViewPublicDashboard403 = PublicError
export type ViewPublicDashboard404 = PublicError
export const ViewPublicDashboard404 = PublicError
export type ViewPublicDashboard500 = PublicError
export const ViewPublicDashboard500 = PublicError
export type GetPublicAnnotations200 = ReadonlyArray<AnnotationEvent>
export const GetPublicAnnotations200 = Schema.Array(AnnotationEvent)
export type GetPublicAnnotations400 = PublicError
export const GetPublicAnnotations400 = PublicError
export type GetPublicAnnotations401 = PublicError
export const GetPublicAnnotations401 = PublicError
export type GetPublicAnnotations403 = PublicError
export const GetPublicAnnotations403 = PublicError
export type GetPublicAnnotations404 = PublicError
export const GetPublicAnnotations404 = PublicError
export type GetPublicAnnotations500 = PublicError
export const GetPublicAnnotations500 = PublicError
export type SearchQueriesParams = { readonly "datasourceUid"?: ReadonlyArray<string>, readonly "searchString"?: string, readonly "onlyStarred"?: boolean, readonly "sort"?: "time-desc" | "time-asc", readonly "page"?: number, readonly "limit"?: number, readonly "from"?: number, readonly "to"?: number }
export const SearchQueriesParams = Schema.Struct({ "datasourceUid": Schema.optionalKey(Schema.Array(Schema.String)), "searchString": Schema.optionalKey(Schema.String), "onlyStarred": Schema.optionalKey(Schema.Boolean), "sort": Schema.optionalKey(Schema.Literals(["time-desc", "time-asc"]).annotate({ "default": "time-desc" })), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "from": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "to": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type SearchQueries200 = QueryHistorySearchResponse
export const SearchQueries200 = QueryHistorySearchResponse
export type SearchQueries401 = ErrorResponseBody
export const SearchQueries401 = ErrorResponseBody
export type SearchQueries500 = ErrorResponseBody
export const SearchQueries500 = ErrorResponseBody
export type ListRecordingRules200 = ReadonlyArray<RecordingRuleJSON>
export const ListRecordingRules200 = Schema.Array(RecordingRuleJSON)
export type ListRecordingRules401 = ErrorResponseBody
export const ListRecordingRules401 = ErrorResponseBody
export type ListRecordingRules403 = ErrorResponseBody
export const ListRecordingRules403 = ErrorResponseBody
export type ListRecordingRules404 = ErrorResponseBody
export const ListRecordingRules404 = ErrorResponseBody
export type ListRecordingRules500 = ErrorResponseBody
export const ListRecordingRules500 = ErrorResponseBody
export type GetRecordingRuleWriteTarget200 = PrometheusRemoteWriteTargetJSON
export const GetRecordingRuleWriteTarget200 = PrometheusRemoteWriteTargetJSON
export type GetRecordingRuleWriteTarget401 = ErrorResponseBody
export const GetRecordingRuleWriteTarget401 = ErrorResponseBody
export type GetRecordingRuleWriteTarget403 = ErrorResponseBody
export const GetRecordingRuleWriteTarget403 = ErrorResponseBody
export type GetRecordingRuleWriteTarget404 = ErrorResponseBody
export const GetRecordingRuleWriteTarget404 = ErrorResponseBody
export type GetRecordingRuleWriteTarget500 = ErrorResponseBody
export const GetRecordingRuleWriteTarget500 = ErrorResponseBody
export type GetReports200 = ReadonlyArray<Report>
export const GetReports200 = Schema.Array(Report)
export type GetReports401 = ErrorResponseBody
export const GetReports401 = ErrorResponseBody
export type GetReports403 = ErrorResponseBody
export const GetReports403 = ErrorResponseBody
export type GetReports500 = ErrorResponseBody
export const GetReports500 = ErrorResponseBody
export type GetReportsByDashboardUID200 = ReadonlyArray<Report>
export const GetReportsByDashboardUID200 = Schema.Array(Report)
export type GetReportsByDashboardUID401 = ErrorResponseBody
export const GetReportsByDashboardUID401 = ErrorResponseBody
export type GetReportsByDashboardUID403 = ErrorResponseBody
export const GetReportsByDashboardUID403 = ErrorResponseBody
export type GetReportsByDashboardUID500 = ErrorResponseBody
export const GetReportsByDashboardUID500 = ErrorResponseBody
export type GetSettingsImage200 = ReadonlyArray<number>
export const GetSettingsImage200 = Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))
export type GetSettingsImage401 = ErrorResponseBody
export const GetSettingsImage401 = ErrorResponseBody
export type GetSettingsImage403 = ErrorResponseBody
export const GetSettingsImage403 = ErrorResponseBody
export type GetSettingsImage404 = ErrorResponseBody
export const GetSettingsImage404 = ErrorResponseBody
export type GetSettingsImage500 = ErrorResponseBody
export const GetSettingsImage500 = ErrorResponseBody
export type RenderReportCSVsParams = { readonly "dashboards"?: string, readonly "title"?: string }
export const RenderReportCSVsParams = Schema.Struct({ "dashboards": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String) })
export type RenderReportCSVs200 = ReadonlyArray<number>
export const RenderReportCSVs200 = Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))
export type RenderReportCSVs204 = { readonly [x: string]: Schema.Json }
export const RenderReportCSVs204 = Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))
export type RenderReportCSVs400 = ErrorResponseBody
export const RenderReportCSVs400 = ErrorResponseBody
export type RenderReportCSVs401 = ErrorResponseBody
export const RenderReportCSVs401 = ErrorResponseBody
export type RenderReportCSVs500 = ErrorResponseBody
export const RenderReportCSVs500 = ErrorResponseBody
export type RenderReportPDFsParams = { readonly "dashboards"?: string, readonly "orientation"?: string, readonly "layout"?: string, readonly "title"?: string, readonly "scaleFactor"?: string, readonly "includeTables"?: string }
export const RenderReportPDFsParams = Schema.Struct({ "dashboards": Schema.optionalKey(Schema.String), "orientation": Schema.optionalKey(Schema.String), "layout": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "scaleFactor": Schema.optionalKey(Schema.String), "includeTables": Schema.optionalKey(Schema.String) })
export type RenderReportPDFs200 = ReadonlyArray<number>
export const RenderReportPDFs200 = Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))
export type RenderReportPDFs400 = ErrorResponseBody
export const RenderReportPDFs400 = ErrorResponseBody
export type RenderReportPDFs401 = ErrorResponseBody
export const RenderReportPDFs401 = ErrorResponseBody
export type RenderReportPDFs500 = ErrorResponseBody
export const RenderReportPDFs500 = ErrorResponseBody
export type GetReportSettings200 = ReportSettings
export const GetReportSettings200 = ReportSettings
export type GetReportSettings401 = ErrorResponseBody
export const GetReportSettings401 = ErrorResponseBody
export type GetReportSettings403 = ErrorResponseBody
export const GetReportSettings403 = ErrorResponseBody
export type GetReportSettings500 = ErrorResponseBody
export const GetReportSettings500 = ErrorResponseBody
export type GetReport200 = Report
export const GetReport200 = Report
export type GetReport400 = ErrorResponseBody
export const GetReport400 = ErrorResponseBody
export type GetReport401 = ErrorResponseBody
export const GetReport401 = ErrorResponseBody
export type GetReport403 = ErrorResponseBody
export const GetReport403 = ErrorResponseBody
export type GetReport404 = ErrorResponseBody
export const GetReport404 = ErrorResponseBody
export type GetReport500 = ErrorResponseBody
export const GetReport500 = ErrorResponseBody
export type GetMetadata200 = ReadonlyArray<number>
export const GetMetadata200 = Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt().annotate({ "expected": "an integer" })))
export type GetSLO400 = ErrorResponseBody
export const GetSLO400 = ErrorResponseBody
export type GetSLO403 = ErrorResponseBody
export const GetSLO403 = ErrorResponseBody
export type GetSLO500 = ErrorResponseBody
export const GetSLO500 = ErrorResponseBody
export type SearchParams = { readonly "query"?: string, readonly "tag"?: ReadonlyArray<string>, readonly "type"?: "dash-folder" | "dash-db", readonly "dashboardIds"?: ReadonlyArray<number>, readonly "dashboardUIDs"?: ReadonlyArray<string>, readonly "folderIds"?: ReadonlyArray<number>, readonly "folderUIDs"?: ReadonlyArray<string>, readonly "starred"?: boolean, readonly "limit"?: number, readonly "page"?: number, readonly "permission"?: "Edit" | "View", readonly "sort"?: "alpha-asc" | "alpha-desc", readonly "deleted"?: boolean }
export const SearchParams = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "tag": Schema.optionalKey(Schema.Array(Schema.String)), "type": Schema.optionalKey(Schema.Literals(["dash-folder", "dash-db"])), "dashboardIds": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "dashboardUIDs": Schema.optionalKey(Schema.Array(Schema.String)), "folderIds": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" })))), "folderUIDs": Schema.optionalKey(Schema.Array(Schema.String)), "starred": Schema.optionalKey(Schema.Boolean), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "permission": Schema.optionalKey(Schema.Literals(["Edit", "View"]).annotate({ "default": "View" })), "sort": Schema.optionalKey(Schema.Literals(["alpha-asc", "alpha-desc"]).annotate({ "default": "alpha-asc" })), "deleted": Schema.optionalKey(Schema.Boolean) })
export type Search200 = HitList
export const Search200 = HitList
export type Search401 = ErrorResponseBody
export const Search401 = ErrorResponseBody
export type Search422 = ErrorResponseBody
export const Search422 = ErrorResponseBody
export type Search500 = ErrorResponseBody
export const Search500 = ErrorResponseBody
export type ListSortOptions200 = { readonly "description"?: string, readonly "displayName"?: string, readonly "meta"?: string, readonly "name"?: string } & { readonly [x: string]: Schema.Json }
export const ListSortOptions200 = Schema.StructWithRest(Schema.Struct({ "description": Schema.optionalKey(Schema.String), "displayName": Schema.optionalKey(Schema.String), "meta": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))])
export type ListSortOptions401 = ErrorResponseBody
export const ListSortOptions401 = ErrorResponseBody
export type SearchOrgServiceAccountsWithPagingParams = { readonly "Disabled"?: boolean, readonly "expiredTokens"?: boolean, readonly "query"?: string, readonly "perpage"?: number, readonly "page"?: number }
export const SearchOrgServiceAccountsWithPagingParams = Schema.Struct({ "Disabled": Schema.optionalKey(Schema.Boolean), "expiredTokens": Schema.optionalKey(Schema.Boolean), "query": Schema.optionalKey(Schema.String), "perpage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type SearchOrgServiceAccountsWithPaging200 = SearchOrgServiceAccountsResult
export const SearchOrgServiceAccountsWithPaging200 = SearchOrgServiceAccountsResult
export type SearchOrgServiceAccountsWithPaging401 = ErrorResponseBody
export const SearchOrgServiceAccountsWithPaging401 = ErrorResponseBody
export type SearchOrgServiceAccountsWithPaging403 = ErrorResponseBody
export const SearchOrgServiceAccountsWithPaging403 = ErrorResponseBody
export type SearchOrgServiceAccountsWithPaging500 = ErrorResponseBody
export const SearchOrgServiceAccountsWithPaging500 = ErrorResponseBody
export type RetrieveServiceAccount200 = ServiceAccountDTO
export const RetrieveServiceAccount200 = ServiceAccountDTO
export type RetrieveServiceAccount400 = ErrorResponseBody
export const RetrieveServiceAccount400 = ErrorResponseBody
export type RetrieveServiceAccount401 = ErrorResponseBody
export const RetrieveServiceAccount401 = ErrorResponseBody
export type RetrieveServiceAccount403 = ErrorResponseBody
export const RetrieveServiceAccount403 = ErrorResponseBody
export type RetrieveServiceAccount404 = ErrorResponseBody
export const RetrieveServiceAccount404 = ErrorResponseBody
export type RetrieveServiceAccount500 = ErrorResponseBody
export const RetrieveServiceAccount500 = ErrorResponseBody
export type ListTokens200 = ReadonlyArray<TokenDTO>
export const ListTokens200 = Schema.Array(TokenDTO)
export type ListTokens400 = ErrorResponseBody
export const ListTokens400 = ErrorResponseBody
export type ListTokens401 = ErrorResponseBody
export const ListTokens401 = ErrorResponseBody
export type ListTokens403 = ErrorResponseBody
export const ListTokens403 = ErrorResponseBody
export type ListTokens500 = ErrorResponseBody
export const ListTokens500 = ErrorResponseBody
export type RetrieveJWKS200 = { readonly "keys"?: ReadonlyArray<JSONWebKey> } & { readonly [x: string]: Schema.Json }
export const RetrieveJWKS200 = Schema.StructWithRest(Schema.Struct({ "keys": Schema.optionalKey(Schema.Array(JSONWebKey)) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))])
export type RetrieveJWKS500 = ErrorResponseBody
export const RetrieveJWKS500 = ErrorResponseBody
export type GetSharingOptions200 = { readonly "externalEnabled"?: boolean, readonly "externalSnapshotName"?: string, readonly "externalSnapshotURL"?: string } & { readonly [x: string]: Schema.Json }
export const GetSharingOptions200 = Schema.StructWithRest(Schema.Struct({ "externalEnabled": Schema.optionalKey(Schema.Boolean), "externalSnapshotName": Schema.optionalKey(Schema.String), "externalSnapshotURL": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))])
export type GetSharingOptions401 = ErrorResponseBody
export const GetSharingOptions401 = ErrorResponseBody
export type DeleteDashboardSnapshotByDeleteKey200 = SuccessResponseBody
export const DeleteDashboardSnapshotByDeleteKey200 = SuccessResponseBody
export type DeleteDashboardSnapshotByDeleteKey401 = ErrorResponseBody
export const DeleteDashboardSnapshotByDeleteKey401 = ErrorResponseBody
export type DeleteDashboardSnapshotByDeleteKey403 = ErrorResponseBody
export const DeleteDashboardSnapshotByDeleteKey403 = ErrorResponseBody
export type DeleteDashboardSnapshotByDeleteKey404 = ErrorResponseBody
export const DeleteDashboardSnapshotByDeleteKey404 = ErrorResponseBody
export type DeleteDashboardSnapshotByDeleteKey500 = ErrorResponseBody
export const DeleteDashboardSnapshotByDeleteKey500 = ErrorResponseBody
export type GetDashboardSnapshot400 = ErrorResponseBody
export const GetDashboardSnapshot400 = ErrorResponseBody
export type GetDashboardSnapshot404 = ErrorResponseBody
export const GetDashboardSnapshot404 = ErrorResponseBody
export type GetDashboardSnapshot500 = ErrorResponseBody
export const GetDashboardSnapshot500 = ErrorResponseBody
export type SearchTeamsParams = { readonly "page"?: number, readonly "perpage"?: number, readonly "name"?: string, readonly "query"?: string, readonly "accesscontrol"?: boolean, readonly "sort"?: string }
export const SearchTeamsParams = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perpage": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "name": Schema.optionalKey(Schema.String), "query": Schema.optionalKey(Schema.String), "accesscontrol": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })), "sort": Schema.optionalKey(Schema.String) })
export type SearchTeams200 = SearchTeamQueryResult
export const SearchTeams200 = SearchTeamQueryResult
export type SearchTeams401 = ErrorResponseBody
export const SearchTeams401 = ErrorResponseBody
export type SearchTeams403 = ErrorResponseBody
export const SearchTeams403 = ErrorResponseBody
export type SearchTeams500 = ErrorResponseBody
export const SearchTeams500 = ErrorResponseBody
export type GetTeamGroupsApi200 = ReadonlyArray<TeamGroupDTO>
export const GetTeamGroupsApi200 = Schema.Array(TeamGroupDTO)
export type GetTeamGroupsApi400 = ErrorResponseBody
export const GetTeamGroupsApi400 = ErrorResponseBody
export type GetTeamGroupsApi401 = ErrorResponseBody
export const GetTeamGroupsApi401 = ErrorResponseBody
export type GetTeamGroupsApi403 = ErrorResponseBody
export const GetTeamGroupsApi403 = ErrorResponseBody
export type GetTeamGroupsApi404 = ErrorResponseBody
export const GetTeamGroupsApi404 = ErrorResponseBody
export type GetTeamGroupsApi500 = ErrorResponseBody
export const GetTeamGroupsApi500 = ErrorResponseBody
export type SearchTeamGroupsParams = { readonly "page"?: number, readonly "perpage"?: number, readonly "query"?: string, readonly "name"?: string }
export const SearchTeamGroupsParams = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "perpage": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "query": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String) })
export type SearchTeamGroups200 = ReadonlyArray<SearchTeamGroupsQueryResult>
export const SearchTeamGroups200 = Schema.Array(SearchTeamGroupsQueryResult)
export type SearchTeamGroups400 = ErrorResponseBody
export const SearchTeamGroups400 = ErrorResponseBody
export type SearchTeamGroups401 = ErrorResponseBody
export const SearchTeamGroups401 = ErrorResponseBody
export type SearchTeamGroups403 = ErrorResponseBody
export const SearchTeamGroups403 = ErrorResponseBody
export type SearchTeamGroups500 = ErrorResponseBody
export const SearchTeamGroups500 = ErrorResponseBody
export type GetTeamByIDParams = { readonly "accesscontrol"?: boolean }
export const GetTeamByIDParams = Schema.Struct({ "accesscontrol": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })) })
export type GetTeamByID200 = TeamDTO
export const GetTeamByID200 = TeamDTO
export type GetTeamByID401 = ErrorResponseBody
export const GetTeamByID401 = ErrorResponseBody
export type GetTeamByID403 = ErrorResponseBody
export const GetTeamByID403 = ErrorResponseBody
export type GetTeamByID404 = ErrorResponseBody
export const GetTeamByID404 = ErrorResponseBody
export type GetTeamByID500 = ErrorResponseBody
export const GetTeamByID500 = ErrorResponseBody
export type GetTeamMembers200 = ReadonlyArray<TeamMemberDTO>
export const GetTeamMembers200 = Schema.Array(TeamMemberDTO)
export type GetTeamMembers401 = ErrorResponseBody
export const GetTeamMembers401 = ErrorResponseBody
export type GetTeamMembers403 = ErrorResponseBody
export const GetTeamMembers403 = ErrorResponseBody
export type GetTeamMembers404 = ErrorResponseBody
export const GetTeamMembers404 = ErrorResponseBody
export type GetTeamMembers500 = ErrorResponseBody
export const GetTeamMembers500 = ErrorResponseBody
export type GetTeamPreferences200 = PreferencesSpec
export const GetTeamPreferences200 = PreferencesSpec
export type GetTeamPreferences401 = ErrorResponseBody
export const GetTeamPreferences401 = ErrorResponseBody
export type GetTeamPreferences500 = ErrorResponseBody
export const GetTeamPreferences500 = ErrorResponseBody
export type GetSignedInUser200 = UserProfileDTO
export const GetSignedInUser200 = UserProfileDTO
export type GetSignedInUser401 = ErrorResponseBody
export const GetSignedInUser401 = ErrorResponseBody
export type GetSignedInUser403 = ErrorResponseBody
export const GetSignedInUser403 = ErrorResponseBody
export type GetSignedInUser404 = ErrorResponseBody
export const GetSignedInUser404 = ErrorResponseBody
export type GetSignedInUser500 = ErrorResponseBody
export const GetSignedInUser500 = ErrorResponseBody
export type GetUserAuthTokens200 = ReadonlyArray<UserToken>
export const GetUserAuthTokens200 = Schema.Array(UserToken)
export type GetUserAuthTokens401 = ErrorResponseBody
export const GetUserAuthTokens401 = ErrorResponseBody
export type GetUserAuthTokens403 = ErrorResponseBody
export const GetUserAuthTokens403 = ErrorResponseBody
export type GetUserAuthTokens500 = ErrorResponseBody
export const GetUserAuthTokens500 = ErrorResponseBody
export type UpdateUserEmail302 = SuccessResponseBody
export const UpdateUserEmail302 = SuccessResponseBody
export type GetSignedInUserOrgList200 = ReadonlyArray<UserOrgDTO>
export const GetSignedInUserOrgList200 = Schema.Array(UserOrgDTO)
export type GetSignedInUserOrgList401 = ErrorResponseBody
export const GetSignedInUserOrgList401 = ErrorResponseBody
export type GetSignedInUserOrgList403 = ErrorResponseBody
export const GetSignedInUserOrgList403 = ErrorResponseBody
export type GetSignedInUserOrgList500 = ErrorResponseBody
export const GetSignedInUserOrgList500 = ErrorResponseBody
export type GetUserPreferences200 = PreferencesSpec
export const GetUserPreferences200 = PreferencesSpec
export type GetUserPreferences401 = ErrorResponseBody
export const GetUserPreferences401 = ErrorResponseBody
export type GetUserPreferences500 = ErrorResponseBody
export const GetUserPreferences500 = ErrorResponseBody
export type GetUserQuotas200 = ReadonlyArray<QuotaDTO>
export const GetUserQuotas200 = Schema.Array(QuotaDTO)
export type GetUserQuotas401 = ErrorResponseBody
export const GetUserQuotas401 = ErrorResponseBody
export type GetUserQuotas403 = ErrorResponseBody
export const GetUserQuotas403 = ErrorResponseBody
export type GetUserQuotas404 = ErrorResponseBody
export const GetUserQuotas404 = ErrorResponseBody
export type GetUserQuotas500 = ErrorResponseBody
export const GetUserQuotas500 = ErrorResponseBody
export type GetSignedInUserTeamList200 = ReadonlyArray<TeamDTO>
export const GetSignedInUserTeamList200 = Schema.Array(TeamDTO)
export type GetSignedInUserTeamList401 = ErrorResponseBody
export const GetSignedInUserTeamList401 = ErrorResponseBody
export type GetSignedInUserTeamList403 = ErrorResponseBody
export const GetSignedInUserTeamList403 = ErrorResponseBody
export type GetSignedInUserTeamList500 = ErrorResponseBody
export const GetSignedInUserTeamList500 = ErrorResponseBody
export type SearchUsersParams = { readonly "perpage"?: number, readonly "page"?: number }
export const SearchUsersParams = Schema.Struct({ "perpage": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))), "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt().annotate({ "expected": "an integer" }))) })
export type SearchUsers200 = ReadonlyArray<UserSearchHitDTO>
export const SearchUsers200 = Schema.Array(UserSearchHitDTO)
export type SearchUsers401 = ErrorResponseBody
export const SearchUsers401 = ErrorResponseBody
export type SearchUsers403 = ErrorResponseBody
export const SearchUsers403 = ErrorResponseBody
export type SearchUsers500 = ErrorResponseBody
export const SearchUsers500 = ErrorResponseBody
export type GetUserByLoginOrEmailParams = { readonly "loginOrEmail": string }
export const GetUserByLoginOrEmailParams = Schema.Struct({ "loginOrEmail": Schema.String })
export type GetUserByLoginOrEmail200 = UserProfileDTO
export const GetUserByLoginOrEmail200 = UserProfileDTO
export type GetUserByLoginOrEmail401 = ErrorResponseBody
export const GetUserByLoginOrEmail401 = ErrorResponseBody
export type GetUserByLoginOrEmail403 = ErrorResponseBody
export const GetUserByLoginOrEmail403 = ErrorResponseBody
export type GetUserByLoginOrEmail404 = ErrorResponseBody
export const GetUserByLoginOrEmail404 = ErrorResponseBody
export type GetUserByLoginOrEmail500 = ErrorResponseBody
export const GetUserByLoginOrEmail500 = ErrorResponseBody
export type SearchUsersWithPaging200 = SearchUserQueryResult
export const SearchUsersWithPaging200 = SearchUserQueryResult
export type SearchUsersWithPaging401 = ErrorResponseBody
export const SearchUsersWithPaging401 = ErrorResponseBody
export type SearchUsersWithPaging403 = ErrorResponseBody
export const SearchUsersWithPaging403 = ErrorResponseBody
export type SearchUsersWithPaging404 = ErrorResponseBody
export const SearchUsersWithPaging404 = ErrorResponseBody
export type SearchUsersWithPaging500 = ErrorResponseBody
export const SearchUsersWithPaging500 = ErrorResponseBody
export type GetUserByID200 = UserProfileDTO
export const GetUserByID200 = UserProfileDTO
export type GetUserByID401 = ErrorResponseBody
export const GetUserByID401 = ErrorResponseBody
export type GetUserByID403 = ErrorResponseBody
export const GetUserByID403 = ErrorResponseBody
export type GetUserByID404 = ErrorResponseBody
export const GetUserByID404 = ErrorResponseBody
export type GetUserByID500 = ErrorResponseBody
export const GetUserByID500 = ErrorResponseBody
export type GetUserOrgList200 = ReadonlyArray<UserOrgDTO>
export const GetUserOrgList200 = Schema.Array(UserOrgDTO)
export type GetUserOrgList401 = ErrorResponseBody
export const GetUserOrgList401 = ErrorResponseBody
export type GetUserOrgList403 = ErrorResponseBody
export const GetUserOrgList403 = ErrorResponseBody
export type GetUserOrgList404 = ErrorResponseBody
export const GetUserOrgList404 = ErrorResponseBody
export type GetUserOrgList500 = ErrorResponseBody
export const GetUserOrgList500 = ErrorResponseBody
export type GetUserTeams200 = ReadonlyArray<TeamDTO>
export const GetUserTeams200 = Schema.Array(TeamDTO)
export type GetUserTeams401 = ErrorResponseBody
export const GetUserTeams401 = ErrorResponseBody
export type GetUserTeams403 = ErrorResponseBody
export const GetUserTeams403 = ErrorResponseBody
export type GetUserTeams404 = ErrorResponseBody
export const GetUserTeams404 = ErrorResponseBody
export type GetUserTeams500 = ErrorResponseBody
export const GetUserTeams500 = ErrorResponseBody
export type RouteGetAlertRules200 = ProvisionedAlertRules
export const RouteGetAlertRules200 = ProvisionedAlertRules
export type RouteGetAlertRules403 = ForbiddenError
export const RouteGetAlertRules403 = ForbiddenError
export type RouteGetAlertRulesExportParams = { readonly "download"?: boolean, readonly "format"?: "yaml" | "json" | "hcl", readonly "folderUid"?: ReadonlyArray<string>, readonly "group"?: string, readonly "ruleUid"?: string }
export const RouteGetAlertRulesExportParams = Schema.Struct({ "download": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })), "format": Schema.optionalKey(Schema.Literals(["yaml", "json", "hcl"]).annotate({ "default": "yaml" })), "folderUid": Schema.optionalKey(Schema.Array(Schema.String)), "group": Schema.optionalKey(Schema.String), "ruleUid": Schema.optionalKey(Schema.String) })
export type RouteGetAlertRulesExport200 = AlertingFileExport
export const RouteGetAlertRulesExport200 = AlertingFileExport
export type RouteGetAlertRulesExport403 = ForbiddenError
export const RouteGetAlertRulesExport403 = ForbiddenError
export type RouteGetAlertRule200 = ProvisionedAlertRule
export const RouteGetAlertRule200 = ProvisionedAlertRule
export type RouteGetAlertRule403 = ForbiddenError
export const RouteGetAlertRule403 = ForbiddenError
export type RouteGetAlertRuleExportParams = { readonly "download"?: boolean, readonly "format"?: "yaml" | "json" | "hcl" }
export const RouteGetAlertRuleExportParams = Schema.Struct({ "download": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })), "format": Schema.optionalKey(Schema.Literals(["yaml", "json", "hcl"]).annotate({ "default": "yaml" })) })
export type RouteGetAlertRuleExport200 = AlertingFileExport
export const RouteGetAlertRuleExport200 = AlertingFileExport
export type RouteGetAlertRuleExport403 = ForbiddenError
export const RouteGetAlertRuleExport403 = ForbiddenError
export type RouteGetContactpointsParams = { readonly "name"?: string }
export const RouteGetContactpointsParams = Schema.Struct({ "name": Schema.optionalKey(Schema.String) })
export type RouteGetContactpoints200 = ContactPoints
export const RouteGetContactpoints200 = ContactPoints
export type RouteGetContactpoints403 = ForbiddenError
export const RouteGetContactpoints403 = ForbiddenError
export type RouteGetContactpointsExportParams = { readonly "download"?: boolean, readonly "format"?: "yaml" | "json" | "hcl", readonly "decrypt"?: boolean, readonly "name"?: string }
export const RouteGetContactpointsExportParams = Schema.Struct({ "download": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })), "format": Schema.optionalKey(Schema.Literals(["yaml", "json", "hcl"]).annotate({ "default": "yaml" })), "decrypt": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })), "name": Schema.optionalKey(Schema.String) })
export type RouteGetContactpointsExport200 = AlertingFileExport
export const RouteGetContactpointsExport200 = AlertingFileExport
export type RouteGetContactpointsExport403 = PermissionDenied
export const RouteGetContactpointsExport403 = PermissionDenied
export type RouteGetAlertRuleGroup200 = AlertRuleGroup
export const RouteGetAlertRuleGroup200 = AlertRuleGroup
export type RouteGetAlertRuleGroup403 = ForbiddenError
export const RouteGetAlertRuleGroup403 = ForbiddenError
export type RouteGetAlertRuleGroupExportParams = { readonly "download"?: boolean, readonly "format"?: "yaml" | "json" | "hcl" }
export const RouteGetAlertRuleGroupExportParams = Schema.Struct({ "download": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })), "format": Schema.optionalKey(Schema.Literals(["yaml", "json", "hcl"]).annotate({ "default": "yaml" })) })
export type RouteGetAlertRuleGroupExport200 = AlertingFileExport
export const RouteGetAlertRuleGroupExport200 = AlertingFileExport
export type RouteGetAlertRuleGroupExport403 = ForbiddenError
export const RouteGetAlertRuleGroupExport403 = ForbiddenError
export type RouteGetMuteTimings200 = MuteTimings
export const RouteGetMuteTimings200 = MuteTimings
export type RouteGetMuteTimings403 = ForbiddenError
export const RouteGetMuteTimings403 = ForbiddenError
export type RouteExportMuteTimingsParams = { readonly "download"?: boolean, readonly "format"?: "yaml" | "json" | "hcl" }
export const RouteExportMuteTimingsParams = Schema.Struct({ "download": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })), "format": Schema.optionalKey(Schema.Literals(["yaml", "json", "hcl"]).annotate({ "default": "yaml" })) })
export type RouteExportMuteTimings200 = AlertingFileExport
export const RouteExportMuteTimings200 = AlertingFileExport
export type RouteExportMuteTimings403 = PermissionDenied
export const RouteExportMuteTimings403 = PermissionDenied
export type RouteGetMuteTiming200 = MuteTimeInterval
export const RouteGetMuteTiming200 = MuteTimeInterval
export type RouteGetMuteTiming403 = ForbiddenError
export const RouteGetMuteTiming403 = ForbiddenError
export type RouteExportMuteTimingParams = { readonly "download"?: boolean, readonly "format"?: "yaml" | "json" | "hcl" }
export const RouteExportMuteTimingParams = Schema.Struct({ "download": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })), "format": Schema.optionalKey(Schema.Literals(["yaml", "json", "hcl"]).annotate({ "default": "yaml" })) })
export type RouteExportMuteTiming200 = AlertingFileExport
export const RouteExportMuteTiming200 = AlertingFileExport
export type RouteExportMuteTiming403 = PermissionDenied
export const RouteExportMuteTiming403 = PermissionDenied
export type RouteGetPolicyTree200 = Route
export const RouteGetPolicyTree200 = Route
export type RouteGetPolicyTree403 = ForbiddenError
export const RouteGetPolicyTree403 = ForbiddenError
export type RouteGetPolicyTreeExport200 = AlertingFileExport
export const RouteGetPolicyTreeExport200 = AlertingFileExport
export type RouteGetPolicyTreeExport403 = ForbiddenError
export const RouteGetPolicyTreeExport403 = ForbiddenError
export type RouteGetPolicyTreeExport404 = NotFound
export const RouteGetPolicyTreeExport404 = NotFound
export type RouteGetTemplates200 = NotificationTemplates
export const RouteGetTemplates200 = NotificationTemplates
export type RouteGetTemplates403 = ForbiddenError
export const RouteGetTemplates403 = ForbiddenError
export type RouteGetTemplate200 = NotificationTemplate
export const RouteGetTemplate200 = NotificationTemplate
export type RouteGetTemplate403 = ForbiddenError
export const RouteGetTemplate403 = ForbiddenError
export type RouteGetTemplate404 = PublicError1
export const RouteGetTemplate404 = PublicError1
export type ListAllProvidersSettings200 = ReadonlyArray<{ readonly "id"?: string, readonly "provider"?: string, readonly "settings"?: { readonly [x: string]: Schema.Json }, readonly "source"?: string } & { readonly [x: string]: Schema.Json }>
export const ListAllProvidersSettings200 = Schema.Array(Schema.StructWithRest(Schema.Struct({ "id": Schema.optionalKey(Schema.String), "provider": Schema.optionalKey(Schema.String), "settings": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "source": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))]))
export type ListAllProvidersSettings400 = ErrorResponseBody
export const ListAllProvidersSettings400 = ErrorResponseBody
export type ListAllProvidersSettings401 = ErrorResponseBody
export const ListAllProvidersSettings401 = ErrorResponseBody
export type ListAllProvidersSettings403 = ErrorResponseBody
export const ListAllProvidersSettings403 = ErrorResponseBody
export type GetProviderSettings200 = { readonly "id"?: string, readonly "provider"?: string, readonly "settings"?: { readonly [x: string]: Schema.Json }, readonly "source"?: string } & { readonly [x: string]: Schema.Json }
export const GetProviderSettings200 = Schema.StructWithRest(Schema.Struct({ "id": Schema.optionalKey(Schema.String), "provider": Schema.optionalKey(Schema.String), "settings": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))), "source": Schema.optionalKey(Schema.String) }), [Schema.Record(Schema.String, Schema.Json.annotate({ "expected": "JSON value" }))])
export type GetProviderSettings400 = ErrorResponseBody
export const GetProviderSettings400 = ErrorResponseBody
export type GetProviderSettings401 = ErrorResponseBody
export const GetProviderSettings401 = ErrorResponseBody
export type GetProviderSettings403 = ErrorResponseBody
export const GetProviderSettings403 = ErrorResponseBody
export type GetProviderSettings404 = ErrorResponseBody
export const GetProviderSettings404 = ErrorResponseBody

export interface OperationConfig {
  /**
   * Whether or not the response should be included in the value returned from
   * an operation.
   *
   * If set to `true`, a tuple of `[A, HttpClientResponse]` will be returned,
   * where `A` is the success type of the operation.
   *
   * If set to `false`, only the success type of the operation will be returned.
   */
  readonly includeResponse?: boolean | undefined
}

/**
 * A utility type which optionally includes the response in the return result
 * of an operation based upon the value of the `includeResponse` configuration
 * option.
 */
export type WithOptionalResponse<A, Config extends OperationConfig> = Config extends {
  readonly includeResponse: true
} ? [A, HttpClientResponse.HttpClientResponse] : A

export const make = (
  httpClient: HttpClient.HttpClient,
  options: {
    readonly transformClient?: ((client: HttpClient.HttpClient) => Effect.Effect<HttpClient.HttpClient>) | undefined
  } = {}
): Grafana => {
  const unexpectedStatus = (response: HttpClientResponse.HttpClientResponse) =>
    Effect.flatMap(
      Effect.orElseSucceed(response.json, () => "Unexpected status code"),
      (description) =>
        Effect.fail(
          new HttpClientError.HttpClientError({
            reason: new HttpClientError.StatusCodeError({
              request: response.request,
              response,
              description: typeof description === "string" ? description : JSON.stringify(description),
            }),
          }),
        ),
    )
  const withResponse = <Config extends OperationConfig>(config: Config | undefined) => (
    f: (response: HttpClientResponse.HttpClientResponse) => Effect.Effect<any, any>,
  ): (request: HttpClientRequest.HttpClientRequest) => Effect.Effect<any, any> => {
    const withOptionalResponse = (
      config?.includeResponse
        ? (response: HttpClientResponse.HttpClientResponse) => Effect.map(f(response), (a) => [a, response])
        : (response: HttpClientResponse.HttpClientResponse) => f(response)
    ) as any
    return options?.transformClient
      ? (request) =>
          Effect.flatMap(
            Effect.flatMap(options.transformClient!(httpClient), (client) => client.execute(request)),
            withOptionalResponse
          )
      : (request) => Effect.flatMap(httpClient.execute(request), withOptionalResponse)
  }
  const __encodePathParam = encodeURIComponent
  const __makePathRequest = (
    method: (url: string) => HttpClientRequest.HttpClientRequest,
    parameters: ReadonlyArray<string>,
    getPath: () => string,
  ) => Effect.suspend(() => {
    const fail = (description: string, cause?: unknown) => Effect.fail(
      new HttpClientError.HttpClientError({
        reason: new HttpClientError.InvalidUrlError({
          request: method(""),
          cause,
          description,
        }),
      }),
    )
    if (parameters.some((value) => value === "" || /^(?:\.|%2e){1,2}$/i.test(value))) {
      return fail("Path parameters must be non-empty and cannot be dot segments")
    }
    let path: string
    try {
      path = getPath()
    } catch (cause) {
      return fail("Failed to encode path parameter", cause)
    }
    if (path.split("/").some((segment) => /^(?:\.|%2e){1,2}$/i.test(segment))) {
      return fail("Request paths cannot contain dot segments")
    }
    return Effect.succeed(method(path))
  })
  const decodeVoidError = <const Tag extends string>(tag: Tag) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      Effect.fail(GrafanaError(tag, undefined, response))
  const decodeSuccess =
    <Schema extends Schema.Constraint>(schema: Schema) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      HttpClientResponse.schemaBodyJson(schema)(response)
  const decodeError =
    <const Tag extends string, Schema extends Schema.Constraint>(tag: Tag, schema: Schema) =>
    (response: HttpClientResponse.HttpClientResponse) =>
      Effect.flatMap(
        HttpClientResponse.schemaBodyJson(schema)(response),
        (cause) => Effect.fail(GrafanaError(tag, cause, response)),
      )
  return {
    httpClient,
    "listRoles": (options) => HttpClientRequest.get("/access-control/roles").pipe(
      HttpClientRequest.setUrlParams({ "delegatable": options?.params?.["delegatable"] as any, "includeHidden": options?.params?.["includeHidden"] as any, "targetOrgId": options?.params?.["targetOrgId"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListRoles200),
      "403": decodeError("ListRoles403", ListRoles403),
      "500": decodeError("ListRoles500", ListRoles500),
      orElse: unexpectedStatus
    }))
    ),
    "getRole": (roleUID, options) => __makePathRequest(HttpClientRequest.get, [roleUID], () => "/access-control/roles/" + __encodePathParam(roleUID) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRole200),
      "403": decodeError("GetRole403", GetRole403),
      "500": decodeError("GetRole500", GetRole500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getRoleAssignments": (roleUID, options) => __makePathRequest(HttpClientRequest.get, [roleUID], () => "/access-control/roles/" + __encodePathParam(roleUID) + "/assignments").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRoleAssignments200),
      "403": decodeError("GetRoleAssignments403", GetRoleAssignments403),
      "404": decodeError("GetRoleAssignments404", GetRoleAssignments404),
      "500": decodeError("GetRoleAssignments500", GetRoleAssignments500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getAccessControlStatus": (options) => HttpClientRequest.get("/access-control/status").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAccessControlStatus200),
      "403": decodeError("GetAccessControlStatus403", GetAccessControlStatus403),
      "404": decodeError("GetAccessControlStatus404", GetAccessControlStatus404),
      "500": decodeError("GetAccessControlStatus500", GetAccessControlStatus500),
      orElse: unexpectedStatus
    }))
    ),
    "listTeamRoles": (teamId, options) => __makePathRequest(HttpClientRequest.get, [teamId], () => "/access-control/teams/" + __encodePathParam(teamId) + "/roles").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "targetOrgId": options?.params?.["targetOrgId"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListTeamRoles200),
      "400": decodeError("ListTeamRoles400", ListTeamRoles400),
      "403": decodeError("ListTeamRoles403", ListTeamRoles403),
      "500": decodeError("ListTeamRoles500", ListTeamRoles500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "listUserRoles": (userId, options) => __makePathRequest(HttpClientRequest.get, [userId], () => "/access-control/users/" + __encodePathParam(userId) + "/roles").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "includeHidden": options?.params?.["includeHidden"] as any, "targetOrgId": options?.params?.["targetOrgId"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListUserRoles200),
      "400": decodeError("ListUserRoles400", ListUserRoles400),
      "403": decodeError("ListUserRoles403", ListUserRoles403),
      "500": decodeError("ListUserRoles500", ListUserRoles500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getResourceDescription": (resource, options) => __makePathRequest(HttpClientRequest.get, [resource], () => "/access-control/" + __encodePathParam(resource) + "/description").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetResourceDescription200),
      "403": decodeError("GetResourceDescription403", GetResourceDescription403),
      "500": decodeError("GetResourceDescription500", GetResourceDescription500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getResourcePermissions": (resource, resourceID, options) => __makePathRequest(HttpClientRequest.get, [resource, resourceID], () => "/access-control/" + __encodePathParam(resource) + "/" + __encodePathParam(resourceID) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetResourcePermissions200),
      "403": decodeError("GetResourcePermissions403", GetResourcePermissions403),
      "404": decodeError("GetResourcePermissions404", GetResourcePermissions404),
      "500": decodeError("GetResourcePermissions500", GetResourcePermissions500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getSyncStatus": (options) => HttpClientRequest.get("/admin/ldap-sync-status").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSyncStatus200),
      "401": decodeError("GetSyncStatus401", GetSyncStatus401),
      "403": decodeError("GetSyncStatus403", GetSyncStatus403),
      "500": decodeError("GetSyncStatus500", GetSyncStatus500),
      orElse: unexpectedStatus
    }))
    ),
    "getLDAPStatus": (options) => HttpClientRequest.get("/admin/ldap/status").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLDAPStatus200),
      "401": decodeError("GetLDAPStatus401", GetLDAPStatus401),
      "403": decodeError("GetLDAPStatus403", GetLDAPStatus403),
      "500": decodeError("GetLDAPStatus500", GetLDAPStatus500),
      orElse: unexpectedStatus
    }))
    ),
    "getUserFromLDAP": (userName, options) => __makePathRequest(HttpClientRequest.get, [userName], () => "/admin/ldap/" + __encodePathParam(userName) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserFromLDAP200),
      "401": decodeError("GetUserFromLDAP401", GetUserFromLDAP401),
      "403": decodeError("GetUserFromLDAP403", GetUserFromLDAP403),
      "500": decodeError("GetUserFromLDAP500", GetUserFromLDAP500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "adminGetSettings": (options) => HttpClientRequest.get("/admin/settings").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(AdminGetSettings200),
      "401": decodeError("AdminGetSettings401", AdminGetSettings401),
      "403": decodeError("AdminGetSettings403", AdminGetSettings403),
      orElse: unexpectedStatus
    }))
    ),
    "adminGetStats": (options) => HttpClientRequest.get("/admin/stats").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(AdminGetStats200),
      "401": decodeError("AdminGetStats401", AdminGetStats401),
      "403": decodeError("AdminGetStats403", AdminGetStats403),
      "500": decodeError("AdminGetStats500", AdminGetStats500),
      orElse: unexpectedStatus
    }))
    ),
    "adminGetUserAuthTokens": (userId, options) => __makePathRequest(HttpClientRequest.get, [userId], () => "/admin/users/" + __encodePathParam(userId) + "/auth-tokens").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(AdminGetUserAuthTokens200),
      "401": decodeError("AdminGetUserAuthTokens401", AdminGetUserAuthTokens401),
      "403": decodeError("AdminGetUserAuthTokens403", AdminGetUserAuthTokens403),
      "500": decodeError("AdminGetUserAuthTokens500", AdminGetUserAuthTokens500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getUserQuota": (userId, options) => __makePathRequest(HttpClientRequest.get, [userId], () => "/admin/users/" + __encodePathParam(userId) + "/quotas").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserQuota200),
      "401": decodeError("GetUserQuota401", GetUserQuota401),
      "403": decodeError("GetUserQuota403", GetUserQuota403),
      "404": decodeError("GetUserQuota404", GetUserQuota404),
      "500": decodeError("GetUserQuota500", GetUserQuota500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getAnnotations": (options) => HttpClientRequest.get("/annotations").pipe(
      HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "userId": options?.params?.["userId"] as any, "userUID": options?.params?.["userUID"] as any, "alertId": options?.params?.["alertId"] as any, "alertUID": options?.params?.["alertUID"] as any, "dashboardId": options?.params?.["dashboardId"] as any, "dashboardUID": options?.params?.["dashboardUID"] as any, "panelId": options?.params?.["panelId"] as any, "limit": options?.params?.["limit"] as any, "tags": options?.params?.["tags"] as any, "type": options?.params?.["type"] as any, "matchAny": options?.params?.["matchAny"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAnnotations200),
      "401": decodeError("GetAnnotations401", GetAnnotations401),
      "500": decodeError("GetAnnotations500", GetAnnotations500),
      orElse: unexpectedStatus
    }))
    ),
    "getAnnotationTags": (options) => HttpClientRequest.get("/annotations/tags").pipe(
      HttpClientRequest.setUrlParams({ "tag": options?.params?.["tag"] as any, "limit": options?.params?.["limit"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAnnotationTags200),
      "401": decodeError("GetAnnotationTags401", GetAnnotationTags401),
      "500": decodeError("GetAnnotationTags500", GetAnnotationTags500),
      orElse: unexpectedStatus
    }))
    ),
    "getAnnotationByID": (annotationId, options) => __makePathRequest(HttpClientRequest.get, [annotationId], () => "/annotations/" + __encodePathParam(annotationId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAnnotationByID200),
      "401": decodeError("GetAnnotationByID401", GetAnnotationByID401),
      "500": decodeError("GetAnnotationByID500", GetAnnotationByID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "listDevices": (options) => HttpClientRequest.get("/anonymous/devices").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListDevices200),
      "401": decodeError("ListDevices401", ListDevices401),
      "403": decodeError("ListDevices403", ListDevices403),
      "404": decodeError("ListDevices404", ListDevices404),
      "500": decodeError("ListDevices500", ListDevices500),
      orElse: unexpectedStatus
    }))
    ),
    "SearchDevices": (options) => HttpClientRequest.get("/anonymous/search").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchDevices200),
      "401": decodeError("SearchDevices401", SearchDevices401),
      "403": decodeError("SearchDevices403", SearchDevices403),
      "404": decodeError("SearchDevices404", SearchDevices404),
      "500": decodeError("SearchDevices500", SearchDevices500),
      orElse: unexpectedStatus
    }))
    ),
    "getSessionList": (options) => HttpClientRequest.get("/cloudmigration/migration").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSessionList200),
      "401": decodeError("GetSessionList401", GetSessionList401),
      "403": decodeError("GetSessionList403", GetSessionList403),
      "500": decodeError("GetSessionList500", GetSessionList500),
      orElse: unexpectedStatus
    }))
    ),
    "getSession": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/cloudmigration/migration/" + __encodePathParam(uid) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSession200),
      "400": decodeError("GetSession400", GetSession400),
      "401": decodeError("GetSession401", GetSession401),
      "403": decodeError("GetSession403", GetSession403),
      "500": decodeError("GetSession500", GetSession500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getSnapshot": (uid, snapshotUid, options) => __makePathRequest(HttpClientRequest.get, [uid, snapshotUid], () => "/cloudmigration/migration/" + __encodePathParam(uid) + "/snapshot/" + __encodePathParam(snapshotUid) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "resultPage": options?.params?.["resultPage"] as any, "resultLimit": options?.params?.["resultLimit"] as any, "resultSortColumn": options?.params?.["resultSortColumn"] as any, "resultSortOrder": options?.params?.["resultSortOrder"] as any, "errorsOnly": options?.params?.["errorsOnly"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSnapshot200),
      "400": decodeError("GetSnapshot400", GetSnapshot400),
      "401": decodeError("GetSnapshot401", GetSnapshot401),
      "403": decodeError("GetSnapshot403", GetSnapshot403),
      "500": decodeError("GetSnapshot500", GetSnapshot500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getShapshotList": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/cloudmigration/migration/" + __encodePathParam(uid) + "/snapshots").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "page": options?.params?.["page"] as any, "limit": options?.params?.["limit"] as any, "sort": options?.params?.["sort"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetShapshotList200),
      "400": decodeError("GetShapshotList400", GetShapshotList400),
      "401": decodeError("GetShapshotList401", GetShapshotList401),
      "403": decodeError("GetShapshotList403", GetShapshotList403),
      "500": decodeError("GetShapshotList500", GetShapshotList500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getResourceDependencies": (options) => HttpClientRequest.get("/cloudmigration/resources/dependencies").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetResourceDependencies200),
      orElse: unexpectedStatus
    }))
    ),
    "getCloudMigrationToken": (options) => HttpClientRequest.get("/cloudmigration/token").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCloudMigrationToken200),
      "401": decodeError("GetCloudMigrationToken401", GetCloudMigrationToken401),
      "403": decodeError("GetCloudMigrationToken403", GetCloudMigrationToken403),
      "404": decodeError("GetCloudMigrationToken404", GetCloudMigrationToken404),
      "500": decodeError("GetCloudMigrationToken500", GetCloudMigrationToken500),
      orElse: unexpectedStatus
    }))
    ),
    "RouteConvertPrometheusCortexGetRules": (options) => HttpClientRequest.get("/convert/api/prom/rules").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
    ),
    "RouteConvertPrometheusCortexGetNamespace": (NamespaceTitle, options) => __makePathRequest(HttpClientRequest.get, [NamespaceTitle], () => "/convert/api/prom/rules/" + __encodePathParam(NamespaceTitle) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RouteConvertPrometheusCortexGetRuleGroup": (NamespaceTitle, Group, options) => __makePathRequest(HttpClientRequest.get, [NamespaceTitle, Group], () => "/convert/api/prom/rules/" + __encodePathParam(NamespaceTitle) + "/" + __encodePathParam(Group) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RouteConvertPrometheusGetRules": (options) => HttpClientRequest.get("/convert/prometheus/config/v1/rules").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
    ),
    "RouteConvertPrometheusGetNamespace": (NamespaceTitle, options) => __makePathRequest(HttpClientRequest.get, [NamespaceTitle], () => "/convert/prometheus/config/v1/rules/" + __encodePathParam(NamespaceTitle) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RouteConvertPrometheusGetRuleGroup": (NamespaceTitle, Group, options) => __makePathRequest(HttpClientRequest.get, [NamespaceTitle, Group], () => "/convert/prometheus/config/v1/rules/" + __encodePathParam(NamespaceTitle) + "/" + __encodePathParam(Group) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
    ))
  ),
    "searchDashboardSnapshots": (options) => HttpClientRequest.get("/dashboard/snapshots").pipe(
      HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "limit": options?.params?.["limit"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchDashboardSnapshots200),
      "500": decodeError("SearchDashboardSnapshots500", SearchDashboardSnapshots500),
      orElse: unexpectedStatus
    }))
    ),
    "getHomeDashboard": (options) => HttpClientRequest.get("/dashboards/home").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetHomeDashboard200),
      "401": decodeError("GetHomeDashboard401", GetHomeDashboard401),
      "500": decodeError("GetHomeDashboard500", GetHomeDashboard500),
      orElse: unexpectedStatus
    }))
    ),
    "listPublicDashboards": (options) => HttpClientRequest.get("/dashboards/public-dashboards").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListPublicDashboards200),
      "401": decodeError("ListPublicDashboards401", ListPublicDashboards401),
      "403": decodeError("ListPublicDashboards403", ListPublicDashboards403),
      "500": decodeError("ListPublicDashboards500", ListPublicDashboards500),
      orElse: unexpectedStatus
    }))
    ),
    "getDashboardTags": (options) => HttpClientRequest.get("/dashboards/tags").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardTags200),
      "401": decodeError("GetDashboardTags401", GetDashboardTags401),
      "500": decodeError("GetDashboardTags500", GetDashboardTags500),
      orElse: unexpectedStatus
    }))
    ),
    "getPublicDashboard": (dashboardUid, options) => __makePathRequest(HttpClientRequest.get, [dashboardUid], () => "/dashboards/uid/" + __encodePathParam(dashboardUid) + "/public-dashboards").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPublicDashboard200),
      "400": decodeError("GetPublicDashboard400", GetPublicDashboard400),
      "401": decodeError("GetPublicDashboard401", GetPublicDashboard401),
      "403": decodeError("GetPublicDashboard403", GetPublicDashboard403),
      "404": decodeError("GetPublicDashboard404", GetPublicDashboard404),
      "500": decodeError("GetPublicDashboard500", GetPublicDashboard500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getDashboardByUID": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/dashboards/uid/" + __encodePathParam(uid) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardByUID200),
      "401": decodeError("GetDashboardByUID401", GetDashboardByUID401),
      "403": decodeError("GetDashboardByUID403", GetDashboardByUID403),
      "404": decodeError("GetDashboardByUID404", GetDashboardByUID404),
      "406": decodeError("GetDashboardByUID406", GetDashboardByUID406),
      "500": decodeError("GetDashboardByUID500", GetDashboardByUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getDashboardPermissionsListByUID": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/dashboards/uid/" + __encodePathParam(uid) + "/permissions").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardPermissionsListByUID200),
      "401": decodeError("GetDashboardPermissionsListByUID401", GetDashboardPermissionsListByUID401),
      "403": decodeError("GetDashboardPermissionsListByUID403", GetDashboardPermissionsListByUID403),
      "404": decodeError("GetDashboardPermissionsListByUID404", GetDashboardPermissionsListByUID404),
      "500": decodeError("GetDashboardPermissionsListByUID500", GetDashboardPermissionsListByUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getDashboardVersionsByUID": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/dashboards/uid/" + __encodePathParam(uid) + "/versions").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "limit": options?.params?.["limit"] as any, "start": options?.params?.["start"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardVersionsByUID200),
      "401": decodeError("GetDashboardVersionsByUID401", GetDashboardVersionsByUID401),
      "403": decodeError("GetDashboardVersionsByUID403", GetDashboardVersionsByUID403),
      "404": decodeError("GetDashboardVersionsByUID404", GetDashboardVersionsByUID404),
      "500": decodeError("GetDashboardVersionsByUID500", GetDashboardVersionsByUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getDashboardVersionByUID": (uid, DashboardVersionID, options) => __makePathRequest(HttpClientRequest.get, [uid, DashboardVersionID], () => "/dashboards/uid/" + __encodePathParam(uid) + "/versions/" + __encodePathParam(DashboardVersionID) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardVersionByUID200),
      "401": decodeError("GetDashboardVersionByUID401", GetDashboardVersionByUID401),
      "403": decodeError("GetDashboardVersionByUID403", GetDashboardVersionByUID403),
      "404": decodeError("GetDashboardVersionByUID404", GetDashboardVersionByUID404),
      "500": decodeError("GetDashboardVersionByUID500", GetDashboardVersionByUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getDataSources": (options) => HttpClientRequest.get("/datasources").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDataSources200),
      "401": decodeError("GetDataSources401", GetDataSources401),
      "403": decodeError("GetDataSources403", GetDataSources403),
      "500": decodeError("GetDataSources500", GetDataSources500),
      orElse: unexpectedStatus
    }))
    ),
    "getCorrelations": (options) => HttpClientRequest.get("/datasources/correlations").pipe(
      HttpClientRequest.setUrlParams({ "limit": options?.params?.["limit"] as any, "page": options?.params?.["page"] as any, "sourceUID": options?.params?.["sourceUID"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCorrelations200),
      "401": decodeError("GetCorrelations401", GetCorrelations401),
      "404": decodeError("GetCorrelations404", GetCorrelations404),
      "500": decodeError("GetCorrelations500", GetCorrelations500),
      orElse: unexpectedStatus
    }))
    ),
    "getDataSourceIdByName": (name, options) => __makePathRequest(HttpClientRequest.get, [name], () => "/datasources/id/" + __encodePathParam(name) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDataSourceIdByName200),
      "401": decodeError("GetDataSourceIdByName401", GetDataSourceIdByName401),
      "403": decodeError("GetDataSourceIdByName403", GetDataSourceIdByName403),
      "404": decodeError("GetDataSourceIdByName404", GetDataSourceIdByName404),
      "500": decodeError("GetDataSourceIdByName500", GetDataSourceIdByName500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getDataSourceByName": (name, options) => __makePathRequest(HttpClientRequest.get, [name], () => "/datasources/name/" + __encodePathParam(name) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDataSourceByName200),
      "401": decodeError("GetDataSourceByName401", GetDataSourceByName401),
      "403": decodeError("GetDataSourceByName403", GetDataSourceByName403),
      "500": decodeError("GetDataSourceByName500", GetDataSourceByName500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "datasourceProxyGETByUIDcalls": (uid, datasourceProxyRoute, options) => __makePathRequest(HttpClientRequest.get, [uid, datasourceProxyRoute], () => "/datasources/proxy/uid/" + __encodePathParam(uid) + "/" + __encodePathParam(datasourceProxyRoute) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DatasourceProxyGETByUIDcalls400", DatasourceProxyGETByUIDcalls400),
      "401": decodeError("DatasourceProxyGETByUIDcalls401", DatasourceProxyGETByUIDcalls401),
      "403": decodeError("DatasourceProxyGETByUIDcalls403", DatasourceProxyGETByUIDcalls403),
      "404": decodeError("DatasourceProxyGETByUIDcalls404", DatasourceProxyGETByUIDcalls404),
      "500": decodeError("DatasourceProxyGETByUIDcalls500", DatasourceProxyGETByUIDcalls500),
      "200": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getCorrelationsBySourceUID": (sourceUID, options) => __makePathRequest(HttpClientRequest.get, [sourceUID], () => "/datasources/uid/" + __encodePathParam(sourceUID) + "/correlations").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCorrelationsBySourceUID200),
      "401": decodeError("GetCorrelationsBySourceUID401", GetCorrelationsBySourceUID401),
      "404": decodeError("GetCorrelationsBySourceUID404", GetCorrelationsBySourceUID404),
      "500": decodeError("GetCorrelationsBySourceUID500", GetCorrelationsBySourceUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getCorrelation": (sourceUID, correlationUID, options) => __makePathRequest(HttpClientRequest.get, [sourceUID, correlationUID], () => "/datasources/uid/" + __encodePathParam(sourceUID) + "/correlations/" + __encodePathParam(correlationUID) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCorrelation200),
      "401": decodeError("GetCorrelation401", GetCorrelation401),
      "404": decodeError("GetCorrelation404", GetCorrelation404),
      "500": decodeError("GetCorrelation500", GetCorrelation500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getDataSourceByUID": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/datasources/uid/" + __encodePathParam(uid) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDataSourceByUID200),
      "400": decodeError("GetDataSourceByUID400", GetDataSourceByUID400),
      "401": decodeError("GetDataSourceByUID401", GetDataSourceByUID401),
      "403": decodeError("GetDataSourceByUID403", GetDataSourceByUID403),
      "404": decodeError("GetDataSourceByUID404", GetDataSourceByUID404),
      "500": decodeError("GetDataSourceByUID500", GetDataSourceByUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "checkDatasourceHealthWithUID": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/datasources/uid/" + __encodePathParam(uid) + "/health").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CheckDatasourceHealthWithUID200),
      "400": decodeError("CheckDatasourceHealthWithUID400", CheckDatasourceHealthWithUID400),
      "401": decodeError("CheckDatasourceHealthWithUID401", CheckDatasourceHealthWithUID401),
      "403": decodeError("CheckDatasourceHealthWithUID403", CheckDatasourceHealthWithUID403),
      "500": decodeError("CheckDatasourceHealthWithUID500", CheckDatasourceHealthWithUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getTeamLBACRulesApi": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/datasources/uid/" + __encodePathParam(uid) + "/lbac/teams").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTeamLBACRulesApi200),
      "400": decodeError("GetTeamLBACRulesApi400", GetTeamLBACRulesApi400),
      "401": decodeError("GetTeamLBACRulesApi401", GetTeamLBACRulesApi401),
      "403": decodeError("GetTeamLBACRulesApi403", GetTeamLBACRulesApi403),
      "404": decodeError("GetTeamLBACRulesApi404", GetTeamLBACRulesApi404),
      "500": decodeError("GetTeamLBACRulesApi500", GetTeamLBACRulesApi500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "callDatasourceResourceWithUID": (uid, datasourceProxyRoute, options) => __makePathRequest(HttpClientRequest.get, [uid, datasourceProxyRoute], () => "/datasources/uid/" + __encodePathParam(uid) + "/resources/" + __encodePathParam(datasourceProxyRoute) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CallDatasourceResourceWithUID200),
      "400": decodeError("CallDatasourceResourceWithUID400", CallDatasourceResourceWithUID400),
      "401": decodeError("CallDatasourceResourceWithUID401", CallDatasourceResourceWithUID401),
      "403": decodeError("CallDatasourceResourceWithUID403", CallDatasourceResourceWithUID403),
      "404": decodeError("CallDatasourceResourceWithUID404", CallDatasourceResourceWithUID404),
      "500": decodeError("CallDatasourceResourceWithUID500", CallDatasourceResourceWithUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getDataSourceCacheConfig": (dataSourceUID, options) => __makePathRequest(HttpClientRequest.get, [dataSourceUID], () => "/datasources/" + __encodePathParam(dataSourceUID) + "/cache").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "dataSourceType": options?.params?.["dataSourceType"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDataSourceCacheConfig200),
      "500": decodeError("GetDataSourceCacheConfig500", GetDataSourceCacheConfig500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "queryMetricsWithExpressions": (options) => HttpClientRequest.post("/ds/query").pipe(
      HttpClientRequest.bodyJsonUnsafe(options.payload),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "200": decodeSuccess(QueryMetricsWithExpressions200),
      "207": decodeSuccess(QueryMetricsWithExpressions207),
      "400": decodeError("QueryMetricsWithExpressions400", QueryMetricsWithExpressions400),
      "401": decodeError("QueryMetricsWithExpressions401", QueryMetricsWithExpressions401),
      "403": decodeError("QueryMetricsWithExpressions403", QueryMetricsWithExpressions403),
      "500": decodeError("QueryMetricsWithExpressions500", QueryMetricsWithExpressions500),
      orElse: unexpectedStatus
    }))
    ),
    "getFolders": (options) => HttpClientRequest.get("/folders").pipe(
      HttpClientRequest.setUrlParams({ "limit": options?.params?.["limit"] as any, "page": options?.params?.["page"] as any, "parentUid": options?.params?.["parentUid"] as any, "permission": options?.params?.["permission"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFolders200),
      "401": decodeError("GetFolders401", GetFolders401),
      "403": decodeError("GetFolders403", GetFolders403),
      "500": decodeError("GetFolders500", GetFolders500),
      orElse: unexpectedStatus
    }))
    ),
    "getFolderByUID": (folderUid, options) => __makePathRequest(HttpClientRequest.get, [folderUid], () => "/folders/" + __encodePathParam(folderUid) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFolderByUID200),
      "401": decodeError("GetFolderByUID401", GetFolderByUID401),
      "403": decodeError("GetFolderByUID403", GetFolderByUID403),
      "404": decodeError("GetFolderByUID404", GetFolderByUID404),
      "500": decodeError("GetFolderByUID500", GetFolderByUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getFolderDescendantCounts": (folderUid, options) => __makePathRequest(HttpClientRequest.get, [folderUid], () => "/folders/" + __encodePathParam(folderUid) + "/counts").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFolderDescendantCounts200),
      "401": decodeError("GetFolderDescendantCounts401", GetFolderDescendantCounts401),
      "403": decodeError("GetFolderDescendantCounts403", GetFolderDescendantCounts403),
      "404": decodeError("GetFolderDescendantCounts404", GetFolderDescendantCounts404),
      "500": decodeError("GetFolderDescendantCounts500", GetFolderDescendantCounts500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getFolderPermissionList": (folderUid, options) => __makePathRequest(HttpClientRequest.get, [folderUid], () => "/folders/" + __encodePathParam(folderUid) + "/permissions").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFolderPermissionList200),
      "401": decodeError("GetFolderPermissionList401", GetFolderPermissionList401),
      "403": decodeError("GetFolderPermissionList403", GetFolderPermissionList403),
      "404": decodeError("GetFolderPermissionList404", GetFolderPermissionList404),
      "500": decodeError("GetFolderPermissionList500", GetFolderPermissionList500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getHealth": (options) => HttpClientRequest.get("/health").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetHealth200),
      "503": decodeError("GetHealth503", GetHealth503),
      orElse: unexpectedStatus
    }))
    ),
    "getLibraryElements": (options) => HttpClientRequest.get("/library-elements").pipe(
      HttpClientRequest.setUrlParams({ "searchString": options?.params?.["searchString"] as any, "kind": options?.params?.["kind"] as any, "sortDirection": options?.params?.["sortDirection"] as any, "typeFilter": options?.params?.["typeFilter"] as any, "excludeUid": options?.params?.["excludeUid"] as any, "folderFilter": options?.params?.["folderFilter"] as any, "folderFilterUIDs": options?.params?.["folderFilterUIDs"] as any, "perPage": options?.params?.["perPage"] as any, "page": options?.params?.["page"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLibraryElements200),
      "401": decodeError("GetLibraryElements401", GetLibraryElements401),
      "500": decodeError("GetLibraryElements500", GetLibraryElements500),
      orElse: unexpectedStatus
    }))
    ),
    "getLibraryElementByName": (libraryElementName, options) => __makePathRequest(HttpClientRequest.get, [libraryElementName], () => "/library-elements/name/" + __encodePathParam(libraryElementName) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLibraryElementByName200),
      "401": decodeError("GetLibraryElementByName401", GetLibraryElementByName401),
      "404": decodeError("GetLibraryElementByName404", GetLibraryElementByName404),
      "500": decodeError("GetLibraryElementByName500", GetLibraryElementByName500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getLibraryElementByUID": (libraryElementUid, options) => __makePathRequest(HttpClientRequest.get, [libraryElementUid], () => "/library-elements/" + __encodePathParam(libraryElementUid) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLibraryElementByUID200),
      "401": decodeError("GetLibraryElementByUID401", GetLibraryElementByUID401),
      "403": decodeError("GetLibraryElementByUID403", GetLibraryElementByUID403),
      "404": decodeError("GetLibraryElementByUID404", GetLibraryElementByUID404),
      "500": decodeError("GetLibraryElementByUID500", GetLibraryElementByUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getLibraryElementConnections": (libraryElementUid, options) => __makePathRequest(HttpClientRequest.get, [libraryElementUid], () => "/library-elements/" + __encodePathParam(libraryElementUid) + "/connections/").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLibraryElementConnections200),
      "401": decodeError("GetLibraryElementConnections401", GetLibraryElementConnections401),
      "403": decodeError("GetLibraryElementConnections403", GetLibraryElementConnections403),
      "404": decodeError("GetLibraryElementConnections404", GetLibraryElementConnections404),
      "500": decodeError("GetLibraryElementConnections500", GetLibraryElementConnections500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getStatus": (options) => HttpClientRequest.get("/licensing/check").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "200": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ),
    "getCustomPermissionsReport": (options) => HttpClientRequest.get("/licensing/custom-permissions").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "500": decodeError("GetCustomPermissionsReport500", GetCustomPermissionsReport500),
      orElse: unexpectedStatus
    }))
    ),
    "getCustomPermissionsCSV": (options) => HttpClientRequest.get("/licensing/custom-permissions-csv").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "500": decodeError("GetCustomPermissionsCSV500", GetCustomPermissionsCSV500),
      orElse: unexpectedStatus
    }))
    ),
    "refreshLicenseStats": (options) => HttpClientRequest.get("/licensing/refresh-stats").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RefreshLicenseStats200),
      "500": decodeError("RefreshLicenseStats500", RefreshLicenseStats500),
      orElse: unexpectedStatus
    }))
    ),
    "getLicenseToken": (options) => HttpClientRequest.get("/licensing/token").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLicenseToken200),
      orElse: unexpectedStatus
    }))
    ),
    "getSAMLLogout": (options) => HttpClientRequest.get("/logout/saml").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "404": decodeError("GetSAMLLogout404", GetSAMLLogout404),
      "500": decodeError("GetSAMLLogout500", GetSAMLLogout500),
      "302": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ),
    "getCurrentOrg": (options) => HttpClientRequest.get("/org").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCurrentOrg200),
      "401": decodeError("GetCurrentOrg401", GetCurrentOrg401),
      "403": decodeError("GetCurrentOrg403", GetCurrentOrg403),
      "500": decodeError("GetCurrentOrg500", GetCurrentOrg500),
      orElse: unexpectedStatus
    }))
    ),
    "getPendingOrgInvites": (options) => HttpClientRequest.get("/org/invites").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPendingOrgInvites200),
      "401": decodeError("GetPendingOrgInvites401", GetPendingOrgInvites401),
      "403": decodeError("GetPendingOrgInvites403", GetPendingOrgInvites403),
      "500": decodeError("GetPendingOrgInvites500", GetPendingOrgInvites500),
      orElse: unexpectedStatus
    }))
    ),
    "getOrgPreferences": (options) => HttpClientRequest.get("/org/preferences").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgPreferences200),
      "401": decodeError("GetOrgPreferences401", GetOrgPreferences401),
      "403": decodeError("GetOrgPreferences403", GetOrgPreferences403),
      "500": decodeError("GetOrgPreferences500", GetOrgPreferences500),
      orElse: unexpectedStatus
    }))
    ),
    "getCurrentOrgQuota": (options) => HttpClientRequest.get("/org/quotas").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCurrentOrgQuota200),
      "401": decodeError("GetCurrentOrgQuota401", GetCurrentOrgQuota401),
      "403": decodeError("GetCurrentOrgQuota403", GetCurrentOrgQuota403),
      "404": decodeError("GetCurrentOrgQuota404", GetCurrentOrgQuota404),
      "500": decodeError("GetCurrentOrgQuota500", GetCurrentOrgQuota500),
      orElse: unexpectedStatus
    }))
    ),
    "getOrgUsersForCurrentOrg": (options) => HttpClientRequest.get("/org/users").pipe(
      HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "limit": options?.params?.["limit"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgUsersForCurrentOrg200),
      "401": decodeError("GetOrgUsersForCurrentOrg401", GetOrgUsersForCurrentOrg401),
      "403": decodeError("GetOrgUsersForCurrentOrg403", GetOrgUsersForCurrentOrg403),
      "500": decodeError("GetOrgUsersForCurrentOrg500", GetOrgUsersForCurrentOrg500),
      orElse: unexpectedStatus
    }))
    ),
    "getOrgUsersForCurrentOrgLookup": (options) => HttpClientRequest.get("/org/users/lookup").pipe(
      HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "limit": options?.params?.["limit"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgUsersForCurrentOrgLookup200),
      "401": decodeError("GetOrgUsersForCurrentOrgLookup401", GetOrgUsersForCurrentOrgLookup401),
      "403": decodeError("GetOrgUsersForCurrentOrgLookup403", GetOrgUsersForCurrentOrgLookup403),
      "500": decodeError("GetOrgUsersForCurrentOrgLookup500", GetOrgUsersForCurrentOrgLookup500),
      orElse: unexpectedStatus
    }))
    ),
    "searchOrgs": (options) => HttpClientRequest.get("/orgs").pipe(
      HttpClientRequest.setUrlParams({ "page": options?.params?.["page"] as any, "perpage": options?.params?.["perpage"] as any, "name": options?.params?.["name"] as any, "query": options?.params?.["query"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchOrgs200),
      "401": decodeError("SearchOrgs401", SearchOrgs401),
      "403": decodeError("SearchOrgs403", SearchOrgs403),
      "409": decodeError("SearchOrgs409", SearchOrgs409),
      "500": decodeError("SearchOrgs500", SearchOrgs500),
      orElse: unexpectedStatus
    }))
    ),
    "getOrgByName": (orgName, options) => __makePathRequest(HttpClientRequest.get, [orgName], () => "/orgs/name/" + __encodePathParam(orgName) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgByName200),
      "401": decodeError("GetOrgByName401", GetOrgByName401),
      "403": decodeError("GetOrgByName403", GetOrgByName403),
      "500": decodeError("GetOrgByName500", GetOrgByName500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getOrgByID": (orgId, options) => __makePathRequest(HttpClientRequest.get, [orgId], () => "/orgs/" + __encodePathParam(orgId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgByID200),
      "401": decodeError("GetOrgByID401", GetOrgByID401),
      "403": decodeError("GetOrgByID403", GetOrgByID403),
      "500": decodeError("GetOrgByID500", GetOrgByID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getOrgQuota": (orgId, options) => __makePathRequest(HttpClientRequest.get, [orgId], () => "/orgs/" + __encodePathParam(orgId) + "/quotas").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgQuota200),
      "401": decodeError("GetOrgQuota401", GetOrgQuota401),
      "403": decodeError("GetOrgQuota403", GetOrgQuota403),
      "404": decodeError("GetOrgQuota404", GetOrgQuota404),
      "500": decodeError("GetOrgQuota500", GetOrgQuota500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getOrgUsers": (orgId, options) => __makePathRequest(HttpClientRequest.get, [orgId], () => "/orgs/" + __encodePathParam(orgId) + "/users").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgUsers200),
      "401": decodeError("GetOrgUsers401", GetOrgUsers401),
      "403": decodeError("GetOrgUsers403", GetOrgUsers403),
      "500": decodeError("GetOrgUsers500", GetOrgUsers500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "searchOrgUsers": (orgId, options) => __makePathRequest(HttpClientRequest.get, [orgId], () => "/orgs/" + __encodePathParam(orgId) + "/users/search").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchOrgUsers200),
      "401": decodeError("SearchOrgUsers401", SearchOrgUsers401),
      "403": decodeError("SearchOrgUsers403", SearchOrgUsers403),
      "500": decodeError("SearchOrgUsers500", SearchOrgUsers500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "searchPlaylists": (options) => HttpClientRequest.get("/playlists").pipe(
      HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "limit": options?.params?.["limit"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchPlaylists200),
      "500": decodeError("SearchPlaylists500", SearchPlaylists500),
      orElse: unexpectedStatus
    }))
    ),
    "getPlaylist": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/playlists/" + __encodePathParam(uid) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPlaylist200),
      "401": decodeError("GetPlaylist401", GetPlaylist401),
      "403": decodeError("GetPlaylist403", GetPlaylist403),
      "404": decodeError("GetPlaylist404", GetPlaylist404),
      "500": decodeError("GetPlaylist500", GetPlaylist500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getPlaylistItems": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/playlists/" + __encodePathParam(uid) + "/items").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPlaylistItems200),
      "401": decodeError("GetPlaylistItems401", GetPlaylistItems401),
      "403": decodeError("GetPlaylistItems403", GetPlaylistItems403),
      "404": decodeError("GetPlaylistItems404", GetPlaylistItems404),
      "500": decodeError("GetPlaylistItems500", GetPlaylistItems500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "viewPublicDashboard": (accessToken, options) => __makePathRequest(HttpClientRequest.get, [accessToken], () => "/public/dashboards/" + __encodePathParam(accessToken) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ViewPublicDashboard200),
      "400": decodeError("ViewPublicDashboard400", ViewPublicDashboard400),
      "401": decodeError("ViewPublicDashboard401", ViewPublicDashboard401),
      "403": decodeError("ViewPublicDashboard403", ViewPublicDashboard403),
      "404": decodeError("ViewPublicDashboard404", ViewPublicDashboard404),
      "500": decodeError("ViewPublicDashboard500", ViewPublicDashboard500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getPublicAnnotations": (accessToken, options) => __makePathRequest(HttpClientRequest.get, [accessToken], () => "/public/dashboards/" + __encodePathParam(accessToken) + "/annotations").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPublicAnnotations200),
      "400": decodeError("GetPublicAnnotations400", GetPublicAnnotations400),
      "401": decodeError("GetPublicAnnotations401", GetPublicAnnotations401),
      "403": decodeError("GetPublicAnnotations403", GetPublicAnnotations403),
      "404": decodeError("GetPublicAnnotations404", GetPublicAnnotations404),
      "500": decodeError("GetPublicAnnotations500", GetPublicAnnotations500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "searchQueries": (options) => HttpClientRequest.get("/query-history").pipe(
      HttpClientRequest.setUrlParams({ "datasourceUid": options?.params?.["datasourceUid"] as any, "searchString": options?.params?.["searchString"] as any, "onlyStarred": options?.params?.["onlyStarred"] as any, "sort": options?.params?.["sort"] as any, "page": options?.params?.["page"] as any, "limit": options?.params?.["limit"] as any, "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchQueries200),
      "401": decodeError("SearchQueries401", SearchQueries401),
      "500": decodeError("SearchQueries500", SearchQueries500),
      orElse: unexpectedStatus
    }))
    ),
    "listRecordingRules": (options) => HttpClientRequest.get("/recording-rules").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListRecordingRules200),
      "401": decodeError("ListRecordingRules401", ListRecordingRules401),
      "403": decodeError("ListRecordingRules403", ListRecordingRules403),
      "404": decodeError("ListRecordingRules404", ListRecordingRules404),
      "500": decodeError("ListRecordingRules500", ListRecordingRules500),
      orElse: unexpectedStatus
    }))
    ),
    "getRecordingRuleWriteTarget": (options) => HttpClientRequest.get("/recording-rules/writer").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRecordingRuleWriteTarget200),
      "401": decodeError("GetRecordingRuleWriteTarget401", GetRecordingRuleWriteTarget401),
      "403": decodeError("GetRecordingRuleWriteTarget403", GetRecordingRuleWriteTarget403),
      "404": decodeError("GetRecordingRuleWriteTarget404", GetRecordingRuleWriteTarget404),
      "500": decodeError("GetRecordingRuleWriteTarget500", GetRecordingRuleWriteTarget500),
      orElse: unexpectedStatus
    }))
    ),
    "getReports": (options) => HttpClientRequest.get("/reports").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetReports200),
      "401": decodeError("GetReports401", GetReports401),
      "403": decodeError("GetReports403", GetReports403),
      "500": decodeError("GetReports500", GetReports500),
      orElse: unexpectedStatus
    }))
    ),
    "getReportsByDashboardUID": (uid, options) => __makePathRequest(HttpClientRequest.get, [uid], () => "/reports/dashboards/" + __encodePathParam(uid) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetReportsByDashboardUID200),
      "401": decodeError("GetReportsByDashboardUID401", GetReportsByDashboardUID401),
      "403": decodeError("GetReportsByDashboardUID403", GetReportsByDashboardUID403),
      "500": decodeError("GetReportsByDashboardUID500", GetReportsByDashboardUID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getSettingsImage": (options) => HttpClientRequest.get("/reports/images/:image").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSettingsImage200),
      "401": decodeError("GetSettingsImage401", GetSettingsImage401),
      "403": decodeError("GetSettingsImage403", GetSettingsImage403),
      "404": decodeError("GetSettingsImage404", GetSettingsImage404),
      "500": decodeError("GetSettingsImage500", GetSettingsImage500),
      orElse: unexpectedStatus
    }))
    ),
    "renderReportCSVs": (options) => HttpClientRequest.get("/reports/render/csvs").pipe(
      HttpClientRequest.setUrlParams({ "dashboards": options?.params?.["dashboards"] as any, "title": options?.params?.["title"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "200": decodeSuccess(RenderReportCSVs200),
      "204": decodeSuccess(RenderReportCSVs204),
      "400": decodeError("RenderReportCSVs400", RenderReportCSVs400),
      "401": decodeError("RenderReportCSVs401", RenderReportCSVs401),
      "500": decodeError("RenderReportCSVs500", RenderReportCSVs500),
      orElse: unexpectedStatus
    }))
    ),
    "renderReportPDFs": (options) => HttpClientRequest.get("/reports/render/pdfs").pipe(
      HttpClientRequest.setUrlParams({ "dashboards": options?.params?.["dashboards"] as any, "orientation": options?.params?.["orientation"] as any, "layout": options?.params?.["layout"] as any, "title": options?.params?.["title"] as any, "scaleFactor": options?.params?.["scaleFactor"] as any, "includeTables": options?.params?.["includeTables"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RenderReportPDFs200),
      "400": decodeError("RenderReportPDFs400", RenderReportPDFs400),
      "401": decodeError("RenderReportPDFs401", RenderReportPDFs401),
      "500": decodeError("RenderReportPDFs500", RenderReportPDFs500),
      orElse: unexpectedStatus
    }))
    ),
    "getReportSettings": (options) => HttpClientRequest.get("/reports/settings").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetReportSettings200),
      "401": decodeError("GetReportSettings401", GetReportSettings401),
      "403": decodeError("GetReportSettings403", GetReportSettings403),
      "500": decodeError("GetReportSettings500", GetReportSettings500),
      orElse: unexpectedStatus
    }))
    ),
    "getReport": (id, options) => __makePathRequest(HttpClientRequest.get, [id], () => "/reports/" + __encodePathParam(id) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetReport200),
      "400": decodeError("GetReport400", GetReport400),
      "401": decodeError("GetReport401", GetReport401),
      "403": decodeError("GetReport403", GetReport403),
      "404": decodeError("GetReport404", GetReport404),
      "500": decodeError("GetReport500", GetReport500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getMetadata": (options) => HttpClientRequest.get("/saml/metadata").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetadata200),
      orElse: unexpectedStatus
    }))
    ),
    "getSLO": (options) => HttpClientRequest.get("/saml/slo").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("GetSLO400", GetSLO400),
      "403": decodeError("GetSLO403", GetSLO403),
      "500": decodeError("GetSLO500", GetSLO500),
      "302": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ),
    "search": (options) => HttpClientRequest.get("/search").pipe(
      HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "tag": options?.params?.["tag"] as any, "type": options?.params?.["type"] as any, "dashboardIds": options?.params?.["dashboardIds"] as any, "dashboardUIDs": options?.params?.["dashboardUIDs"] as any, "folderIds": options?.params?.["folderIds"] as any, "folderUIDs": options?.params?.["folderUIDs"] as any, "starred": options?.params?.["starred"] as any, "limit": options?.params?.["limit"] as any, "page": options?.params?.["page"] as any, "permission": options?.params?.["permission"] as any, "sort": options?.params?.["sort"] as any, "deleted": options?.params?.["deleted"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(Search200),
      "401": decodeError("Search401", Search401),
      "422": decodeError("Search422", Search422),
      "500": decodeError("Search500", Search500),
      orElse: unexpectedStatus
    }))
    ),
    "listSortOptions": (options) => HttpClientRequest.get("/search/sorting").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListSortOptions200),
      "401": decodeError("ListSortOptions401", ListSortOptions401),
      orElse: unexpectedStatus
    }))
    ),
    "searchOrgServiceAccountsWithPaging": (options) => HttpClientRequest.get("/serviceaccounts/search").pipe(
      HttpClientRequest.setUrlParams({ "Disabled": options?.params?.["Disabled"] as any, "expiredTokens": options?.params?.["expiredTokens"] as any, "query": options?.params?.["query"] as any, "perpage": options?.params?.["perpage"] as any, "page": options?.params?.["page"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchOrgServiceAccountsWithPaging200),
      "401": decodeError("SearchOrgServiceAccountsWithPaging401", SearchOrgServiceAccountsWithPaging401),
      "403": decodeError("SearchOrgServiceAccountsWithPaging403", SearchOrgServiceAccountsWithPaging403),
      "500": decodeError("SearchOrgServiceAccountsWithPaging500", SearchOrgServiceAccountsWithPaging500),
      orElse: unexpectedStatus
    }))
    ),
    "retrieveServiceAccount": (serviceAccountId, options) => __makePathRequest(HttpClientRequest.get, [serviceAccountId], () => "/serviceaccounts/" + __encodePathParam(serviceAccountId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RetrieveServiceAccount200),
      "400": decodeError("RetrieveServiceAccount400", RetrieveServiceAccount400),
      "401": decodeError("RetrieveServiceAccount401", RetrieveServiceAccount401),
      "403": decodeError("RetrieveServiceAccount403", RetrieveServiceAccount403),
      "404": decodeError("RetrieveServiceAccount404", RetrieveServiceAccount404),
      "500": decodeError("RetrieveServiceAccount500", RetrieveServiceAccount500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "listTokens": (serviceAccountId, options) => __makePathRequest(HttpClientRequest.get, [serviceAccountId], () => "/serviceaccounts/" + __encodePathParam(serviceAccountId) + "/tokens").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListTokens200),
      "400": decodeError("ListTokens400", ListTokens400),
      "401": decodeError("ListTokens401", ListTokens401),
      "403": decodeError("ListTokens403", ListTokens403),
      "500": decodeError("ListTokens500", ListTokens500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "retrieveJWKS": (options) => HttpClientRequest.get("/signing-keys/keys").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RetrieveJWKS200),
      "500": decodeError("RetrieveJWKS500", RetrieveJWKS500),
      orElse: unexpectedStatus
    }))
    ),
    "getSharingOptions": (options) => HttpClientRequest.get("/snapshot/shared-options").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSharingOptions200),
      "401": decodeError("GetSharingOptions401", GetSharingOptions401),
      orElse: unexpectedStatus
    }))
    ),
    "deleteDashboardSnapshotByDeleteKey": (deleteKey, options) => __makePathRequest(HttpClientRequest.get, [deleteKey], () => "/snapshots-delete/" + __encodePathParam(deleteKey) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DeleteDashboardSnapshotByDeleteKey200),
      "401": decodeError("DeleteDashboardSnapshotByDeleteKey401", DeleteDashboardSnapshotByDeleteKey401),
      "403": decodeError("DeleteDashboardSnapshotByDeleteKey403", DeleteDashboardSnapshotByDeleteKey403),
      "404": decodeError("DeleteDashboardSnapshotByDeleteKey404", DeleteDashboardSnapshotByDeleteKey404),
      "500": decodeError("DeleteDashboardSnapshotByDeleteKey500", DeleteDashboardSnapshotByDeleteKey500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getDashboardSnapshot": (key, options) => __makePathRequest(HttpClientRequest.get, [key], () => "/snapshots/" + __encodePathParam(key) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("GetDashboardSnapshot400", GetDashboardSnapshot400),
      "404": decodeError("GetDashboardSnapshot404", GetDashboardSnapshot404),
      "500": decodeError("GetDashboardSnapshot500", GetDashboardSnapshot500),
      "200": () => Effect.void,
      orElse: unexpectedStatus
    }))
    ))
  ),
    "searchTeams": (options) => HttpClientRequest.get("/teams/search").pipe(
      HttpClientRequest.setUrlParams({ "page": options?.params?.["page"] as any, "perpage": options?.params?.["perpage"] as any, "name": options?.params?.["name"] as any, "query": options?.params?.["query"] as any, "accesscontrol": options?.params?.["accesscontrol"] as any, "sort": options?.params?.["sort"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchTeams200),
      "401": decodeError("SearchTeams401", SearchTeams401),
      "403": decodeError("SearchTeams403", SearchTeams403),
      "500": decodeError("SearchTeams500", SearchTeams500),
      orElse: unexpectedStatus
    }))
    ),
    "getTeamGroupsApi": (teamId, options) => __makePathRequest(HttpClientRequest.get, [teamId], () => "/teams/" + __encodePathParam(teamId) + "/groups").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTeamGroupsApi200),
      "400": decodeError("GetTeamGroupsApi400", GetTeamGroupsApi400),
      "401": decodeError("GetTeamGroupsApi401", GetTeamGroupsApi401),
      "403": decodeError("GetTeamGroupsApi403", GetTeamGroupsApi403),
      "404": decodeError("GetTeamGroupsApi404", GetTeamGroupsApi404),
      "500": decodeError("GetTeamGroupsApi500", GetTeamGroupsApi500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "searchTeamGroups": (teamId, options) => __makePathRequest(HttpClientRequest.get, [teamId], () => "/teams/" + __encodePathParam(teamId) + "/groups/search").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "page": options?.params?.["page"] as any, "perpage": options?.params?.["perpage"] as any, "query": options?.params?.["query"] as any, "name": options?.params?.["name"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchTeamGroups200),
      "400": decodeError("SearchTeamGroups400", SearchTeamGroups400),
      "401": decodeError("SearchTeamGroups401", SearchTeamGroups401),
      "403": decodeError("SearchTeamGroups403", SearchTeamGroups403),
      "500": decodeError("SearchTeamGroups500", SearchTeamGroups500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getTeamByID": (teamId, options) => __makePathRequest(HttpClientRequest.get, [teamId], () => "/teams/" + __encodePathParam(teamId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "accesscontrol": options?.params?.["accesscontrol"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTeamByID200),
      "401": decodeError("GetTeamByID401", GetTeamByID401),
      "403": decodeError("GetTeamByID403", GetTeamByID403),
      "404": decodeError("GetTeamByID404", GetTeamByID404),
      "500": decodeError("GetTeamByID500", GetTeamByID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getTeamMembers": (teamId, options) => __makePathRequest(HttpClientRequest.get, [teamId], () => "/teams/" + __encodePathParam(teamId) + "/members").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTeamMembers200),
      "401": decodeError("GetTeamMembers401", GetTeamMembers401),
      "403": decodeError("GetTeamMembers403", GetTeamMembers403),
      "404": decodeError("GetTeamMembers404", GetTeamMembers404),
      "500": decodeError("GetTeamMembers500", GetTeamMembers500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getTeamPreferences": (teamId, options) => __makePathRequest(HttpClientRequest.get, [teamId], () => "/teams/" + __encodePathParam(teamId) + "/preferences").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTeamPreferences200),
      "401": decodeError("GetTeamPreferences401", GetTeamPreferences401),
      "500": decodeError("GetTeamPreferences500", GetTeamPreferences500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getSignedInUser": (options) => HttpClientRequest.get("/user").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSignedInUser200),
      "401": decodeError("GetSignedInUser401", GetSignedInUser401),
      "403": decodeError("GetSignedInUser403", GetSignedInUser403),
      "404": decodeError("GetSignedInUser404", GetSignedInUser404),
      "500": decodeError("GetSignedInUser500", GetSignedInUser500),
      orElse: unexpectedStatus
    }))
    ),
    "getUserAuthTokens": (options) => HttpClientRequest.get("/user/auth-tokens").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserAuthTokens200),
      "401": decodeError("GetUserAuthTokens401", GetUserAuthTokens401),
      "403": decodeError("GetUserAuthTokens403", GetUserAuthTokens403),
      "500": decodeError("GetUserAuthTokens500", GetUserAuthTokens500),
      orElse: unexpectedStatus
    }))
    ),
    "updateUserEmail": (options) => HttpClientRequest.get("/user/email/update").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "302": decodeSuccess(UpdateUserEmail302),
      orElse: unexpectedStatus
    }))
    ),
    "getSignedInUserOrgList": (options) => HttpClientRequest.get("/user/orgs").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSignedInUserOrgList200),
      "401": decodeError("GetSignedInUserOrgList401", GetSignedInUserOrgList401),
      "403": decodeError("GetSignedInUserOrgList403", GetSignedInUserOrgList403),
      "500": decodeError("GetSignedInUserOrgList500", GetSignedInUserOrgList500),
      orElse: unexpectedStatus
    }))
    ),
    "getUserPreferences": (options) => HttpClientRequest.get("/user/preferences").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserPreferences200),
      "401": decodeError("GetUserPreferences401", GetUserPreferences401),
      "500": decodeError("GetUserPreferences500", GetUserPreferences500),
      orElse: unexpectedStatus
    }))
    ),
    "getUserQuotas": (options) => HttpClientRequest.get("/user/quotas").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserQuotas200),
      "401": decodeError("GetUserQuotas401", GetUserQuotas401),
      "403": decodeError("GetUserQuotas403", GetUserQuotas403),
      "404": decodeError("GetUserQuotas404", GetUserQuotas404),
      "500": decodeError("GetUserQuotas500", GetUserQuotas500),
      orElse: unexpectedStatus
    }))
    ),
    "getSignedInUserTeamList": (options) => HttpClientRequest.get("/user/teams").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSignedInUserTeamList200),
      "401": decodeError("GetSignedInUserTeamList401", GetSignedInUserTeamList401),
      "403": decodeError("GetSignedInUserTeamList403", GetSignedInUserTeamList403),
      "500": decodeError("GetSignedInUserTeamList500", GetSignedInUserTeamList500),
      orElse: unexpectedStatus
    }))
    ),
    "searchUsers": (options) => HttpClientRequest.get("/users").pipe(
      HttpClientRequest.setUrlParams({ "perpage": options?.params?.["perpage"] as any, "page": options?.params?.["page"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchUsers200),
      "401": decodeError("SearchUsers401", SearchUsers401),
      "403": decodeError("SearchUsers403", SearchUsers403),
      "500": decodeError("SearchUsers500", SearchUsers500),
      orElse: unexpectedStatus
    }))
    ),
    "getUserByLoginOrEmail": (options) => HttpClientRequest.get("/users/lookup").pipe(
      HttpClientRequest.setUrlParams({ "loginOrEmail": options.params["loginOrEmail"] as any }),
      withResponse(options.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserByLoginOrEmail200),
      "401": decodeError("GetUserByLoginOrEmail401", GetUserByLoginOrEmail401),
      "403": decodeError("GetUserByLoginOrEmail403", GetUserByLoginOrEmail403),
      "404": decodeError("GetUserByLoginOrEmail404", GetUserByLoginOrEmail404),
      "500": decodeError("GetUserByLoginOrEmail500", GetUserByLoginOrEmail500),
      orElse: unexpectedStatus
    }))
    ),
    "searchUsersWithPaging": (options) => HttpClientRequest.get("/users/search").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchUsersWithPaging200),
      "401": decodeError("SearchUsersWithPaging401", SearchUsersWithPaging401),
      "403": decodeError("SearchUsersWithPaging403", SearchUsersWithPaging403),
      "404": decodeError("SearchUsersWithPaging404", SearchUsersWithPaging404),
      "500": decodeError("SearchUsersWithPaging500", SearchUsersWithPaging500),
      orElse: unexpectedStatus
    }))
    ),
    "getUserByID": (userId, options) => __makePathRequest(HttpClientRequest.get, [userId], () => "/users/" + __encodePathParam(userId) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserByID200),
      "401": decodeError("GetUserByID401", GetUserByID401),
      "403": decodeError("GetUserByID403", GetUserByID403),
      "404": decodeError("GetUserByID404", GetUserByID404),
      "500": decodeError("GetUserByID500", GetUserByID500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getUserOrgList": (userId, options) => __makePathRequest(HttpClientRequest.get, [userId], () => "/users/" + __encodePathParam(userId) + "/orgs").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserOrgList200),
      "401": decodeError("GetUserOrgList401", GetUserOrgList401),
      "403": decodeError("GetUserOrgList403", GetUserOrgList403),
      "404": decodeError("GetUserOrgList404", GetUserOrgList404),
      "500": decodeError("GetUserOrgList500", GetUserOrgList500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "getUserTeams": (userId, options) => __makePathRequest(HttpClientRequest.get, [userId], () => "/users/" + __encodePathParam(userId) + "/teams").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserTeams200),
      "401": decodeError("GetUserTeams401", GetUserTeams401),
      "403": decodeError("GetUserTeams403", GetUserTeams403),
      "404": decodeError("GetUserTeams404", GetUserTeams404),
      "500": decodeError("GetUserTeams500", GetUserTeams500),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RouteGetAlertRules": (options) => HttpClientRequest.get("/v1/provisioning/alert-rules").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRules200),
      "403": decodeError("RouteGetAlertRules403", RouteGetAlertRules403),
      orElse: unexpectedStatus
    }))
    ),
    "RouteGetAlertRulesExport": (options) => HttpClientRequest.get("/v1/provisioning/alert-rules/export").pipe(
      HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any, "folderUid": options?.params?.["folderUid"] as any, "group": options?.params?.["group"] as any, "ruleUid": options?.params?.["ruleUid"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRulesExport200),
      "403": decodeError("RouteGetAlertRulesExport403", RouteGetAlertRulesExport403),
      "404": decodeVoidError("404"),
      orElse: unexpectedStatus
    }))
    ),
    "RouteGetAlertRule": (UID, options) => __makePathRequest(HttpClientRequest.get, [UID], () => "/v1/provisioning/alert-rules/" + __encodePathParam(UID) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRule200),
      "403": decodeError("RouteGetAlertRule403", RouteGetAlertRule403),
      "404": decodeVoidError("404"),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RouteGetAlertRuleExport": (UID, options) => __makePathRequest(HttpClientRequest.get, [UID], () => "/v1/provisioning/alert-rules/" + __encodePathParam(UID) + "/export").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRuleExport200),
      "403": decodeError("RouteGetAlertRuleExport403", RouteGetAlertRuleExport403),
      "404": decodeVoidError("404"),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RouteGetContactpoints": (options) => HttpClientRequest.get("/v1/provisioning/contact-points").pipe(
      HttpClientRequest.setUrlParams({ "name": options?.params?.["name"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetContactpoints200),
      "403": decodeError("RouteGetContactpoints403", RouteGetContactpoints403),
      orElse: unexpectedStatus
    }))
    ),
    "RouteGetContactpointsExport": (options) => HttpClientRequest.get("/v1/provisioning/contact-points/export").pipe(
      HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any, "decrypt": options?.params?.["decrypt"] as any, "name": options?.params?.["name"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetContactpointsExport200),
      "403": decodeError("RouteGetContactpointsExport403", RouteGetContactpointsExport403),
      orElse: unexpectedStatus
    }))
    ),
    "RouteGetAlertRuleGroup": (FolderUID, Group, options) => __makePathRequest(HttpClientRequest.get, [FolderUID, Group], () => "/v1/provisioning/folder/" + __encodePathParam(FolderUID) + "/rule-groups/" + __encodePathParam(Group) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRuleGroup200),
      "403": decodeError("RouteGetAlertRuleGroup403", RouteGetAlertRuleGroup403),
      "404": decodeVoidError("404"),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RouteGetAlertRuleGroupExport": (FolderUID, Group, options) => __makePathRequest(HttpClientRequest.get, [FolderUID, Group], () => "/v1/provisioning/folder/" + __encodePathParam(FolderUID) + "/rule-groups/" + __encodePathParam(Group) + "/export").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRuleGroupExport200),
      "403": decodeError("RouteGetAlertRuleGroupExport403", RouteGetAlertRuleGroupExport403),
      "404": decodeVoidError("404"),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RouteGetMuteTimings": (options) => HttpClientRequest.get("/v1/provisioning/mute-timings").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetMuteTimings200),
      "403": decodeError("RouteGetMuteTimings403", RouteGetMuteTimings403),
      orElse: unexpectedStatus
    }))
    ),
    "RouteExportMuteTimings": (options) => HttpClientRequest.get("/v1/provisioning/mute-timings/export").pipe(
      HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteExportMuteTimings200),
      "403": decodeError("RouteExportMuteTimings403", RouteExportMuteTimings403),
      orElse: unexpectedStatus
    }))
    ),
    "RouteGetMuteTiming": (name, options) => __makePathRequest(HttpClientRequest.get, [name], () => "/v1/provisioning/mute-timings/" + __encodePathParam(name) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetMuteTiming200),
      "403": decodeError("RouteGetMuteTiming403", RouteGetMuteTiming403),
      "404": decodeVoidError("404"),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RouteExportMuteTiming": (name, options) => __makePathRequest(HttpClientRequest.get, [name], () => "/v1/provisioning/mute-timings/" + __encodePathParam(name) + "/export").pipe(
    Effect.flatMap((request) => request.pipe(
      HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any }),
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteExportMuteTiming200),
      "403": decodeError("RouteExportMuteTiming403", RouteExportMuteTiming403),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "RouteGetPolicyTree": (options) => HttpClientRequest.get("/v1/provisioning/policies").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetPolicyTree200),
      "403": decodeError("RouteGetPolicyTree403", RouteGetPolicyTree403),
      orElse: unexpectedStatus
    }))
    ),
    "RouteGetPolicyTreeExport": (options) => HttpClientRequest.get("/v1/provisioning/policies/export").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetPolicyTreeExport200),
      "403": decodeError("RouteGetPolicyTreeExport403", RouteGetPolicyTreeExport403),
      "404": decodeError("RouteGetPolicyTreeExport404", RouteGetPolicyTreeExport404),
      orElse: unexpectedStatus
    }))
    ),
    "RouteGetTemplates": (options) => HttpClientRequest.get("/v1/provisioning/templates").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetTemplates200),
      "403": decodeError("RouteGetTemplates403", RouteGetTemplates403),
      orElse: unexpectedStatus
    }))
    ),
    "RouteGetTemplate": (name, options) => __makePathRequest(HttpClientRequest.get, [name], () => "/v1/provisioning/templates/" + __encodePathParam(name) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetTemplate200),
      "403": decodeError("RouteGetTemplate403", RouteGetTemplate403),
      "404": decodeError("RouteGetTemplate404", RouteGetTemplate404),
      orElse: unexpectedStatus
    }))
    ))
  ),
    "listAllProvidersSettings": (options) => HttpClientRequest.get("/v1/sso-settings").pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListAllProvidersSettings200),
      "400": decodeError("ListAllProvidersSettings400", ListAllProvidersSettings400),
      "401": decodeError("ListAllProvidersSettings401", ListAllProvidersSettings401),
      "403": decodeError("ListAllProvidersSettings403", ListAllProvidersSettings403),
      orElse: unexpectedStatus
    }))
    ),
    "getProviderSettings": (key, options) => __makePathRequest(HttpClientRequest.get, [key], () => "/v1/sso-settings/" + __encodePathParam(key) + "").pipe(
    Effect.flatMap((request) => request.pipe(
      withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetProviderSettings200),
      "400": decodeError("GetProviderSettings400", GetProviderSettings400),
      "401": decodeError("GetProviderSettings401", GetProviderSettings401),
      "403": decodeError("GetProviderSettings403", GetProviderSettings403),
      "404": decodeError("GetProviderSettings404", GetProviderSettings404),
      orElse: unexpectedStatus
    }))
    ))
  )
  }
}

export interface Grafana {
  readonly httpClient: HttpClient.HttpClient
  /**
* Gets all existing roles. The response contains all global and organization local roles, for the organization which user is signed in.
* 
* You need to have a permission with action `roles:read` and scope `roles:*`.
* 
* The `delegatable` flag reduces the set of roles to only those for which the signed-in user has permissions to assign.
*/
readonly "listRoles": <Config extends OperationConfig>(options: { readonly params?: typeof ListRolesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListRoles200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"ListRoles403", typeof ListRoles403.Type> | GrafanaError<"ListRoles500", typeof ListRoles500.Type>>
  /**
* Get a role for the given UID.
* 
* You need to have a permission with action `roles:read` and scope `roles:*`.
*/
readonly "getRole": <Config extends OperationConfig>(roleUID: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetRole200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetRole403", typeof GetRole403.Type> | GrafanaError<"GetRole500", typeof GetRole500.Type>>
  /**
* Get role assignments for the role with the given UID.
* Does not include role assignments mapped through group attribute sync.
* 
* You need to have a permission with action `teams.roles:list` and scope `teams:id:*` and `users.roles:list` and scope `users:id:*`.
*/
readonly "getRoleAssignments": <Config extends OperationConfig>(roleUID: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetRoleAssignments200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetRoleAssignments403", typeof GetRoleAssignments403.Type> | GrafanaError<"GetRoleAssignments404", typeof GetRoleAssignments404.Type> | GrafanaError<"GetRoleAssignments500", typeof GetRoleAssignments500.Type>>
  /**
* Returns an indicator to check if fine-grained access control is enabled or not.
* 
* You need to have a permission with action `status:accesscontrol` and scope `services:accesscontrol`.
*/
readonly "getAccessControlStatus": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetAccessControlStatus200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetAccessControlStatus403", typeof GetAccessControlStatus403.Type> | GrafanaError<"GetAccessControlStatus404", typeof GetAccessControlStatus404.Type> | GrafanaError<"GetAccessControlStatus500", typeof GetAccessControlStatus500.Type>>
  /**
* You need to have a permission with action `teams.roles:read` and scope `teams:id:<team ID>`.
*/
readonly "listTeamRoles": <Config extends OperationConfig>(teamId: string, options: { readonly params?: typeof ListTeamRolesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListTeamRoles200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"ListTeamRoles400", typeof ListTeamRoles400.Type> | GrafanaError<"ListTeamRoles403", typeof ListTeamRoles403.Type> | GrafanaError<"ListTeamRoles500", typeof ListTeamRoles500.Type>>
  /**
* Lists the roles that have been directly assigned to a given user. The list does not include built-in roles (Viewer, Editor, Admin or Grafana Admin), and it does not include roles that have been inherited from a team.
* 
* You need to have a permission with action `users.roles:read` and scope `users:id:<user ID>`.
*/
readonly "listUserRoles": <Config extends OperationConfig>(userId: string, options: { readonly params?: typeof ListUserRolesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListUserRoles200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"ListUserRoles400", typeof ListUserRoles400.Type> | GrafanaError<"ListUserRoles403", typeof ListUserRoles403.Type> | GrafanaError<"ListUserRoles500", typeof ListUserRoles500.Type>>
  /**
* Get a description of a resource's access control properties.
*/
readonly "getResourceDescription": <Config extends OperationConfig>(resource: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetResourceDescription200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetResourceDescription403", typeof GetResourceDescription403.Type> | GrafanaError<"GetResourceDescription500", typeof GetResourceDescription500.Type>>
  /**
* Get permissions for a resource.
*/
readonly "getResourcePermissions": <Config extends OperationConfig>(resource: string, resourceID: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetResourcePermissions200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetResourcePermissions403", typeof GetResourcePermissions403.Type> | GrafanaError<"GetResourcePermissions404", typeof GetResourcePermissions404.Type> | GrafanaError<"GetResourcePermissions500", typeof GetResourcePermissions500.Type>>
  /**
* You need to have a permission with action `ldap.status:read`.
*/
readonly "getSyncStatus": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetSyncStatus200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSyncStatus401", typeof GetSyncStatus401.Type> | GrafanaError<"GetSyncStatus403", typeof GetSyncStatus403.Type> | GrafanaError<"GetSyncStatus500", typeof GetSyncStatus500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled, you need to have a permission with action `ldap.status:read`.
*/
readonly "getLDAPStatus": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetLDAPStatus200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetLDAPStatus401", typeof GetLDAPStatus401.Type> | GrafanaError<"GetLDAPStatus403", typeof GetLDAPStatus403.Type> | GrafanaError<"GetLDAPStatus500", typeof GetLDAPStatus500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled, you need to have a permission with action `ldap.user:read`.
*/
readonly "getUserFromLDAP": <Config extends OperationConfig>(userName: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserFromLDAP200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetUserFromLDAP401", typeof GetUserFromLDAP401.Type> | GrafanaError<"GetUserFromLDAP403", typeof GetUserFromLDAP403.Type> | GrafanaError<"GetUserFromLDAP500", typeof GetUserFromLDAP500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled, you need to have a permission with action `settings:read` and scopes: `settings:*`, `settings:auth.saml:` and `settings:auth.saml:enabled` (property level).
*/
readonly "adminGetSettings": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof AdminGetSettings200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"AdminGetSettings401", typeof AdminGetSettings401.Type> | GrafanaError<"AdminGetSettings403", typeof AdminGetSettings403.Type>>
  /**
* Only works with Basic Authentication (username and password). See introduction for an explanation.
* If you are running Grafana Enterprise and have Fine-grained access control enabled, you need to have a permission with action `server:stats:read`.
*/
readonly "adminGetStats": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof AdminGetStats200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"AdminGetStats401", typeof AdminGetStats401.Type> | GrafanaError<"AdminGetStats403", typeof AdminGetStats403.Type> | GrafanaError<"AdminGetStats500", typeof AdminGetStats500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled, you need to have a permission with action `users.authtoken:list` and scope `global.users:*`.
*/
readonly "adminGetUserAuthTokens": <Config extends OperationConfig>(userId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof AdminGetUserAuthTokens200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"AdminGetUserAuthTokens401", typeof AdminGetUserAuthTokens401.Type> | GrafanaError<"AdminGetUserAuthTokens403", typeof AdminGetUserAuthTokens403.Type> | GrafanaError<"AdminGetUserAuthTokens500", typeof AdminGetUserAuthTokens500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled, you need to have a permission with action `users.quotas:list` and scope `global.users:1` (userIDScope).
*/
readonly "getUserQuota": <Config extends OperationConfig>(userId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserQuota200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetUserQuota401", typeof GetUserQuota401.Type> | GrafanaError<"GetUserQuota403", typeof GetUserQuota403.Type> | GrafanaError<"GetUserQuota404", typeof GetUserQuota404.Type> | GrafanaError<"GetUserQuota500", typeof GetUserQuota500.Type>>
  /**
* Starting in Grafana v6.4 regions annotations are now returned in one entity that now includes the timeEnd property.
*/
readonly "getAnnotations": <Config extends OperationConfig>(options: { readonly params?: typeof GetAnnotationsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetAnnotations200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetAnnotations401", typeof GetAnnotations401.Type> | GrafanaError<"GetAnnotations500", typeof GetAnnotations500.Type>>
  /**
* Find all the event tags created in the annotations.
*/
readonly "getAnnotationTags": <Config extends OperationConfig>(options: { readonly params?: typeof GetAnnotationTagsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetAnnotationTags200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetAnnotationTags401", typeof GetAnnotationTags401.Type> | GrafanaError<"GetAnnotationTags500", typeof GetAnnotationTags500.Type>>
  /**
* Get Annotation by ID.
*/
readonly "getAnnotationByID": <Config extends OperationConfig>(annotationId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetAnnotationByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetAnnotationByID401", typeof GetAnnotationByID401.Type> | GrafanaError<"GetAnnotationByID500", typeof GetAnnotationByID500.Type>>
  /**
* Lists all devices within the last 30 days
*/
readonly "listDevices": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListDevices200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"ListDevices401", typeof ListDevices401.Type> | GrafanaError<"ListDevices403", typeof ListDevices403.Type> | GrafanaError<"ListDevices404", typeof ListDevices404.Type> | GrafanaError<"ListDevices500", typeof ListDevices500.Type>>
  /**
* Lists all devices within the last 30 days
*/
readonly "SearchDevices": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchDevices200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchDevices401", typeof SearchDevices401.Type> | GrafanaError<"SearchDevices403", typeof SearchDevices403.Type> | GrafanaError<"SearchDevices404", typeof SearchDevices404.Type> | GrafanaError<"SearchDevices500", typeof SearchDevices500.Type>>
  /**
* Get a list of all cloud migration sessions that have been created.
*/
readonly "getSessionList": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetSessionList200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSessionList401", typeof GetSessionList401.Type> | GrafanaError<"GetSessionList403", typeof GetSessionList403.Type> | GrafanaError<"GetSessionList500", typeof GetSessionList500.Type>>
  /**
* Get a cloud migration session by its uid.
*/
readonly "getSession": <Config extends OperationConfig>(uid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetSession200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSession400", typeof GetSession400.Type> | GrafanaError<"GetSession401", typeof GetSession401.Type> | GrafanaError<"GetSession403", typeof GetSession403.Type> | GrafanaError<"GetSession500", typeof GetSession500.Type>>
  /**
* Get metadata about a snapshot, including where it is in its processing and final results.
*/
readonly "getSnapshot": <Config extends OperationConfig>(uid: string, snapshotUid: string, options: { readonly params?: typeof GetSnapshotParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetSnapshot200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSnapshot400", typeof GetSnapshot400.Type> | GrafanaError<"GetSnapshot401", typeof GetSnapshot401.Type> | GrafanaError<"GetSnapshot403", typeof GetSnapshot403.Type> | GrafanaError<"GetSnapshot500", typeof GetSnapshot500.Type>>
  /**
* Get a list of snapshots for a session.
*/
readonly "getShapshotList": <Config extends OperationConfig>(uid: string, options: { readonly params?: typeof GetShapshotListParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetShapshotList200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetShapshotList400", typeof GetShapshotList400.Type> | GrafanaError<"GetShapshotList401", typeof GetShapshotList401.Type> | GrafanaError<"GetShapshotList403", typeof GetShapshotList403.Type> | GrafanaError<"GetShapshotList500", typeof GetShapshotList500.Type>>
  /**
* Get the resource dependencies graph for the current set of migratable resources.
*/
readonly "getResourceDependencies": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetResourceDependencies200.Type, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* Fetch the cloud migration token if it exists.
*/
readonly "getCloudMigrationToken": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetCloudMigrationToken200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetCloudMigrationToken401", typeof GetCloudMigrationToken401.Type> | GrafanaError<"GetCloudMigrationToken403", typeof GetCloudMigrationToken403.Type> | GrafanaError<"GetCloudMigrationToken404", typeof GetCloudMigrationToken404.Type> | GrafanaError<"GetCloudMigrationToken500", typeof GetCloudMigrationToken500.Type>>
  /**
* Gets all Grafana-managed alert rules that were imported from Prometheus-compatible sources, grouped by namespace.
*/
readonly "RouteConvertPrometheusCortexGetRules": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* Gets Grafana-managed alert rules that were imported from Prometheus-compatible sources for a specified namespace (folder).
*/
readonly "RouteConvertPrometheusCortexGetNamespace": <Config extends OperationConfig>(NamespaceTitle: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* Gets a single rule group in Prometheus-compatible format if it was imported from a Prometheus-compatible source.
*/
readonly "RouteConvertPrometheusCortexGetRuleGroup": <Config extends OperationConfig>(NamespaceTitle: string, Group: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* Gets all Grafana-managed alert rules that were imported from Prometheus-compatible sources, grouped by namespace.
*/
readonly "RouteConvertPrometheusGetRules": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* Gets Grafana-managed alert rules that were imported from Prometheus-compatible sources for a specified namespace (folder).
*/
readonly "RouteConvertPrometheusGetNamespace": <Config extends OperationConfig>(NamespaceTitle: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* Gets a single rule group in Prometheus-compatible format if it was imported from a Prometheus-compatible source.
*/
readonly "RouteConvertPrometheusGetRuleGroup": <Config extends OperationConfig>(NamespaceTitle: string, Group: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* List snapshots.
*/
readonly "searchDashboardSnapshots": <Config extends OperationConfig>(options: { readonly params?: typeof SearchDashboardSnapshotsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchDashboardSnapshots200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchDashboardSnapshots500", typeof SearchDashboardSnapshots500.Type>>
  /**
* NOTE: the home dashboard is configured in preferences.  This API will be removed in G13
*/
readonly "getHomeDashboard": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetHomeDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetHomeDashboard401", typeof GetHomeDashboard401.Type> | GrafanaError<"GetHomeDashboard500", typeof GetHomeDashboard500.Type>>
  /**
* Get list of public dashboards
*/
readonly "listPublicDashboards": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListPublicDashboards200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"ListPublicDashboards401", typeof ListPublicDashboards401.Type> | GrafanaError<"ListPublicDashboards403", typeof ListPublicDashboards403.Type> | GrafanaError<"ListPublicDashboards500", typeof ListPublicDashboards500.Type>>
  /**
* Get all dashboards tags of an organization.
*/
readonly "getDashboardTags": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDashboardTags200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDashboardTags401", typeof GetDashboardTags401.Type> | GrafanaError<"GetDashboardTags500", typeof GetDashboardTags500.Type>>
  /**
* Get public dashboard by dashboardUid
*/
readonly "getPublicDashboard": <Config extends OperationConfig>(dashboardUid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetPublicDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetPublicDashboard400", typeof GetPublicDashboard400.Type> | GrafanaError<"GetPublicDashboard401", typeof GetPublicDashboard401.Type> | GrafanaError<"GetPublicDashboard403", typeof GetPublicDashboard403.Type> | GrafanaError<"GetPublicDashboard404", typeof GetPublicDashboard404.Type> | GrafanaError<"GetPublicDashboard500", typeof GetPublicDashboard500.Type>>
  /**
* Optional query parameter `apiVersion` selects the Kubernetes API version used to load the dashboard first
* (for example `v1beta1`). If that request fails, the default version is used instead. When omitted, only the default is used.
* 
* Will return the dashboard given the dashboard unique identifier (uid).
* 
* Use: /apis/dashboard.grafana.app/v1/namespaces/{ns}/dashboards/{uid}
*/
readonly "getDashboardByUID": <Config extends OperationConfig>(uid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDashboardByUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDashboardByUID401", typeof GetDashboardByUID401.Type> | GrafanaError<"GetDashboardByUID403", typeof GetDashboardByUID403.Type> | GrafanaError<"GetDashboardByUID404", typeof GetDashboardByUID404.Type> | GrafanaError<"GetDashboardByUID406", typeof GetDashboardByUID406.Type> | GrafanaError<"GetDashboardByUID500", typeof GetDashboardByUID500.Type>>
  /**
* Use: /apis/dashboard.grafana.app/v1/namespaces/{ns}/dashboards/{uid}/access
*/
readonly "getDashboardPermissionsListByUID": <Config extends OperationConfig>(uid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDashboardPermissionsListByUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDashboardPermissionsListByUID401", typeof GetDashboardPermissionsListByUID401.Type> | GrafanaError<"GetDashboardPermissionsListByUID403", typeof GetDashboardPermissionsListByUID403.Type> | GrafanaError<"GetDashboardPermissionsListByUID404", typeof GetDashboardPermissionsListByUID404.Type> | GrafanaError<"GetDashboardPermissionsListByUID500", typeof GetDashboardPermissionsListByUID500.Type>>
  /**
* Gets all existing versions for the dashboard using UID.
*/
readonly "getDashboardVersionsByUID": <Config extends OperationConfig>(uid: string, options: { readonly params?: typeof GetDashboardVersionsByUIDParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDashboardVersionsByUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDashboardVersionsByUID401", typeof GetDashboardVersionsByUID401.Type> | GrafanaError<"GetDashboardVersionsByUID403", typeof GetDashboardVersionsByUID403.Type> | GrafanaError<"GetDashboardVersionsByUID404", typeof GetDashboardVersionsByUID404.Type> | GrafanaError<"GetDashboardVersionsByUID500", typeof GetDashboardVersionsByUID500.Type>>
  /**
* Get a specific dashboard version using UID.
*/
readonly "getDashboardVersionByUID": <Config extends OperationConfig>(uid: string, DashboardVersionID: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDashboardVersionByUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDashboardVersionByUID401", typeof GetDashboardVersionByUID401.Type> | GrafanaError<"GetDashboardVersionByUID403", typeof GetDashboardVersionByUID403.Type> | GrafanaError<"GetDashboardVersionByUID404", typeof GetDashboardVersionByUID404.Type> | GrafanaError<"GetDashboardVersionByUID500", typeof GetDashboardVersionByUID500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled
* you need to have a permission with action: `datasources:read` and scope: `datasources:*`.
*/
readonly "getDataSources": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDataSources200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDataSources401", typeof GetDataSources401.Type> | GrafanaError<"GetDataSources403", typeof GetDataSources403.Type> | GrafanaError<"GetDataSources500", typeof GetDataSources500.Type>>
  /**
* Gets all correlations.
*/
readonly "getCorrelations": <Config extends OperationConfig>(options: { readonly params?: typeof GetCorrelationsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetCorrelations200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetCorrelations401", typeof GetCorrelations401.Type> | GrafanaError<"GetCorrelations404", typeof GetCorrelations404.Type> | GrafanaError<"GetCorrelations500", typeof GetCorrelations500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled
* you need to have a permission with action: `datasources:read` and scopes: `datasources:*`, `datasources:name:*` and `datasources:name:test_datasource` (single data source).
*/
readonly "getDataSourceIdByName": <Config extends OperationConfig>(name: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDataSourceIdByName200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDataSourceIdByName401", typeof GetDataSourceIdByName401.Type> | GrafanaError<"GetDataSourceIdByName403", typeof GetDataSourceIdByName403.Type> | GrafanaError<"GetDataSourceIdByName404", typeof GetDataSourceIdByName404.Type> | GrafanaError<"GetDataSourceIdByName500", typeof GetDataSourceIdByName500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled
* you need to have a permission with action: `datasources:read` and scopes: `datasources:*`, `datasources:name:*` and `datasources:name:test_datasource` (single data source).
*/
readonly "getDataSourceByName": <Config extends OperationConfig>(name: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDataSourceByName200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDataSourceByName401", typeof GetDataSourceByName401.Type> | GrafanaError<"GetDataSourceByName403", typeof GetDataSourceByName403.Type> | GrafanaError<"GetDataSourceByName500", typeof GetDataSourceByName500.Type>>
  /**
* Proxies all calls to the actual data source.
*/
readonly "datasourceProxyGETByUIDcalls": <Config extends OperationConfig>(uid: string, datasourceProxyRoute: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"DatasourceProxyGETByUIDcalls400", typeof DatasourceProxyGETByUIDcalls400.Type> | GrafanaError<"DatasourceProxyGETByUIDcalls401", typeof DatasourceProxyGETByUIDcalls401.Type> | GrafanaError<"DatasourceProxyGETByUIDcalls403", typeof DatasourceProxyGETByUIDcalls403.Type> | GrafanaError<"DatasourceProxyGETByUIDcalls404", typeof DatasourceProxyGETByUIDcalls404.Type> | GrafanaError<"DatasourceProxyGETByUIDcalls500", typeof DatasourceProxyGETByUIDcalls500.Type>>
  /**
* Gets all correlations originating from the given data source.
*/
readonly "getCorrelationsBySourceUID": <Config extends OperationConfig>(sourceUID: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetCorrelationsBySourceUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetCorrelationsBySourceUID401", typeof GetCorrelationsBySourceUID401.Type> | GrafanaError<"GetCorrelationsBySourceUID404", typeof GetCorrelationsBySourceUID404.Type> | GrafanaError<"GetCorrelationsBySourceUID500", typeof GetCorrelationsBySourceUID500.Type>>
  /**
* Gets a correlation.
*/
readonly "getCorrelation": <Config extends OperationConfig>(sourceUID: string, correlationUID: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetCorrelation200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetCorrelation401", typeof GetCorrelation401.Type> | GrafanaError<"GetCorrelation404", typeof GetCorrelation404.Type> | GrafanaError<"GetCorrelation500", typeof GetCorrelation500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled
* you need to have a permission with action: `datasources:read` and scopes: `datasources:*`, `datasources:uid:*` and `datasources:uid:kLtEtcRGk` (single data source).
*/
readonly "getDataSourceByUID": <Config extends OperationConfig>(uid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDataSourceByUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDataSourceByUID400", typeof GetDataSourceByUID400.Type> | GrafanaError<"GetDataSourceByUID401", typeof GetDataSourceByUID401.Type> | GrafanaError<"GetDataSourceByUID403", typeof GetDataSourceByUID403.Type> | GrafanaError<"GetDataSourceByUID404", typeof GetDataSourceByUID404.Type> | GrafanaError<"GetDataSourceByUID500", typeof GetDataSourceByUID500.Type>>
  /**
* Sends a health check request to the plugin datasource identified by the UID.
*/
readonly "checkDatasourceHealthWithUID": <Config extends OperationConfig>(uid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof CheckDatasourceHealthWithUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"CheckDatasourceHealthWithUID400", typeof CheckDatasourceHealthWithUID400.Type> | GrafanaError<"CheckDatasourceHealthWithUID401", typeof CheckDatasourceHealthWithUID401.Type> | GrafanaError<"CheckDatasourceHealthWithUID403", typeof CheckDatasourceHealthWithUID403.Type> | GrafanaError<"CheckDatasourceHealthWithUID500", typeof CheckDatasourceHealthWithUID500.Type>>
  /**
* Retrieves LBAC rules for a team.
*/
readonly "getTeamLBACRulesApi": <Config extends OperationConfig>(uid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetTeamLBACRulesApi200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetTeamLBACRulesApi400", typeof GetTeamLBACRulesApi400.Type> | GrafanaError<"GetTeamLBACRulesApi401", typeof GetTeamLBACRulesApi401.Type> | GrafanaError<"GetTeamLBACRulesApi403", typeof GetTeamLBACRulesApi403.Type> | GrafanaError<"GetTeamLBACRulesApi404", typeof GetTeamLBACRulesApi404.Type> | GrafanaError<"GetTeamLBACRulesApi500", typeof GetTeamLBACRulesApi500.Type>>
  /**
* Fetch data source resources.
*/
readonly "callDatasourceResourceWithUID": <Config extends OperationConfig>(uid: string, datasourceProxyRoute: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof CallDatasourceResourceWithUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"CallDatasourceResourceWithUID400", typeof CallDatasourceResourceWithUID400.Type> | GrafanaError<"CallDatasourceResourceWithUID401", typeof CallDatasourceResourceWithUID401.Type> | GrafanaError<"CallDatasourceResourceWithUID403", typeof CallDatasourceResourceWithUID403.Type> | GrafanaError<"CallDatasourceResourceWithUID404", typeof CallDatasourceResourceWithUID404.Type> | GrafanaError<"CallDatasourceResourceWithUID500", typeof CallDatasourceResourceWithUID500.Type>>
  /**
* get cache config for a single data source
*/
readonly "getDataSourceCacheConfig": <Config extends OperationConfig>(dataSourceUID: string, options: { readonly params?: typeof GetDataSourceCacheConfigParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetDataSourceCacheConfig200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDataSourceCacheConfig500", typeof GetDataSourceCacheConfig500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled
* you need to have a permission with action: `datasources:query`.
*/
readonly "queryMetricsWithExpressions": <Config extends OperationConfig>(options: { readonly payload: typeof QueryMetricsWithExpressionsRequestJson.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof QueryMetricsWithExpressions200.Type | typeof QueryMetricsWithExpressions207.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"QueryMetricsWithExpressions400", typeof QueryMetricsWithExpressions400.Type> | GrafanaError<"QueryMetricsWithExpressions401", typeof QueryMetricsWithExpressions401.Type> | GrafanaError<"QueryMetricsWithExpressions403", typeof QueryMetricsWithExpressions403.Type> | GrafanaError<"QueryMetricsWithExpressions500", typeof QueryMetricsWithExpressions500.Type>>
  /**
* It returns all folders that the authenticated user has permission to view.
* If nested folders are enabled, it expects an additional query parameter with the parent folder UID
* and returns the immediate subfolders that the authenticated user has permission to view.
* If the parameter is not supplied then it returns immediate subfolders under the root
* that the authenticated user has permission to view.
* 
* Use: /apis/folder.grafana.app/v1/namespaces/{ns}/folders
*/
readonly "getFolders": <Config extends OperationConfig>(options: { readonly params?: typeof GetFoldersParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetFolders200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetFolders401", typeof GetFolders401.Type> | GrafanaError<"GetFolders403", typeof GetFolders403.Type> | GrafanaError<"GetFolders500", typeof GetFolders500.Type>>
  /**
* Use: /apis/folder.grafana.app/v1/namespaces/{ns}/folders/{folder_uid}
*/
readonly "getFolderByUID": <Config extends OperationConfig>(folderUid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetFolderByUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetFolderByUID401", typeof GetFolderByUID401.Type> | GrafanaError<"GetFolderByUID403", typeof GetFolderByUID403.Type> | GrafanaError<"GetFolderByUID404", typeof GetFolderByUID404.Type> | GrafanaError<"GetFolderByUID500", typeof GetFolderByUID500.Type>>
  /**
* Use: /apis/folder.grafana.app/v1/namespaces/{ns}/folders/{folder_uid}
*/
readonly "getFolderDescendantCounts": <Config extends OperationConfig>(folderUid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetFolderDescendantCounts200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetFolderDescendantCounts401", typeof GetFolderDescendantCounts401.Type> | GrafanaError<"GetFolderDescendantCounts403", typeof GetFolderDescendantCounts403.Type> | GrafanaError<"GetFolderDescendantCounts404", typeof GetFolderDescendantCounts404.Type> | GrafanaError<"GetFolderDescendantCounts500", typeof GetFolderDescendantCounts500.Type>>
  /**
* Gets all existing permissions for the folder with the given `uid`.
*/
readonly "getFolderPermissionList": <Config extends OperationConfig>(folderUid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetFolderPermissionList200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetFolderPermissionList401", typeof GetFolderPermissionList401.Type> | GrafanaError<"GetFolderPermissionList403", typeof GetFolderPermissionList403.Type> | GrafanaError<"GetFolderPermissionList404", typeof GetFolderPermissionList404.Type> | GrafanaError<"GetFolderPermissionList500", typeof GetFolderPermissionList500.Type>>
  /**
* apiHealthHandler will return ok if Grafana's web server is running and it
* can access the database. If the database cannot be accessed it will return
* http status code 503.
*/
readonly "getHealth": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetHealth200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetHealth503", typeof GetHealth503.Type>>
  /**
* Returns a list of all library elements the authenticated user has permission to view.
* Use the `perPage` query parameter to control the maximum number of library elements returned; the default limit is `100`.
* You can also use the `page` query parameter to fetch library elements from any page other than the first one.
*/
readonly "getLibraryElements": <Config extends OperationConfig>(options: { readonly params?: typeof GetLibraryElementsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetLibraryElements200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetLibraryElements401", typeof GetLibraryElements401.Type> | GrafanaError<"GetLibraryElements500", typeof GetLibraryElements500.Type>>
  /**
* Returns a library element with the given name.
*/
readonly "getLibraryElementByName": <Config extends OperationConfig>(libraryElementName: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetLibraryElementByName200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetLibraryElementByName401", typeof GetLibraryElementByName401.Type> | GrafanaError<"GetLibraryElementByName404", typeof GetLibraryElementByName404.Type> | GrafanaError<"GetLibraryElementByName500", typeof GetLibraryElementByName500.Type>>
  /**
* Returns a library element with the given UID.
*/
readonly "getLibraryElementByUID": <Config extends OperationConfig>(libraryElementUid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetLibraryElementByUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetLibraryElementByUID401", typeof GetLibraryElementByUID401.Type> | GrafanaError<"GetLibraryElementByUID403", typeof GetLibraryElementByUID403.Type> | GrafanaError<"GetLibraryElementByUID404", typeof GetLibraryElementByUID404.Type> | GrafanaError<"GetLibraryElementByUID500", typeof GetLibraryElementByUID500.Type>>
  /**
* Returns a list of connections for a library element based on the UID specified.
*/
readonly "getLibraryElementConnections": <Config extends OperationConfig>(libraryElementUid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetLibraryElementConnections200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetLibraryElementConnections401", typeof GetLibraryElementConnections401.Type> | GrafanaError<"GetLibraryElementConnections403", typeof GetLibraryElementConnections403.Type> | GrafanaError<"GetLibraryElementConnections404", typeof GetLibraryElementConnections404.Type> | GrafanaError<"GetLibraryElementConnections500", typeof GetLibraryElementConnections500.Type>>
  /**
* Check license availability.
*/
readonly "getStatus": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* You need to have a permission with action `licensing.reports:read`.
*/
readonly "getCustomPermissionsReport": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetCustomPermissionsReport500", typeof GetCustomPermissionsReport500.Type>>
  /**
* You need to have a permission with action `licensing.reports:read`.
*/
readonly "getCustomPermissionsCSV": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetCustomPermissionsCSV500", typeof GetCustomPermissionsCSV500.Type>>
  /**
* You need to have a permission with action `licensing:read`.
*/
readonly "refreshLicenseStats": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RefreshLicenseStats200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RefreshLicenseStats500", typeof RefreshLicenseStats500.Type>>
  /**
* You need to have a permission with action `licensing:read`.
*/
readonly "getLicenseToken": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetLicenseToken200.Type, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* GetLogout initiates single logout process.
*/
readonly "getSAMLLogout": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSAMLLogout404", typeof GetSAMLLogout404.Type> | GrafanaError<"GetSAMLLogout500", typeof GetSAMLLogout500.Type>>
  /**
* Get current Organization.
*/
readonly "getCurrentOrg": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetCurrentOrg200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetCurrentOrg401", typeof GetCurrentOrg401.Type> | GrafanaError<"GetCurrentOrg403", typeof GetCurrentOrg403.Type> | GrafanaError<"GetCurrentOrg500", typeof GetCurrentOrg500.Type>>
  /**
* Get pending invites.
*/
readonly "getPendingOrgInvites": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetPendingOrgInvites200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetPendingOrgInvites401", typeof GetPendingOrgInvites401.Type> | GrafanaError<"GetPendingOrgInvites403", typeof GetPendingOrgInvites403.Type> | GrafanaError<"GetPendingOrgInvites500", typeof GetPendingOrgInvites500.Type>>
  /**
* Get Current Org Prefs.
*/
readonly "getOrgPreferences": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetOrgPreferences200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetOrgPreferences401", typeof GetOrgPreferences401.Type> | GrafanaError<"GetOrgPreferences403", typeof GetOrgPreferences403.Type> | GrafanaError<"GetOrgPreferences500", typeof GetOrgPreferences500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled, you need to have a permission with action `orgs.quotas:read` and scope `org:id:1` (orgIDScope).
*/
readonly "getCurrentOrgQuota": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetCurrentOrgQuota200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetCurrentOrgQuota401", typeof GetCurrentOrgQuota401.Type> | GrafanaError<"GetCurrentOrgQuota403", typeof GetCurrentOrgQuota403.Type> | GrafanaError<"GetCurrentOrgQuota404", typeof GetCurrentOrgQuota404.Type> | GrafanaError<"GetCurrentOrgQuota500", typeof GetCurrentOrgQuota500.Type>>
  /**
* Returns all org users within the current organization. Accessible to users with org admin role.
* If you are running Grafana Enterprise and have Fine-grained access control enabled
* you need to have a permission with action: `org.users:read` with scope `users:*`.
*/
readonly "getOrgUsersForCurrentOrg": <Config extends OperationConfig>(options: { readonly params?: typeof GetOrgUsersForCurrentOrgParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetOrgUsersForCurrentOrg200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetOrgUsersForCurrentOrg401", typeof GetOrgUsersForCurrentOrg401.Type> | GrafanaError<"GetOrgUsersForCurrentOrg403", typeof GetOrgUsersForCurrentOrg403.Type> | GrafanaError<"GetOrgUsersForCurrentOrg500", typeof GetOrgUsersForCurrentOrg500.Type>>
  /**
* Returns all org users within the current organization, but with less detailed information.
* Accessible to users with org admin role, admin in any folder or admin of any team.
* Mainly used by Grafana UI for providing list of users when adding team members and when editing folder/dashboard permissions.
*/
readonly "getOrgUsersForCurrentOrgLookup": <Config extends OperationConfig>(options: { readonly params?: typeof GetOrgUsersForCurrentOrgLookupParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetOrgUsersForCurrentOrgLookup200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetOrgUsersForCurrentOrgLookup401", typeof GetOrgUsersForCurrentOrgLookup401.Type> | GrafanaError<"GetOrgUsersForCurrentOrgLookup403", typeof GetOrgUsersForCurrentOrgLookup403.Type> | GrafanaError<"GetOrgUsersForCurrentOrgLookup500", typeof GetOrgUsersForCurrentOrgLookup500.Type>>
  /**
* Search all Organizations.
*/
readonly "searchOrgs": <Config extends OperationConfig>(options: { readonly params?: typeof SearchOrgsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchOrgs200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchOrgs401", typeof SearchOrgs401.Type> | GrafanaError<"SearchOrgs403", typeof SearchOrgs403.Type> | GrafanaError<"SearchOrgs409", typeof SearchOrgs409.Type> | GrafanaError<"SearchOrgs500", typeof SearchOrgs500.Type>>
  /**
* Get Organization by Name.
*/
readonly "getOrgByName": <Config extends OperationConfig>(orgName: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetOrgByName200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetOrgByName401", typeof GetOrgByName401.Type> | GrafanaError<"GetOrgByName403", typeof GetOrgByName403.Type> | GrafanaError<"GetOrgByName500", typeof GetOrgByName500.Type>>
  /**
* Get Organization by ID.
*/
readonly "getOrgByID": <Config extends OperationConfig>(orgId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetOrgByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetOrgByID401", typeof GetOrgByID401.Type> | GrafanaError<"GetOrgByID403", typeof GetOrgByID403.Type> | GrafanaError<"GetOrgByID500", typeof GetOrgByID500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled, you need to have a permission with action `orgs.quotas:read` and scope `org:id:1` (orgIDScope).
*/
readonly "getOrgQuota": <Config extends OperationConfig>(orgId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetOrgQuota200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetOrgQuota401", typeof GetOrgQuota401.Type> | GrafanaError<"GetOrgQuota403", typeof GetOrgQuota403.Type> | GrafanaError<"GetOrgQuota404", typeof GetOrgQuota404.Type> | GrafanaError<"GetOrgQuota500", typeof GetOrgQuota500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled
* you need to have a permission with action: `org.users:read` with scope `users:*`.
*/
readonly "getOrgUsers": <Config extends OperationConfig>(orgId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetOrgUsers200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetOrgUsers401", typeof GetOrgUsers401.Type> | GrafanaError<"GetOrgUsers403", typeof GetOrgUsers403.Type> | GrafanaError<"GetOrgUsers500", typeof GetOrgUsers500.Type>>
  /**
* If you are running Grafana Enterprise and have Fine-grained access control enabled
* you need to have a permission with action: `org.users:read` with scope `users:*`.
*/
readonly "searchOrgUsers": <Config extends OperationConfig>(orgId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchOrgUsers200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchOrgUsers401", typeof SearchOrgUsers401.Type> | GrafanaError<"SearchOrgUsers403", typeof SearchOrgUsers403.Type> | GrafanaError<"SearchOrgUsers500", typeof SearchOrgUsers500.Type>>
  /**
* Please refer to [new API](?api=playlist.grafana.app-v1).
*/
readonly "searchPlaylists": <Config extends OperationConfig>(options: { readonly params?: typeof SearchPlaylistsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchPlaylists200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchPlaylists500", typeof SearchPlaylists500.Type>>
  /**
* Please refer to [new API](?api=playlist.grafana.app-v1).
*/
readonly "getPlaylist": <Config extends OperationConfig>(uid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetPlaylist200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetPlaylist401", typeof GetPlaylist401.Type> | GrafanaError<"GetPlaylist403", typeof GetPlaylist403.Type> | GrafanaError<"GetPlaylist404", typeof GetPlaylist404.Type> | GrafanaError<"GetPlaylist500", typeof GetPlaylist500.Type>>
  /**
* Please refer to [new API](?api=playlist.grafana.app-v1) instead (items are included in the playlist spec).
*/
readonly "getPlaylistItems": <Config extends OperationConfig>(uid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetPlaylistItems200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetPlaylistItems401", typeof GetPlaylistItems401.Type> | GrafanaError<"GetPlaylistItems403", typeof GetPlaylistItems403.Type> | GrafanaError<"GetPlaylistItems404", typeof GetPlaylistItems404.Type> | GrafanaError<"GetPlaylistItems500", typeof GetPlaylistItems500.Type>>
  /**
* Get public dashboard for view
*/
readonly "viewPublicDashboard": <Config extends OperationConfig>(accessToken: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ViewPublicDashboard200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"ViewPublicDashboard400", typeof ViewPublicDashboard400.Type> | GrafanaError<"ViewPublicDashboard401", typeof ViewPublicDashboard401.Type> | GrafanaError<"ViewPublicDashboard403", typeof ViewPublicDashboard403.Type> | GrafanaError<"ViewPublicDashboard404", typeof ViewPublicDashboard404.Type> | GrafanaError<"ViewPublicDashboard500", typeof ViewPublicDashboard500.Type>>
  /**
* Get annotations for a public dashboard
*/
readonly "getPublicAnnotations": <Config extends OperationConfig>(accessToken: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetPublicAnnotations200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetPublicAnnotations400", typeof GetPublicAnnotations400.Type> | GrafanaError<"GetPublicAnnotations401", typeof GetPublicAnnotations401.Type> | GrafanaError<"GetPublicAnnotations403", typeof GetPublicAnnotations403.Type> | GrafanaError<"GetPublicAnnotations404", typeof GetPublicAnnotations404.Type> | GrafanaError<"GetPublicAnnotations500", typeof GetPublicAnnotations500.Type>>
  /**
* Returns a list of queries in the query history that matches the search criteria.
* Query history search supports pagination. Use the `limit` parameter to control the maximum number of queries returned; the default limit is 100.
* You can also use the `page` query parameter to fetch queries from any page other than the first one.
*/
readonly "searchQueries": <Config extends OperationConfig>(options: { readonly params?: typeof SearchQueriesParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchQueries200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchQueries401", typeof SearchQueries401.Type> | GrafanaError<"SearchQueries500", typeof SearchQueries500.Type>>
  /**
* Lists all rules in the database: active or deleted.
*/
readonly "listRecordingRules": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListRecordingRules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"ListRecordingRules401", typeof ListRecordingRules401.Type> | GrafanaError<"ListRecordingRules403", typeof ListRecordingRules403.Type> | GrafanaError<"ListRecordingRules404", typeof ListRecordingRules404.Type> | GrafanaError<"ListRecordingRules500", typeof ListRecordingRules500.Type>>
  /**
* Return the prometheus remote write target.
*/
readonly "getRecordingRuleWriteTarget": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetRecordingRuleWriteTarget200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetRecordingRuleWriteTarget401", typeof GetRecordingRuleWriteTarget401.Type> | GrafanaError<"GetRecordingRuleWriteTarget403", typeof GetRecordingRuleWriteTarget403.Type> | GrafanaError<"GetRecordingRuleWriteTarget404", typeof GetRecordingRuleWriteTarget404.Type> | GrafanaError<"GetRecordingRuleWriteTarget500", typeof GetRecordingRuleWriteTarget500.Type>>
  /**
* Available to org admins only and with a valid or expired license.
* 
* You need to have a permission with action `reports:read` with scope `reports:*`.
*/
readonly "getReports": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetReports200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetReports401", typeof GetReports401.Type> | GrafanaError<"GetReports403", typeof GetReports403.Type> | GrafanaError<"GetReports500", typeof GetReports500.Type>>
  /**
* Available to org admins only and with a valid or expired license.
* 
* You need to have a permission with action `reports:read` with scope `reports:*`.
*/
readonly "getReportsByDashboardUID": <Config extends OperationConfig>(uid: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetReportsByDashboardUID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetReportsByDashboardUID401", typeof GetReportsByDashboardUID401.Type> | GrafanaError<"GetReportsByDashboardUID403", typeof GetReportsByDashboardUID403.Type> | GrafanaError<"GetReportsByDashboardUID500", typeof GetReportsByDashboardUID500.Type>>
  /**
* Available to org admins only and with a valid or expired license.
* 
* You need to have a permission with action `reports.settings:read`.
*/
readonly "getSettingsImage": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetSettingsImage200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSettingsImage401", typeof GetSettingsImage401.Type> | GrafanaError<"GetSettingsImage403", typeof GetSettingsImage403.Type> | GrafanaError<"GetSettingsImage404", typeof GetSettingsImage404.Type> | GrafanaError<"GetSettingsImage500", typeof GetSettingsImage500.Type>>
  /**
* Available to all users and with a valid license.
*/
readonly "renderReportCSVs": <Config extends OperationConfig>(options: { readonly params?: typeof RenderReportCSVsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RenderReportCSVs200.Type | typeof RenderReportCSVs204.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RenderReportCSVs400", typeof RenderReportCSVs400.Type> | GrafanaError<"RenderReportCSVs401", typeof RenderReportCSVs401.Type> | GrafanaError<"RenderReportCSVs500", typeof RenderReportCSVs500.Type>>
  /**
* Available to all users and with a valid license.
*/
readonly "renderReportPDFs": <Config extends OperationConfig>(options: { readonly params?: typeof RenderReportPDFsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RenderReportPDFs200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RenderReportPDFs400", typeof RenderReportPDFs400.Type> | GrafanaError<"RenderReportPDFs401", typeof RenderReportPDFs401.Type> | GrafanaError<"RenderReportPDFs500", typeof RenderReportPDFs500.Type>>
  /**
* Available to org admins only and with a valid or expired license.
* 
* You need to have a permission with action `reports.settings:read`x.
*/
readonly "getReportSettings": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetReportSettings200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetReportSettings401", typeof GetReportSettings401.Type> | GrafanaError<"GetReportSettings403", typeof GetReportSettings403.Type> | GrafanaError<"GetReportSettings500", typeof GetReportSettings500.Type>>
  /**
* Available to org admins only and with a valid or expired license.
* 
* You need to have a permission with action `reports:read` with scope `reports:id:<report ID>`.
* 
* Requesting reports using the internal id will stop workgin in the future
* Use the reporting apiserver to manage reports.  See: /apis/reporting.grafana.app/
*/
readonly "getReport": <Config extends OperationConfig>(id: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetReport200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetReport400", typeof GetReport400.Type> | GrafanaError<"GetReport401", typeof GetReport401.Type> | GrafanaError<"GetReport403", typeof GetReport403.Type> | GrafanaError<"GetReport404", typeof GetReport404.Type> | GrafanaError<"GetReport500", typeof GetReport500.Type>>
  /**
* It exposes the SP (Grafana's) metadata for the IdP's consumption.
*/
readonly "getMetadata": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetMetadata200.Type, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* There might be two possible requests:
* 1. Logout response (callback) when Grafana initiates single logout and IdP returns response to logout request.
* 2. Logout request when another SP initiates single logout and IdP sends logout request to the Grafana,
* or in case of IdP-initiated logout.
*/
readonly "getSLO": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSLO400", typeof GetSLO400.Type> | GrafanaError<"GetSLO403", typeof GetSLO403.Type> | GrafanaError<"GetSLO500", typeof GetSLO500.Type>>
  readonly "search": <Config extends OperationConfig>(options: { readonly params?: typeof SearchParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof Search200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"Search401", typeof Search401.Type> | GrafanaError<"Search422", typeof Search422.Type> | GrafanaError<"Search500", typeof Search500.Type>>
  /**
* List search sorting options.
*/
readonly "listSortOptions": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListSortOptions200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"ListSortOptions401", typeof ListSortOptions401.Type>>
  /**
* Required permissions (See note in the [introduction](https://grafana.com/docs/grafana/latest/developers/http_api/serviceaccount/#service-account-api) for an explanation):
* action: `serviceaccounts:read` scope: `serviceaccounts:*`
*/
readonly "searchOrgServiceAccountsWithPaging": <Config extends OperationConfig>(options: { readonly params?: typeof SearchOrgServiceAccountsWithPagingParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchOrgServiceAccountsWithPaging200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchOrgServiceAccountsWithPaging401", typeof SearchOrgServiceAccountsWithPaging401.Type> | GrafanaError<"SearchOrgServiceAccountsWithPaging403", typeof SearchOrgServiceAccountsWithPaging403.Type> | GrafanaError<"SearchOrgServiceAccountsWithPaging500", typeof SearchOrgServiceAccountsWithPaging500.Type>>
  /**
* Required permissions (See note in the [introduction](https://grafana.com/docs/grafana/latest/developers/http_api/serviceaccount/#service-account-api) for an explanation):
* action: `serviceaccounts:read` scope: `serviceaccounts:id:1` (single service account)
*/
readonly "retrieveServiceAccount": <Config extends OperationConfig>(serviceAccountId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RetrieveServiceAccount200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RetrieveServiceAccount400", typeof RetrieveServiceAccount400.Type> | GrafanaError<"RetrieveServiceAccount401", typeof RetrieveServiceAccount401.Type> | GrafanaError<"RetrieveServiceAccount403", typeof RetrieveServiceAccount403.Type> | GrafanaError<"RetrieveServiceAccount404", typeof RetrieveServiceAccount404.Type> | GrafanaError<"RetrieveServiceAccount500", typeof RetrieveServiceAccount500.Type>>
  /**
* Required permissions (See note in the [introduction](https://grafana.com/docs/grafana/latest/developers/http_api/serviceaccount/#service-account-api) for an explanation):
* action: `serviceaccounts:read` scope: `global:serviceaccounts:id:1` (single service account)
* 
* Requires basic authentication and that the authenticated user is a Grafana Admin.
*/
readonly "listTokens": <Config extends OperationConfig>(serviceAccountId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListTokens200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"ListTokens400", typeof ListTokens400.Type> | GrafanaError<"ListTokens401", typeof ListTokens401.Type> | GrafanaError<"ListTokens403", typeof ListTokens403.Type> | GrafanaError<"ListTokens500", typeof ListTokens500.Type>>
  /**
* Required permissions
* None
*/
readonly "retrieveJWKS": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RetrieveJWKS200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RetrieveJWKS500", typeof RetrieveJWKS500.Type>>
  /**
* Get snapshot sharing settings.
*/
readonly "getSharingOptions": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetSharingOptions200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSharingOptions401", typeof GetSharingOptions401.Type>>
  /**
* Snapshot public mode should be enabled or authentication is required.
*/
readonly "deleteDashboardSnapshotByDeleteKey": <Config extends OperationConfig>(deleteKey: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof DeleteDashboardSnapshotByDeleteKey200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"DeleteDashboardSnapshotByDeleteKey401", typeof DeleteDashboardSnapshotByDeleteKey401.Type> | GrafanaError<"DeleteDashboardSnapshotByDeleteKey403", typeof DeleteDashboardSnapshotByDeleteKey403.Type> | GrafanaError<"DeleteDashboardSnapshotByDeleteKey404", typeof DeleteDashboardSnapshotByDeleteKey404.Type> | GrafanaError<"DeleteDashboardSnapshotByDeleteKey500", typeof DeleteDashboardSnapshotByDeleteKey500.Type>>
  /**
* Get Snapshot by Key.
*/
readonly "getDashboardSnapshot": <Config extends OperationConfig>(key: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<void, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetDashboardSnapshot400", typeof GetDashboardSnapshot400.Type> | GrafanaError<"GetDashboardSnapshot404", typeof GetDashboardSnapshot404.Type> | GrafanaError<"GetDashboardSnapshot500", typeof GetDashboardSnapshot500.Type>>
  /**
* Team Search With Paging.
*/
readonly "searchTeams": <Config extends OperationConfig>(options: { readonly params?: typeof SearchTeamsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchTeams200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchTeams401", typeof SearchTeams401.Type> | GrafanaError<"SearchTeams403", typeof SearchTeams403.Type> | GrafanaError<"SearchTeams500", typeof SearchTeams500.Type>>
  /**
* Get External Groups.
*/
readonly "getTeamGroupsApi": <Config extends OperationConfig>(teamId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetTeamGroupsApi200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetTeamGroupsApi400", typeof GetTeamGroupsApi400.Type> | GrafanaError<"GetTeamGroupsApi401", typeof GetTeamGroupsApi401.Type> | GrafanaError<"GetTeamGroupsApi403", typeof GetTeamGroupsApi403.Type> | GrafanaError<"GetTeamGroupsApi404", typeof GetTeamGroupsApi404.Type> | GrafanaError<"GetTeamGroupsApi500", typeof GetTeamGroupsApi500.Type>>
  /**
* Search for team groups with optional filtering and pagination.
*/
readonly "searchTeamGroups": <Config extends OperationConfig>(teamId: string, options: { readonly params?: typeof SearchTeamGroupsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchTeamGroups200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchTeamGroups400", typeof SearchTeamGroups400.Type> | GrafanaError<"SearchTeamGroups401", typeof SearchTeamGroups401.Type> | GrafanaError<"SearchTeamGroups403", typeof SearchTeamGroups403.Type> | GrafanaError<"SearchTeamGroups500", typeof SearchTeamGroups500.Type>>
  /**
* Get Team By ID.
*/
readonly "getTeamByID": <Config extends OperationConfig>(teamId: string, options: { readonly params?: typeof GetTeamByIDParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetTeamByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetTeamByID401", typeof GetTeamByID401.Type> | GrafanaError<"GetTeamByID403", typeof GetTeamByID403.Type> | GrafanaError<"GetTeamByID404", typeof GetTeamByID404.Type> | GrafanaError<"GetTeamByID500", typeof GetTeamByID500.Type>>
  /**
* Get Team Members.
*/
readonly "getTeamMembers": <Config extends OperationConfig>(teamId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetTeamMembers200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetTeamMembers401", typeof GetTeamMembers401.Type> | GrafanaError<"GetTeamMembers403", typeof GetTeamMembers403.Type> | GrafanaError<"GetTeamMembers404", typeof GetTeamMembers404.Type> | GrafanaError<"GetTeamMembers500", typeof GetTeamMembers500.Type>>
  /**
* Get Team Preferences.
*/
readonly "getTeamPreferences": <Config extends OperationConfig>(teamId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetTeamPreferences200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetTeamPreferences401", typeof GetTeamPreferences401.Type> | GrafanaError<"GetTeamPreferences500", typeof GetTeamPreferences500.Type>>
  /**
* Get (current authenticated user)
*/
readonly "getSignedInUser": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetSignedInUser200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSignedInUser401", typeof GetSignedInUser401.Type> | GrafanaError<"GetSignedInUser403", typeof GetSignedInUser403.Type> | GrafanaError<"GetSignedInUser404", typeof GetSignedInUser404.Type> | GrafanaError<"GetSignedInUser500", typeof GetSignedInUser500.Type>>
  /**
* Return a list of all auth tokens (devices) that the actual user currently have logged in from.
*/
readonly "getUserAuthTokens": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserAuthTokens200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetUserAuthTokens401", typeof GetUserAuthTokens401.Type> | GrafanaError<"GetUserAuthTokens403", typeof GetUserAuthTokens403.Type> | GrafanaError<"GetUserAuthTokens500", typeof GetUserAuthTokens500.Type>>
  /**
* Update the email of user given a verification code.
*/
readonly "updateUserEmail": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof UpdateUserEmail302.Type, Config>, HttpClientError.HttpClientError | SchemaError>
  /**
* Return a list of all organizations of the current user.
*/
readonly "getSignedInUserOrgList": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetSignedInUserOrgList200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSignedInUserOrgList401", typeof GetSignedInUserOrgList401.Type> | GrafanaError<"GetSignedInUserOrgList403", typeof GetSignedInUserOrgList403.Type> | GrafanaError<"GetSignedInUserOrgList500", typeof GetSignedInUserOrgList500.Type>>
  /**
* Get user preferences.
*/
readonly "getUserPreferences": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserPreferences200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetUserPreferences401", typeof GetUserPreferences401.Type> | GrafanaError<"GetUserPreferences500", typeof GetUserPreferences500.Type>>
  /**
* Fetch user quota.
*/
readonly "getUserQuotas": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserQuotas200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetUserQuotas401", typeof GetUserQuotas401.Type> | GrafanaError<"GetUserQuotas403", typeof GetUserQuotas403.Type> | GrafanaError<"GetUserQuotas404", typeof GetUserQuotas404.Type> | GrafanaError<"GetUserQuotas500", typeof GetUserQuotas500.Type>>
  /**
* Return a list of all teams that the current user is member of.
*/
readonly "getSignedInUserTeamList": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetSignedInUserTeamList200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetSignedInUserTeamList401", typeof GetSignedInUserTeamList401.Type> | GrafanaError<"GetSignedInUserTeamList403", typeof GetSignedInUserTeamList403.Type> | GrafanaError<"GetSignedInUserTeamList500", typeof GetSignedInUserTeamList500.Type>>
  /**
* Returns all users that the authenticated user has permission to view, admin permission required.
*/
readonly "searchUsers": <Config extends OperationConfig>(options: { readonly params?: typeof SearchUsersParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchUsers200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchUsers401", typeof SearchUsers401.Type> | GrafanaError<"SearchUsers403", typeof SearchUsers403.Type> | GrafanaError<"SearchUsers500", typeof SearchUsers500.Type>>
  /**
* Get user by login or email.
*/
readonly "getUserByLoginOrEmail": <Config extends OperationConfig>(options: { readonly params: typeof GetUserByLoginOrEmailParams.Encoded; readonly config?: Config | undefined }) => Effect.Effect<WithOptionalResponse<typeof GetUserByLoginOrEmail200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetUserByLoginOrEmail401", typeof GetUserByLoginOrEmail401.Type> | GrafanaError<"GetUserByLoginOrEmail403", typeof GetUserByLoginOrEmail403.Type> | GrafanaError<"GetUserByLoginOrEmail404", typeof GetUserByLoginOrEmail404.Type> | GrafanaError<"GetUserByLoginOrEmail500", typeof GetUserByLoginOrEmail500.Type>>
  /**
* Get users with paging.
*/
readonly "searchUsersWithPaging": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof SearchUsersWithPaging200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"SearchUsersWithPaging401", typeof SearchUsersWithPaging401.Type> | GrafanaError<"SearchUsersWithPaging403", typeof SearchUsersWithPaging403.Type> | GrafanaError<"SearchUsersWithPaging404", typeof SearchUsersWithPaging404.Type> | GrafanaError<"SearchUsersWithPaging500", typeof SearchUsersWithPaging500.Type>>
  /**
* Get user by id.
*/
readonly "getUserByID": <Config extends OperationConfig>(userId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserByID200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetUserByID401", typeof GetUserByID401.Type> | GrafanaError<"GetUserByID403", typeof GetUserByID403.Type> | GrafanaError<"GetUserByID404", typeof GetUserByID404.Type> | GrafanaError<"GetUserByID500", typeof GetUserByID500.Type>>
  /**
* Get organizations for user identified by id.
*/
readonly "getUserOrgList": <Config extends OperationConfig>(userId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserOrgList200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetUserOrgList401", typeof GetUserOrgList401.Type> | GrafanaError<"GetUserOrgList403", typeof GetUserOrgList403.Type> | GrafanaError<"GetUserOrgList404", typeof GetUserOrgList404.Type> | GrafanaError<"GetUserOrgList500", typeof GetUserOrgList500.Type>>
  /**
* Get teams for user identified by id.
*/
readonly "getUserTeams": <Config extends OperationConfig>(userId: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetUserTeams200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetUserTeams401", typeof GetUserTeams401.Type> | GrafanaError<"GetUserTeams403", typeof GetUserTeams403.Type> | GrafanaError<"GetUserTeams404", typeof GetUserTeams404.Type> | GrafanaError<"GetUserTeams500", typeof GetUserTeams500.Type>>
  /**
* Get all the alert rules.
*/
readonly "RouteGetAlertRules": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRules200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRules403", typeof RouteGetAlertRules403.Type>>
  /**
* Export all alert rules in provisioning file format.
*/
readonly "RouteGetAlertRulesExport": <Config extends OperationConfig>(options: { readonly params?: typeof RouteGetAlertRulesExportParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRulesExport200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRulesExport403", typeof RouteGetAlertRulesExport403.Type> | GrafanaError<"404", undefined>>
  /**
* Get a specific alert rule by UID.
*/
readonly "RouteGetAlertRule": <Config extends OperationConfig>(UID: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRule200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRule403", typeof RouteGetAlertRule403.Type> | GrafanaError<"404", undefined>>
  /**
* Export an alert rule in provisioning file format.
*/
readonly "RouteGetAlertRuleExport": <Config extends OperationConfig>(UID: string, options: { readonly params?: typeof RouteGetAlertRuleExportParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRuleExport200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRuleExport403", typeof RouteGetAlertRuleExport403.Type> | GrafanaError<"404", undefined>>
  /**
* Get all the contact points.
*/
readonly "RouteGetContactpoints": <Config extends OperationConfig>(options: { readonly params?: typeof RouteGetContactpointsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetContactpoints200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetContactpoints403", typeof RouteGetContactpoints403.Type>>
  /**
* Export all contact points in provisioning file format.
*/
readonly "RouteGetContactpointsExport": <Config extends OperationConfig>(options: { readonly params?: typeof RouteGetContactpointsExportParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetContactpointsExport200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetContactpointsExport403", typeof RouteGetContactpointsExport403.Type>>
  /**
* Get a rule group.
*/
readonly "RouteGetAlertRuleGroup": <Config extends OperationConfig>(FolderUID: string, Group: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRuleGroup200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRuleGroup403", typeof RouteGetAlertRuleGroup403.Type> | GrafanaError<"404", undefined>>
  /**
* Export an alert rule group in provisioning file format.
*/
readonly "RouteGetAlertRuleGroupExport": <Config extends OperationConfig>(FolderUID: string, Group: string, options: { readonly params?: typeof RouteGetAlertRuleGroupExportParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRuleGroupExport200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRuleGroupExport403", typeof RouteGetAlertRuleGroupExport403.Type> | GrafanaError<"404", undefined>>
  /**
* Get all the mute timings.
*/
readonly "RouteGetMuteTimings": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetMuteTimings200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetMuteTimings403", typeof RouteGetMuteTimings403.Type>>
  /**
* Export all mute timings in provisioning format.
*/
readonly "RouteExportMuteTimings": <Config extends OperationConfig>(options: { readonly params?: typeof RouteExportMuteTimingsParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteExportMuteTimings200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteExportMuteTimings403", typeof RouteExportMuteTimings403.Type>>
  /**
* Get a mute timing.
*/
readonly "RouteGetMuteTiming": <Config extends OperationConfig>(name: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetMuteTiming200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetMuteTiming403", typeof RouteGetMuteTiming403.Type> | GrafanaError<"404", undefined>>
  /**
* Export a mute timing in provisioning format.
*/
readonly "RouteExportMuteTiming": <Config extends OperationConfig>(name: string, options: { readonly params?: typeof RouteExportMuteTimingParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteExportMuteTiming200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteExportMuteTiming403", typeof RouteExportMuteTiming403.Type>>
  /**
* Get the notification policy tree.
*/
readonly "RouteGetPolicyTree": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetPolicyTree200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetPolicyTree403", typeof RouteGetPolicyTree403.Type>>
  /**
* Export the notification policy tree in provisioning file format.
*/
readonly "RouteGetPolicyTreeExport": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetPolicyTreeExport200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetPolicyTreeExport403", typeof RouteGetPolicyTreeExport403.Type> | GrafanaError<"RouteGetPolicyTreeExport404", typeof RouteGetPolicyTreeExport404.Type>>
  /**
* Get all notification template groups.
*/
readonly "RouteGetTemplates": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetTemplates200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetTemplates403", typeof RouteGetTemplates403.Type>>
  /**
* Get a notification template group.
*/
readonly "RouteGetTemplate": <Config extends OperationConfig>(name: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetTemplate200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetTemplate403", typeof RouteGetTemplate403.Type> | GrafanaError<"RouteGetTemplate404", typeof RouteGetTemplate404.Type>>
  /**
* You need to have a permission with action `settings:read` with scope `settings:auth.<provider>:*`.
*/
readonly "listAllProvidersSettings": <Config extends OperationConfig>(options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof ListAllProvidersSettings200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"ListAllProvidersSettings400", typeof ListAllProvidersSettings400.Type> | GrafanaError<"ListAllProvidersSettings401", typeof ListAllProvidersSettings401.Type> | GrafanaError<"ListAllProvidersSettings403", typeof ListAllProvidersSettings403.Type>>
  /**
* You need to have a permission with action `settings:read` with scope `settings:auth.<provider>:*`.
*/
readonly "getProviderSettings": <Config extends OperationConfig>(key: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof GetProviderSettings200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"GetProviderSettings400", typeof GetProviderSettings400.Type> | GrafanaError<"GetProviderSettings401", typeof GetProviderSettings401.Type> | GrafanaError<"GetProviderSettings403", typeof GetProviderSettings403.Type> | GrafanaError<"GetProviderSettings404", typeof GetProviderSettings404.Type>>
}

export interface GrafanaError<Tag extends string, E> {
  readonly _tag: Tag
  readonly request: HttpClientRequest.HttpClientRequest
  readonly response: HttpClientResponse.HttpClientResponse
  readonly cause: E
}

class GrafanaErrorImpl extends Data.Error<{
  _tag: string
  cause: any
  request: HttpClientRequest.HttpClientRequest
  response: HttpClientResponse.HttpClientResponse
}> {}

export const GrafanaError = <Tag extends string, E>(
  tag: Tag,
  cause: E,
  response: HttpClientResponse.HttpClientResponse,
): GrafanaError<Tag, E> =>
  new GrafanaErrorImpl({
    _tag: tag,
    cause,
    response,
    request: response.request,
  }) as any
