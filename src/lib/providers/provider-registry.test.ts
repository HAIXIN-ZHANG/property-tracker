import { absProviderAdapter } from "@/lib/providers/abs-provider";
import { domainProviderAdapter } from "@/lib/providers/domain-provider";
import { providerAdapters } from "@/lib/providers/provider-registry";
import { waCrimeProviderAdapter } from "@/lib/providers/wa-crime-provider";

describe("providerAdapters", () => {
  it("registers the Stage 2 adapter stubs", () => {
    expect(providerAdapters.map((provider) => provider.id)).toEqual([
      "domain",
      "abs-census",
      "wa-police-crime"
    ]);
  });

  it("keeps Domain closed until buyer-facing API packages are approved", () => {
    expect(domainProviderAdapter.status).toBe("access_pending");
    expect(domainProviderAdapter.query({ suburb: "Ellenbrook", state: "WA" })).toMatchObject({
      ok: false,
      status: "access_pending"
    });
  });

  it("does not return ABS data before suburb-to-SA2 mapping is verified", () => {
    expect(absProviderAdapter.query({ areaSlug: "ellenbrook", state: "WA" })).toMatchObject({
      ok: false,
      status: "mapping_pending"
    });
  });

  it("does not return WA crime data before locality mapping is verified", () => {
    expect(waCrimeProviderAdapter.query({ areaSlug: "ellenbrook" })).toMatchObject({
      ok: false,
      status: "mapping_pending"
    });
  });
});
