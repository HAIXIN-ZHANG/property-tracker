import {
  getDataAvailabilityMeta,
  getRuntimeDataState,
  type ExtractionRun,
  type MarketSignalSnapshot
} from "@/lib/data-contracts";

describe("data contracts", () => {
  it("keeps provider-gated data visibly access pending", () => {
    expect(getDataAvailabilityMeta("access_pending")).toMatchObject({
      label: "Access pending",
      tone: "warning"
    });
  });

  it("separates field validation from area mapping readiness", () => {
    expect(getDataAvailabilityMeta("file_validated").label).toBe("File validated");
    expect(getDataAvailabilityMeta("mapping_pending").label).toBe("Mapping pending");
  });

  it("uses the canonical runtime status vocabulary for samples and accepted sources", () => {
    expect(getDataAvailabilityMeta("sample_data")).toMatchObject({
      label: "Sample data",
      tone: "neutral"
    });
    expect(getDataAvailabilityMeta("source_accepted")).toMatchObject({
      label: "Source accepted",
      tone: "neutral"
    });
  });

  it("normalizes provider metadata for runtime UI consumption", () => {
    const state = getRuntimeDataState({
      data: ["ellenbrook"],
      ok: true,
      source: "AreaScope mock area provider",
      status: "sample_data",
      warnings: ["Read-only sample data."]
    });

    expect(state).toEqual({
      source: "AreaScope mock area provider",
      status: "sample_data",
      warnings: ["Read-only sample data."]
    });
  });

  it("requires derived market snapshots to carry missing dependencies", () => {
    const snapshot: MarketSignalSnapshot = {
      areaSlug: "ellenbrook",
      availability: "derived_later",
      formula: "(new listings - sold listings) / active listings",
      group: "pressure",
      id: "snapshot_net_supply_rate",
      missingDependencies: ["Active listings", "Sold listings"],
      signalId: "net_supply_rate",
      sourceDocumentIds: [],
      status: "derived_later"
    };

    expect(snapshot.missingDependencies.length).toBeGreaterThan(0);
    expect(snapshot.formula).toContain("active listings");
  });

  it("keeps extraction output reviewable before it becomes product truth", () => {
    const run: ExtractionRun = {
      createdAt: "2026-06-21T00:00:00.000Z",
      extractedFields: [
        {
          confidence: "medium",
          key: "lot_size",
          label: "Lot size",
          sourceDocumentId: "src_builder_package_pdf",
          status: "source_accepted",
          value: "450 sqm"
        }
      ],
      id: "run_builder_package_001",
      mode: "ai_assisted",
      providerId: "manual-source",
      sourceDocumentId: "src_builder_package_pdf",
      status: "needs_review",
      warnings: ["AI extraction needs human review before comparison."]
    };

    expect(run.status).toBe("needs_review");
    expect(run.extractedFields[0]?.status).toBe("source_accepted");
  });
});
