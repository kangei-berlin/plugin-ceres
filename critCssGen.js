const critical = require('critical');
critical.generate({
  src: 'https://ceres-demo.plentymarkets-cloud01.com/wohnzimmer',
  target: './crit.css',
  width: 1920,
  height: 1080,
  inline: true
}, (err, criticalCSS) => {
  console.log(criticalCSS);
});
