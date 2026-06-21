import {
  getAreaBySlug,
  getAreas,
  getOpportunityById,
  getOpportunitySourceRecords,
  getOpportunityRouteParams,
  strategyLensLabels
} from "@/lib/areas";

describe("areaProfiles", () => {
  it("defines the first five WA sample areas", () => {
    expect(getAreas().map((area) => area.identity.slug)).toEqual([
      "ellenbrook",
      "alkimos",
      "baldivis",
      "byford",
      "subiaco"
    ]);
  });

  it("keeps sample area cards source-labelled", () => {
    const ellenbrook = getAreaBySlug("ellenbrook");

    expect(ellenbrook?.metrics.every((metric) => metric.status)).toBe(true);
    expect(ellenbrook?.signals.every((signal) => signal.source)).toBe(true);
  });

  it("supports the three strategy lenses", () => {
    expect(Object.values(strategyLensLabels)).toEqual(["Live", "Invest", "Build"]);
  });

  it("generates static route params for sample opportunity detail pages", () => {
    expect(getOpportunityRouteParams()).toEqual(
      expect.arrayContaining([
        { slug: "ellenbrook", opportunityId: "ell-land-001" },
        { slug: "alkimos", opportunityId: "alk-land-001" }
      ])
    );
  });

  it("can resolve an opportunity by area slug and opportunity id", () => {
    expect(getOpportunityById("ellenbrook", "ell-package-001")?.type).toBe("House & Land");
  });

  it("does not mark unverified suburb metric cards as validated suburb truth", () => {
    const unverifiedAreas = getAreas().filter(
      (area) => area.identity.mappingStatus === "unverified"
    );

    expect(
      unverifiedAreas.every((area) => area.metrics.every((metric) => metric.status !== "validated"))
    ).toBe(true);
  });

  it("does not fabricate provenance when no real source record is attached", () => {
    const area = getAreaBySlug("ellenbrook");
    const opportunity = getOpportunityById("ellenbrook", "ell-land-001");

    expect(area).toBeDefined();
    expect(opportunity).toBeDefined();
    expect(getOpportunitySourceRecords(area!, opportunity!)).toEqual([]);
  });
});
