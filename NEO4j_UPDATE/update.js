/*import neo4j from 'neo4j-driver';

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

  // Update multiple nodes in a single query using FOREACH
  try {
    const session = driver.session({ database: 'test' });
    const result = await session.run(
      `
      UNWIND [
        {name: "Shikar Dhawan", newYOB: 1976},
        {name: "Virat Kohli", newYOB: 1979},
        {name: "Rohit Sharma", newYOB: 1978}
      ] AS player
      MATCH (p:player {name: player.name})
      SET p.YOB = player.newYOB
      RETURN p
      `
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

    await session.close();
  } catch (err) {
    console.log(`Query execution error\n${err}`);
  } finally {
    await driver.close();
  }
})();
*/
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

  // Update multiple nodes using multiple queries
  try {
    const session = driver.session({ database: 'test' });

    const updates = [
      { name: "Shikar Dhawan", newYOB: 1966 },
      { name: "Virat Kohli", newYOB: 1969 },
      { name: "Rohit Sharma", newYOB: 1968 }
    ];

    for (const update of updates) {
      const result = await session.run(
        'MATCH (p:player {name: $name}) SET p.YOB = $newYOB RETURN p',
        { name: update.name, newYOB: update.newYOB }
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

/*Explanation:
Option 1:

Uses the UNWIND clause to handle multiple updates within a single query.
This approach ensures all updates are performed in a single transaction and avoids issues with the UNION clause.
Option 2:

Runs multiple queries sequentially, updating one node at a time.
Ensures clear and straightforward updates for each node.
Both methods will correctly update multiple nodes in your Neo4j database. Choose the one that best suits your use case.*/