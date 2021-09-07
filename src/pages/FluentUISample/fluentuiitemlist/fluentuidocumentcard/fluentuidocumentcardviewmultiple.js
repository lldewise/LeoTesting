import * as React from 'react';
import logger from 'loglevel';
import {
  DocumentCard,
  DocumentCardActions,
  DocumentCardActivity,
  DocumentCardLocation,
  DocumentCardPreview,
  DocumentCardTitle,
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from '@uifabric/example-data';

const previewProps = {
  getOverflowDocumentCountText: overflowCount => `+${overflowCount} more`,
  previewImages: [
    {
      name: '2016 Conference Presentation',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196,
    },
    {
      name: 'New Contoso Collaboration for Conference Presentation Draft',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreviewTwo,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196,
    },
    {
      name: 'Spec Sheet for design',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreviewThree,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196,
    },
    {
      name: 'Contoso Marketing Presentation',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196,
    },
    {
      name: 'Notes from Ignite conference',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreviewTwo,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196,
    },
    {
      name: 'FY17 Cost Projections',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreviewThree,
      iconSrc: TestImages.iconPpt,
      imageFit: ImageFit.cover,
      width: 318,
      height: 196,
    },
  ],
};

const onActionClick = (action, ev) => {
  logger.log(`You clicked the ${action} action`);
  ev.stopPropagation();
  ev.preventDefault();
};

const documentCardActions = [
  {
    iconProps: { iconName: 'Share' },
    onClick: onActionClick.bind(this, 'share'),
    ariaLabel: 'share action',
  },
  {
    iconProps: { iconName: 'Pin' },
    onClick: onActionClick.bind(this, 'pin'),
    ariaLabel: 'pin action',
  },
  {
    iconProps: { iconName: 'Ringer' },
    onClick: onActionClick.bind(this, 'notifications'),
    ariaLabel: 'notifications action',
  },
];

const FluentUIDocumentCardCompleteViewMultiple = () => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          DocumentCard with multiple items, commands, and views
        </div>
        <div className=" divpadt10">
          <DocumentCard
            aria-label="Document Card with multiple items, commands and views. Marketing documents. 6 files were uploaded.
Created by Annie Lindqvist in February 23, 2016. 432 views.">
            <DocumentCardPreview {...previewProps} />
            <DocumentCardLocation
              location="Marketing Documents"
              locationHref="http://microsoft.com"
              ariaLabel="Location, Marketing Documents"
            />
            <DocumentCardTitle title="6 files were uploaded" />
            <DocumentCardActivity
              activity="Created Feb 23, 2016"
              people={[
                {
                  name: 'Annie Lindqvist',
                  profileImageSrc: TestImages.personaFemale,
                },
              ]}
            />
            <DocumentCardActions actions={documentCardActions} views={432} />
          </DocumentCard>
        </div>
      </div>
    </div>
  );
};

export default FluentUIDocumentCardCompleteViewMultiple;
