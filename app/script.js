
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

function philltest(){

  // I think I need to initialise, var, a variable in a recurisve function, only if it 
  //is undefined, but I fear hoisting / var problem.
  // does this work. Each recursion needs an indipendant var, and track incrments..
  b = typeof(b) == 'undefined' ? 0 : b;
  
};


function allDivisors(primes) {
  var allDivisors = [];
  var len = primes.length;
  console.log("Prime factors " + primes.toString() + " length " + len);

  for (var i = 0; i < len; i++){
    var temp = [];
    temp.push(primes[i]);
    //console.log(temp.toString());
    addPush(allDivisors, i, primes, temp);
  }
  for (var j = 0; j < allDivisors.length; j++){
    console.log(allDivisors[j]);
  }
}

// add the next prime number after i to temp, push array to all Divisors, up to end of primes
function addPush (allDivisors, i, primes, temp){
  if ((i + 1) > (primes.length - 1)) return;
  temp.push(primes[i + 1]);
  allDivisors.push(temp.slice(0)); //slicing here avoids pushing the same referenced array.
  addPush(allDivisors, i + 1, primes, temp);
}


/*
 * add in all the integer divisors to an array of primes
 * ie multiple every element by every other in every possible conbination.
 * 
 * These are whey, but don't affect the logic.
 * Spec: https://en.wikipedia.org/wiki/Table_of_divisors
 * https://en.wikipedia.org/wiki/Table_of_prime_factors#1_to_100
 * 
 * for example [2,3,4,5,6] is multipled out into these multiples (and therefore devisors of original
 * all multipled together)
 * 2.3 2.3.4 2.3.4.5 and 2.3.4.5.6
 * 2.4 2.3.5 2.3.4.6
 * 2.5 2.3.6 2.3.5.6
 * 2.6 2.4.5 2.4.5.6
 * 3.4 2.4.6 3.4.5.6
 * 3.5 2.5.6
 * 3.6 3.4.5
 * 4.5 3.4.6
 * 4.6 3.5.6
 * 5.6 4.5.6
 * ^ 4 of each
 *     ^ 6 of each 
 *           ^ 4 of each
 * 26 multiplications.
 * 
 * Iterate initial number in the produc (i) from index 0 to one minus length.
 * Next, j, the number after i, to the end of the array, this gives all the 2 product multiplications
 *    This is the start point of the list of multiplands which needs to iterate to catch them all.
 * Then, k, this is an addition, not an index
 *  starting at zero for the two case(just j), then incrementing to len(index), 
 *  which is less than len minus the start on muliplands, j. IE from where we are to the end, in indexes.
 * 
 * 
 * return an array of all divisors
 */
function allDivisors_(primes) {
  var allDivisors = [];
  var len = primes.length;
  console.log("Prime factors " + primes.toString() + " length " + len);

  var temp = [];
  for (var i = 0; i < len - 1; i++) {
    //console.log("Multipler index " + i);
    temp = [primes[i]];
    var incrementor = -1;

    for (var j = i + 1; j <= len; j++) {
      console.log("increment j");
      

      for (var k = 0; k < (len - j); k++) {
        //console.log("Additional multipland " + (j + k));
        temp.push(primes[j + k]);
        console.log("Push " + temp.toString());
        //allDivisors.push(temp);
      }
      //console.log("Reset to i");
      temp = [primes[i]];
    }
    //console.log("reset again?");
  }

}


// works, but missing the ones with gaps.
function allDivisors_org(primes) {
  var allDivisors = [];
  var len = primes.length;
  console.log("Prime factors " + primes.toString() + " length " + len);

  for (var exp_len = 1; exp_len <= (len - 1); exp_len++) {
    //console.log("expression length foreach limit " + (len - 1) );
    //console.log("expression length " + exp_len);
    for (var init_mult = 0; init_mult <= (len - 1 - exp_len); init_mult++) {
      //console.log("initial multipler foreach limit " + (len - 1 - exp_len));
      //console.log("initial multiplyer " + init_mult);
      for (var start_exp = init_mult + 1; start_exp <= (len - exp_len); start_exp++) {
        //console.log("start of trailing expression " + start_exp); // crap, does this needs mixing up more?
        var divisors = [];
        //console.log("push " + init_mult);
        divisors.push(primes[init_mult]);
        for (var i = 0; i < exp_len; i++) {
          //console.log("push expression element " + (primes[start_exp + i]));
          divisors.push(primes[start_exp + i]);
        }
        console.log(divisors.toString());
        //console.log(" ");
        //multiple all together
        //add to return array
      }
    }
  }
  //sort
  //dedup
  return [1, 2, 3, 4];
}

function multiply(list) {
  var answer = 1;
  for (var i = 0; i < list.length; i++) {
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