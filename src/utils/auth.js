import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getArr(arr1, arr2) {
  var activeSubjectsArr = []
  for (var i = 0; i < arr2.length; i++) {
    var activeSubjectsObject = {}
    for (var j = 0; j < arr1.length; j++) {
      if (i === j) {
        activeSubjectsObject.name = arr2[i]
        activeSubjectsObject.value = arr1[j]
        activeSubjectsArr.push(activeSubjectsObject)
      }
    }
  }
  return activeSubjectsArr
}

export function get_uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('')
  return uuid
}

export function give_color(answer, myAnswer, a, b, c) {
  var arr = []
  if (answer === myAnswer) {
    if (answer === 'A') {
      arr = [a, c, c, c]
    } else if (answer === 'B') {
      arr = [c, a, c, c]
    } else if (answer === 'C') {
      arr = [c, c, a, c]
    } else if (answer === 'D') {
      arr = [c, c, c, a]
    }
  } else {
    if (answer === 'A') {
      if (myAnswer === 'B') {
        arr = [a, b, c, c]
      } else if (myAnswer === 'C') {
        arr = [a, c, b, c]
      } else if (myAnswer === 'D') {
        arr = [a, c, c, b]
      }
    } else if (answer === 'B') {
      if (myAnswer === 'A') {
        arr = [b, a, c, c]
      } else if (myAnswer === 'C') {
        arr = [c, a, b, c]
      } else if (myAnswer === 'D') {
        arr = [c, a, c, b]
      }
    } else if (answer === 'C') {
      if (myAnswer === 'A') {
        arr = [b, c, a, c]
      } else if (myAnswer === 'B') {
        arr = [c, b, a, c]
      } else if (myAnswer === 'D') {
        arr = [c, c, a, b]
      }
    } else if (answer === 'D') {
      if (myAnswer === 'B') {
        arr = [c, b, c, a]
      } else if (myAnswer === 'C') {
        arr = [c, c, b, a]
      } else if (myAnswer === 'A') {
        arr = [b, c, c, a]
      }
    } else if (answer === 'A') {
      if (myAnswer === 'B') {
        arr = [a, b, c, c]
      } else if (myAnswer === 'C') {
        arr = [a, c, b, c]
      } else if (myAnswer === 'D') {
        arr = [a, c, c, b]
      }
    }
  }
  return arr
}

//取cookies
export function getCookie(name) {
  let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"))
  if (arr != null) return unescape(arr[2])
  return null
}

// export const TokenKey = 'vue_admin_template_token'
export function delCookid(name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null)document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/"
}

export function getIdx(result, arr) {
  var str
  // debugger
  arr.forEach((item, index) => {
    if (item === Number(result)) {
      str = index
      return false
    }
  })
  return str
}
