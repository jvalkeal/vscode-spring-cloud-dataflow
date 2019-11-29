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
import { injectable, inject, multiInject } from 'inversify';
import { DITYPES } from '@pivotal-tools/vscode-extension-di';
import { ExtensionContext } from 'vscode';
import { TYPES } from '../types';
import { WebviewConfig } from './webview-config';

@injectable()
export class WebviewManager {

    protected webviews = new Map<string, AngularWebview>();
    protected configs = new Map<string, WebviewConfig>();

    constructor(
        @inject(DITYPES.ExtensionContext) private context: ExtensionContext,
        @multiInject(TYPES.WebviewConfig) webviewConfigs: WebviewConfig[]
    ) {
        webviewConfigs.forEach(config => {
            this.configs.set(config.viewType, config);
        });
    }

    public open(viewType: string): void {
        const config = this.configs.get(viewType);
        if (config) {
            const webview = this.createWebview(config);
            webview.open();
        }
    }

    protected createWebview(config: WebviewConfig): AngularWebview {
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
}
