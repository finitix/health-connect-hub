import { useState, useEffect } from "react";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";
import carousel6 from "@/assets/carousel-6.jpg";
import carousel7 from "@/assets/carousel-7.jpg";
import carousel8 from "@/assets/carousel-8.jpg";
import carousel9 from "@/assets/carousel-9.jpg";
import carousel10 from "@/assets/carousel-10.jpg";

const images = [
  { src: carousel1, label: "Modern Hospital" },
  { src: carousel2, label: "Doctor Consultation" },
  { src: carousel3, label: "Family Healthcare" },
  { src: carousel4, label: "Advanced Lab" },
  { src: carousel5, label: "Patient Care" },
  { src: carousel6, label: "Expert Surgery" },
  { src: carousel7, label: "Hospital Lobby" },
  { src: carousel8, label: "Digital Health" },
  { src: carousel9, label: "Pediatric Care" },
  { src: carousel10, label: "Pharmacy" },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={img.src}
            alt={img.label}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
          <div className="absolute bottom-4 left-4 rounded-lg bg-card/80 backdrop-blur-sm px-3 py-1.5">
            <p className="text-xs font-medium text-foreground">{img.label}</p>
          </div>
        </div>
      ))}
      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-accent" : "w-1.5 bg-card/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
