function part1()
{
    const idsRanges = day02.split(',');
    let total = 0;

    for (let i = 0; i < idsRanges.length; i++)
    {
        const ranges = idsRanges[ i ].split("-");
        const start = parseInt(ranges[ 0 ], 10);
        const end = parseInt(ranges[ 1 ], 10);

        for (let j = start; j <= end; j++)
        {
            const idStr = j.toString();

            if (idStr.length % 2 === 0)
            {
                const halfLen = idStr.length / 2;
                if (idStr.substring(0, halfLen) === idStr.substring(halfLen))
                {
                    total += j;
                }
            }
        }
    }

    return total;
}

function part2()
{
    const idsRanges = day02.split(',');
    let total = 0;

    for (let i = 0; i < idsRanges.length; i++)
    {
        const ranges = idsRanges[ i ].split("-");
        const start = parseInt(ranges[ 0 ], 10);
        const end = parseInt(ranges[ 1 ], 10);

        for (let j = start; j <= end; j++)
        {
            const idStr = j.toString();

            if (idStr.length < 2)
            {
                continue;
            }

            const halfLen = Math.floor(idStr.length / 2);
            const fullLen = idStr.length;
            let winEnd = 1;

            while (winEnd <= halfLen)
            {
                const pattern = idStr.substring(0, winEnd);
                const patternLen = pattern.length;
                let testStart = winEnd;
                let validId = true;

                for (let k = testStart; k < fullLen; k += patternLen)
                {
                    const potMatch = idStr.substring(k, k + patternLen);

                    if (pattern !== potMatch)
                    {
                        winEnd++;
                        validId = false;
                        break;
                    }
                }

                if (validId)
                {
                    total += j;
                    break;
                }
            }
        }
    }

    return total;
}

window.onload = function ()
{
    console.log(part1());
    console.log(part2());
};
