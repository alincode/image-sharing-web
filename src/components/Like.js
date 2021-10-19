import { like, unlike } from "../slices/attachment";
import { useDispatch } from "react-redux";

export function Like({ image }) {
  const dispatch = useDispatch();
  console.log(image.id);
  return (
    <div className="card-text">
      <button
        type="button"
        className="btn btn-success btn-lg"
        onClick={() => dispatch(like(image.id))}
      >
        Like
      </button>

      <button
        type="button"
        className="btn btn-danger btn-lg"
        onClick={() => dispatch(unlike(image.id))}
      >
        Unlike
      </button>
    </div>
  );
}

export default Like;
