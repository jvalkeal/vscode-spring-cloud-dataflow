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
import { WebviewPanel, window, ViewColumn, Uri, ExtensionContext } from 'vscode';
import { injectable } from 'inversify';
import * as path from 'path';

export interface WebviewFactory {

    supportedViewType(): string;
    build(): WebviewPanel;
}

@injectable()
export abstract class BaseWebviewFactory implements WebviewFactory {

    constructor(
        protected context: ExtensionContext
    ) {
    }

    abstract supportedViewType(): string;

    abstract build(): WebviewPanel;

    protected getLocalResourceRoots(): string[] {
        return ['dist/webview'];
    }

    protected resourceUri(...segments: string[]): Uri {
        return Uri
            .file(path.join(this.context.extensionPath, ...segments))
            .with({ scheme: 'vscode-resource' });
    }

    protected getNonce(): string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

@injectable()
export abstract class AngularWebviewFactory extends BaseWebviewFactory {

    constructor(
        context: ExtensionContext
    ) {
        super(context);
    }

    public build(): WebviewPanel {
        const panel = window.createWebviewPanel(this.supportedViewType(), 'title', ViewColumn.One,
            {
               enableScripts: true,
               localResourceRoots: this.getLocalResourceRoots().map(r => this.resourceUri(r))
            }
        );
        panel.webview.html = this.getWebViewContent();
        return panel;
    }

    protected getScriptPath(): string {
        return 'dist/webview/bundle.js';
    }

    protected getWebViewContent(): string {
        const nonce = this.getNonce();
        return `<!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <base href="/">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <app-root></app-root>
          <script type="text/javascript" src="${this.resourceUri(this.getScriptPath()).toString()}"></script>
        </body>
        </html>`;
    }
}
