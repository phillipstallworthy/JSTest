//global 
var primes;
var divLog =[]; //logging only, crappy here, not good for testing....

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

  primes = primeSieve(b);

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

  // iterate full range of integers and look for divisors
  for (i = a; i <= b; i++) {

    divLog = []; //reset each time (another downside of global)
    var divisors = countDivisors(i);
    console.log(i +" has " + divisors + " divisors " + divLog.toString());

    if (divisors == k) {
      countInt++;
    }
  }
  return countInt;
}

/* Find Prime Divisors (factors)
 * https://en.wikipedia.org/wiki/Trial_division
 * 
 * Very simple trial division - just to get going!
 * return a count of the number of prime divisors of n
 * 
 * question acutally wants positive divisors of n, including 1 and n itself
 * https://en.wikipedia.org/wiki/Table_of_divisors#1_to_100
 * but that seems a bit pointless, 1 and self add no value to the calc.
 * Prime divisors are the most interesting property 
 * https://en.wikipedia.org/wiki/Fundamental_theorem_of_arithmetic
 * 
 */
function countDivisors(num) {

  //console.log("#######################################");
  //console.log("find devisors of " + num);

  var primeDivisors = 0;
  var codivisor = 0;
  for (p = 0; p < primes.length; p++) {

    if (num % primes[p] == 0) {
      primeDivisors++;
      divLog.push(primes[p]); //logging

      codivisor = num / primes[p];

      if (primes[p] == codivisor){ //for example 4 has two equal prime divisors of 2, both need counting
        primeDivisors++
        divLog.push(codivisor); //logging
      } else if (isComposite(codivisor)){ //if composite, resurse back in to find primes.
        divLog.push(codivisor); //logging
        primeDivisors = primeDivisors + countDivisors(codivisor);
      }
      //if codivisor is prime, carry on, it will be found later
    }

    //if the next prime squared is greater that i, then we're done
    //(if it's equal then we are not done yet. Perfect square!)
    //TODO - is this correct???
    if (primes[p] + primes[p] > num) {
      //console.log("breaking on " + primes[p] + " because " + primes[p] * primes[p] + " is greater that " + num);
      return primeDivisors;
    }
  }
  return primeDivisors;
}

function isComposite(n) {
  var q = 0;
  //console.log("is " + n + " compsite?")
  while (true) {
    //console.log("Checking prime index " + q + " which is " + primes[q]);
    if (primes[q] == n) {
      //console.log(n + " is prime");
      return false;
    }
    if (primes[q] > n) {
      //console.log(n + " is composite");
      return true;
    }
    q++
  }
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




