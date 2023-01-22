self.addEventListener('install', e => {
  console.log('install event', e) 
 })
 
 self.addEventListener('activate', e => {
   console.log('activate event', e) 
 })