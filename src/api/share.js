import { Database } from "firebase-firestore-lite";
import sha1 from "js-sha1";
const db = new Database({ projectId: "pcprices-1601429268762" });
const buildsCollection = db.ref("builds");

async function exportBuild(build) {
  let idFull = sha1(JSON.stringify(build));
  let idP1 = idFull.substr(0, 15);
  let idP2 = idFull.substr(-15, 15);
  let id = idP1.replace(
    /(.)./g,
    (_, c1, index) => c1 + idP2[index + 1].toUpperCase()
  );

  try {
    await buildsCollection.child(id).set(build);
    return id;
  } catch (e) {
    console.error(e);
  }
}

async function importBuild(id) {
  try {
    return await buildsCollection.child(id).get();
  } catch (e) {
    console.error(e);
  }
}

export { exportBuild, importBuild };
