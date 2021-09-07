import React, {
  useState,
  Fragment,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { useForm } from 'react-hook-form';
import {
  TagPicker,
  Icon,
  Dropdown,
  Toggle,
  mergeStyleSets,
} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import Calendar from '../../../../components/fluentui/Calendar/Calendar';
import moment from 'moment';
import classes from './CreateSidebarNewsStory.module.scss';
import { intl } from '../../../../util/commonFunction';
import { LabelNames } from '../../../../util/constant';

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '130px',
  },
});

const categoryOptions = [
  { key: 1, text: 'School News', data: { icon: 'Bank' } },
  { key: 2, text: 'Events', data: { icon: 'SpecialEvent' } },
  { key: 3, text: 'Miscellaneous', data: { icon: 'Megaphone' } },
];
const iconStyles = { marginRight: '8px' };

const privacyTags = ['Everybody', 'Private'].map(item => ({
  key: item,
  name: item,
}));

type CreateSidebarNewsStory = {
  categoryItem: any;
  categoryData: any;
  publishDate: any;
  archivedDate: any;
  customizedurl: any;
  featuredArticle: any;
  privacy: any;
  manageNewStories: any;
  errorMessage: any;
};

const CreateSidebarNewsStory: React.FC<CreateSidebarNewsStory> = props => {
  const { handleSubmit } = useForm();
  const [category, setCategory] = useState<number | null>(
    props.categoryItem?.toString() !== 'NaN' && props.categoryItem !== undefined
      ? props.categoryItem
      : 1,
  );
  const [publishDate, setPublishDate] = useState<Date | null>();
  const [archivedDate, setArchivedDate] = useState<Date | null>(null);
  //eslint-disable-next-line
  const [featured, setFeatured] = useState(
    props.manageNewStories !== null ? props.manageNewStories.featured : false,
  );
  const [privacy, setprivacy] = useState<any | null>();
  const picker: any = useRef(null);

  const onSubmit = (data: any) => {};
  const categoryHandler = (data: any) => {
    setCategory(data.key);
    props.categoryData(data);
  };

  const dropdownCategory = {
    dropdown: { width: '100%' },
  };

  const onRenderOption = (option: any) => {
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={iconStyles}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };

  const onRenderTitle = (options: any) => {
    const option = options[0];
    return (
      <div>
        {option.data && option.data.icon && (
          <Icon
            style={iconStyles}
            iconName={option.data.icon}
            aria-hidden="true"
            title={option.data.icon}
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };

  const inputProps = {
    placeholder: intl(LabelNames.privacy),
  };
  const filterSelectedTags = (filterText: any, tagList: any) => {
    return filterText
      ? privacyTags.filter(
          tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
        )
      : [];
  };

  const listContainsTagList = (tag: any, tagList: any) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.some((compareTag: any) => compareTag.key === tag.key);
  };

  const onItemSelected = useCallback((item: any) => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }

    return item;
  }, []);

  const getTextFromItem = (item: any) => item.name;

  const formatSelectedDate = (data: any) => {
    const dateSelected = moment(data).format('MM/DD/YYYY');
    return dateSelected.charAt(0).toUpperCase() + dateSelected.slice(1);
  };

  const publishDateHandler = (data: any) => {
    setPublishDate(data);
    props.publishDate(data);
  };

  const archivedDateHandler = (data: any) => {
    setArchivedDate(data);
    props.archivedDate(data);
  };

  useEffect(() => {
    const privacyList = [];
    const defaultItem = {
      key: 'Everybody',
      name: 'Everybody',
    };
    if (props.manageNewStories !== null) {
      if (props.manageNewStories.privacy !== undefined) {
        const privacySplit = props.manageNewStories.privacy;
        if (privacySplit[0].length > 0) {
          for (let i = 0; i < privacySplit.length; i++) {
            privacyList.push({
              key: privacySplit[i],
              name: privacySplit[i],
            });
          }
        }
      } else {
        privacyList.push(defaultItem);
      }
      privacyDiv(privacyList);
      if (props.manageNewStories.archivedate !== undefined) {
        if (props.manageNewStories.archivedate.length > 0) {
          setArchivedDate(new Date(props.manageNewStories.archivedate));
        }
      }

      if (props.manageNewStories.publishdate !== undefined) {
        if (props.manageNewStories.publishdate.length > 0) {
          setPublishDate(new Date(props.manageNewStories.publishdate));
        }
      }
    } else {
      privacyList.push(defaultItem);
      privacyDiv(privacyList);
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const privacyDiv = (value: any) => {
    const divPrivacy = (
      <TagPicker
        className={classes.picker}
        removeButtonAriaLabel="Remove"
        componentRef={picker}
        onResolveSuggestions={filterSelectedTags}
        onItemSelected={onItemSelected}
        getTextFromItem={getTextFromItem}
        itemLimit={2}
        inputProps={inputProps}
        onChange={onChangeHandler}
        defaultSelectedItems={value}
      />
    );
    setprivacy(divPrivacy);
  };

  const onChangeHandler = (item: any) => {
    props.privacy(item);
  };
  return (
    <>
      <br />
      <div className="padl15 padR10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.saveContainer}>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + classes.itemtitle}>
                {intl(LabelNames.category)}
              </div>
            </div>

            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12">
                <Dropdown
                  selectedKey={category}
                  options={categoryOptions}
                  styles={dropdownCategory}
                  onRenderTitle={onRenderTitle}
                  onRenderOption={onRenderOption}
                  onChanged={categoryHandler}
                />
              </div>
            </div>
            <br />

            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + classes.itemtitle}>
                {intl(LabelNames.privacy)}
              </div>
            </div>

            <div className="ms-Grid-row ">
              {props.errorMessage?.privacy.length > 0 ? (
                <div className="ms-Grid-col ms-lg12 PickerWarning">
                  {privacy}
                </div>
              ) : (
                <div className="ms-Grid-col ms-lg12 ">{privacy}</div>
              )}
            </div>
            {props.errorMessage?.privacy.length > 0 ? (
              <div className="warning">{props.errorMessage.privacy}</div>
            ) : (
              ''
            )}
            <br />
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12">
                <div className={classes.container}>
                  <div className={classes.pad10}>
                    <div className={classes.itemtitle}>
                      {intl(LabelNames.publishon)}
                    </div>
                    <div>
                      <Calendar
                        value={publishDate}
                        formatSelectedDate={formatSelectedDate}
                        onSelectDate={publishDateHandler}
                        styles={controlClass.control}
                        placeholder={intl(LabelNames.now)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className={classes.itemtitle}>Archive on</div>
                    <div>
                      <Calendar
                        value={archivedDate}
                        formatSelectedDate={formatSelectedDate}
                        onSelectDate={archivedDateHandler}
                        styles={controlClass.control}
                        placeholder={intl(LabelNames.never)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + classes.itemtitle}>
                {intl(LabelNames.customizedurl)}
              </div>
            </div>
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12">
                <TextField
                  onChange={(event: any) => {
                    props.customizedurl(event.target.value);
                  }}
                  placeholder={intl(LabelNames.customizedurl)}
                  errorMessage={props.errorMessage?.customurl}
                  defaultValue={props.manageNewStories?.customurl}
                />
              </div>
            </div>
            <br />
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12">
                <div className={classes.center}>
                  {' '}
                  <Toggle
                    label=""
                    defaultChecked={featured}
                    onText={intl(LabelNames.featuredarticle)}
                    offText={intl(LabelNames.featuredarticle)}
                    onChange={props.featuredArticle}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSidebarNewsStory;
