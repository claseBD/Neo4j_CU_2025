import neo4j from 'neo4j-driver';
(async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = 'bolt://localhost:7687'
  const USER = 'root'
  const PASSWORD = 'admin2024'
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const serverInfo = await driver.verifyConnectivity();
    console.log('Connection established');
    console.log(serverInfo);
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
    return; // Stop execution if there is a connection error
  }
  
  try {
    const session = driver.session({ database: 'test' });
    //Construyendo un vértice
    const result = await session.run(
       'MATCH(a:player)MATCH(b:player) WHERE a.name=$nameOne AND b.name=$nameTwo  CREATE(a)-[:FRIEND]->(b)',
        { nameOne: "Rohit Sharma",nameTwo: "Virat Kohli" }
      );
	// Summary information
		console.log(
		  `>> The query ${result.summary.query.text} ` +
		  `returned ${result.records.length} records ` +
		  `in ${result.summary.resultAvailableAfter} ms.`
		)

		// Loop through results and do something with them
		console.log('>> Results')
		result.records.forEach(record => {
		  console.log(record.get('name'))
		})
	 //Eliminando un vértice
    const drob_v = await session.run(
       'MATCH (a:player)-[r:FRIEND{}]-(b:player) WHERE a.name = $nameOne AND b.name=$nameTwo DELETE r',{ nameOne: "Rohit Sharma",nameTwo: "Virat Kohli" }
      );
	// Summary information
		console.log(
		  `>> The query ${drob_v.summary.query.text} ` +
		  `returned ${drob_v.records.length} records ` +
		  `in ${drob_v.summary.resultAvailableAfter} ms.`
		)

		// Loop through results and do something with them
		console.log('>> Results')
		drob_v.records.forEach(record => {
		  console.log(record.get('name'))
		})	
	
	await session.close();
  } catch (err) {
    console.log(`Query execution error\n${err}`);
  } finally {
    await driver.close();
  }
})();
 // Get the relationships between  Sally and Dan
/*const { records, summary, keys } = await driver.executeQuery(
  'MATCH(a:Person) MATCH(b:Person) WHERE a.name=$nameOne  AND  b.name=$nameTwo CREATE(a)-[:FRIEND]->(b)',
  { nameOne: "Sally",nameTwo: "Dan" },
  { database: 'laboral1' }
)

// Summary information
console.log(
  `>> The query ${summary.query.text} ` +
  `returned ${records.length} records ` +
  `in ${summary.resultAvailableAfter} ms.`
)

// Loop through results and do something with them
console.log('>> Results')
records.forEach(record => {
  console.log(record.get('name'))
})
driver.close();
})();*/


/*Documentación drivers neo4j https://neo4j.com/docs/javascript-manual/current/ */

