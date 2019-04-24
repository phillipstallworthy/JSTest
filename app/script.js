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
 * return an array of primes
 * https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 */

 //mark them all true/prime
 function primes(max) {
  var integers = [];
  for (i = 0; i <= max; i++) {
    integers[i] = true;
  }


  integers[0] = false; // 0 is not a prime
  integers[1] = false; // 1 is

  //mark all the even ones as false (not prime)
  var composite = 2;

  //TODO: find the next prime to act as the root of the sieve, the next true value.
  // first one should be 2, then 3, 5, etc.
  //var composite = integers.findIndex(function(){return true;});

  for (i = composite + composite; i <= max; i += composite) {
    integers[i] = false;
  }

  // incriment the composite to an initial prime -  first pass 2 to 3
  composite++;

  for (i = composite + composite; i <= max; i += composite) {
    integers[i] = false;
  }

  // incriment the composite - first pass 3 to 5
  composite = 5;

  for (i = composite + composite; i <= max; i += composite) {
    integers[i] = false;
  }

  // incriment the composite - to 7
  composite = 7;

  for (i = composite + composite; i <= max; i += composite) {
    integers[i] = false;
  }

  //test for last prime, based on max
  // if composiste squared is greater that max, don't chose the next one
  
  //extract the primes
  var primes = [];
  for (i = 0; i <= max; i++) {
    if (integers[i] == true) primes.push(i);
  }

  return primes;
}


/*
 * return an array of primes
 * https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 */

 //mark them all true/prime
function primes_works_for_10(max) {
  var integers = [];
  for (i = 0; i <= max; i++) {
    integers[i] = true;
  }


  integers[0] = false; // 0 is not a prime
  integers[1] = false; // 1 is

  //mark all the even ones as false (not prime)
  var composite = 2;
  for (i = composite + composite; i <= max; i += composite) {
    integers[i] = false;
  }

  // incrimemt the composite - first pass 2 to 3
  composite++;

  for (i = composite + composite; i <= max; i += composite) {
    integers[i] = false;
  }

  //extract the primes
  var primes = [];
  for (i = 0; i <= max; i++) {
    if (integers[i] == true) primes.push(i);
  }

  return primes;
}
