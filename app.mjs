import amqp from 'amqp'
const { ROUTE, TYPE, HOST, PORT, LOGIN, PASSWORD } = process.env;

daemon();

function writer(con) {
  let counter = 1
  setInterval(() => 
    con.publish(ROUTE, [counter++, Date()])
    , 1000
  )
}

function reader(con) {
  con.queue(ROUTE, q => {
    q.bind('#')
    q.subscribe(msg => console.log(msg))
  })
}

function daemon() {
  if (!ROUTE) {
    throw new Error('Missing params ROUTE')
  }

  const types = { reader, writer }
  if (!types.hasOwnProperty(TYPE)) {
    throw new Error(`Invalid param TYPE:\'${TYPE}\', use [reader|writer]`)
  }
  const con = amqp.createConnection({
    host: HOST
    , port: PORT
    , login: LOGIN
    , password: PASSWORD
  })
  con.on('error', console.error)
  con.on('ready', () => types[TYPE](con))
}
