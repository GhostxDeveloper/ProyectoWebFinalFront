import React from "react";
import { Carousel } from "antd";
import "./CarouselComponent.css";

// Imágenes importadas desde la carpeta "assets/images"
import image1 from "../../assets/image.png";
import image3 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";

const CarouselComponent = () => {
  const images = [
    { src: image1, title: "Imagen 1" },
    { src: image2, title: "Imagen 2" },
    { src: image3, title: "Imagen 3" }
  ];

  const carouselSettings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    adaptiveHeight: false
  };

  return (
    <Carousel {...carouselSettings}>
      {images.map((image, index) => (
        <div key={index} className="carousel-slide">
          <img 
            src={image.src} 
            alt={image.title} 
            className="carousel-image" 
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;