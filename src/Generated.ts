import * as Data from "effect/Data"
import * as Effect from "effect/Effect"
import type { SchemaError } from "effect/Schema"
import * as Schema from "effect/Schema"
import type * as HttpClient from "effect/unstable/http/HttpClient"
import * as HttpClientError from "effect/unstable/http/HttpClientError"
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest"
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse"
// recursive declarations
export type RouteExport = { readonly "active_time_intervals"?: ReadonlyArray<string>, readonly "continue"?: boolean, readonly "group_by"?: ReadonlyArray<string>, readonly "group_interval"?: string, readonly "group_wait"?: string, readonly "match"?: { readonly [x: string]: string }, readonly "match_re"?: MatchRegexps, readonly "matchers"?: Matchers1, readonly "mute_time_intervals"?: ReadonlyArray<string>, readonly "object_matchers"?: ObjectMatchers, readonly "receiver"?: string, readonly "repeat_interval"?: string, readonly "routes"?: ReadonlyArray<RouteExport> }
export const RouteExport = Schema.suspend((): Schema.Codec<RouteExport> => __recursive_RouteExport)
export type TimeInterval = { readonly "name"?: string, readonly "time_intervals"?: ReadonlyArray<TimeInterval> }
export const TimeInterval = Schema.suspend((): Schema.Codec<TimeInterval> => __recursive_TimeInterval)
export type Route = { readonly "active_time_intervals"?: ReadonlyArray<string>, readonly "continue"?: boolean, readonly "group_by"?: ReadonlyArray<string>, readonly "group_interval"?: string, readonly "group_wait"?: string, readonly "match"?: { readonly [x: string]: string }, readonly "match_re"?: MatchRegexps, readonly "matchers"?: Matchers1, readonly "mute_time_intervals"?: ReadonlyArray<string>, readonly "object_matchers"?: ObjectMatchers, readonly "provenance"?: Provenance, readonly "receiver"?: string, readonly "repeat_interval"?: string, readonly "routes"?: ReadonlyArray<Route> }
export const Route = Schema.suspend((): Schema.Codec<Route> => __recursive_Route)
// non-recursive definitions
export type ActiveUserStats = { readonly "active_admins_and_editors"?: number, readonly "active_anonymous_devices"?: number, readonly "active_users"?: number, readonly "active_viewers"?: number }
export const ActiveUserStats = Schema.Struct({ "active_admins_and_editors": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "active_anonymous_devices": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "active_users": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "active_viewers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type Address = { readonly "address1"?: string, readonly "address2"?: string, readonly "city"?: string, readonly "country"?: string, readonly "state"?: string, readonly "zipCode"?: string }
export const Address = Schema.Struct({ "address1": Schema.optionalKey(Schema.String), "address2": Schema.optionalKey(Schema.String), "city": Schema.optionalKey(Schema.String), "country": Schema.optionalKey(Schema.String), "state": Schema.optionalKey(Schema.String), "zipCode": Schema.optionalKey(Schema.String) })
export type AdminStats = { readonly "activeAdmins"?: number, readonly "activeDevices"?: number, readonly "activeEditors"?: number, readonly "activeSessions"?: number, readonly "activeUsers"?: number, readonly "activeViewers"?: number, readonly "admins"?: number, readonly "alerts"?: number, readonly "dailyActiveAdmins"?: number, readonly "dailyActiveEditors"?: number, readonly "dailyActiveSessions"?: number, readonly "dailyActiveUsers"?: number, readonly "dailyActiveViewers"?: number, readonly "dashboards"?: number, readonly "datasources"?: number, readonly "editors"?: number, readonly "monthlyActiveUsers"?: number, readonly "orgs"?: number, readonly "playlists"?: number, readonly "snapshots"?: number, readonly "stars"?: number, readonly "tags"?: number, readonly "users"?: number, readonly "viewers"?: number }
export const AdminStats = Schema.Struct({ "activeAdmins": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "activeDevices": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "activeEditors": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "activeSessions": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "activeUsers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "activeViewers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "admins": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "alerts": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "dailyActiveAdmins": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "dailyActiveEditors": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "dailyActiveSessions": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "dailyActiveUsers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "dailyActiveViewers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "dashboards": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "datasources": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "editors": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "monthlyActiveUsers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "orgs": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "playlists": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "snapshots": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "stars": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "tags": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "users": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "viewers": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type AlertInstancesResponse = { readonly "instances"?: ReadonlyArray<ReadonlyArray<number>> }
export const AlertInstancesResponse = Schema.Struct({ "instances": Schema.optionalKey(Schema.Array(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))).annotate({ "description": "Instances is an array of arrow encoded dataframes\neach frame has a single row, and a column for each instance (alert identified by unique labels) with a boolean value (firing/not firing)" })) })
export type AlertManager = { readonly "url"?: string }
export const AlertManager = Schema.Struct({ "url": Schema.optionalKey(Schema.String) }).annotate({ "title": "AlertManager models a configured Alert Manager." })
export type AlertRuleEditorSettings = { readonly "simplified_notifications_section"?: boolean, readonly "simplified_query_and_expressions_section"?: boolean }
export const AlertRuleEditorSettings = Schema.Struct({ "simplified_notifications_section": Schema.optionalKey(Schema.Boolean), "simplified_query_and_expressions_section": Schema.optionalKey(Schema.Boolean) })
export type AlertRuleNotificationSettings = { readonly "active_time_intervals"?: ReadonlyArray<string>, readonly "group_by"?: ReadonlyArray<string>, readonly "group_interval"?: string, readonly "group_wait"?: string, readonly "mute_time_intervals"?: ReadonlyArray<string>, readonly "receiver": string, readonly "repeat_interval"?: string }
export const AlertRuleNotificationSettings = Schema.Struct({ "active_time_intervals": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Override the times when notifications should not be muted. These must match the name of a mute time interval defined\nin the alertmanager configuration time_intervals section. All notifications will be suppressed unless they are sent\nat the time that matches any interval.", "examples": [["maintenance"]] })), "group_by": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Override the labels by which incoming alerts are grouped together. For example, multiple alerts coming in for\ncluster=A and alertname=LatencyHigh would be batched into a single group. To aggregate by all possible labels\nuse the special value '...' as the sole label name.\nThis effectively disables aggregation entirely, passing through all alerts as-is. This is unlikely to be what\nyou want, unless you have a very low alert volume or your upstream notification system performs its own grouping.\nMust include 'alertname' and 'grafana_folder' if not using '...'.", "default": ["alertname","grafana_folder"], "examples": [["alertname","grafana_folder","cluster"]] })), "group_interval": Schema.optionalKey(Schema.String.annotate({ "description": "Override how long to wait before sending a notification about new alerts that are added to a group of alerts for\nwhich an initial notification has already been sent. (Usually ~5m or more.)", "examples": ["5m"] })), "group_wait": Schema.optionalKey(Schema.String.annotate({ "description": "Override how long to initially wait to send a notification for a group of alerts. Allows to wait for an\ninhibiting alert to arrive or collect more initial alerts for the same group. (Usually ~0s to few minutes.)", "examples": ["30s"] })), "mute_time_intervals": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Override the times when notifications should be muted. These must match the name of a mute time interval defined\nin the alertmanager configuration time_intervals section. When muted it will not send any notifications, but\notherwise acts normally.", "examples": [["maintenance"]] })), "receiver": Schema.String.annotate({ "description": "Name of the receiver to send notifications to.", "examples": ["grafana-default-email"] }), "repeat_interval": Schema.optionalKey(Schema.String.annotate({ "description": "Override how long to wait before sending a notification again if it has already been sent successfully for an\nalert. (Usually ~3h or more).\nNote that this parameter is implicitly bound by Alertmanager's `--data.retention` configuration flag.\nNotifications will be resent after either repeat_interval or the data retention period have passed, whichever\noccurs first. `repeat_interval` should not be less than `group_interval`.", "examples": ["4h"] })) })
export type AlertRuleNotificationSettingsExport = { readonly "active_time_intervals"?: ReadonlyArray<string>, readonly "group_by"?: ReadonlyArray<string>, readonly "group_interval"?: string, readonly "group_wait"?: string, readonly "mute_time_intervals"?: ReadonlyArray<string>, readonly "receiver"?: string, readonly "repeat_interval"?: string }
export const AlertRuleNotificationSettingsExport = Schema.Struct({ "active_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "group_by": Schema.optionalKey(Schema.Array(Schema.String)), "group_interval": Schema.optionalKey(Schema.String), "group_wait": Schema.optionalKey(Schema.String), "mute_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "receiver": Schema.optionalKey(Schema.String), "repeat_interval": Schema.optionalKey(Schema.String) }).annotate({ "title": "AlertRuleNotificationSettingsExport is the provisioned export of models.NotificationSettings." })
export type AlertRuleRecordExport = { readonly "from"?: string, readonly "metric"?: string, readonly "targetDatasourceUid"?: string }
export const AlertRuleRecordExport = Schema.Struct({ "from": Schema.optionalKey(Schema.String), "metric": Schema.optionalKey(Schema.String), "targetDatasourceUid": Schema.optionalKey(Schema.String) }).annotate({ "title": "Record is the provisioned export of models.Record." })
export type AnnotationActions = { readonly "canAdd"?: boolean, readonly "canDelete"?: boolean, readonly "canEdit"?: boolean }
export const AnnotationActions = Schema.Struct({ "canAdd": Schema.optionalKey(Schema.Boolean), "canDelete": Schema.optionalKey(Schema.Boolean), "canEdit": Schema.optionalKey(Schema.Boolean) }).annotate({ "description": "+k8s:deepcopy-gen=true" })
export type AnnotationPanelFilter = { readonly "exclude"?: boolean, readonly "ids"?: ReadonlyArray<number> }
export const AnnotationPanelFilter = Schema.Struct({ "exclude": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Should the specified panels be included or excluded" })), "ids": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt())).annotate({ "description": "Panel IDs that should be included or excluded" })) })
export type AnnotationTarget = { readonly "limit"?: number, readonly "matchAny"?: boolean, readonly "tags"?: ReadonlyArray<string>, readonly "type"?: string }
export const AnnotationTarget = Schema.Struct({ "limit": Schema.optionalKey(Schema.Number.annotate({ "description": "Only required/valid for the grafana datasource...\nbut code+tests is already depending on it so hard to change", "format": "int64" }).check(Schema.isInt())), "matchAny": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Only required/valid for the grafana datasource...\nbut code+tests is already depending on it so hard to change" })), "tags": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Only required/valid for the grafana datasource...\nbut code+tests is already depending on it so hard to change" })), "type": Schema.optionalKey(Schema.String.annotate({ "description": "Only required/valid for the grafana datasource...\nbut code+tests is already depending on it so hard to change" })) }).annotate({ "description": "TODO: this should be a regular DataQuery that depends on the selected dashboard\nthese match the properties of the \"grafana\" datasouce that is default in most dashboards" })
export type Assignments = { readonly "builtInRoles"?: boolean, readonly "serviceAccounts"?: boolean, readonly "teams"?: boolean, readonly "users"?: boolean }
export const Assignments = Schema.Struct({ "builtInRoles": Schema.optionalKey(Schema.Boolean), "serviceAccounts": Schema.optionalKey(Schema.Boolean), "teams": Schema.optionalKey(Schema.Boolean), "users": Schema.optionalKey(Schema.Boolean) })
export type CacheConfigResponse = { readonly "created"?: string, readonly "dataSourceID"?: number, readonly "dataSourceUID"?: string, readonly "defaultTTLMs"?: number, readonly "enabled"?: boolean, readonly "message"?: string, readonly "ttlQueriesMs"?: number, readonly "ttlResourcesMs"?: number, readonly "updated"?: string, readonly "useDefaultTTL"?: boolean }
export const CacheConfigResponse = Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "dataSourceID": Schema.optionalKey(Schema.Number.annotate({ "description": "Fields that can be set by the API caller - read/write", "format": "int64" }).check(Schema.isInt())), "dataSourceUID": Schema.optionalKey(Schema.String), "defaultTTLMs": Schema.optionalKey(Schema.Number.annotate({ "description": "These are returned by the HTTP API, but are managed internally - read-only\nNote: 'created' and 'updated' are special properties managed automatically by xorm, but we are setting them manually", "format": "int64" }).check(Schema.isInt())), "enabled": Schema.optionalKey(Schema.Boolean), "message": Schema.optionalKey(Schema.String), "ttlQueriesMs": Schema.optionalKey(Schema.Number.annotate({ "description": "TTL MS, or \"time to live\", is how long a cached item will stay in the cache before it is removed (in milliseconds)", "format": "int64" }).check(Schema.isInt())), "ttlResourcesMs": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "useDefaultTTL": Schema.optionalKey(Schema.Boolean.annotate({ "description": "If UseDefaultTTL is enabled, then the TTLQueriesMS and TTLResourcesMS in this object is always sent as the default TTL located in grafana.ini" })) })
export type CloudMigrationSessionResponseDTO = { readonly "created"?: string, readonly "slug"?: string, readonly "uid"?: string, readonly "updated"?: string }
export const CloudMigrationSessionResponseDTO = Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "slug": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type ConfFloat64 = number
export const ConfFloat64 = Schema.Number.annotate({ "description": "ConfFloat64 is a float64. It Marshals float64 values of NaN of Inf\nto null.", "format": "double" }).check(Schema.isFinite())
export type CorrelationType = string
export const CorrelationType = Schema.String.annotate({ "description": "the type of correlation, either query for containing query information, or external for containing an external URL\n+enum" })
export type CounterResetHint = number
export const CounterResetHint = Schema.Number.annotate({ "title": "CounterResetHint contains the known information about a counter reset,", "description": "or alternatively that we are dealing with a gauge histogram, where counter resets do not apply.", "format": "uint8" }).check(Schema.isInt())
export type DashboardSnapshotDTO = { readonly "created"?: string, readonly "expires"?: string, readonly "external"?: boolean, readonly "externalUrl"?: string, readonly "key"?: string, readonly "name"?: string, readonly "updated"?: string }
export const DashboardSnapshotDTO = Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "expires": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "external": Schema.optionalKey(Schema.Boolean), "externalUrl": Schema.optionalKey(Schema.String), "key": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }).annotate({ "description": "DashboardSnapshotDTO without dashboard map" })
export type DashboardTagCloudItem = { readonly "count"?: number, readonly "term"?: string }
export const DashboardTagCloudItem = Schema.Struct({ "count": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "term": Schema.optionalKey(Schema.String) })
export type DataSourceRef = { readonly "type"?: string, readonly "uid"?: string }
export const DataSourceRef = Schema.Struct({ "type": Schema.optionalKey(Schema.String.annotate({ "description": "The plugin type-id" })), "uid": Schema.optionalKey(Schema.String.annotate({ "description": "Specific datasource instance" })) }).annotate({ "description": "Ref to a DataSource instance" })
export type DataTopic = string
export const DataTopic = Schema.String.annotate({ "title": "DataTopic is used to identify which topic the frame should be assigned to.", "description": "nolint:revive" })
export type DescendantCounts = { readonly [x: string]: number }
export const DescendantCounts = Schema.Record(Schema.String, Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))
export type DeviceSearchHitDTO = { readonly "clientIp"?: string, readonly "createdAt"?: string, readonly "deviceId"?: string, readonly "lastSeenAt"?: string, readonly "updatedAt"?: string, readonly "userAgent"?: string }
export const DeviceSearchHitDTO = Schema.Struct({ "clientIp": Schema.optionalKey(Schema.String), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "deviceId": Schema.optionalKey(Schema.String), "lastSeenAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "userAgent": Schema.optionalKey(Schema.String) })
export type DsAccess = string
export const DsAccess = Schema.String
export type Duration = number
export const Duration = Schema.Number.annotate({ "description": "A Duration represents the elapsed time between two instants\nas an int64 nanosecond count. The representation limits the\nlargest representable duration to approximately 290 years.", "format": "int64" }).check(Schema.isInt())
export type EmailDTO = { readonly "recipient"?: string, readonly "uid"?: string }
export const EmailDTO = Schema.Struct({ "recipient": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) })
export type EnumFieldConfig = { readonly "color"?: ReadonlyArray<string>, readonly "description"?: ReadonlyArray<string>, readonly "icon"?: ReadonlyArray<string>, readonly "text"?: ReadonlyArray<string> }
export const EnumFieldConfig = Schema.Struct({ "color": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Color is the color value for a given index (empty is undefined)" })), "description": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Description of the enum state" })), "icon": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Icon supports setting an icon for a given index value" })), "text": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Value is the string display value for a given index" })) }).annotate({ "description": "Enum field config\nVector values are used as lookup keys into the enum fields" })
export type ErrorResponseBody = { readonly "error"?: string, readonly "message": string, readonly "status"?: string }
export const ErrorResponseBody = Schema.Struct({ "error": Schema.optionalKey(Schema.String.annotate({ "description": "Error An optional detailed description of the actual error. Only included if running in developer mode." })), "message": Schema.String.annotate({ "description": "a human readable version of the error" }), "status": Schema.optionalKey(Schema.String.annotate({ "description": "Status An optional status to denote the cause of the error.\n\nFor example, a 412 Precondition Failed error may include additional information of why that error happened." })) })
export type ErrorType = string
export const ErrorType = Schema.String.annotate({ "title": "ErrorType models the different API error types." })
export type ExplorePanelsState = Schema.Json
export const ExplorePanelsState = Schema.Json.annotate({ "description": "This is an object constructed with the keys as the values of the enum VisType and the value being a bag of properties" })
export type ExtKeyUsage = number
export const ExtKeyUsage = Schema.Number.annotate({ "title": "ExtKeyUsage represents an extended set of actions that are valid for a given key.", "description": "Each of the ExtKeyUsage* constants define a unique action.", "format": "int64" }).check(Schema.isInt())
export type FailedUser = { readonly "Error"?: string, readonly "Login"?: string }
export const FailedUser = Schema.Struct({ "Error": Schema.optionalKey(Schema.String), "Login": Schema.optionalKey(Schema.String) }).annotate({ "description": "FailedUser holds the information of an user that failed" })
export type FooterItem = { readonly "color"?: string, readonly "fontSize"?: string, readonly "fontStyle"?: string, readonly "fontWeight"?: string, readonly "type"?: string, readonly "value"?: string }
export const FooterItem = Schema.Struct({ "color": Schema.optionalKey(Schema.String), "fontSize": Schema.optionalKey(Schema.String), "fontStyle": Schema.optionalKey(Schema.String), "fontWeight": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.String) })
export type FrameLabels = { readonly [x: string]: string }
export const FrameLabels = Schema.Record(Schema.String, Schema.String).annotate({ "description": "Labels are used to add metadata to an object.  The JSON will always be sorted keys" })
export type FrameType = string
export const FrameType = Schema.String.annotate({ "description": "A FrameType string, when present in a frame's metadata, asserts that the\nframe's structure conforms to the FrameType's specification.\nThis property is currently optional, so FrameType may be FrameTypeUnknown even if the properties of\nthe Frame correspond to a defined FrameType.\n+enum" })
export type FrameTypeVersion = ReadonlyArray<number>
export const FrameTypeVersion = Schema.Array(Schema.Number.annotate({ "format": "uint64" }).check(Schema.isInt())).annotate({ "title": "FrameType is a 2 number version (Major / Minor)." })
export type GetAccessTokenResponseDTO = { readonly "createdAt"?: string, readonly "displayName"?: string, readonly "expiresAt"?: string, readonly "firstUsedAt"?: string, readonly "id"?: string, readonly "lastUsedAt"?: string }
export const GetAccessTokenResponseDTO = Schema.Struct({ "createdAt": Schema.optionalKey(Schema.String), "displayName": Schema.optionalKey(Schema.String), "expiresAt": Schema.optionalKey(Schema.String), "firstUsedAt": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.String), "lastUsedAt": Schema.optionalKey(Schema.String) })
export type HitType = string
export const HitType = Schema.String
export type HostPort = { readonly "Host"?: string, readonly "Port"?: string }
export const HostPort = Schema.Struct({ "Host": Schema.optionalKey(Schema.String), "Port": Schema.optionalKey(Schema.String) }).annotate({ "title": "HostPort represents a \"host:port\" network address." })
export type IPMask = ReadonlyArray<number>
export const IPMask = Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt())).annotate({ "title": "An IPMask is a bitmask that can be used to manipulate\nIP addresses for IP addressing and routing.", "description": "See type [IPNet] and func [ParseCIDR] for details." })
export type ImportDashboardInput = { readonly "name"?: string, readonly "pluginId"?: string, readonly "type"?: string, readonly "value"?: string }
export const ImportDashboardInput = Schema.Struct({ "name": Schema.optionalKey(Schema.String), "pluginId": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.String) }).annotate({ "title": "ImportDashboardInput definition of input parameters when importing a dashboard." })
export type InspectType = number
export const InspectType = Schema.Number.annotate({ "title": "InspectType is a type for the Inspect property of a Notice.", "format": "int64" }).check(Schema.isInt())
export type IntegrationStatus = { readonly "lastNotifyAttempt"?: string, readonly "lastNotifyAttemptDuration"?: string, readonly "lastNotifyAttemptError"?: string, readonly "name"?: string, readonly "sendResolved"?: boolean }
export const IntegrationStatus = Schema.Struct({ "lastNotifyAttempt": Schema.optionalKey(Schema.String.annotate({ "description": "A timestamp indicating the last attempt to deliver a notification regardless of the outcome.\nFormat: date-time", "format": "date-time" })), "lastNotifyAttemptDuration": Schema.optionalKey(Schema.String.annotate({ "description": "Duration of the last attempt to deliver a notification in humanized format (`1s` or `15ms`, etc)." })), "lastNotifyAttemptError": Schema.optionalKey(Schema.String.annotate({ "description": "Error string for the last attempt to deliver a notification. Empty if the last attempt was successful." })), "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name of the integration." })), "sendResolved": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Whether the integration is configured to send resolved notifications." })) })
export type Json = {  }
export const Json = Schema.Struct({  })
export type KeyUsage = number
export const KeyUsage = Schema.Number.annotate({ "description": "KeyUsage represents the set of actions that are valid for a given key. It's\na bitmap of the KeyUsage* constants.", "format": "int64" }).check(Schema.isInt())
export type Label = { readonly "Name"?: string }
export const Label = Schema.Struct({ "Name": Schema.optionalKey(Schema.String) }).annotate({ "title": "Label is a key/value pair of strings." })
export type LibraryElementDTOMetaUser = { readonly "avatarUrl"?: string, readonly "id"?: number, readonly "name"?: string }
export const LibraryElementDTOMetaUser = Schema.Struct({ "avatarUrl": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "name": Schema.optionalKey(Schema.String) })
export type ManagerKind = string
export const ManagerKind = Schema.String.annotate({ "title": "ManagerKind is the type of manager, which is responsible for managing the resource.", "description": "It can be a user or a tool or a generic API client.\n+enum" })
export type MatchRegexps = { readonly [x: string]: string }
export const MatchRegexps = Schema.Record(Schema.String, Schema.String).annotate({ "title": "MatchRegexps represents a map of Regexp." })
export type MatchType = number
export const MatchType = Schema.Number.annotate({ "title": "MatchType is an enum for label matching types.", "format": "int64" }).check(Schema.isInt())
export type Metadata = { readonly [x: string]: boolean }
export const Metadata = Schema.Record(Schema.String, Schema.Boolean).annotate({ "description": "Metadata contains user accesses for a given resource\nEx: map[string]bool{\"create\":true, \"delete\": true}" })
export type MigrateDataResponseItemDTO = { readonly "errorCode"?: "ALERT_RULES_QUOTA_REACHED" | "ALERT_RULES_GROUP_QUOTA_REACHED" | "DATASOURCE_NAME_CONFLICT" | "DATASOURCE_INVALID_URL" | "DATASOURCE_ALREADY_MANAGED" | "FOLDER_NAME_CONFLICT" | "DASHBOARD_ALREADY_MANAGED" | "LIBRARY_ELEMENT_NAME_CONFLICT" | "UNSUPPORTED_DATA_TYPE" | "RESOURCE_CONFLICT" | "UNEXPECTED_STATUS_CODE" | "INTERNAL_SERVICE_ERROR" | "GENERIC_ERROR", readonly "message"?: string, readonly "name"?: string, readonly "parentName"?: string, readonly "refId": string, readonly "status": "OK" | "WARNING" | "ERROR" | "PENDING" | "UNKNOWN", readonly "type": "DASHBOARD" | "DATASOURCE" | "FOLDER" | "LIBRARY_ELEMENT" | "ALERT_RULE" | "ALERT_RULE_GROUP" | "CONTACT_POINT" | "NOTIFICATION_POLICY" | "NOTIFICATION_TEMPLATE" | "MUTE_TIMING" | "PLUGIN" }
export const MigrateDataResponseItemDTO = Schema.Struct({ "errorCode": Schema.optionalKey(Schema.Literals(["ALERT_RULES_QUOTA_REACHED", "ALERT_RULES_GROUP_QUOTA_REACHED", "DATASOURCE_NAME_CONFLICT", "DATASOURCE_INVALID_URL", "DATASOURCE_ALREADY_MANAGED", "FOLDER_NAME_CONFLICT", "DASHBOARD_ALREADY_MANAGED", "LIBRARY_ELEMENT_NAME_CONFLICT", "UNSUPPORTED_DATA_TYPE", "RESOURCE_CONFLICT", "UNEXPECTED_STATUS_CODE", "INTERNAL_SERVICE_ERROR", "GENERIC_ERROR"])), "message": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "parentName": Schema.optionalKey(Schema.String), "refId": Schema.String, "status": Schema.Literals(["OK", "WARNING", "ERROR", "PENDING", "UNKNOWN"]), "type": Schema.Literals(["DASHBOARD", "DATASOURCE", "FOLDER", "LIBRARY_ELEMENT", "ALERT_RULE", "ALERT_RULE_GROUP", "CONTACT_POINT", "NOTIFICATION_POLICY", "NOTIFICATION_TEMPLATE", "MUTE_TIMING", "PLUGIN"]) })
export type MigrateDataResponseListDTO = { readonly "uid"?: string }
export const MigrateDataResponseListDTO = Schema.Struct({ "uid": Schema.optionalKey(Schema.String) })
export type MuteTimeInterval = { readonly "name"?: string, readonly "time_intervals"?: ReadonlyArray<TimeInterval> }
export const MuteTimeInterval = Schema.Struct({ "name": Schema.optionalKey(Schema.String), "time_intervals": Schema.optionalKey(Schema.Array(TimeInterval)) }).annotate({ "title": "MuteTimeInterval represents a named set of time intervals for which a route should be muted." })
export type MuteTimeIntervalExport = { readonly "name"?: string, readonly "orgId"?: number, readonly "time_intervals"?: ReadonlyArray<TimeInterval> }
export const MuteTimeIntervalExport = Schema.Struct({ "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "time_intervals": Schema.optionalKey(Schema.Array(TimeInterval)) })
export type NavbarPreference = { readonly "bookmarkUrls"?: ReadonlyArray<string> }
export const NavbarPreference = Schema.Struct({ "bookmarkUrls": Schema.optionalKey(Schema.Array(Schema.String)) })
export type NotFound = {  }
export const NotFound = Schema.Struct({  })
export type NoticeSeverity = number
export const NoticeSeverity = Schema.Number.annotate({ "title": "NoticeSeverity is a type for the Severity property of a Notice.", "format": "int64" }).check(Schema.isInt())
export type ObjectIdentifier = ReadonlyArray<number>
export const ObjectIdentifier = Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())).annotate({ "title": "An ObjectIdentifier represents an ASN.1 OBJECT IDENTIFIER." })
export type ObjectMatcher = ReadonlyArray<string>
export const ObjectMatcher = Schema.Array(Schema.String).annotate({ "title": "ObjectMatcher is a matcher that can be used to filter alerts." })
export type OpsGenieConfigResponder = { readonly "id"?: string, readonly "name"?: string, readonly "type"?: string, readonly "username"?: string }
export const OpsGenieConfigResponder = Schema.Struct({ "id": Schema.optionalKey(Schema.String.annotate({ "description": "One of those 3 should be filled." })), "name": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String.annotate({ "description": "team, user, escalation, schedule etc." })), "username": Schema.optionalKey(Schema.String) })
export type OrgDTO = { readonly "id"?: number, readonly "name"?: string }
export const OrgDTO = Schema.Struct({ "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "name": Schema.optionalKey(Schema.String) })
export type OrgUserDTO = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "authLabels"?: ReadonlyArray<string>, readonly "avatarUrl"?: string, readonly "created"?: string, readonly "email"?: string, readonly "isDisabled"?: boolean, readonly "isExternallySynced"?: boolean, readonly "isProvisioned"?: boolean, readonly "lastSeenAt"?: string, readonly "lastSeenAtAge"?: string, readonly "login"?: string, readonly "name"?: string, readonly "orgId"?: number, readonly "role"?: string, readonly "uid"?: string, readonly "userId"?: number }
export const OrgUserDTO = Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "authLabels": Schema.optionalKey(Schema.Array(Schema.String)), "avatarUrl": Schema.optionalKey(Schema.String), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.optionalKey(Schema.String), "isDisabled": Schema.optionalKey(Schema.Boolean), "isExternallySynced": Schema.optionalKey(Schema.Boolean), "isProvisioned": Schema.optionalKey(Schema.Boolean), "lastSeenAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "lastSeenAtAge": Schema.optionalKey(Schema.String), "login": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "role": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type PagerdutyImage = { readonly "alt"?: string, readonly "href"?: string, readonly "src"?: string }
export const PagerdutyImage = Schema.Struct({ "alt": Schema.optionalKey(Schema.String), "href": Schema.optionalKey(Schema.String), "src": Schema.optionalKey(Schema.String) }).annotate({ "title": "PagerdutyImage is an image." })
export type PagerdutyLink = { readonly "href"?: string, readonly "text"?: string }
export const PagerdutyLink = Schema.Struct({ "href": Schema.optionalKey(Schema.String), "text": Schema.optionalKey(Schema.String) }).annotate({ "title": "PagerdutyLink is a link." })
export type Password = string
export const Password = Schema.String
export type Permission = { readonly "action"?: string, readonly "created"?: string, readonly "scope"?: string, readonly "updated"?: string }
export const Permission = Schema.Struct({ "action": Schema.optionalKey(Schema.String), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "scope": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }).annotate({ "description": "Permission is the model for access control permissions" })
export type PermissionDenied = {  }
export const PermissionDenied = Schema.Struct({  })
export type PermissionType = number
export const PermissionType = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())
export type Playlist = { readonly "id"?: number, readonly "interval"?: string, readonly "name"?: string, readonly "uid"?: string }
export const Playlist = Schema.Struct({ "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "interval": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }).annotate({ "description": "Playlist model" })
export type PlaylistDashboard = { readonly "id"?: number, readonly "order"?: number, readonly "slug"?: string, readonly "title"?: string, readonly "uri"?: string, readonly "url"?: string }
export const PlaylistDashboard = Schema.Struct({ "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "order": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "slug": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "uri": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String) })
export type PlaylistItem = { readonly "Id"?: number, readonly "PlaylistId"?: number, readonly "order"?: number, readonly "title"?: string, readonly "type"?: string, readonly "value"?: string }
export const PlaylistItem = Schema.Struct({ "Id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "PlaylistId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "order": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "title": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.String) })
export type PlaylistItemDTO = { readonly "title"?: string, readonly "type"?: string, readonly "value"?: string }
export const PlaylistItemDTO = Schema.Struct({ "title": Schema.optionalKey(Schema.String.annotate({ "description": "Title is an unused property -- it will be removed in the future" })), "type": Schema.optionalKey(Schema.String.annotate({ "description": "Type of the item." })), "value": Schema.optionalKey(Schema.String.annotate({ "description": "Value depends on type and describes the playlist item.\n\ndashboard_by_id: The value is an internal numerical identifier set by Grafana. This\nis not portable as the numerical identifier is non-deterministic between different instances.\nWill be replaced by dashboard_by_uid in the future. (deprecated)\ndashboard_by_tag: The value is a tag which is set on any number of dashboards. All\ndashboards behind the tag will be added to the playlist.\ndashboard_by_uid: The value is the dashboard UID" })) })
export type PolicyMapping = { readonly "IssuerDomainPolicy"?: string, readonly "SubjectDomainPolicy"?: string }
export const PolicyMapping = Schema.Struct({ "IssuerDomainPolicy": Schema.optionalKey(Schema.String.annotate({ "description": "IssuerDomainPolicy contains a policy OID the issuing certificate considers\nequivalent to SubjectDomainPolicy in the subject certificate." })), "SubjectDomainPolicy": Schema.optionalKey(Schema.String.annotate({ "description": "SubjectDomainPolicy contains a OID the issuing certificate considers\nequivalent to IssuerDomainPolicy in the subject certificate." })) }).annotate({ "title": "PolicyMapping represents a policy mapping entry in the policyMappings extension." })
export type PreferencesNavbarPreference = { readonly "bookmarkUrls"?: ReadonlyArray<string> }
export const PreferencesNavbarPreference = Schema.Struct({ "bookmarkUrls": Schema.optionalKey(Schema.Array(Schema.String)) }).annotate({ "description": "+k8s:openapi-gen=true" })
export type PreferencesQueryHistoryPreference = { readonly "homeTab"?: string }
export const PreferencesQueryHistoryPreference = Schema.Struct({ "homeTab": Schema.optionalKey(Schema.String.annotate({ "description": "one of: '' | 'query' | 'starred';" })) }).annotate({ "description": "+k8s:openapi-gen=true" })
export type PrometheusRemoteWriteTargetJSON = { readonly "data_source_uid"?: string, readonly "id"?: string, readonly "remote_write_path"?: string }
export const PrometheusRemoteWriteTargetJSON = Schema.Struct({ "data_source_uid": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.String), "remote_write_path": Schema.optionalKey(Schema.String) })
export type PrometheusRule = { readonly "alert"?: string, readonly "annotations"?: { readonly [x: string]: string }, readonly "expr"?: string, readonly "for"?: string, readonly "keep_firing_for"?: string, readonly "labels"?: { readonly [x: string]: string }, readonly "record"?: string }
export const PrometheusRule = Schema.Struct({ "alert": Schema.optionalKey(Schema.String), "annotations": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "expr": Schema.optionalKey(Schema.String), "for": Schema.optionalKey(Schema.String), "keep_firing_for": Schema.optionalKey(Schema.String), "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "record": Schema.optionalKey(Schema.String) })
export type Provenance = string
export const Provenance = Schema.String
export type PublicDashboardListResponse = { readonly "accessToken"?: string, readonly "dashboardUid"?: string, readonly "isEnabled"?: boolean, readonly "slug"?: string, readonly "title"?: string, readonly "uid"?: string }
export const PublicDashboardListResponse = Schema.Struct({ "accessToken": Schema.optionalKey(Schema.String), "dashboardUid": Schema.optionalKey(Schema.String), "isEnabled": Schema.optionalKey(Schema.Boolean), "slug": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) })
export type PublicError = { readonly "extra"?: { readonly [x: string]: Schema.Json }, readonly "message"?: string, readonly "messageId"?: string, readonly "statusCode"?: number }
export const PublicError = Schema.Struct({ "extra": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json)), "message": Schema.optionalKey(Schema.String), "messageId": Schema.optionalKey(Schema.String), "statusCode": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) }).annotate({ "description": "PublicError is derived from Error and only contains information\navailable to the end user." })
export type PublicKeyAlgorithm = number
export const PublicKeyAlgorithm = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())
export type QueryHistoryPreference = { readonly "homeTab"?: string }
export const QueryHistoryPreference = Schema.Struct({ "homeTab": Schema.optionalKey(Schema.String) })
export type QuotaDTO = { readonly "limit"?: number, readonly "org_id"?: number, readonly "target"?: string, readonly "used"?: number, readonly "user_id"?: number }
export const QuotaDTO = Schema.Struct({ "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "org_id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "target": Schema.optionalKey(Schema.String), "used": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "user_id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type RawMessage = {  }
export const RawMessage = Schema.Struct({  })
export type Record = { readonly "from": string, readonly "metric": string, readonly "target_datasource_uid"?: string }
export const Record = Schema.Struct({ "from": Schema.String.annotate({ "description": "Which expression node should be used as the input for the recorded metric.", "examples": ["A"] }), "metric": Schema.String.annotate({ "description": "Name of the recorded metric.", "examples": ["grafana_alerts_ratio"] }), "target_datasource_uid": Schema.optionalKey(Schema.String.annotate({ "description": "Which data source should be used to write the output of the recording rule, specified by UID.", "examples": ["my-prom"] })) })
export type RecordingRuleJSON = { readonly "active"?: boolean, readonly "count"?: boolean, readonly "description"?: string, readonly "dest_data_source_uid"?: string, readonly "id"?: string, readonly "interval"?: number, readonly "name"?: string, readonly "prom_name"?: string, readonly "queries"?: ReadonlyArray<{ readonly [x: string]: Schema.Json }>, readonly "range"?: number, readonly "target_ref_id"?: string }
export const RecordingRuleJSON = Schema.Struct({ "active": Schema.optionalKey(Schema.Boolean), "count": Schema.optionalKey(Schema.Boolean), "description": Schema.optionalKey(Schema.String), "dest_data_source_uid": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.String), "interval": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "name": Schema.optionalKey(Schema.String), "prom_name": Schema.optionalKey(Schema.String), "queries": Schema.optionalKey(Schema.Array(Schema.Record(Schema.String, Schema.Json))), "range": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "target_ref_id": Schema.optionalKey(Schema.String) }).annotate({ "description": "RecordingRuleJSON is the external representation of a recording rule" })
export type RelativeTimeRangeExport = { readonly "from"?: number, readonly "to"?: number }
export const RelativeTimeRangeExport = Schema.Struct({ "from": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "to": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type RemoteWriteConfig = { readonly "url"?: string }
export const RemoteWriteConfig = Schema.Struct({ "url": Schema.optionalKey(Schema.String) })
export type ReportBrandingOptions = { readonly "emailFooterLink"?: string, readonly "emailFooterMode"?: string, readonly "emailFooterText"?: string, readonly "emailLogoUrl"?: string, readonly "reportLogoUrl"?: string }
export const ReportBrandingOptions = Schema.Struct({ "emailFooterLink": Schema.optionalKey(Schema.String), "emailFooterMode": Schema.optionalKey(Schema.String), "emailFooterText": Schema.optionalKey(Schema.String), "emailLogoUrl": Schema.optionalKey(Schema.String), "reportLogoUrl": Schema.optionalKey(Schema.String) })
export type ReportDashboardID = { readonly "id"?: number, readonly "name"?: string, readonly "uid"?: string }
export const ReportDashboardID = Schema.Struct({ "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "name": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) })
export type ReportSchedule = { readonly "dayOfMonth"?: string, readonly "endDate"?: string, readonly "frequency"?: string, readonly "intervalAmount"?: number, readonly "intervalFrequency"?: string, readonly "startDate"?: string, readonly "timeZone"?: string, readonly "workdaysOnly"?: boolean }
export const ReportSchedule = Schema.Struct({ "dayOfMonth": Schema.optionalKey(Schema.String), "endDate": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "frequency": Schema.optionalKey(Schema.String), "intervalAmount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "intervalFrequency": Schema.optionalKey(Schema.String), "startDate": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "timeZone": Schema.optionalKey(Schema.String), "workdaysOnly": Schema.optionalKey(Schema.Boolean) })
export type ReportTimeRange = { readonly "from"?: string, readonly "to"?: string }
export const ReportTimeRange = Schema.Struct({ "from": Schema.optionalKey(Schema.String), "to": Schema.optionalKey(Schema.String) })
export type ReportURLItem = { readonly "title"?: string, readonly "url"?: string }
export const ReportURLItem = Schema.Struct({ "title": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String) })
export type ResourceDependencyDTO = { readonly "dependencies"?: ReadonlyArray<"DASHBOARD" | "DATASOURCE" | "FOLDER" | "LIBRARY_ELEMENT" | "ALERT_RULE" | "ALERT_RULE_GROUP" | "CONTACT_POINT" | "NOTIFICATION_POLICY" | "NOTIFICATION_TEMPLATE" | "MUTE_TIMING" | "PLUGIN">, readonly "resourceType"?: "DASHBOARD" | "DATASOURCE" | "FOLDER" | "LIBRARY_ELEMENT" | "ALERT_RULE" | "ALERT_RULE_GROUP" | "CONTACT_POINT" | "NOTIFICATION_POLICY" | "NOTIFICATION_TEMPLATE" | "MUTE_TIMING" | "PLUGIN" }
export const ResourceDependencyDTO = Schema.Struct({ "dependencies": Schema.optionalKey(Schema.Array(Schema.Literals(["DASHBOARD", "DATASOURCE", "FOLDER", "LIBRARY_ELEMENT", "ALERT_RULE", "ALERT_RULE_GROUP", "CONTACT_POINT", "NOTIFICATION_POLICY", "NOTIFICATION_TEMPLATE", "MUTE_TIMING", "PLUGIN"]))), "resourceType": Schema.optionalKey(Schema.Literals(["DASHBOARD", "DATASOURCE", "FOLDER", "LIBRARY_ELEMENT", "ALERT_RULE", "ALERT_RULE_GROUP", "CONTACT_POINT", "NOTIFICATION_POLICY", "NOTIFICATION_TEMPLATE", "MUTE_TIMING", "PLUGIN"])) })
export type ResponseDetails = { readonly "msg"?: string }
export const ResponseDetails = Schema.Struct({ "msg": Schema.optionalKey(Schema.String) })
export type RoleAssignmentsDTO = { readonly "role_uid"?: string, readonly "service_accounts"?: ReadonlyArray<number>, readonly "teams"?: ReadonlyArray<number>, readonly "users"?: ReadonlyArray<number> }
export const RoleAssignmentsDTO = Schema.Struct({ "role_uid": Schema.optionalKey(Schema.String), "service_accounts": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))), "teams": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))), "users": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))) })
export type Secret = string
export const Secret = Schema.String.annotate({ "title": "Secret special type for storing secrets." })
export type ServiceAccountDTO = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "avatarUrl"?: string, readonly "id"?: number, readonly "isDisabled"?: boolean, readonly "isExternal"?: boolean, readonly "login"?: string, readonly "name"?: string, readonly "orgId"?: number, readonly "role"?: string, readonly "tokens"?: number, readonly "uid"?: string }
export const ServiceAccountDTO = Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean).annotate({ "examples": [{"serviceaccounts:delete":true,"serviceaccounts:read":true,"serviceaccounts:write":true}] })), "avatarUrl": Schema.optionalKey(Schema.String.annotate({ "examples": ["/avatar/85ec38023d90823d3e5b43ef35646af9"] })), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "isDisabled": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "isExternal": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "login": Schema.optionalKey(Schema.String.annotate({ "examples": ["sa-grafana"] })), "name": Schema.optionalKey(Schema.String.annotate({ "examples": ["grafana"] })), "orgId": Schema.optionalKey(Schema.Number.annotate({ "examples": [1], "format": "int64" }).check(Schema.isInt())), "role": Schema.optionalKey(Schema.String.annotate({ "examples": ["Viewer"] })), "tokens": Schema.optionalKey(Schema.Number.annotate({ "examples": [0], "format": "int64" }).check(Schema.isInt())), "uid": Schema.optionalKey(Schema.String.annotate({ "examples": ["fe1xejlha91xce"] })) }).annotate({ "description": "swagger: model" })
export type SetResourcePermissionCommand = { readonly "builtInRole"?: string, readonly "permission"?: string, readonly "teamId"?: number, readonly "userId"?: number }
export const SetResourcePermissionCommand = Schema.Struct({ "builtInRole": Schema.optionalKey(Schema.String), "permission": Schema.optionalKey(Schema.String), "teamId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type SettingsBag = { readonly [x: string]: { readonly [x: string]: string } }
export const SettingsBag = Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.String))
export type ShareType = string
export const ShareType = Schema.String
export type SignatureAlgorithm = number
export const SignatureAlgorithm = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())
export type SilenceMetadata = { readonly "folder_uid"?: string, readonly "rule_title"?: string, readonly "rule_uid"?: string }
export const SilenceMetadata = Schema.Struct({ "folder_uid": Schema.optionalKey(Schema.String), "rule_title": Schema.optionalKey(Schema.String), "rule_uid": Schema.optionalKey(Schema.String) })
export type SlackConfirmationField = { readonly "dismiss_text"?: string, readonly "ok_text"?: string, readonly "text"?: string, readonly "title"?: string }
export const SlackConfirmationField = Schema.Struct({ "dismiss_text": Schema.optionalKey(Schema.String), "ok_text": Schema.optionalKey(Schema.String), "text": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String) }).annotate({ "description": "SlackConfirmationField protect users from destructive actions or particularly distinguished decisions\nby asking them to confirm their button click one more time.\nSee https://api.slack.com/docs/interactive-message-field-guide#confirmation_fields for more information." })
export type SlackField = { readonly "short"?: boolean, readonly "title"?: string, readonly "value"?: string }
export const SlackField = Schema.Struct({ "short": Schema.optionalKey(Schema.Boolean), "title": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.String) }).annotate({ "title": "SlackField configures a single Slack field that is sent with each notification.", "description": "Each field must contain a title, value, and optionally, a boolean value to indicate if the field\nis short enough to be displayed next to other fields designated as short.\nSee https://api.slack.com/docs/message-attachments#fields for more information." })
export type SnapshotDTO = { readonly "created"?: string, readonly "finished"?: string, readonly "sessionUid"?: string, readonly "status"?: "INITIALIZING" | "CREATING" | "PENDING_UPLOAD" | "UPLOADING" | "PENDING_PROCESSING" | "PROCESSING" | "FINISHED" | "CANCELED" | "ERROR" | "UNKNOWN", readonly "uid"?: string }
export const SnapshotDTO = Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "finished": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "sessionUid": Schema.optionalKey(Schema.String), "status": Schema.optionalKey(Schema.Literals(["INITIALIZING", "CREATING", "PENDING_UPLOAD", "UPLOADING", "PENDING_PROCESSING", "PROCESSING", "FINISHED", "CANCELED", "ERROR", "UNKNOWN"])), "uid": Schema.optionalKey(Schema.String) }).annotate({ "description": "Base snapshot without results" })
export type SnapshotResourceStats = { readonly "statuses"?: { readonly [x: string]: number }, readonly "total"?: number, readonly "types"?: { readonly [x: string]: number } }
export const SnapshotResourceStats = Schema.Struct({ "statuses": Schema.optionalKey(Schema.Record(Schema.String, Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))), "total": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "types": Schema.optionalKey(Schema.Record(Schema.String, Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))) })
export type Source = string
export const Source = Schema.String.annotate({ "title": "Source type defines the status source." })
export type Span = { readonly "Length"?: number, readonly "Offset"?: number }
export const Span = Schema.Struct({ "Length": Schema.optionalKey(Schema.Number.annotate({ "description": "Length of the span.", "format": "uint32" }).check(Schema.isInt())), "Offset": Schema.optionalKey(Schema.Number.annotate({ "description": "Gap to previous span (always positive), or starting index for the 1st\nspan (which can be negative).", "format": "int32" }).check(Schema.isInt())) }).annotate({ "title": "A Span defines a continuous sequence of buckets." })
export type State = string
export const State = Schema.String.annotate({ "description": "+enum" })
export type Status = number
export const Status = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())
export type SuccessResponseBody = { readonly "message"?: string }
export const SuccessResponseBody = Schema.Struct({ "message": Schema.optionalKey(Schema.String) })
export type SupportedTransformationTypes = string
export const SupportedTransformationTypes = Schema.String
export type TLSVersion = number
export const TLSVersion = Schema.Number.annotate({ "format": "uint16" }).check(Schema.isInt())
export type TagsDTO = { readonly "count"?: number, readonly "tag"?: string }
export const TagsDTO = Schema.Struct({ "count": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "tag": Schema.optionalKey(Schema.String) }).annotate({ "title": "TagsDTO is the frontend DTO for Tag." })
export type TeamGroupDTO = { readonly "groupId"?: string, readonly "orgId"?: number, readonly "teamId"?: number, readonly "teamUid"?: string, readonly "uid"?: string }
export const TeamGroupDTO = Schema.Struct({ "groupId": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "teamId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "teamUid": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String.annotate({ "description": "Deprecated: always empty; no per-entry id." })) })
export type TeamLBACRule = { readonly "rules"?: ReadonlyArray<string>, readonly "teamId"?: string, readonly "teamUid"?: string }
export const TeamLBACRule = Schema.Struct({ "rules": Schema.optionalKey(Schema.Array(Schema.String)), "teamId": Schema.optionalKey(Schema.String), "teamUid": Schema.optionalKey(Schema.String) })
export type TempUserStatus = string
export const TempUserStatus = Schema.String
export type TestTemplatesErrorResult = { readonly "kind"?: "invalid_template" | "execution_error", readonly "message"?: string, readonly "name"?: string }
export const TestTemplatesErrorResult = Schema.Struct({ "kind": Schema.optionalKey(Schema.Literals(["invalid_template", "execution_error"]).annotate({ "description": "Kind of template error that occurred." })), "message": Schema.optionalKey(Schema.String.annotate({ "description": "Error message." })), "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name of the associated template for this error. Will be empty if the Kind is \"invalid_template\"." })) })
export type TestTemplatesResult = { readonly "name"?: string, readonly "scope"?: "." | ".Alerts" | ".Alert", readonly "text"?: string }
export const TestTemplatesResult = Schema.Struct({ "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name of the associated template definition for this result." })), "scope": Schema.optionalKey(Schema.Literals([".", ".Alerts", ".Alert"]).annotate({ "description": "Scope that was successfully used to interpolate the template. If the root scope \".\" fails, more specific\nscopes will be tried, such as \".Alerts', or \".Alert\"." })), "text": Schema.optionalKey(Schema.String.annotate({ "description": "Interpolated value of the template." })) })
export type ThresholdsMode = string
export const ThresholdsMode = Schema.String.annotate({ "description": "ThresholdsMode absolute or percentage" })
export type TimeIntervalTimeRange = { readonly "end_time"?: string, readonly "start_time"?: string }
export const TimeIntervalTimeRange = Schema.Struct({ "end_time": Schema.optionalKey(Schema.String), "start_time": Schema.optionalKey(Schema.String) })
export type TimeRange = { readonly "from"?: string, readonly "to"?: string }
export const TimeRange = Schema.Struct({ "from": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "to": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }).annotate({ "description": "Redefining this to avoid an import cycle" })
export type TokenDTO = { readonly "created"?: string, readonly "expiration"?: string, readonly "hasExpired"?: boolean, readonly "id"?: number, readonly "isRevoked"?: boolean, readonly "lastUsedAt"?: string, readonly "name"?: string, readonly "secondsUntilExpiration"?: number }
export const TokenDTO = Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "examples": ["2022-03-23T10:31:02Z"], "format": "date-time" })), "expiration": Schema.optionalKey(Schema.String.annotate({ "examples": ["2022-03-23T10:31:02Z"], "format": "date-time" })), "hasExpired": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "id": Schema.optionalKey(Schema.Number.annotate({ "examples": [1], "format": "int64" }).check(Schema.isInt())), "isRevoked": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "lastUsedAt": Schema.optionalKey(Schema.String.annotate({ "examples": ["2022-03-23T10:31:02Z"], "format": "date-time" })), "name": Schema.optionalKey(Schema.String.annotate({ "examples": ["grafana"] })), "secondsUntilExpiration": Schema.optionalKey(Schema.Number.annotate({ "examples": [0], "format": "double" }).check(Schema.isFinite())) })
export type TokenStatus = number
export const TokenStatus = Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())
export type Transformation = { readonly "expression"?: string, readonly "field"?: string, readonly "mapValue"?: string, readonly "type"?: "regex" | "logfmt" }
export const Transformation = Schema.Struct({ "expression": Schema.optionalKey(Schema.String), "field": Schema.optionalKey(Schema.String), "mapValue": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.Literals(["regex", "logfmt"])) })
export type Type = string
export const Type = Schema.String.annotate({ "description": "+enum" })
export type URL = string
export const URL = Schema.String.annotate({ "format": "url" })
export type Unstructured = { readonly "Object"?: { readonly [x: string]: Schema.Json } }
export const Unstructured = Schema.Struct({ "Object": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json).annotate({ "description": "Object is a JSON compatible map with string, float, int, bool, []any,\nor map[string]any children." })) }).annotate({ "description": "Unstructured allows objects that do not have Golang structs registered to be manipulated\ngenerically." })
export type UserInfo = { readonly "name"?: string, readonly "uid"?: string }
export const UserInfo = Schema.Struct({ "name": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }).annotate({ "title": "UserInfo represents user-related information, including a unique identifier and a name." })
export type UserLookupDTO = { readonly "avatarUrl"?: string, readonly "login"?: string, readonly "uid"?: string, readonly "userId"?: number }
export const UserLookupDTO = Schema.Struct({ "avatarUrl": Schema.optionalKey(Schema.String), "login": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type UserOrgDTO = { readonly "name"?: string, readonly "orgId"?: number, readonly "role"?: "None" | "Viewer" | "Editor" | "Admin" }
export const UserOrgDTO = Schema.Struct({ "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "role": Schema.optionalKey(Schema.Literals(["None", "Viewer", "Editor", "Admin"])) })
export type UserProfileDTO = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "authLabels"?: ReadonlyArray<string> | null, readonly "avatarUrl"?: string, readonly "createdAt"?: string, readonly "email"?: string, readonly "id"?: number, readonly "isDisabled"?: boolean, readonly "isExternal"?: boolean, readonly "isExternallySynced"?: boolean, readonly "isGrafanaAdmin"?: boolean, readonly "isGrafanaAdminExternallySynced"?: boolean, readonly "isProvisioned"?: boolean, readonly "login"?: string, readonly "name"?: string, readonly "orgId"?: number, readonly "theme"?: string, readonly "uid"?: string, readonly "updatedAt"?: string }
export const UserProfileDTO = Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "authLabels": Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])), "avatarUrl": Schema.optionalKey(Schema.String), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "isDisabled": Schema.optionalKey(Schema.Boolean), "isExternal": Schema.optionalKey(Schema.Boolean), "isExternallySynced": Schema.optionalKey(Schema.Boolean), "isGrafanaAdmin": Schema.optionalKey(Schema.Boolean), "isGrafanaAdminExternallySynced": Schema.optionalKey(Schema.Boolean), "isProvisioned": Schema.optionalKey(Schema.Boolean), "login": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "theme": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) })
export type UserSearchHitDTO = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "authLabels"?: ReadonlyArray<string>, readonly "avatarUrl"?: string, readonly "created"?: string, readonly "email"?: string, readonly "id"?: number, readonly "isAdmin"?: boolean, readonly "isDisabled"?: boolean, readonly "isProvisioned"?: boolean, readonly "lastSeenAt"?: string, readonly "lastSeenAtAge"?: string, readonly "login"?: string, readonly "name"?: string, readonly "role"?: string, readonly "uid"?: string }
export const UserSearchHitDTO = Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "authLabels": Schema.optionalKey(Schema.Array(Schema.String)), "avatarUrl": Schema.optionalKey(Schema.String), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "isAdmin": Schema.optionalKey(Schema.Boolean), "isDisabled": Schema.optionalKey(Schema.Boolean), "isProvisioned": Schema.optionalKey(Schema.Boolean), "lastSeenAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "lastSeenAtAge": Schema.optionalKey(Schema.String), "login": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "role": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) })
export type UserToken = { readonly "AuthToken"?: string, readonly "AuthTokenSeen"?: boolean, readonly "ClientIp"?: string, readonly "CreatedAt"?: number, readonly "ExternalSessionId"?: number, readonly "Id"?: number, readonly "PrevAuthToken"?: string, readonly "RevokedAt"?: number, readonly "RotatedAt"?: number, readonly "SeenAt"?: number, readonly "UnhashedToken"?: string, readonly "UpdatedAt"?: number, readonly "UserAgent"?: string, readonly "UserId"?: number }
export const UserToken = Schema.Struct({ "AuthToken": Schema.optionalKey(Schema.String), "AuthTokenSeen": Schema.optionalKey(Schema.Boolean), "ClientIp": Schema.optionalKey(Schema.String), "CreatedAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "ExternalSessionId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "Id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "PrevAuthToken": Schema.optionalKey(Schema.String), "RevokedAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "RotatedAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "SeenAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "UnhashedToken": Schema.optionalKey(Schema.String), "UpdatedAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "UserAgent": Schema.optionalKey(Schema.String), "UserId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) }).annotate({ "description": "UserToken represents a user token" })
export type ValueMapping = {  }
export const ValueMapping = Schema.Struct({  }).annotate({ "description": "ValueMapping allows mapping input values to text and color" })
export type VisType = string
export const VisType = Schema.String.annotate({ "title": "VisType is used to indicate how the data should be visualized in explore." })
export type AlertStatus = { readonly "inhibitedBy": ReadonlyArray<string>, readonly "silencedBy": ReadonlyArray<string>, readonly "state": "[unprocessed active suppressed]" }
export const AlertStatus = Schema.Struct({ "inhibitedBy": Schema.Array(Schema.String).annotate({ "description": "inhibited by" }), "silencedBy": Schema.Array(Schema.String).annotate({ "description": "silenced by" }), "state": Schema.Literal("[unprocessed active suppressed]").annotate({ "description": "state" }) }).annotate({ "description": "AlertStatus alert status" })
export type AlertmanagerConfig = { readonly "original": string }
export const AlertmanagerConfig = Schema.Struct({ "original": Schema.String.annotate({ "description": "original" }) }).annotate({ "description": "AlertmanagerConfig alertmanager config" })
export type DeviceDTO = { readonly "avatarUrl"?: string, readonly "clientIp"?: string, readonly "createdAt"?: string, readonly "deviceId"?: string, readonly "lastSeenAt"?: string, readonly "updatedAt"?: string, readonly "userAgent"?: string }
export const DeviceDTO = Schema.Struct({ "avatarUrl": Schema.optionalKey(Schema.String), "clientIp": Schema.optionalKey(Schema.String), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "deviceId": Schema.optionalKey(Schema.String), "lastSeenAt": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "userAgent": Schema.optionalKey(Schema.String) })
export type HealthResponse = { readonly "apiserver"?: string, readonly "commit"?: string, readonly "database"?: string, readonly "enterpriseCommit"?: string, readonly "version"?: string }
export const HealthResponse = Schema.Struct({ "apiserver": Schema.optionalKey(Schema.String), "commit": Schema.optionalKey(Schema.String), "database": Schema.optionalKey(Schema.String), "enterpriseCommit": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.String) })
export type LabelSet = { readonly [x: string]: string }
export const LabelSet = Schema.Record(Schema.String, Schema.String).annotate({ "description": "LabelSet label set" })
export type Matcher = { readonly "isEqual"?: boolean, readonly "isRegex": boolean, readonly "name": string, readonly "value": string }
export const Matcher = Schema.Struct({ "isEqual": Schema.optionalKey(Schema.Boolean.annotate({ "description": "is equal" })), "isRegex": Schema.Boolean.annotate({ "description": "is regex" }), "name": Schema.String.annotate({ "description": "name" }), "value": Schema.String.annotate({ "description": "value" }) }).annotate({ "description": "Matcher matcher" })
export type PeerStatus = { readonly "address": string, readonly "name": string }
export const PeerStatus = Schema.Struct({ "address": Schema.String.annotate({ "description": "address" }), "name": Schema.String.annotate({ "description": "name" }) }).annotate({ "description": "PeerStatus peer status" })
export type PublicError1 = { readonly "extra"?: { readonly [x: string]: Schema.Json }, readonly "message"?: string, readonly "messageId": string, readonly "statusCode": number }
export const PublicError1 = Schema.Struct({ "extra": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json).annotate({ "description": "Extra Additional information about the error" })), "message": Schema.optionalKey(Schema.String.annotate({ "description": "Message A human readable message" })), "messageId": Schema.String.annotate({ "description": "MessageID A unique identifier for the error" }), "statusCode": Schema.Number.annotate({ "description": "StatusCode The HTTP status code returned", "format": "int64" }).check(Schema.isInt()) }).annotate({ "description": "PublicError is derived from Error and only contains information\navailable to the end user." })
export type Receiver = { readonly "name": string }
export const Receiver = Schema.Struct({ "name": Schema.String.annotate({ "description": "name" }) }).annotate({ "description": "Receiver receiver" })
export type ResourcePermissionDTO = { readonly "actions"?: ReadonlyArray<string>, readonly "builtInRole"?: string, readonly "id"?: number, readonly "isInherited"?: boolean, readonly "isManaged"?: boolean, readonly "isServiceAccount"?: boolean, readonly "permission"?: string, readonly "roleName"?: string, readonly "team"?: string, readonly "teamAvatarUrl"?: string, readonly "teamId"?: number, readonly "teamUid"?: string, readonly "userAvatarUrl"?: string, readonly "userId"?: number, readonly "userLogin"?: string, readonly "userUid"?: string }
export const ResourcePermissionDTO = Schema.Struct({ "actions": Schema.optionalKey(Schema.Array(Schema.String)), "builtInRole": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "isInherited": Schema.optionalKey(Schema.Boolean), "isManaged": Schema.optionalKey(Schema.Boolean), "isServiceAccount": Schema.optionalKey(Schema.Boolean), "permission": Schema.optionalKey(Schema.String), "roleName": Schema.optionalKey(Schema.String), "team": Schema.optionalKey(Schema.String), "teamAvatarUrl": Schema.optionalKey(Schema.String), "teamId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "teamUid": Schema.optionalKey(Schema.String), "userAvatarUrl": Schema.optionalKey(Schema.String), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "userLogin": Schema.optionalKey(Schema.String), "userUid": Schema.optionalKey(Schema.String) })
export type SilenceStatus = { readonly "state": "[expired active pending]" }
export const SilenceStatus = Schema.Struct({ "state": Schema.Literal("[expired active pending]").annotate({ "description": "state" }) }).annotate({ "description": "SilenceStatus silence status" })
export type VersionInfo = { readonly "branch": string, readonly "buildDate": string, readonly "buildUser": string, readonly "goVersion": string, readonly "revision": string, readonly "version": string }
export const VersionInfo = Schema.Struct({ "branch": Schema.String.annotate({ "description": "branch" }), "buildDate": Schema.String.annotate({ "description": "build date" }), "buildUser": Schema.String.annotate({ "description": "build user" }), "goVersion": Schema.String.annotate({ "description": "go version" }), "revision": Schema.String.annotate({ "description": "revision" }), "version": Schema.String.annotate({ "description": "version" }) }).annotate({ "description": "VersionInfo version info" })
export type OrgDetailsDTO = { readonly "address"?: Address, readonly "id"?: number, readonly "name"?: string }
export const OrgDetailsDTO = Schema.Struct({ "address": Schema.optionalKey(Address), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "name": Schema.optionalKey(Schema.String) })
export type AlertManagersResult = { readonly "activeAlertManagers"?: ReadonlyArray<AlertManager>, readonly "droppedAlertManagers"?: ReadonlyArray<AlertManager> }
export const AlertManagersResult = Schema.Struct({ "activeAlertManagers": Schema.optionalKey(Schema.Array(AlertManager)), "droppedAlertManagers": Schema.optionalKey(Schema.Array(AlertManager)) }).annotate({ "title": "AlertManagersResult contains the result from querying the alertmanagers endpoint." })
export type AlertRuleMetadata = { readonly "editor_settings"?: AlertRuleEditorSettings }
export const AlertRuleMetadata = Schema.Struct({ "editor_settings": Schema.optionalKey(AlertRuleEditorSettings) })
export type AnnotationPermission = { readonly "dashboard"?: AnnotationActions }
export const AnnotationPermission = Schema.Struct({ "dashboard": Schema.optionalKey(AnnotationActions) }).annotate({ "description": "+k8s:deepcopy-gen=true" })
export type Description = { readonly "assignments"?: Assignments, readonly "permissions"?: ReadonlyArray<string> }
export const Description = Schema.Struct({ "assignments": Schema.optionalKey(Assignments), "permissions": Schema.optionalKey(Schema.Array(Schema.String)) })
export type CloudMigrationSessionListResponseDTO = { readonly "sessions"?: ReadonlyArray<CloudMigrationSessionResponseDTO> }
export const CloudMigrationSessionListResponseDTO = Schema.Struct({ "sessions": Schema.optionalKey(Schema.Array(CloudMigrationSessionResponseDTO)) })
export type Threshold = { readonly "color"?: string, readonly "state"?: string, readonly "value"?: ConfFloat64 }
export const Threshold = Schema.Struct({ "color": Schema.optionalKey(Schema.String), "state": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(ConfFloat64) }).annotate({ "description": "Threshold a single step on the threshold list" })
export type AnnotationQuery = { readonly "builtIn"?: number, readonly "datasource"?: DataSourceRef, readonly "enable"?: boolean, readonly "filter"?: AnnotationPanelFilter, readonly "hide"?: boolean, readonly "iconColor"?: string, readonly "name"?: string, readonly "placement"?: string, readonly "target"?: AnnotationTarget, readonly "type"?: string }
export const AnnotationQuery = Schema.Struct({ "builtIn": Schema.optionalKey(Schema.Number.annotate({ "description": "Set to 1 for the standard annotation query all dashboards have by default.", "format": "double" }).check(Schema.isFinite())), "datasource": Schema.optionalKey(DataSourceRef), "enable": Schema.optionalKey(Schema.Boolean.annotate({ "description": "When enabled the annotation query is issued with every dashboard refresh" })), "filter": Schema.optionalKey(AnnotationPanelFilter), "hide": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Annotation queries can be toggled on or off at the top of the dashboard.\nWhen hide is true, the toggle is not shown in the dashboard." })), "iconColor": Schema.optionalKey(Schema.String.annotate({ "description": "Color to use for the annotation event markers" })), "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name of annotation." })), "placement": Schema.optionalKey(Schema.String.annotate({ "description": "Placement can be used to display the annotation query somewhere else on the dashboard other than the default location." })), "target": Schema.optionalKey(AnnotationTarget), "type": Schema.optionalKey(Schema.String.annotate({ "description": "TODO -- this should not exist here, it is based on the --grafana-- datasource" })) }).annotate({ "description": "TODO docs\nFROM: AnnotationQuery in grafana-data/src/types/annotations.ts" })
export type SearchDeviceQueryResult = { readonly "devices"?: ReadonlyArray<DeviceSearchHitDTO>, readonly "page"?: number, readonly "perPage"?: number, readonly "totalCount"?: number }
export const SearchDeviceQueryResult = Schema.Struct({ "devices": Schema.optionalKey(Schema.Array(DeviceSearchHitDTO)), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type RelativeTimeRange = { readonly "from"?: Duration, readonly "to"?: Duration }
export const RelativeTimeRange = Schema.Struct({ "from": Schema.optionalKey(Duration), "to": Schema.optionalKey(Duration) }).annotate({ "description": "RelativeTimeRange is the per query start and end time\nfor requests." })
export type FieldTypeConfig = { readonly "enum"?: EnumFieldConfig }
export const FieldTypeConfig = Schema.Struct({ "enum": Schema.optionalKey(EnumFieldConfig) }).annotate({ "description": "FieldTypeConfig has type specific configs, only one should be active at a time" })
export type SyncResult = { readonly "Elapsed"?: Duration, readonly "FailedUsers"?: ReadonlyArray<FailedUser>, readonly "MissingUserIds"?: ReadonlyArray<number>, readonly "Started"?: string, readonly "UpdatedUserIds"?: ReadonlyArray<number> }
export const SyncResult = Schema.Struct({ "Elapsed": Schema.optionalKey(Duration), "FailedUsers": Schema.optionalKey(Schema.Array(FailedUser)), "MissingUserIds": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))), "Started": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "UpdatedUserIds": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))) }).annotate({ "title": "SyncResult holds the result of a sync with LDAP. This gives us information on which users were updated and how." })
export type Hit = { readonly "description"?: string, readonly "folderId"?: number, readonly "folderTitle"?: string, readonly "folderUid"?: string, readonly "folderUrl"?: string, readonly "id"?: number, readonly "isDeleted"?: boolean, readonly "isStarred"?: boolean, readonly "orgId"?: number, readonly "permanentlyDeleteDate"?: string, readonly "slug"?: string, readonly "sortMeta"?: number, readonly "sortMetaName"?: string, readonly "tags"?: ReadonlyArray<string>, readonly "title"?: string, readonly "type"?: HitType, readonly "uid"?: string, readonly "uri"?: string, readonly "url"?: string }
export const Hit = Schema.Struct({ "description": Schema.optionalKey(Schema.String), "folderId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "folderTitle": Schema.optionalKey(Schema.String), "folderUid": Schema.optionalKey(Schema.String), "folderUrl": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "isDeleted": Schema.optionalKey(Schema.Boolean), "isStarred": Schema.optionalKey(Schema.Boolean), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "permanentlyDeleteDate": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "slug": Schema.optionalKey(Schema.String), "sortMeta": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "sortMetaName": Schema.optionalKey(Schema.String), "tags": Schema.optionalKey(Schema.Array(Schema.String)), "title": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(HitType), "uid": Schema.optionalKey(Schema.String), "uri": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String) })
export type IPNet = { readonly "IP"?: string, readonly "Mask"?: IPMask }
export const IPNet = Schema.Struct({ "IP": Schema.optionalKey(Schema.String), "Mask": Schema.optionalKey(IPMask) }).annotate({ "title": "An IPNet represents an IP network." })
export type Annotation = { readonly "alertId"?: number, readonly "alertName"?: string, readonly "avatarUrl"?: string, readonly "created"?: number, readonly "dashboardId"?: number, readonly "dashboardUID"?: string, readonly "data"?: Json, readonly "email"?: string, readonly "id"?: number, readonly "login"?: string, readonly "newState"?: string, readonly "panelId"?: number, readonly "prevState"?: string, readonly "tags"?: ReadonlyArray<string>, readonly "text"?: string, readonly "time"?: number, readonly "timeEnd"?: number, readonly "updated"?: number, readonly "userId"?: number, readonly "userUID"?: string }
export const Annotation = Schema.Struct({ "alertId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "alertName": Schema.optionalKey(Schema.String), "avatarUrl": Schema.optionalKey(Schema.String), "created": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "dashboardId": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: Use DashboardUID and OrgID instead", "format": "int64" }).check(Schema.isInt())), "dashboardUID": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Json), "email": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "login": Schema.optionalKey(Schema.String), "newState": Schema.optionalKey(Schema.String), "panelId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "prevState": Schema.optionalKey(Schema.String), "tags": Schema.optionalKey(Schema.Array(Schema.String)), "text": Schema.optionalKey(Schema.String), "time": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "timeEnd": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "updated": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "userUID": Schema.optionalKey(Schema.String) })
export type DashboardVersionMeta = { readonly "created"?: string, readonly "createdBy"?: string, readonly "dashboardId"?: number, readonly "data"?: Json, readonly "id"?: number, readonly "message"?: string, readonly "parentVersion"?: number, readonly "restoredFrom"?: number, readonly "uid"?: string, readonly "version"?: number }
export const DashboardVersionMeta = Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "dashboardId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "data": Schema.optionalKey(Json), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "message": Schema.optionalKey(Schema.String), "parentVersion": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "restoredFrom": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "uid": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) }).annotate({ "description": "DashboardVersionMeta extends the DashboardVersionDTO with the names\nassociated with the UserIds, overriding the field with the same name from\nthe DashboardVersionDTO model." })
export type DataSourceListItemDTO = { readonly "access"?: DsAccess, readonly "basicAuth"?: boolean, readonly "database"?: string, readonly "id"?: number, readonly "isDefault"?: boolean, readonly "jsonData"?: Json, readonly "name"?: string, readonly "orgId"?: number, readonly "readOnly"?: boolean, readonly "type"?: string, readonly "typeLogoUrl"?: string, readonly "typeName"?: string, readonly "uid"?: string, readonly "url"?: string, readonly "user"?: string }
export const DataSourceListItemDTO = Schema.Struct({ "access": Schema.optionalKey(DsAccess), "basicAuth": Schema.optionalKey(Schema.Boolean), "database": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "isDefault": Schema.optionalKey(Schema.Boolean), "jsonData": Schema.optionalKey(Json), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "readOnly": Schema.optionalKey(Schema.Boolean), "type": Schema.optionalKey(Schema.String), "typeLogoUrl": Schema.optionalKey(Schema.String), "typeName": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "user": Schema.optionalKey(Schema.String) })
export type EmbeddedContactPoint = { readonly "disableResolveMessage"?: boolean, readonly "name"?: string, readonly "provenance"?: string, readonly "settings": Json, readonly "type": "alertmanager" | "dingding" | "discord" | "email" | "googlechat" | "kafka" | "line" | "opsgenie" | "pagerduty" | "pushover" | "sensugo" | "slack" | "teams" | "telegram" | "threema" | "victorops" | "webhook" | "wecom", readonly "uid"?: string }
export const EmbeddedContactPoint = Schema.Struct({ "disableResolveMessage": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name is used as grouping key in the UI. Contact points with the\nsame name will be grouped in the UI.", "examples": ["webhook_1"] })), "provenance": Schema.optionalKey(Schema.String.annotate({ "readOnly": true })), "settings": Json, "type": Schema.Literals(["alertmanager", "dingding", "discord", "email", "googlechat", "kafka", "line", "opsgenie", "pagerduty", "pushover", "sensugo", "slack", "teams", "telegram", "threema", "victorops", "webhook", "wecom"]).annotate({ "examples": ["webhook"] }), "uid": Schema.optionalKey(Schema.String.annotate({ "description": "UID is the unique identifier of the contact point. The UID can be\nset by the user.", "examples": ["my_external_reference"] }).check(Schema.isMinLength(1)).check(Schema.isMaxLength(40)).check(Schema.isPattern(new RegExp("^[a-zA-Z0-9\\-\\_]+$")))) }).annotate({ "description": "EmbeddedContactPoint is the contact point type that is used\nby grafanas embedded alertmanager implementation." })
export type MetricRequest = { readonly "debug"?: boolean, readonly "from": string, readonly "queries": ReadonlyArray<Json>, readonly "to": string }
export const MetricRequest = Schema.Struct({ "debug": Schema.optionalKey(Schema.Boolean), "from": Schema.String.annotate({ "description": "From Start time in epoch timestamps in milliseconds or relative using Grafana time units.", "examples": ["now-1h"] }), "queries": Schema.Array(Json).annotate({ "description": "queries.refId – Specifies an identifier of the query. Is optional and default to “A”.\nqueries.datasourceId – Specifies the data source to be queried. Each query in the request must have an unique datasourceId.\nqueries.maxDataPoints - Species maximum amount of data points that dashboard panel can render. Is optional and default to 100.\nqueries.intervalMs - Specifies the time interval in milliseconds of time series. Is optional and defaults to 1000.", "examples": [[{"datasource":{"uid":"PD8C576611E62080A"},"format":"table","intervalMs":86400000,"maxDataPoints":1092,"rawSql":"SELECT 1 as valueOne, 2 as valueTwo","refId":"A"}]] }), "to": Schema.String.annotate({ "description": "To End time in epoch timestamps in milliseconds or relative using Grafana time units.", "examples": ["now"] }) })
export type QueryHistoryDTO = { readonly "comment"?: string, readonly "createdAt"?: number, readonly "createdBy"?: number, readonly "datasourceUid"?: string, readonly "queries"?: Json, readonly "starred"?: boolean, readonly "uid"?: string }
export const QueryHistoryDTO = Schema.Struct({ "comment": Schema.optionalKey(Schema.String), "createdAt": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "createdBy": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "datasourceUid": Schema.optionalKey(Schema.String), "queries": Schema.optionalKey(Json), "starred": Schema.optionalKey(Schema.Boolean), "uid": Schema.optionalKey(Schema.String) })
export type Labels = ReadonlyArray<Label>
export const Labels = Schema.Array(Label).annotate({ "description": "Labels is a sorted set of labels. Order has to be guaranteed upon\ninstantiation." })
export type LibraryElementConnectionDTO = { readonly "connectionId"?: number, readonly "connectionUid"?: string, readonly "created"?: string, readonly "createdBy"?: LibraryElementDTOMetaUser, readonly "elementId"?: number, readonly "id"?: number, readonly "kind"?: number }
export const LibraryElementConnectionDTO = Schema.Struct({ "connectionId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "connectionUid": Schema.optionalKey(Schema.String), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(LibraryElementDTOMetaUser), "elementId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "id": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: this field will be removed in the future", "format": "int64" }).check(Schema.isInt())), "kind": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) }).annotate({ "title": "LibraryElementConnectionDTO is the frontend DTO for element connections." })
export type LibraryElementDTOMeta = { readonly "connectedDashboards"?: number, readonly "created"?: string, readonly "createdBy"?: LibraryElementDTOMetaUser, readonly "folderName"?: string, readonly "folderUid"?: string, readonly "updated"?: string, readonly "updatedBy"?: LibraryElementDTOMetaUser }
export const LibraryElementDTOMeta = Schema.Struct({ "connectedDashboards": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(LibraryElementDTOMetaUser), "folderName": Schema.optionalKey(Schema.String), "folderUid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(LibraryElementDTOMetaUser) }).annotate({ "title": "LibraryElementDTOMeta is the meta information for LibraryElementDTO." })
export type FolderSearchHit = { readonly "id"?: number, readonly "managedBy"?: ManagerKind, readonly "parentUid"?: string, readonly "title"?: string, readonly "uid"?: string }
export const FolderSearchHit = Schema.Struct({ "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "managedBy": Schema.optionalKey(ManagerKind), "parentUid": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) })
export type Matcher1 = { readonly "Name"?: string, readonly "Type"?: MatchType, readonly "Value"?: string }
export const Matcher1 = Schema.Struct({ "Name": Schema.optionalKey(Schema.String), "Type": Schema.optionalKey(MatchType), "Value": Schema.optionalKey(Schema.String) }).annotate({ "title": "Matcher models the matching of a label." })
export type DataSource = { readonly "access"?: DsAccess, readonly "accessControl"?: Metadata, readonly "basicAuth"?: boolean, readonly "basicAuthUser"?: string, readonly "database"?: string, readonly "id"?: number, readonly "isDefault"?: boolean, readonly "jsonData"?: Json, readonly "name"?: string, readonly "orgId"?: number, readonly "readOnly"?: boolean, readonly "secureJsonFields"?: { readonly [x: string]: boolean }, readonly "type"?: string, readonly "typeLogoUrl"?: string, readonly "uid"?: string, readonly "url"?: string, readonly "user"?: string, readonly "version"?: number, readonly "withCredentials"?: boolean }
export const DataSource = Schema.Struct({ "access": Schema.optionalKey(DsAccess), "accessControl": Schema.optionalKey(Metadata), "basicAuth": Schema.optionalKey(Schema.Boolean), "basicAuthUser": Schema.optionalKey(Schema.String), "database": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "isDefault": Schema.optionalKey(Schema.Boolean), "jsonData": Schema.optionalKey(Json), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "readOnly": Schema.optionalKey(Schema.Boolean), "secureJsonFields": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "type": Schema.optionalKey(Schema.String), "typeLogoUrl": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "user": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "withCredentials": Schema.optionalKey(Schema.Boolean) })
export type MuteTimings = ReadonlyArray<MuteTimeInterval>
export const MuteTimings = Schema.Array(MuteTimeInterval)
export type Notice = { readonly "inspect"?: InspectType, readonly "link"?: string, readonly "severity"?: NoticeSeverity, readonly "text"?: string }
export const Notice = Schema.Struct({ "inspect": Schema.optionalKey(InspectType), "link": Schema.optionalKey(Schema.String.annotate({ "description": "Link is an optional link for display in the user interface and can be an\nabsolute URL or a path relative to Grafana's root url." })), "severity": Schema.optionalKey(NoticeSeverity), "text": Schema.optionalKey(Schema.String.annotate({ "description": "Text is freeform descriptive text for the notice." })) }).annotate({ "title": "Notice provides a structure for presenting notifications in Grafana's user interface." })
export type AttributeTypeAndValue = { readonly "Type"?: ObjectIdentifier, readonly "Value"?: Schema.Json }
export const AttributeTypeAndValue = Schema.Struct({ "Type": Schema.optionalKey(ObjectIdentifier), "Value": Schema.optionalKey(Schema.Json) }).annotate({ "description": "AttributeTypeAndValue mirrors the ASN.1 structure of the same name in\nRFC 5280, Section 4.1.2.4." })
export type Extension = { readonly "Critical"?: boolean, readonly "Id"?: ObjectIdentifier, readonly "Value"?: ReadonlyArray<number> }
export const Extension = Schema.Struct({ "Critical": Schema.optionalKey(Schema.Boolean), "Id": Schema.optionalKey(ObjectIdentifier), "Value": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))) }).annotate({ "description": "Extension represents the ASN.1 structure of the same name. See RFC\n5280, section 4.2." })
export type ObjectMatchers = ReadonlyArray<ObjectMatcher>
export const ObjectMatchers = Schema.Array(ObjectMatcher).annotate({ "title": "ObjectMatchers is a list of matchers that can be used to filter alerts." })
export type SearchOrgUsersQueryResult = { readonly "orgUsers"?: ReadonlyArray<OrgUserDTO>, readonly "page"?: number, readonly "perPage"?: number, readonly "totalCount"?: number }
export const SearchOrgUsersQueryResult = Schema.Struct({ "orgUsers": Schema.optionalKey(Schema.Array(OrgUserDTO)), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type RoleDTO = { readonly "created": string, readonly "delegatable"?: boolean, readonly "description": string, readonly "displayName": string, readonly "global"?: boolean, readonly "group": string, readonly "hidden"?: boolean, readonly "mapped"?: boolean, readonly "name": string, readonly "permissions"?: ReadonlyArray<Permission>, readonly "uid": string, readonly "updated": string, readonly "version": number }
export const RoleDTO = Schema.Struct({ "created": Schema.String.annotate({ "format": "date-time" }), "delegatable": Schema.optionalKey(Schema.Boolean), "description": Schema.String, "displayName": Schema.String, "global": Schema.optionalKey(Schema.Boolean), "group": Schema.String, "hidden": Schema.optionalKey(Schema.Boolean), "mapped": Schema.optionalKey(Schema.Boolean), "name": Schema.String, "permissions": Schema.optionalKey(Schema.Array(Permission)), "uid": Schema.String, "updated": Schema.String.annotate({ "format": "date-time" }), "version": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()) })
export type DashboardACLInfoDTO = { readonly "created"?: string, readonly "dashboardId"?: number, readonly "folderId"?: number, readonly "folderUid"?: string, readonly "inherited"?: boolean, readonly "isFolder"?: boolean, readonly "permission"?: PermissionType, readonly "permissionName"?: string, readonly "role"?: "None" | "Viewer" | "Editor" | "Admin", readonly "slug"?: string, readonly "team"?: string, readonly "teamAvatarUrl"?: string, readonly "teamEmail"?: string, readonly "teamId"?: number, readonly "teamUid"?: string, readonly "title"?: string, readonly "uid"?: string, readonly "updated"?: string, readonly "url"?: string, readonly "userAvatarUrl"?: string, readonly "userEmail"?: string, readonly "userId"?: number, readonly "userLogin"?: string, readonly "userUid"?: string }
export const DashboardACLInfoDTO = Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "dashboardId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "folderId": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: use FolderUID instead", "format": "int64" }).check(Schema.isInt())), "folderUid": Schema.optionalKey(Schema.String), "inherited": Schema.optionalKey(Schema.Boolean), "isFolder": Schema.optionalKey(Schema.Boolean), "permission": Schema.optionalKey(PermissionType), "permissionName": Schema.optionalKey(Schema.String), "role": Schema.optionalKey(Schema.Literals(["None", "Viewer", "Editor", "Admin"])), "slug": Schema.optionalKey(Schema.String), "team": Schema.optionalKey(Schema.String), "teamAvatarUrl": Schema.optionalKey(Schema.String), "teamEmail": Schema.optionalKey(Schema.String), "teamId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "teamUid": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "url": Schema.optionalKey(Schema.String), "userAvatarUrl": Schema.optionalKey(Schema.String), "userEmail": Schema.optionalKey(Schema.String), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "userLogin": Schema.optionalKey(Schema.String), "userUid": Schema.optionalKey(Schema.String) })
export type DashboardACLUpdateItem = { readonly "permission"?: PermissionType, readonly "role"?: "None" | "Viewer" | "Editor" | "Admin", readonly "teamId"?: number, readonly "userId"?: number }
export const DashboardACLUpdateItem = Schema.Struct({ "permission": Schema.optionalKey(PermissionType), "role": Schema.optionalKey(Schema.Literals(["None", "Viewer", "Editor", "Admin"])), "teamId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type TeamDTO = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "avatarUrl"?: string, readonly "email"?: string, readonly "externalUID"?: string, readonly "id": number, readonly "isProvisioned": boolean, readonly "memberCount": number, readonly "name": string, readonly "orgId": number, readonly "permission"?: PermissionType, readonly "uid": string }
export const TeamDTO = Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "avatarUrl": Schema.optionalKey(Schema.String), "email": Schema.optionalKey(Schema.String), "externalUID": Schema.optionalKey(Schema.String), "id": Schema.Number.annotate({ "description": "@deprecated Use UID instead", "format": "int64" }).check(Schema.isInt()), "isProvisioned": Schema.Boolean, "memberCount": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "name": Schema.String, "orgId": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "permission": Schema.optionalKey(PermissionType), "uid": Schema.String })
export type TeamMemberDTO = { readonly "auth_module"?: string, readonly "avatarUrl"?: string, readonly "email"?: string, readonly "labels"?: ReadonlyArray<string>, readonly "login"?: string, readonly "name"?: string, readonly "orgId"?: number, readonly "permission"?: PermissionType, readonly "teamId"?: number, readonly "teamUID"?: string, readonly "uid"?: string, readonly "userId"?: number, readonly "userUID"?: string }
export const TeamMemberDTO = Schema.Struct({ "auth_module": Schema.optionalKey(Schema.String), "avatarUrl": Schema.optionalKey(Schema.String), "email": Schema.optionalKey(Schema.String), "labels": Schema.optionalKey(Schema.Array(Schema.String)), "login": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "permission": Schema.optionalKey(PermissionType), "teamId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "teamUID": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "userUID": Schema.optionalKey(Schema.String) })
export type Playlists = ReadonlyArray<Playlist>
export const Playlists = Schema.Array(Playlist)
export type PlaylistDTO = { readonly "interval"?: string, readonly "items"?: ReadonlyArray<PlaylistItemDTO>, readonly "name"?: string, readonly "uid"?: string }
export const PlaylistDTO = Schema.Struct({ "interval": Schema.optionalKey(Schema.String.annotate({ "description": "Interval sets the time between switching views in a playlist." })), "items": Schema.optionalKey(Schema.Array(PlaylistItemDTO).annotate({ "description": "The ordered list of items that the playlist will iterate over." })), "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name of the playlist." })), "uid": Schema.optionalKey(Schema.String.annotate({ "description": "Unique playlist identifier. Generated on creation, either by the\ncreator of the playlist of by the application." })) })
export type PreferencesSpec = { readonly "homeDashboardUID"?: string, readonly "homeURL"?: string, readonly "language"?: string, readonly "navbar"?: PreferencesNavbarPreference, readonly "queryHistory"?: PreferencesQueryHistoryPreference, readonly "theme"?: string, readonly "timezone"?: string, readonly "weekStart"?: string }
export const PreferencesSpec = Schema.Struct({ "homeDashboardUID": Schema.optionalKey(Schema.String.annotate({ "description": "UID for the home dashboard" })), "homeURL": Schema.optionalKey(Schema.String.annotate({ "description": "Explicit home URL (NOTE: this can only be modified in the system settings)" })), "language": Schema.optionalKey(Schema.String.annotate({ "description": "Selected language" })), "navbar": Schema.optionalKey(PreferencesNavbarPreference), "queryHistory": Schema.optionalKey(PreferencesQueryHistoryPreference), "theme": Schema.optionalKey(Schema.String.annotate({ "description": "user interface theme" })), "timezone": Schema.optionalKey(Schema.String.annotate({ "description": "The timezone selection" })), "weekStart": Schema.optionalKey(Schema.String.annotate({ "description": "day of the week (sunday, monday, etc)" })) }).annotate({ "description": "+k8s:openapi-gen=true" })
export type PrometheusRuleGroup = { readonly "interval"?: Duration, readonly "labels"?: { readonly [x: string]: string }, readonly "limit"?: number, readonly "name"?: string, readonly "query_offset"?: string, readonly "rules"?: ReadonlyArray<PrometheusRule> }
export const PrometheusRuleGroup = Schema.Struct({ "interval": Schema.optionalKey(Duration), "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "name": Schema.optionalKey(Schema.String), "query_offset": Schema.optionalKey(Schema.String), "rules": Schema.optionalKey(Schema.Array(PrometheusRule)) })
export type NotificationTemplate = { readonly "name"?: string, readonly "provenance"?: Provenance, readonly "template"?: string, readonly "version"?: string }
export const NotificationTemplate = Schema.Struct({ "name": Schema.optionalKey(Schema.String), "provenance": Schema.optionalKey(Provenance), "template": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.String) })
export type PublicDashboardListResponseWithPagination = { readonly "page"?: number, readonly "perPage"?: number, readonly "publicDashboards"?: ReadonlyArray<PublicDashboardListResponse>, readonly "totalCount"?: number }
export const PublicDashboardListResponseWithPagination = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "publicDashboards": Schema.optionalKey(Schema.Array(PublicDashboardListResponse)), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type ForbiddenError = { readonly "body"?: PublicError }
export const ForbiddenError = Schema.Struct({ "body": Schema.optionalKey(PublicError) })
export type GettableGrafanaReceiver = { readonly "disableResolveMessage"?: boolean, readonly "name"?: string, readonly "provenance"?: Provenance, readonly "secureFields"?: { readonly [x: string]: boolean }, readonly "settings"?: RawMessage, readonly "type"?: string, readonly "uid"?: string }
export const GettableGrafanaReceiver = Schema.Struct({ "disableResolveMessage": Schema.optionalKey(Schema.Boolean), "name": Schema.optionalKey(Schema.String), "provenance": Schema.optionalKey(Provenance), "secureFields": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean)), "settings": Schema.optionalKey(RawMessage), "type": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) })
export type PostableGrafanaReceiver = { readonly "disableResolveMessage"?: boolean, readonly "name"?: string, readonly "secureSettings"?: { readonly [x: string]: string }, readonly "settings"?: RawMessage, readonly "type"?: string, readonly "uid"?: string }
export const PostableGrafanaReceiver = Schema.Struct({ "disableResolveMessage": Schema.optionalKey(Schema.Boolean), "name": Schema.optionalKey(Schema.String), "secureSettings": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "settings": Schema.optionalKey(RawMessage), "type": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) })
export type ReceiverExport = { readonly "disableResolveMessage"?: boolean, readonly "settings"?: RawMessage, readonly "type"?: string, readonly "uid"?: string }
export const ReceiverExport = Schema.Struct({ "disableResolveMessage": Schema.optionalKey(Schema.Boolean), "settings": Schema.optionalKey(RawMessage), "type": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }).annotate({ "title": "ReceiverExport is the provisioned file export of alerting.ReceiverV1." })
export type AlertQueryExport = { readonly "datasourceUid"?: string, readonly "model"?: { readonly [x: string]: Schema.Json }, readonly "queryType"?: string, readonly "refId"?: string, readonly "relativeTimeRange"?: RelativeTimeRangeExport }
export const AlertQueryExport = Schema.Struct({ "datasourceUid": Schema.optionalKey(Schema.String), "model": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json)), "queryType": Schema.optionalKey(Schema.String), "refId": Schema.optionalKey(Schema.String), "relativeTimeRange": Schema.optionalKey(RelativeTimeRangeExport) }).annotate({ "title": "AlertQueryExport is the provisioned export of models.AlertQuery." })
export type ReportSettings = { readonly "branding"?: ReportBrandingOptions, readonly "embeddedImageTheme"?: string, readonly "footerFontFamily"?: string, readonly "footerItems"?: ReadonlyArray<FooterItem>, readonly "id"?: number, readonly "orgId"?: number, readonly "pdfDashboardTitleEnabled"?: boolean, readonly "pdfHeaderEnabled"?: boolean, readonly "pdfTheme"?: string, readonly "pdfTimeRangeEnabled"?: boolean, readonly "userId"?: number }
export const ReportSettings = Schema.Struct({ "branding": Schema.optionalKey(ReportBrandingOptions), "embeddedImageTheme": Schema.optionalKey(Schema.String), "footerFontFamily": Schema.optionalKey(Schema.String), "footerItems": Schema.optionalKey(Schema.Array(FooterItem)), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "pdfDashboardTitleEnabled": Schema.optionalKey(Schema.Boolean), "pdfHeaderEnabled": Schema.optionalKey(Schema.Boolean), "pdfTheme": Schema.optionalKey(Schema.String), "pdfTimeRangeEnabled": Schema.optionalKey(Schema.Boolean), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type ReportDashboard = { readonly "dashboard"?: ReportDashboardID, readonly "reportVariables"?: {  }, readonly "timeRange"?: ReportTimeRange }
export const ReportDashboard = Schema.Struct({ "dashboard": Schema.optionalKey(ReportDashboardID), "reportVariables": Schema.optionalKey(Schema.Struct({  })), "timeRange": Schema.optionalKey(ReportTimeRange) })
export type ReportOptions = { readonly "csvEncoding"?: string, readonly "layout"?: string, readonly "orientation"?: string, readonly "pdfCombineOneFile"?: boolean, readonly "pdfShowTemplateVariables"?: boolean, readonly "timeRange"?: ReportTimeRange }
export const ReportOptions = Schema.Struct({ "csvEncoding": Schema.optionalKey(Schema.String), "layout": Schema.optionalKey(Schema.String), "orientation": Schema.optionalKey(Schema.String), "pdfCombineOneFile": Schema.optionalKey(Schema.Boolean), "pdfShowTemplateVariables": Schema.optionalKey(Schema.Boolean), "timeRange": Schema.optionalKey(ReportTimeRange) })
export type ResourceDependenciesResponseDTO = { readonly "resourceDependencies"?: ReadonlyArray<ResourceDependencyDTO> }
export const ResourceDependenciesResponseDTO = Schema.Struct({ "resourceDependencies": Schema.optionalKey(Schema.Array(ResourceDependencyDTO)) })
export type Authorization = { readonly "credentials"?: Secret, readonly "credentials_file"?: string, readonly "credentials_ref"?: string, readonly "type"?: string }
export const Authorization = Schema.Struct({ "credentials": Schema.optionalKey(Secret), "credentials_file": Schema.optionalKey(Schema.String), "credentials_ref": Schema.optionalKey(Schema.String.annotate({ "description": "CredentialsRef is the name of the secret within the secret manager to use as credentials." })), "type": Schema.optionalKey(Schema.String) }).annotate({ "title": "Authorization contains HTTP authorization credentials." })
export type BasicAuth = { readonly "password"?: Secret, readonly "password_file"?: string, readonly "password_ref"?: string, readonly "username"?: string, readonly "username_file"?: string, readonly "username_ref"?: string }
export const BasicAuth = Schema.Struct({ "password": Schema.optionalKey(Secret), "password_file": Schema.optionalKey(Schema.String), "password_ref": Schema.optionalKey(Schema.String.annotate({ "description": "PasswordRef is the name of the secret within the secret manager to use as the password." })), "username": Schema.optionalKey(Schema.String), "username_file": Schema.optionalKey(Schema.String), "username_ref": Schema.optionalKey(Schema.String.annotate({ "description": "UsernameRef is the name of the secret within the secret manager to use as the username." })) }).annotate({ "title": "BasicAuth contains basic HTTP authentication credentials." })
export type Header = { readonly "files"?: ReadonlyArray<string>, readonly "secrets"?: ReadonlyArray<Secret>, readonly "values"?: ReadonlyArray<string> }
export const Header = Schema.Struct({ "files": Schema.optionalKey(Schema.Array(Schema.String)), "secrets": Schema.optionalKey(Schema.Array(Secret)), "values": Schema.optionalKey(Schema.Array(Schema.String)) }).annotate({ "title": "Header represents the configuration for a single HTTP header." })
export type ProxyHeader = { readonly [x: string]: ReadonlyArray<Secret> }
export const ProxyHeader = Schema.Record(Schema.String, Schema.Array(Secret))
export type SigV4Config = { readonly "AccessKey"?: string, readonly "Profile"?: string, readonly "Region"?: string, readonly "RoleARN"?: string, readonly "SecretKey"?: Secret }
export const SigV4Config = Schema.Struct({ "AccessKey": Schema.optionalKey(Schema.String), "Profile": Schema.optionalKey(Schema.String), "Region": Schema.optionalKey(Schema.String), "RoleARN": Schema.optionalKey(Schema.String), "SecretKey": Schema.optionalKey(Secret) }).annotate({ "description": "SigV4Config is the configuration for signing remote write requests with\nAWS's SigV4 verification process. Empty values will be retrieved using the\nAWS default credentials chain." })
export type SearchOrgServiceAccountsResult = { readonly "page"?: number, readonly "perPage"?: number, readonly "serviceAccounts"?: ReadonlyArray<ServiceAccountDTO>, readonly "totalCount"?: number }
export const SearchOrgServiceAccountsResult = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "serviceAccounts": Schema.optionalKey(Schema.Array(ServiceAccountDTO)), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "description": "It can be used for pagination of the user list\nE.g. if totalCount is equal to 100 users and\nthe perpage parameter is set to 10 then there are 10 pages of users.", "format": "int64" }).check(Schema.isInt())) }).annotate({ "description": "swagger: model" })
export type PublicDashboard = { readonly "accessToken"?: string, readonly "annotationsEnabled"?: boolean, readonly "createdAt"?: string, readonly "createdBy"?: number, readonly "dashboardUid"?: string, readonly "isEnabled"?: boolean, readonly "recipients"?: ReadonlyArray<EmailDTO>, readonly "share"?: ShareType, readonly "timeSelectionEnabled"?: boolean, readonly "uid"?: string, readonly "updatedAt"?: string, readonly "updatedBy"?: number }
export const PublicDashboard = Schema.Struct({ "accessToken": Schema.optionalKey(Schema.String), "annotationsEnabled": Schema.optionalKey(Schema.Boolean), "createdAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "dashboardUid": Schema.optionalKey(Schema.String), "isEnabled": Schema.optionalKey(Schema.Boolean), "recipients": Schema.optionalKey(Schema.Array(EmailDTO)), "share": Schema.optionalKey(ShareType), "timeSelectionEnabled": Schema.optionalKey(Schema.Boolean), "uid": Schema.optionalKey(Schema.String), "updatedAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type SlackAction = { readonly "confirm"?: SlackConfirmationField, readonly "name"?: string, readonly "style"?: string, readonly "text"?: string, readonly "type"?: string, readonly "url"?: string, readonly "value"?: string }
export const SlackAction = Schema.Struct({ "confirm": Schema.optionalKey(SlackConfirmationField), "name": Schema.optionalKey(Schema.String), "style": Schema.optionalKey(Schema.String), "text": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "value": Schema.optionalKey(Schema.String) }).annotate({ "title": "SlackAction configures a single Slack action that is sent with each notification.", "description": "See https://api.slack.com/docs/message-attachments#action_fields and https://api.slack.com/docs/message-buttons\nfor more information." })
export type SnapshotListResponseDTO = { readonly "snapshots"?: ReadonlyArray<SnapshotDTO> }
export const SnapshotListResponseDTO = Schema.Struct({ "snapshots": Schema.optionalKey(Schema.Array(SnapshotDTO)) })
export type GetSnapshotResponseDTO = { readonly "created"?: string, readonly "finished"?: string, readonly "results"?: ReadonlyArray<MigrateDataResponseItemDTO>, readonly "sessionUid"?: string, readonly "stats"?: SnapshotResourceStats, readonly "status"?: "INITIALIZING" | "CREATING" | "PENDING_UPLOAD" | "UPLOADING" | "PENDING_PROCESSING" | "PROCESSING" | "FINISHED" | "CANCELED" | "ERROR" | "UNKNOWN", readonly "uid"?: string }
export const GetSnapshotResponseDTO = Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "finished": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "results": Schema.optionalKey(Schema.Array(MigrateDataResponseItemDTO)), "sessionUid": Schema.optionalKey(Schema.String), "stats": Schema.optionalKey(SnapshotResourceStats), "status": Schema.optionalKey(Schema.Literals(["INITIALIZING", "CREATING", "PENDING_UPLOAD", "UPLOADING", "PENDING_PROCESSING", "PROCESSING", "FINISHED", "CANCELED", "ERROR", "UNKNOWN"])), "uid": Schema.optionalKey(Schema.String) })
export type FloatHistogram = { readonly "Count"?: number, readonly "CounterResetHint"?: CounterResetHint, readonly "CustomValues"?: ReadonlyArray<number>, readonly "PositiveBuckets"?: ReadonlyArray<number>, readonly "PositiveSpans"?: ReadonlyArray<Span>, readonly "Schema"?: number, readonly "Sum"?: number, readonly "ZeroCount"?: number, readonly "ZeroThreshold"?: number }
export const FloatHistogram = Schema.Struct({ "Count": Schema.optionalKey(Schema.Number.annotate({ "description": "Total number of observations. Must be zero or positive.", "format": "double" }).check(Schema.isFinite())), "CounterResetHint": Schema.optionalKey(CounterResetHint), "CustomValues": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())).annotate({ "description": "Holds the custom (usually upper) bounds for bucket definitions, otherwise nil.\nThis slice is interned, to be treated as immutable and copied by reference.\nThese numbers should be strictly increasing. This field is only used when the\nschema is for custom buckets, and the ZeroThreshold, ZeroCount, NegativeSpans\nand NegativeBuckets fields are not used in that case." })), "PositiveBuckets": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())).annotate({ "description": "Observation counts in buckets. Each represents an absolute count and\nmust be zero or positive." })), "PositiveSpans": Schema.optionalKey(Schema.Array(Span).annotate({ "description": "Spans for positive and negative buckets (see Span below)." })), "Schema": Schema.optionalKey(Schema.Number.annotate({ "description": "Currently valid schema numbers are -4 <= n <= 8 for exponential buckets.\nThey are all for base-2 bucket schemas, where 1 is a bucket boundary in\neach case, and then each power of two is divided into 2^n logarithmic buckets.\nOr in other words, each bucket boundary is the previous boundary times\n2^(2^-n). Another valid schema number is -53 for custom buckets, defined by\nthe CustomValues field.", "format": "int32" }).check(Schema.isInt())), "Sum": Schema.optionalKey(Schema.Number.annotate({ "description": "Sum of observations. This is also used as the stale marker.", "format": "double" }).check(Schema.isFinite())), "ZeroCount": Schema.optionalKey(Schema.Number.annotate({ "description": "Observations falling into the zero bucket. Must be zero or positive.", "format": "double" }).check(Schema.isFinite())), "ZeroThreshold": Schema.optionalKey(Schema.Number.annotate({ "description": "Width of the zero bucket.", "format": "double" }).check(Schema.isFinite())) }).annotate({ "title": "FloatHistogram is similar to Histogram but uses float64 for all\ncounts. Additionally, bucket counts are absolute and not deltas.", "description": "A FloatHistogram is needed by PromQL to handle operations that might result\nin fractional counts. Since the counts in a histogram are unlikely to be too\nlarge to be represented precisely by a float64, a FloatHistogram can also be\nused to represent a histogram with integer counts and thus serves as a more\ngeneralized representation." })
export type LinkTransformationConfig = { readonly "expression"?: string, readonly "field"?: string, readonly "mapValue"?: string, readonly "type"?: SupportedTransformationTypes }
export const LinkTransformationConfig = Schema.Struct({ "expression": Schema.optionalKey(Schema.String), "field": Schema.optionalKey(Schema.String), "mapValue": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(SupportedTransformationTypes) })
export type TLSConfig = { readonly "ca"?: string, readonly "ca_file"?: string, readonly "ca_ref"?: string, readonly "cert"?: string, readonly "cert_file"?: string, readonly "cert_ref"?: string, readonly "insecure_skip_verify"?: boolean, readonly "key"?: Secret, readonly "key_file"?: string, readonly "key_ref"?: string, readonly "max_version"?: TLSVersion, readonly "min_version"?: TLSVersion, readonly "server_name"?: string }
export const TLSConfig = Schema.Struct({ "ca": Schema.optionalKey(Schema.String.annotate({ "description": "Text of the CA cert to use for the targets." })), "ca_file": Schema.optionalKey(Schema.String.annotate({ "description": "The CA cert to use for the targets." })), "ca_ref": Schema.optionalKey(Schema.String.annotate({ "description": "CARef is the name of the secret within the secret manager to use as the CA cert for the\ntargets." })), "cert": Schema.optionalKey(Schema.String.annotate({ "description": "Text of the client cert file for the targets." })), "cert_file": Schema.optionalKey(Schema.String.annotate({ "description": "The client cert file for the targets." })), "cert_ref": Schema.optionalKey(Schema.String.annotate({ "description": "CertRef is the name of the secret within the secret manager to use as the client cert for\nthe targets." })), "insecure_skip_verify": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Disable target certificate validation." })), "key": Schema.optionalKey(Secret), "key_file": Schema.optionalKey(Schema.String.annotate({ "description": "The client key file for the targets." })), "key_ref": Schema.optionalKey(Schema.String.annotate({ "description": "KeyRef is the name of the secret within the secret manager to use as the client key for\nthe targets." })), "max_version": Schema.optionalKey(TLSVersion), "min_version": Schema.optionalKey(TLSVersion), "server_name": Schema.optionalKey(Schema.String.annotate({ "description": "Used to verify the hostname for the targets." })) }).annotate({ "title": "TLSConfig configures the options for TLS connections." })
export type FindTagsResult = { readonly "tags"?: ReadonlyArray<TagsDTO> }
export const FindTagsResult = Schema.Struct({ "tags": Schema.optionalKey(Schema.Array(TagsDTO)) }).annotate({ "title": "FindTagsResult is the result of a tags search." })
export type SearchTeamGroupsQueryResult = { readonly "page"?: number, readonly "perPage"?: number, readonly "teamGroups"?: ReadonlyArray<TeamGroupDTO>, readonly "totalCount"?: number }
export const SearchTeamGroupsQueryResult = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "teamGroups": Schema.optionalKey(Schema.Array(TeamGroupDTO)), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type TeamLBACRules = { readonly "rules"?: ReadonlyArray<TeamLBACRule> }
export const TeamLBACRules = Schema.Struct({ "rules": Schema.optionalKey(Schema.Array(TeamLBACRule)) })
export type TempUserDTO = { readonly "code"?: string, readonly "createdOn"?: string, readonly "email"?: string, readonly "emailSent"?: boolean, readonly "emailSentOn"?: string, readonly "id"?: number, readonly "invitedByEmail"?: string, readonly "invitedByLogin"?: string, readonly "invitedByName"?: string, readonly "name"?: string, readonly "orgId"?: number, readonly "role"?: "None" | "Viewer" | "Editor" | "Admin", readonly "status"?: TempUserStatus, readonly "url"?: string }
export const TempUserDTO = Schema.Struct({ "code": Schema.optionalKey(Schema.String), "createdOn": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "email": Schema.optionalKey(Schema.String), "emailSent": Schema.optionalKey(Schema.Boolean), "emailSentOn": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "invitedByEmail": Schema.optionalKey(Schema.String), "invitedByLogin": Schema.optionalKey(Schema.String), "invitedByName": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "role": Schema.optionalKey(Schema.Literals(["None", "Viewer", "Editor", "Admin"])), "status": Schema.optionalKey(TempUserStatus), "url": Schema.optionalKey(Schema.String) })
export type Token = { readonly "account"?: string, readonly "anonymousRatio"?: number, readonly "company"?: string, readonly "details_url"?: string, readonly "exp"?: number, readonly "iat"?: number, readonly "included_users"?: number, readonly "iss"?: string, readonly "jti"?: string, readonly "lexp"?: number, readonly "lic_exp_warn_days"?: number, readonly "lid"?: string, readonly "limit_by"?: string, readonly "max_concurrent_user_sessions"?: number, readonly "nbf"?: number, readonly "prod"?: ReadonlyArray<string>, readonly "slug"?: string, readonly "status"?: TokenStatus, readonly "sub"?: string, readonly "tok_exp_warn_days"?: number, readonly "trial"?: boolean, readonly "trial_exp"?: number, readonly "update_days"?: number, readonly "usage_billing"?: boolean }
export const Token = Schema.Struct({ "account": Schema.optionalKey(Schema.String), "anonymousRatio": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "company": Schema.optionalKey(Schema.String), "details_url": Schema.optionalKey(Schema.String), "exp": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "iat": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "included_users": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "iss": Schema.optionalKey(Schema.String), "jti": Schema.optionalKey(Schema.String), "lexp": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "lic_exp_warn_days": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "lid": Schema.optionalKey(Schema.String), "limit_by": Schema.optionalKey(Schema.String), "max_concurrent_user_sessions": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "nbf": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "prod": Schema.optionalKey(Schema.Array(Schema.String)), "slug": Schema.optionalKey(Schema.String), "status": Schema.optionalKey(TokenStatus), "sub": Schema.optionalKey(Schema.String), "tok_exp_warn_days": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "trial": Schema.optionalKey(Schema.Boolean), "trial_exp": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "update_days": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "usage_billing": Schema.optionalKey(Schema.Boolean) })
export type CorrelationConfigUpdateDTO = { readonly "field"?: string, readonly "target"?: { readonly [x: string]: Schema.Json }, readonly "transformations"?: ReadonlyArray<Transformation> }
export const CorrelationConfigUpdateDTO = Schema.Struct({ "field": Schema.optionalKey(Schema.String.annotate({ "description": "Field used to attach the correlation link", "examples": ["message"] })), "target": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json).annotate({ "description": "Target data query", "examples": [{"prop1":"value1","prop2":"value"}] })), "transformations": Schema.optionalKey(Schema.Array(Transformation).annotate({ "description": "Source data transformations" })) })
export type Transformations = ReadonlyArray<Transformation>
export const Transformations = Schema.Array(Transformation)
export type SecretURL = URL
export const SecretURL = URL
export type SearchUserQueryResult = { readonly "page"?: number, readonly "perPage"?: number, readonly "totalCount"?: number, readonly "users"?: ReadonlyArray<UserSearchHitDTO> }
export const SearchUserQueryResult = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "users": Schema.optionalKey(Schema.Array(UserSearchHitDTO)) })
export type ValueMappings = ReadonlyArray<ValueMapping>
export const ValueMappings = Schema.Array(ValueMapping)
export type PostableAlert = { readonly "annotations"?: LabelSet, readonly "endsAt"?: string, readonly "generatorURL"?: string, readonly "labels": LabelSet, readonly "startsAt"?: string }
export const PostableAlert = Schema.Struct({ "annotations": Schema.optionalKey(LabelSet), "endsAt": Schema.optionalKey(Schema.String.annotate({ "description": "ends at\nFormat: date-time", "format": "date-time" })), "generatorURL": Schema.optionalKey(Schema.String.annotate({ "description": "generator URL\nFormat: uri", "format": "uri" })), "labels": LabelSet, "startsAt": Schema.optionalKey(Schema.String.annotate({ "description": "starts at\nFormat: date-time", "format": "date-time" })) }).annotate({ "description": "PostableAlert postable alert" })
export type Matchers = ReadonlyArray<Matcher>
export const Matchers = Schema.Array(Matcher).annotate({ "description": "Matchers matchers" })
export type ClusterStatus = { readonly "name"?: string, readonly "peers"?: ReadonlyArray<PeerStatus>, readonly "status": "[ready settling disabled]" }
export const ClusterStatus = Schema.Struct({ "name": Schema.optionalKey(Schema.String.annotate({ "description": "name" })), "peers": Schema.optionalKey(Schema.Array(PeerStatus).annotate({ "description": "peers" })), "status": Schema.Literal("[ready settling disabled]").annotate({ "description": "status" }) }).annotate({ "description": "ClusterStatus cluster status" })
export type GettableAlert = { readonly "annotations": LabelSet, readonly "endsAt": string, readonly "fingerprint": string, readonly "generatorURL"?: string, readonly "labels": LabelSet, readonly "receivers": ReadonlyArray<Receiver>, readonly "startsAt": string, readonly "status": AlertStatus, readonly "updatedAt": string }
export const GettableAlert = Schema.Struct({ "annotations": LabelSet, "endsAt": Schema.String.annotate({ "description": "ends at", "format": "date-time" }), "fingerprint": Schema.String.annotate({ "description": "fingerprint" }), "generatorURL": Schema.optionalKey(Schema.String.annotate({ "description": "generator URL\nFormat: uri", "format": "uri" })), "labels": LabelSet, "receivers": Schema.Array(Receiver).annotate({ "description": "receivers" }), "startsAt": Schema.String.annotate({ "description": "starts at", "format": "date-time" }), "status": AlertStatus, "updatedAt": Schema.String.annotate({ "description": "updated at", "format": "date-time" }) }).annotate({ "description": "GettableAlert gettable alert" })
export type DashboardMeta = { readonly "annotationsPermissions"?: AnnotationPermission, readonly "apiVersion"?: string, readonly "canAdmin"?: boolean, readonly "canDelete"?: boolean, readonly "canEdit"?: boolean, readonly "canSave"?: boolean, readonly "canStar"?: boolean, readonly "created"?: string, readonly "createdBy"?: string, readonly "expires"?: string, readonly "folderId"?: number, readonly "folderTitle"?: string, readonly "folderUid"?: string, readonly "folderUrl"?: string, readonly "hasAcl"?: boolean, readonly "isFolder"?: boolean, readonly "isSnapshot"?: boolean, readonly "provisioned"?: boolean, readonly "provisionedExternalId"?: string, readonly "publicDashboardEnabled"?: boolean, readonly "slug"?: string, readonly "type"?: string, readonly "updated"?: string, readonly "updatedBy"?: string, readonly "url"?: string, readonly "version"?: number }
export const DashboardMeta = Schema.Struct({ "annotationsPermissions": Schema.optionalKey(AnnotationPermission), "apiVersion": Schema.optionalKey(Schema.String), "canAdmin": Schema.optionalKey(Schema.Boolean), "canDelete": Schema.optionalKey(Schema.Boolean), "canEdit": Schema.optionalKey(Schema.Boolean), "canSave": Schema.optionalKey(Schema.Boolean), "canStar": Schema.optionalKey(Schema.Boolean), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "expires": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "folderId": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: use FolderUID instead", "format": "int64" }).check(Schema.isInt())), "folderTitle": Schema.optionalKey(Schema.String), "folderUid": Schema.optionalKey(Schema.String), "folderUrl": Schema.optionalKey(Schema.String), "hasAcl": Schema.optionalKey(Schema.Boolean), "isFolder": Schema.optionalKey(Schema.Boolean), "isSnapshot": Schema.optionalKey(Schema.Boolean), "provisioned": Schema.optionalKey(Schema.Boolean), "provisionedExternalId": Schema.optionalKey(Schema.String), "publicDashboardEnabled": Schema.optionalKey(Schema.Boolean), "slug": Schema.optionalKey(Schema.String), "type": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type ThresholdsConfig = { readonly "mode"?: ThresholdsMode, readonly "steps"?: ReadonlyArray<Threshold> }
export const ThresholdsConfig = Schema.Struct({ "mode": Schema.optionalKey(ThresholdsMode), "steps": Schema.optionalKey(Schema.Array(Threshold).annotate({ "description": "Must be sorted by 'value', first value is always -Infinity" })) }).annotate({ "description": "ThresholdsConfig setup thresholds" })
export type AnnotationEvent = { readonly "color"?: string, readonly "dashboardId"?: number, readonly "dashboardUID"?: string, readonly "id"?: number, readonly "isRegion"?: boolean, readonly "panelId"?: number, readonly "source"?: AnnotationQuery, readonly "tags"?: ReadonlyArray<string>, readonly "text"?: string, readonly "time"?: number, readonly "timeEnd"?: number }
export const AnnotationEvent = Schema.Struct({ "color": Schema.optionalKey(Schema.String), "dashboardId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "dashboardUID": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "isRegion": Schema.optionalKey(Schema.Boolean), "panelId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "source": Schema.optionalKey(AnnotationQuery), "tags": Schema.optionalKey(Schema.Array(Schema.String)), "text": Schema.optionalKey(Schema.String), "time": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "timeEnd": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type AlertQuery = { readonly "datasourceUid"?: string, readonly "model"?: {  }, readonly "queryType"?: string, readonly "refId"?: string, readonly "relativeTimeRange"?: RelativeTimeRange }
export const AlertQuery = Schema.Struct({ "datasourceUid": Schema.optionalKey(Schema.String.annotate({ "description": "Grafana data source unique identifier; it should be '__expr__' for a Server Side Expression operation." })), "model": Schema.optionalKey(Schema.Struct({  }).annotate({ "description": "JSON is the raw JSON query and includes the above properties as well as custom properties." })), "queryType": Schema.optionalKey(Schema.String.annotate({ "description": "QueryType is an optional identifier for the type of query.\nIt can be used to distinguish different types of queries." })), "refId": Schema.optionalKey(Schema.String.annotate({ "description": "RefID is the unique identifier of the query, set by the frontend call." })), "relativeTimeRange": Schema.optionalKey(RelativeTimeRange) }).annotate({ "title": "AlertQuery represents a single query associated with an alert definition." })
export type ActiveSyncStatusDTO = { readonly "enabled"?: boolean, readonly "nextSync"?: string, readonly "prevSync"?: SyncResult, readonly "schedule"?: string }
export const ActiveSyncStatusDTO = Schema.Struct({ "enabled": Schema.optionalKey(Schema.Boolean), "nextSync": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "prevSync": Schema.optionalKey(SyncResult), "schedule": Schema.optionalKey(Schema.String) }).annotate({ "description": "ActiveSyncStatusDTO holds the information for LDAP background Sync" })
export type HitList = ReadonlyArray<Hit>
export const HitList = Schema.Array(Hit)
export type DashboardVersionResponseMeta = { readonly "continueToken"?: string, readonly "versions"?: ReadonlyArray<DashboardVersionMeta> }
export const DashboardVersionResponseMeta = Schema.Struct({ "continueToken": Schema.optionalKey(Schema.String), "versions": Schema.optionalKey(Schema.Array(DashboardVersionMeta)) })
export type DataSourceList = ReadonlyArray<DataSourceListItemDTO>
export const DataSourceList = Schema.Array(DataSourceListItemDTO)
export type ContactPoints = ReadonlyArray<EmbeddedContactPoint>
export const ContactPoints = Schema.Array(EmbeddedContactPoint)
export type QueryHistorySearchResult = { readonly "page"?: number, readonly "perPage"?: number, readonly "queryHistory"?: ReadonlyArray<QueryHistoryDTO>, readonly "totalCount"?: number }
export const QueryHistorySearchResult = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "queryHistory": Schema.optionalKey(Schema.Array(QueryHistoryDTO)), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type Alert1 = { readonly "activeAt"?: string, readonly "annotations": Labels, readonly "labels": Labels, readonly "state": string, readonly "value": string }
export const Alert1 = Schema.Struct({ "activeAt": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "annotations": Labels, "labels": Labels, "state": Schema.String, "value": Schema.String }).annotate({ "title": "Alert has info for an alert." })
export type LibraryElementConnectionsResponse = { readonly "result"?: ReadonlyArray<LibraryElementConnectionDTO> }
export const LibraryElementConnectionsResponse = Schema.Struct({ "result": Schema.optionalKey(Schema.Array(LibraryElementConnectionDTO)) }).annotate({ "title": "LibraryElementConnectionsResponse is a response struct for an array of LibraryElementConnectionDTO." })
export type LibraryElementDTO = { readonly "description"?: string, readonly "folderId"?: number, readonly "folderUid"?: string, readonly "id"?: number, readonly "kind"?: number, readonly "meta"?: LibraryElementDTOMeta, readonly "model"?: {  }, readonly "name"?: string, readonly "orgId"?: number, readonly "schemaVersion"?: number, readonly "type"?: string, readonly "uid"?: string, readonly "version"?: number }
export const LibraryElementDTO = Schema.Struct({ "description": Schema.optionalKey(Schema.String), "folderId": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: use FolderUID instead", "format": "int64" }).check(Schema.isInt())), "folderUid": Schema.optionalKey(Schema.String), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "kind": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "meta": Schema.optionalKey(LibraryElementDTOMeta), "model": Schema.optionalKey(Schema.Struct({  })), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "schemaVersion": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "type": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) }).annotate({ "title": "LibraryElementDTO is the frontend DTO for entities." })
export type Matchers1 = ReadonlyArray<Matcher1>
export const Matchers1 = Schema.Array(Matcher1).annotate({ "description": "Matchers is a slice of Matchers that is sortable, implements Stringer, and\nprovides a Matches method to match a LabelSet against all Matchers in the\nslice. Note that some users of Matchers might require it to be sorted." })
export type Name = { readonly "Country"?: ReadonlyArray<string>, readonly "ExtraNames"?: ReadonlyArray<AttributeTypeAndValue>, readonly "Locality"?: ReadonlyArray<string>, readonly "Names"?: ReadonlyArray<AttributeTypeAndValue>, readonly "SerialNumber"?: string, readonly "StreetAddress"?: ReadonlyArray<string> }
export const Name = Schema.Struct({ "Country": Schema.optionalKey(Schema.Array(Schema.String)), "ExtraNames": Schema.optionalKey(Schema.Array(AttributeTypeAndValue).annotate({ "description": "ExtraNames contains attributes to be copied, raw, into any marshaled\ndistinguished names. Values override any attributes with the same OID.\nThe ExtraNames field is not populated when parsing, see Names." })), "Locality": Schema.optionalKey(Schema.Array(Schema.String)), "Names": Schema.optionalKey(Schema.Array(AttributeTypeAndValue).annotate({ "description": "Names contains all parsed attributes. When parsing distinguished names,\nthis can be used to extract non-standard attributes that are not parsed\nby this package. When marshaling to RDNSequences, the Names field is\nignored, see ExtraNames." })), "SerialNumber": Schema.optionalKey(Schema.String), "StreetAddress": Schema.optionalKey(Schema.Array(Schema.String)) }).annotate({ "description": "Name represents an X.509 distinguished name. This only includes the common\nelements of a DN. Note that Name is only an approximation of the X.509\nstructure. If an accurate representation is needed, asn1.Unmarshal the raw\nsubject or issuer as an [RDNSequence]." })
export type SearchTeamQueryResult = { readonly "page"?: number, readonly "perPage"?: number, readonly "teams"?: ReadonlyArray<TeamDTO>, readonly "totalCount"?: number }
export const SearchTeamQueryResult = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "teams": Schema.optionalKey(Schema.Array(TeamDTO)), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type NotificationTemplates = ReadonlyArray<NotificationTemplate>
export const NotificationTemplates = Schema.Array(NotificationTemplate)
export type ContactPointExport = { readonly "name"?: string, readonly "orgId"?: number, readonly "receivers"?: ReadonlyArray<ReceiverExport> }
export const ContactPointExport = Schema.Struct({ "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "receivers": Schema.optionalKey(Schema.Array(ReceiverExport)) }).annotate({ "title": "ContactPointExport is the provisioned file export of alerting.ContactPointV1." })
export type AlertRuleExport = { readonly "annotations"?: { readonly [x: string]: string }, readonly "condition"?: string, readonly "dashboardUid"?: string, readonly "data"?: ReadonlyArray<AlertQueryExport>, readonly "execErrState"?: "OK" | "Alerting" | "Error", readonly "for"?: Duration, readonly "isPaused"?: boolean, readonly "keepFiringFor"?: Duration, readonly "labels"?: { readonly [x: string]: string }, readonly "missing_series_evals_to_resolve"?: number, readonly "noDataState"?: "Alerting" | "NoData" | "OK", readonly "notification_settings"?: AlertRuleNotificationSettingsExport, readonly "panelId"?: number, readonly "record"?: AlertRuleRecordExport, readonly "title"?: string, readonly "uid"?: string }
export const AlertRuleExport = Schema.Struct({ "annotations": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "condition": Schema.optionalKey(Schema.String), "dashboardUid": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Array(AlertQueryExport)), "execErrState": Schema.optionalKey(Schema.Literals(["OK", "Alerting", "Error"])), "for": Schema.optionalKey(Duration), "isPaused": Schema.optionalKey(Schema.Boolean), "keepFiringFor": Schema.optionalKey(Duration), "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "missing_series_evals_to_resolve": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "noDataState": Schema.optionalKey(Schema.Literals(["Alerting", "NoData", "OK"])), "notification_settings": Schema.optionalKey(AlertRuleNotificationSettingsExport), "panelId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "record": Schema.optionalKey(AlertRuleRecordExport), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) }).annotate({ "title": "AlertRuleExport is the provisioned file export of models.AlertRule." })
export type Report = { readonly "created"?: string, readonly "dashboards"?: ReadonlyArray<ReportDashboard>, readonly "enableCsv"?: boolean, readonly "enableDashboardUrl"?: boolean, readonly "formats"?: ReadonlyArray<Type>, readonly "id"?: number, readonly "message"?: string, readonly "name"?: string, readonly "options"?: ReportOptions, readonly "orgId"?: number, readonly "recipients"?: string, readonly "replyTo"?: string, readonly "scaleFactor"?: number, readonly "schedule"?: ReportSchedule, readonly "state"?: State, readonly "subject"?: string, readonly "uid"?: string, readonly "updated"?: string, readonly "urls"?: ReadonlyArray<ReportURLItem>, readonly "userId"?: number }
export const Report = Schema.Struct({ "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "dashboards": Schema.optionalKey(Schema.Array(ReportDashboard)), "enableCsv": Schema.optionalKey(Schema.Boolean), "enableDashboardUrl": Schema.optionalKey(Schema.Boolean), "formats": Schema.optionalKey(Schema.Array(Type)), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "message": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String), "options": Schema.optionalKey(ReportOptions), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "recipients": Schema.optionalKey(Schema.String), "replyTo": Schema.optionalKey(Schema.String), "scaleFactor": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "schedule": Schema.optionalKey(ReportSchedule), "state": Schema.optionalKey(State), "subject": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "urls": Schema.optionalKey(Schema.Array(ReportURLItem)), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type Headers = { readonly "Headers"?: { readonly [x: string]: Header } }
export const Headers = Schema.Struct({ "Headers": Schema.optionalKey(Schema.Record(Schema.String, Header)) }).annotate({ "title": "Headers represents the configuration for HTTP headers." })
export type Sample = { readonly "DropName"?: boolean, readonly "F"?: number, readonly "H"?: FloatHistogram, readonly "Metric"?: Labels, readonly "T"?: number }
export const Sample = Schema.Struct({ "DropName": Schema.optionalKey(Schema.Boolean.annotate({ "description": "DropName is used to indicate whether the __name__ label should be dropped\nas part of the query evaluation." })), "F": Schema.optionalKey(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())), "H": Schema.optionalKey(FloatHistogram), "Metric": Schema.optionalKey(Labels), "T": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) }).annotate({ "description": "Sample is a single sample belonging to a metric. It represents either a float\nsample or a histogram sample. If H is nil, it is a float sample. Otherwise,\nit is a histogram sample." })
export type InternalDataLink = { readonly "datasourceName"?: string, readonly "datasourceUid"?: string, readonly "panelsState"?: ExplorePanelsState, readonly "query"?: Schema.Json, readonly "timeRange"?: TimeRange, readonly "transformations"?: ReadonlyArray<LinkTransformationConfig> }
export const InternalDataLink = Schema.Struct({ "datasourceName": Schema.optionalKey(Schema.String), "datasourceUid": Schema.optionalKey(Schema.String), "panelsState": Schema.optionalKey(ExplorePanelsState), "query": Schema.optionalKey(Schema.Json), "timeRange": Schema.optionalKey(TimeRange), "transformations": Schema.optionalKey(Schema.Array(LinkTransformationConfig)) }).annotate({ "description": "InternalDataLink definition to allow Explore links to be constructed in the backend" })
export type EmailConfig = { readonly "auth_identity"?: string, readonly "auth_password"?: Secret, readonly "auth_password_file"?: string, readonly "auth_secret"?: Secret, readonly "auth_username"?: string, readonly "from"?: string, readonly "headers"?: { readonly [x: string]: string }, readonly "hello"?: string, readonly "html"?: string, readonly "require_tls"?: boolean, readonly "send_resolved"?: boolean, readonly "smarthost"?: HostPort, readonly "text"?: string, readonly "tls_config"?: TLSConfig, readonly "to"?: string }
export const EmailConfig = Schema.Struct({ "auth_identity": Schema.optionalKey(Schema.String), "auth_password": Schema.optionalKey(Secret), "auth_password_file": Schema.optionalKey(Schema.String), "auth_secret": Schema.optionalKey(Secret), "auth_username": Schema.optionalKey(Schema.String), "from": Schema.optionalKey(Schema.String), "headers": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "hello": Schema.optionalKey(Schema.String), "html": Schema.optionalKey(Schema.String), "require_tls": Schema.optionalKey(Schema.Boolean), "send_resolved": Schema.optionalKey(Schema.Boolean), "smarthost": Schema.optionalKey(HostPort), "text": Schema.optionalKey(Schema.String), "tls_config": Schema.optionalKey(TLSConfig), "to": Schema.optionalKey(Schema.String.annotate({ "description": "Email address to notify." })) }).annotate({ "title": "EmailConfig configures notifications via mail." })
export type OAuth2 = { readonly "TLSConfig"?: TLSConfig, readonly "audience"?: string, readonly "claims"?: { readonly [x: string]: Schema.Json }, readonly "client_certificate_key"?: Secret, readonly "client_certificate_key_file"?: string, readonly "client_certificate_key_id"?: string, readonly "client_certificate_key_ref"?: string, readonly "client_id"?: string, readonly "client_secret"?: Secret, readonly "client_secret_file"?: string, readonly "client_secret_ref"?: string, readonly "endpoint_params"?: { readonly [x: string]: string }, readonly "grant_type"?: string, readonly "iss"?: string, readonly "no_proxy"?: string, readonly "proxy_connect_header"?: ProxyHeader, readonly "proxy_from_environment"?: boolean, readonly "proxy_url"?: URL, readonly "scopes"?: ReadonlyArray<string>, readonly "signature_algorithm"?: string, readonly "token_url"?: string }
export const OAuth2 = Schema.Struct({ "TLSConfig": Schema.optionalKey(TLSConfig), "audience": Schema.optionalKey(Schema.String.annotate({ "description": "Audience optionally specifies the intended audience of the\nrequest.  If empty, the value of TokenURL is used as the\nintended audience. Only used if\nGrantType is set to \"urn:ietf:params:oauth:grant-type:jwt-bearer\"." })), "claims": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json).annotate({ "description": "Claims is a map of claims to be added to the JWT token. Only used if\nGrantType is set to \"urn:ietf:params:oauth:grant-type:jwt-bearer\"." })), "client_certificate_key": Schema.optionalKey(Secret), "client_certificate_key_file": Schema.optionalKey(Schema.String), "client_certificate_key_id": Schema.optionalKey(Schema.String), "client_certificate_key_ref": Schema.optionalKey(Schema.String.annotate({ "description": "ClientCertificateKeyRef is the name of the secret within the secret manager to use as the client\nsecret." })), "client_id": Schema.optionalKey(Schema.String), "client_secret": Schema.optionalKey(Secret), "client_secret_file": Schema.optionalKey(Schema.String), "client_secret_ref": Schema.optionalKey(Schema.String.annotate({ "description": "ClientSecretRef is the name of the secret within the secret manager to use as the client\nsecret." })), "endpoint_params": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "grant_type": Schema.optionalKey(Schema.String.annotate({ "description": "GrantType is the OAuth2 grant type to use. It can be one of\n\"client_credentials\" or \"urn:ietf:params:oauth:grant-type:jwt-bearer\" (RFC 7523).\nDefault value is \"client_credentials\"" })), "iss": Schema.optionalKey(Schema.String.annotate({ "description": "Iss is the OAuth client identifier used when communicating with\nthe configured OAuth provider. Default value is client_id. Only used if\nGrantType is set to \"urn:ietf:params:oauth:grant-type:jwt-bearer\"." })), "no_proxy": Schema.optionalKey(Schema.String.annotate({ "description": "NoProxy contains addresses that should not use a proxy." })), "proxy_connect_header": Schema.optionalKey(ProxyHeader), "proxy_from_environment": Schema.optionalKey(Schema.Boolean.annotate({ "description": "ProxyFromEnvironment makes use of net/http ProxyFromEnvironment function\nto determine proxies." })), "proxy_url": Schema.optionalKey(URL), "scopes": Schema.optionalKey(Schema.Array(Schema.String)), "signature_algorithm": Schema.optionalKey(Schema.String.annotate({ "description": "SignatureAlgorithm is the RSA algorithm used to sign JWT token. Only used if\nGrantType is set to \"urn:ietf:params:oauth:grant-type:jwt-bearer\".\nDefault value is RS256 and valid values RS256, RS384, RS512" })), "token_url": Schema.optionalKey(Schema.String) }).annotate({ "title": "OAuth2 is the oauth2 client configuration." })
export type GetAnnotationTagsResponse = { readonly "result"?: FindTagsResult }
export const GetAnnotationTagsResponse = Schema.Struct({ "result": Schema.optionalKey(FindTagsResult) }).annotate({ "title": "GetAnnotationTagsResponse is a response struct for FindTagsResult." })
export type CorrelationConfig = { readonly "field": string, readonly "target": { readonly [x: string]: Schema.Json }, readonly "transformations"?: Transformations, readonly "type"?: CorrelationType }
export const CorrelationConfig = Schema.Struct({ "field": Schema.String.annotate({ "description": "Field used to attach the correlation link", "examples": ["message"] }), "target": Schema.Record(Schema.String, Schema.Json).annotate({ "description": "Target data query", "examples": [{"prop1":"value1","prop2":"value"}] }), "transformations": Schema.optionalKey(Transformations), "type": Schema.optionalKey(CorrelationType) })
export type GettableGrafanaSilence = { readonly "accessControl"?: { readonly [x: string]: boolean }, readonly "comment": string, readonly "createdBy": string, readonly "endsAt": string, readonly "id": string, readonly "matchers": Matchers, readonly "metadata"?: SilenceMetadata, readonly "startsAt": string, readonly "status": SilenceStatus, readonly "updatedAt": string }
export const GettableGrafanaSilence = Schema.Struct({ "accessControl": Schema.optionalKey(Schema.Record(Schema.String, Schema.Boolean).annotate({ "examples": [{"create":false,"read":true,"write":false}] })), "comment": Schema.String.annotate({ "description": "comment" }), "createdBy": Schema.String.annotate({ "description": "created by" }), "endsAt": Schema.String.annotate({ "description": "ends at", "format": "date-time" }), "id": Schema.String.annotate({ "description": "id" }), "matchers": Matchers, "metadata": Schema.optionalKey(SilenceMetadata), "startsAt": Schema.String.annotate({ "description": "starts at", "format": "date-time" }), "status": SilenceStatus, "updatedAt": Schema.String.annotate({ "description": "updated at", "format": "date-time" }) })
export type GettableSilence = { readonly "comment": string, readonly "createdBy": string, readonly "endsAt": string, readonly "id": string, readonly "matchers": Matchers, readonly "startsAt": string, readonly "status": SilenceStatus, readonly "updatedAt": string }
export const GettableSilence = Schema.Struct({ "comment": Schema.String.annotate({ "description": "comment" }), "createdBy": Schema.String.annotate({ "description": "created by" }), "endsAt": Schema.String.annotate({ "description": "ends at", "format": "date-time" }), "id": Schema.String.annotate({ "description": "id" }), "matchers": Matchers, "startsAt": Schema.String.annotate({ "description": "starts at", "format": "date-time" }), "status": SilenceStatus, "updatedAt": Schema.String.annotate({ "description": "updated at", "format": "date-time" }) }).annotate({ "description": "GettableSilence gettable silence" })
export type AlertGroup = { readonly "alerts": ReadonlyArray<GettableAlert>, readonly "labels": LabelSet, readonly "receiver": Receiver }
export const AlertGroup = Schema.Struct({ "alerts": Schema.Array(GettableAlert).annotate({ "description": "alerts" }), "labels": LabelSet, "receiver": Receiver }).annotate({ "description": "AlertGroup alert group" })
export type DashboardFullWithMeta = { readonly "dashboard"?: Json, readonly "meta"?: DashboardMeta }
export const DashboardFullWithMeta = Schema.Struct({ "dashboard": Schema.optionalKey(Json), "meta": Schema.optionalKey(DashboardMeta) })
export type GetHomeDashboardResponse = { readonly "dashboard"?: Json, readonly "meta"?: DashboardMeta, readonly "redirectUri"?: string }
export const GetHomeDashboardResponse = Schema.Struct({ "dashboard": Schema.optionalKey(Json), "meta": Schema.optionalKey(DashboardMeta), "redirectUri": Schema.optionalKey(Schema.String) }).annotate({ "title": "Get home dashboard response." })
export type EvalAlertConditionCommand = { readonly "condition"?: string, readonly "data"?: ReadonlyArray<AlertQuery>, readonly "now"?: string }
export const EvalAlertConditionCommand = Schema.Struct({ "condition": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Array(AlertQuery)), "now": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })) }).annotate({ "description": "EvalAlertConditionCommand is the command for evaluating a condition" })
export type GettableGrafanaRule = { readonly "condition"?: string, readonly "data"?: ReadonlyArray<AlertQuery>, readonly "exec_err_state"?: "OK" | "Alerting" | "Error", readonly "guid"?: string, readonly "intervalSeconds"?: number, readonly "is_paused"?: boolean, readonly "message"?: string, readonly "metadata"?: AlertRuleMetadata, readonly "missing_series_evals_to_resolve"?: number, readonly "namespace_uid"?: string, readonly "no_data_state"?: "Alerting" | "NoData" | "OK", readonly "notification_settings"?: AlertRuleNotificationSettings, readonly "provenance"?: Provenance, readonly "record"?: Record, readonly "rule_group"?: string, readonly "title"?: string, readonly "uid"?: string, readonly "updated"?: string, readonly "updated_by"?: UserInfo, readonly "version"?: number }
export const GettableGrafanaRule = Schema.Struct({ "condition": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Array(AlertQuery)), "exec_err_state": Schema.optionalKey(Schema.Literals(["OK", "Alerting", "Error"])), "guid": Schema.optionalKey(Schema.String), "intervalSeconds": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "is_paused": Schema.optionalKey(Schema.Boolean), "message": Schema.optionalKey(Schema.String.annotate({ "description": "Field is only populated when listing alert rule versions." })), "metadata": Schema.optionalKey(AlertRuleMetadata), "missing_series_evals_to_resolve": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "namespace_uid": Schema.optionalKey(Schema.String), "no_data_state": Schema.optionalKey(Schema.Literals(["Alerting", "NoData", "OK"])), "notification_settings": Schema.optionalKey(AlertRuleNotificationSettings), "provenance": Schema.optionalKey(Provenance), "record": Schema.optionalKey(Record), "rule_group": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updated_by": Schema.optionalKey(UserInfo), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type PostableGrafanaRule = { readonly "condition"?: string, readonly "data"?: ReadonlyArray<AlertQuery>, readonly "exec_err_state"?: "OK" | "Alerting" | "Error", readonly "is_paused"?: boolean, readonly "metadata"?: AlertRuleMetadata, readonly "missing_series_evals_to_resolve"?: number, readonly "no_data_state"?: "Alerting" | "NoData" | "OK", readonly "notification_settings"?: AlertRuleNotificationSettings, readonly "record"?: Record, readonly "title"?: string, readonly "uid"?: string }
export const PostableGrafanaRule = Schema.Struct({ "condition": Schema.optionalKey(Schema.String), "data": Schema.optionalKey(Schema.Array(AlertQuery)), "exec_err_state": Schema.optionalKey(Schema.Literals(["OK", "Alerting", "Error"])), "is_paused": Schema.optionalKey(Schema.Boolean), "metadata": Schema.optionalKey(AlertRuleMetadata), "missing_series_evals_to_resolve": Schema.optionalKey(Schema.Number.annotate({ "description": "Number of consecutive evaluation intervals with no data for a dimension must pass\nbefore the alert state is considered stale and automatically resolved.\nIf set to 0, the value is reset to the default.", "examples": [3], "format": "int64" }).check(Schema.isInt())), "no_data_state": Schema.optionalKey(Schema.Literals(["Alerting", "NoData", "OK"])), "notification_settings": Schema.optionalKey(AlertRuleNotificationSettings), "record": Schema.optionalKey(Record), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String) })
export type ProvisionedAlertRule = { readonly "annotations"?: { readonly [x: string]: string }, readonly "condition": string, readonly "data": ReadonlyArray<AlertQuery>, readonly "execErrState": "OK" | "Alerting" | "Error", readonly "folderUID": string, readonly "for": string, readonly "id"?: number, readonly "isPaused"?: boolean, readonly "keep_firing_for"?: string, readonly "labels"?: { readonly [x: string]: string }, readonly "missingSeriesEvalsToResolve"?: number, readonly "noDataState": "Alerting" | "NoData" | "OK", readonly "notification_settings"?: AlertRuleNotificationSettings, readonly "orgID": number, readonly "provenance"?: Provenance, readonly "record"?: Record, readonly "ruleGroup": string, readonly "title": string, readonly "uid"?: string, readonly "updated"?: string }
export const ProvisionedAlertRule = Schema.Struct({ "annotations": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "examples": [{"runbook_url":"https://supercoolrunbook.com/page/13"}] })), "condition": Schema.String.annotate({ "examples": ["A"] }), "data": Schema.Array(AlertQuery).annotate({ "examples": [[{"datasourceUid":"__expr__","model":{"conditions":[{"evaluator":{"params":[0,0],"type":"gt"},"operator":{"type":"and"},"query":{"params":[]},"reducer":{"params":[],"type":"avg"},"type":"query"}],"datasource":{"type":"__expr__","uid":"__expr__"},"expression":"1 == 1","hide":false,"intervalMs":1000,"maxDataPoints":43200,"refId":"A","type":"math"},"queryType":"","refId":"A","relativeTimeRange":{"from":0,"to":0}}]] }), "execErrState": Schema.Literals(["OK", "Alerting", "Error"]), "folderUID": Schema.String.annotate({ "examples": ["project_x"] }), "for": Schema.String.annotate({ "format": "duration" }), "id": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "isPaused": Schema.optionalKey(Schema.Boolean.annotate({ "examples": [false] })), "keep_firing_for": Schema.optionalKey(Schema.String.annotate({ "format": "duration" })), "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "examples": [{"team":"sre-team-1"}] })), "missingSeriesEvalsToResolve": Schema.optionalKey(Schema.Number.annotate({ "examples": [2], "format": "int64" }).check(Schema.isInt())), "noDataState": Schema.Literals(["Alerting", "NoData", "OK"]), "notification_settings": Schema.optionalKey(AlertRuleNotificationSettings), "orgID": Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()), "provenance": Schema.optionalKey(Provenance), "record": Schema.optionalKey(Record), "ruleGroup": Schema.String.annotate({ "examples": ["eval_group_1"] }).check(Schema.isMinLength(1)).check(Schema.isMaxLength(190)), "title": Schema.String.annotate({ "examples": ["Always firing"] }).check(Schema.isMinLength(1)).check(Schema.isMaxLength(190)), "uid": Schema.optionalKey(Schema.String.check(Schema.isMinLength(1)).check(Schema.isMaxLength(40)).check(Schema.isPattern(new RegExp("^[a-zA-Z0-9-_]+$")))), "updated": Schema.optionalKey(Schema.String.annotate({ "readOnly": true, "format": "date-time" })) })
export type QueryHistorySearchResponse = { readonly "result"?: QueryHistorySearchResult }
export const QueryHistorySearchResponse = Schema.Struct({ "result": Schema.optionalKey(QueryHistorySearchResult) })
export type AlertDiscovery = { readonly "alerts": ReadonlyArray<Alert1> }
export const AlertDiscovery = Schema.Struct({ "alerts": Schema.Array(Alert1) }).annotate({ "title": "AlertDiscovery has info for all active alerts." })
export type AlertingRule = { readonly "activeAt": string, readonly "alerts"?: ReadonlyArray<Alert1>, readonly "annotations": Labels, readonly "duration"?: number, readonly "evaluationTime"?: number, readonly "folderUid"?: string, readonly "health": string, readonly "isPaused"?: boolean, readonly "keepFiringFor"?: number, readonly "labels"?: Labels, readonly "lastError"?: string, readonly "lastEvaluation"?: string, readonly "name": string, readonly "notificationSettings"?: AlertRuleNotificationSettings, readonly "provenance"?: Provenance, readonly "queriedDatasourceUIDs"?: ReadonlyArray<string>, readonly "query": string, readonly "state": string, readonly "totals"?: { readonly [x: string]: number }, readonly "totalsFiltered"?: { readonly [x: string]: number }, readonly "type": string, readonly "uid"?: string }
export const AlertingRule = Schema.Struct({ "activeAt": Schema.String.annotate({ "format": "date-time" }), "alerts": Schema.optionalKey(Schema.Array(Alert1)), "annotations": Labels, "duration": Schema.optionalKey(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())), "evaluationTime": Schema.optionalKey(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())), "folderUid": Schema.optionalKey(Schema.String), "health": Schema.String, "isPaused": Schema.optionalKey(Schema.Boolean), "keepFiringFor": Schema.optionalKey(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())), "labels": Schema.optionalKey(Labels), "lastError": Schema.optionalKey(Schema.String), "lastEvaluation": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "name": Schema.String, "notificationSettings": Schema.optionalKey(AlertRuleNotificationSettings), "provenance": Schema.optionalKey(Provenance), "queriedDatasourceUIDs": Schema.optionalKey(Schema.Array(Schema.String)), "query": Schema.String, "state": Schema.String.annotate({ "description": "State can be \"pending\", \"firing\", \"inactive\"." }), "totals": Schema.optionalKey(Schema.Record(Schema.String, Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))), "totalsFiltered": Schema.optionalKey(Schema.Record(Schema.String, Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))), "type": Schema.String, "uid": Schema.optionalKey(Schema.String) }).annotate({ "description": "adapted from cortex" })
export type LibraryElementArrayResponse = { readonly "result"?: ReadonlyArray<LibraryElementDTO> }
export const LibraryElementArrayResponse = Schema.Struct({ "result": Schema.optionalKey(Schema.Array(LibraryElementDTO)) }).annotate({ "title": "LibraryElementArrayResponse is a response struct for an array of LibraryElementDTO." })
export type LibraryElementResponse = { readonly "result"?: LibraryElementDTO }
export const LibraryElementResponse = Schema.Struct({ "result": Schema.optionalKey(LibraryElementDTO) }).annotate({ "title": "LibraryElementResponse is a response struct for LibraryElementDTO." })
export type LibraryElementSearchResult = { readonly "elements"?: ReadonlyArray<LibraryElementDTO>, readonly "page"?: number, readonly "perPage"?: number, readonly "totalCount"?: number }
export const LibraryElementSearchResult = Schema.Struct({ "elements": Schema.optionalKey(Schema.Array(LibraryElementDTO)), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "perPage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "totalCount": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) }).annotate({ "title": "LibraryElementSearchResult is the search result for entities." })
export type ExtraConfiguration = { readonly "alertmanager_config"?: string, readonly "identifier"?: string, readonly "merge_matchers"?: Matchers1, readonly "template_files"?: { readonly [x: string]: string } }
export const ExtraConfiguration = Schema.Struct({ "alertmanager_config": Schema.optionalKey(Schema.String), "identifier": Schema.optionalKey(Schema.String), "merge_matchers": Schema.optionalKey(Matchers1), "template_files": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)) })
export type InhibitRule = { readonly "equal"?: ReadonlyArray<string>, readonly "source_match"?: { readonly [x: string]: string }, readonly "source_match_re"?: MatchRegexps, readonly "source_matchers"?: Matchers1, readonly "target_match"?: { readonly [x: string]: string }, readonly "target_match_re"?: MatchRegexps, readonly "target_matchers"?: Matchers1 }
export const InhibitRule = Schema.Struct({ "equal": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "A set of labels that must be equal between the source and target alert\nfor them to be a match." })), "source_match": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "description": "SourceMatch defines a set of labels that have to equal the given\nvalue for source alerts. Deprecated. Remove before v1.0 release." })), "source_match_re": Schema.optionalKey(MatchRegexps), "source_matchers": Schema.optionalKey(Matchers1), "target_match": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "description": "TargetMatch defines a set of labels that have to equal the given\nvalue for target alerts. Deprecated. Remove before v1.0 release." })), "target_match_re": Schema.optionalKey(MatchRegexps), "target_matchers": Schema.optionalKey(Matchers1) }).annotate({ "description": "InhibitRule defines an inhibition rule that mutes alerts that match the\ntarget labels if an alert matching the source labels exists.\nBoth alerts have to have a set of labels being equal." })
export type NotificationPolicyExport = { readonly "active_time_intervals"?: ReadonlyArray<string>, readonly "continue"?: boolean, readonly "group_by"?: ReadonlyArray<string>, readonly "group_interval"?: string, readonly "group_wait"?: string, readonly "match"?: { readonly [x: string]: string }, readonly "match_re"?: MatchRegexps, readonly "matchers"?: Matchers1, readonly "mute_time_intervals"?: ReadonlyArray<string>, readonly "object_matchers"?: ObjectMatchers, readonly "orgId"?: number, readonly "receiver"?: string, readonly "repeat_interval"?: string, readonly "routes"?: ReadonlyArray<RouteExport> }
export const NotificationPolicyExport = Schema.Struct({ "active_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "continue": Schema.optionalKey(Schema.Boolean), "group_by": Schema.optionalKey(Schema.Array(Schema.String)), "group_interval": Schema.optionalKey(Schema.String), "group_wait": Schema.optionalKey(Schema.String), "match": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "description": "Deprecated. Remove before v1.0 release." })), "match_re": Schema.optionalKey(MatchRegexps), "matchers": Schema.optionalKey(Matchers1), "mute_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "object_matchers": Schema.optionalKey(ObjectMatchers), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "receiver": Schema.optionalKey(Schema.String), "repeat_interval": Schema.optionalKey(Schema.String), "routes": Schema.optionalKey(Schema.Array(RouteExport)) }).annotate({ "title": "NotificationPolicyExport is the provisioned file export of alerting.NotificiationPolicyV1." })
export type Certificate = { readonly "AuthorityKeyId"?: ReadonlyArray<number>, readonly "BasicConstraintsValid"?: boolean, readonly "CRLDistributionPoints"?: ReadonlyArray<string>, readonly "DNSNames"?: ReadonlyArray<string>, readonly "EmailAddresses"?: ReadonlyArray<string>, readonly "ExcludedDNSDomains"?: ReadonlyArray<string>, readonly "ExcludedEmailAddresses"?: ReadonlyArray<string>, readonly "ExcludedIPRanges"?: ReadonlyArray<IPNet>, readonly "ExcludedURIDomains"?: ReadonlyArray<string>, readonly "ExtKeyUsage"?: ReadonlyArray<ExtKeyUsage>, readonly "Extensions"?: ReadonlyArray<Extension>, readonly "ExtraExtensions"?: ReadonlyArray<Extension>, readonly "IPAddresses"?: ReadonlyArray<string>, readonly "InhibitAnyPolicy"?: number, readonly "InhibitAnyPolicyZero"?: boolean, readonly "InhibitPolicyMapping"?: number, readonly "InhibitPolicyMappingZero"?: boolean, readonly "IsCA"?: boolean, readonly "Issuer"?: Name, readonly "IssuingCertificateURL"?: ReadonlyArray<string>, readonly "KeyUsage"?: KeyUsage, readonly "MaxPathLen"?: number, readonly "MaxPathLenZero"?: boolean, readonly "NotBefore"?: string, readonly "OCSPServer"?: ReadonlyArray<string>, readonly "PermittedDNSDomains"?: ReadonlyArray<string>, readonly "PermittedDNSDomainsCritical"?: boolean, readonly "PermittedEmailAddresses"?: ReadonlyArray<string>, readonly "PermittedIPRanges"?: ReadonlyArray<IPNet>, readonly "PermittedURIDomains"?: ReadonlyArray<string>, readonly "Policies"?: ReadonlyArray<string>, readonly "PolicyIdentifiers"?: ReadonlyArray<ObjectIdentifier>, readonly "PolicyMappings"?: ReadonlyArray<PolicyMapping>, readonly "PublicKey"?: Schema.Json, readonly "PublicKeyAlgorithm"?: PublicKeyAlgorithm, readonly "Raw"?: ReadonlyArray<number>, readonly "RawIssuer"?: ReadonlyArray<number>, readonly "RawSubject"?: ReadonlyArray<number>, readonly "RawSubjectPublicKeyInfo"?: ReadonlyArray<number>, readonly "RawTBSCertificate"?: ReadonlyArray<number>, readonly "RequireExplicitPolicy"?: number, readonly "RequireExplicitPolicyZero"?: boolean, readonly "SerialNumber"?: string, readonly "Signature"?: ReadonlyArray<number>, readonly "SignatureAlgorithm"?: SignatureAlgorithm, readonly "Subject"?: Name, readonly "SubjectKeyId"?: ReadonlyArray<number>, readonly "URIs"?: ReadonlyArray<URL>, readonly "UnhandledCriticalExtensions"?: ReadonlyArray<ObjectIdentifier>, readonly "UnknownExtKeyUsage"?: ReadonlyArray<ObjectIdentifier>, readonly "Version"?: number }
export const Certificate = Schema.Struct({ "AuthorityKeyId": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))), "BasicConstraintsValid": Schema.optionalKey(Schema.Boolean.annotate({ "description": "BasicConstraintsValid indicates whether IsCA, MaxPathLen,\nand MaxPathLenZero are valid." })), "CRLDistributionPoints": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "CRL Distribution Points" })), "DNSNames": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Subject Alternate Name values. (Note that these values may not be valid\nif invalid values were contained within a parsed certificate. For\nexample, an element of DNSNames may not be a valid DNS domain name.)" })), "EmailAddresses": Schema.optionalKey(Schema.Array(Schema.String)), "ExcludedDNSDomains": Schema.optionalKey(Schema.Array(Schema.String)), "ExcludedEmailAddresses": Schema.optionalKey(Schema.Array(Schema.String)), "ExcludedIPRanges": Schema.optionalKey(Schema.Array(IPNet)), "ExcludedURIDomains": Schema.optionalKey(Schema.Array(Schema.String)), "ExtKeyUsage": Schema.optionalKey(Schema.Array(ExtKeyUsage)), "Extensions": Schema.optionalKey(Schema.Array(Extension).annotate({ "description": "Extensions contains raw X.509 extensions. When parsing certificates,\nthis can be used to extract non-critical extensions that are not\nparsed by this package. When marshaling certificates, the Extensions\nfield is ignored, see ExtraExtensions." })), "ExtraExtensions": Schema.optionalKey(Schema.Array(Extension).annotate({ "description": "ExtraExtensions contains extensions to be copied, raw, into any\nmarshaled certificates. Values override any extensions that would\notherwise be produced based on the other fields. The ExtraExtensions\nfield is not populated when parsing certificates, see Extensions." })), "IPAddresses": Schema.optionalKey(Schema.Array(Schema.String)), "InhibitAnyPolicy": Schema.optionalKey(Schema.Number.annotate({ "description": "InhibitAnyPolicy and InhibitAnyPolicyZero indicate the presence and value\nof the inhibitAnyPolicy extension.\n\nThe value of InhibitAnyPolicy indicates the number of additional\ncertificates in the path after this certificate that may use the\nanyPolicy policy OID to indicate a match with any other policy.\n\nWhen parsing a certificate, a positive non-zero InhibitAnyPolicy means\nthat the field was specified, -1 means it was unset, and\nInhibitAnyPolicyZero being true mean that the field was explicitly set to\nzero. The case of InhibitAnyPolicy==0 with InhibitAnyPolicyZero==false\nshould be treated equivalent to -1 (unset).", "format": "int64" }).check(Schema.isInt())), "InhibitAnyPolicyZero": Schema.optionalKey(Schema.Boolean.annotate({ "description": "InhibitAnyPolicyZero indicates that InhibitAnyPolicy==0 should be\ninterpreted as an actual maximum path length of zero. Otherwise, that\ncombination is interpreted as InhibitAnyPolicy not being set." })), "InhibitPolicyMapping": Schema.optionalKey(Schema.Number.annotate({ "description": "InhibitPolicyMapping and InhibitPolicyMappingZero indicate the presence\nand value of the inhibitPolicyMapping field of the policyConstraints\nextension.\n\nThe value of InhibitPolicyMapping indicates the number of additional\ncertificates in the path after this certificate that may use policy\nmapping.\n\nWhen parsing a certificate, a positive non-zero InhibitPolicyMapping\nmeans that the field was specified, -1 means it was unset, and\nInhibitPolicyMappingZero being true mean that the field was explicitly\nset to zero. The case of InhibitPolicyMapping==0 with\nInhibitPolicyMappingZero==false should be treated equivalent to -1\n(unset).", "format": "int64" }).check(Schema.isInt())), "InhibitPolicyMappingZero": Schema.optionalKey(Schema.Boolean.annotate({ "description": "InhibitPolicyMappingZero indicates that InhibitPolicyMapping==0 should be\ninterpreted as an actual maximum path length of zero. Otherwise, that\ncombination is interpreted as InhibitAnyPolicy not being set." })), "IsCA": Schema.optionalKey(Schema.Boolean), "Issuer": Schema.optionalKey(Name), "IssuingCertificateURL": Schema.optionalKey(Schema.Array(Schema.String)), "KeyUsage": Schema.optionalKey(KeyUsage), "MaxPathLen": Schema.optionalKey(Schema.Number.annotate({ "description": "MaxPathLen and MaxPathLenZero indicate the presence and\nvalue of the BasicConstraints' \"pathLenConstraint\".\n\nWhen parsing a certificate, a positive non-zero MaxPathLen\nmeans that the field was specified, -1 means it was unset,\nand MaxPathLenZero being true mean that the field was\nexplicitly set to zero. The case of MaxPathLen==0 with MaxPathLenZero==false\nshould be treated equivalent to -1 (unset).\n\nWhen generating a certificate, an unset pathLenConstraint\ncan be requested with either MaxPathLen == -1 or using the\nzero value for both MaxPathLen and MaxPathLenZero.", "format": "int64" }).check(Schema.isInt())), "MaxPathLenZero": Schema.optionalKey(Schema.Boolean.annotate({ "description": "MaxPathLenZero indicates that BasicConstraintsValid==true\nand MaxPathLen==0 should be interpreted as an actual\nmaximum path length of zero. Otherwise, that combination is\ninterpreted as MaxPathLen not being set." })), "NotBefore": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "OCSPServer": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "RFC 5280, 4.2.2.1 (Authority Information Access)" })), "PermittedDNSDomains": Schema.optionalKey(Schema.Array(Schema.String)), "PermittedDNSDomainsCritical": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Name constraints" })), "PermittedEmailAddresses": Schema.optionalKey(Schema.Array(Schema.String)), "PermittedIPRanges": Schema.optionalKey(Schema.Array(IPNet)), "PermittedURIDomains": Schema.optionalKey(Schema.Array(Schema.String)), "Policies": Schema.optionalKey(Schema.Array(Schema.String).annotate({ "description": "Policies contains all policy identifiers included in the certificate.\nSee CreateCertificate for context about how this field and the PolicyIdentifiers field\ninteract.\nIn Go 1.22, encoding/gob cannot handle and ignores this field." })), "PolicyIdentifiers": Schema.optionalKey(Schema.Array(ObjectIdentifier).annotate({ "description": "PolicyIdentifiers contains asn1.ObjectIdentifiers, the components\nof which are limited to int32. If a certificate contains a policy which\ncannot be represented by asn1.ObjectIdentifier, it will not be included in\nPolicyIdentifiers, but will be present in Policies, which contains all parsed\npolicy OIDs.\nSee CreateCertificate for context about how this field and the Policies field\ninteract." })), "PolicyMappings": Schema.optionalKey(Schema.Array(PolicyMapping).annotate({ "description": "PolicyMappings contains a list of policy mappings included in the certificate." })), "PublicKey": Schema.optionalKey(Schema.Json), "PublicKeyAlgorithm": Schema.optionalKey(PublicKeyAlgorithm), "Raw": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))), "RawIssuer": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))), "RawSubject": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))), "RawSubjectPublicKeyInfo": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))), "RawTBSCertificate": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))), "RequireExplicitPolicy": Schema.optionalKey(Schema.Number.annotate({ "description": "RequireExplicitPolicy and RequireExplicitPolicyZero indicate the presence\nand value of the requireExplicitPolicy field of the policyConstraints\nextension.\n\nThe value of RequireExplicitPolicy indicates the number of additional\ncertificates in the path after this certificate before an explicit policy\nis required for the rest of the path. When an explicit policy is required,\neach subsequent certificate in the path must contain a required policy OID,\nor a policy OID which has been declared as equivalent through the policy\nmapping extension.\n\nWhen parsing a certificate, a positive non-zero RequireExplicitPolicy\nmeans that the field was specified, -1 means it was unset, and\nRequireExplicitPolicyZero being true mean that the field was explicitly\nset to zero. The case of RequireExplicitPolicy==0 with\nRequireExplicitPolicyZero==false should be treated equivalent to -1\n(unset).", "format": "int64" }).check(Schema.isInt())), "RequireExplicitPolicyZero": Schema.optionalKey(Schema.Boolean.annotate({ "description": "RequireExplicitPolicyZero indicates that RequireExplicitPolicy==0 should be\ninterpreted as an actual maximum path length of zero. Otherwise, that\ncombination is interpreted as InhibitAnyPolicy not being set." })), "SerialNumber": Schema.optionalKey(Schema.String), "Signature": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))), "SignatureAlgorithm": Schema.optionalKey(SignatureAlgorithm), "Subject": Schema.optionalKey(Name), "SubjectKeyId": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))), "URIs": Schema.optionalKey(Schema.Array(URL)), "UnhandledCriticalExtensions": Schema.optionalKey(Schema.Array(ObjectIdentifier).annotate({ "description": "UnhandledCriticalExtensions contains a list of extension IDs that\nwere not (fully) processed when parsing. Verify will fail if this\nslice is non-empty, unless verification is delegated to an OS\nlibrary which understands all the critical extensions.\n\nUsers can access these extensions using Extensions and can remove\nelements from this slice if they believe that they have been\nhandled." })), "UnknownExtKeyUsage": Schema.optionalKey(Schema.Array(ObjectIdentifier)), "Version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) }).annotate({ "title": "A Certificate represents an X.509 certificate." })
export type AlertRuleGroupExport = { readonly "folder"?: string, readonly "interval"?: Duration, readonly "name"?: string, readonly "orgId"?: number, readonly "rules"?: ReadonlyArray<AlertRuleExport> }
export const AlertRuleGroupExport = Schema.Struct({ "folder": Schema.optionalKey(Schema.String), "interval": Schema.optionalKey(Duration), "name": Schema.optionalKey(Schema.String), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "rules": Schema.optionalKey(Schema.Array(AlertRuleExport)) }).annotate({ "title": "AlertRuleGroupExport is the provisioned file export of AlertRuleGroupV1." })
export type Vector = ReadonlyArray<Sample>
export const Vector = Schema.Array(Sample).annotate({ "description": "Vector is basically only an alias for []Sample, but the contract is that\nin a Vector, all Samples have the same timestamp." })
export type DataLink = { readonly "internal"?: InternalDataLink, readonly "targetBlank"?: boolean, readonly "title"?: string, readonly "url"?: string }
export const DataLink = Schema.Struct({ "internal": Schema.optionalKey(InternalDataLink), "targetBlank": Schema.optionalKey(Schema.Boolean), "title": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String) }).annotate({ "description": "DataLink define what" })
export type HTTPClientConfig = { readonly "authorization"?: Authorization, readonly "basic_auth"?: BasicAuth, readonly "bearer_token"?: Secret, readonly "bearer_token_file"?: string, readonly "enable_http2"?: boolean, readonly "follow_redirects"?: boolean, readonly "http_headers"?: Headers, readonly "no_proxy"?: string, readonly "oauth2"?: OAuth2, readonly "proxy_connect_header"?: ProxyHeader, readonly "proxy_from_environment"?: boolean, readonly "proxy_url"?: URL, readonly "tls_config"?: TLSConfig }
export const HTTPClientConfig = Schema.Struct({ "authorization": Schema.optionalKey(Authorization), "basic_auth": Schema.optionalKey(BasicAuth), "bearer_token": Schema.optionalKey(Secret), "bearer_token_file": Schema.optionalKey(Schema.String.annotate({ "description": "The bearer token file for the targets. Deprecated in favour of\nAuthorization.CredentialsFile." })), "enable_http2": Schema.optionalKey(Schema.Boolean.annotate({ "description": "EnableHTTP2 specifies whether the client should configure HTTP2.\nThe omitempty flag is not set, because it would be hidden from the\nmarshalled configuration when set to false." })), "follow_redirects": Schema.optionalKey(Schema.Boolean.annotate({ "description": "FollowRedirects specifies whether the client should follow HTTP 3xx redirects.\nThe omitempty flag is not set, because it would be hidden from the\nmarshalled configuration when set to false." })), "http_headers": Schema.optionalKey(Headers), "no_proxy": Schema.optionalKey(Schema.String.annotate({ "description": "NoProxy contains addresses that should not use a proxy." })), "oauth2": Schema.optionalKey(OAuth2), "proxy_connect_header": Schema.optionalKey(ProxyHeader), "proxy_from_environment": Schema.optionalKey(Schema.Boolean.annotate({ "description": "ProxyFromEnvironment makes use of net/http ProxyFromEnvironment function\nto determine proxies." })), "proxy_url": Schema.optionalKey(URL), "tls_config": Schema.optionalKey(TLSConfig) }).annotate({ "title": "HTTPClientConfig configures an HTTP client." })
export type Correlation = { readonly "config"?: CorrelationConfig, readonly "description"?: string, readonly "label"?: string, readonly "orgId"?: number, readonly "provisioned"?: boolean, readonly "sourceUID"?: string, readonly "targetUID"?: string, readonly "type"?: CorrelationType, readonly "uid"?: string }
export const Correlation = Schema.Struct({ "config": Schema.optionalKey(CorrelationConfig), "description": Schema.optionalKey(Schema.String.annotate({ "description": "Description of the correlation", "examples": ["Logs to Traces"] })), "label": Schema.optionalKey(Schema.String.annotate({ "description": "Label identifying the correlation", "examples": ["My Label"] })), "orgId": Schema.optionalKey(Schema.Number.annotate({ "description": "OrgID of the data source the correlation originates from", "examples": [1], "format": "int64" }).check(Schema.isInt())), "provisioned": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Provisioned True if the correlation was created during provisioning" })), "sourceUID": Schema.optionalKey(Schema.String.annotate({ "description": "UID of the data source the correlation originates from", "examples": ["d0oxYRg4z"] })), "targetUID": Schema.optionalKey(Schema.String.annotate({ "description": "UID of the data source the correlation points to", "examples": ["PE1C5CBDA0504A6A3"] })), "type": Schema.optionalKey(CorrelationType), "uid": Schema.optionalKey(Schema.String.annotate({ "description": "Unique identifier of the correlation", "examples": ["50xhMlg9k"] })) }).annotate({ "description": "Correlation is the model for correlations definitions" })
export type GettableExtendedRuleNode = { readonly "alert"?: string, readonly "annotations"?: { readonly [x: string]: string }, readonly "expr"?: string, readonly "for"?: string, readonly "grafana_alert"?: GettableGrafanaRule, readonly "keep_firing_for"?: string, readonly "labels"?: { readonly [x: string]: string }, readonly "record"?: string }
export const GettableExtendedRuleNode = Schema.Struct({ "alert": Schema.optionalKey(Schema.String), "annotations": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "expr": Schema.optionalKey(Schema.String), "for": Schema.optionalKey(Schema.String), "grafana_alert": Schema.optionalKey(GettableGrafanaRule), "keep_firing_for": Schema.optionalKey(Schema.String), "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "record": Schema.optionalKey(Schema.String) })
export type PostableExtendedRuleNode = { readonly "alert"?: string, readonly "annotations"?: { readonly [x: string]: string }, readonly "expr"?: string, readonly "for"?: string, readonly "grafana_alert"?: PostableGrafanaRule, readonly "keep_firing_for"?: string, readonly "labels"?: { readonly [x: string]: string }, readonly "record"?: string }
export const PostableExtendedRuleNode = Schema.Struct({ "alert": Schema.optionalKey(Schema.String), "annotations": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "expr": Schema.optionalKey(Schema.String), "for": Schema.optionalKey(Schema.String), "grafana_alert": Schema.optionalKey(PostableGrafanaRule), "keep_firing_for": Schema.optionalKey(Schema.String), "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "record": Schema.optionalKey(Schema.String) })
export type AlertRuleGroup = { readonly "folderUid"?: string, readonly "interval"?: number, readonly "rules"?: ReadonlyArray<ProvisionedAlertRule>, readonly "title"?: string }
export const AlertRuleGroup = Schema.Struct({ "folderUid": Schema.optionalKey(Schema.String), "interval": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "rules": Schema.optionalKey(Schema.Array(ProvisionedAlertRule)), "title": Schema.optionalKey(Schema.String) })
export type ProvisionedAlertRules = ReadonlyArray<ProvisionedAlertRule>
export const ProvisionedAlertRules = Schema.Array(ProvisionedAlertRule)
export type RuleGroup = { readonly "evaluationTime"?: number, readonly "file": string, readonly "folderUid": string, readonly "interval": number, readonly "lastEvaluation"?: string, readonly "name": string, readonly "rules": ReadonlyArray<AlertingRule>, readonly "totals"?: { readonly [x: string]: number } }
export const RuleGroup = Schema.Struct({ "evaluationTime": Schema.optionalKey(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())), "file": Schema.String, "folderUid": Schema.String, "interval": Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite()), "lastEvaluation": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "name": Schema.String, "rules": Schema.Array(AlertingRule).annotate({ "description": "In order to preserve rule ordering, while exposing type (alerting or recording)\nspecific properties, both alerting and recording rules are exposed in the\nsame array." }), "totals": Schema.optionalKey(Schema.Record(Schema.String, Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))) })
export type LibraryElementSearchResponse = { readonly "result"?: LibraryElementSearchResult }
export const LibraryElementSearchResponse = Schema.Struct({ "result": Schema.optionalKey(LibraryElementSearchResult) }).annotate({ "title": "LibraryElementSearchResponse is a response struct for LibraryElementSearchResult." })
export type JSONWebKey = { readonly "Algorithm"?: string, readonly "CertificateThumbprintSHA1"?: ReadonlyArray<number>, readonly "CertificateThumbprintSHA256"?: ReadonlyArray<number>, readonly "Certificates"?: ReadonlyArray<Certificate>, readonly "CertificatesURL"?: URL, readonly "Key"?: Schema.Json, readonly "KeyID"?: string, readonly "Use"?: string }
export const JSONWebKey = Schema.Struct({ "Algorithm": Schema.optionalKey(Schema.String.annotate({ "description": "Key algorithm, parsed from `alg` header." })), "CertificateThumbprintSHA1": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt())).annotate({ "description": "X.509 certificate thumbprint (SHA-1), parsed from `x5t` header." })), "CertificateThumbprintSHA256": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt())).annotate({ "description": "X.509 certificate thumbprint (SHA-256), parsed from `x5t#S256` header." })), "Certificates": Schema.optionalKey(Schema.Array(Certificate).annotate({ "description": "X.509 certificate chain, parsed from `x5c` header." })), "CertificatesURL": Schema.optionalKey(URL), "Key": Schema.optionalKey(Schema.Json.annotate({ "description": "Key is the Go in-memory representation of this key. It must have one\nof these types:\ned25519.PublicKey\ned25519.PrivateKey\necdsa.PublicKey\necdsa.PrivateKey\nrsa.PublicKey\nrsa.PrivateKey\n[]byte (a symmetric key)\n\nWhen marshaling this JSONWebKey into JSON, the \"kty\" header parameter\nwill be automatically set based on the type of this field." })), "KeyID": Schema.optionalKey(Schema.String.annotate({ "description": "Key identifier, parsed from `kid` header." })), "Use": Schema.optionalKey(Schema.String.annotate({ "description": "Key use, parsed from `use` header." })) }).annotate({ "description": "JSONWebKey represents a public or private key in JWK format. It can be\nmarshaled into JSON and unmarshaled from JSON." })
export type AlertingFileExport = { readonly "apiVersion"?: number, readonly "contactPoints"?: ReadonlyArray<ContactPointExport>, readonly "groups"?: ReadonlyArray<AlertRuleGroupExport>, readonly "muteTimes"?: ReadonlyArray<MuteTimeIntervalExport>, readonly "policies"?: ReadonlyArray<NotificationPolicyExport> }
export const AlertingFileExport = Schema.Struct({ "apiVersion": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "contactPoints": Schema.optionalKey(Schema.Array(ContactPointExport)), "groups": Schema.optionalKey(Schema.Array(AlertRuleGroupExport)), "muteTimes": Schema.optionalKey(Schema.Array(MuteTimeIntervalExport)), "policies": Schema.optionalKey(Schema.Array(NotificationPolicyExport)) }).annotate({ "title": "AlertingFileExport is the full provisioned file export." })
export type FieldConfig = { readonly "color"?: { readonly [x: string]: Schema.Json }, readonly "custom"?: { readonly [x: string]: Schema.Json }, readonly "decimals"?: number, readonly "description"?: string, readonly "displayName"?: string, readonly "displayNameFromDS"?: string, readonly "filterable"?: boolean, readonly "interval"?: number, readonly "links"?: ReadonlyArray<DataLink>, readonly "mappings"?: ValueMappings, readonly "max"?: ConfFloat64, readonly "min"?: ConfFloat64, readonly "noValue"?: string, readonly "path"?: string, readonly "thresholds"?: ThresholdsConfig, readonly "type"?: FieldTypeConfig, readonly "unit"?: string, readonly "writeable"?: boolean }
export const FieldConfig = Schema.Struct({ "color": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json).annotate({ "description": "Map values to a display color\nNOTE: this interface is under development in the frontend... so simple map for now" })), "custom": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json).annotate({ "description": "Panel Specific Values" })), "decimals": Schema.optionalKey(Schema.Number.annotate({ "format": "uint16" }).check(Schema.isInt())), "description": Schema.optionalKey(Schema.String.annotate({ "description": "Description is human readable field metadata" })), "displayName": Schema.optionalKey(Schema.String.annotate({ "description": "DisplayName overrides Grafana default naming, should not be used from a data source" })), "displayNameFromDS": Schema.optionalKey(Schema.String.annotate({ "description": "DisplayNameFromDS overrides Grafana default naming strategy." })), "filterable": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Filterable indicates if the Field's data can be filtered by additional calls." })), "interval": Schema.optionalKey(Schema.Number.annotate({ "description": "Interval indicates the expected regular step between values in the series.\nWhen an interval exists, consumers can identify \"missing\" values when the expected value is not present.\nThe grafana timeseries visualization will render disconnected values when missing values are found it the time field.\nThe interval uses the same units as the values.  For time.Time, this is defined in milliseconds.", "format": "double" }).check(Schema.isFinite())), "links": Schema.optionalKey(Schema.Array(DataLink).annotate({ "description": "The behavior when clicking on a result" })), "mappings": Schema.optionalKey(ValueMappings), "max": Schema.optionalKey(ConfFloat64), "min": Schema.optionalKey(ConfFloat64), "noValue": Schema.optionalKey(Schema.String.annotate({ "description": "Alternative to empty string" })), "path": Schema.optionalKey(Schema.String.annotate({ "description": "Path is an explicit path to the field in the datasource. When the frame meta includes a path,\nthis will default to `${frame.meta.path}/${field.name}\n\nWhen defined, this value can be used as an identifier within the datasource scope, and\nmay be used as an identifier to update values in a subsequent request" })), "thresholds": Schema.optionalKey(ThresholdsConfig), "type": Schema.optionalKey(FieldTypeConfig), "unit": Schema.optionalKey(Schema.String.annotate({ "description": "Numeric Options" })), "writeable": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Writeable indicates that the datasource knows how to update this value" })) }).annotate({ "title": "FieldConfig represents the display properties for a Field." })
export type QueryStat = { readonly "color"?: { readonly [x: string]: Schema.Json }, readonly "custom"?: { readonly [x: string]: Schema.Json }, readonly "decimals"?: number, readonly "description"?: string, readonly "displayName"?: string, readonly "displayNameFromDS"?: string, readonly "filterable"?: boolean, readonly "interval"?: number, readonly "links"?: ReadonlyArray<DataLink>, readonly "mappings"?: ValueMappings, readonly "max"?: ConfFloat64, readonly "min"?: ConfFloat64, readonly "noValue"?: string, readonly "path"?: string, readonly "thresholds"?: ThresholdsConfig, readonly "type"?: FieldTypeConfig, readonly "unit"?: string, readonly "value"?: number, readonly "writeable"?: boolean }
export const QueryStat = Schema.Struct({ "color": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json).annotate({ "description": "Map values to a display color\nNOTE: this interface is under development in the frontend... so simple map for now" })), "custom": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json).annotate({ "description": "Panel Specific Values" })), "decimals": Schema.optionalKey(Schema.Number.annotate({ "format": "uint16" }).check(Schema.isInt())), "description": Schema.optionalKey(Schema.String.annotate({ "description": "Description is human readable field metadata" })), "displayName": Schema.optionalKey(Schema.String.annotate({ "description": "DisplayName overrides Grafana default naming, should not be used from a data source" })), "displayNameFromDS": Schema.optionalKey(Schema.String.annotate({ "description": "DisplayNameFromDS overrides Grafana default naming strategy." })), "filterable": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Filterable indicates if the Field's data can be filtered by additional calls." })), "interval": Schema.optionalKey(Schema.Number.annotate({ "description": "Interval indicates the expected regular step between values in the series.\nWhen an interval exists, consumers can identify \"missing\" values when the expected value is not present.\nThe grafana timeseries visualization will render disconnected values when missing values are found it the time field.\nThe interval uses the same units as the values.  For time.Time, this is defined in milliseconds.", "format": "double" }).check(Schema.isFinite())), "links": Schema.optionalKey(Schema.Array(DataLink).annotate({ "description": "The behavior when clicking on a result" })), "mappings": Schema.optionalKey(ValueMappings), "max": Schema.optionalKey(ConfFloat64), "min": Schema.optionalKey(ConfFloat64), "noValue": Schema.optionalKey(Schema.String.annotate({ "description": "Alternative to empty string" })), "path": Schema.optionalKey(Schema.String.annotate({ "description": "Path is an explicit path to the field in the datasource. When the frame meta includes a path,\nthis will default to `${frame.meta.path}/${field.name}\n\nWhen defined, this value can be used as an identifier within the datasource scope, and\nmay be used as an identifier to update values in a subsequent request" })), "thresholds": Schema.optionalKey(ThresholdsConfig), "type": Schema.optionalKey(FieldTypeConfig), "unit": Schema.optionalKey(Schema.String.annotate({ "description": "Numeric Options" })), "value": Schema.optionalKey(Schema.Number.annotate({ "format": "double" }).check(Schema.isFinite())), "writeable": Schema.optionalKey(Schema.Boolean.annotate({ "description": "Writeable indicates that the datasource knows how to update this value" })) }).annotate({ "title": "QueryStat is used for storing arbitrary statistics metadata related to a query and its result, e.g. total request time, data processing time.", "description": "The embedded FieldConfig's display name must be set.\nIt corresponds to the QueryResultMetaStat on the frontend (https://github.com/grafana/grafana/blob/master/packages/grafana-data/src/types/data.ts#L53)." })
export type DiscordConfig = { readonly "http_config"?: HTTPClientConfig, readonly "message"?: string, readonly "send_resolved"?: boolean, readonly "title"?: string, readonly "webhook_url"?: SecretURL, readonly "webhook_url_file"?: string }
export const DiscordConfig = Schema.Struct({ "http_config": Schema.optionalKey(HTTPClientConfig), "message": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "title": Schema.optionalKey(Schema.String), "webhook_url": Schema.optionalKey(SecretURL), "webhook_url_file": Schema.optionalKey(Schema.String) }).annotate({ "title": "DiscordConfig configures notifications via Discord." })
export type GlobalConfig = { readonly "http_config"?: HTTPClientConfig, readonly "jira_api_url"?: URL, readonly "opsgenie_api_key"?: Secret, readonly "opsgenie_api_key_file"?: string, readonly "opsgenie_api_url"?: URL, readonly "pagerduty_url"?: URL, readonly "resolve_timeout"?: Duration, readonly "slack_api_url"?: SecretURL, readonly "slack_api_url_file"?: string, readonly "smtp_auth_identity"?: string, readonly "smtp_auth_password"?: Secret, readonly "smtp_auth_password_file"?: string, readonly "smtp_auth_secret"?: Secret, readonly "smtp_auth_username"?: string, readonly "smtp_from"?: string, readonly "smtp_hello"?: string, readonly "smtp_require_tls"?: boolean, readonly "smtp_smarthost"?: HostPort, readonly "smtp_tls_config"?: TLSConfig, readonly "telegram_api_url"?: URL, readonly "victorops_api_key"?: Secret, readonly "victorops_api_key_file"?: string, readonly "victorops_api_url"?: URL, readonly "webex_api_url"?: URL, readonly "wechat_api_corp_id"?: string, readonly "wechat_api_secret"?: Secret, readonly "wechat_api_url"?: URL }
export const GlobalConfig = Schema.Struct({ "http_config": Schema.optionalKey(HTTPClientConfig), "jira_api_url": Schema.optionalKey(URL), "opsgenie_api_key": Schema.optionalKey(Secret), "opsgenie_api_key_file": Schema.optionalKey(Schema.String), "opsgenie_api_url": Schema.optionalKey(URL), "pagerduty_url": Schema.optionalKey(URL), "resolve_timeout": Schema.optionalKey(Duration), "slack_api_url": Schema.optionalKey(SecretURL), "slack_api_url_file": Schema.optionalKey(Schema.String), "smtp_auth_identity": Schema.optionalKey(Schema.String), "smtp_auth_password": Schema.optionalKey(Secret), "smtp_auth_password_file": Schema.optionalKey(Schema.String), "smtp_auth_secret": Schema.optionalKey(Secret), "smtp_auth_username": Schema.optionalKey(Schema.String), "smtp_from": Schema.optionalKey(Schema.String), "smtp_hello": Schema.optionalKey(Schema.String), "smtp_require_tls": Schema.optionalKey(Schema.Boolean), "smtp_smarthost": Schema.optionalKey(HostPort), "smtp_tls_config": Schema.optionalKey(TLSConfig), "telegram_api_url": Schema.optionalKey(URL), "victorops_api_key": Schema.optionalKey(Secret), "victorops_api_key_file": Schema.optionalKey(Schema.String), "victorops_api_url": Schema.optionalKey(URL), "webex_api_url": Schema.optionalKey(URL), "wechat_api_corp_id": Schema.optionalKey(Schema.String), "wechat_api_secret": Schema.optionalKey(Secret), "wechat_api_url": Schema.optionalKey(URL) }).annotate({ "description": "GlobalConfig defines configuration parameters that are valid globally\nunless overwritten." })
export type JiraConfig = { readonly "api_url"?: URL, readonly "custom_fields"?: { readonly [x: string]: Schema.Json }, readonly "description"?: string, readonly "http_config"?: HTTPClientConfig, readonly "issue_type"?: string, readonly "labels"?: ReadonlyArray<string>, readonly "priority"?: string, readonly "project"?: string, readonly "reopen_duration"?: Duration, readonly "reopen_transition"?: string, readonly "resolve_transition"?: string, readonly "send_resolved"?: boolean, readonly "summary"?: string, readonly "wont_fix_resolution"?: string }
export const JiraConfig = Schema.Struct({ "api_url": Schema.optionalKey(URL), "custom_fields": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json)), "description": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(HTTPClientConfig), "issue_type": Schema.optionalKey(Schema.String), "labels": Schema.optionalKey(Schema.Array(Schema.String)), "priority": Schema.optionalKey(Schema.String), "project": Schema.optionalKey(Schema.String), "reopen_duration": Schema.optionalKey(Duration), "reopen_transition": Schema.optionalKey(Schema.String), "resolve_transition": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "summary": Schema.optionalKey(Schema.String), "wont_fix_resolution": Schema.optionalKey(Schema.String) })
export type MSTeamsConfig = { readonly "http_config"?: HTTPClientConfig, readonly "send_resolved"?: boolean, readonly "summary"?: string, readonly "text"?: string, readonly "title"?: string, readonly "webhook_url"?: SecretURL, readonly "webhook_url_file"?: string }
export const MSTeamsConfig = Schema.Struct({ "http_config": Schema.optionalKey(HTTPClientConfig), "send_resolved": Schema.optionalKey(Schema.Boolean), "summary": Schema.optionalKey(Schema.String), "text": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "webhook_url": Schema.optionalKey(SecretURL), "webhook_url_file": Schema.optionalKey(Schema.String) })
export type MSTeamsV2Config = { readonly "http_config"?: HTTPClientConfig, readonly "send_resolved"?: boolean, readonly "text"?: string, readonly "title"?: string, readonly "webhook_url"?: SecretURL, readonly "webhook_url_file"?: string }
export const MSTeamsV2Config = Schema.Struct({ "http_config": Schema.optionalKey(HTTPClientConfig), "send_resolved": Schema.optionalKey(Schema.Boolean), "text": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "webhook_url": Schema.optionalKey(SecretURL), "webhook_url_file": Schema.optionalKey(Schema.String) })
export type OpsGenieConfig = { readonly "actions"?: string, readonly "api_key"?: Secret, readonly "api_key_file"?: string, readonly "api_url"?: URL, readonly "description"?: string, readonly "details"?: { readonly [x: string]: string }, readonly "entity"?: string, readonly "http_config"?: HTTPClientConfig, readonly "message"?: string, readonly "note"?: string, readonly "priority"?: string, readonly "responders"?: ReadonlyArray<OpsGenieConfigResponder>, readonly "send_resolved"?: boolean, readonly "source"?: string, readonly "tags"?: string, readonly "update_alerts"?: boolean }
export const OpsGenieConfig = Schema.Struct({ "actions": Schema.optionalKey(Schema.String), "api_key": Schema.optionalKey(Secret), "api_key_file": Schema.optionalKey(Schema.String), "api_url": Schema.optionalKey(URL), "description": Schema.optionalKey(Schema.String), "details": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "entity": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(HTTPClientConfig), "message": Schema.optionalKey(Schema.String), "note": Schema.optionalKey(Schema.String), "priority": Schema.optionalKey(Schema.String), "responders": Schema.optionalKey(Schema.Array(OpsGenieConfigResponder)), "send_resolved": Schema.optionalKey(Schema.Boolean), "source": Schema.optionalKey(Schema.String), "tags": Schema.optionalKey(Schema.String), "update_alerts": Schema.optionalKey(Schema.Boolean) }).annotate({ "title": "OpsGenieConfig configures notifications via OpsGenie." })
export type PagerdutyConfig = { readonly "class"?: string, readonly "client"?: string, readonly "client_url"?: string, readonly "component"?: string, readonly "description"?: string, readonly "details"?: { readonly [x: string]: string }, readonly "group"?: string, readonly "http_config"?: HTTPClientConfig, readonly "images"?: ReadonlyArray<PagerdutyImage>, readonly "links"?: ReadonlyArray<PagerdutyLink>, readonly "routing_key"?: Secret, readonly "routing_key_file"?: string, readonly "send_resolved"?: boolean, readonly "service_key"?: Secret, readonly "service_key_file"?: string, readonly "severity"?: string, readonly "source"?: string, readonly "url"?: URL }
export const PagerdutyConfig = Schema.Struct({ "class": Schema.optionalKey(Schema.String), "client": Schema.optionalKey(Schema.String), "client_url": Schema.optionalKey(Schema.String), "component": Schema.optionalKey(Schema.String), "description": Schema.optionalKey(Schema.String), "details": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "group": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(HTTPClientConfig), "images": Schema.optionalKey(Schema.Array(PagerdutyImage)), "links": Schema.optionalKey(Schema.Array(PagerdutyLink)), "routing_key": Schema.optionalKey(Secret), "routing_key_file": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "service_key": Schema.optionalKey(Secret), "service_key_file": Schema.optionalKey(Schema.String), "severity": Schema.optionalKey(Schema.String), "source": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(URL) }).annotate({ "title": "PagerdutyConfig configures notifications via PagerDuty." })
export type PushoverConfig = { readonly "device"?: string, readonly "expire"?: string, readonly "html"?: boolean, readonly "http_config"?: HTTPClientConfig, readonly "message"?: string, readonly "priority"?: string, readonly "retry"?: string, readonly "send_resolved"?: boolean, readonly "sound"?: string, readonly "title"?: string, readonly "token"?: Secret, readonly "token_file"?: string, readonly "ttl"?: string, readonly "url"?: string, readonly "url_title"?: string, readonly "user_key"?: Secret, readonly "user_key_file"?: string }
export const PushoverConfig = Schema.Struct({ "device": Schema.optionalKey(Schema.String), "expire": Schema.optionalKey(Schema.String), "html": Schema.optionalKey(Schema.Boolean), "http_config": Schema.optionalKey(HTTPClientConfig), "message": Schema.optionalKey(Schema.String), "priority": Schema.optionalKey(Schema.String), "retry": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "sound": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "token": Schema.optionalKey(Secret), "token_file": Schema.optionalKey(Schema.String), "ttl": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "url_title": Schema.optionalKey(Schema.String), "user_key": Schema.optionalKey(Secret), "user_key_file": Schema.optionalKey(Schema.String) })
export type SNSConfig = { readonly "api_url"?: string, readonly "attributes"?: { readonly [x: string]: string }, readonly "http_config"?: HTTPClientConfig, readonly "message"?: string, readonly "phone_number"?: string, readonly "send_resolved"?: boolean, readonly "sigv4"?: SigV4Config, readonly "subject"?: string, readonly "target_arn"?: string, readonly "topic_arn"?: string }
export const SNSConfig = Schema.Struct({ "api_url": Schema.optionalKey(Schema.String), "attributes": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "http_config": Schema.optionalKey(HTTPClientConfig), "message": Schema.optionalKey(Schema.String), "phone_number": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "sigv4": Schema.optionalKey(SigV4Config), "subject": Schema.optionalKey(Schema.String), "target_arn": Schema.optionalKey(Schema.String), "topic_arn": Schema.optionalKey(Schema.String) })
export type SlackConfig = { readonly "actions"?: ReadonlyArray<SlackAction>, readonly "api_url"?: SecretURL, readonly "api_url_file"?: string, readonly "callback_id"?: string, readonly "channel"?: string, readonly "color"?: string, readonly "fallback"?: string, readonly "fields"?: ReadonlyArray<SlackField>, readonly "footer"?: string, readonly "http_config"?: HTTPClientConfig, readonly "icon_emoji"?: string, readonly "icon_url"?: string, readonly "image_url"?: string, readonly "link_names"?: boolean, readonly "mrkdwn_in"?: ReadonlyArray<string>, readonly "pretext"?: string, readonly "send_resolved"?: boolean, readonly "short_fields"?: boolean, readonly "text"?: string, readonly "thumb_url"?: string, readonly "title"?: string, readonly "title_link"?: string, readonly "username"?: string }
export const SlackConfig = Schema.Struct({ "actions": Schema.optionalKey(Schema.Array(SlackAction)), "api_url": Schema.optionalKey(SecretURL), "api_url_file": Schema.optionalKey(Schema.String), "callback_id": Schema.optionalKey(Schema.String), "channel": Schema.optionalKey(Schema.String.annotate({ "description": "Slack channel override, (like #other-channel or @username)." })), "color": Schema.optionalKey(Schema.String), "fallback": Schema.optionalKey(Schema.String), "fields": Schema.optionalKey(Schema.Array(SlackField)), "footer": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(HTTPClientConfig), "icon_emoji": Schema.optionalKey(Schema.String), "icon_url": Schema.optionalKey(Schema.String), "image_url": Schema.optionalKey(Schema.String), "link_names": Schema.optionalKey(Schema.Boolean), "mrkdwn_in": Schema.optionalKey(Schema.Array(Schema.String)), "pretext": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "short_fields": Schema.optionalKey(Schema.Boolean), "text": Schema.optionalKey(Schema.String), "thumb_url": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "title_link": Schema.optionalKey(Schema.String), "username": Schema.optionalKey(Schema.String) }).annotate({ "title": "SlackConfig configures notifications via Slack." })
export type TelegramConfig = { readonly "api_url"?: URL, readonly "chat"?: number, readonly "disable_notifications"?: boolean, readonly "http_config"?: HTTPClientConfig, readonly "message"?: string, readonly "parse_mode"?: string, readonly "send_resolved"?: boolean, readonly "token"?: Secret, readonly "token_file"?: string }
export const TelegramConfig = Schema.Struct({ "api_url": Schema.optionalKey(URL), "chat": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "disable_notifications": Schema.optionalKey(Schema.Boolean), "http_config": Schema.optionalKey(HTTPClientConfig), "message": Schema.optionalKey(Schema.String), "parse_mode": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "token": Schema.optionalKey(Secret), "token_file": Schema.optionalKey(Schema.String) }).annotate({ "title": "TelegramConfig configures notifications via Telegram." })
export type VictorOpsConfig = { readonly "api_key"?: Secret, readonly "api_key_file"?: string, readonly "api_url"?: URL, readonly "custom_fields"?: { readonly [x: string]: string }, readonly "entity_display_name"?: string, readonly "http_config"?: HTTPClientConfig, readonly "message_type"?: string, readonly "monitoring_tool"?: string, readonly "routing_key"?: string, readonly "send_resolved"?: boolean, readonly "state_message"?: string }
export const VictorOpsConfig = Schema.Struct({ "api_key": Schema.optionalKey(Secret), "api_key_file": Schema.optionalKey(Schema.String), "api_url": Schema.optionalKey(URL), "custom_fields": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "entity_display_name": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(HTTPClientConfig), "message_type": Schema.optionalKey(Schema.String), "monitoring_tool": Schema.optionalKey(Schema.String), "routing_key": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "state_message": Schema.optionalKey(Schema.String) }).annotate({ "title": "VictorOpsConfig configures notifications via VictorOps." })
export type WebexConfig = { readonly "api_url"?: URL, readonly "http_config"?: HTTPClientConfig, readonly "message"?: string, readonly "room_id"?: string, readonly "send_resolved"?: boolean }
export const WebexConfig = Schema.Struct({ "api_url": Schema.optionalKey(URL), "http_config": Schema.optionalKey(HTTPClientConfig), "message": Schema.optionalKey(Schema.String), "room_id": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean) }).annotate({ "title": "WebexConfig configures notifications via Webex." })
export type WebhookConfig = { readonly "http_config"?: HTTPClientConfig, readonly "max_alerts"?: number, readonly "send_resolved"?: boolean, readonly "timeout"?: Duration, readonly "url"?: SecretURL, readonly "url_file"?: string }
export const WebhookConfig = Schema.Struct({ "http_config": Schema.optionalKey(HTTPClientConfig), "max_alerts": Schema.optionalKey(Schema.Number.annotate({ "description": "MaxAlerts is the maximum number of alerts to be sent per webhook message.\nAlerts exceeding this threshold will be truncated. Setting this to 0\nallows an unlimited number of alerts.", "format": "uint64" }).check(Schema.isInt())), "send_resolved": Schema.optionalKey(Schema.Boolean), "timeout": Schema.optionalKey(Duration), "url": Schema.optionalKey(SecretURL), "url_file": Schema.optionalKey(Schema.String) }).annotate({ "title": "WebhookConfig configures notifications via a generic webhook." })
export type WechatConfig = { readonly "agent_id"?: string, readonly "api_secret"?: Secret, readonly "api_url"?: URL, readonly "corp_id"?: string, readonly "http_config"?: HTTPClientConfig, readonly "message"?: string, readonly "message_type"?: string, readonly "send_resolved"?: boolean, readonly "to_party"?: string, readonly "to_tag"?: string, readonly "to_user"?: string }
export const WechatConfig = Schema.Struct({ "agent_id": Schema.optionalKey(Schema.String), "api_secret": Schema.optionalKey(Secret), "api_url": Schema.optionalKey(URL), "corp_id": Schema.optionalKey(Schema.String), "http_config": Schema.optionalKey(HTTPClientConfig), "message": Schema.optionalKey(Schema.String), "message_type": Schema.optionalKey(Schema.String), "send_resolved": Schema.optionalKey(Schema.Boolean), "to_party": Schema.optionalKey(Schema.String), "to_tag": Schema.optionalKey(Schema.String), "to_user": Schema.optionalKey(Schema.String) }).annotate({ "title": "WechatConfig configures notifications via Wechat." })
export type GettableRuleGroupConfig = { readonly "align_evaluation_time_on_interval"?: boolean, readonly "evaluation_delay"?: string, readonly "interval"?: Duration, readonly "labels"?: { readonly [x: string]: string }, readonly "limit"?: number, readonly "name"?: string, readonly "query_offset"?: string, readonly "remote_write"?: ReadonlyArray<RemoteWriteConfig>, readonly "rules"?: ReadonlyArray<GettableExtendedRuleNode>, readonly "source_tenants"?: ReadonlyArray<string> }
export const GettableRuleGroupConfig = Schema.Struct({ "align_evaluation_time_on_interval": Schema.optionalKey(Schema.Boolean), "evaluation_delay": Schema.optionalKey(Schema.String), "interval": Schema.optionalKey(Duration), "labels": Schema.optionalKey(Schema.Record(Schema.String, Schema.String)), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "name": Schema.optionalKey(Schema.String), "query_offset": Schema.optionalKey(Schema.String), "remote_write": Schema.optionalKey(Schema.Array(RemoteWriteConfig)), "rules": Schema.optionalKey(Schema.Array(GettableExtendedRuleNode)), "source_tenants": Schema.optionalKey(Schema.Array(Schema.String)) })
export type RuleDiscovery = { readonly "groupNextToken"?: string, readonly "groups": ReadonlyArray<RuleGroup>, readonly "totals"?: { readonly [x: string]: number } }
export const RuleDiscovery = Schema.Struct({ "groupNextToken": Schema.optionalKey(Schema.String), "groups": Schema.Array(RuleGroup), "totals": Schema.optionalKey(Schema.Record(Schema.String, Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))) })
export type Field = { readonly "config"?: FieldConfig, readonly "labels"?: FrameLabels, readonly "name"?: string }
export const Field = Schema.Struct({ "config": Schema.optionalKey(FieldConfig), "labels": Schema.optionalKey(FrameLabels), "name": Schema.optionalKey(Schema.String.annotate({ "description": "Name is default identifier of the field. The name does not have to be unique, but the combination\nof name and Labels should be unique for proper behavior in all situations." })) }).annotate({ "title": "Field represents a typed column of data within a Frame.", "description": "A Field is essentially a slice of various types with extra properties and methods.\nSee NewField() for supported types.\n\nThe slice data in the Field is a not exported, so methods on the Field are used to to manipulate its data." })
export type FrameMeta = { readonly "channel"?: string, readonly "custom"?: Schema.Json, readonly "dataTopic"?: DataTopic, readonly "executedQueryString"?: string, readonly "notices"?: ReadonlyArray<Notice>, readonly "path"?: string, readonly "pathSeparator"?: string, readonly "preferredVisualisationPluginId"?: string, readonly "preferredVisualisationType"?: VisType, readonly "stats"?: ReadonlyArray<QueryStat>, readonly "type"?: FrameType, readonly "typeVersion"?: FrameTypeVersion, readonly "uniqueRowIdFields"?: ReadonlyArray<number> }
export const FrameMeta = Schema.Struct({ "channel": Schema.optionalKey(Schema.String.annotate({ "description": "Channel is the path to a stream in grafana live that has real-time updates for this data." })), "custom": Schema.optionalKey(Schema.Json.annotate({ "description": "Custom datasource specific values." })), "dataTopic": Schema.optionalKey(DataTopic), "executedQueryString": Schema.optionalKey(Schema.String.annotate({ "description": "ExecutedQueryString is the raw query sent to the underlying system. All macros and templating\nhave been applied.  When metadata contains this value, it will be shown in the query inspector." })), "notices": Schema.optionalKey(Schema.Array(Notice).annotate({ "description": "Notices provide additional information about the data in the Frame that\nGrafana can display to the user in the user interface." })), "path": Schema.optionalKey(Schema.String.annotate({ "description": "Path is a browsable path on the datasource." })), "pathSeparator": Schema.optionalKey(Schema.String.annotate({ "description": "PathSeparator defines the separator pattern to decode a hierarchy. The default separator is '/'." })), "preferredVisualisationPluginId": Schema.optionalKey(Schema.String.annotate({ "description": "PreferredVisualizationPluginId sets the panel plugin id to use to render the data when using Explore. If\nthe plugin cannot be found will fall back to PreferredVisualization." })), "preferredVisualisationType": Schema.optionalKey(VisType), "stats": Schema.optionalKey(Schema.Array(QueryStat).annotate({ "description": "Stats is an array of query result statistics." })), "type": Schema.optionalKey(FrameType), "typeVersion": Schema.optionalKey(FrameTypeVersion), "uniqueRowIdFields": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())).annotate({ "description": "Array of field indices which values create a unique id for each row. Ideally this should be globally unique ID\nbut that isn't guarantied. Should help with keeping track and deduplicating rows in visualizations, especially\nwith streaming data with frequent updates." })) }).annotate({ "title": "FrameMeta matches:", "description": "https://github.com/grafana/grafana/blob/master/packages/grafana-data/src/types/data.ts#L11\nNOTE -- in javascript this can accept any `[key: string]: any;` however\nthis interface only exposes the values we want to be exposed" })
export type Config = { readonly "global"?: GlobalConfig, readonly "inhibit_rules"?: ReadonlyArray<InhibitRule>, readonly "mute_time_intervals"?: ReadonlyArray<MuteTimeInterval>, readonly "route"?: Route, readonly "templates"?: ReadonlyArray<string>, readonly "time_intervals"?: ReadonlyArray<TimeInterval> }
export const Config = Schema.Struct({ "global": Schema.optionalKey(GlobalConfig), "inhibit_rules": Schema.optionalKey(Schema.Array(InhibitRule)), "mute_time_intervals": Schema.optionalKey(Schema.Array(MuteTimeInterval).annotate({ "description": "MuteTimeIntervals is deprecated and will be removed before Alertmanager 1.0." })), "route": Schema.optionalKey(Route), "templates": Schema.optionalKey(Schema.Array(Schema.String)), "time_intervals": Schema.optionalKey(Schema.Array(TimeInterval)) }).annotate({ "title": "Config is the top-level configuration for Alertmanager's config files." })
export type GettableApiReceiver = { readonly "discord_configs"?: ReadonlyArray<DiscordConfig>, readonly "email_configs"?: ReadonlyArray<EmailConfig>, readonly "grafana_managed_receiver_configs"?: ReadonlyArray<GettableGrafanaReceiver>, readonly "jira_configs"?: ReadonlyArray<JiraConfig>, readonly "msteams_configs"?: ReadonlyArray<MSTeamsConfig>, readonly "msteamsv2_configs"?: ReadonlyArray<MSTeamsV2Config>, readonly "name"?: string, readonly "opsgenie_configs"?: ReadonlyArray<OpsGenieConfig>, readonly "pagerduty_configs"?: ReadonlyArray<PagerdutyConfig>, readonly "pushover_configs"?: ReadonlyArray<PushoverConfig>, readonly "slack_configs"?: ReadonlyArray<SlackConfig>, readonly "sns_configs"?: ReadonlyArray<SNSConfig>, readonly "telegram_configs"?: ReadonlyArray<TelegramConfig>, readonly "victorops_configs"?: ReadonlyArray<VictorOpsConfig>, readonly "webex_configs"?: ReadonlyArray<WebexConfig>, readonly "webhook_configs"?: ReadonlyArray<WebhookConfig>, readonly "wechat_configs"?: ReadonlyArray<WechatConfig> }
export const GettableApiReceiver = Schema.Struct({ "discord_configs": Schema.optionalKey(Schema.Array(DiscordConfig)), "email_configs": Schema.optionalKey(Schema.Array(EmailConfig)), "grafana_managed_receiver_configs": Schema.optionalKey(Schema.Array(GettableGrafanaReceiver)), "jira_configs": Schema.optionalKey(Schema.Array(JiraConfig)), "msteams_configs": Schema.optionalKey(Schema.Array(MSTeamsConfig)), "msteamsv2_configs": Schema.optionalKey(Schema.Array(MSTeamsV2Config)), "name": Schema.optionalKey(Schema.String.annotate({ "description": "A unique identifier for this receiver." })), "opsgenie_configs": Schema.optionalKey(Schema.Array(OpsGenieConfig)), "pagerduty_configs": Schema.optionalKey(Schema.Array(PagerdutyConfig)), "pushover_configs": Schema.optionalKey(Schema.Array(PushoverConfig)), "slack_configs": Schema.optionalKey(Schema.Array(SlackConfig)), "sns_configs": Schema.optionalKey(Schema.Array(SNSConfig)), "telegram_configs": Schema.optionalKey(Schema.Array(TelegramConfig)), "victorops_configs": Schema.optionalKey(Schema.Array(VictorOpsConfig)), "webex_configs": Schema.optionalKey(Schema.Array(WebexConfig)), "webhook_configs": Schema.optionalKey(Schema.Array(WebhookConfig)), "wechat_configs": Schema.optionalKey(Schema.Array(WechatConfig)) })
export type PostableApiReceiver = { readonly "discord_configs"?: ReadonlyArray<DiscordConfig>, readonly "email_configs"?: ReadonlyArray<EmailConfig>, readonly "grafana_managed_receiver_configs"?: ReadonlyArray<PostableGrafanaReceiver>, readonly "jira_configs"?: ReadonlyArray<JiraConfig>, readonly "msteams_configs"?: ReadonlyArray<MSTeamsConfig>, readonly "msteamsv2_configs"?: ReadonlyArray<MSTeamsV2Config>, readonly "name"?: string, readonly "opsgenie_configs"?: ReadonlyArray<OpsGenieConfig>, readonly "pagerduty_configs"?: ReadonlyArray<PagerdutyConfig>, readonly "pushover_configs"?: ReadonlyArray<PushoverConfig>, readonly "slack_configs"?: ReadonlyArray<SlackConfig>, readonly "sns_configs"?: ReadonlyArray<SNSConfig>, readonly "telegram_configs"?: ReadonlyArray<TelegramConfig>, readonly "victorops_configs"?: ReadonlyArray<VictorOpsConfig>, readonly "webex_configs"?: ReadonlyArray<WebexConfig>, readonly "webhook_configs"?: ReadonlyArray<WebhookConfig>, readonly "wechat_configs"?: ReadonlyArray<WechatConfig> }
export const PostableApiReceiver = Schema.Struct({ "discord_configs": Schema.optionalKey(Schema.Array(DiscordConfig)), "email_configs": Schema.optionalKey(Schema.Array(EmailConfig)), "grafana_managed_receiver_configs": Schema.optionalKey(Schema.Array(PostableGrafanaReceiver)), "jira_configs": Schema.optionalKey(Schema.Array(JiraConfig)), "msteams_configs": Schema.optionalKey(Schema.Array(MSTeamsConfig)), "msteamsv2_configs": Schema.optionalKey(Schema.Array(MSTeamsV2Config)), "name": Schema.optionalKey(Schema.String.annotate({ "description": "A unique identifier for this receiver." })), "opsgenie_configs": Schema.optionalKey(Schema.Array(OpsGenieConfig)), "pagerduty_configs": Schema.optionalKey(Schema.Array(PagerdutyConfig)), "pushover_configs": Schema.optionalKey(Schema.Array(PushoverConfig)), "slack_configs": Schema.optionalKey(Schema.Array(SlackConfig)), "sns_configs": Schema.optionalKey(Schema.Array(SNSConfig)), "telegram_configs": Schema.optionalKey(Schema.Array(TelegramConfig)), "victorops_configs": Schema.optionalKey(Schema.Array(VictorOpsConfig)), "webex_configs": Schema.optionalKey(Schema.Array(WebexConfig)), "webhook_configs": Schema.optionalKey(Schema.Array(WebhookConfig)), "wechat_configs": Schema.optionalKey(Schema.Array(WechatConfig)) }).annotate({ "description": "nolint:revive" })
export type Frame = { readonly "Fields"?: ReadonlyArray<Field>, readonly "Meta"?: FrameMeta, readonly "Name"?: string, readonly "RefID"?: string }
export const Frame = Schema.Struct({ "Fields": Schema.optionalKey(Schema.Array(Field).annotate({ "description": "Fields are the columns of a frame.\nAll Fields must be of the same the length when marshalling the Frame for transmission.\nThere should be no `nil` entries in the Fields slice (making them pointers was a mistake)." })), "Meta": Schema.optionalKey(FrameMeta), "Name": Schema.optionalKey(Schema.String.annotate({ "description": "Name is used in some Grafana visualizations." })), "RefID": Schema.optionalKey(Schema.String.annotate({ "description": "RefID is a property that can be set to match a Frame to its originating query." })) }).annotate({ "title": "Frame is a columnar data structure where each column is a Field.", "description": "Each Field is well typed by its FieldType and supports optional Labels.\n\nA Frame is a general data container for Grafana. A Frame can be table data\nor time series data depending on its content and field types." })
export type GettableApiAlertingConfig = { readonly "global"?: GlobalConfig, readonly "inhibit_rules"?: ReadonlyArray<InhibitRule>, readonly "muteTimeProvenances"?: { readonly [x: string]: Provenance }, readonly "mute_time_intervals"?: ReadonlyArray<MuteTimeInterval>, readonly "receivers"?: ReadonlyArray<GettableApiReceiver>, readonly "route"?: Route, readonly "templates"?: ReadonlyArray<string>, readonly "time_intervals"?: ReadonlyArray<TimeInterval> }
export const GettableApiAlertingConfig = Schema.Struct({ "global": Schema.optionalKey(GlobalConfig), "inhibit_rules": Schema.optionalKey(Schema.Array(InhibitRule)), "muteTimeProvenances": Schema.optionalKey(Schema.Record(Schema.String, Provenance)), "mute_time_intervals": Schema.optionalKey(Schema.Array(MuteTimeInterval).annotate({ "description": "MuteTimeIntervals is deprecated and will be removed before Alertmanager 1.0." })), "receivers": Schema.optionalKey(Schema.Array(GettableApiReceiver).annotate({ "description": "Override with our superset receiver type" })), "route": Schema.optionalKey(Route), "templates": Schema.optionalKey(Schema.Array(Schema.String)), "time_intervals": Schema.optionalKey(Schema.Array(TimeInterval)) })
export type PostableApiAlertingConfig = { readonly "global"?: GlobalConfig, readonly "inhibit_rules"?: ReadonlyArray<InhibitRule>, readonly "mute_time_intervals"?: ReadonlyArray<MuteTimeInterval>, readonly "receivers"?: ReadonlyArray<PostableApiReceiver>, readonly "route"?: Route, readonly "templates"?: ReadonlyArray<string>, readonly "time_intervals"?: ReadonlyArray<TimeInterval> }
export const PostableApiAlertingConfig = Schema.Struct({ "global": Schema.optionalKey(GlobalConfig), "inhibit_rules": Schema.optionalKey(Schema.Array(InhibitRule)), "mute_time_intervals": Schema.optionalKey(Schema.Array(MuteTimeInterval).annotate({ "description": "MuteTimeIntervals is deprecated and will be removed before Alertmanager 1.0." })), "receivers": Schema.optionalKey(Schema.Array(PostableApiReceiver).annotate({ "description": "Override with our superset receiver type" })), "route": Schema.optionalKey(Route), "templates": Schema.optionalKey(Schema.Array(Schema.String)), "time_intervals": Schema.optionalKey(Schema.Array(TimeInterval)) }).annotate({ "description": "nolint:revive" })
export type Frames = ReadonlyArray<Frame>
export const Frames = Schema.Array(Frame).annotate({ "title": "Frames is a slice of Frame pointers.", "description": "It is the main data container within a backend.DataResponse.\nThere should be no `nil` entries in the Frames slice (making them pointers was a mistake)." })
export type DataResponse = { readonly "Error"?: string, readonly "ErrorSource"?: Source, readonly "Frames"?: Frames, readonly "Status"?: Status }
export const DataResponse = Schema.Struct({ "Error": Schema.optionalKey(Schema.String.annotate({ "description": "Error is a property to be set if the corresponding DataQuery has an error." })), "ErrorSource": Schema.optionalKey(Source), "Frames": Schema.optionalKey(Frames), "Status": Schema.optionalKey(Status) }).annotate({ "title": "DataResponse contains the results from a DataQuery.", "description": "A map of RefIDs (unique query identifiers) to this type makes up the Responses property of a QueryDataResponse.\nThe Error property is used to allow for partial success responses from the containing QueryDataResponse." })
export type Responses = { readonly [x: string]: DataResponse }
export const Responses = Schema.Record(Schema.String, DataResponse).annotate({ "title": "Responses is a map of RefIDs (Unique Query ID) to DataResponses.", "description": "The QueryData method the QueryDataHandler method will set the RefId\nproperty on the DataResponses' frames based on these RefIDs." })
export type QueryDataResponse = { readonly "results"?: Responses }
export const QueryDataResponse = Schema.Struct({ "results": Schema.optionalKey(Responses) }).annotate({ "title": "QueryDataResponse contains the results from a QueryDataRequest.", "description": "It is the return type of a QueryData call." })
// recursive definitions
const __recursive_RouteExport = Schema.Struct({ "active_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "continue": Schema.optionalKey(Schema.Boolean), "group_by": Schema.optionalKey(Schema.Array(Schema.String)), "group_interval": Schema.optionalKey(Schema.String), "group_wait": Schema.optionalKey(Schema.String), "match": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "description": "Deprecated. Remove before v1.0 release." })), "match_re": Schema.optionalKey(MatchRegexps), "matchers": Schema.optionalKey(Matchers1), "mute_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "object_matchers": Schema.optionalKey(ObjectMatchers), "receiver": Schema.optionalKey(Schema.String), "repeat_interval": Schema.optionalKey(Schema.String), "routes": Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<RouteExport> => RouteExport))) }).annotate({ "description": "RouteExport is the provisioned file export of definitions.Route. This is needed to hide fields that aren't useable in\nprovisioning file format. An alternative would be to define a custom MarshalJSON and MarshalYAML that excludes them." })
const __recursive_TimeInterval = Schema.Struct({ "name": Schema.optionalKey(Schema.String), "time_intervals": Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<TimeInterval> => TimeInterval))) }).annotate({ "title": "TimeInterval represents a named set of time intervals for which a route should be muted." })
const __recursive_Route = Schema.Struct({ "active_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "continue": Schema.optionalKey(Schema.Boolean), "group_by": Schema.optionalKey(Schema.Array(Schema.String)), "group_interval": Schema.optionalKey(Schema.String), "group_wait": Schema.optionalKey(Schema.String), "match": Schema.optionalKey(Schema.Record(Schema.String, Schema.String).annotate({ "description": "Deprecated. Remove before v1.0 release." })), "match_re": Schema.optionalKey(MatchRegexps), "matchers": Schema.optionalKey(Matchers1), "mute_time_intervals": Schema.optionalKey(Schema.Array(Schema.String)), "object_matchers": Schema.optionalKey(ObjectMatchers), "provenance": Schema.optionalKey(Provenance), "receiver": Schema.optionalKey(Schema.String), "repeat_interval": Schema.optionalKey(Schema.String), "routes": Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<Route> => Route))) }).annotate({ "description": "A Route is a node that contains definitions of how to handle alerts. This is modified\nfrom the upstream alertmanager in that it adds the ObjectMatchers property." })
export type Folder = { readonly "accessControl"?: Metadata, readonly "canAdmin"?: boolean, readonly "canDelete"?: boolean, readonly "canEdit"?: boolean, readonly "canSave"?: boolean, readonly "created"?: string, readonly "createdBy"?: string, readonly "hasAcl"?: boolean, readonly "id"?: number, readonly "managedBy"?: ManagerKind, readonly "orgId"?: number, readonly "parentUid"?: string, readonly "parents"?: ReadonlyArray<Folder>, readonly "title"?: string, readonly "uid"?: string, readonly "updated"?: string, readonly "updatedBy"?: string, readonly "url"?: string, readonly "version"?: number }
export const Folder = Schema.Struct({ "accessControl": Schema.optionalKey(Metadata), "canAdmin": Schema.optionalKey(Schema.Boolean), "canDelete": Schema.optionalKey(Schema.Boolean), "canEdit": Schema.optionalKey(Schema.Boolean), "canSave": Schema.optionalKey(Schema.Boolean), "created": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "createdBy": Schema.optionalKey(Schema.String), "hasAcl": Schema.optionalKey(Schema.Boolean), "id": Schema.optionalKey(Schema.Number.annotate({ "description": "Deprecated: use UID instead", "format": "int64" }).check(Schema.isInt())), "managedBy": Schema.optionalKey(ManagerKind), "orgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "parentUid": Schema.optionalKey(Schema.String.annotate({ "description": "only used if nested folders are enabled" })), "parents": Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<Folder> => Folder)).annotate({ "description": "the parent folders starting from the root going down" })), "title": Schema.optionalKey(Schema.String), "uid": Schema.optionalKey(Schema.String), "updated": Schema.optionalKey(Schema.String.annotate({ "format": "date-time" })), "updatedBy": Schema.optionalKey(Schema.String), "url": Schema.optionalKey(Schema.String), "version": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
// schemas
export type ListRolesParams = { readonly "delegatable"?: boolean, readonly "includeHidden"?: boolean, readonly "targetOrgId"?: number }
export const ListRolesParams = Schema.Struct({ "delegatable": Schema.optionalKey(Schema.Boolean), "includeHidden": Schema.optionalKey(Schema.Boolean), "targetOrgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
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
export const ListTeamRolesParams = Schema.Struct({ "targetOrgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type ListTeamRoles200 = SuccessResponseBody
export const ListTeamRoles200 = SuccessResponseBody
export type ListTeamRoles400 = ErrorResponseBody
export const ListTeamRoles400 = ErrorResponseBody
export type ListTeamRoles403 = ErrorResponseBody
export const ListTeamRoles403 = ErrorResponseBody
export type ListTeamRoles500 = ErrorResponseBody
export const ListTeamRoles500 = ErrorResponseBody
export type ListUserRolesParams = { readonly "includeHidden"?: boolean, readonly "targetOrgId"?: number }
export const ListUserRolesParams = Schema.Struct({ "includeHidden": Schema.optionalKey(Schema.Boolean), "targetOrgId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
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
export const GetAnnotationsParams = Schema.Struct({ "from": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "to": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "userId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "userUID": Schema.optionalKey(Schema.String), "alertId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "alertUID": Schema.optionalKey(Schema.String), "dashboardId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "dashboardUID": Schema.optionalKey(Schema.String), "panelId": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "tags": Schema.optionalKey(Schema.Array(Schema.String)), "type": Schema.optionalKey(Schema.Literals(["alert", "annotation"])), "matchAny": Schema.optionalKey(Schema.Boolean) })
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
export const GetSnapshotParams = Schema.Struct({ "resultPage": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt())), "resultLimit": Schema.optionalKey(Schema.Number.annotate({ "default": 100, "format": "int64" }).check(Schema.isInt())), "resultSortColumn": Schema.optionalKey(Schema.String.annotate({ "default": "default" })), "resultSortOrder": Schema.optionalKey(Schema.String.annotate({ "default": "ASC" })), "errorsOnly": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })) })
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
export const GetShapshotListParams = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt())), "limit": Schema.optionalKey(Schema.Number.annotate({ "default": 100, "format": "int64" }).check(Schema.isInt())), "sort": Schema.optionalKey(Schema.String) })
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
export const SearchDashboardSnapshotsParams = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt())) })
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
export type ListPublicDashboards401 = PublicError1
export const ListPublicDashboards401 = PublicError1
export type ListPublicDashboards403 = PublicError1
export const ListPublicDashboards403 = PublicError1
export type ListPublicDashboards500 = PublicError1
export const ListPublicDashboards500 = PublicError1
export type GetDashboardTags200 = ReadonlyArray<DashboardTagCloudItem>
export const GetDashboardTags200 = Schema.Array(DashboardTagCloudItem)
export type GetDashboardTags401 = ErrorResponseBody
export const GetDashboardTags401 = ErrorResponseBody
export type GetDashboardTags500 = ErrorResponseBody
export const GetDashboardTags500 = ErrorResponseBody
export type GetPublicDashboard200 = PublicDashboard
export const GetPublicDashboard200 = PublicDashboard
export type GetPublicDashboard400 = PublicError1
export const GetPublicDashboard400 = PublicError1
export type GetPublicDashboard401 = PublicError1
export const GetPublicDashboard401 = PublicError1
export type GetPublicDashboard403 = PublicError1
export const GetPublicDashboard403 = PublicError1
export type GetPublicDashboard404 = PublicError1
export const GetPublicDashboard404 = PublicError1
export type GetPublicDashboard500 = PublicError1
export const GetPublicDashboard500 = PublicError1
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
export const GetDashboardVersionsByUIDParams = Schema.Struct({ "limit": Schema.optionalKey(Schema.Number.annotate({ "default": 0, "format": "int64" }).check(Schema.isInt())), "start": Schema.optionalKey(Schema.Number.annotate({ "default": 0, "format": "int64" }).check(Schema.isInt())) })
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
export const GetCorrelationsParams = Schema.Struct({ "limit": Schema.optionalKey(Schema.Number.annotate({ "default": 100, "format": "int64" }).check(Schema.isInt()).check(Schema.isLessThanOrEqualTo(1000))), "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt())), "sourceUID": Schema.optionalKey(Schema.Array(Schema.String)) })
export type GetCorrelations200 = ReadonlyArray<Correlation>
export const GetCorrelations200 = Schema.Array(Correlation)
export type GetCorrelations401 = ErrorResponseBody
export const GetCorrelations401 = ErrorResponseBody
export type GetCorrelations404 = ErrorResponseBody
export const GetCorrelations404 = ErrorResponseBody
export type GetCorrelations500 = ErrorResponseBody
export const GetCorrelations500 = ErrorResponseBody
export type GetDataSourceIdByName200 = { readonly "id": number }
export const GetDataSourceIdByName200 = Schema.Struct({ "id": Schema.Number.annotate({ "description": "ID Identifier of the data source.", "examples": [65], "format": "int64" }).check(Schema.isInt()) })
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
export const GetFoldersParams = Schema.Struct({ "limit": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt())), "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt())), "parentUid": Schema.optionalKey(Schema.String), "permission": Schema.optionalKey(Schema.Literals(["Edit", "View"]).annotate({ "default": "View" })) })
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
export const GetLibraryElementsParams = Schema.Struct({ "searchString": Schema.optionalKey(Schema.String), "kind": Schema.optionalKey(Schema.Literal(1).annotate({ "format": "int64" })), "sortDirection": Schema.optionalKey(Schema.Literals(["alpha-asc", "alpha-desc"])), "typeFilter": Schema.optionalKey(Schema.String), "excludeUid": Schema.optionalKey(Schema.String), "folderFilter": Schema.optionalKey(Schema.String), "folderFilterUIDs": Schema.optionalKey(Schema.String), "perPage": Schema.optionalKey(Schema.Number.annotate({ "default": 100, "format": "int64" }).check(Schema.isInt())), "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt())) })
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
export const GetOrgUsersForCurrentOrgParams = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type GetOrgUsersForCurrentOrg200 = ReadonlyArray<OrgUserDTO>
export const GetOrgUsersForCurrentOrg200 = Schema.Array(OrgUserDTO)
export type GetOrgUsersForCurrentOrg401 = ErrorResponseBody
export const GetOrgUsersForCurrentOrg401 = ErrorResponseBody
export type GetOrgUsersForCurrentOrg403 = ErrorResponseBody
export const GetOrgUsersForCurrentOrg403 = ErrorResponseBody
export type GetOrgUsersForCurrentOrg500 = ErrorResponseBody
export const GetOrgUsersForCurrentOrg500 = ErrorResponseBody
export type GetOrgUsersForCurrentOrgLookupParams = { readonly "query"?: string, readonly "limit"?: number }
export const GetOrgUsersForCurrentOrgLookupParams = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
export type GetOrgUsersForCurrentOrgLookup200 = ReadonlyArray<UserLookupDTO>
export const GetOrgUsersForCurrentOrgLookup200 = Schema.Array(UserLookupDTO)
export type GetOrgUsersForCurrentOrgLookup401 = ErrorResponseBody
export const GetOrgUsersForCurrentOrgLookup401 = ErrorResponseBody
export type GetOrgUsersForCurrentOrgLookup403 = ErrorResponseBody
export const GetOrgUsersForCurrentOrgLookup403 = ErrorResponseBody
export type GetOrgUsersForCurrentOrgLookup500 = ErrorResponseBody
export const GetOrgUsersForCurrentOrgLookup500 = ErrorResponseBody
export type SearchOrgsParams = { readonly "page"?: number, readonly "perpage"?: number, readonly "name"?: string, readonly "query"?: string }
export const SearchOrgsParams = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt())), "perpage": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt())), "name": Schema.optionalKey(Schema.String), "query": Schema.optionalKey(Schema.String) })
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
export const SearchPlaylistsParams = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
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
export type ViewPublicDashboard400 = PublicError1
export const ViewPublicDashboard400 = PublicError1
export type ViewPublicDashboard401 = PublicError1
export const ViewPublicDashboard401 = PublicError1
export type ViewPublicDashboard403 = PublicError1
export const ViewPublicDashboard403 = PublicError1
export type ViewPublicDashboard404 = PublicError1
export const ViewPublicDashboard404 = PublicError1
export type ViewPublicDashboard500 = PublicError1
export const ViewPublicDashboard500 = PublicError1
export type GetPublicAnnotations200 = ReadonlyArray<AnnotationEvent>
export const GetPublicAnnotations200 = Schema.Array(AnnotationEvent)
export type GetPublicAnnotations400 = PublicError1
export const GetPublicAnnotations400 = PublicError1
export type GetPublicAnnotations401 = PublicError1
export const GetPublicAnnotations401 = PublicError1
export type GetPublicAnnotations403 = PublicError1
export const GetPublicAnnotations403 = PublicError1
export type GetPublicAnnotations404 = PublicError1
export const GetPublicAnnotations404 = PublicError1
export type GetPublicAnnotations500 = PublicError1
export const GetPublicAnnotations500 = PublicError1
export type SearchQueriesParams = { readonly "datasourceUid"?: ReadonlyArray<string>, readonly "searchString"?: string, readonly "onlyStarred"?: boolean, readonly "sort"?: "time-desc" | "time-asc", readonly "page"?: number, readonly "limit"?: number, readonly "from"?: number, readonly "to"?: number }
export const SearchQueriesParams = Schema.Struct({ "datasourceUid": Schema.optionalKey(Schema.Array(Schema.String)), "searchString": Schema.optionalKey(Schema.String), "onlyStarred": Schema.optionalKey(Schema.Boolean), "sort": Schema.optionalKey(Schema.Literals(["time-desc", "time-asc"]).annotate({ "default": "time-desc" })), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "from": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "to": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
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
export const GetSettingsImage200 = Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))
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
export const RenderReportCSVs200 = Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))
export type RenderReportCSVs204 = {  }
export const RenderReportCSVs204 = Schema.Struct({  })
export type RenderReportCSVs400 = ErrorResponseBody
export const RenderReportCSVs400 = ErrorResponseBody
export type RenderReportCSVs401 = ErrorResponseBody
export const RenderReportCSVs401 = ErrorResponseBody
export type RenderReportCSVs500 = ErrorResponseBody
export const RenderReportCSVs500 = ErrorResponseBody
export type RenderReportPDFsParams = { readonly "dashboards"?: string, readonly "orientation"?: string, readonly "layout"?: string, readonly "title"?: string, readonly "scaleFactor"?: string, readonly "includeTables"?: string }
export const RenderReportPDFsParams = Schema.Struct({ "dashboards": Schema.optionalKey(Schema.String), "orientation": Schema.optionalKey(Schema.String), "layout": Schema.optionalKey(Schema.String), "title": Schema.optionalKey(Schema.String), "scaleFactor": Schema.optionalKey(Schema.String), "includeTables": Schema.optionalKey(Schema.String) })
export type RenderReportPDFs200 = ReadonlyArray<number>
export const RenderReportPDFs200 = Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))
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
export const GetMetadata200 = Schema.Array(Schema.Number.annotate({ "format": "uint8" }).check(Schema.isInt()))
export type GetSLO400 = ErrorResponseBody
export const GetSLO400 = ErrorResponseBody
export type GetSLO403 = ErrorResponseBody
export const GetSLO403 = ErrorResponseBody
export type GetSLO500 = ErrorResponseBody
export const GetSLO500 = ErrorResponseBody
export type SearchParams = { readonly "query"?: string, readonly "tag"?: ReadonlyArray<string>, readonly "type"?: "dash-folder" | "dash-db", readonly "dashboardIds"?: ReadonlyArray<number>, readonly "dashboardUIDs"?: ReadonlyArray<string>, readonly "folderIds"?: ReadonlyArray<number>, readonly "folderUIDs"?: ReadonlyArray<string>, readonly "starred"?: boolean, readonly "limit"?: number, readonly "page"?: number, readonly "permission"?: "Edit" | "View", readonly "sort"?: "alpha-asc" | "alpha-desc", readonly "deleted"?: boolean }
export const SearchParams = Schema.Struct({ "query": Schema.optionalKey(Schema.String), "tag": Schema.optionalKey(Schema.Array(Schema.String)), "type": Schema.optionalKey(Schema.Literals(["dash-folder", "dash-db"])), "dashboardIds": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))), "dashboardUIDs": Schema.optionalKey(Schema.Array(Schema.String)), "folderIds": Schema.optionalKey(Schema.Array(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt()))), "folderUIDs": Schema.optionalKey(Schema.Array(Schema.String)), "starred": Schema.optionalKey(Schema.Boolean), "limit": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "permission": Schema.optionalKey(Schema.Literals(["Edit", "View"]).annotate({ "default": "View" })), "sort": Schema.optionalKey(Schema.Literals(["alpha-asc", "alpha-desc"]).annotate({ "default": "alpha-asc" })), "deleted": Schema.optionalKey(Schema.Boolean) })
export type Search200 = HitList
export const Search200 = HitList
export type Search401 = ErrorResponseBody
export const Search401 = ErrorResponseBody
export type Search422 = ErrorResponseBody
export const Search422 = ErrorResponseBody
export type Search500 = ErrorResponseBody
export const Search500 = ErrorResponseBody
export type ListSortOptions200 = { readonly "description"?: string, readonly "displayName"?: string, readonly "meta"?: string, readonly "name"?: string }
export const ListSortOptions200 = Schema.Struct({ "description": Schema.optionalKey(Schema.String), "displayName": Schema.optionalKey(Schema.String), "meta": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String) })
export type ListSortOptions401 = ErrorResponseBody
export const ListSortOptions401 = ErrorResponseBody
export type SearchOrgServiceAccountsWithPagingParams = { readonly "Disabled"?: boolean, readonly "expiredTokens"?: boolean, readonly "query"?: string, readonly "perpage"?: number, readonly "page"?: number }
export const SearchOrgServiceAccountsWithPagingParams = Schema.Struct({ "Disabled": Schema.optionalKey(Schema.Boolean), "expiredTokens": Schema.optionalKey(Schema.Boolean), "query": Schema.optionalKey(Schema.String), "perpage": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())), "page": Schema.optionalKey(Schema.Number.annotate({ "format": "int64" }).check(Schema.isInt())) })
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
export type RetrieveJWKS200 = { readonly "keys"?: ReadonlyArray<JSONWebKey> }
export const RetrieveJWKS200 = Schema.Struct({ "keys": Schema.optionalKey(Schema.Array(JSONWebKey)) })
export type RetrieveJWKS500 = ErrorResponseBody
export const RetrieveJWKS500 = ErrorResponseBody
export type GetSharingOptions200 = { readonly "externalEnabled"?: boolean, readonly "externalSnapshotName"?: string, readonly "externalSnapshotURL"?: string }
export const GetSharingOptions200 = Schema.Struct({ "externalEnabled": Schema.optionalKey(Schema.Boolean), "externalSnapshotName": Schema.optionalKey(Schema.String), "externalSnapshotURL": Schema.optionalKey(Schema.String) })
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
export const SearchTeamsParams = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt())), "perpage": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt())), "name": Schema.optionalKey(Schema.String), "query": Schema.optionalKey(Schema.String), "accesscontrol": Schema.optionalKey(Schema.Boolean.annotate({ "default": false })), "sort": Schema.optionalKey(Schema.String) })
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
export const SearchTeamGroupsParams = Schema.Struct({ "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt())), "perpage": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt())), "query": Schema.optionalKey(Schema.String), "name": Schema.optionalKey(Schema.String) })
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
export const SearchUsersParams = Schema.Struct({ "perpage": Schema.optionalKey(Schema.Number.annotate({ "default": 1000, "format": "int64" }).check(Schema.isInt())), "page": Schema.optionalKey(Schema.Number.annotate({ "default": 1, "format": "int64" }).check(Schema.isInt())) })
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
export type RouteGetTemplate404 = PublicError
export const RouteGetTemplate404 = PublicError
export type ListAllProvidersSettings200 = ReadonlyArray<{ readonly "id"?: string, readonly "provider"?: string, readonly "settings"?: { readonly [x: string]: Schema.Json }, readonly "source"?: string }>
export const ListAllProvidersSettings200 = Schema.Array(Schema.Struct({ "id": Schema.optionalKey(Schema.String), "provider": Schema.optionalKey(Schema.String), "settings": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json)), "source": Schema.optionalKey(Schema.String) }))
export type ListAllProvidersSettings400 = ErrorResponseBody
export const ListAllProvidersSettings400 = ErrorResponseBody
export type ListAllProvidersSettings401 = ErrorResponseBody
export const ListAllProvidersSettings401 = ErrorResponseBody
export type ListAllProvidersSettings403 = ErrorResponseBody
export const ListAllProvidersSettings403 = ErrorResponseBody
export type GetProviderSettings200 = { readonly "id"?: string, readonly "provider"?: string, readonly "settings"?: { readonly [x: string]: Schema.Json }, readonly "source"?: string }
export const GetProviderSettings200 = Schema.Struct({ "id": Schema.optionalKey(Schema.String), "provider": Schema.optionalKey(Schema.String), "settings": Schema.optionalKey(Schema.Record(Schema.String, Schema.Json)), "source": Schema.optionalKey(Schema.String) })
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
    "listRoles": (options) => HttpClientRequest.get(`/access-control/roles`).pipe(
    HttpClientRequest.setUrlParams({ "delegatable": options?.params?.["delegatable"] as any, "includeHidden": options?.params?.["includeHidden"] as any, "targetOrgId": options?.params?.["targetOrgId"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListRoles200),
      "403": decodeError("ListRoles403", ListRoles403),
      "500": decodeError("ListRoles500", ListRoles500),
      orElse: unexpectedStatus
    }))
  ),
    "getRole": (roleUID, options) => HttpClientRequest.get(`/access-control/roles/${roleUID}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRole200),
      "403": decodeError("GetRole403", GetRole403),
      "500": decodeError("GetRole500", GetRole500),
      orElse: unexpectedStatus
    }))
  ),
    "getRoleAssignments": (roleUID, options) => HttpClientRequest.get(`/access-control/roles/${roleUID}/assignments`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRoleAssignments200),
      "403": decodeError("GetRoleAssignments403", GetRoleAssignments403),
      "404": decodeError("GetRoleAssignments404", GetRoleAssignments404),
      "500": decodeError("GetRoleAssignments500", GetRoleAssignments500),
      orElse: unexpectedStatus
    }))
  ),
    "getAccessControlStatus": (options) => HttpClientRequest.get(`/access-control/status`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAccessControlStatus200),
      "403": decodeError("GetAccessControlStatus403", GetAccessControlStatus403),
      "404": decodeError("GetAccessControlStatus404", GetAccessControlStatus404),
      "500": decodeError("GetAccessControlStatus500", GetAccessControlStatus500),
      orElse: unexpectedStatus
    }))
  ),
    "listTeamRoles": (teamId, options) => HttpClientRequest.get(`/access-control/teams/${teamId}/roles`).pipe(
    HttpClientRequest.setUrlParams({ "targetOrgId": options?.params?.["targetOrgId"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListTeamRoles200),
      "400": decodeError("ListTeamRoles400", ListTeamRoles400),
      "403": decodeError("ListTeamRoles403", ListTeamRoles403),
      "500": decodeError("ListTeamRoles500", ListTeamRoles500),
      orElse: unexpectedStatus
    }))
  ),
    "listUserRoles": (userId, options) => HttpClientRequest.get(`/access-control/users/${userId}/roles`).pipe(
    HttpClientRequest.setUrlParams({ "includeHidden": options?.params?.["includeHidden"] as any, "targetOrgId": options?.params?.["targetOrgId"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListUserRoles200),
      "400": decodeError("ListUserRoles400", ListUserRoles400),
      "403": decodeError("ListUserRoles403", ListUserRoles403),
      "500": decodeError("ListUserRoles500", ListUserRoles500),
      orElse: unexpectedStatus
    }))
  ),
    "getResourceDescription": (resource, options) => HttpClientRequest.get(`/access-control/${resource}/description`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetResourceDescription200),
      "403": decodeError("GetResourceDescription403", GetResourceDescription403),
      "500": decodeError("GetResourceDescription500", GetResourceDescription500),
      orElse: unexpectedStatus
    }))
  ),
    "getResourcePermissions": (resource, resourceID, options) => HttpClientRequest.get(`/access-control/${resource}/${resourceID}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetResourcePermissions200),
      "403": decodeError("GetResourcePermissions403", GetResourcePermissions403),
      "404": decodeError("GetResourcePermissions404", GetResourcePermissions404),
      "500": decodeError("GetResourcePermissions500", GetResourcePermissions500),
      orElse: unexpectedStatus
    }))
  ),
    "getSyncStatus": (options) => HttpClientRequest.get(`/admin/ldap-sync-status`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSyncStatus200),
      "401": decodeError("GetSyncStatus401", GetSyncStatus401),
      "403": decodeError("GetSyncStatus403", GetSyncStatus403),
      "500": decodeError("GetSyncStatus500", GetSyncStatus500),
      orElse: unexpectedStatus
    }))
  ),
    "getLDAPStatus": (options) => HttpClientRequest.get(`/admin/ldap/status`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLDAPStatus200),
      "401": decodeError("GetLDAPStatus401", GetLDAPStatus401),
      "403": decodeError("GetLDAPStatus403", GetLDAPStatus403),
      "500": decodeError("GetLDAPStatus500", GetLDAPStatus500),
      orElse: unexpectedStatus
    }))
  ),
    "getUserFromLDAP": (userName, options) => HttpClientRequest.get(`/admin/ldap/${userName}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserFromLDAP200),
      "401": decodeError("GetUserFromLDAP401", GetUserFromLDAP401),
      "403": decodeError("GetUserFromLDAP403", GetUserFromLDAP403),
      "500": decodeError("GetUserFromLDAP500", GetUserFromLDAP500),
      orElse: unexpectedStatus
    }))
  ),
    "adminGetSettings": (options) => HttpClientRequest.get(`/admin/settings`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(AdminGetSettings200),
      "401": decodeError("AdminGetSettings401", AdminGetSettings401),
      "403": decodeError("AdminGetSettings403", AdminGetSettings403),
      orElse: unexpectedStatus
    }))
  ),
    "adminGetStats": (options) => HttpClientRequest.get(`/admin/stats`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(AdminGetStats200),
      "401": decodeError("AdminGetStats401", AdminGetStats401),
      "403": decodeError("AdminGetStats403", AdminGetStats403),
      "500": decodeError("AdminGetStats500", AdminGetStats500),
      orElse: unexpectedStatus
    }))
  ),
    "adminGetUserAuthTokens": (userId, options) => HttpClientRequest.get(`/admin/users/${userId}/auth-tokens`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(AdminGetUserAuthTokens200),
      "401": decodeError("AdminGetUserAuthTokens401", AdminGetUserAuthTokens401),
      "403": decodeError("AdminGetUserAuthTokens403", AdminGetUserAuthTokens403),
      "500": decodeError("AdminGetUserAuthTokens500", AdminGetUserAuthTokens500),
      orElse: unexpectedStatus
    }))
  ),
    "getUserQuota": (userId, options) => HttpClientRequest.get(`/admin/users/${userId}/quotas`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserQuota200),
      "401": decodeError("GetUserQuota401", GetUserQuota401),
      "403": decodeError("GetUserQuota403", GetUserQuota403),
      "404": decodeError("GetUserQuota404", GetUserQuota404),
      "500": decodeError("GetUserQuota500", GetUserQuota500),
      orElse: unexpectedStatus
    }))
  ),
    "getAnnotations": (options) => HttpClientRequest.get(`/annotations`).pipe(
    HttpClientRequest.setUrlParams({ "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any, "userId": options?.params?.["userId"] as any, "userUID": options?.params?.["userUID"] as any, "alertId": options?.params?.["alertId"] as any, "alertUID": options?.params?.["alertUID"] as any, "dashboardId": options?.params?.["dashboardId"] as any, "dashboardUID": options?.params?.["dashboardUID"] as any, "panelId": options?.params?.["panelId"] as any, "limit": options?.params?.["limit"] as any, "tags": options?.params?.["tags"] as any, "type": options?.params?.["type"] as any, "matchAny": options?.params?.["matchAny"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAnnotations200),
      "401": decodeError("GetAnnotations401", GetAnnotations401),
      "500": decodeError("GetAnnotations500", GetAnnotations500),
      orElse: unexpectedStatus
    }))
  ),
    "getAnnotationTags": (options) => HttpClientRequest.get(`/annotations/tags`).pipe(
    HttpClientRequest.setUrlParams({ "tag": options?.params?.["tag"] as any, "limit": options?.params?.["limit"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAnnotationTags200),
      "401": decodeError("GetAnnotationTags401", GetAnnotationTags401),
      "500": decodeError("GetAnnotationTags500", GetAnnotationTags500),
      orElse: unexpectedStatus
    }))
  ),
    "getAnnotationByID": (annotationId, options) => HttpClientRequest.get(`/annotations/${annotationId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetAnnotationByID200),
      "401": decodeError("GetAnnotationByID401", GetAnnotationByID401),
      "500": decodeError("GetAnnotationByID500", GetAnnotationByID500),
      orElse: unexpectedStatus
    }))
  ),
    "listDevices": (options) => HttpClientRequest.get(`/anonymous/devices`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListDevices200),
      "401": decodeError("ListDevices401", ListDevices401),
      "403": decodeError("ListDevices403", ListDevices403),
      "404": decodeError("ListDevices404", ListDevices404),
      "500": decodeError("ListDevices500", ListDevices500),
      orElse: unexpectedStatus
    }))
  ),
    "SearchDevices": (options) => HttpClientRequest.get(`/anonymous/search`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchDevices200),
      "401": decodeError("SearchDevices401", SearchDevices401),
      "403": decodeError("SearchDevices403", SearchDevices403),
      "404": decodeError("SearchDevices404", SearchDevices404),
      "500": decodeError("SearchDevices500", SearchDevices500),
      orElse: unexpectedStatus
    }))
  ),
    "getSessionList": (options) => HttpClientRequest.get(`/cloudmigration/migration`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSessionList200),
      "401": decodeError("GetSessionList401", GetSessionList401),
      "403": decodeError("GetSessionList403", GetSessionList403),
      "500": decodeError("GetSessionList500", GetSessionList500),
      orElse: unexpectedStatus
    }))
  ),
    "getSession": (uid, options) => HttpClientRequest.get(`/cloudmigration/migration/${uid}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSession200),
      "400": decodeError("GetSession400", GetSession400),
      "401": decodeError("GetSession401", GetSession401),
      "403": decodeError("GetSession403", GetSession403),
      "500": decodeError("GetSession500", GetSession500),
      orElse: unexpectedStatus
    }))
  ),
    "getSnapshot": (uid, snapshotUid, options) => HttpClientRequest.get(`/cloudmigration/migration/${uid}/snapshot/${snapshotUid}`).pipe(
    HttpClientRequest.setUrlParams({ "resultPage": options?.params?.["resultPage"] as any, "resultLimit": options?.params?.["resultLimit"] as any, "resultSortColumn": options?.params?.["resultSortColumn"] as any, "resultSortOrder": options?.params?.["resultSortOrder"] as any, "errorsOnly": options?.params?.["errorsOnly"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSnapshot200),
      "400": decodeError("GetSnapshot400", GetSnapshot400),
      "401": decodeError("GetSnapshot401", GetSnapshot401),
      "403": decodeError("GetSnapshot403", GetSnapshot403),
      "500": decodeError("GetSnapshot500", GetSnapshot500),
      orElse: unexpectedStatus
    }))
  ),
    "getShapshotList": (uid, options) => HttpClientRequest.get(`/cloudmigration/migration/${uid}/snapshots`).pipe(
    HttpClientRequest.setUrlParams({ "page": options?.params?.["page"] as any, "limit": options?.params?.["limit"] as any, "sort": options?.params?.["sort"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetShapshotList200),
      "400": decodeError("GetShapshotList400", GetShapshotList400),
      "401": decodeError("GetShapshotList401", GetShapshotList401),
      "403": decodeError("GetShapshotList403", GetShapshotList403),
      "500": decodeError("GetShapshotList500", GetShapshotList500),
      orElse: unexpectedStatus
    }))
  ),
    "getResourceDependencies": (options) => HttpClientRequest.get(`/cloudmigration/resources/dependencies`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetResourceDependencies200),
      orElse: unexpectedStatus
    }))
  ),
    "getCloudMigrationToken": (options) => HttpClientRequest.get(`/cloudmigration/token`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCloudMigrationToken200),
      "401": decodeError("GetCloudMigrationToken401", GetCloudMigrationToken401),
      "403": decodeError("GetCloudMigrationToken403", GetCloudMigrationToken403),
      "404": decodeError("GetCloudMigrationToken404", GetCloudMigrationToken404),
      "500": decodeError("GetCloudMigrationToken500", GetCloudMigrationToken500),
      orElse: unexpectedStatus
    }))
  ),
    "RouteConvertPrometheusCortexGetRules": (options) => HttpClientRequest.get(`/convert/api/prom/rules`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
  ),
    "RouteConvertPrometheusCortexGetNamespace": (NamespaceTitle, options) => HttpClientRequest.get(`/convert/api/prom/rules/${NamespaceTitle}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
  ),
    "RouteConvertPrometheusCortexGetRuleGroup": (NamespaceTitle, Group, options) => HttpClientRequest.get(`/convert/api/prom/rules/${NamespaceTitle}/${Group}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
  ),
    "RouteConvertPrometheusGetRules": (options) => HttpClientRequest.get(`/convert/prometheus/config/v1/rules`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
  ),
    "RouteConvertPrometheusGetNamespace": (NamespaceTitle, options) => HttpClientRequest.get(`/convert/prometheus/config/v1/rules/${NamespaceTitle}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
  ),
    "RouteConvertPrometheusGetRuleGroup": (NamespaceTitle, Group, options) => HttpClientRequest.get(`/convert/prometheus/config/v1/rules/${NamespaceTitle}/${Group}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      orElse: unexpectedStatus
    }))
  ),
    "searchDashboardSnapshots": (options) => HttpClientRequest.get(`/dashboard/snapshots`).pipe(
    HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "limit": options?.params?.["limit"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchDashboardSnapshots200),
      "500": decodeError("SearchDashboardSnapshots500", SearchDashboardSnapshots500),
      orElse: unexpectedStatus
    }))
  ),
    "getHomeDashboard": (options) => HttpClientRequest.get(`/dashboards/home`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetHomeDashboard200),
      "401": decodeError("GetHomeDashboard401", GetHomeDashboard401),
      "500": decodeError("GetHomeDashboard500", GetHomeDashboard500),
      orElse: unexpectedStatus
    }))
  ),
    "listPublicDashboards": (options) => HttpClientRequest.get(`/dashboards/public-dashboards`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListPublicDashboards200),
      "401": decodeError("ListPublicDashboards401", ListPublicDashboards401),
      "403": decodeError("ListPublicDashboards403", ListPublicDashboards403),
      "500": decodeError("ListPublicDashboards500", ListPublicDashboards500),
      orElse: unexpectedStatus
    }))
  ),
    "getDashboardTags": (options) => HttpClientRequest.get(`/dashboards/tags`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardTags200),
      "401": decodeError("GetDashboardTags401", GetDashboardTags401),
      "500": decodeError("GetDashboardTags500", GetDashboardTags500),
      orElse: unexpectedStatus
    }))
  ),
    "getPublicDashboard": (dashboardUid, options) => HttpClientRequest.get(`/dashboards/uid/${dashboardUid}/public-dashboards`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPublicDashboard200),
      "400": decodeError("GetPublicDashboard400", GetPublicDashboard400),
      "401": decodeError("GetPublicDashboard401", GetPublicDashboard401),
      "403": decodeError("GetPublicDashboard403", GetPublicDashboard403),
      "404": decodeError("GetPublicDashboard404", GetPublicDashboard404),
      "500": decodeError("GetPublicDashboard500", GetPublicDashboard500),
      orElse: unexpectedStatus
    }))
  ),
    "getDashboardByUID": (uid, options) => HttpClientRequest.get(`/dashboards/uid/${uid}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardByUID200),
      "401": decodeError("GetDashboardByUID401", GetDashboardByUID401),
      "403": decodeError("GetDashboardByUID403", GetDashboardByUID403),
      "404": decodeError("GetDashboardByUID404", GetDashboardByUID404),
      "406": decodeError("GetDashboardByUID406", GetDashboardByUID406),
      "500": decodeError("GetDashboardByUID500", GetDashboardByUID500),
      orElse: unexpectedStatus
    }))
  ),
    "getDashboardPermissionsListByUID": (uid, options) => HttpClientRequest.get(`/dashboards/uid/${uid}/permissions`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardPermissionsListByUID200),
      "401": decodeError("GetDashboardPermissionsListByUID401", GetDashboardPermissionsListByUID401),
      "403": decodeError("GetDashboardPermissionsListByUID403", GetDashboardPermissionsListByUID403),
      "404": decodeError("GetDashboardPermissionsListByUID404", GetDashboardPermissionsListByUID404),
      "500": decodeError("GetDashboardPermissionsListByUID500", GetDashboardPermissionsListByUID500),
      orElse: unexpectedStatus
    }))
  ),
    "getDashboardVersionsByUID": (uid, options) => HttpClientRequest.get(`/dashboards/uid/${uid}/versions`).pipe(
    HttpClientRequest.setUrlParams({ "limit": options?.params?.["limit"] as any, "start": options?.params?.["start"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardVersionsByUID200),
      "401": decodeError("GetDashboardVersionsByUID401", GetDashboardVersionsByUID401),
      "403": decodeError("GetDashboardVersionsByUID403", GetDashboardVersionsByUID403),
      "404": decodeError("GetDashboardVersionsByUID404", GetDashboardVersionsByUID404),
      "500": decodeError("GetDashboardVersionsByUID500", GetDashboardVersionsByUID500),
      orElse: unexpectedStatus
    }))
  ),
    "getDashboardVersionByUID": (uid, DashboardVersionID, options) => HttpClientRequest.get(`/dashboards/uid/${uid}/versions/${DashboardVersionID}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDashboardVersionByUID200),
      "401": decodeError("GetDashboardVersionByUID401", GetDashboardVersionByUID401),
      "403": decodeError("GetDashboardVersionByUID403", GetDashboardVersionByUID403),
      "404": decodeError("GetDashboardVersionByUID404", GetDashboardVersionByUID404),
      "500": decodeError("GetDashboardVersionByUID500", GetDashboardVersionByUID500),
      orElse: unexpectedStatus
    }))
  ),
    "getDataSources": (options) => HttpClientRequest.get(`/datasources`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDataSources200),
      "401": decodeError("GetDataSources401", GetDataSources401),
      "403": decodeError("GetDataSources403", GetDataSources403),
      "500": decodeError("GetDataSources500", GetDataSources500),
      orElse: unexpectedStatus
    }))
  ),
    "getCorrelations": (options) => HttpClientRequest.get(`/datasources/correlations`).pipe(
    HttpClientRequest.setUrlParams({ "limit": options?.params?.["limit"] as any, "page": options?.params?.["page"] as any, "sourceUID": options?.params?.["sourceUID"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCorrelations200),
      "401": decodeError("GetCorrelations401", GetCorrelations401),
      "404": decodeError("GetCorrelations404", GetCorrelations404),
      "500": decodeError("GetCorrelations500", GetCorrelations500),
      orElse: unexpectedStatus
    }))
  ),
    "getDataSourceIdByName": (name, options) => HttpClientRequest.get(`/datasources/id/${name}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDataSourceIdByName200),
      "401": decodeError("GetDataSourceIdByName401", GetDataSourceIdByName401),
      "403": decodeError("GetDataSourceIdByName403", GetDataSourceIdByName403),
      "404": decodeError("GetDataSourceIdByName404", GetDataSourceIdByName404),
      "500": decodeError("GetDataSourceIdByName500", GetDataSourceIdByName500),
      orElse: unexpectedStatus
    }))
  ),
    "getDataSourceByName": (name, options) => HttpClientRequest.get(`/datasources/name/${name}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDataSourceByName200),
      "401": decodeError("GetDataSourceByName401", GetDataSourceByName401),
      "403": decodeError("GetDataSourceByName403", GetDataSourceByName403),
      "500": decodeError("GetDataSourceByName500", GetDataSourceByName500),
      orElse: unexpectedStatus
    }))
  ),
    "datasourceProxyGETByUIDcalls": (uid, datasourceProxyRoute, options) => HttpClientRequest.get(`/datasources/proxy/uid/${uid}/${datasourceProxyRoute}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("DatasourceProxyGETByUIDcalls400", DatasourceProxyGETByUIDcalls400),
      "401": decodeError("DatasourceProxyGETByUIDcalls401", DatasourceProxyGETByUIDcalls401),
      "403": decodeError("DatasourceProxyGETByUIDcalls403", DatasourceProxyGETByUIDcalls403),
      "404": decodeError("DatasourceProxyGETByUIDcalls404", DatasourceProxyGETByUIDcalls404),
      "500": decodeError("DatasourceProxyGETByUIDcalls500", DatasourceProxyGETByUIDcalls500),
      "200": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "getCorrelationsBySourceUID": (sourceUID, options) => HttpClientRequest.get(`/datasources/uid/${sourceUID}/correlations`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCorrelationsBySourceUID200),
      "401": decodeError("GetCorrelationsBySourceUID401", GetCorrelationsBySourceUID401),
      "404": decodeError("GetCorrelationsBySourceUID404", GetCorrelationsBySourceUID404),
      "500": decodeError("GetCorrelationsBySourceUID500", GetCorrelationsBySourceUID500),
      orElse: unexpectedStatus
    }))
  ),
    "getCorrelation": (sourceUID, correlationUID, options) => HttpClientRequest.get(`/datasources/uid/${sourceUID}/correlations/${correlationUID}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCorrelation200),
      "401": decodeError("GetCorrelation401", GetCorrelation401),
      "404": decodeError("GetCorrelation404", GetCorrelation404),
      "500": decodeError("GetCorrelation500", GetCorrelation500),
      orElse: unexpectedStatus
    }))
  ),
    "getDataSourceByUID": (uid, options) => HttpClientRequest.get(`/datasources/uid/${uid}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDataSourceByUID200),
      "400": decodeError("GetDataSourceByUID400", GetDataSourceByUID400),
      "401": decodeError("GetDataSourceByUID401", GetDataSourceByUID401),
      "403": decodeError("GetDataSourceByUID403", GetDataSourceByUID403),
      "404": decodeError("GetDataSourceByUID404", GetDataSourceByUID404),
      "500": decodeError("GetDataSourceByUID500", GetDataSourceByUID500),
      orElse: unexpectedStatus
    }))
  ),
    "checkDatasourceHealthWithUID": (uid, options) => HttpClientRequest.get(`/datasources/uid/${uid}/health`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CheckDatasourceHealthWithUID200),
      "400": decodeError("CheckDatasourceHealthWithUID400", CheckDatasourceHealthWithUID400),
      "401": decodeError("CheckDatasourceHealthWithUID401", CheckDatasourceHealthWithUID401),
      "403": decodeError("CheckDatasourceHealthWithUID403", CheckDatasourceHealthWithUID403),
      "500": decodeError("CheckDatasourceHealthWithUID500", CheckDatasourceHealthWithUID500),
      orElse: unexpectedStatus
    }))
  ),
    "getTeamLBACRulesApi": (uid, options) => HttpClientRequest.get(`/datasources/uid/${uid}/lbac/teams`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTeamLBACRulesApi200),
      "400": decodeError("GetTeamLBACRulesApi400", GetTeamLBACRulesApi400),
      "401": decodeError("GetTeamLBACRulesApi401", GetTeamLBACRulesApi401),
      "403": decodeError("GetTeamLBACRulesApi403", GetTeamLBACRulesApi403),
      "404": decodeError("GetTeamLBACRulesApi404", GetTeamLBACRulesApi404),
      "500": decodeError("GetTeamLBACRulesApi500", GetTeamLBACRulesApi500),
      orElse: unexpectedStatus
    }))
  ),
    "callDatasourceResourceWithUID": (uid, datasourceProxyRoute, options) => HttpClientRequest.get(`/datasources/uid/${uid}/resources/${datasourceProxyRoute}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(CallDatasourceResourceWithUID200),
      "400": decodeError("CallDatasourceResourceWithUID400", CallDatasourceResourceWithUID400),
      "401": decodeError("CallDatasourceResourceWithUID401", CallDatasourceResourceWithUID401),
      "403": decodeError("CallDatasourceResourceWithUID403", CallDatasourceResourceWithUID403),
      "404": decodeError("CallDatasourceResourceWithUID404", CallDatasourceResourceWithUID404),
      "500": decodeError("CallDatasourceResourceWithUID500", CallDatasourceResourceWithUID500),
      orElse: unexpectedStatus
    }))
  ),
    "getDataSourceCacheConfig": (dataSourceUID, options) => HttpClientRequest.get(`/datasources/${dataSourceUID}/cache`).pipe(
    HttpClientRequest.setUrlParams({ "dataSourceType": options?.params?.["dataSourceType"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetDataSourceCacheConfig200),
      "500": decodeError("GetDataSourceCacheConfig500", GetDataSourceCacheConfig500),
      orElse: unexpectedStatus
    }))
  ),
    "queryMetricsWithExpressions": (options) => HttpClientRequest.post(`/ds/query`).pipe(
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
    "getFolders": (options) => HttpClientRequest.get(`/folders`).pipe(
    HttpClientRequest.setUrlParams({ "limit": options?.params?.["limit"] as any, "page": options?.params?.["page"] as any, "parentUid": options?.params?.["parentUid"] as any, "permission": options?.params?.["permission"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFolders200),
      "401": decodeError("GetFolders401", GetFolders401),
      "403": decodeError("GetFolders403", GetFolders403),
      "500": decodeError("GetFolders500", GetFolders500),
      orElse: unexpectedStatus
    }))
  ),
    "getFolderByUID": (folderUid, options) => HttpClientRequest.get(`/folders/${folderUid}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFolderByUID200),
      "401": decodeError("GetFolderByUID401", GetFolderByUID401),
      "403": decodeError("GetFolderByUID403", GetFolderByUID403),
      "404": decodeError("GetFolderByUID404", GetFolderByUID404),
      "500": decodeError("GetFolderByUID500", GetFolderByUID500),
      orElse: unexpectedStatus
    }))
  ),
    "getFolderDescendantCounts": (folderUid, options) => HttpClientRequest.get(`/folders/${folderUid}/counts`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFolderDescendantCounts200),
      "401": decodeError("GetFolderDescendantCounts401", GetFolderDescendantCounts401),
      "403": decodeError("GetFolderDescendantCounts403", GetFolderDescendantCounts403),
      "404": decodeError("GetFolderDescendantCounts404", GetFolderDescendantCounts404),
      "500": decodeError("GetFolderDescendantCounts500", GetFolderDescendantCounts500),
      orElse: unexpectedStatus
    }))
  ),
    "getFolderPermissionList": (folderUid, options) => HttpClientRequest.get(`/folders/${folderUid}/permissions`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetFolderPermissionList200),
      "401": decodeError("GetFolderPermissionList401", GetFolderPermissionList401),
      "403": decodeError("GetFolderPermissionList403", GetFolderPermissionList403),
      "404": decodeError("GetFolderPermissionList404", GetFolderPermissionList404),
      "500": decodeError("GetFolderPermissionList500", GetFolderPermissionList500),
      orElse: unexpectedStatus
    }))
  ),
    "getHealth": (options) => HttpClientRequest.get(`/health`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetHealth200),
      "503": decodeError("GetHealth503", GetHealth503),
      orElse: unexpectedStatus
    }))
  ),
    "getLibraryElements": (options) => HttpClientRequest.get(`/library-elements`).pipe(
    HttpClientRequest.setUrlParams({ "searchString": options?.params?.["searchString"] as any, "kind": options?.params?.["kind"] as any, "sortDirection": options?.params?.["sortDirection"] as any, "typeFilter": options?.params?.["typeFilter"] as any, "excludeUid": options?.params?.["excludeUid"] as any, "folderFilter": options?.params?.["folderFilter"] as any, "folderFilterUIDs": options?.params?.["folderFilterUIDs"] as any, "perPage": options?.params?.["perPage"] as any, "page": options?.params?.["page"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLibraryElements200),
      "401": decodeError("GetLibraryElements401", GetLibraryElements401),
      "500": decodeError("GetLibraryElements500", GetLibraryElements500),
      orElse: unexpectedStatus
    }))
  ),
    "getLibraryElementByName": (libraryElementName, options) => HttpClientRequest.get(`/library-elements/name/${libraryElementName}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLibraryElementByName200),
      "401": decodeError("GetLibraryElementByName401", GetLibraryElementByName401),
      "404": decodeError("GetLibraryElementByName404", GetLibraryElementByName404),
      "500": decodeError("GetLibraryElementByName500", GetLibraryElementByName500),
      orElse: unexpectedStatus
    }))
  ),
    "getLibraryElementByUID": (libraryElementUid, options) => HttpClientRequest.get(`/library-elements/${libraryElementUid}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLibraryElementByUID200),
      "401": decodeError("GetLibraryElementByUID401", GetLibraryElementByUID401),
      "403": decodeError("GetLibraryElementByUID403", GetLibraryElementByUID403),
      "404": decodeError("GetLibraryElementByUID404", GetLibraryElementByUID404),
      "500": decodeError("GetLibraryElementByUID500", GetLibraryElementByUID500),
      orElse: unexpectedStatus
    }))
  ),
    "getLibraryElementConnections": (libraryElementUid, options) => HttpClientRequest.get(`/library-elements/${libraryElementUid}/connections/`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLibraryElementConnections200),
      "401": decodeError("GetLibraryElementConnections401", GetLibraryElementConnections401),
      "403": decodeError("GetLibraryElementConnections403", GetLibraryElementConnections403),
      "404": decodeError("GetLibraryElementConnections404", GetLibraryElementConnections404),
      "500": decodeError("GetLibraryElementConnections500", GetLibraryElementConnections500),
      orElse: unexpectedStatus
    }))
  ),
    "getStatus": (options) => HttpClientRequest.get(`/licensing/check`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "200": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "getCustomPermissionsReport": (options) => HttpClientRequest.get(`/licensing/custom-permissions`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "500": decodeError("GetCustomPermissionsReport500", GetCustomPermissionsReport500),
      orElse: unexpectedStatus
    }))
  ),
    "getCustomPermissionsCSV": (options) => HttpClientRequest.get(`/licensing/custom-permissions-csv`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "500": decodeError("GetCustomPermissionsCSV500", GetCustomPermissionsCSV500),
      orElse: unexpectedStatus
    }))
  ),
    "refreshLicenseStats": (options) => HttpClientRequest.get(`/licensing/refresh-stats`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RefreshLicenseStats200),
      "500": decodeError("RefreshLicenseStats500", RefreshLicenseStats500),
      orElse: unexpectedStatus
    }))
  ),
    "getLicenseToken": (options) => HttpClientRequest.get(`/licensing/token`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetLicenseToken200),
      orElse: unexpectedStatus
    }))
  ),
    "getSAMLLogout": (options) => HttpClientRequest.get(`/logout/saml`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "404": decodeError("GetSAMLLogout404", GetSAMLLogout404),
      "500": decodeError("GetSAMLLogout500", GetSAMLLogout500),
      "302": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "getCurrentOrg": (options) => HttpClientRequest.get(`/org`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCurrentOrg200),
      "401": decodeError("GetCurrentOrg401", GetCurrentOrg401),
      "403": decodeError("GetCurrentOrg403", GetCurrentOrg403),
      "500": decodeError("GetCurrentOrg500", GetCurrentOrg500),
      orElse: unexpectedStatus
    }))
  ),
    "getPendingOrgInvites": (options) => HttpClientRequest.get(`/org/invites`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPendingOrgInvites200),
      "401": decodeError("GetPendingOrgInvites401", GetPendingOrgInvites401),
      "403": decodeError("GetPendingOrgInvites403", GetPendingOrgInvites403),
      "500": decodeError("GetPendingOrgInvites500", GetPendingOrgInvites500),
      orElse: unexpectedStatus
    }))
  ),
    "getOrgPreferences": (options) => HttpClientRequest.get(`/org/preferences`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgPreferences200),
      "401": decodeError("GetOrgPreferences401", GetOrgPreferences401),
      "403": decodeError("GetOrgPreferences403", GetOrgPreferences403),
      "500": decodeError("GetOrgPreferences500", GetOrgPreferences500),
      orElse: unexpectedStatus
    }))
  ),
    "getCurrentOrgQuota": (options) => HttpClientRequest.get(`/org/quotas`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetCurrentOrgQuota200),
      "401": decodeError("GetCurrentOrgQuota401", GetCurrentOrgQuota401),
      "403": decodeError("GetCurrentOrgQuota403", GetCurrentOrgQuota403),
      "404": decodeError("GetCurrentOrgQuota404", GetCurrentOrgQuota404),
      "500": decodeError("GetCurrentOrgQuota500", GetCurrentOrgQuota500),
      orElse: unexpectedStatus
    }))
  ),
    "getOrgUsersForCurrentOrg": (options) => HttpClientRequest.get(`/org/users`).pipe(
    HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "limit": options?.params?.["limit"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgUsersForCurrentOrg200),
      "401": decodeError("GetOrgUsersForCurrentOrg401", GetOrgUsersForCurrentOrg401),
      "403": decodeError("GetOrgUsersForCurrentOrg403", GetOrgUsersForCurrentOrg403),
      "500": decodeError("GetOrgUsersForCurrentOrg500", GetOrgUsersForCurrentOrg500),
      orElse: unexpectedStatus
    }))
  ),
    "getOrgUsersForCurrentOrgLookup": (options) => HttpClientRequest.get(`/org/users/lookup`).pipe(
    HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "limit": options?.params?.["limit"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgUsersForCurrentOrgLookup200),
      "401": decodeError("GetOrgUsersForCurrentOrgLookup401", GetOrgUsersForCurrentOrgLookup401),
      "403": decodeError("GetOrgUsersForCurrentOrgLookup403", GetOrgUsersForCurrentOrgLookup403),
      "500": decodeError("GetOrgUsersForCurrentOrgLookup500", GetOrgUsersForCurrentOrgLookup500),
      orElse: unexpectedStatus
    }))
  ),
    "searchOrgs": (options) => HttpClientRequest.get(`/orgs`).pipe(
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
    "getOrgByName": (orgName, options) => HttpClientRequest.get(`/orgs/name/${orgName}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgByName200),
      "401": decodeError("GetOrgByName401", GetOrgByName401),
      "403": decodeError("GetOrgByName403", GetOrgByName403),
      "500": decodeError("GetOrgByName500", GetOrgByName500),
      orElse: unexpectedStatus
    }))
  ),
    "getOrgByID": (orgId, options) => HttpClientRequest.get(`/orgs/${orgId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgByID200),
      "401": decodeError("GetOrgByID401", GetOrgByID401),
      "403": decodeError("GetOrgByID403", GetOrgByID403),
      "500": decodeError("GetOrgByID500", GetOrgByID500),
      orElse: unexpectedStatus
    }))
  ),
    "getOrgQuota": (orgId, options) => HttpClientRequest.get(`/orgs/${orgId}/quotas`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgQuota200),
      "401": decodeError("GetOrgQuota401", GetOrgQuota401),
      "403": decodeError("GetOrgQuota403", GetOrgQuota403),
      "404": decodeError("GetOrgQuota404", GetOrgQuota404),
      "500": decodeError("GetOrgQuota500", GetOrgQuota500),
      orElse: unexpectedStatus
    }))
  ),
    "getOrgUsers": (orgId, options) => HttpClientRequest.get(`/orgs/${orgId}/users`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetOrgUsers200),
      "401": decodeError("GetOrgUsers401", GetOrgUsers401),
      "403": decodeError("GetOrgUsers403", GetOrgUsers403),
      "500": decodeError("GetOrgUsers500", GetOrgUsers500),
      orElse: unexpectedStatus
    }))
  ),
    "searchOrgUsers": (orgId, options) => HttpClientRequest.get(`/orgs/${orgId}/users/search`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchOrgUsers200),
      "401": decodeError("SearchOrgUsers401", SearchOrgUsers401),
      "403": decodeError("SearchOrgUsers403", SearchOrgUsers403),
      "500": decodeError("SearchOrgUsers500", SearchOrgUsers500),
      orElse: unexpectedStatus
    }))
  ),
    "searchPlaylists": (options) => HttpClientRequest.get(`/playlists`).pipe(
    HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "limit": options?.params?.["limit"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchPlaylists200),
      "500": decodeError("SearchPlaylists500", SearchPlaylists500),
      orElse: unexpectedStatus
    }))
  ),
    "getPlaylist": (uid, options) => HttpClientRequest.get(`/playlists/${uid}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPlaylist200),
      "401": decodeError("GetPlaylist401", GetPlaylist401),
      "403": decodeError("GetPlaylist403", GetPlaylist403),
      "404": decodeError("GetPlaylist404", GetPlaylist404),
      "500": decodeError("GetPlaylist500", GetPlaylist500),
      orElse: unexpectedStatus
    }))
  ),
    "getPlaylistItems": (uid, options) => HttpClientRequest.get(`/playlists/${uid}/items`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPlaylistItems200),
      "401": decodeError("GetPlaylistItems401", GetPlaylistItems401),
      "403": decodeError("GetPlaylistItems403", GetPlaylistItems403),
      "404": decodeError("GetPlaylistItems404", GetPlaylistItems404),
      "500": decodeError("GetPlaylistItems500", GetPlaylistItems500),
      orElse: unexpectedStatus
    }))
  ),
    "viewPublicDashboard": (accessToken, options) => HttpClientRequest.get(`/public/dashboards/${accessToken}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ViewPublicDashboard200),
      "400": decodeError("ViewPublicDashboard400", ViewPublicDashboard400),
      "401": decodeError("ViewPublicDashboard401", ViewPublicDashboard401),
      "403": decodeError("ViewPublicDashboard403", ViewPublicDashboard403),
      "404": decodeError("ViewPublicDashboard404", ViewPublicDashboard404),
      "500": decodeError("ViewPublicDashboard500", ViewPublicDashboard500),
      orElse: unexpectedStatus
    }))
  ),
    "getPublicAnnotations": (accessToken, options) => HttpClientRequest.get(`/public/dashboards/${accessToken}/annotations`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetPublicAnnotations200),
      "400": decodeError("GetPublicAnnotations400", GetPublicAnnotations400),
      "401": decodeError("GetPublicAnnotations401", GetPublicAnnotations401),
      "403": decodeError("GetPublicAnnotations403", GetPublicAnnotations403),
      "404": decodeError("GetPublicAnnotations404", GetPublicAnnotations404),
      "500": decodeError("GetPublicAnnotations500", GetPublicAnnotations500),
      orElse: unexpectedStatus
    }))
  ),
    "searchQueries": (options) => HttpClientRequest.get(`/query-history`).pipe(
    HttpClientRequest.setUrlParams({ "datasourceUid": options?.params?.["datasourceUid"] as any, "searchString": options?.params?.["searchString"] as any, "onlyStarred": options?.params?.["onlyStarred"] as any, "sort": options?.params?.["sort"] as any, "page": options?.params?.["page"] as any, "limit": options?.params?.["limit"] as any, "from": options?.params?.["from"] as any, "to": options?.params?.["to"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchQueries200),
      "401": decodeError("SearchQueries401", SearchQueries401),
      "500": decodeError("SearchQueries500", SearchQueries500),
      orElse: unexpectedStatus
    }))
  ),
    "listRecordingRules": (options) => HttpClientRequest.get(`/recording-rules`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListRecordingRules200),
      "401": decodeError("ListRecordingRules401", ListRecordingRules401),
      "403": decodeError("ListRecordingRules403", ListRecordingRules403),
      "404": decodeError("ListRecordingRules404", ListRecordingRules404),
      "500": decodeError("ListRecordingRules500", ListRecordingRules500),
      orElse: unexpectedStatus
    }))
  ),
    "getRecordingRuleWriteTarget": (options) => HttpClientRequest.get(`/recording-rules/writer`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetRecordingRuleWriteTarget200),
      "401": decodeError("GetRecordingRuleWriteTarget401", GetRecordingRuleWriteTarget401),
      "403": decodeError("GetRecordingRuleWriteTarget403", GetRecordingRuleWriteTarget403),
      "404": decodeError("GetRecordingRuleWriteTarget404", GetRecordingRuleWriteTarget404),
      "500": decodeError("GetRecordingRuleWriteTarget500", GetRecordingRuleWriteTarget500),
      orElse: unexpectedStatus
    }))
  ),
    "getReports": (options) => HttpClientRequest.get(`/reports`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetReports200),
      "401": decodeError("GetReports401", GetReports401),
      "403": decodeError("GetReports403", GetReports403),
      "500": decodeError("GetReports500", GetReports500),
      orElse: unexpectedStatus
    }))
  ),
    "getReportsByDashboardUID": (uid, options) => HttpClientRequest.get(`/reports/dashboards/${uid}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetReportsByDashboardUID200),
      "401": decodeError("GetReportsByDashboardUID401", GetReportsByDashboardUID401),
      "403": decodeError("GetReportsByDashboardUID403", GetReportsByDashboardUID403),
      "500": decodeError("GetReportsByDashboardUID500", GetReportsByDashboardUID500),
      orElse: unexpectedStatus
    }))
  ),
    "getSettingsImage": (options) => HttpClientRequest.get(`/reports/images/:image`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSettingsImage200),
      "401": decodeError("GetSettingsImage401", GetSettingsImage401),
      "403": decodeError("GetSettingsImage403", GetSettingsImage403),
      "404": decodeError("GetSettingsImage404", GetSettingsImage404),
      "500": decodeError("GetSettingsImage500", GetSettingsImage500),
      orElse: unexpectedStatus
    }))
  ),
    "renderReportCSVs": (options) => HttpClientRequest.get(`/reports/render/csvs`).pipe(
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
    "renderReportPDFs": (options) => HttpClientRequest.get(`/reports/render/pdfs`).pipe(
    HttpClientRequest.setUrlParams({ "dashboards": options?.params?.["dashboards"] as any, "orientation": options?.params?.["orientation"] as any, "layout": options?.params?.["layout"] as any, "title": options?.params?.["title"] as any, "scaleFactor": options?.params?.["scaleFactor"] as any, "includeTables": options?.params?.["includeTables"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RenderReportPDFs200),
      "400": decodeError("RenderReportPDFs400", RenderReportPDFs400),
      "401": decodeError("RenderReportPDFs401", RenderReportPDFs401),
      "500": decodeError("RenderReportPDFs500", RenderReportPDFs500),
      orElse: unexpectedStatus
    }))
  ),
    "getReportSettings": (options) => HttpClientRequest.get(`/reports/settings`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetReportSettings200),
      "401": decodeError("GetReportSettings401", GetReportSettings401),
      "403": decodeError("GetReportSettings403", GetReportSettings403),
      "500": decodeError("GetReportSettings500", GetReportSettings500),
      orElse: unexpectedStatus
    }))
  ),
    "getReport": (id, options) => HttpClientRequest.get(`/reports/${id}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetReport200),
      "400": decodeError("GetReport400", GetReport400),
      "401": decodeError("GetReport401", GetReport401),
      "403": decodeError("GetReport403", GetReport403),
      "404": decodeError("GetReport404", GetReport404),
      "500": decodeError("GetReport500", GetReport500),
      orElse: unexpectedStatus
    }))
  ),
    "getMetadata": (options) => HttpClientRequest.get(`/saml/metadata`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetMetadata200),
      orElse: unexpectedStatus
    }))
  ),
    "getSLO": (options) => HttpClientRequest.get(`/saml/slo`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("GetSLO400", GetSLO400),
      "403": decodeError("GetSLO403", GetSLO403),
      "500": decodeError("GetSLO500", GetSLO500),
      "302": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "search": (options) => HttpClientRequest.get(`/search`).pipe(
    HttpClientRequest.setUrlParams({ "query": options?.params?.["query"] as any, "tag": options?.params?.["tag"] as any, "type": options?.params?.["type"] as any, "dashboardIds": options?.params?.["dashboardIds"] as any, "dashboardUIDs": options?.params?.["dashboardUIDs"] as any, "folderIds": options?.params?.["folderIds"] as any, "folderUIDs": options?.params?.["folderUIDs"] as any, "starred": options?.params?.["starred"] as any, "limit": options?.params?.["limit"] as any, "page": options?.params?.["page"] as any, "permission": options?.params?.["permission"] as any, "sort": options?.params?.["sort"] as any, "deleted": options?.params?.["deleted"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(Search200),
      "401": decodeError("Search401", Search401),
      "422": decodeError("Search422", Search422),
      "500": decodeError("Search500", Search500),
      orElse: unexpectedStatus
    }))
  ),
    "listSortOptions": (options) => HttpClientRequest.get(`/search/sorting`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListSortOptions200),
      "401": decodeError("ListSortOptions401", ListSortOptions401),
      orElse: unexpectedStatus
    }))
  ),
    "searchOrgServiceAccountsWithPaging": (options) => HttpClientRequest.get(`/serviceaccounts/search`).pipe(
    HttpClientRequest.setUrlParams({ "Disabled": options?.params?.["Disabled"] as any, "expiredTokens": options?.params?.["expiredTokens"] as any, "query": options?.params?.["query"] as any, "perpage": options?.params?.["perpage"] as any, "page": options?.params?.["page"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchOrgServiceAccountsWithPaging200),
      "401": decodeError("SearchOrgServiceAccountsWithPaging401", SearchOrgServiceAccountsWithPaging401),
      "403": decodeError("SearchOrgServiceAccountsWithPaging403", SearchOrgServiceAccountsWithPaging403),
      "500": decodeError("SearchOrgServiceAccountsWithPaging500", SearchOrgServiceAccountsWithPaging500),
      orElse: unexpectedStatus
    }))
  ),
    "retrieveServiceAccount": (serviceAccountId, options) => HttpClientRequest.get(`/serviceaccounts/${serviceAccountId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RetrieveServiceAccount200),
      "400": decodeError("RetrieveServiceAccount400", RetrieveServiceAccount400),
      "401": decodeError("RetrieveServiceAccount401", RetrieveServiceAccount401),
      "403": decodeError("RetrieveServiceAccount403", RetrieveServiceAccount403),
      "404": decodeError("RetrieveServiceAccount404", RetrieveServiceAccount404),
      "500": decodeError("RetrieveServiceAccount500", RetrieveServiceAccount500),
      orElse: unexpectedStatus
    }))
  ),
    "listTokens": (serviceAccountId, options) => HttpClientRequest.get(`/serviceaccounts/${serviceAccountId}/tokens`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListTokens200),
      "400": decodeError("ListTokens400", ListTokens400),
      "401": decodeError("ListTokens401", ListTokens401),
      "403": decodeError("ListTokens403", ListTokens403),
      "500": decodeError("ListTokens500", ListTokens500),
      orElse: unexpectedStatus
    }))
  ),
    "retrieveJWKS": (options) => HttpClientRequest.get(`/signing-keys/keys`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RetrieveJWKS200),
      "500": decodeError("RetrieveJWKS500", RetrieveJWKS500),
      orElse: unexpectedStatus
    }))
  ),
    "getSharingOptions": (options) => HttpClientRequest.get(`/snapshot/shared-options`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSharingOptions200),
      "401": decodeError("GetSharingOptions401", GetSharingOptions401),
      orElse: unexpectedStatus
    }))
  ),
    "deleteDashboardSnapshotByDeleteKey": (deleteKey, options) => HttpClientRequest.get(`/snapshots-delete/${deleteKey}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(DeleteDashboardSnapshotByDeleteKey200),
      "401": decodeError("DeleteDashboardSnapshotByDeleteKey401", DeleteDashboardSnapshotByDeleteKey401),
      "403": decodeError("DeleteDashboardSnapshotByDeleteKey403", DeleteDashboardSnapshotByDeleteKey403),
      "404": decodeError("DeleteDashboardSnapshotByDeleteKey404", DeleteDashboardSnapshotByDeleteKey404),
      "500": decodeError("DeleteDashboardSnapshotByDeleteKey500", DeleteDashboardSnapshotByDeleteKey500),
      orElse: unexpectedStatus
    }))
  ),
    "getDashboardSnapshot": (key, options) => HttpClientRequest.get(`/snapshots/${key}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "400": decodeError("GetDashboardSnapshot400", GetDashboardSnapshot400),
      "404": decodeError("GetDashboardSnapshot404", GetDashboardSnapshot404),
      "500": decodeError("GetDashboardSnapshot500", GetDashboardSnapshot500),
      "200": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "searchTeams": (options) => HttpClientRequest.get(`/teams/search`).pipe(
    HttpClientRequest.setUrlParams({ "page": options?.params?.["page"] as any, "perpage": options?.params?.["perpage"] as any, "name": options?.params?.["name"] as any, "query": options?.params?.["query"] as any, "accesscontrol": options?.params?.["accesscontrol"] as any, "sort": options?.params?.["sort"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchTeams200),
      "401": decodeError("SearchTeams401", SearchTeams401),
      "403": decodeError("SearchTeams403", SearchTeams403),
      "500": decodeError("SearchTeams500", SearchTeams500),
      orElse: unexpectedStatus
    }))
  ),
    "getTeamGroupsApi": (teamId, options) => HttpClientRequest.get(`/teams/${teamId}/groups`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTeamGroupsApi200),
      "400": decodeError("GetTeamGroupsApi400", GetTeamGroupsApi400),
      "401": decodeError("GetTeamGroupsApi401", GetTeamGroupsApi401),
      "403": decodeError("GetTeamGroupsApi403", GetTeamGroupsApi403),
      "404": decodeError("GetTeamGroupsApi404", GetTeamGroupsApi404),
      "500": decodeError("GetTeamGroupsApi500", GetTeamGroupsApi500),
      orElse: unexpectedStatus
    }))
  ),
    "searchTeamGroups": (teamId, options) => HttpClientRequest.get(`/teams/${teamId}/groups/search`).pipe(
    HttpClientRequest.setUrlParams({ "page": options?.params?.["page"] as any, "perpage": options?.params?.["perpage"] as any, "query": options?.params?.["query"] as any, "name": options?.params?.["name"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchTeamGroups200),
      "400": decodeError("SearchTeamGroups400", SearchTeamGroups400),
      "401": decodeError("SearchTeamGroups401", SearchTeamGroups401),
      "403": decodeError("SearchTeamGroups403", SearchTeamGroups403),
      "500": decodeError("SearchTeamGroups500", SearchTeamGroups500),
      orElse: unexpectedStatus
    }))
  ),
    "getTeamByID": (teamId, options) => HttpClientRequest.get(`/teams/${teamId}`).pipe(
    HttpClientRequest.setUrlParams({ "accesscontrol": options?.params?.["accesscontrol"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTeamByID200),
      "401": decodeError("GetTeamByID401", GetTeamByID401),
      "403": decodeError("GetTeamByID403", GetTeamByID403),
      "404": decodeError("GetTeamByID404", GetTeamByID404),
      "500": decodeError("GetTeamByID500", GetTeamByID500),
      orElse: unexpectedStatus
    }))
  ),
    "getTeamMembers": (teamId, options) => HttpClientRequest.get(`/teams/${teamId}/members`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTeamMembers200),
      "401": decodeError("GetTeamMembers401", GetTeamMembers401),
      "403": decodeError("GetTeamMembers403", GetTeamMembers403),
      "404": decodeError("GetTeamMembers404", GetTeamMembers404),
      "500": decodeError("GetTeamMembers500", GetTeamMembers500),
      orElse: unexpectedStatus
    }))
  ),
    "getTeamPreferences": (teamId, options) => HttpClientRequest.get(`/teams/${teamId}/preferences`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetTeamPreferences200),
      "401": decodeError("GetTeamPreferences401", GetTeamPreferences401),
      "500": decodeError("GetTeamPreferences500", GetTeamPreferences500),
      orElse: unexpectedStatus
    }))
  ),
    "getSignedInUser": (options) => HttpClientRequest.get(`/user`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSignedInUser200),
      "401": decodeError("GetSignedInUser401", GetSignedInUser401),
      "403": decodeError("GetSignedInUser403", GetSignedInUser403),
      "404": decodeError("GetSignedInUser404", GetSignedInUser404),
      "500": decodeError("GetSignedInUser500", GetSignedInUser500),
      orElse: unexpectedStatus
    }))
  ),
    "getUserAuthTokens": (options) => HttpClientRequest.get(`/user/auth-tokens`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserAuthTokens200),
      "401": decodeError("GetUserAuthTokens401", GetUserAuthTokens401),
      "403": decodeError("GetUserAuthTokens403", GetUserAuthTokens403),
      "500": decodeError("GetUserAuthTokens500", GetUserAuthTokens500),
      orElse: unexpectedStatus
    }))
  ),
    "updateUserEmail": (options) => HttpClientRequest.get(`/user/email/update`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "302": decodeSuccess(UpdateUserEmail302),
      orElse: unexpectedStatus
    }))
  ),
    "getSignedInUserOrgList": (options) => HttpClientRequest.get(`/user/orgs`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSignedInUserOrgList200),
      "401": decodeError("GetSignedInUserOrgList401", GetSignedInUserOrgList401),
      "403": decodeError("GetSignedInUserOrgList403", GetSignedInUserOrgList403),
      "500": decodeError("GetSignedInUserOrgList500", GetSignedInUserOrgList500),
      orElse: unexpectedStatus
    }))
  ),
    "getUserPreferences": (options) => HttpClientRequest.get(`/user/preferences`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserPreferences200),
      "401": decodeError("GetUserPreferences401", GetUserPreferences401),
      "500": decodeError("GetUserPreferences500", GetUserPreferences500),
      orElse: unexpectedStatus
    }))
  ),
    "getUserQuotas": (options) => HttpClientRequest.get(`/user/quotas`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserQuotas200),
      "401": decodeError("GetUserQuotas401", GetUserQuotas401),
      "403": decodeError("GetUserQuotas403", GetUserQuotas403),
      "404": decodeError("GetUserQuotas404", GetUserQuotas404),
      "500": decodeError("GetUserQuotas500", GetUserQuotas500),
      orElse: unexpectedStatus
    }))
  ),
    "getSignedInUserTeamList": (options) => HttpClientRequest.get(`/user/teams`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetSignedInUserTeamList200),
      "401": decodeError("GetSignedInUserTeamList401", GetSignedInUserTeamList401),
      "403": decodeError("GetSignedInUserTeamList403", GetSignedInUserTeamList403),
      "500": decodeError("GetSignedInUserTeamList500", GetSignedInUserTeamList500),
      orElse: unexpectedStatus
    }))
  ),
    "searchUsers": (options) => HttpClientRequest.get(`/users`).pipe(
    HttpClientRequest.setUrlParams({ "perpage": options?.params?.["perpage"] as any, "page": options?.params?.["page"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchUsers200),
      "401": decodeError("SearchUsers401", SearchUsers401),
      "403": decodeError("SearchUsers403", SearchUsers403),
      "500": decodeError("SearchUsers500", SearchUsers500),
      orElse: unexpectedStatus
    }))
  ),
    "getUserByLoginOrEmail": (options) => HttpClientRequest.get(`/users/lookup`).pipe(
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
    "searchUsersWithPaging": (options) => HttpClientRequest.get(`/users/search`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(SearchUsersWithPaging200),
      "401": decodeError("SearchUsersWithPaging401", SearchUsersWithPaging401),
      "403": decodeError("SearchUsersWithPaging403", SearchUsersWithPaging403),
      "404": decodeError("SearchUsersWithPaging404", SearchUsersWithPaging404),
      "500": decodeError("SearchUsersWithPaging500", SearchUsersWithPaging500),
      orElse: unexpectedStatus
    }))
  ),
    "getUserByID": (userId, options) => HttpClientRequest.get(`/users/${userId}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserByID200),
      "401": decodeError("GetUserByID401", GetUserByID401),
      "403": decodeError("GetUserByID403", GetUserByID403),
      "404": decodeError("GetUserByID404", GetUserByID404),
      "500": decodeError("GetUserByID500", GetUserByID500),
      orElse: unexpectedStatus
    }))
  ),
    "getUserOrgList": (userId, options) => HttpClientRequest.get(`/users/${userId}/orgs`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserOrgList200),
      "401": decodeError("GetUserOrgList401", GetUserOrgList401),
      "403": decodeError("GetUserOrgList403", GetUserOrgList403),
      "404": decodeError("GetUserOrgList404", GetUserOrgList404),
      "500": decodeError("GetUserOrgList500", GetUserOrgList500),
      orElse: unexpectedStatus
    }))
  ),
    "getUserTeams": (userId, options) => HttpClientRequest.get(`/users/${userId}/teams`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetUserTeams200),
      "401": decodeError("GetUserTeams401", GetUserTeams401),
      "403": decodeError("GetUserTeams403", GetUserTeams403),
      "404": decodeError("GetUserTeams404", GetUserTeams404),
      "500": decodeError("GetUserTeams500", GetUserTeams500),
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetAlertRules": (options) => HttpClientRequest.get(`/v1/provisioning/alert-rules`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRules200),
      "403": decodeError("RouteGetAlertRules403", RouteGetAlertRules403),
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetAlertRulesExport": (options) => HttpClientRequest.get(`/v1/provisioning/alert-rules/export`).pipe(
    HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any, "folderUid": options?.params?.["folderUid"] as any, "group": options?.params?.["group"] as any, "ruleUid": options?.params?.["ruleUid"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRulesExport200),
      "403": decodeError("RouteGetAlertRulesExport403", RouteGetAlertRulesExport403),
      "404": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetAlertRule": (UID, options) => HttpClientRequest.get(`/v1/provisioning/alert-rules/${UID}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRule200),
      "403": decodeError("RouteGetAlertRule403", RouteGetAlertRule403),
      "404": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetAlertRuleExport": (UID, options) => HttpClientRequest.get(`/v1/provisioning/alert-rules/${UID}/export`).pipe(
    HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRuleExport200),
      "403": decodeError("RouteGetAlertRuleExport403", RouteGetAlertRuleExport403),
      "404": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetContactpoints": (options) => HttpClientRequest.get(`/v1/provisioning/contact-points`).pipe(
    HttpClientRequest.setUrlParams({ "name": options?.params?.["name"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetContactpoints200),
      "403": decodeError("RouteGetContactpoints403", RouteGetContactpoints403),
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetContactpointsExport": (options) => HttpClientRequest.get(`/v1/provisioning/contact-points/export`).pipe(
    HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any, "decrypt": options?.params?.["decrypt"] as any, "name": options?.params?.["name"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetContactpointsExport200),
      "403": decodeError("RouteGetContactpointsExport403", RouteGetContactpointsExport403),
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetAlertRuleGroup": (FolderUID, Group, options) => HttpClientRequest.get(`/v1/provisioning/folder/${FolderUID}/rule-groups/${Group}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRuleGroup200),
      "403": decodeError("RouteGetAlertRuleGroup403", RouteGetAlertRuleGroup403),
      "404": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetAlertRuleGroupExport": (FolderUID, Group, options) => HttpClientRequest.get(`/v1/provisioning/folder/${FolderUID}/rule-groups/${Group}/export`).pipe(
    HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetAlertRuleGroupExport200),
      "403": decodeError("RouteGetAlertRuleGroupExport403", RouteGetAlertRuleGroupExport403),
      "404": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetMuteTimings": (options) => HttpClientRequest.get(`/v1/provisioning/mute-timings`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetMuteTimings200),
      "403": decodeError("RouteGetMuteTimings403", RouteGetMuteTimings403),
      orElse: unexpectedStatus
    }))
  ),
    "RouteExportMuteTimings": (options) => HttpClientRequest.get(`/v1/provisioning/mute-timings/export`).pipe(
    HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteExportMuteTimings200),
      "403": decodeError("RouteExportMuteTimings403", RouteExportMuteTimings403),
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetMuteTiming": (name, options) => HttpClientRequest.get(`/v1/provisioning/mute-timings/${name}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetMuteTiming200),
      "403": decodeError("RouteGetMuteTiming403", RouteGetMuteTiming403),
      "404": () => Effect.void,
      orElse: unexpectedStatus
    }))
  ),
    "RouteExportMuteTiming": (name, options) => HttpClientRequest.get(`/v1/provisioning/mute-timings/${name}/export`).pipe(
    HttpClientRequest.setUrlParams({ "download": options?.params?.["download"] as any, "format": options?.params?.["format"] as any }),
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteExportMuteTiming200),
      "403": decodeError("RouteExportMuteTiming403", RouteExportMuteTiming403),
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetPolicyTree": (options) => HttpClientRequest.get(`/v1/provisioning/policies`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetPolicyTree200),
      "403": decodeError("RouteGetPolicyTree403", RouteGetPolicyTree403),
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetPolicyTreeExport": (options) => HttpClientRequest.get(`/v1/provisioning/policies/export`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetPolicyTreeExport200),
      "403": decodeError("RouteGetPolicyTreeExport403", RouteGetPolicyTreeExport403),
      "404": decodeError("RouteGetPolicyTreeExport404", RouteGetPolicyTreeExport404),
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetTemplates": (options) => HttpClientRequest.get(`/v1/provisioning/templates`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetTemplates200),
      "403": decodeError("RouteGetTemplates403", RouteGetTemplates403),
      orElse: unexpectedStatus
    }))
  ),
    "RouteGetTemplate": (name, options) => HttpClientRequest.get(`/v1/provisioning/templates/${name}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(RouteGetTemplate200),
      "403": decodeError("RouteGetTemplate403", RouteGetTemplate403),
      "404": decodeError("RouteGetTemplate404", RouteGetTemplate404),
      orElse: unexpectedStatus
    }))
  ),
    "listAllProvidersSettings": (options) => HttpClientRequest.get(`/v1/sso-settings`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(ListAllProvidersSettings200),
      "400": decodeError("ListAllProvidersSettings400", ListAllProvidersSettings400),
      "401": decodeError("ListAllProvidersSettings401", ListAllProvidersSettings401),
      "403": decodeError("ListAllProvidersSettings403", ListAllProvidersSettings403),
      orElse: unexpectedStatus
    }))
  ),
    "getProviderSettings": (key, options) => HttpClientRequest.get(`/v1/sso-settings/${key}`).pipe(
    withResponse(options?.config)(HttpClientResponse.matchStatus({
      "2xx": decodeSuccess(GetProviderSettings200),
      "400": decodeError("GetProviderSettings400", GetProviderSettings400),
      "401": decodeError("GetProviderSettings401", GetProviderSettings401),
      "403": decodeError("GetProviderSettings403", GetProviderSettings403),
      "404": decodeError("GetProviderSettings404", GetProviderSettings404),
      orElse: unexpectedStatus
    }))
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
readonly "RouteGetAlertRulesExport": <Config extends OperationConfig>(options: { readonly params?: typeof RouteGetAlertRulesExportParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRulesExport200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRulesExport403", typeof RouteGetAlertRulesExport403.Type>>
  /**
* Get a specific alert rule by UID.
*/
readonly "RouteGetAlertRule": <Config extends OperationConfig>(UID: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRule200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRule403", typeof RouteGetAlertRule403.Type>>
  /**
* Export an alert rule in provisioning file format.
*/
readonly "RouteGetAlertRuleExport": <Config extends OperationConfig>(UID: string, options: { readonly params?: typeof RouteGetAlertRuleExportParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRuleExport200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRuleExport403", typeof RouteGetAlertRuleExport403.Type>>
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
readonly "RouteGetAlertRuleGroup": <Config extends OperationConfig>(FolderUID: string, Group: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRuleGroup200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRuleGroup403", typeof RouteGetAlertRuleGroup403.Type>>
  /**
* Export an alert rule group in provisioning file format.
*/
readonly "RouteGetAlertRuleGroupExport": <Config extends OperationConfig>(FolderUID: string, Group: string, options: { readonly params?: typeof RouteGetAlertRuleGroupExportParams.Encoded | undefined; readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetAlertRuleGroupExport200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetAlertRuleGroupExport403", typeof RouteGetAlertRuleGroupExport403.Type>>
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
readonly "RouteGetMuteTiming": <Config extends OperationConfig>(name: string, options: { readonly config?: Config | undefined } | undefined) => Effect.Effect<WithOptionalResponse<typeof RouteGetMuteTiming200.Type, Config>, HttpClientError.HttpClientError | SchemaError | GrafanaError<"RouteGetMuteTiming403", typeof RouteGetMuteTiming403.Type>>
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
