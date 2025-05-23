
import neo4j from 'neo4j-driver';

(async () => {
  const URI = 'bolt://localhost:7687';
  const USER = 'root';
  const PASSWORD = 'admin2024';
  let driver;

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const serverInfo = await driver.verifyConnectivity();
    console.log('Connection established');
    console.log(serverInfo);
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
    return; // Stop execution if there is a connection error
  }

  // Create multiple nodes using multiple queries
  try {
    const session = driver.session({ database: 'test' });

    const players = [
      { name: "Shikar Dhawan", YOB: 1970.0, POB: "Delhi" },
      { name: "Virat Kohli", YOB: 1973.0, POB: "Delhi" },
      { name: "Rohit Sharma", YOB: 1971.0, POB: "Nagpur" }
    ];

    for (const player of players) {
      const result = await session.run(
        'CREATE (p:player {name: $name, YOB: $YOB, POB: $POB}) RETURN p',
        { name: player.name, YOB: player.YOB, POB: player.POB }
      );

      // Summary information
      console.log(
        `>> The query ${result.summary.query.text} ` +
        `returned ${result.records.length} records ` +
        `in ${result.summary.resultAvailableAfter} ms.`
      );

      // Loop through results and do something with them
      console.log('>> Results');
      result.records.forEach(record => {
        console.log(record.get('p').properties);
      });
    }

    await session.close();
  } catch (err) {
    console.log(`Query execution error\n${err}`);
  } finally {
    await driver.close();
  }
})();

