const vicis = require("../vicis.js").default;

describe("calling and printing", () => {
  it("should not crash on call", () => {
    const log = jest.spyOn(console, "log").mockImplementation((any) => any);
    vicis();
    expect(log).toHaveBeenCalled();
  });
});
