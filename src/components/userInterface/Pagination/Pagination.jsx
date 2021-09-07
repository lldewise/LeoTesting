import React, { Fragment, useState } from 'react';
import styles from './Pagination.module.scss';
import { ActionButton, Label, Dropdown } from 'office-ui-fabric-react';

const dropdownStyles = {
  dropdown: { width: '55px' },
};

const Pagination = ({ perPage, totalPages, paginate }) => {
  const pageNumber = [];
  const [defaultSelectedKey, setDefaultSelectedKey] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPages / perPage); i++) {
    pageNumber.push({ key: i, text: i });
  }

  const onRenderOption = option => {
    return (
      <>
        <div key={option.key}>{option.text}</div>
      </>
    );
  };

  const dpOnchange = item => {
    setDefaultSelectedKey(item.key);
    paginate(item.key);
  };

  const onPreviousClickHandler = () => {
    const prev = defaultSelectedKey - 1;
    setDefaultSelectedKey(prev);
    paginate(prev);
  };

  const onNextClickHandler = () => {
    const next = defaultSelectedKey + 1;
    setDefaultSelectedKey(next);
    paginate(next);
  };

  return (
    <div className={styles.container}>
      <div className={styles.actionBtn}>
        <ActionButton
          disabled={defaultSelectedKey === 1}
          iconProps={{ iconName: 'ChevronLeft' }}
          text="Prev"
          className="btnPlain"
          onClick={onPreviousClickHandler}
        />
      </div>
      <div className={styles.labelPage}>
        <Label>Page</Label>
      </div>
      <div className={styles.dpSelect}>
        <Dropdown
          options={pageNumber}
          styles={dropdownStyles}
          onRenderOption={onRenderOption}
          defaultSelectedKey={defaultSelectedKey}
          autoComplete="activePage"
          name="activePage"
          onChanged={dpOnchange}
        />
      </div>
      <div className={styles.labelPage}>
        <Label>of &nbsp; {pageNumber?.length}</Label>
      </div>
      <div className={styles.actionBtn}>
        <ActionButton
          disabled={defaultSelectedKey === pageNumber.length}
          text="Next"
          iconProps={{ iconName: 'ChevronRight' }}
          className="btnPlain btnIconRight"
          onClick={onNextClickHandler}
        />
      </div>
    </div>
  );
};

export default Pagination;
