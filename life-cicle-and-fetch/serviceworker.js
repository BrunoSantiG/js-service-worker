//version 2
console.log('we are a sw!')


//import an script
try {
  importScripts('events.js')
} catch (error) {
  console.log('import event.js error')
}


// SW FetchEvent
self.addEventListener('fetch', event => {
  const {
    url,
    cache, 
    credential, 
    destination, 
    method, 
    referrer
  } = event.request

  const parsedURL = new URL(url)

  if(parsedURL.pathname === '/' || parsedURL.pathname.includes('.css')){
    return 
  }

  if (parsedUrl.pathname.match(/^\/api\/*/)) {
    const object = {
      temp: 28
    }
    const jsonResponse = new Response(JSON.stringify(object), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    event.respondWith(jsonResponse)
}


  const body = `
    <!DOCTYPE html>
    <title>SW FetchEvent</title>
    <h1>SW FetchEvent </h1>
    <ul>
      <li>URL: ${url}</li>
      <li>Cache: ${cache}</li>
      <li>Credentials: ${credential}</li>
      <li>Destination: ${destination}</li>
      <li>Method: ${method}</li>
      <li>Referrer: ${referrer}</li>
    </ul>
  `
  const response = new Response(body,{
    status: 200,
    statusText: 'Ok',
    headers: {
      'Content-type': 'text/html'
    }
  })
  event.respondWith(response)
})