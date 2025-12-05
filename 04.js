function checkPos(curRow, prevRow, nextRow, pos)
{
    const nl = curRow[ pos - 1 ] === '@' ? 1 : 0;
    const nr = curRow[ pos + 1 ] === '@' ? 1 : 0;
    const nt = prevRow[ pos ] === '@' ? 1 : 0;
    const ntl = prevRow[ pos - 1 ] === '@' ? 1 : 0;
    const ntr = prevRow[ pos + 1 ] === '@' ? 1 : 0;
    const nb = nextRow[ pos ] === '@' ? 1 : 0;
    const nbl = nextRow[ pos - 1 ] === '@' ? 1 : 0;
    const nbr = nextRow[ pos + 1 ] === '@' ? 1 : 0;

    return nl + nr + nt + ntl + ntr + nb + nbl + nbr;
}

function part1()
{
    let canAccess = 0;
    const rows = day04.split('\n');

    for (let i = 0; i < rows.length; i++)
    {
        for (let j = 0; j < rows[ i ].length; j++)
        {
            if (rows[ i ][ j ] !== '@')
            {
                continue;
            }

            const neighbours = checkPos(rows[ i ], rows[ i - 1 ] || [], rows[ i + 1 ] || [], j);

            if (neighbours < 4)
            {
                canAccess++;
            }
        }
    }

    return canAccess;
}


function part2()
{
    let rows = day04.split('\n');
    let rowsSwap = [];
    let canRemoveTotal = 0;
    const t = performance.now()

    while (1)
    {
        let canAccess = 0;

        for (let i = 0; i < rows.length; i++)
        {
            const outputBuffer = [];

            for (let j = 0; j < rows[ i ].length; j++)
            {
                outputBuffer[ j ] = rows[ i ][ j ];

                if (rows[ i ][ j ] !== '@')
                {
                    continue;
                }

                const neighbours = checkPos(rows[ i ], rows[ i - 1 ] || [], rows[ i + 1 ] || [], j);

                if (neighbours < 4)
                {
                    canAccess++;
                    outputBuffer[ j ] = '.';
                }
            }

            rowsSwap[ i ] = outputBuffer.join('');
        }

        if (canAccess === 0)
        {
            break;
        }

        canRemoveTotal += canAccess;
        canAccess = 0;
        rows = rowsSwap;
        rowsSwap = [];
    }

    console.log(performance.now() - t)

    return canRemoveTotal;
}

window.onload = function ()
{
    console.log(part1());
    console.log(part2());
};
