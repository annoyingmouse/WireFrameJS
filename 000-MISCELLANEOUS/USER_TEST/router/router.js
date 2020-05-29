import { Home } from '../modules/home/Home.js';
import { SingleTable } from '../modules/single-table/Table.js';
import { MultipleTable } from '../modules/multiple-tables/Tables.js';

export const router = new VueRouter({
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: Home 
    },
    { 
      path: '/single', 
      name: 'table', 
      component: SingleTable 
    },
    { 
      path: '/multiple', 
      name: 'tables', 
      component: MultipleTable 
    }
  ]
})
