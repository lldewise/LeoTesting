import * as React from 'react';
import * as ReactIcons from '@fluentui/react-icons';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classes = mergeStyleSets({
  cell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '80px',
    float: 'left',
    height: '50px',
    width: '50px',
  },
  icon: {
    fontSize: '50px',
  },
  code: {
    background: '#f2f2f2',
    borderRadius: '4px',
    padding: '4px',
  },
  navigationText: {
    width: 100,
    margin: '0 5px',
  },
});

const icons = Object.keys(ReactIcons).reduce((acc, exportName) => {
  if (ReactIcons[exportName]?.displayName) {
    acc.push(ReactIcons[exportName]);
  }

  return acc;
}, []);

const numOfIcons = icons.length;
const numOfPages =
  parseInt((numOfIcons / 100).toString(), 10) + (numOfIcons % 100 > 0 ? 1 : 0);

const IconSvgFactoryExample = () => {
  const [page, setPage] = React.useState(1);
  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <div>
      <div>
        <PrimaryButton
          // eslint-disable-next-line react/jsx-no-bind
          onClick={prevPage}
          disabled={page === 1}>
          Prev
        </PrimaryButton>
        <span className={classes.navigationText}>
          Page {page} of {numOfPages}
        </span>
        <PrimaryButton
          // eslint-disable-next-line react/jsx-no-bind
          onClick={nextPage}
          disabled={page === numOfPages}>
          Next
        </PrimaryButton>
      </div>
      <div>
        {icons.slice((page - 1) * 100, (page - 1) * 100 + 100).map(Icon => (
          <div key={Icon.displayName} className={classes.cell}>
            <Icon className={classes.icon} />
            <br />
            <code className={classes.code}>{Icon.displayName}</code>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSvgFactoryExample;
