function findMaxJoltage(str)
{
    let firstMax = 0;
    let firstMaxIdx = 0;

    let candidate0 = "0"
    let candidate1 = "0";

    for (let i = 0; i < str.length; i++)
    {
        const c = parseInt(str[ i ], 10);

        if (c > firstMax)
        {
            firstMax = c;
            firstMaxIdx = i;
        }
    }

    if (firstMaxIdx > 0)
    {
        let maxToTheLeft = 0;

        for (let i = 0; i < firstMaxIdx; i++)
        {
            const c = parseInt(str[ i ], 10);

            if (c > maxToTheLeft)
            {
                maxToTheLeft = c;
            }
        }

        candidate0 = `${maxToTheLeft}${firstMax}`;
    }

    if (firstMaxIdx < str.length - 1)
    {
        let maxToTheRight = 0;

        for (let i = firstMaxIdx + 1; i < str.length; i++)
        {
            const c = parseInt(str[ i ], 10);

            if (c > maxToTheRight)
            {
                maxToTheRight = c;
            }
        }

        candidate1 = `${firstMax}${maxToTheRight}`;
    }

    if (parseInt(candidate0, 10) > parseInt(candidate1, 10))
    {
        return candidate0;
    }

    return candidate1;
}

function part1()
{
    const batteryBanks = day03.split("\n");
    let total = 0;

    for (let i = 0; i < batteryBanks.length; i++)
    {
        total += parseInt(findMaxJoltage(batteryBanks[ i ]), 10);
    }

    return total;
}

function findMaxJoltage2(str)
{
    const batteries = str.split('');
    const turnedOnBatteries = [];

    for (let i = 0; i < 12; i++)
    {
        let max = 0;
        let maxIdx = 0;
        let maxJoltage = 0;

        for (let j = 0; j < batteries.length; j++)
        {
            const c = parseInt(batteries[ j ], 10);

            // This was the wrong condition!
            // if (c >= max && c <= currentLastMax && j !== lastMaxIdx)
            if (c > 0)
            {
                turnedOnBatteries[ j ] = c;
                const newJoltage = parseInt(turnedOnBatteries.join(''), 10);
                turnedOnBatteries[ j ] = undefined;

                if (newJoltage > maxJoltage)
                {
                    max = c;
                    maxIdx = j;
                    maxJoltage = newJoltage;
                }
            }
        }

        turnedOnBatteries[ maxIdx ] = max;
        batteries[ maxIdx ] = -1;
        // currentLastMax = max;
        // lastMaxIdx = maxIdx;
    }

    const final = parseInt(turnedOnBatteries.join(''), 10);

    return final;
}

function part2()
{
    const batteryBanks = day03.split("\n");
    let total = 0;

    for (let i = 0; i < batteryBanks.length; i++)
    {
        total += parseInt(findMaxJoltage2(batteryBanks[ i ]), 10);
    }

    return total;
}

window.onload = function ()
{
    console.log(part1());
    console.log(part2());
};
