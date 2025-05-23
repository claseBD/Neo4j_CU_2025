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
 // Get the relationships between  Sally and Dan
const { records, summary, keys } = await driver.executeQuery(
  'UNWIND $props AS map CREATE (n:Person) SET n = map',
  {
	"props": [ 
	  {
        "name": "Melissa",
		"twitter": "@melissa",
		"yearsExperience":0 ,
		"birthdate" : ""
      },
	  {
        "name": "Dan",
		"twitter": "@dan",
        "yearsExperience": 6,
		"birthdate" : ""
      },
	  {
        "name": "Sally",
		"twitter": "",
        "yearsExperience": 4,
		"birthdate" : ""
      },
	  {
        "name": "John",
		"twitter": "",
        "yearsExperience": 5,
		"birthdate" : ""
      },
	  {
		"name": "Jennifer",
        "twitter": "@jennifer",
        "yearsExperience": 5,
		"birthdate": "1980-01-01"
      },
	  {
        "name": "Joe",
		"twitter": "",
        "yearsExperience": 0,
		"birthdate": ""
      },
	  {
        "name": "Ann",
		"twitter": "",
        "yearsExperience": 0,
		"birthdate": ""
      }
	  ]
},
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
})();


/*Documentación drivers neo4j https://neo4j.com/docs/javascript-manual/current/ */

