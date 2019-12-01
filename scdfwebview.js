var fs = require('fs');
var cpFile = require('cp-file');
var resolveFile = require('resolve-file');
var bundle = resolveFile.file('node_modules/@pivotal-tools/vscode-spring-cloud-dataflow-webview-flo/dist/vscode-spring-cloud-dataflow-webview-flo-bundle/bundle.js');
var dir = 'dist/webview';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, {recursive: true});
}

(async () => {
    await cpFile(bundle.path, dir + '/bundle.js');
})();
