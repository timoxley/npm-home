(function() {
  "use strict"
  var ths = [].slice.apply(document.querySelectorAll('th'))
  if (!ths) return
  var th = ths.filter(function(el) { return /repository/gi.test(el.innerText) }).pop()
  if (!th) return
  var td = th.nextSibling
  if (!td) return
  var a = td.querySelector('a')
  if (!a) return
  var link = a.href

  var messageEl = document.createElement('div')
  messageEl.className = 'npm-home-message'

  function nextDots() {
    return nextDots.dots.shift() || 0
  }
  nextDots.dots = [2, 1, 0]
  nextDots.current = 0
  messageEl.innerHTML = '<strong>npm home</strong> is taking you directly to <a href="'+link+'">'+link+'</a> in <span class="npm-home-dots">3</span><br /><a class="npm-home-cancel" href="#">Cancel Redirect</a></div>'
  var dotsEl = messageEl.querySelector('.npm-home-dots')

  var dotsInterval = setInterval(function() {
    var dots = nextDots()
    dotsEl.innerText = dots
    if (dots === 0) {
      clearInterval(dotsInterval)
      window.location.href = link
    }
  }, 1000)

  document.body.appendChild(messageEl)

  messageEl.querySelector('.npm-home-cancel').addEventListener('click', function(e) {
    e.preventDefault()
    clearInterval(dotsInterval)
    messageEl.innerText = 'OK!'
    setTimeout(function() {
      document.body.removeChild(messageEl)
    }, 1000)
  })
})()
