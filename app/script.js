/*
 * 
 * a - lower limit integer
 * b - higher limit
 * k - number of divisors we are looking for
 * 
 * Return the number of integers between the inclucive limits that have k divisors
 *
*/
function evaluateDivisors(a, b, k) {

  return trialDivision(a, b, k);

}


/*
 * https://en.wikipedia.org/wiki/Trial_division
 * 
 * Very simple trial division - just to get going!
 * 
*/
function trialDivision(a, b, k) {

  // the number of integers that have k divisors
  var countInt = 0;

  console.log("=========================================================================");
  console.log("check integer from " + a + " to " + b + " for " + k);
  console.log("=========================================================================");

  // iterate full range of integers
  for (i = a; i <= b; i++) {

    var root = Math.sqrt(i); //only need to check to the sqr root of each number
    var countDivisors = 0;

    //iterate prospective divisors
    var prime = 1;
    for (d = 2; d <= root; d += prime) {//iterate in primes!!
      //for (d = 2; d^2 <= i; d += prime) //if prime (d's are all prime) squared is less that or equal to the number being tested, 


      //console.log("check devisor " + d);

      if (i % d == 0) {
        countDivisors++;
        console.log(d + " added to divisors count " + countDivisors);
        //if co divisor is grateer than or equal to root (equal is perfect square) then add to countDivisors.
        if (i / d >= root) {
          countDivisors++;
          console.log("=========================================================================");
          console.log("Co divisor is greater that root " + root + " of integer being tested!");
          console.log(i / d + " added to divisors count " + countDivisors);
          console.log("=========================================================================");
        }
      }
    }

    if (countDivisors == k) {
      countInt++;
    }
  }
  return countInt;
}

/*
 * return an array of primes to check as divisors of an integer n
 * building a sieve to the max we know our tests are going up to
 * Only need to go to prime squared is less than or equal to max
 * return array of primes.
 * 
 */

function primes(max) {
  var root = Math.ceil(Math.sqrt(max))
  var integers = [];
  for (i = 0; i <= root; i++) {
    integers[i] = true;
  }

  integers[0] = false;
  integers[1] = false;

  //mark all the even ones as false (not prime)
  var notPrime = 2;
  for (i = notPrime; i <= root; i += notPrime) {
    integers[1] = false;
  }

  //find first true in integers, start at notPrime
  for(i=notPrime; i<= root; i++){

  }

  return integers;
}
