var fs = require('fs');
var cpFile = require('cp-file');
var resolveFile = require('resolve-file');
var bundle = resolveFile.file('node_modules/@pivotal-tools/vscode-spring-cloud-dataflow-stream-webview/dist/ScdfStreamWebviewWebpack/bundle.js');
var dir = 'dist/webview';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

(async () => {
    await cpFile(bundle.path, dir + '/bundle.js');
})();
