//version 2
console.log('we are a sw!')


//import an script
try {
  importScripts('events.js')
} catch (error) {
  console.log('import event.js error')
}