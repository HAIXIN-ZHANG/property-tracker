import type { MarketSignalAvailability, MarketSignalGroup } from "@/lib/market-signals";

export type DataAvailabilityStatus =
  | "sample_data"
  | "docs_verified"
  | "credential_verified"
  | "file_validated"
  | "mapping_pending"
  | "access_pending"
  | "license_constrained"
  | "source_accepted"
  | "derived_later"
  | "rejected";

export type DataAvailabilityMeta = {
  label: string;
  description: string;
  tone: "neutral" | "positive" | "warning" | "blocked";
};

export const dataAvailabilityMeta: Record<DataAvailabilityStatus, DataAvailabilityMeta> = {
  access_pending: {
    label: "Access pending",
    description: "Provider approval, credentials, or a commercial plan is still required.",
    tone: "warning"
  },
  credential_verified: {
    label: "Credential verified",
    description: "Authentication works, but product data may still be gated.",
    tone: "positive"
  },
  derived_later: {
    label: "Derived later",
    description: "Requires upstream fields and a transparent formula before display.",
    tone: "neutral"
  },
  docs_verified: {
    label: "Docs verified",
    description: "Official docs or catalogue exists; fields still need testing.",
    tone: "neutral"
  },
  file_validated: {
    label: "File validated",
    description: "A sample file or response was inspected and fields were confirmed.",
    tone: "positive"
  },
  license_constrained: {
    label: "Licence constrained",
    description: "Source exists, but reuse/display terms need review before public use.",
    tone: "warning"
  },
  mapping_pending: {
    label: "Mapping pending",
    description: "Source fields are usable, but area-level mapping is not verified yet.",
    tone: "warning"
  },
  rejected: {
    label: "Rejected",
    description: "Not suitable as a durable product data source.",
    tone: "blocked"
  },
  sample_data: {
    label: "Sample data",
    description: "Static demo data used to validate the UI and product loop.",
    tone: "neutral"
  },
  source_accepted: {
    label: "Source accepted",
    description: "The source type is acceptable, but no sample extraction is validated yet.",
    tone: "neutral"
  }
};

export type ProviderResult<T> =
  | {
      ok: true;
      data: T;
      status: DataAvailabilityStatus;
      source: string;
      warnings?: string[];
    }
  | {
      ok: false;
      status: DataAvailabilityStatus;
      source: string;
      error: string;
      warnings?: string[];
    };

export type RuntimeDataState = {
  status: DataAvailabilityStatus;
  source: string;
  warnings: string[];
};

export function getRuntimeDataState<T>(result: ProviderResult<T>): RuntimeDataState {
  return {
    source: result.source,
    status: result.status,
    warnings: result.warnings ?? []
  };
}

export type ProviderAdapter<TQuery, TResult> = {
  id: string;
  name: string;
  status: DataAvailabilityStatus;
  capabilities: string[];
  caveats: string[];
  query: (query: TQuery) => ProviderResult<TResult>;
};

export type SourceDocument = {
  id: string;
  title: string;
  sourceType: "api" | "file" | "url" | "manual_note" | "pdf" | "pasted_text";
  status: DataAvailabilityStatus;
  sourceName: string;
  sourceUrl?: string;
  capturedAt?: string;
  lastCheckedAt?: string;
  confidence?: "low" | "medium" | "high";
  missingFields: string[];
  rawSnapshotId?: string;
};

export type ExtractedField = {
  key: string;
  label: string;
  value?: string | number | boolean;
  status: DataAvailabilityStatus;
  confidence: "low" | "medium" | "high";
  sourceDocumentId: string;
  note?: string;
};

export type ExtractionRun = {
  id: string;
  sourceDocumentId: string;
  providerId: string;
  status: "not_started" | "running" | "needs_review" | "accepted" | "failed";
  mode: "manual" | "ai_assisted";
  createdAt: string;
  completedAt?: string;
  extractedFields: ExtractedField[];
  warnings: string[];
};

export type AreaIdentityMapping = {
  areaSlug: string;
  displayName: string;
  state: "WA";
  status: DataAvailabilityStatus;
  primaryPostcode: string;
  providerKeys: {
    absSa2?: string;
    domainLocationId?: string;
    landgateLocality?: string;
    policeRegion?: string;
    transperthZone?: string;
  };
  caveats: string[];
};

export type MarketSignalSnapshot = {
  id: string;
  areaSlug: string;
  signalId: string;
  group: MarketSignalGroup;
  availability: MarketSignalAvailability;
  status: DataAvailabilityStatus;
  value?: string | number;
  unit?: string;
  period?: string;
  sourceDocumentIds: string[];
  formula?: string;
  missingDependencies: string[];
};

export function getDataAvailabilityMeta(status: DataAvailabilityStatus) {
  return dataAvailabilityMeta[status];
}
