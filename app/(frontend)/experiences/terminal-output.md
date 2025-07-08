GET /experiences?experience=2 200 in 445ms
 GET / 200 in 573ms
Server searchParams: Promise {
  <pending>,
  experience: [Getter/Setter],
  [Symbol(async_id_symbol)]: 537371,
  [Symbol(trigger_async_id_symbol)]: 537365,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: {
    isStaticGeneration: false,
    page: '/(frontend)/experiences/page',
    fallbackRouteParams: null,
    route: '/experiences',
    incrementalCache: IncrementalCache {
      locks: Map(0) {},
      hasCustomCacheHandler: false,
      dev: true,
      disableForTestmode: false,
      minimalMode: false,
      requestHeaders: [Object],
      requestProtocol: 'http',
      allowedRevalidateHeaderKeys: undefined,
      prerenderManifest: [Object],
      cacheControls: [SharedCacheControls],
      fetchCacheKeyPrefix: '',
      cacheHandler: [FileSystemCache]
    },
    cacheLifeProfiles: {
      default: [Object],
      seconds: [Object],
      minutes: [Object],
      hours: [Object],
      days: [Object],
      weeks: [Object],
      max: [Object]
    },
    isRevalidate: false,
    isPrerendering: undefined,
    fetchCache: undefined,
    isOnDemandRevalidate: false,
    isDraftMode: false,
    requestEndedState: { ended: false },
    isPrefetchRequest: false,
    buildId: 'development',
    reactLoadableManifest: {},
    assetPrefix: '',
    afterContext: AfterContext {
      workUnitStores: Set(0) {},
      waitUntil: [Function (anonymous)],
      onClose: [Function: bound onClose],
      onTaskError: undefined,
      callbackQueue: [EventEmitter]
    },
    dynamicIOEnabled: false,
    dev: true,
    previouslyRevalidatedTags: [],
    refreshTagsByCacheKind: Map(2) { 'default' => [Object], 'remote' => [Object] },
    fetchMetrics: []
  },
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: undefined,
  [Symbol(kResourceStore)]: {
    type: 'request',
    phase: 'render',
    implicitTags: { tags: [Array], expirationsByCacheKind: [Map] },
    url: { pathname: '/experiences', search: '?experience=2&_rsc=pp0w9' },
    rootParams: {},
    headers: [Getter],
    cookies: [Getter/Setter],
    mutableCookies: [Getter],
    userspaceMutableCookies: [Getter],
    draftMode: [Getter],
    renderResumeDataCache: null,
    isHmrRefresh: false,
    serverComponentsHmrCache: LRUCache {
      cache: [Map],
      sizes: [Map],
      totalSize: 249,
      maxSize: 52428800,
      calculateSize: [Function: length]
    }
  }
}
Error: Route "/experiences" used `searchParams.experience`. `searchParams` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    at ExperiencesPage (app\(frontend)\experiences\page.tsx:34:50)
  32 |   }));
  33 |
> 34 |   const initialExperienceId = typeof searchParams.experience === 'string' ? searchParams.experience : transformedExperiences[0]?.id || '';
     |                                                  ^
  35 |
  36 |   if (transformedExperiences.length === 0) {
  37 |     return (
Error: Route "/experiences" used `searchParams.experience`. `searchParams` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    at ExperiencesPage (app\(frontend)\experiences\page.tsx:34:89)
  32 |   }));
  33 |
> 34 |   const initialExperienceId = typeof searchParams.experience === 'string' ? searchParams.experience : transformedExperiences[0]?.id || '';
     |                                                                                         ^  
  35 |
  36 |   if (transformedExperiences.length === 0) {
  37 |     return (
 GET /experiences?experience=2 200 in 224ms
 ✓ Compiled /_not-found/page in 412ms
 GET /.well-known/appspecific/com.chrome.devtools.json 404 in 479ms