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
 * Get all integer divisors
 * Then iterate the divisors, and for any not prime, find prime divisors, recursivly.
 * 
*/
function trialDivision(a, b, k) {

  // the number of integers that have k divisors
  var countInt = 0;
  var primes = primeSieve(Math.sqrt(b));

  // iterate full range of integers and look for divisors
  for (i = a; i <= b; i++) {

    console.log("check " + i);

    var countDivisors = 0;

    //iterate the prospective divisors
    //var prime = 0; //prime array index, always start at 2, then 3,5,7,11 etc.
    //while (true) {
    // iterate all the primes, but include a test for a break!
    for (p = 0; p < primes.length; p++) {

      if (i % primes[p] == 0) {
        console.log("found a prime divisor " + primes[p]);
        countDivisors++;
      }

      //if the next prime squared is greater that i, then we're done
      //(if it's equal then we want it. Perfect square!)
      if (primes[p] * primes[p] > i) {
        console.log("breaking on " + primes[p] + " because " + primes[p] * primes[p] + " is greater that " + i);
        break;
      }
    }
    //
    if (countDivisors == k) {
      countInt++;
    }
  }

/*
 * https://en.wikipedia.org/wiki/Trial_division
 * 
 * Very simple trial division - just to get going!
 * 
 * TODO:currently only gets the value of the prime divisors, not the count.
 * IE it says 8 has 1 prime factor, 2. When I nee the count, 3 lots of 2!
*/
function trialDivision_working_but_no_prime_count(a, b, k) {

  // the number of integers that have k divisors
  var countInt = 0;
  var primes = primeSieve(Math.sqrt(b));

  // iterate full range of integers and look for divisors
  for (i = a; i <= b; i++) {

    console.log("check " + i);

    var countDivisors = 0;

    //iterate the prospective divisors
    //var prime = 0; //prime array index, always start at 2, then 3,5,7,11 etc.
    //while (true) {
    // iterate all the primes, but include a test for a break!
    for (p = 0; p < primes.length; p++) {

      if (i % primes[p] == 0) {
        console.log("found a prime divisor " + primes[p]);
        countDivisors++;
      }

      //if the next prime squared is greater that i, then we're done
      //(if it's equal then we want it. Perfect square!)
      if (primes[p] * primes[p] > i) {
        console.log("breaking on " + primes[p] + " because " + primes[p] * primes[p] + " is greater that " + i);
        break;
      }
    }
    //
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




