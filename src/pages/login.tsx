
export async function login( username: string, password: string) {
  return new Promise<void>((resolve, reject) => {
      if(username === 'diogo' && password === 'senha'){
        resolve();
      }else {
        console.log(username);
        reject();
      }
  })
}