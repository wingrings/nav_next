import request from '@/lib/http';

const prefix = '';

enum apis {
  getTableList = 'GET api query:results,page,size',
  getUsers = 'POST user/login'
}



export const getTableList = (data: {
  page: number;
  pageSize: number;
}) => request(`${prefix}/api`, data) 


export const getUsers = () => request(`${prefix}/user/login`, {}, 'POST')