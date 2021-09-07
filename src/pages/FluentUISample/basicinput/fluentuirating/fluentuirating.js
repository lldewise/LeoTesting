import React from 'react';
import { Rating, RatingSize } from 'office-ui-fabric-react/lib/Rating';
import { getTheme, createTheme } from 'office-ui-fabric-react/lib/Styling';

const getRatingComponentAriaLabel = (rating, maxRating) => {
  return `Rating value is ${rating} of ${maxRating}`;
};

const customTheme = createTheme(getTheme());
customTheme.semanticColors.bodySubtext = '#DFDFDF';
customTheme.semanticColors.bodyTextChecked = '#1E9FE8';

const FluentUIRating = () => {
  const [largeStarRating, setLargeStarsRating] = React.useState(1);
  const [smallStarRating, setSmallStarRating] = React.useState(3);
  const [tenStarRating, setTenStarRatingg] = React.useState(1);
  const [customIconStarRating, setCustomIconStarRating] = React.useState(2.5);
  const [themedStarRating, setThemedStarRating] = React.useState(1);

  const onLargeStarChange = (ev, rating) => {
    setLargeStarsRating(rating);
  };

  const onSmallStarChange = (ev, rating) => {
    setSmallStarRating(rating);
  };

  const onTenStarChange = (ev, rating) => {
    setTenStarRatingg(rating);
  };
  const onCustomIconStarChange = (ev, rating) => {
    setCustomIconStarRating(rating);
  };
  const onThemedStarChange = (ev, rating) => {
    setThemedStarRating(rating);
  };

  return (
    <div>
      <div className="fluenttitle divpadt10">Rating</div>
      <div className="divpadt10">
        <div>
          Large Stars:
          <Rating
            min={1}
            max={5}
            size={RatingSize.Large}
            rating={largeStarRating}
            getAriaLabel={getRatingComponentAriaLabel}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onLargeStarChange}
            ariaLabelFormat={'Select {0} of {1} stars'}
          />
          Small Stars
          <Rating
            id="small"
            min={1}
            max={5}
            rating={smallStarRating}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onSmallStarChange}
            getAriaLabel={getRatingComponentAriaLabel}
            ariaLabelFormat={'Select {0} of {1} stars'}
          />
          10 Small Stars
          <Rating
            min={1}
            max={10}
            rating={tenStarRating}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onTenStarChange}
            getAriaLabel={getRatingComponentAriaLabel}
            ariaLabelFormat={'Select {0} of {1} stars'}
          />
          Disabled:
          <Rating
            min={1}
            max={5}
            rating={1}
            disabled={true}
            ariaLabelFormat={'Select {0} of {1} stars'}
          />
          Half star in readOnly mode:
          <Rating
            min={1}
            max={5}
            rating={2.5}
            getAriaLabel={getRatingComponentAriaLabel}
            readOnly
            ariaLabelFormat={'Select {0} of {1} stars'}
          />
          Custom icons:
          <Rating
            min={1}
            max={5}
            rating={customIconStarRating}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onCustomIconStarChange}
            getAriaLabel={getRatingComponentAriaLabel}
            ariaLabelFormat={'Select {0} of {1} stars'}
            icon="StarburstSolid"
            unselectedIcon="Starburst"
          />
          Themed star
          <Rating
            min={1}
            max={5}
            rating={themedStarRating}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onThemedStarChange}
            getAriaLabel={getRatingComponentAriaLabel}
            ariaLabelFormat={'Select {0} of {1} stars'}
            theme={customTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default FluentUIRating;
