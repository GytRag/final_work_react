import FavoriteComp from "../components/FavoriteComp";
import useStore from "../store/main";

const FavoritePage = () => {

    const { favorites} = useStore((state) => state);

    return (
        <div className='favoritePage container-fluid mt-2'>
            {favorites && favorites.map(post => <FavoriteComp key={post._id} post={post} />)}
        </div>
    );
};

export default FavoritePage;