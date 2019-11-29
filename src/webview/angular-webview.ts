/*
 * Copyright 2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { window, ViewColumn, Uri, ExtensionContext } from 'vscode';
import * as path from 'path';

export interface AngularWebviewOptions {
    localResourceRoots: string[];
    scriptPath: string;
}

export class AngularWebview {

    constructor(
        private options: AngularWebviewOptions,
        private context: ExtensionContext
    ) {}

    public open(): void {
        const xxx = window.createWebviewPanel('viewType', 'title', ViewColumn.One,
            {
               enableScripts: true,
               localResourceRoots: this.options.localResourceRoots.map(r => this.resourceUri(r))
            }
        );
        xxx.webview.html = this.getWebViewContent();

        xxx.webview.onDidReceiveMessage(message => {
            console.log('Receive message from webview', message);
            xxx.webview.postMessage(message);
        });
    }

    resourceUri(...segments: string[]): Uri {
        return Uri
            .file(path.join(this.context.extensionPath, ...segments))
            .with({ scheme: 'vscode-resource' });
    }

    getWebViewContent(): string {
        return `<!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <base href="/">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <app-root></app-root>
          <script type="text/javascript" src="${this.resourceUri(this.options.scriptPath).toString()}"></script>
        </body>
        </html>`;
    }
}
