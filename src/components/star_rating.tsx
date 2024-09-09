/** @format */

import { StarRatingProps } from "@/types";
import { useState } from "react";

const StarRating: React.FC<StarRatingProps> = ({ label, onRatingChange }) => {
  const starsArr = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number>(0);

  const showHoverEffect = (e: React.MouseEvent<SVGPolygonElement>) => {
    const id = parseInt(e.currentTarget.id);
    if (id <= rating) return;

    for (let i = rating + 1; i <= id; i++) {
      const ele = document.getElementById(`${label}-${i}`);
      if (ele instanceof SVGPolygonElement) {
        ele.style.fill = "#00C2C2";
      }
    }
  };

  const removeHoverEffect = (e: React.MouseEvent<SVGPolygonElement>) => {
    const id = parseInt(e.currentTarget.id);
    if (id <= rating) return;

    for (let i = rating + 1; i <= id; i++) {
      const ele = document.getElementById(`${label}-${i}`);
      if (ele instanceof SVGPolygonElement) {
        ele.style.fill = "none";
      }
    }
  };

  const giveRating = (e: React.MouseEvent<SVGPolygonElement>) => {
    const id = parseInt(e.currentTarget.id.split("-")[1]);
    if (id > rating) {
      for (let i = rating + 1; i <= id; i++) {
        const ele = document.getElementById(`${label}-${i}`);
        if (ele instanceof SVGPolygonElement) {
          ele.style.fill = "#00C2C2";
        }
      }
    } else {
      for (let i = id + 1; i <= rating; i++) {
        const ele = document.getElementById(`${label}-${i}`);
        if (ele instanceof SVGPolygonElement) {
          ele.style.fill = "none";
        }
      }
    }
    setRating(id);
    onRatingChange(id);
  };

  return (
    <div className='mb-0'>
      <div className='flex'>
        {starsArr.map((id) => (
          <div key={id}>
            <svg
              width='1.5cm'
              height='1.5cm'
              xmlns='http://www.w3.org/2000/svg'
              version='1.1'
              viewBox='200 0 500 500'>
              <polygon
                fill='none'
                id={`${label}-${id}`}
                stroke='#33333366'
                onClick={giveRating}
                onMouseOver={showHoverEffect}
                onMouseLeave={removeHoverEffect}
                strokeWidth='10'
                points='350,75  379,161 469,161 397,215
                  423,301 350,250 277,301 303,215
                  231,161 321,161'
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
