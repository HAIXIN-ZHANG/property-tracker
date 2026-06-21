import { getSourceStatusMeta } from "@/lib/source-status";

describe("getSourceStatusMeta", () => {
  it("returns a user-facing label for access-gated providers", () => {
    expect(getSourceStatusMeta("access_pending").label).toBe("Access pending");
  });

  it("returns validated metadata for field-checked open data sources", () => {
    expect(getSourceStatusMeta("validated")).toMatchObject({
      label: "Validated",
      color: "eucalyptus"
    });
  });

  it("separates source validation from pending area mapping", () => {
    expect(getSourceStatusMeta("mapping_pending")).toMatchObject({
      label: "Mapping pending",
      color: "ocean"
    });
  });
});
