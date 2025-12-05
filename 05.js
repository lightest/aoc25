function part1()
{
    const d = day05.split('\n');
    const blank = d.indexOf('');
    const ranges = d.slice(0, blank);
    const ingredients = d.slice(blank + 1, d.length);

    let totalFresh = 0;

    for (let i = 0; i < ingredients.length; i++)
    {
        const ingredient = parseInt(ingredients[ i ], 10);

        for (let j = 0; j < ranges.length; j++)
        {
            const r = ranges[ j ].split('-');
            const min = parseInt(r[ 0 ], 10);
            const max = parseInt(r[ 1 ], 10);

            if (ingredient >= min && ingredient <= max)
            {
                totalFresh++;
                break;
            }
        }
    }

    return totalFresh;
}

function part2()
{
    const d = day05.split('\n');
    const blank = d.indexOf('');
    const ranges = d.slice(0, blank);
    let total = 0;

    for (let j = 0; j < ranges.length; j++)
    {
        const r = ranges[ j ].split('-');
        const min = parseInt(r[ 0 ], 10);
        const max = parseInt(r[ 1 ], 10);

        ranges[ j ] = { min, max };
        const currentRange = ranges[ j ];

        for (let i = j - 1; i >= 0; i--)
        {
            // Discarded previously.
            if (!ranges[i])
            {
                continue;
            }

            const pmin = ranges[ i ].min;
            const pmax = ranges[ i ].max;

            // Cases when both ends fit.

            if (currentRange.min >= pmin && currentRange.min <= pmax &&
                currentRange.max >= pmin && currentRange.max <= pmax
            )
            {
                // Current range is fully covered, discard.
                ranges[ j ] = undefined;
                break;
            }

            if (pmin >= currentRange.min && pmin <= currentRange.max &&
                pmax >= currentRange.min && pmax <= currentRange.max
            )
            {
                // Previous range fully fits to the current range, discard.
                ranges[ i ] = undefined;
                continue;
            }

            // Cases when only one end fits.

            if (currentRange.min >= pmin && currentRange.min <= pmax)
            {
                currentRange.min = pmax + 1;
            }

            if (currentRange.max >= pmin && currentRange.max <= pmax)
            {
                currentRange.max = pmin - 1;
            }
        }
    }

    for (let j = 0; j < ranges.length; j++)
    {
        if (ranges[ j ])
        {
            total += ranges[ j ].max - ranges[ j ].min + 1;
        }
    }

    return total;
}

window.onload = function ()
{
    console.log(part1());
    console.log(part2());
};
