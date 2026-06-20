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
});
