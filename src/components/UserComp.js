import useStore from "../store/main";

const UserComp = ({user}) => {

    const {userConnected} = useStore((state) => state);


    function addFavorite() {

        const item = user

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            body: JSON.stringify(item)
        }

        fetch('http://localhost:8001/addfavorite', options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })


    }

    return (
        <div className='d-flex border border-black rounded-2 p-2 align-items-center'>
            <img className='image rounded-2 me-2' src={user.image} alt=""/>
            <div>
                <h5>{user.username}</h5>
                {userConnected._id !== user._id && <button onClick={addFavorite}>add favorite</button>}
            </div>

        </div>
    );
};


export default UserComp;