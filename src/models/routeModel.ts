export interface IRoute {
  id: number,
  url: string,
  target: string,
  webSocket: boolean,
  ignoreBasePath: boolean,
  created_at: string,
  updated_at: string
}