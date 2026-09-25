import { roleForType } from "./Datasources.js"

// Dashboards hold a team's curated queries. graf reads them so an agent can reuse a panel's
// query with the matching `graf <signal>` command.

export interface PanelQuery {
  readonly refId?: string | undefined
  readonly datasource?: string | undefined
  readonly datasourceType?: string | undefined
  // The signal graf would run this with, when the datasource type is known and supported.
  readonly role?: string | undefined
  readonly query?: string | undefined
}

export interface Panel {
  readonly id?: number | undefined
  readonly title: string
  readonly type?: string | undefined
  readonly row?: string | undefined
  readonly queries: ReadonlyArray<PanelQuery>
}

export interface Variable {
  readonly name: string
  readonly type?: string | undefined
  readonly query?: string | undefined
  readonly current?: string | undefined
}

export interface DashboardSummary {
  readonly uid?: string | undefined
  readonly title?: string | undefined
  readonly tags: ReadonlyArray<string>
  readonly variables: ReadonlyArray<Variable>
  readonly panels: ReadonlyArray<Panel>
}

const record = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {}
const array = (value: unknown): ReadonlyArray<unknown> => Array.isArray(value) ? value : []
const str = (value: unknown): string | undefined => typeof value === "string" && value.length > 0 ? value : undefined

// A datasource reference is `{uid, type}`, a legacy name string, or a template variable.
const datasourceRef = (value: unknown): { readonly name?: string | undefined; readonly type?: string | undefined } =>
  typeof value === "string" ? { name: value } : { name: str(record(value).uid), type: str(record(value).type) }

const queryText = (target: Record<string, unknown>): string | undefined =>
  str(target.expr) ?? str(target.query) ?? str(target.rawSql) ?? str(target.labelSelector) ?? str(target.expression)

const panelQueries = (panel: Record<string, unknown>): ReadonlyArray<PanelQuery> => {
  const panelDs = datasourceRef(panel.datasource)
  return array(panel.targets).map((entry) => {
    const target = record(entry)
    const ds = target.datasource === undefined ? panelDs : datasourceRef(target.datasource)
    return {
      refId: str(target.refId),
      datasource: ds.name,
      datasourceType: ds.type,
      role: roleForType(ds.type),
      query: queryText(target),
    }
  })
}

export const summarizeDashboard = (dashboard: unknown): DashboardSummary => {
  const root = record(dashboard)
  const panels: Array<Panel> = []
  const visit = (entries: ReadonlyArray<unknown>, row: string | undefined) => {
    let currentRow = row
    for (const entry of entries) {
      const panel = record(entry)
      if (panel.type === "row") {
        currentRow = str(panel.title)
        // Collapsed rows keep their panels nested.
        visit(array(panel.panels), currentRow)
        continue
      }
      panels.push({
        id: typeof panel.id === "number" ? panel.id : undefined,
        title: str(panel.title) ?? "(untitled)",
        type: str(panel.type),
        row: currentRow,
        queries: panelQueries(panel),
      })
      if (array(panel.panels).length > 0) visit(array(panel.panels), currentRow)
    }
  }
  visit(array(root.panels), undefined)

  return {
    uid: str(root.uid),
    title: str(root.title),
    tags: array(root.tags).filter((tag): tag is string => typeof tag === "string"),
    variables: array(record(root.templating).list).map((entry) => {
      const variable = record(entry)
      const current = record(variable.current).value
      return {
        name: str(variable.name) ?? "?",
        type: str(variable.type),
        query: typeof variable.query === "string" ? variable.query : str(record(variable.query).query),
        current: Array.isArray(current) ? current.join(",") : typeof current === "string" ? current : undefined,
      }
    }),
    panels,
  }
}
