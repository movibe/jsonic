./node_modules/.bin/pegjs --export-var "var jsonic_parser" jsonic-parser.pegjs
cat jsonic-head.js jsonic-parser.js jsonic-foot.js > jsonic.js

echo "note: ignore warnings in peg.js code"
uglifyjs jsonic.js -c "evaluate=false" --comments "/ Copyright .*/" -m --source-map jsonic-min.map -o jsonic-min.js
