function fixName(name) {
  return name.replace('theodi/backups-', '')
}

function tooOld(datestamp) {
  now = new Date().getTime() / 1000
  then = Date.parse(datestamp) / 1000

  return((now - then) > 86400)
}

function getState(json) {
  var state = json['state']

  if(tooOld(json['finished_at'])) {
    state = 'notrun'
  }

  return state
}
