(function () {
  'use strict';

  describe("Generate primes", function() {
    describe("Generate primes", function() {
      it("The primes <10 are 2,3,5,7", function() {
        expect(primes(10).toString()).toBe([2,3,5,7].toString());
      });

      it("Primes up to 100", function() {
        expect(primes(100).toString()).toBe([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].toString());
      });

      it("Run up to 100,000 to see the time - TODO find a way for a time only test.", function() {
        primes(100000);
        expect(true).toBe(true);
      });

    });
  });
})();
