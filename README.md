## Requirements
- `nodejs` (tested in `10.0.0`)
- `yarn`
- `RabbitMQ` as a serivce

## Installation
`yarn install`

## Running

There two different ways how applications can run:
 1) As a `writer` (will push messages to an exchange)
   to start a writer instance:
   `ROUTE=LeTest TYPE=writer HOST=localhost PORT=5672 LOGIN=guest PASSWORD=guest node --experimental-modules app.mjs`
 2) As a `reader` (Will read message from a queue and write them to stdout)
   to start a reader instance:
   `ROUTE=LeTest TYPE=reader HOST=localhost PORT=5672 LOGIN=guest PASSWORD=guest node --experimental-modules app.mjs`

### Environment variables
- `ROUTE` -- is a key for an exchange & also a queue name
- `TYPE`  -- mode for application to run in. (`reader` or `writer`)
- `HOST`, `PORT`, `LOGIN`, `PASSWORD` are settings for RabbitMQ
