const tape = require('tape')
const jsonist = require('jsonist')
const fileHelper = require('./helpers/file');

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`

const server = require('./server')

tape('health', async function (t) {
  const url = `${endpoint}/health`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)
    t.ok(body.success, 'should have successful healthcheck')
    t.end()
  })
})

tape('Should create student with score', (t) => {
  const data = { score: '99' };
  jsonist.post(`${endpoint}/9876/phirmware/done`, data, null, (err, body) => {
    if (err) t.error(err)

    t.equal(body.data.phirmware.done, data.score)
    t.end()
  });
});

tape('Should respond with score', (t) => {
  jsonist.get(`${endpoint}/9876/phirmware/done`, (err, body) => {
    if (err) t.error(err)

    t.equal(body.data, '99')
    t.end()
  });
});


tape('Should replace done with empty object', (t) => {
  jsonist.delete(`${endpoint}/9876/phirmware/done`, (err, body) => {
    if (err) t.error(err)

    t.equal(body.data.phirmware.done.score, undefined)
    t.end()
  });
});

tape('cleanup', function (t) {
  fileHelper.deleteFile('9876')
  server.close()
  t.end()
})
