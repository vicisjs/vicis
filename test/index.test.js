const alterme = require("../alterme.js").default;

describe("calling and printing", () => {
  it("should not crash on call", () => {
    const log = jest.spyOn(console, "log").mockImplementation((any) => any);
    alterme();
    expect(log).toHaveBeenCalled();
  });
});
