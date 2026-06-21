import { dataSourceStatuses } from "@/lib/data-source-status";

describe("dataSourceStatuses", () => {
  it("keeps Domain and PropTrack access-gated", () => {
    expect(
      dataSourceStatuses
        .filter(
          (source) => source.id === "domain-core-packages" || source.id === "proptrack-commercial"
        )
        .every((source) => source.status === "access_pending")
    ).toBe(true);
  });

  it("marks open files as mapping-pending before suburb-level display", () => {
    expect(
      dataSourceStatuses
        .filter((source) =>
          ["abs-census-wa", "wa-police-crime", "wa-schools", "transperth-gtfs"].includes(source.id)
        )
        .every((source) => source.status === "mapping_pending")
    ).toBe(true);
  });

  it("separates validated source documents from mapping-pending data sources", () => {
    const abs = dataSourceStatuses.find((source) => source.id === "abs-census-wa");

    expect(abs?.status).toBe("mapping_pending");
    expect(abs?.sourceDocuments[0]?.status).toBe("file_validated");
  });

  it("keeps evidence metadata inspectable for every attached source document", () => {
    for (const source of dataSourceStatuses) {
      expect(source.evidence.basis).toBeTruthy();
      expect(source.evidence.lastCheckedAt).toBeTruthy();

      for (const document of source.sourceDocuments) {
        expect(document.sourceName).toBeTruthy();
        expect(document.lastCheckedAt).toBeTruthy();
        expect(document.confidence).toBeTruthy();
        expect(document.missingFields).toEqual(expect.any(Array));
      }
    }
  });
});
