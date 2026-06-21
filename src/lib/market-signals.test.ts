import {
  getDerivedMarketSignals,
  getMarketSignalAvailabilityMeta,
  getMarketSignalsByGroup,
  marketSignalDefinitions
} from "@/lib/market-signals";

describe("marketSignalDefinitions", () => {
  it("documents the core signal groups for the Market Signals page", () => {
    const groups = Array.from(
      new Set(marketSignalDefinitions.map((signal) => signal.group))
    ).sort();

    expect(groups).toEqual(["demand", "future_supply", "pressure", "price", "rental", "supply"]);
  });

  it("keeps derived metrics explicit about formulas and dependencies", () => {
    expect(getDerivedMarketSignals()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "vendor_discount" }),
        expect.objectContaining({ id: "net_supply_rate" }),
        expect.objectContaining({ id: "months_of_stock" })
      ])
    );

    expect(
      getDerivedMarketSignals().every((signal) => signal.formula && signal.dependencies.length >= 2)
    ).toBe(true);
  });

  it("keeps supply signals separate from rental and pressure signals", () => {
    expect(getMarketSignalsByGroup("supply").map((signal) => signal.id)).toEqual([
      "active_listings_trend",
      "new_listings",
      "old_listings"
    ]);
  });

  it("keeps runtime availability states distinct", () => {
    expect(getMarketSignalAvailabilityMeta("external_link_now").label).toBe("Link only");
    expect(getMarketSignalAvailabilityMeta("public_source").label).toBe("Public source candidate");
    expect(getMarketSignalAvailabilityMeta("derived_later").label).toBe("Derived later");
  });
});
