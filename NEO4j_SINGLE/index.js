import neo4j from 'neo4j-driver';
(async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = 'bolt://localhost:7687'
  const USER = 'root'
  const PASSWORD = 'admin2024'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
 
 //Create nodes
 const { records, summary, keys } = await driver.executeQuery(
  'CREATE (Dhawan:player{name: "Shikar Dhawan", YOB: 1985, POB: "Delhi"}) ',
  /*{ nameOne: "Jorge",nameTwo: "George" },*/
  { database: 'test' }
 // Create a relation between Jorge and George
/*const { records, summary, keys } = await driver.executeQuery(
  'MATCH(a:Person) MATCH(b:Person) WHERE a.name=$nameOne  AND  b.name=$nameTwo CREATE(a)-[:FRIEND]->(b)',
  { nameOne: "Jorge",nameTwo: "George" },
  { database: 'test' }*/
)

// Summary information
console.log(
  `>> The query ${summary.query.text} ` +
  `returned ${records.length} records ` +
  `in ${summary.resultAvailableAfter} ms.` +
  records
)

// Loop through results and do something with them
console.log('>> Results')
records.forEach(record => {
  console.log(record.get('name'))
})
driver.close();
})();


/*Documentación drivers neo4j https://neo4j.com/docs/javascript-manual/current/ */

