const precacheList = [
  '/', 'mission.html', 'resources.html', 'tours.html', 
  'app.js', 'weather.js',
  '_css/fonts.css', '_css/main.css', '_css/mobile.css', '_css/tablet.css',
  '_images/back_bug.gif', '_images/desert_desc_bug.gif', '_images/nature_desc_bug.gif',
  '_images/backpack_bug.gif', '_images/flag.jpg', '_images/snow_desc_bug.gif',
  '_images/calm_bug.gif', '_images/home_page_back.jpg','_images/springs_desc_bug.gif',
  '_images/calm_desc_bug.gif', '_images/kids_desc_bug.gif', '_images/star_bullet.gif',
  '_images/cycle_desc_bug.gif', '_images/logo.gif', '_images/taste_bug.gif',
  '_images/cycle_logo.png', '_images/looking.jpg', '_images/taste_desc_bug.gif',
  '_images/desert_bug.gif', '_images/mission_look.jpg', '_images/tour_badge.png'
];


//Add precacheList files to cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('app-assets-v2')
      .then(cache => {
        cache.addAll(precacheList)
      })
  )
})

self.addEventListener('activate', event => {
  const cacheWhileList = ["app-assets-v2, app-fonts-v1"]
  event.waitUntil(
    caches.keys()
      .then(names =>{
        Promise.all(
          names.map(cacheName => {
            if(!cacheWhileList.includes(cacheName)){
              return caches.delete(cacheName)
            }
          })
        )
      })
  )
})

self.addEventListener('fetch', event => {
  const parsedURL = new URL(event.request.url)
  if(parsedURL.pathname.match(/^\/_css*/)){
    //Network-First policy to get the most recent css files
    /* event.respondWith(
      fetch(event.request)
      .catch(err => {
        //If the fetch failes we get the file from cache
        return caches.match(event.request)
    })) */
    
    //Stale while Revalidate, returns cache css file, but update the cache 
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          const networkFetch = fetch(event.request)
            .then(networkResponse => {
              return caches.open('app-assets-v2')
                .then(cache => {
                  cache.put(event.request, networkResponse.clone())
                  return networkResponse
                })
            })

          return response || networkFetch
        })
    )
  }else{
    // Cache-First to 
    event.respondWith(
      caches.match(event.request)
        .then(response =>{
          if(response){
            return response
          }else{
            //Add files from fonts folder in cache
            if(parsedURL.pathname.match(/^\/_fonts*/)){
              const fetchRequest = fetch(event.request)
                .then(networkResponse => {
                  caches.open('app-fonts-v1')
                    .then(cache => {
                      cache.put(event.request, networkResponse.clone())
                      return networkResponse
                    })
                })
              return fetchRequest
            }else{
              return fetch(event.request)

            }
          }
        })
    )
  }
  
})