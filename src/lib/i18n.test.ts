import { translate, uiCopy } from "@/lib/i18n";

describe("uiCopy", () => {
  it("keeps English and Chinese UI dictionaries aligned", () => {
    expect(Object.keys(uiCopy.zh).sort()).toEqual(Object.keys(uiCopy.en).sort());
  });

  it("translates core navigation labels", () => {
    expect(translate("zh", "common.backToAreas")).toBe("返回区域");
    expect(translate("en", "opportunities.open")).toBe("Open detail");
  });
});
