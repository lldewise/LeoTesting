import React, { useEffect, useState } from 'react';
import { Card } from '@uifabric/react-cards';
import Slider from 'infinite-react-carousel';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { DefaultButton, IconButton } from 'office-ui-fabric-react';
import classes from './CarouselNews.module.scss';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

type CarouselProps = {
  featuredNewsList: any[];
  regularNewsList: any[];
};

const CarouselNews: React.FC<CarouselProps> = props => {
  const [slider, setSlider] = useState<JSX.Element>();
  const cardTokens = { childrenMargin: 12 };
  const settings = {
    arrows: false,
    arrowsBlock: false,
    dots: true,
  };

  const history = useHistory();

  useEffect(() => {
    const cardView: JSX.Element[] = [];
    props.featuredNewsList.forEach((item, i) => {
      cardView.push(
        <div key={i}>
          <div className={'ms-Grid-row ' + classes.focus} key={i}>
            <div className="ms-Grid-col ms-lg12 carousel-col">
              <div className="ms-Grid-col  ms-lg4">
                <img alt="" src={item.img} className={classes.imgHeight} />
              </div>

              <div className={'ms-Grid-col ms-lg8 ' + classes.colNewsTitle}>
                <div>
                  <span>
                    <i
                      className={
                        'ms-Icon ms-Icon--' + item.icon + ' ' + classes.newsIcon
                      }
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <label className={classes.newsTitleFont}>
                      {item.title}
                    </label>
                  </span>
                  <span>
                    <label className={classes.newsDateFont}>
                      {moment(item.createddate).format('MMMM DD yyyy')}
                    </label>
                  </span>
                </div>

                <div>
                  <div>
                    <p className={classes.newsContent}>{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    });

    props.regularNewsList.forEach((item, i) => {
      cardView.push(
        <div key={i}>
          <div className={'ms-Grid-row ' + classes.focus} key={i}>
            <div className="ms-Grid-col ms-lg12 carousel-col">
              <div className="ms-Grid-col  ms-lg4">
                <img alt="" src={item.img} className={classes.imgHeight} />
              </div>

              <div className={'ms-Grid-col ms-lg8 ' + classes.colNewsTitle}>
                <div>
                  <span>
                    <i
                      className={
                        'ms-Icon ms-Icon--' + item.icon + ' ' + classes.newsIcon
                      }
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <label className={classes.newsTitleFont}>
                      {item.title}
                    </label>
                  </span>
                  <span>
                    <label className={classes.newsDateFont}>
                      {moment(item.createddate).format('MMMM DD yyyy')}
                    </label>
                  </span>
                </div>

                <div>
                  <div>
                    <p className={classes.newsContent}>{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    });

    const carousel = <Slider {...settings}>{cardView}</Slider>;
    if (cardView.length > 0) {
      setSlider(carousel);
    }
  }, [props]); //eslint-disable-line react-hooks/exhaustive-deps

  function handleClick() {
    history.push('./news');
  }

  return (
    <Card
      className={'carouselNewsRow ' + classes.customBackgroundNews}
      aria-label="Basic horizontal card"
      horizontal
      tokens={cardTokens}>
      <label className={classes.newsTitle}>{intl(LabelNames.news)}</label>
      <div>
        <Card.Item>
          <div className="customDiv">
            {slider}
            <div className="carouselNewsReadmore">
              <span>
                <DefaultButton className="btnDefault">
                  <span className="carouselNewsReadSpan" onClick={handleClick}>
                    Read more
                  </span>
                  <FontIcon
                    iconName="Forward"
                    className="icondDefault"
                    onClick={handleClick}
                  />
                </DefaultButton>
              </span>
            </div>
          </div>
        </Card.Item>
      </div>
      <div className="ms-Grid-col  ms-lg10 text-right ">
        <IconButton
          iconProps={{ iconName: 'more' }}
          className="btnIcon btnIconDark btnIconLg newsCardMore"
        />
      </div>
    </Card>
  );
};

export default CarouselNews;
