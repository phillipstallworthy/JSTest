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
 * return an array of primes from 2 to max. Max does not need to be prime.
 * 100,000 runs in 0.014 sec. :)
 * https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 * 
 */

//mark them all true/prime
function primes(max) {

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




