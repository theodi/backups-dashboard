describe('fixName', function() {
  it('fixes a name', function() {
    expect(fixName('theodi/backups-quirkafleeg-mongo')).toEqual('quirkafleeg-mongo')
  })
})

describe('tooOld', function() {
  describe('older than 24 hours', function() {
    it('knows this was too long ago', function() {
      jasmine.clock().mockDate(new Date(2016, 7, 25, 14, 40, 00))
      expect(tooOld('2016-08-24T09:27:51Z')).toEqual(true)
    })
  })

  describe('within the last 24 hours', function() {
    it('knows this is OK', function() {
      expect(tooOld('2016-08-24T19:27:51Z')).toEqual(false)
    })
  })
})

describe('getState', function() {
  describe('everything is fine', function() {
    it('returns "passed"', function() {
      jasmine.clock().mockDate(new Date(2016, 7, 24, 14, 40, 00))
      expect(getState({
        "id": 154703940,
        "state": "passed",
        "started_at": "2016-08-24T10:15:52Z",
        "finished_at": "2016-08-24T10:21:16Z"
      })).toEqual('passed')
    })
  })

  describe('things are on fire', function() {
    it('returns "failed"', function() {
      jasmine.clock().mockDate(new Date(2016, 7, 24, 14, 40, 00))
      expect(getState({
        "id": 154703940,
        "state": "failed",
        "started_at": "2016-08-24T10:15:52Z",
        "finished_at": "2016-08-24T10:21:16Z"
      })).toEqual('failed')
    })
  })

  describe('scheduled to run', function() {
    it('returns "created"', function() {
      jasmine.clock().mockDate(new Date(2016, 7, 24, 14, 40, 00))
      expect(getState({
        "id": 154703940,
        "state": "created",
        "started_at": null,
        "finished_at": null
      })).toEqual('created')
    })
  })

  describe('actually running', function() {
    it('returns "started"', function() {
      jasmine.clock().mockDate(new Date(2016, 7, 24, 14, 40, 00))
      expect(getState({
        "id": 154703940,
        "state": "started",
        "started_at": "2016-08-24T10:15:52Z",
        "finished_at": null
      })).toEqual('started')
    })
  })

  describe('has not run for a long time', function() {
    it('returns "notrun"', function() {
      jasmine.clock().mockDate(new Date(2016, 7, 24, 14, 40, 00))
      expect(getState({
        "id": 154703940,
        "state": "passed",
        "started_at": "2016-08-20T10:15:52Z",
        "finished_at": "2016-08-20T10:21:16Z"
      })).toEqual('notrun')
    })
  })
})
