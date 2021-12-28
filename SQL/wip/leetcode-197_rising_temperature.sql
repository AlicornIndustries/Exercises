/*
WIP:
Currently only works if there's no missing dates (fails if it skips from the 2nd to the 4th, e.g.)
*/


# Write your MySQL query statement below
SELECT
    diffs.Id
FROM (
    SELECT
        Id
        ,LAG(Temperature, 1) OVER (ORDER BY recordDate ASC) - Temperature as TempDiff
    FROM Weather
) diffs
WHERE
    diffs.TempDiff < 0

/*
SELECT
        Id
        ,LAG(Temperature, 1) OVER (ORDER BY recordDate ASC) - Temperature as TempDiff
    FROM Weather
*/
    

# Below query shows how to get the previous temp value with LAG (defaulting to NULL)
/*
SELECT
    Id
    ,recordDate
    ,Temperature
    # previous value for debugging
    ,LAG(Temperature, 1) OVER (
        ORDER BY w.Id ASC
    ) as "Previous temp"
    ,LAG(Temperature, 1) OVER (
        ORDER BY recordDate ASC
    ) - Temperature as "Temp-prev temp"
FROM Weather w

You can't just put the LAG in the WHERE clause (no window functions in WHERE). Use a subquery instead.
SELECT
        Id
        ,LAG(Temperature, 1) OVER (ORDER BY recordDate ASC) - Temperature as TempDiff
    FROM Weather


*/
