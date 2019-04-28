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

      it("1 million 1,000,000 - time only test.", function() {
        primeSieve(1000000);
        expect(true).toBe(true);
      });

    });
  });
  describe("Composite test", function() {
    describe("Test prime and compsite numbers", function() {
      var primes = primeSieve(20);
      it("Test 4", function() {
        expect(isComposite(4,primes)).toBe(true);
      });

      it("Test 6", function() {
        expect(isComposite(6,primes)).toBe(true);
      });

      it("test 11", function() {
        expect(isComposite(11,primes)).toBe(false);
      });
      

    });
  });
  describe("Prime Factor test", function() {
    describe("Prime Factors", function() {
      var primes = primeSieve(2000);
      it("6 has 2 prime factors", function() {
        expect(primeFactor(6,primes)).toEqual([2,3]);
      });

      it("8 has 3 prime factors", function() {
        expect(primeFactor(8,primes)).toEqual([2,2,2]);
      });
      
      it("1386 has 5 prime factors", function() {
        expect(primeFactor(1386,primes)).toEqual([2,3,3,7,11]);
      });

      it("14(/2 is prime) has 2 prime factors", function() {
        expect(primeFactor(14,primes)).toEqual([2,7]);
      });

      it("57(/3 is prime) has 2 prime factors", function() {
        expect(primeFactor(57,primes)).toEqual([3,19]);
      });

      it("18 has 3 prime divisors", function() {
        expect(primeFactor(18,primes)).toEqual([2,3,3]);
      });

      it("perfect square 900 has 8 prime divisors", function() {
        expect(primeFactor(900,primes)).toEqual([2,2,3,3,5,5]);
      });

      it("Prime number 97 0 divisors", function() {
        expect(primeFactor(97,primes)).toEqual([]);
      });

      it("529 (prime number squared) divisors", function() {
        expect(primeFactor(529,primes)).toEqual([23,23]);
      });

      it("266 (prime * prime * prime) divisors", function() {
        expect(primeFactor(266,primes)).toEqual([2,7,19]);
      });

    });
  });

  describe("Fill in the divisors", function() {
    describe("Fill in the divisors", function() {

      it("2,3,4,5,6 test", function() {
        expect(allDivisors([2,3,4,5,6])).toEqual([2,3]);
      });

      xit("1368 has 5 prime divisors 2,3,3,7,11", function() {
        expect(allDivisors([2,3,3,7,11])).toEqual([2,3]);
      });

    });
  });
})();

