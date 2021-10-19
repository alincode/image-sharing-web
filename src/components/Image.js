import Like from "./Like";

export function Image({ image }) {
  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <img src={image.url} alt={image.description} />
        <div className="card-body">
          <p className="card-text">{image.description}</p>
          <Like image={image} key={image.id} />
        </div>
      </div>
    </div>
  );
}

export default Image;
