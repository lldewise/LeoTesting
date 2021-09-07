## TO BE UPDATED - Atedu School Management System 

### Libraries Features
* Configurable Route based on react-router-dom
* Authentication Component and Login Page based on react-hook-form
* Sidebar Layout, the nav items read from routeConfig


### Demo users
* admin/admin
* demo/demo

### Route Config
```javascript
const routeConfig = hierarchize(
  {
    key: 'home',
    name: 'Home',
    icon: 'Home',
    path: '/',
    component: React.lazy(() => import('./pages/dashboard')),
    children: [
      {
        key: 'login',
        name: 'Login',
        isPublic: true, // no need to authenticate
        isHidden: true, // hide in sidebar
        component: React.lazy(() => import('./pages/Login'))
      },
      {
        key: 'order',
        name: 'Order',
        icon: 'visualizeApp',
        children: [
          {
            key: 'purchase-order',
            name: 'Purchase Order',
            component: React.lazy(() => import('./pages/order/purchase'))
          },
          {
            key: 'sales-order',
            name: 'Sales Order'
          }
        ]
      },
      // ...etc
    ]
  },
  null,
  pathGenerator
);

```

### Screenshots


#### Login page

 
#### Sidebar Layout

 
