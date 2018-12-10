/* eslint-env node */

const path = require('path');
const fsPromise = require('fs').promises;
const parseXmlString = require('xml2js').parseString;
const parseNim = require('./nim-parser');

function html(model) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="description" content="">
  <title>${model.name}</title>
</head>
<body>
  <h1>${model.name}</h1>

  <nav>
    <ul>
      <li><a href="index.html">Prefab List</a></li>
      <li><a href="..">7dtd-map</a></li>
      <li><a href="https://github.com/kui/7dtd-map">Github repository</a></li>
    </ul>
  </nav>

  <img src="${model.name}.jpg">

  <section>
    <h2>XML</h2>
    <table>${model.xml.map(p => `<tr><th>${p.name}</th><td>${p.value}</td></tr>`).join('\n')}</table>
  </section>

  <section>
    <h2>Blocks</h2>
    <ul>${model.blocks.map(b => `<li>${b.name} (${b.localizedName})</li>`).join('\n')}</ul>
  </section>
</body>
</html>
`;
}

module.exports = async ({ xml, nim, labels }) => {
  const name = path.basename(xml, '.xml');
  const blocksPromise = parseNim(nim)
    .then(bs => bs.map(b => ({ name: b, localizedName: labels[b] })));
  const xmlPromise = parsePrefabXml(xml);
  const [blocks, dom] = await Promise.all([blocksPromise, xmlPromise]);
  return html({ name, xml: dom, blocks });
};

async function parsePrefabXml(xmlFileName) {
  const xml = await parseXml(xmlFileName);
  return xml.prefab.property.map(p => p.$);
}

async function parseXml(xmlFileName) {
  const xml = await fsPromise.readFile(xmlFileName);
  return new Promise((resolve, reject) => {
    parseXmlString(xml, (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
      reject(Error('Unexpected state'));
    });
  });
}