// @codepen
import * as React from 'react';
import { Card } from '@uifabric/react-cards';
import { FontWeights, Icon, Image, Stack, Text } from 'office-ui-fabric-react';

const alertClicked = () => {
  alert('Clicked');
};
class CardHorizontalExample extends React.Component {
  render() {
    const siteTextStyles = {
      root: {
        color: '#025F52',
        fontWeight: FontWeights.semibold,
      },
    };
    const descriptionTextStyles = {
      root: {
        color: '#333333',
        fontWeight: FontWeights.regular,
      },
    };
    const helpfulTextStyles = {
      root: {
        color: '#333333',
        fontWeight: FontWeights.regular,
      },
    };
    const iconStyles = {
      root: {
        color: '#0078D4',
        fontSize: 16,
        fontWeight: FontWeights.regular,
      },
    };
    const footerCardSectionStyles = {
      root: {
        alignSelf: 'stretch',
        borderLeft: '1px solid #F3F2F1',
      },
    };

    const sectionStackTokens = { childrenGap: 20 };
    const cardTokens = { childrenMargin: 12 };
    const footerCardSectionTokens = { padding: '0px 0px 0px 12px' };

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-lg12 ">
          <div className="fluenttitle divpadt10">Horizontal Card</div>
          <div className=" divpadt10">
            <Stack tokens={sectionStackTokens}>
              <Card
                aria-label="Basic horizontal card"
                horizontal
                tokens={cardTokens}>
                <Card.Item>
                  <Text>Basic horizontal card</Text>
                </Card.Item>
              </Card>

              <Card
                aria-label="Clickable horizontal card "
                horizontal
                onClick={alertClicked}
                tokens={cardTokens}>
                <Card.Item fill>
                  <Image
                    src="https://placehold.it/180x135"
                    alt="Placeholder image."
                  />
                </Card.Item>
                <Card.Section>
                  <Text variant="small" styles={siteTextStyles}>
                    Contoso
                  </Text>
                  <Text styles={descriptionTextStyles}>
                    Contoso Denver expansion design marketing hero guidelines
                  </Text>
                  <Text variant="small" styles={helpfulTextStyles}>
                    Is this recommendation helpful?
                  </Text>
                </Card.Section>
                <Card.Section
                  styles={footerCardSectionStyles}
                  tokens={footerCardSectionTokens}>
                  <Icon iconName="RedEye" styles={iconStyles} />
                  <Icon iconName="SingleBookmark" styles={iconStyles} />
                  <Stack.Item grow={1}>
                    <span />
                  </Stack.Item>
                  <Icon iconName="MoreVertical" styles={iconStyles} />
                </Card.Section>
              </Card>
            </Stack>
          </div>
        </div>
      </div>
    );
  }
}

export default CardHorizontalExample;
