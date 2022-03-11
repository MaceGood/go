export default function connectionInfo(
  connections: any[],
  userDb: { name: string; email: string; picture: string }
) {
  for (let i = 0; i < connections.length; i++) {
    // da se rese problem so imeto
    if (connections[i].name === userDb.name) {
      connections[i].name = connections[i].post_name;
    }
    if (connections[i].email === userDb.email) {
      connections[i].email = connections[i].post_email;
    }
    if (connections[i].picture === userDb.picture) {
      connections[i].picture = connections[i].post_picture;
    }
  }
  return connections;

  // const name: any = connections.map(
  //   (connection: { name: string; post_name: string }) => {
  //     if (connection?.name === userDb?.name) {
  //       return connection?.post_name;
  //     } else {
  //       return connection?.name;
  //     }
  //   }
  // );
  // const email: any = connections.map(
  //   (connection: { email: string; post_email: string }) => {
  //     if (connection.email === userDb?.email) {
  //       return connection.post_email;
  //     } else {
  //       return connection.email;
  //     }
  //   }
  // );
  // const picture: any = connections.map(
  //   (connection: { picture: string; post_picture: string }) => {
  //     if (connection?.picture === userDb?.picture) {
  //       return connection?.post_picture;
  //     } else {
  //       return connection?.picture;
  //     }
  //   }
  // );

  // return [name, email, picture];
}
