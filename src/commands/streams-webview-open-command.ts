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
import { window } from 'vscode';
import { injectable, inject } from 'inversify';
import { Command } from '@pivotal-tools/vscode-extension-di';
import { TYPES } from '../types';
import { WebviewManager } from '../webview/webview-manager';
import { COMMAND_SCDF_STREAMS_WEBVIEW_OPEN, WEBVIEW_STREAMS_VIEWTYPE } from '../extension-globals';

@injectable()
export class StreamsWebviewOpenCommand implements Command {

    constructor(
        @inject(TYPES.WebviewManager) private webviewManager: WebviewManager
    ) {}

    get id() {
        return COMMAND_SCDF_STREAMS_WEBVIEW_OPEN;
    }

    async execute(...args: any[]) {
        console.log('ARGS', args);

        if (window.activeTextEditor) {
            const resource = window.activeTextEditor.document.uri;
            console.log('RES', resource);
        }

        // this.webviewManager.open(WEBVIEW_STREAMS_VIEWTYPE);
    }
}
