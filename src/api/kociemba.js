import request from '@/utils/request'
export function solve(query) {
  return request({
    url: '/kociemba/post/json/solve',
    method: 'post',
    data: query
  })
}
