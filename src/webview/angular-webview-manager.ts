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
import { AngularWebview } from './angular-webview';
import { injectable, inject } from 'inversify';
import { DITYPES } from '@pivotal-tools/vscode-extension-di';
import { ExtensionContext } from 'vscode';

@injectable()
export class AngularWebviewManager {

    protected webviewMap = new Map<string, AngularWebview>();

    constructor(
        @inject(DITYPES.ExtensionContext) private context: ExtensionContext
    ) {}

    createWebview(): AngularWebview {
        return new AngularWebview(
            {
                localResourceRoots: [
                    'dist/webview'
                ],
                scriptPath: 'dist/webview/bundle.js'
            },
            this.context
        );
    }

    public open(): void {
        const xxx = this.createWebview();
        xxx.open();
    }
}
