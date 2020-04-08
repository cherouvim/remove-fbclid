const removeFbclid = require("./index.js");

const getMockedWindowWithoutHistory = href => {
  const mockedWindow = {
    replaceExecutionsCount: 0,
    location: {
      href: href,
      replace: function(url) {
        mockedWindow.location.href = url;
        mockedWindow.replaceExecutionsCount++;
      }
    }
  };
  return mockedWindow;
};

const getMockedWindowWithHistory = href => {
  const mockedWindow = {
    replaceExecutionsCount: 0,
    location: {
      href: href
    },
    history: {
      replaceState: function(a, b, url) {
        mockedWindow.location.href = url;
        mockedWindow.replaceExecutionsCount++;
      }
    }
  };
  return mockedWindow;
};

const mockWindowSpecs = [
  {
    testTitle: "on window without history",
    factoryFunction: getMockedWindowWithoutHistory
  },
  {
    testTitle: "on window with history",
    factoryFunction: getMockedWindowWithHistory
  }
];

const testDataWithoutFbclidParam = [
  { initial: "http://example.com", final: "http://example.com" },
  { initial: "http://example.com/", final: "http://example.com/" },
  { initial: "http://example.com/foo", final: "http://example.com/foo" },
  { initial: "http://example.com/fbclid", final: "http://example.com/fbclid" },
  { initial: "http://example.com/foo/bar", final: "http://example.com/foo/bar" },
  { initial: "http://example.com/fbclid/bar", final: "http://example.com/fbclid/bar" },
  { initial: "http://example.com/foo/bar/test", final: "http://example.com/foo/bar/test" },
  { initial: "http://example.com/foo?a=1", final: "http://example.com/foo?a=1" },
  { initial: "http://example.com/foo?a=fbclid", final: "http://example.com/foo?a=fbclid" },
  { initial: "http://example.com/foo?a=1&b=2", final: "http://example.com/foo?a=1&b=2" },
  { initial: "http://example.com/foo?a=fbclid&b=2", final: "http://example.com/foo?a=fbclid&b=2" },
  { initial: "http://example.com/foo?a=1", final: "http://example.com/foo?a=1" },
  { initial: "http://example.com/foo?a=1&b=2", final: "http://example.com/foo?a=1&b=2" },
  { initial: "http://example.com/foo?a=1&b=2#", final: "http://example.com/foo?a=1&b=2#" },
  { initial: "http://example.com/foo?a=1&b=2#baz", final: "http://example.com/foo?a=1&b=2#baz" }
];

const testDataWithFbclidParam = [
  { initial: "http://example.com/?fbclid=123", final: "http://example.com/" },
  { initial: "http://example.com/foo?fbclid=abc", final: "http://example.com/foo" },
  { initial: "http://example.com/fbclid?fbclid=qwerty", final: "http://example.com/fbclid" },
  { initial: "http://example.com/foo/bar?fbclid=___", final: "http://example.com/foo/bar" },
  { initial: "http://example.com/fbclid/bar?fbclid=456", final: "http://example.com/fbclid/bar" },
  { initial: "http://example.com/foo/bar/test?fbclid=abc", final: "http://example.com/foo/bar/test" },
  { initial: "http://example.com/foo?a=1&fbclid=123", final: "http://example.com/foo?a=1" },
  { initial: "http://example.com/foo?a=fbclid&fbclid=abc", final: "http://example.com/foo?a=fbclid" },
  { initial: "http://example.com/foo?a=1&b=2&fbclid=___", final: "http://example.com/foo?a=1&b=2" },
  { initial: "http://example.com/foo?fbclid=a&a=fbclid&b=2", final: "http://example.com/foo?a=fbclid&b=2" },
  { initial: "http://example.com/foo?fbclid=123&a=1", final: "http://example.com/foo?a=1" },
  { initial: "http://example.com/foo?fbclid=123&a=1&b=2#", final: "http://example.com/foo?a=1&b=2#" },
  { initial: "http://example.com/foo?a=1&fbclid=123&b=2#baz", final: "http://example.com/foo?a=1&b=2#baz" }
];

describe("executing removeFbclid", () => {
  mockWindowSpecs.forEach(mockWindowSpec => {
    describe(mockWindowSpec.testTitle, () => {
      test("does not crash or alter URL for undefined URL", () => {
        const mockWindow = mockWindowSpec.factoryFunction(undefined);
        removeFbclid(mockWindow);
        expect(mockWindow.location.href).toBeUndefined();
      });
      test("does not crash or alter URL for non string URL (not really doable though)", () => {
        const mockWindow = mockWindowSpec.factoryFunction(123);
        removeFbclid(mockWindow);
        expect(mockWindow.location.href).toEqual(123);
      });
      test("does not crash or alter URL for empty URL", () => {
        const mockWindow = mockWindowSpec.factoryFunction("");
        removeFbclid(mockWindow);
        expect(mockWindow.location.href).toEqual("");
      });
      test("does not alter a URL without the fbclid parameter", () => {
        testDataWithoutFbclidParam.forEach(testData => {
          const mockWindow = mockWindowSpec.factoryFunction(testData.initial);
          // Keep track of how many times replace has been called.
          const replaceExecutionsCount = mockWindow.replaceExecutionsCount;
          removeFbclid(mockWindow);
          // Ensure that replace was not called.
          expect(mockWindow.replaceExecutionsCount).toEqual(replaceExecutionsCount);
          // Ensure that URL remained the same.
          expect(mockWindow.location.href).toEqual(testData.final);
        });
      });
      test("does alter a URL with the fbclid parameter", () => {
        testDataWithFbclidParam.forEach(testData => {
          const mockWindow = mockWindowSpec.factoryFunction(testData.initial);
          // Keep track of how many times replace has been called.
          const replaceExecutionsCount = mockWindow.replaceExecutionsCount;
          removeFbclid(mockWindow);
          // Ensure that replace was called once.
          expect(mockWindow.replaceExecutionsCount).toEqual(replaceExecutionsCount + 1);
          // Ensure that URL changed to the expected one.
          expect(mockWindow.location.href).toEqual(testData.final);
        });
      });
    });
  });
});
