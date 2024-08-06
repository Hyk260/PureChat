import { Ollama as OllamaBrowser } from 'ollama/browser';

const DEFAULT_BASE_URL = 'http://127.0.0.1:11434';

export class OllamaService {
  _host;
  _client;
  _fetch;

  constructor(params) {
    this._host = this.getHost();
    this._fetch = params.fetch;
    this._client = new OllamaBrowser({ fetch: params?.fetch, host: this._host });
  }

  getHost = () => {
    return DEFAULT_BASE_URL;
  };

  getOllamaClient = () => {
    if (this.getHost() !== this._host) {
      this._host = this.getHost();
      this._client = new OllamaBrowser({ fetch: this._fetch, host: this.getHost() });
    }
    return this._client;
  };

  abort = () => {
    this._client.abort();
  };

  pullModel = async (model) => {

  };

  getModels = async () => {

  };
}

export const ollamaService = new OllamaService();




