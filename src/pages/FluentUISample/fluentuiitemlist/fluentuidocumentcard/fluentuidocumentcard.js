import * as React from 'react';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardTitle,
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from '@uifabric/example-data';

const previewProps = {
  previewImages: [
    {
      name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
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
  ],
};
const DocumentCardActivityPeople = [
  { name: 'Annie Lindqvist', profileImageSrc: TestImages.personaFemale },
];

const FluentUIDocumentCardBasic = () => {
  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">Default DocumentCard</div>
        <div className=" divpadt10">
          <DocumentCard
            aria-label="Default Document Card with large file name. Created by Annie Lindqvist a few minutes ago."
            onClickHref="http://bing.com">
            <DocumentCardPreview {...previewProps} />
            <DocumentCardTitle
              title={
                'Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_' +
                'it_needs_truncating.pptx'
              }
              shouldTruncate
            />
            <DocumentCardActivity
              activity="Created a few minutes ago"
              people={DocumentCardActivityPeople}
            />
          </DocumentCard>
        </div>
      </div>
    </div>
  );
};

export default FluentUIDocumentCardBasic;
