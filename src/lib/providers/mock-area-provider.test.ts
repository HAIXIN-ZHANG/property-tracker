import { mockAreaProvider } from "@/lib/providers/mock-area-provider";

describe("mockAreaProvider", () => {
  it("returns sample areas through a provider result boundary", () => {
    const result = mockAreaProvider.getAreas();

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.status).toBe("sample_data");
      expect(result.data.map((area) => area.identity.slug)).toEqual([
        "ellenbrook",
        "alkimos",
        "baldivis",
        "byford",
        "subiaco"
      ]);
    }
  });

  it("keeps area identity mappings pending until provider keys are verified", () => {
    const result = mockAreaProvider.getAreaIdentityMappings();

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.every((mapping) => mapping.status === "mapping_pending")).toBe(true);
      expect(result.data.every((mapping) => mapping.caveats.length > 0)).toBe(true);
    }
  });

  it("does not fabricate source records for sample opportunities", () => {
    const areaResult = mockAreaProvider.getAreaBySlug("ellenbrook");
    const opportunityResult = mockAreaProvider.getOpportunityById("ellenbrook", "ell-land-001");

    expect(areaResult.ok).toBe(true);
    expect(opportunityResult.ok).toBe(true);
    if (areaResult.ok && opportunityResult.ok && areaResult.data && opportunityResult.data) {
      const sourceResult = mockAreaProvider.getOpportunitySourceRecords(
        areaResult.data,
        opportunityResult.data
      );

      expect(sourceResult.ok).toBe(true);
      if (sourceResult.ok) {
        expect(sourceResult.data).toEqual([]);
        expect(sourceResult.warnings).toContain(
          "No source document is attached to this sample opportunity yet."
        );
      }
    }
  });
});
