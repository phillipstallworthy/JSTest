(function () {
  'use strict';

  describe("Test supporting functions", function() {
    describe("Generate primes", function() {
      it("The primes <10 are 2,3,5,7", function() {
        expect(primeSieve(10).toString()).toBe([2,3,5,7].toString());
      });

      it("Primes up to 100", function() {
        expect(primeSieve(100).toString()).toBe([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].toString());
      });

      it("Run up to 100,000 to see the time - TODO find a way for a time only test.", function() {
        primeSieve(100000);
        expect(true).toBe(true);
      });

    });
  });
  describe("Composite test", function() {
    describe("Test prime and compsite numbers", function() {
      primes = primeSieve(20);
      //divLog
      it("Test 4", function() {
        expect(isComposite(4)).toBe(true);
      });

      it("Test 6", function() {
        expect(isComposite(6)).toBe(true);
      });

      it("test 11", function() {
        expect(isComposite(11)).toBe(false);
      });
      

    });
  });
  describe("Prime Divisor count test", function() {
    describe("Count divisors on single numbers", function() {
      primes = primeSieve(2000);
      it("6 has 2 prime divisors", function() {
        console.log("test 6");
        expect(countDivisors(6)).toBe(2);
      });

      it("8 has 3 dprime ivisors", function() {
        console.log("test 8");
        expect(countDivisors(8)).toBe(3);
      });
      
      it("1386 has 5 prime divisors", function() {
        console.log("test 1386");
        expect(countDivisors(1386)).toBe(5);
      });

      it("14 has 2 prime divisors", function() {
        console.log("test 14");
        expect(countDivisors(14)).toBe(2);
      });

      it("18 has 3 prime divisors", function() {
        console.log("test 18");
        divLog = [];
        expect(countDivisors(18)).toBe(3);
        console.log(18 +" has divisors of " + divLog.toString());
      });

    });
  });
})();

