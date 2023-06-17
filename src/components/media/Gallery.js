import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// source: https://blog.openreplay.com/build-an-elegant-gallery-with-react-responsive-carousel

const Gallery = (props) => {
  return (
    <Carousel
      className="gallery"
      autoPlay
      interval="4500"
      transitionTime="1800"
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      dynamicHeight // if you want height to change based on image
    >
      <div>
        <img src={props.imgUrls[0]} height="100" alt="" />
      </div>
      <div>
        <img src={props.imgUrls[1]} height="100" alt="" />
      </div>
      <div>
        <img src={props.imgUrls[2]} height="100" alt="" />
      </div>
    </Carousel>
  );
};

export default Gallery;
