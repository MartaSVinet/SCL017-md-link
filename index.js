const fs = require('fs');
const path = require('path');
const userPath = process.argv[2];
//const linksToValidate = [];
/*const { urlToHttpOptions } = require('http');*/
/*const { match } = require('assert');*/

const readIfMd = (fileToRead) => {
  const extension = path.extname(fileToRead);
  if (extension === '.md') { //compara si el archivo es md
    fs.readFile(fileToRead, 'utf8', (err, data) => { //Lee el contenido del archivo si es md
      if (err) throw err;
      const getLinks = /(?<!\!)\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; //expresión regular que encuentra los links
      const matchLinks = data.matchAll(getLinks);// constante que compara la data con los link
      const allLinks = []; //constante donde guardo los links
      for (const match of matchLinks) { //bucle for que pushea los links en la constante
        allLinks.push({
          href: match[2], //el link entra en el índice 2
          text: match[1],//el texto del link entra en el índice 1
          file: userPath, // la ruta que nos da el usuario entra en el índice 0
        });
        console.log(userPath + ' ' + match[2] + ' ' + `${match[1].slice(0, 50)}`); //imprimimos en consola los índices con espacios entre cada uno
      }
          return allLinks;
    })
  } else {
    console.log('el archivo no tiene la extensión necesaria');
  };
};
//constante que define qué sucede si la ruta que nos da el usuario es archivo o directorio. 
const fileOrDir = (userPath) => {
  fs.lstat(userPath, (err, stats) => {
    if (err) {
      return console.log(err);
    } else {
      if (stats.isDirectory()) {
        console.log('Es un directorio');
        readDir(); //si es un directorio lo lee
      } else if (stats.isFile()) {
        console.log('Es un archivo'); //si es un archivo lee el archivo
        const links = readIfMd(userPath);
        return links;
        
      }
    }
  });
};


const readDir = () => {
  fs.readdir(userPath, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach(file => {
        file = path.resolve(`${userPath}${path.sep}${file}`);
        console.log(file);
        readIfMd(file);
      });
    }
  })
}

const mdLinks = (userPath) => {
 let results = fileOrDir(userPath);
 console.log('results', results);
 };
mdLinks(userPath);
/*mdLinks(userPath).then(links => {
  console.log(links);
});

/*if (options.validate) {
  fetch.href(text[1]), function(error, meta, body) {
    if (body === undefined) {

    }else{

      }

    }
  }
}

/*const validateLinks = (allLinks) => {
  for (let link of allLinks) {
    fetch(link.href)
    .then (function)
  }
}*/







