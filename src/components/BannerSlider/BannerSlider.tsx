import './bannerSlider.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

enum BannerList {
  Accessories = 'accessories',
  Phones = 'phones',
  Tablets = 'tablets',
}

export const BannerSlider = () => {
  const [currentPositionSlider, setCurrentPositionSlider] = useState(0);
  const carouselWidth = 1040;
  const carouselList = Object.values(BannerList);

  const onHandleMoveBanner = (action: 'prev' | 'next') => {
    const bannerLength = carouselList.length;

    switch (action) {
      case 'prev':
        if (currentPositionSlider === 0) {
          setCurrentPositionSlider(-carouselWidth * (bannerLength - 1));
          break;
        }

        setCurrentPositionSlider((prev) => prev + carouselWidth);
        break;

      case 'next':
        if (currentPositionSlider === (
          -carouselWidth * (bannerLength - 1)
        )) {
          setCurrentPositionSlider(0);
          break;
        }

        setCurrentPositionSlider((prev) => prev - carouselWidth);
        break;

      default:
        setCurrentPositionSlider(0);
    }
  };

  useEffect(() => {
    const timeSlide = setTimeout(() => {
      onHandleMoveBanner('next');
    }, 5000);

    return () => clearTimeout(timeSlide);
  }, [currentPositionSlider]);

  return (
    <article className="banner-slider">
      <div className="banner-slider__basic">
        <button
          className="banner-slider__button banner-slider__button--prev"
          type="button"
          aria-label="button-prev"
          onClick={() => onHandleMoveBanner('prev')}
        />

        <div className="banner-slider__carousel">
          <div
            className="banner-slider__inner"
            style={{ transform: `translateX(${currentPositionSlider}px)` }}
          >
            {carouselList.map((item, index) => (
              <div key={`${item + index}`} className="banner-slider__carousel-item">
                <Link to={item}>
                  <img
                    className="banner-slider__carousel-image"
                    src={`_new/img/banner-${item}.png`}
                    alt="banner-img"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          className="banner-slider__button banner-slider__button--next"
          type="button"
          aria-label="button-next"
          onClick={() => onHandleMoveBanner('next')}
        />
      </div>

      <div className="banner-slider__indacators-wrapper">
        {carouselList.map((item, index) => (
          <div
            key={`${index + item}`}
            className={classNames('banner-slider__indicator', {
              'banner-slider__indicator--active':
            -currentPositionSlider / carouselWidth === index,
            })}
          />
        ))}
      </div>
    </article>
  );
};
