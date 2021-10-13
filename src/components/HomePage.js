import React, { useState, useEffect } from "react";
import AttachmentService from "../services/attachment";

function HomePage() {
  const [images, setAttachments] = useState([]);

  useEffect(() => {
    fetchAttachment();
  }, []);

  const fetchAttachment = () => {
    AttachmentService.fetchAttachment()
      .then((res) => {
        setAttachments(res.attachments);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <main role="main">
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {images.map(function (image) {
              return (
                <div className="col-md-4" key={"image-" + image.id}>
                  <div className="card mb-4 shadow-sm">
                    <img src={image.url} alt={image.description} />
                    <div className="card-body">
                      <p className="card-text">{image.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
