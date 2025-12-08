function dist(p0, p1)
{
    return Math.sqrt(
        Math.pow(p1[0] - p0[0], 2) +
        Math.pow(p1[1] - p0[1], 2) +
        Math.pow(p1[2] - p0[2], 2)
    );
}

function mergeCircuits(c0, c1)
{
    const addedPoints = {};
    const mergedCircuit = [];

    for (let j = 0; j < c0.length; j++)
    {
        if (!addedPoints[ c0[ j ].str ])
        {
            mergedCircuit.push(c0[ j ]);
            addedPoints[ c0[ j ].str ] = true;
        }
    }

    for (let j = 0; j < c1.length; j++)
    {
        if (!addedPoints[ c1[ j ].str ])
        {
            mergedCircuit.push(c1[ j ]);
            addedPoints[ c1[ j ].str ] = true;
        }
    }

    return mergedCircuit;
}

function part1()
{
    const positionsStr = day08.split('\n');
    const positionsPoints = [];
    const pairsByDist = [];
    const circuits = {};

    for (let i = 0; i < positionsStr.length; i++)
    {
        const p = positionsStr[ i ].split(',');
        positionsPoints[ i ] = p;
    }

    for (let i = 0; i < positionsPoints.length - 1; i++)
    {
        for (let j = i + 1; j < positionsPoints.length; j++)
        {
            const d = dist(positionsPoints[ i ], positionsPoints[ j ]);
            pairsByDist.push(
                {
                    d,
                    pair: [
                        {
                            pos: positionsPoints[ i ],
                            str: positionsStr[ i ],
                        },
                        {
                            pos: positionsPoints[ j ],
                            str: positionsStr[ j ],
                        }
                    ]
                }
            );
        }
    }

    pairsByDist.sort((a, b) =>
    {
        return a.d - b.d;
    });

    const pairsToConnect = Math.min(1000, pairsByDist.length);

    for (let i = 0; i < pairsToConnect; i++)
    {
        const p0 = pairsByDist[ i ].pair[ 0 ];
        const p1 = pairsByDist[ i ].pair[ 1 ];

        const existingCircuit0 = circuits[ p0.str ];
        const existingCircuit1 = circuits[ p1.str ];

        if (!existingCircuit0 && !existingCircuit1)
        {
            const newCircuit = [ p0, p1 ];
            circuits[ p0.str ] = newCircuit;
            circuits[ p1.str ] = newCircuit;
        }
        else if (existingCircuit0 && !existingCircuit1)
        {
            existingCircuit0.push(p1);
            circuits[ p1.str ] = existingCircuit0;
        }
        else if (!existingCircuit0 && existingCircuit1)
        {
            existingCircuit1.push(p0);
            circuits[ p0.str ] = existingCircuit1;
        }
        else if (existingCircuit0 && existingCircuit1)
        {
            const mergedCircuit = mergeCircuits(existingCircuit0, existingCircuit1);

            for (let j = 0; j < mergedCircuit.length; j++)
            {
                circuits[ mergedCircuit[ j ].str ] = mergedCircuit;
            }
        }
    }

    // Sort by size, check uniqueness.
    const circuitsBySize = {};
    const sizes = [];

    for (let j in circuits)
    {
        const s = circuits[ j ].length;
        if (circuitsBySize[ s ])
        {
            if (circuits[ j ] !== circuitsBySize[ s ])
            {
                sizes.push(s);
            }
        }
        else
        {
            circuitsBySize[ s ] = circuits[ j ];
            sizes.push(s);
        }
    }

    sizes.sort((a, b) => b - a);

    return sizes[0] * sizes[1] * sizes[2];
};

function part2()
{
    const positionsStr = day08.split('\n');
    const positionsPoints = [];
    const pairsByDist = [];
    const circuits = {};
    let product = 1;

    for (let i = 0; i < positionsStr.length; i++)
    {
        const p = positionsStr[ i ].split(',');
        positionsPoints[ i ] = p;
    }

    for (let i = 0; i < positionsPoints.length - 1; i++)
    {
        for (let j = i + 1; j < positionsPoints.length; j++)
        {
            const d = dist(positionsPoints[ i ], positionsPoints[ j ]);
            pairsByDist.push(
                {
                    d,
                    pair: [
                        {
                            pos: positionsPoints[ i ],
                            str: positionsStr[ i ],
                        },
                        {
                            pos: positionsPoints[ j ],
                            str: positionsStr[ j ],
                        }
                    ]
                }
            );
        }
    }

    pairsByDist.sort((a, b) =>
    {
        return a.d - b.d;
    });

    for (let i = 0; i < pairsByDist.length; i++)
    {
        const p0 = pairsByDist[ i ].pair[ 0 ];
        const p1 = pairsByDist[ i ].pair[ 1 ];

        const existingCircuit0 = circuits[ p0.str ];
        const existingCircuit1 = circuits[ p1.str ];

        if (!existingCircuit0 && !existingCircuit1)
        {
            const newCircuit = [ p0, p1 ];
            circuits[ p0.str ] = newCircuit;
            circuits[ p1.str ] = newCircuit;
        }
        else if (existingCircuit0 && !existingCircuit1)
        {
            existingCircuit0.push(p1);
            circuits[ p1.str ] = existingCircuit0;
        }
        else if (!existingCircuit0 && existingCircuit1)
        {
            existingCircuit1.push(p0);
            circuits[ p0.str ] = existingCircuit1;
        }
        else if (existingCircuit0 && existingCircuit1)
        {
            const mergedCircuit = mergeCircuits(existingCircuit0, existingCircuit1);

            for (let j = 0; j < mergedCircuit.length; j++)
            {
                circuits[ mergedCircuit[ j ].str ] = mergedCircuit;
            }
        }

        const cl = circuits[ p0.str ].length;

        if (cl === positionsPoints.length)
        {
            product = p0.pos[ 0 ] * p1.pos[ 0 ];
            break;
        }
    }

    return product;
};

window.onload = function ()
{
    console.log(part1());
    console.log(part2());
};
