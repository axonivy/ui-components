import { urlBuilder, type Connection } from '@axonivy/jsonrpc';

export namespace IvyScriptLanguage {
  export function webSocketUrl(url: string | URL) {
    return urlBuilder(url, 'ivy-script-lsp');
  }

  export async function startClient(connection: Connection, isMonacoReady: Promise<unknown>) {
    await isMonacoReady;
    const monacoLanguageClient = await import('monaco-languageclient');
    const client = new monacoLanguageClient.MonacoLanguageClient({
      name: 'IvyScript Language Client',
      clientOptions: { documentSelector: [{ language: 'ivyScript' }, { language: 'ivyMacro' }] },
      connectionProvider: { get: async () => connection }
    });
    client.start();
    return client;
  }
}
