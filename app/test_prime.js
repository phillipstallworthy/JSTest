(function () {
  'use strict';

  describe("Generate primes", function() {
    describe("Generate primes", function() {
      it("The primes <10 are 2,3,5,7", function() {
        expect(primes(10).toString()).toBe([2,3,5,7].toString());
      });

      it("where A = 2 B = 55 and K = 5", function() {
        expect(primes(100).toString()).toBe([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].toString());
      });

    });
  });
})();
