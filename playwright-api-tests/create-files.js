const fs = require('fs');
const path = require('path');

const files = [
  'tests/api-setup.js',
  'tests/booking-create.spec.js',
  'tests/booking-read.spec.js',
  'tests/booking-update.spec.js',
  'tests/booking-delete.spec.js',
  'tests/booking-full-flow.spec.js'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  fs.writeFileSync(filePath, '', 'utf8');
  console.log(`Created: ${file}`);
});

console.log('All files created successfully!');