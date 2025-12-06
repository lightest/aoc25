function part1()
{
    const rows = day06.split('\n');
    const ops = rows[ rows.length - 1 ].match(/[\*|\+]+/g);
    const digitRows = [];
    const results = new Array(ops.length).fill(0);

    for (let i = 0; i < rows.length - 1; i++)
    {
        const d = rows[ i ].match(/\d+/g);
        digitRows.push(d);
    }

    for (let j = 0; j < ops.length; j++)
    {
        for (let i = 0; i < digitRows.length; i++)
        {
            const n = parseInt(digitRows[ i ][ j ], 10);
            let prev = results[ j ];
            let res = 0;

            if (ops[ j ] === '*' && i === 0)
            {
                prev = 1;
            }

            if (ops[ j ] === '*')
            {
                res = n * prev;
            }
            else if (ops[ j ] === '+')
            {
                res = n + prev;
            }

            results[ j ] = res;
        }
    }

    let total = 0;

    for (let i = 0; i < results.length; i++)
    {
        total += results[ i ];
    }

    return total;
}

function part2()
{
    const stringRows = day06.split('\n')
    // console.log(stringRows, stringRows.length - 1);
    const ops = stringRows[ stringRows.length - 1 ].match(/[\*|\+]+/g);
    const cols = stringRows[ 0 ].length;

    let digitRow = [];
    const digitRows = [];
    const results = new Array(ops.length).fill(0);

    for (let j = 0; j < cols; j++)
    {
        let d = '';

        for (let i = 0; i < stringRows.length - 1; i++)
        {
            const c = parseInt(stringRows[ i ][ j ], 10);
            d += Number.isFinite(c) ? c : '';
        }

        if (d === '')
        {
            digitRows.push(digitRow);
            digitRow = [];
        }
        else
        {
            digitRow.push(d);
        }
    }

    if (digitRow.length > 0)
    {
        digitRows.push(digitRow);
    }

    // console.log(digitRows);

    for (let j = 0; j < ops.length; j++)
    {
        for (let i = 0; i < digitRows[j].length; i++)
        {
            const n = parseInt(digitRows[ j ][ i ], 10);
            let prev = results[ j ];
            let res = 0;

            if (ops[ j ] === '*' && i === 0)
            {
                prev = 1;
            }

            if (ops[ j ] === '*')
            {
                res = n * prev;
            }
            else if (ops[ j ] === '+')
            {
                res = n + prev;
            }

            results[ j ] = res;
        }
    }

    let total = 0;

    for (let i = 0; i < results.length; i++)
    {
        total += results[ i ];
    }

    return total;
}

window.onload = function ()
{
    console.log(part1());
    console.log(part2());
};
