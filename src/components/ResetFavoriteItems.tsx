import { resetFavoriteData } from "@/store/nextSlice";
import { useDispatch } from "react-redux";

const ResetFavoriteItems = () => {
  const dispatch = useDispatch();
  const handleResetCart = () => {
    const confirmReset = window.confirm(
      "Weet u zeker dat u uw artikelen uit de winkelwagen opnieuw wilt instellen?"
    );
    if (confirmReset) {
      dispatch(resetFavoriteData());
    }
  };
  return (
    <button
      onClick={handleResetCart}
      className="w-44 h-10 font-semibold bg-amazon_yellow rounded-lg hover:bg-red-600 hover:text-white duration-300"
    >
      Reset
    </button>
  );
};

export default ResetFavoriteItems;
