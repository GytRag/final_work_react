import useStore from "../store/main";

const UserCardComp = ({item, socket, click, selected, usersOnline}) => {

    const {user} = useStore((state) => state);


    return (
        <div>
            {user &&
                <div onClick={() => click(item)}
                     style={{backgroundColor: selected === item? "#82C2F4FF":''}}
                    className='d-flex align-items-center border border-dark rounded-2 p-2 gap-2 justify-content-between cursor-point'>
                    <div className='d-flex align-items-center'>
                        <img src={item.image} alt=""/>
                        <div>
                            <div>{item.username}</div>
                            {user.username !== item.username &&
                                <div>
                                    <div>
                                        {usersOnline && usersOnline.find(f => f.username === item.username)?
                                            <div>online</div>
                                            :
                                            <div>{item.isOnline? <div>online</div>:<div>off</div>}</div>}
                                    </div>
                                </div>
                            }
                        </div>

                    </div>

                </div>
            }

        </div>
    );
};

export default UserCardComp;