
const IdGenerator = () => {


    const rnd = (num) => Math.floor(Math.random() * num);

    const alphabet = [
        "A","B","C","D","E","F","G","H","I","J","K","L",
        "M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
    ];

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const id = []

    for (let i = 0; i < 9; i++) {
        let rndFor = rnd(100);

        if(rndFor < 30) id.push(alphabet[rnd(alphabet.length)])
        if(rndFor >= 30 && rndFor < 70) id.push(alphabet[rnd(alphabet.length)].toLowerCase())
        if(rndFor > 70) id.push(numbers[rnd(numbers.length)])
    }

    return id.join('')
};

export default IdGenerator;