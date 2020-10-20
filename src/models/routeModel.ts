export interface IRoute {
  id: number,
  url: string,
  target: string,
  webSocket: boolean,
  ignorebasePath: boolean,
  created_at: string,
  updated_at: string
}