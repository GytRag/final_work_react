import SinglePostComp from "../components/SinglePostComp";
import useStore from "../store/main";



const IndexPage = () => {

    const {users} = useStore((state) => state)


    return (
        <div className='m-2 d-flex gap-1 flex-column'>
            <div className='d-flex gap-1 justify-content-center'>
                <div className='d-flex gap-1 flex-column'>
                    {users && users.map((x, i) => <SinglePostComp key={i} item={x}/>)}
                </div>
            </div>


        </div>
    );
};

export default IndexPage;