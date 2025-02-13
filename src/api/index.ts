import request from '@/lib/http';

const prefix = '';



export const getTableList = (data: {
  page: number;
  pageSize: number;
}) => request(`${prefix}/api`, data) 


export const getUsers = () => request(`${prefix}/user/login`, {}, 'POST')