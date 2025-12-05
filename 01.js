function part1()
{
    let dial = 50;
    let password = 0;
    // const rotations = test01.split("\n");
    const rotations = day01.split("\n");

    for (let i = 0; i < rotations.length; i++)
    {
        const dir = rotations[ i ][ 0 ];
        const k = dir === "R" ? 1 : -1;
        const amount = parseInt(rotations[ i ].substring(1), 10) * k;
        dial += amount;

        if (dial % 100 === 0)
        {
            password++;
        }
    }

    return password;
}

function part2()
{
    let dial = 50;
    let password = 0;
    const rotations = day01.split("\n");

    for (let i = 0; i < rotations.length; i++)
    {
        const dir = rotations[ i ][ 0 ];
        const k = dir === "R" ? 1 : -1;
        const amount = parseInt(rotations[ i ].substring(1), 10);

        for (let j = 0; j < amount; j++)
        {
            dial += k;

            if (dial < 0)
            {
                dial = 99;
            }
            else if (dial > 99)
            {
                dial = 0;
            }

            if (dial === 0)
            {
                password++;
            }
        }
    }

    return password;
}

window.onload = function ()
{
    console.log(part1());
    console.log(part2());
};
