import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "../slices/attachment";
import Image from "./Image";

function HomePage() {
  const dispatch = useDispatch();
  const { attachments, total } = useSelector((state) => state.attachment);
  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  return (
    <main role="main">
      <div className="album py-5 bg-light">
        <div className="container">
          Total: {total}
          <div className="row">
            {attachments.map(function (image) {
              return <Image image={image} key={image.id} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
