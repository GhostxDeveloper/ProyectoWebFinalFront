import React from "react";
import { Carousel } from "antd";
import "./CarouselComponent.css";

// Imágenes importadas desde la carpeta "assets/images"
import image1 from "../../assets/image.png";
import image3 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
const CarouselComponent = () => {
  const images = [image1, image2, image3]; // Usamos las imágenes importadas

  return (
    <Carousel autoplay>
      {images.map((src, index) => (
        <div key={index} className="carousel-slide">
          <img src={src} alt={`Slide ${index + 1}`} className="carousel-image" />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
