function part1()
{
    const rows = day07.split('\n');
    const start = rows[ 0 ].indexOf('S');
    const modifiedRows = [ [], [] ];
    modifiedRows[ 1 ][ start ] = '|';
    let totalSplits = 0;

    for (let i = 2; i < rows.length; i++)
    {
        const prevModifiedRow = modifiedRows[ i - 1 ] || [];
        const modifiedRow = [];

        for (let j = 0; j < rows[ i ].length; j++)
        {
            if (prevModifiedRow[ j ] === '|')
            {
                if (rows[ i ][ j ] === '^')
                {
                    modifiedRow[ j - 1 ] = '|';
                    modifiedRow[ j + 1 ] = '|';
                    totalSplits++;
                } else
                {
                    modifiedRow[ j ] = '|';
                }
            }
        }

        modifiedRows[ i ] = modifiedRow;
    }

    return totalSplits;
}

function part2()
{
    const rows = day07.split('\n');
    const start = rows[ 0 ].indexOf('S');
    const particles = new Array(rows[0].length).fill(0);
    particles[ start ] = 1;

    for (let i = 2; i < rows.length; i++)
    {
        for (let j = 0; j < rows[ i ].length; j++)
        {
            if (rows[ i ][ j ] === '^')
            {
                if (particles[ j ] > 0)
                {
                    const parallelWorlds = particles[ j ];
                    particles[ j ] -= parallelWorlds;
                    particles[ j - 1 ] += parallelWorlds;
                    particles[ j + 1 ] += parallelWorlds;
                }
            }
        }
    }

    let total = 0;

    for (let i = 0; i < particles.length; i++)
    {
        total += particles[ i ];
    }

    return total;
}

window.onload = function ()
{
    console.log(part1());
    console.log(part2());
};
