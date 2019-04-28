
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

  primes = primeSieve(b); //optimise - sqr root plus one prime? https://en.wikipedia.org/wiki/Trial_division

  //TODO: function to multiple out the divisors from the factors. should be simple enough, and quick
  //TODO: optimise - https://en.wikipedia.org/wiki/Fermat%27s_factorization_method ?? diff of two squares.

  return trialDivision(a, b, k, primes);

}

function divisorCount(a, b, k, primes) {

  var countInt = 0;

  for (i = a; i <= b; i++) {

    var factors = primeFactor(i, primes);

    if (factors.length == k) {
      countInt++;
    }
  }
  return countInt;
}

/*
 * take and arrary of prime factors for num
 * and add in all the integer divisors possible
 * Spec: https://en.wikipedia.org/wiki/Table_of_divisors
 * https://en.wikipedia.org/wiki/Table_of_prime_factors#1_to_100
 * 
 * for a 5 value prime factor array
 * p*q*r*s*t
 * 
 * for example [2,3,4,5,6] is multipled out into these divisors
 * 2.3 2.3.4 2.3.4.5 and 2.3.4.5.6
 * 2.4 2.3.5 2.3.4.6
 * 2.5 2.3.6 ..etc
 * 2.6 2.4.5
 * 3.4 .etc
 * .etc
 */

function allDivisors(primes) {
  var divisors = [];
  var len = primes.length;
  console.log("Prime factors " + primes.toString() + " length " + len);
  //var limit = len - 2; //works for the index of the first multiple, and the number of multiples required.

  for (var p = 0; p <= primes.length - 1; p++) { //p is the starting multipler, so last one not required.
    var multiples = [];
    //multiples.push(primes[p]);
    //number of multiples - start at 2, go to length - 1. 
    for (var expression_size = 1; expression_size <= primes.length - 1; expression_size++){
      multiples.push(p);
      for (m=1; m<= expression_size; m++){//always start at index 1,
        for (var number_of_expressions = 1; number_of_expressions < primes.length - m + 1; number_of_expressions ++ ){
          multiples.push(primes[m]);
        }
        console.log("multipes " + multiples.toString());
      } 
    }
  }

  return [1, 2, 3, 4];

}

function multiply(list){
  var answer = 1;
  for (var i=0; i<list.length; i++){
    answer = answer * list[i]
  }
  return answer;
}

/*
 * https://en.wikipedia.org/wiki/Trial_division
 * 
 * Very simple trial division - just to get going!
 * 
 * Return the number of integers in the range a- inclusive that have k divisors
 * 
*/
function trialDivision(a, b, k, primes) {

  var countInt = 0;

  for (i = a; i <= b; i++) {

    var factors = primeFactor(i, primes);

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
 * 
 * num - the number to factorise
 * primes - an array of primes that goes to at least one prime
 * past the sqr root of num. (TODO, prime array currently goes to limit, optimise!)
 */
function primeFactor(num, primes) {
  var primeFactors = [];
  for (var i = 0; i < primes.length; i++) {
    var prime = primes[i];

    // Prime factors only, so empty [] return for primes, rather that [1,19].
    if (num == prime) {
      return [];
    }

    if (num % prime == 0) {
      //console.log("prime " + prime + " is a factor of " + num);
      primeFactors.push(prime);
      var result = num / prime;

      if (prime ** 2 > result) {
        primeFactors.push(result);
        //console.log("done because " + prime + " squared is greater than " + result);
        return primeFactors;
      }

      if (isComposite(result, primes)) {
        primeFactors = primeFactors.concat(primeFactor(result, primes));
      } else { // last divisor is always prime. Needs to be an else, so not run on return from recursion. 
        //console.log("prime result of division " + result);
        primeFactors.push(result);
      }

      //console.log("final prime factors of " + num + " are " + primeFactors.toString());
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
  //