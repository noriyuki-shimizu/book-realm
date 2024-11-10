declare module 'vue-router' {
  interface RouteMeta {
    /** 認証なしに閲覧可能なページかどうか */
    auth?: boolean
  }
}

export {}
