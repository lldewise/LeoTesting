import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardDetails,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardType,
  IDocumentCardActivityPerson,
} from 'office-ui-fabric-react/lib/DocumentCard';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
import { TestImages } from '@uifabric/example-data';

const stackTokens = { childrenGap: 20 };
const theme = getTheme();
const { palette, fonts } = theme;

const people = [
  { name: '', initials: '' },
  { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
  { name: 'Roko Kolar', profileImageSrc: '', initials: 'RK' },
  { name: 'Aaron Reid', profileImageSrc: TestImages.personaMale },
  { name: 'Christian Bergqvist', profileImageSrc: '', initials: 'CB' },
];

const previewPropsUsingIcon = {
  previewImages: [
    {
      previewIconProps: {
        iconName: 'OpenFile',
        styles: {
          root: { fontSize: fonts.superLarge.fontSize, color: palette.white },
        },
        width: 144,
      },
    },
  ],
  styles: { previewIcon: { backgroundColor: palette.themePrimary } },
};

const previewProps = {
  getOverflowDocumentCountText: overflowCount => `+${overflowCount} more`,
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
    {
      name: 'New Contoso Collaboration for Conference Presentation Draft',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreviewTwo,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
    {
      name: 'Spec Sheet for design',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreviewThree,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
    {
      name: 'Contoso Marketing Presentation',
      linkProps: {
        href: 'http://bing.com',
        target: '_blank',
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
  ],
};

const previewOutlookUsingIcon = {
  previewImages: [
    {
      previewIconProps: {
        iconName: 'OutlookLogo',
        styles: {
          root: {
            fontSize: fonts.superLarge.fontSize,
            color: '#0078d7',
            backgroundColor: palette.neutralLighterAlt,
          },
        },
      },
      width: 144,
    },
  ],
  styles: {
    previewIcon: { backgroundColor: palette.neutralLighterAlt },
  },
};

const FluentUIDocumentCardCompact = () => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">
          DocumentCard with compact layout
        </div>
        <div className=" divpadt10">
          <Stack tokens={stackTokens}>
            {/* <DocumentCard
                            aria-label="Document Card with document preview. Revenue stream proposal fiscal year 2016 version 2.
      Created by Roko Kolar a few minutes ago"
                            type={DocumentCardType.compact}
                            onClickHref="http://bing.com"
                        >
                            <DocumentCardPreview previewImages={[previewProps.previewImages[0]]} />
                            <DocumentCardDetails>
                                <DocumentCardTitle title="Revenue stream proposal fiscal year 2016 version02.pptx" shouldTruncate />
                                <DocumentCardActivity activity="Created a few minutes ago" people={[people[1]]} />
                            </DocumentCardDetails>
                        </DocumentCard>
                        <DocumentCard
                            aria-label={
                                'Document Card with folder or site activity. 4 files were uploaded. ' +
                                'Created by Annie Lindqvist a few minutes ago'
                            }
                            type={DocumentCardType.compact}
                            onClickHref="http://bing.com"
                        >
                            <DocumentCardPreview {...previewProps} />
                            <DocumentCardDetails>
                                <DocumentCardTitle title="4 files were uploaded" shouldTruncate />
                                <DocumentCardActivity activity="Created a few minutes ago" people={[people[0]]} />
                            </DocumentCardDetails>
                        </DocumentCard>
                        <DocumentCard
                            aria-label="Document Card with icon. View and share files. Created by Aaron Reid a few minutes ago"
                            type={DocumentCardType.compact}
                            onClickHref="http://bing.com"
                        >
                            <DocumentCardPreview {...previewPropsUsingIcon} />
                            <DocumentCardDetails>
                                <DocumentCardTitle title="View and share files" shouldTruncate />
                                <DocumentCardActivity activity="Created a few minutes ago" people={[people[2]]} />
                            </DocumentCardDetails>
                        </DocumentCard> */}
            <DocumentCard
              aria-label={
                'Document Card with email conversation. Conversation about takeaways from annual SharePoint conference. ' +
                'Sent by Christian Bergqvist a few minutes ago'
              }
              type={DocumentCardType.compact}
              onClickHref="http://bing.com">
              <DocumentCardPreview {...previewOutlookUsingIcon} />
              <DocumentCardDetails>
                <DocumentCardTitle title="Due Today" shouldTruncate />
                <DocumentCardActivity
                  activity="Posted by Clarisse"
                  people={[people[0]]}
                />
              </DocumentCardDetails>
            </DocumentCard>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default FluentUIDocumentCardCompact;
