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

  nextDots.dots = [3, 2, 1, 0]
  nextDots.current = 0
  messageEl.innerHTML = '<div class="npm-home-message-inner">Going&nbsp;to <a href="'+link+'">'+link+'</a>&nbsp;in&nbsp;<span class="npm-home-dots">3&hellip;</span><a class="npm-home-cancel" title="Cancel Redirect" href="#">&#10006;</a></div></div>'
  var dotsEl = messageEl.querySelector('.npm-home-dots')

  var cancelled = false
  var dotsInterval
  var dotsInterval = setInterval(function() {
    var dots = nextDots()
    dotsEl.innerHTML = dots + '&hellip;'
    if (dots !== 0) return
    messageEl.classList.remove('visible')
    clearInterval(dotsInterval)
    if (!cancelled) window.location.href = link
  }, 1000)

  var wrap = document.body.querySelector('#wrap header')
  wrap.insertBefore(messageEl, wrap.firstElementChild)
  setTimeout(function() {
    messageEl.classList.add('visible')
  }, 0)

  messageEl.querySelector('.npm-home-cancel').addEventListener('click', function(e) {
    e.preventDefault()
    cancelled = true

    messageEl.firstElementChild.innerHTML = 'OK!'

    clearInterval(dotsInterval)
    setTimeout(function() {
      messageEl.classList.remove('visible')
      messageEl.addEventListener('transitioned', function() {
        wrap.removeChild(messageEl)
      })
    }, 500)
  })
})()
