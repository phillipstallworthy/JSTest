
/*
 * 
 * a - lower limit integer
 * b - higher limit
 * k - number of divisors we are looking for
 * 
 * Return the number of integers in the range a- inclusive that have k divisors
 *
*/
function evaluateDivisors(a, b, k) {

  primes = primeSieve(b); //optimise - sqr root plus one prime?

  return trialDivision(a, b, k, primes);

}


/*
 * https://en.wikipedia.org/wiki/Trial_division
 * 
 * Very simple trial division - just to get going!
 * 
 * Return the number of integers in the range a- inclusive that have k divisors
 * 
*/

function trialDivision(a, b, k,primes) {

  var countInt = 0;

  for (i = a; i <= b; i++) {

    var factors = primeFactor(i,primes);

    if (factors.length == k) {
      countInt++;
    }
  }
  return countInt;
}

/*
 * Return an array of the prime factors.
 * Based in simple prime trial division described here
 * https://en.wikipedia.org/wiki/Factorization#General_methods
 * 
 * test data:
 * https://en.wikipedia.org/wiki/Table_of_prime_factors
 * 
 * TODO, divisors
 * https://en.wikipedia.org/wiki/Table_of_divisors
 * 
 * num - the number to factorise
 * primes - an array of primes that goes to at least one prime
 * past the sqr root of num.
 */
function primeFactor(num, primes) {
  var primeFactors = [];
  for (var i = 0; i < primes.length; i++) {
    var prime = primes[i];

    // Prime factors only, so empty [] return for primes, rather that [1,19].
    if (num == prime){
      return [];
    }

    if (num % prime == 0) {
      console.log("prime " + prime + " is a factor of " + num);
      primeFactors.push(prime);
      var result = num / prime;

      if (prime ** 2 > result) {
        primeFactors.push(result);
        console.log("done because " + prime + " squared is greater than " + result);
        return primeFactors;
      }

      if (isComposite(result, primes)) {
        primeFactors = primeFactors.concat(primeFactor(result,primes));
      } else { // last divisor is always prime. Needs to be an else, so not run on return from recursion. 
        console.log("prime result of division " + result);
        primeFactors.push(result);
      }

      console.log("final prime factors of " + num + " are " + primeFactors.toString());
      return primeFactors;
    }
  }
}

/*
 * is num composite?
 * primes is an array of primes that go to at least num
 *
 */
function isComposite(num, primes) {
  var q = 0;
  //console.log("is " + n + " compsite?")
  while (true) {
    //console.log("Checking prime index " + q + " which is " + primes[q]);
    if (primes[q] == num) {
      //console.log(n + " is prime");
      return false;
    }
    if (primes[q] > num) {
      //console.log(n + " is composite");
      return true;
    }
    q++
  }
}


/*
 * return an array of primes from 2 to num.
 * 100,000 runs in 0.014 sec. :)
 * https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 * 
 */

function primeSieve(max) {

  //initialise an array with all true(=prime)
  var integers = [];
  for (i = 0; i <= max; i++) {
    integers[i] = true;
  }


  integers[0] = false; // 0 is not a prime
  integers[1] = false; // neither is 1

  var prime = 1;

  while (true) {

    // find the next true value in the array. In this sieve, its the next prime.
    var prime = integers.indexOf(true, prime + 1);

    //if there are no multiples of prime left then break, 
    //and all numbers not marked false are left as true, which they are!
    if (prime + prime > max) break;

    //mark all the multiples of prime as not prime
    for (i = prime + prime; i <= max; i += prime) {
      integers[i] = false;
    }
  }

  //extract the primes
  var primes = [];
  for (i = 0; i <= max; i++) {
    if (integers[i] == true) primes.push(i);
  }

  return primes;
}