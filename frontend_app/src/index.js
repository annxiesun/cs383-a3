
// Import CSS styles in JavaScript
import "./socket.js"
// Initialize p5.js
// p5 requires two arguments: new p5(sketch function, target DOM element)

// Enable live reload while developing (https://esbuild.github.io/api/#live-reload)
if (process.env.NODE_ENV !== 'production') {
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload(),
  )
}
window.addEventListener('touchstart', () => {
  console.log("hi")
  document.body.requestFullscreen({
    navigationUI: "hide"
  })
  document.body.webkitEnterFullScreen();
})
console.log(window.location.pathname)
