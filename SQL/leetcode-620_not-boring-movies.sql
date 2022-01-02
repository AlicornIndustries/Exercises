/* T-SQL query */
SELECT
    Cinema.id
    ,Cinema.movie
    ,Cinema.description
    ,Cinema.rating
FROM Cinema
WHERE
    NOT Cinema.description='boring'
    AND Cinema.id % 2 = 1
ORDER BY Cinema.rating DESC



/*
Requirements:
* description IS NOT 'boring' -- trivial WHERE
* odd-numbered ID -- can use Cinema.id MOD 2 = 1
* order by rating DESC
*/
