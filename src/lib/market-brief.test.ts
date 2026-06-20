import {
  getMarketBriefCategories,
  getPrimaryMarketBriefItems,
  marketBriefItems
} from "@/lib/market-brief";

describe("marketBriefItems", () => {
  it("keeps the first market brief as a source link slate", () => {
    expect(marketBriefItems).toHaveLength(7);
    expect(marketBriefItems.every((item) => item.href.startsWith("https://"))).toBe(true);
  });

  it("separates primary reading sources from supporting signals", () => {
    expect(getPrimaryMarketBriefItems().map((item) => item.sourceName)).toEqual([
      "Domain",
      "realestate.com.au",
      "SQM Research",
      "PropTrack"
    ]);
  });

  it("covers market, policy, planning and data signals", () => {
    expect(getMarketBriefCategories().sort()).toEqual(["data", "market", "planning", "policy"]);
  });
});
