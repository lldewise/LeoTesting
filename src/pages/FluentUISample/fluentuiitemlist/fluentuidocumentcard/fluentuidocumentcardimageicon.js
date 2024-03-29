import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardImage,
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from '@uifabric/example-data';

const people = [
  { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
  { name: 'Roko Kolar', profileImageSrc: '', initials: 'RK' },
  { name: 'Aaron Reid', profileImageSrc: TestImages.personaMale },
  { name: 'Christian Bergqvist', profileImageSrc: '', initials: 'CB' },
];

const oneNoteIconProps = {
  iconName: 'OneNoteLogo',
  styles: {
    root: {
      color: '#813a7c',
      fontSize: '120px',
      width: '120px',
      height: '120px',
    },
  },
};

const FluentUIDocumentCardImage = () => {
  const cardStyle = {
    root: {
      display: 'inline-block',
      marginRight: 20,
      marginBottom: 20,
      width: 320,
    },
  };

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          DocumentCard with image or icon
        </div>
        <div className=" divpadt10">
          <DocumentCard
            aria-label={
              'Document Card with image. How to make a good design. ' +
              'Last modified by Annie Lindqvist and 2 others in March 13, 2018.'
            }
            styles={cardStyles}
            onClickHref="http://bing.com">
            <DocumentCardImage
              height={150}
              imageFit={ImageFit.cover}
              imageSrc={TestImages.documentPreviewTwo}
            />
            <DocumentCardDetails>
              <DocumentCardTitle
                title="How to make a good design"
                shouldTruncate
              />
            </DocumentCardDetails>
            <DocumentCardActivity
              activity="Modified March 13, 2018"
              people={people.slice(0, 3)}
            />
          </DocumentCard>
          <DocumentCard
            aria-label={
              'Document Card with icon. How to make a good design. ' +
              'Last modified by Christian Bergqvist in January 1, 2019.'
            }
            styles={cardStyles}
            onClickHref="http://bing.com">
            <DocumentCardImage
              height={150}
              imageFit={ImageFit.cover}
              iconProps={oneNoteIconProps}
            />
            <DocumentCardDetails>
              <DocumentCardTitle
                title="How to make a good design"
                shouldTruncate
              />
            </DocumentCardDetails>
            <DocumentCardActivity
              activity="Modified January 1, 2019"
              people={[people[3]]}
            />
          </DocumentCard>
        </div>
      </div>
    </div>
  );
};

export default FluentUIDocumentCardImage;
