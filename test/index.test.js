const Vicis = require("../src/vicis.js").default;

describe("calling and printing", () => {
  it("should not crash on call", () => {
    const log = jest.spyOn(console, "log").mockImplementation((any) => any);
    const vicis = new Vicis({});
    expect(vicis.hasErrors()).toBe(false);
  });
});
