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
import { ExtensionContext, WebviewPanel } from 'vscode';
import { injectable, inject, multiInject } from 'inversify';
import { DITYPES } from '@pivotal-tools/vscode-extension-di';
import { TYPES } from '../types';
import { WebviewFactory } from './webview-factory';

/**
 * Central place to control lifecycle of a webviews based on injected WebviewConfig's.
 */
@injectable()
export class WebviewManager {

    private panels = new Map<string, WebviewPanel>();
    private factories = new Map<string, WebviewFactory>();

    constructor(
        @inject(DITYPES.ExtensionContext) private context: ExtensionContext,
        @multiInject(TYPES.WebviewFactory) webviewFactories: WebviewFactory[]
    ) {
        webviewFactories.forEach(factory => {
            const viewType = factory.supportedViewType();
            if (viewType) {
                this.factories.set(viewType, factory);
            }
        });
    }

    public open(viewType: string): void {
        const factory = this.factories.get(viewType);
        if (factory) {
            const panel = factory.build();
            this.panels.set(viewType, panel);
        }
    }
}
