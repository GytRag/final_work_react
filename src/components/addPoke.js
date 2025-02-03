
const AddPoke = (item) => {

    const pokeName = {
        name: item
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pokeName)
    }

    fetch("http://localhost:8001/addPoke", options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })


};

export default AddPoke;