import FavoriteComp from "../components/FavoriteComp";
import useStore from "../store/main";

const FavoritePage = () => {

    const { favorites} = useStore((state) => state);

    return (
        <div className='d-flex flex-wrap m-2 gap-1'>
            {favorites && favorites.map(post => <FavoriteComp key={post._id} post={post} />)}
        </div>
    );
};

export default FavoritePage;