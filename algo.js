let word = "smile";

function count(string, char)
{
    const letters = string.split("");
    return letters.filter(letter => letter === char).length;
}

function check(guess)
{
    let result = [];
    let seen_letters = [];
    for(let i = 0; i < word.length; i++)
    {
        if (word[i] === guess[i])
        {
            result.push("correct");
        }
        else if (word.includes(guess[i]))
        {
            let correctLetterCount = count(word, guess[i]);
            let guessedLetterCount = count(guess, guess[i]);
            if (guessedLetterCount > correctLetterCount && !seen_letters.includes(guess[i]))
            {
                result.push("wrong");
            }
            else
                result.push("misplaced");
        }
        else if (!word.includes(guess[i]))
        {
            result.push("wrong");
        }
        seen_letters.push(guess[i]);
    }
    return result;
}


let res = check("telll");
console.log(res);
 