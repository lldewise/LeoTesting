import React from 'react';
import { get } from 'lodash-es';
import paths from 'path';
import { intl } from './util/commonFunction';
import { LabelNames } from './util/constant';
import { hierarchize } from './util/hierarchical';
import i18n from './i18n/i18n';
const keyName = 'key';
const pathName = 'path';
const uniqueKeyName = 'uniqueKey';

function pathGenerator(node, parent) {
  const parentUniqueKey = get(parent, uniqueKeyName);
  const uniqueKey = parentUniqueKey
    ? parentUniqueKey + '.' + node[keyName]
    : node[keyName];

  const parentPath = get(parent, pathName, '');
  const path = get(node, pathName, paths.join(parentPath, node[keyName]));
  node[uniqueKeyName] = uniqueKey;
  node[pathName] = path;
}

const routeConfig = hierarchize(
  {
    key: 'dashboard',
    name: intl(LabelNames.smenu_dashboard),
    icon: 'Home',
    path: '/',
    component: React.lazy(() => import('./pages/Dashboard')),
    children: [
      {
        key: '',
        path: '/' + i18n.language + '/',
        isHidden: true,
        children: [
          {
            key: 'news',
            name: 'News',
            icon: 'News',
            component: React.lazy(() => import('./pages/News')),
            children: [
              {
                key: 'list',
                name: 'Manage News',
                icon: 'SecurityGroup',
                component: React.lazy(() =>
                  import('./pages/Administration/News/ManageNews'),
                ),
              },
              {
                key: 'create',
                name: 'Create News Story',
                icon: 'SecurityGroup',
                isHidden: true,
                isPublic: true,
                component: React.lazy(() =>
                  import('./pages/Administration/News/CreateNewsStory'),
                ),
              },
              {
                key: 'editnewsstory',
                name: 'Edit',
                icon: 'SecurityGroup',
                isHidden: true,
                isPublic: true,
                component: React.lazy(() =>
                  import('./pages/Administration/News/EditNewsStory'),
                ),
              },
            ],
          },
          {
            key: 'administration',
            name: 'Administration',
            icon: 'Processing',
            children: [
              {
                key: 'user-account',
                name: 'User Accounts',
                icon: 'ContactCardSettings',
                component: React.lazy(() =>
                  import(
                    './pages/Administration/UserAccounts/UserAccountsList'
                  ),
                ),
                children: [
                  {
                    key: 'user',
                    name: 'User Create',
                    icon: 'ContactCardSettings',
                    component: React.lazy(() =>
                      import(
                        './pages/Administration/UserAccounts/UserAccountsCreate'
                      ),
                    ),
                  },
                ],
              },
              {
                key: 'manage-classes',
                name: 'Classes',
                icon: 'Dictionary',
                component: React.lazy(() =>
                  import('./pages/Administration/Classes'),
                ),
                children: [
                  {
                    key: 'class',
                    name: 'Class Create',
                    icon: 'Dictionary',
                    component: React.lazy(() =>
                      import('./pages/Administration/Classes/ClassCreate'),
                    ),
                  },
                ],
              },
              {
                key: 'class-details',
                name: 'Class Details',
                icon: 'Dictionary',
                component: React.lazy(() =>
                  import('./pages/Administration/Classes/ClassDetails'),
                ),
              },
              {
                key: 'activities',
                name: 'Activity',
                icon: 'EditCreate',
                component: React.lazy(() =>
                  import('./pages/Administration/OtherActivities'),
                ),
                children: [
                  {
                    key: 'create',
                    name: 'Create Activity',
                    icon: 'EditCreate',
                    component: React.lazy(() =>
                      import(
                        './pages/Administration/OtherActivities/OtherActivityCreate'
                      ),
                    ),
                  },
                  {
                    key: 'details',
                    name: 'Activity Attendance',
                    icon: 'EditCreate',
                    component: React.lazy(() =>
                      import('./pages/Administration/OtherActivities/Activity'),
                    ),
                  },
                ],
              },

              {
                key: 'create',
                name: 'Create Email',
                icon: 'Mail',
                component: React.lazy(() =>
                  import('./pages/Administration/EmailRooster/CreateEmail'),
                ),
              },
            ],
          },
        ],
      },
      {
        key: '',
        path: '/' + i18n.language + '/',
        isHidden: true,
        children: [
          {
            key: 'profile',
            name: 'profile',
            isHidden: true,
            children: [
              {
                key: 'myprofile',
                component: React.lazy(() =>
                  import('./pages/Profile/MyProfile'),
                ),
              },
              {
                key: 'accountsetting',
                component: React.lazy(() =>
                  import('./pages/Profile/AccountSetting'),
                ),
              },
              {
                key: 'create',
                name: 'Create News Story',
                icon: 'SecurityGroup',
                isHidden: true,
                isPublic: true,
                component: React.lazy(() =>
                  import('./pages/Administration/News/CreateNewsStory'),
                ),
              },
              {
                key: 'editnewsstory',
                name: 'Edit',
                icon: 'SecurityGroup',
                isHidden: true,
                isPublic: true,
                component: React.lazy(() =>
                  import('./pages/Administration/News/EditNewsStory'),
                ),
              },
            ],
          },
        ],
      },
      {
        key: 'mail',
        name: 'Mail',
        component: React.lazy(() => import('./pages/Administration/Email/Mailbox')),
        icon: 'Mail',
      },
      {
        key: 'schedules',
        name: intl(LabelNames.smenu_schedules),
        component: React.lazy(() => import('./pages/Schedules')),
        icon: 'Calendar',
      },
      {
        key: 'classes',
        name: intl(LabelNames.smenu_classes),
        component: React.lazy(() => import('./pages/Classes')),
        icon: 'Dictionary',
        children: [
          {
            key: 'lesson',
            path:
              '/' +
              i18n.language +
              '/classes/:classId/lessons/:lessonId/attendance',
            exact:
              '/' +
              i18n.language +
              '/classes/:classId/lessons/:lessonId/attendance',
            // exact: '/'+ i18n.language + '/classes/:classId/lessons/:lessonId/attendance' ,
            isHidden: true,
            isPublic: true,
            component: React.lazy(() => import('./pages/Classes/')),
            // component : {Attendance}
          },
        ],
      },
      {
        key: 'students',
        name: 'Students', //intl(LabelNames.smenu_students),
        component: React.lazy(() => import('./pages/Students/StudentList')),
        icon: 'ContactCard',
      },
      {
        key: 'student-enrollment',
        name: 'Students Enrollment',
        component: React.lazy(() => import('./pages/Students/Enrollment')),
        icon: 'ContactCard',
      },
      {
        key: 'documents',
        name: intl(LabelNames.smenu_documents),
        icon: 'FabricFolder'        
      },
      {
        key: 'files',
        name: intl(LabelNames.smenu_files),        
        component: React.lazy(() => import('./pages/Files')),
        icon: 'FabricFolder',
      },
      {
        key: 'assignments',
        name: intl(LabelNames.smenu_assignments),
        icon: 'EditNote',
      },
      {
        key: 'groups',
        name: intl(LabelNames.smenu_groups),
        icon: 'Group',
      },
      {
        key: 'messages',
        name: intl(LabelNames.smenu_messages),
        icon: 'Message',
      },
      {
        key: 'attendance',
        name: intl(LabelNames.smenu_attendance),
        component: React.lazy(() => import('./pages/Teachers/Attendance')),
        icon: 'ReminderPerson',
      },
      {
        key: 'weekly-attendance',
        name: 'Weekly Attendance',
        icon: 'ReminderPerson',
        isHidden: true,
        component: React.lazy(() =>
          import('./pages/Teachers/AttendanceWeekly'),
        ),
      },
      {
        key: 'newsdetails',
        name: intl(LabelNames.smenu_news),
        icon: 'News',
        isHidden: true,
        component: React.lazy(() => import('./pages/NewsDetails')),
      },
      {
        key: 'fluentui',
        name: 'FluentUI',
        icon: 'SecurityGroup',
        isHidden: true,
        component: React.lazy(() =>
          import('./pages/FluentUISample/fluentuisample'),
        ),
      },
      {
        key: 'storagepoc',
        name: 'Storage POC',
        icon: 'SecurityGroup',
        isHidden: true,
        component: React.lazy(() => import('./pages/StoragePOC')),
      },
      {
        key: 'reacthookforms',
        name: 'React Hook Form',
        icon: 'SecurityGroup',
        isHidden: true,
        isPublic: true,
        component: React.lazy(() => import('./pages/ReactHookForm')),
      },
      {
        key: 'eventsource',
        name: 'Event Source POC',
        icon: 'SecurityGroup',
        isHidden: true,
        component: React.lazy(() => import('./pages/EventSourcePOC')),
      },
      {
        key: 'createnewsstory',
        name: 'React Hook Form',
        icon: 'SecurityGroup',
        isHidden: true,
        isPublic: false,
        component: React.lazy(() =>
          import('./pages/Administration/News/CreateNewsStory'),
        ),
      },
      {
        key: 'managenews',
        name: 'Manage News',
        icon: 'SecurityGroup',
        isHidden: true,
        isPublic: false,
        component: React.lazy(() =>
          import('./pages/Administration/News/ManageNews'),
        ),
      },
      {
        key: 'editnewsstory',
        name: 'React Hook Form',
        icon: 'SecurityGroup',
        isHidden: true,
        isPublic: false,
        component: React.lazy(() =>
          import('./pages/Administration/News/EditNewsStory'),
        ),
      },
      {
        key: 'events',
        name: intl(LabelNames.smenu_events),
        icon: 'FavoriteStar',
      },
    ],
  },
  null,
  pathGenerator,
);

export default routeConfig;
